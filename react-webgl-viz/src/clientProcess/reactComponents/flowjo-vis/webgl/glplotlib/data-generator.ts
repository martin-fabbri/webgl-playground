/* tslint:disable */
/** Methods that generate data for the various plots
 *
 * */

import { Algorithms } from './algorithms';
import { ColorTable } from './colorTable';
import { Matrix4 } from './cuon-matrix';
import { ScaleType } from '../constants';

export interface IZoomTransform {
    x: number;
    y: number;
    k: number;
}

export class DataGenerator {
    static rainColorTable = ColorTable.getRgbRainbowTable();

    /**
     * generate xyz data that ranges from 0 - 255 in each direction. If
     * numpts is three, then a triangle set of points is created
     *
     * generate color data according to option for palette and numpts
     *
     * @param {number} numPts
     */
    static generateData(numPts: number, usePalette: boolean, paletteSize: number) {
        let vdata: Uint8Array;

        if (numPts > 3) {
            vdata = new Uint8Array(3 * numPts);
            for (let i = 0; i < vdata.length; i += 3) {
                vdata[i] = Math.random() * 256;
                vdata[i + 1] = Math.random() * 256;
                vdata[i + 2] = Math.random() * 256; // z goes from 0 - 256
            }
        } else {
            vdata = new Uint8Array([128, 192, 48, 192, 64, 52, 64, 64, 255]); // triangle
        }

        let cdata = this.generateColorData(3, true);

        return { pts: vdata, colors: cdata };
    }

    static generateColorData(numPts: number, usePalette: boolean = true): Uint8Array {
        let cdata: Uint8Array;

        if (usePalette) {
            // generates 3 entries for a palette
            cdata = new Uint8Array([0, 1, 1]);
        } else {
            let rainColorTable = this.rainColorTable;

            if (numPts > 3) {
                // create the rgb information, alpha will automatically be set to 1.0 in the shader
                let colorTableIndex = 0;
                cdata = new Uint8Array(3 * numPts);
                for (let i = 0; i < cdata.length; i += 3) {
                    cdata[i] = rainColorTable[colorTableIndex];
                    cdata[i + 1] = rainColorTable[colorTableIndex + 1];
                    cdata[i + 2] = rainColorTable[colorTableIndex + 2];
                    colorTableIndex += 3;
                    if (colorTableIndex >= rainColorTable.length) {
                        colorTableIndex = 0;
                    }
                }
            } else {
                cdata = new Uint8Array([255, 0, 0, 0, 255, 0, 0, 0, 255]);
            }
        }

        return cdata;
    }

    static getXYRange(xScale: ScaleType, yScale: ScaleType, dataRange: number) {
        // initialize with linear values
        let xmin = xScale === ScaleType.Glog ? -400 : 0;
        let ymin = yScale === ScaleType.Glog ? -400 : 0;
        let xmax = dataRange;
        let ymax = dataRange;

        if (xScale === ScaleType.Log) {
            xmin = xmin < 1 ? 0 : Math.log10(xmin);
            xmax = Math.log10(xmax);
        } else if (xScale === ScaleType.Glog) {
            xmin = Algorithms.glog(xmin);
            xmax = Algorithms.glog(xmax);
        }

        if (yScale === ScaleType.Log) {
            ymin = ymin < 1 ? 0 : Math.log10(ymin);
            ymax = Math.log10(ymax);
        } else if (yScale === ScaleType.Glog) {
            ymin = Algorithms.glog(ymin);
            ymax = Algorithms.glog(ymax);
        }

        return { xmin, xmax, ymin, ymax };
    }

    static createBitarrayTransformMatrix(
        devWidth: number,
        devHeight: number,
        dataRange: number,
        zoomTransform: IZoomTransform = { x: 0, y: 0, k: 1 }
    ) {
        // get the actual zoomed device coordinate boundry
        let viewportZoom = Algorithms.getZoomViewportPercent(devWidth, devHeight, zoomTransform);

        // take the vieport percentages and get the range
        let xmin = 255 * viewportZoom.xmin + 0;
        let xmax = 255 * viewportZoom.xmax + 0;
        let ymin = 255 * viewportZoom.ymin + 0;
        let ymax = 255 * viewportZoom.ymax + 0;

        let mat4 = Matrix4.createViewportTransform({
            srcLeft: xmin,
            srcRight: xmax,
            destLeft: -1,
            destRight: 1,
            srcBottom: ymin,
            srcTop: ymax,
            destBottom: -1,
            destTop: 1,
            srcFront: 255,
            srcBack: 0,
            destFront: -1,
            destBack: 0
        });

        return mat4;
    }

    /**
     * get the transform for converting world coordinates to the virtual webgl system. Also take into account the
     * zoom transform
     * @param xScale - linear, log, biexp, glog
     * @param yScale - linear, log, biexp, glog
     * @param devWidth
     * @param devHeight
     * @param dataRange
     * @param zoomTransform
     */
    static createFcsTransformMatrix(
        xScale: ScaleType,
        yScale: ScaleType,
        devWidth: number,
        devHeight: number,
        dataRange: number,
        zoomTransform: IZoomTransform = { x: 0, y: 0, k: 1 }
    ) {
        let rInfo = this.getXYRange(xScale, yScale, dataRange);

        // get the actual zoomed device coordinate boundry
        let zinfo = Algorithms.getZoomViewportPercent(devWidth, devHeight, zoomTransform);

        let projMatrix = Matrix4.createViewportTransform({
            srcLeft: rInfo.xmin,
            srcRight: rInfo.xmax,
            destLeft: -1,
            destRight: 1,
            srcBottom: rInfo.ymin,
            srcTop: rInfo.ymax,
            destBottom: -1,
            destTop: 1,
            srcFront: 255,
            srcBack: 0,
            destFront: -1,
            destBack: 0
        });

        // take the fractional NDC and scale to [-1, 1]
        let zoomMatrix = Matrix4.createViewportTransform({
            srcLeft: 2 * zinfo.xmin - 1,
            srcRight: 2 * zinfo.xmax - 1,
            destLeft: -1,
            destRight: 1,
            srcBottom: 2 * zinfo.ymin - 1,
            srcTop: 2 * zinfo.ymax - 1,
            destBottom: -1,
            destTop: 1,
            srcFront: -1,
            srcBack: 0,
            destFront: -1,
            destBack: 0
        });

        // append the zoom matrix so there is a translation and scale
        let pj = zoomMatrix.multiply(projMatrix);
        projMatrix = pj;

        return projMatrix;
    }

    static createTransformMatrix() {
        // create a xform to go from 0->255 to -1 -> +1, z +10 to -10
        return Matrix4.createViewportTransform({
            srcLeft: 0,
            srcRight: 255,
            destLeft: -1,
            destRight: 1,
            srcBottom: 0,
            srcTop: 255,
            destBottom: -1,
            destTop: 1,
            srcFront: 255,
            srcBack: 0,
            destFront: -1,
            destBack: 0
        });
    }

    static createLogTransformMatrix() {
        let logMax = Math.log10(262143);

        // create a xform to go from 0->logMax to -1 -> +1, z +10 to -10
        return Matrix4.createViewportTransform({
            srcLeft: 0,
            srcRight: logMax,
            destLeft: -1,
            destRight: 1,
            srcBottom: 0,
            srcTop: 255,
            destBottom: -1,
            destTop: 1,
            srcFront: 255,
            srcBack: 0,
            destFront: -1,
            destBack: 0
        });
    }

    static createBiexpTransformMatrix_forY() {
        let biexpMin = 0; // Algorithms.glog(0, 0, 128000);
        let biexpMax = 4.5; // Algorithms.glog(262143, 0, 128000);

        // create a xform to go from 0->logMax to -1 -> +1, z +10 to -10
        return Matrix4.createViewportTransform({
            srcLeft: 0,
            srcRight: 255,
            destLeft: -1,
            destRight: 1,
            srcBottom: biexpMin,
            srcTop: biexpMax,
            destBottom: -1,
            destTop: 1,
            srcFront: 255,
            srcBack: 0,
            destFront: -1,
            destBack: 0
        });
    }

    static createBiexpTransformMatrix() {
        let biexpMin = 0; // Algorithms.glog(0, 0, 128000);
        let biexpMax = 4.5; // Algorithms.glog(262143, 0, 128000);

        // create a xform to go from 0->logMax to -1 -> +1, z +10 to -10
        return Matrix4.createViewportTransform({
            srcLeft: biexpMin,
            srcRight: biexpMax,
            destLeft: -1,
            destRight: 1,
            srcBottom: 0,
            srcTop: 255,
            destBottom: -1,
            destTop: 1,
            srcFront: 255,
            srcBack: 0,
            destFront: -1,
            destBack: 0
        });
    }

    static createGlogTransformMatrix() {
        let xmin = Algorithms.glog(-6000);
        let xmax = Algorithms.glog(263000);

        // create a xform to go from 0->logMax to -1 -> +1, z +10 to -10
        return Matrix4.createViewportTransform({
            srcLeft: xmin,
            srcRight: xmax,
            destLeft: -1,
            destRight: 1,
            srcBottom: 0,
            srcTop: 255,
            destBottom: -1,
            destTop: 1,
            srcFront: 255,
            srcBack: 0,
            destFront: -1,
            destBack: 0
        });
    }
}
/* tslint:enable */
