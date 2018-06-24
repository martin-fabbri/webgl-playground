/* tslint:disable */
/**Contains various algorithms used:
 * Author: Chris Wolf
 */
import { ScaleType } from '../constants';
import { GaussianSmoother } from './gaussianSmoother';
import { Matrix } from './matrix2d';
import { IPoint, Point, Vector } from './vector-points';

// ************************************************** Interfaces Used by the Algorithms ****************************************

/** Used by the Probability Density Algorithm */
export interface IBinCntPercent {
    binCnt: number;
    numBins: number;
    percent: number;
}

/** This interface defines an interface that contains the object with the transform function. It is used by the
 * LookupTable class
 */
export interface ITransformFunc {
    /** the object that contains the function. */
    owner: any;

    /** The transform function to create the values in the lookup table. */
    transform: (val: number) => number;
}

/** Holds the value of a line intersection result. */
export interface LineIntersectionResult {
    x: number;
    y: number;
    intersects: boolean;
}

// *****************************************************************************************************************************

/** Creates a lookup table and interpolates in-between values. The lookup table
 * is treated like a function. The input x: is the range from min to max while the table
 * contains the values y from the transform function
 */
export class LookupTable {
    // this contains the 'y' values
    table: number[] = [];
    minValue: number;
    maxValue: number;

    // given the table size this is the delta between indexes
    private xDelta: number;

    /** Construct the table using a input minimum and maximum, the table size and the transform used to convert the input
     * values.
     */
    constructor(
        minimum: number,
        maximum: number,
        tableSize: number,
        public transformFunc: ITransformFunc
    ) {
        this.minValue = minimum;
        this.maxValue = maximum;
        this.xDelta = (maximum - minimum) / (tableSize - 1);

        for (let i = 0; i < tableSize; i++) {
            let currentVal = i * this.xDelta + minimum;
            this.table.push(this.transformFunc.transform(currentVal));
        }
    }

    /** This function actually does the lookup
     * @param{number} [yVal] the value to lookup */
    lookup(tableValue: number) {
        let index = Algorithms.binarySearch(this.table, tableValue);
        // @ts-ignore
        if (index < 0) {
            // @ts-ignore
            index = ~index;

            // to interpolate, we need two values so we need to be at least table size - 2
            if (index < this.table.length - 1) {
                // interpolate get value at index and index + 1
                let y0 = this.table[index];
                let y1 = this.table[index + 1];

                // get the fractional index between the two indexes
                index = (tableValue - y0) / (y1 - y0) + index;
            }
        }

        // get the inverse value based on the index, limit check
        // @ts-ignore
        let result = index * this.xDelta + this.minValue;
        if (result < this.minValue) result = this.minValue;
        else if (result > this.maxValue) result = this.maxValue;

        return result;
    }
}

/**
 * this class is used to run a probability density algorithm
 */
export class PdfScaleEngine {
    indexes: number[];
    stats: IBinCntPercent[];
    map: Map<number, IBinCntPercent>;
    binCntList: Set<number>;
    total: number;

    // @ts-ignore
    constructor(private list: number[] | Uint32Array | Float32Array, private percent: number) {
        // get the array of percents
        percent = percent / 100;
        let sum = 0;
        // @ts-ignore
        let max = 1 / percent;
        let percentLevels: number[] = [];
        for (let i = 0; i < 1 / percent; i++) {
            percentLevels.push(sum);
            sum += percent;
        }

        let map = (this.map = PdfScaleEngine.binNumbers(list));
        let stats = PdfScaleEngine.genStats(map);
        this.stats = stats.list;
        this.total = stats.total;
        let indexes = PdfScaleEngine.getLevels(stats.list, percentLevels);
        this.indexes = indexes;
        this.binCntList = PdfScaleEngine.getFinalBinCountList(this.stats, indexes);
    }

    /**
     * gets the array of counts to use in the density algorithms
     */
    getDensityLevels(): Float32Array {
        let finalLevels = new Float32Array(this.binCntList.size);
        let i = 0;
        this.binCntList.forEach(v => {
            finalLevels[i++] = v;
        });

        return finalLevels;
    }

    private static percentSearch(list: IBinCntPercent[], percent: number) {
        let len = list.length;
        let min = 0;
        let max = len - 1;
        let guess;

        while (min <= max) {
            guess = Math.floor((min + max) / 2);
            if (list[guess].percent === percent) {
                return guess;
            } else {
                if (list[guess].percent < percent) {
                    min = guess + 1;
                } else {
                    max = guess - 1;
                }
            }
        }
        // want to insert to left so check value
        // @ts-ignore
        if (guess > 1 && list[guess].percent > percent) {
            // @ts-ignore
            guess--;
        }

        // @ts-ignore
        if (guess < 0) {
            guess = 0;
        }
        // @ts-ignore
        else if (guess > len - 1) {
            guess = len - 1;
        }

        return guess;
    }

    // @ts-ignore
    private static binCountSearch(list: IBinCntPercent[], binCount: number) {
        let len = list.length;
        let min = 0;
        let max = len - 1;
        let guess;

        while (min <= max) {
            guess = Math.floor((min + max) / 2);
            if (list[guess].binCnt === binCount) {
                return guess;
            } else {
                if (list[guess].binCnt < binCount) {
                    min = guess + 1;
                } else {
                    max = guess - 1;
                }
            }
        }
        // want to insert to left so check value
        // @ts-ignore
        if (guess > 1 && list[guess].binCnt > binCount) {
            // @ts-ignore
            guess--;
        }

        // @ts-ignore
        if (guess < 0) {
            guess = 0;
        }
        // @ts-ignore
        else if (guess > len - 1) {
            guess = len - 1;
        }

        return guess;
    }

    // @ts-ignore
    private static createPercentages(items: IBinCntPercent[]) {
        let sorted = items.sort((a: IBinCntPercent, b: IBinCntPercent) => {
            return a.binCnt - b.binCnt;
        });

        return sorted;
    }

    private static binNumbers(numbers: number[] | Uint32Array | Float32Array) {
        let map = new Map<number, IBinCntPercent>();

        let len = numbers.length;
        let bi: IBinCntPercent;

        for (let i = 0; i < len; i++) {
            // store only integers, otherwise map could get huge from fractions
            let n = numbers[i] | 0;
            if (!map.has(n)) {
                bi = { binCnt: n, numBins: 1, percent: 0 };
                map.set(n, bi);
            } else {
                // @ts-ignore
                bi = map.get(n);
                bi.numBins++;
            }
        }

        return map;
    }

    private static genStats(map: Map<number, IBinCntPercent>) {
        let biList: IBinCntPercent[] = [];
        let total = 0;

        // put into array for easier usage and sorting
        map.forEach(bi => {
            biList.push(bi);
        });

        // sort by bin count
        biList.sort((a, b) => {
            return a.binCnt - b.binCnt;
        });

        biList.forEach(bi => {
            total = total + bi.binCnt * bi.numBins;
            bi.percent = total;
        });

        // now get the percentage value
        biList.forEach(bi => {
            bi.percent /= total;
        });

        return { list: biList, total: total };
    }

    private static getLevels(infos: IBinCntPercent[], percents: number[]) {
        // @ts-ignore
        let indexes = [];

        percents.forEach(p => {
            let index = this.percentSearch(infos, p);
            // @ts-ignore
            indexes.push(index);
        });

        // @ts-ignore
        return indexes;
    }

    private static getFinalBinCountList(stats: IBinCntPercent[], indexes: number[]) {
        // you want unique numbers
        let binCountList = new Set<number>();
        indexes.forEach(index => {
            binCountList.add(stats[index].binCnt);
        });

        return binCountList;
    }
}

/** this is the enum for use in the Algorithm.generateLevels() method used by Density and Contour  */
export enum LevelScale {
    Linear,
    ProbabilityDensity
}

/**
 * This class is used to hold some common algorithms
 */
export class Algorithms {
    /**
     * returns an array containing the percents to be used in density algorithms
     * @param percent the percent to use 2 - 50
     */
    static getLevels(percent: number) {
        if (percent < 2) percent = 2;
        if (percent > 50) percent = 50;

        percent = percent / 100;
        let sum = 0;
        // @ts-ignore
        let max = 1 / percent;
        let uniqueLevels = new Set<number>();
        for (let i = 0; i < 1 / percent; i++) {
            uniqueLevels.add(sum);
            sum += percent;
        }

        let levels: number[] = [];
        uniqueLevels.forEach(level => {
            levels.push(level);
        });

        return levels;
    }

    /**
     * convert a transform from the d3 zoom object and calculate the new viewport. The returned
     * object has the percentages that should be applied to the data ranges to setup the actual
     * viewport data range values.
     *
     * @param devWidth width of viewport device canvas
     * @param devHeight height of viewport device canvas
     * @param zoomTransform the d3 zoomTransform object (contains xy translation and scale)
     */
    static getZoomViewportPercent(
        devWidth: number,
        devHeight: number,
        zoomTransform: { x: number; y: number; k: number }
    ) {
        // destructure to more meaningful variables
        let { x: tx, y: ty, k: scale } = zoomTransform;

        // get the lowerleft and upperright in device coordinates
        let lx = (0 - tx) / scale;
        let ly = (devHeight - 1 - ty) / scale;
        let ux = (devWidth - 1 - tx) / scale;
        let uy = (0 - ty) / scale;

        // now get the percentages, remember y axis is flipped so values subtracted from the devHeight
        let xmin = lx / devWidth;
        let xmax = ux / devWidth;
        let ymin = (devHeight - ly) / devHeight;
        let ymax = (devHeight - uy) / devHeight;

        // get the actual zoomed device coordinate boundry
        // @ts-ignore
        let lowerLeft = [lx, ly];
        // @ts-ignore
        let upperRight = [ux, uy];

        return { xmin, ymin, xmax, ymax };
    }

    /**
     * generate the levels for a linear lookup table. A float array is returned since this is a form compatible
     * with WebGL
     * @param histogram the histogram data
     * @param percent the number of levels desired. The number will actually be 1 less that starts at zero
     */
    static generateLinearLookup(
        histogram: Float32Array | Uint32Array | number[],
        percent: number
    ): Float32Array {
        let len = histogram.length;
        let numLevels = (100 / percent) | 0;
        let min = 1e6;
        let max = -1e6;
        for (let i = 0; i < len; i++) {
            let val = histogram[i];
            if (val < min && val >= 0) {
                min = val;
            }
            if (val > max) {
                max = val;
            }
        }

        if (min === 0) {
            min = 1;
        }

        let delta = (max - min) / numLevels;
        let levels = new Set<number>();
        for (let i = 0; i < numLevels; i++) {
            levels.add((i * delta + min + 0.5) | 0);
        }

        let sortedLevels: number[] = [];
        levels.forEach(v => {
            sortedLevels.push(v);
        });
        sortedLevels = sortedLevels.sort();
        let finalLevels = new Float32Array(sortedLevels);

        return finalLevels;
    }

    /**
     * This is the method to call that returns the levels for a particular algorithm
     * @param histogram
     * @param scale
     * @param percent
     */
    static generateLevels(
        histogram: Float32Array | Uint32Array | number[],
        scale: LevelScale,
        percent: number
    ): Float32Array {
        let levels: Float32Array;

        if (scale === LevelScale.ProbabilityDensity) {
            let pdfEngine = new PdfScaleEngine(histogram, percent);
            levels = pdfEngine.getDensityLevels();
        } else {
            levels = this.generateLinearLookup(histogram, percent);
        }

        // depending on the data, pdf and log can generate a zero length array
        // so fallback to linear
        if (!levels || levels.length === 0 || levels.length < 3) {
            levels = this.generateLinearLookup(histogram, percent);
        }

        return levels;
    }

    /**
     * a simple lookup table that returns the nearest index less than or equal to the value
     * @param val value to lookup
     * @param levels the table of sorted values
     */
    static lookup(val: number, levels: number[] | Float32Array | Uint32Array) {
        let midIndex = 0;
        let lowIndex = 0;
        let highIndex = levels.length - 1;

        let tableVal = 0;
        while (lowIndex <= highIndex) {
            midIndex = ((lowIndex + highIndex) / 2) | 0;

            // fetch the exact value from the lookup table
            tableVal = levels[midIndex];

            if (tableVal > val) {
                highIndex = midIndex - 1;
            } else if (tableVal < val) {
                lowIndex = midIndex + 1;
            } else {
                return midIndex;
            }
        }

        if (highIndex < 0) highIndex = 0;

        return highIndex;
    }

    static getXYRange(xScale: ScaleType, yScale: ScaleType, dataRange: number) {
        // initialize with linear values
        let xmin = xScale === ScaleType.Glog ? -350 : 0;
        let ymin = yScale === ScaleType.Glog ? -350 : 0;
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

    /**
     * create a histogram from a set of xy vertices, desired histogram dim, and xy data range
     * @param xy
     * @param dim
     * @param dataRange
     */
    static generateDensity(
        xy: Float32Array,
        histDim: number,
        dataRange: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
            xScale: ScaleType;
            yScale: ScaleType;
        },
        smooth: boolean = true
    ) {
        let NUMPTS = xy.length / 2;

        let xyIndices = new Uint32Array(NUMPTS);
        let colorTableIndices = new Uint8Array(NUMPTS);

        let xform = new Matrix();
        xform.coordinateSystemTransform(
            dataRange.xmin,
            dataRange.xmax,
            dataRange.ymin,
            dataRange.ymax,
            0,
            histDim - 1,
            0,
            histDim - 1
        );

        let histogram: Float32Array | Uint32Array = new Uint32Array(histDim * histDim);
        let indiceIndex = 0;

        // now create the actual density algorithm, scale data to
        // fit in the histogram
        let len = xy.length;
        let maxCell = histDim - 1;
        for (let i = 0; i < len; i += 2) {
            // observation during timing, when truncated, performance skyrockets
            // scale world data to histogram scale
            let pt = xform.transform(xy[i], xy[i + 1]);
            let x = pt.x | 0;
            let y = pt.y | 0;
            if (x < 0) x = 0;
            if (x > maxCell) x = maxCell;
            if (y < 0) y = 0;
            if (y > maxCell) y = maxCell;

            // get the histogram index for the histogram and increment the cell and save the index for later
            let index = y * histDim + x;
            histogram[index] += 1;
            xyIndices[indiceIndex] = index;
            indiceIndex++;
        }

        if (smooth) {
            let smoother = new GaussianSmoother();
            let dest = new Float32Array(histogram.length);
            smoother.smooth(histogram, dest, histDim);
            histogram = dest;
        }

        // at this point the histogram is done, next
        // 1. find the maximum bin value, and minimum bin value
        // 2. generate the colortable indicies

        // find the maximum cell value in the histogram
        let max = 0;
        let min = 100000;
        len = histogram.length;
        for (let i = 0; i < len; i++) {
            let value = histogram[i];
            if (value > max) {
                max = value | 0;
            }
            if (value < min && value > 0) {
                min = value | 0;
            }
        }

        // convert to the color scale length of tables is always 256
        len = xyIndices.length;
        let scale = 255.5 / (max - min);
        let offset = min * scale;
        for (let i = 0; i < len; i++) {
            let v = histogram[xyIndices[i]] | 0;
            v = (v * scale + offset) | 0;
            if (v > 255) v = 255;
            colorTableIndices[i] = v; // emulate converting to color table index
        }

        return { pts: xy, indices: colorTableIndices, histogram: histogram };
    }

    /**
     *
     * @param xy - the vertices in linear space
     * @param histDim - the square dimension of the histogram
     * @param dataRange - the min/max in linear of x and y, and the scale of the space
     * @param smooth - if true use smoothing
     */
    static generateFcsDensity(
        xy: Float32Array,
        histDim: number,
        dataRange: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
            xScale: ScaleType;
            yScale: ScaleType;
            maxRange: number;
        },
        smooth: boolean = false
    ) {
        let NUMPTS = xy.length / 2;

        // create the array to hold the indices
        let xyIndices = new Uint32Array(NUMPTS);

        // adjust the linear range to the scaled range
        let scaledRange = this.getXYRange(dataRange.xScale, dataRange.yScale, dataRange.maxRange);

        // create a transform matrix for converting from the scaled value to the histogram
        let xform = new Matrix();
        xform.coordinateSystemTransform(
            scaledRange.xmin,
            scaledRange.xmax,
            scaledRange.ymin,
            scaledRange.ymax,
            0,
            histDim - 1,
            0,
            histDim - 1
        );

        // get the correct scale function: identity/log/glog
        let xMult = (val: number) => {
            return val;
        };
        if (dataRange.xScale === ScaleType.Log) {
            xMult = Math.log10;
        } else if (dataRange.xScale === ScaleType.Glog) {
            xMult = Algorithms.glog;
        }

        let yMult = (val: number) => {
            return val;
        };
        if (dataRange.yScale === ScaleType.Log) {
            yMult = Math.log10;
        } else if (dataRange.yScale === ScaleType.Glog) {
            yMult = Algorithms.glog;
        }

        // create the short integer histogram array
        let histogram: Float32Array | Uint16Array = new Uint16Array(histDim * histDim);
        let indiceIndex = 0;

        // iterate thru the vertices to create the histogram
        // scale vertex data to the scale system then fit to the
        // fit in the histogram
        let len = xy.length;
        let maxCell = histDim - 1;
        for (let i = 0; i < len; i += 2) {
            // observation during timing, when truncated, performance skyrockets
            // scale world data to histogram scale
            let xval = xMult(xy[i]);
            let yval = yMult(xy[i + 1]);
            let pt = xform.transform(xval, yval);
            let x = pt.x | 0;
            let y = pt.y | 0;
            if (x < 0) x = 0;
            if (x > maxCell) x = maxCell;
            if (y < 0) y = 0;
            if (y > maxCell) y = maxCell;

            // get the histogram index for the histogram and increment the cell and save the index for later
            let index = y * histDim + x;
            histogram[index] += 1;
            xyIndices[indiceIndex] = index;
            indiceIndex++;
        }

        if (smooth) {
            let smoother = new GaussianSmoother();
            let dest = new Float32Array(histogram.length);
            smoother.smooth(histogram, dest, histDim);
            histogram = dest;
        }

        // at this point the histogram is done, next
        // 1. find the maximum bin value, and minimum bin value
        // 2. generate the colortable indicies

        // find the maximum cell value in the histogram
        let max = 0;
        let min = 100000;
        len = histogram.length;
        for (let i = 0; i < len; i++) {
            let value = histogram[i];
            if (value > max) {
                max = value | 0;
            }
            if (value < min && value > 0) {
                min = value | 0;
            }
        }

        // now create the indices to the color table, this will be
        // done in the gpu

        // convert to the color scale length of tables is always 256
        let colorTableIndices = new Uint8Array(NUMPTS);
        len = xyIndices.length;
        let scale = 255.5 / (max - min);
        let offset = min * scale;
        for (let i = 0; i < len; i++) {
            let v = histogram[xyIndices[i]];
            v = (v * scale + offset) | 0;
            if (v > 255) v = 255;
            colorTableIndices[i] = v; // emulate converting to color table index
        }

        return { pts: xy, indices: colorTableIndices, histogram: histogram };
    }

    static genGaussianData(
        numPts: number,
        viewport: { xmin: number; xmax: number; ymin: number; ymax: number }
    ) {
        let m = new Matrix();
        m.coordinateSystemTransform(
            -3,
            3,
            -3,
            3,
            viewport.xmin,
            viewport.xmax,
            viewport.ymin,
            viewport.ymax
        );
        let data: number[] = [];

        for (let i = 0; i < numPts; i++) {
            let x = Algorithms.nextGaussian();
            let y = Algorithms.nextGaussian();
            let p = m.transform(x, y);
            data.push(p.x);
            data.push(p.y);
        }

        return new Float32Array(data);
    }

    /** returns a value around 0 based on the Gaussian formula, range from approximately -3 to 3
     * See Knuth, ACP, Section 3.4.1 Algorithm C.
     */
    static nextGaussian(): number {
        let v1, v2, s;

        do {
            v1 = 2 * (Math.random() - 0.5); // between -1 and 1
            v2 = 2 * (Math.random() - 0.5); // between -1 and 1
            s = v1 * v1 + v2 * v2;
        } while (s >= 1 || s === 0);

        let multiplier = Math.sqrt((-2 * Math.log(s)) / s);

        return v1 * multiplier;
    }

    /**
     * calculates the generalized log of a linear value
     * @param linearVal the linear value
     * @param alpha
     * @param lambda
     */
    static glog(linearVal: number, lambda: number = 122500) {
        // actual alg. Math.log((linearVal - alpha) + Math.sqrt((linearVal - alpha) ** 2 + lambda));
        // default alpha to zero
        return Math.log(linearVal + Math.sqrt(linearVal ** 2 + lambda));
    }

    /**
     * calculates the inverse generalized log to return the linear value
     * @param glogVal
     * @param alpha
     * @param lambda
     */
    static invGlog(glogVal: number, lambda: number = 122500) {
        // actual alg: (Math.exp(2 * glogVal) - lambda) / (2 * Math.exp(glogVal)) + alpha;
        // default to alpha to zero
        // @ts-ignore
        let num = Math.exp(2 * glogVal) - lambda;
        // @ts-ignore
        let dem = 2 * Math.exp(glogVal);
        return (Math.exp(2 * glogVal) - lambda) / (2 * Math.exp(glogVal));
    }

    /**
     * interpolate between two points, number of increments between the points is 50
     *
     * @param {IPoint} p1
     * @param {IPoint} p2
     * @returns straight line of points
     */
    static interpolatePoints(p1: IPoint, p2: IPoint) {
        let v = Vector.vectorFromPoints(p1, p2);

        // p1/p2 go to the front and back, while interpolated points in between
        let pts: IPoint[] = [];
        pts.push(p1);

        const numIncrements = 50;
        const mult = 1 / numIncrements;

        for (let i = 1; i < numIncrements; i++) {
            let scale = i * mult;
            let vscaled = Vector.scale(scale, v);
            let p = Point.offsetPoint(p1, vscaled);
            pts.push(p);
        }

        pts.push(p2);
        return pts;
    }

    /**
     * interpolate points for a whole polygon of vertices
     *
     * @param {IPoint[]} vertices
     * @returns the interpolated points
     */
    static interpolatePolygon(vertices: IPoint[]) {
        let destPts: IPoint[] = [];
        for (let i = 0; i < vertices.length; i++) {
            let p1 = vertices[i];
            let p2 = i === vertices.length - 1 ? vertices[0] : vertices[i + 1];
            let tmppts = this.interpolatePoints(p1, p2);
            destPts.push(...tmppts);
        }

        return destPts;
    }

    /** Perform a binary search for the item in the array. The array must be sorted.
     * If the item is not found, then get the closest index that is less than the item.
     * If there is no match then the return index will be the complement (negative)
     * @param {number[]} list - array of numbers
     * @param {number} item - the number to search for
     * @param {boolean} useComplement - if true return complement of index to indicate there was no match (interpolation could then be used),
     * if false just return the closest index lower than the value
     * @returns the index of the match. If not found the complement of the index */
    static binarySearch(list: number[], item: number, useComplement = true) {
        let min = 0;
        let max = list.length - 1;
        let guessIndex;

        while (min <= max) {
            guessIndex = Math.floor((min + max) / 2);

            if (list[guessIndex] === item) {
                return guessIndex;
            } else {
                if (list[guessIndex] < item) {
                    min = guessIndex + 1;
                } else {
                    max = guessIndex - 1;
                }
            }
        }

        // want to get index to the left so check value,
        // if items[item] > value  and we're not at index 0 then decrement the index
        // @ts-ignore
        if (guessIndex > 0 && list[guessIndex] > item) {
            // @ts-ignore
            guessIndex--;
        }

        // item not found but the index is where it could be inserted
        // take the complement so a negative number is returned
        // @ts-ignore
        return useComplement ? ~guessIndex : guessIndex;
    }

    /** Since a value < 0 can't be represented on the log scale, mirror the values by
     * making a symmetrical log function. Values -1 < v < 1 return 0
     * @param {number} val - the number to take the log of. range -/+
     */
    static getSymmetricLog(val: number) {
        const ZERO = 1;
        let result = 0;
        if (val > -ZERO && val < ZERO) {
            result = 0;
        } else if (val <= -ZERO) {
            result = -Math.log10(Math.abs(val));
        } else {
            result = Math.log10(val);
        }

        return result;
    }

    /** Since a value < 0 can't be represented on the log scale, mirror the values by
     * making a inverse symmetrical log function. Negative values are equal to positive with minus
     * @param {number} val - the number to take the log of. range -/+
     */
    static getInverseSymmetricLog(val: number) {
        return (val = val < 0 ? -Math.pow(10, -val) : Math.pow(10, val));
    }

    /** Since a value < 0 can't be represented on the log scale, mirror the values by
     * making a inverse symmetrical log function. Negative values are equal to positive with minus
     * @param {number} val - the number to take the log of. range -/+
     */
    static getDistanceBetweenPoints(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    /** Find the minimum/maximum x and y values of a set of points
     * @param {number} val - the number to take the log of. range -/+
     */
    static getBounds(points: IPoint[]): { xMin: number; yMin: number; xMax: number; yMax: number } {
        if (!points) {
            // @ts-ignore
            return null;
        }

        let xmin = 1e6;
        let xmax = -1e6;
        let ymin = 1e6;
        let ymax = -1e6;

        for (let p of points) {
            if (p.x < xmin) {
                xmin = p.x;
            }
            if (p.x > xmax) {
                xmax = p.x;
            }
            if (p.y < ymin) {
                ymin = p.y;
            }
            if (p.y > ymax) {
                ymax = p.y;
            }
        }

        return { xMin: xmin, xMax: xmax, yMin: ymin, yMax: ymax };
    }

    /** Finds the first index of a match for the item in the list
     * @param items - the list of items
     * @param item - the item to find
     * @param predicate - the boolean predicate that compares two items for equality
     */
    static findIndex<T>(items: T[], item: T, predicate: (p1: T, p2: T) => boolean): number {
        let index = -1;
        for (let i = 0; i < items.length; i++) {
            if (predicate(items[i], item)) {
                index = i;
                break;
            }
        }

        return index;
    }

    static floatBuffer = new Float32Array(1);
    static intBuffer = new Uint32Array(Algorithms.floatBuffer.buffer);
    /**
     * Converts an integer rgba value to a float
     * @param rgba the rgba color to interpret as a float
     */
    static convertRgbaToFloat(rgba: number) {
        Algorithms.intBuffer[0] = rgba;
        return Algorithms.floatBuffer[0];
    }

    /**
     * Converts a float value to an integer value
     * @param floatVal the float value to interpret as an integer
     */
    static convertFloatToRgba(floatVal: number) {
        Algorithms.floatBuffer[0] = floatVal;
        return Algorithms.intBuffer[0];
    }
}

/** used for entry definitions in the nozzle/drop-volume table */
export interface INozzleDropEntry {
    nozzle: string;
    volume: number;
}

/** Class for calculating number of cells or volume based on the nozzle size and drop volume. */
export class DropVolumeAlg {
    // Init the drop volume table and tube volume table, values found by P.Norton
    // volumes in milliliters for a drop from the nozzle
    static getNozzleVolumeTable() {
        return [
            { nozzle: 'Nozzle70', volume: 1.12787356e-6 }, // These nozzle strings are predetermined
            { nozzle: 'Nozzle85', volume: 2.39361702e-6 },
            { nozzle: 'Nozzle100', volume: 3.47222222e-6 }, // currently only one type no a/b for 100 and 130
            { nozzle: 'Nozzle130', volume: 5.29935275e-6 }
        ];
    }

    /** get the volume for the specified nozzle. If the nozzle is not in the table
     * zero will be returned.
     * @param nozzle - the specified nozzle in the table
     */
    static getDropVolumeForNozzle(nozzle: string) {
        let volume = 0;
        for (let entry of DropVolumeAlg.getNozzleVolumeTable()) {
            if (entry.nozzle === nozzle) {
                volume = entry.volume;
                break;
            }
        }
        return volume;
    }

    /** gets all of the currently defined nozzle names */
    static getAvailableNozzleNames() {
        // extract the nozzle name and create a new array
        return DropVolumeAlg.getNozzleVolumeTable().map((entry: INozzleDropEntry) => {
            return entry.nozzle;
        });
    }

    /** calculate the number of cells from a given sample volume, yield mask, and the nozzle type
     * @param nozzle - the name of the nozzle
     * @param sampleVolume - the volume in ml.
     * @param yieldMask - number from 0 - 32
     * @returns the number of cells
     */
    static calculateCellsForNozzleAndVolume(
        nozzle: string,
        sampleVolume: number,
        yieldMask: number = 0
    ) {
        let dropVolume = DropVolumeAlg.getDropVolumeForNozzle(nozzle);
        let numberCells = DropVolumeAlg.calculateCellsFromVolume(
            sampleVolume,
            dropVolume,
            yieldMask
        );

        return numberCells;
    }

    /** calculate the number of cells from a given sample volume, yield mask, and size of a drop
     * Algorithm: Pierce Norton
     * @param sampleVolume - the volume in ml.
     * @param dropVolume - the droplet volume in ml.
     * @param yieldMask - number from 0 - 32
     * @returns the number of cells
     */
    static calculateCellsFromVolume(
        sampleVolume: number,
        dropVolume: number,
        yieldMask: number = 0
    ) {
        let numberCells = 0;
        if (dropVolume > 0 && yieldMask >= 0 && yieldMask <= 32) {
            numberCells = sampleVolume / dropVolume / (1 + yieldMask / 32.0);
        }

        return (numberCells + 0.5) | 0;
    }

    /**
     * Calculate the volume needed for a given number of cells and their drop volume and yield mask.
     * @param nozzle - the nozzle type
     * @param numberCells - the number of cells
     * @param yieldMask - value from 0 to 32
     * @returns the volume in ml
     */
    static CalculateVolumeFromCells(nozzle: string, numberCells: number, yieldMask: number = 0) {
        let volume = 0;
        let dropVolume = DropVolumeAlg.getDropVolumeForNozzle(nozzle);

        if (numberCells >= 0 && (yieldMask >= 0 && yieldMask <= 32)) {
            volume = numberCells * (1 + yieldMask / 32.0) * dropVolume;
        }
        return volume;
    }

    /**
     * Calculate the maximum cell count given the nozzel size, volume and yield mask.
     * @param nozzle - the nozzle type
     * @param volume - the volume in ml
     * @param yieldMask - value from 0 to 32
     * @returns the number of cells
     */
    static CalculateCellCountFromVolume(nozzle: string, volume: number, yieldMask: number = 0) {
        let numberCells = 0;
        let dropVolume = DropVolumeAlg.getDropVolumeForNozzle(nozzle);

        if (numberCells >= 0 && (yieldMask >= 0 && yieldMask <= 32)) {
            numberCells = volume / ((1 + yieldMask / 32.0) * dropVolume);
        }
        return numberCells;
    }
}

/** This class is used to subdivide a series of vertices into a specified segmentSize. This is used when converting
 * between biexponential and log vertices.
 */
export class VertexSegmenter {
    static segmentSize = 10;

    /** Takes the two endpoints and if their distance apart is greater than the segment size, break up
     * the distance with subsegments. Append the points to the destPts array passed in.
     */
    private static subDivideEdge(destPts: Point[], p1: Point, p2: Point) {
        const segSize = this.segmentSize;
        const halfSize = segSize / 2;
        let vec = Vector.vectorFromPoints(p1, p2);
        let mag = vec.getMagnitude();
        let norm = Vector.normal(vec);
        let segVec = Vector.scale(segSize, norm);

        let numSeg = (mag / segSize) | 0;

        // push the first point
        destPts.push(p1);

        // divide up the edge
        for (let i = 1; i <= numSeg; i++) {
            let newVec = Vector.scale(i, segVec);
            let newPt = Point.offsetPoint(p1, newVec);
            let endDelta = Vector.vectorFromPoints(newPt, p2).getMagnitude();
            if (endDelta >= halfSize) {
                destPts.push(newPt);
            }
        }

        // don't push last point
    }

    /** iterate through the vertices and if there is a need to subdivide the vertices then create the new list of points.
     * @param pts - the points to subdivide
     */
    private static subDivideEdges(pts: Point[]): IPoint[] {
        // create a list of points to hold both the original and the in-between points
        let newPts: Point[] = [];
        let len = pts.length;

        for (let i = 0; i < len - 1; i++) {
            this.subDivideEdge(newPts, pts[i], pts[i + 1]);
        }

        // do last to first point
        if (pts.length > 2 && !Point.areEqual(pts[0], pts[len - 1])) {
            this.subDivideEdge(newPts, pts[len - 1], pts[0]);
        }

        return newPts;
    }

    /** this method convert the series of world device coordinates to a segmented set according to a predetermined
     * segment size. A new list of vertices will be returned that contains both the original points and the sub-points.
     * The original vertex list is not modified.
     * @param srcPts - the world points
     * @return the new points
     */
    static convertToSubsegments(srcPts: IPoint[]): IPoint[] {
        // must be a polygon
        if (srcPts.length < 3) return srcPts;

        // copy the points
        let copyPts = [];
        for (let p of srcPts) {
            copyPts.push(new Point(p.x, p.y));
        }

        // convert points to 256x256 pixel space then find segments
        const dim = 256;

        // get the bounds of the points so we can scale them to 256x256 space
        let bounds = Algorithms.getBounds(copyPts);

        // dimension must be at least 1 in each direction
        let matrix = new Matrix();
        matrix.coordinateSystemTransform(
            bounds.xMin,
            bounds.xMax,
            bounds.yMin,
            bounds.yMax,
            0,
            dim - 1,
            0,
            dim - 1
        );
        matrix.transformPoints(copyPts);

        // points are in device coordinates so now
        let segPts = this.subDivideEdges(copyPts);

        // convert device points back to world
        matrix = new Matrix();
        matrix.coordinateSystemTransform(
            0,
            255,
            0,
            255,
            bounds.xMin,
            bounds.xMax,
            bounds.yMin,
            bounds.yMax
        );
        matrix.transformPoints(segPts);

        return segPts;
    }

    /** this method convert the series of device coordinates to a segmented set according to a predetermined
     * segment size. A new list of vertices will be returned that contains both the original points and the sub-points.
     * The original vertex list is not modified.
     * @param srcPts - the device points ranging from 0 < 256
     * @param segmentSize - the segment size, default is 10
     * @return the new points
     */
    static convertVerticesToSubSegments(srcPts: IPoint[], segmentSize: number = 10): IPoint[] {
        if (srcPts.length < 2) {
            return srcPts;
        }

        let segPts: IPoint[] = [];

        // convert points to 256x256 pixel space then find segments
        // @ts-ignore
        const dim = 256;

        // verify points range from 0 -> <= 256
        for (let pt of srcPts) {
            if (pt.x < 0 || pt.x > 255 || pt.y < 0 || pt.y > 255) {
                return srcPts;
            }
        }

        let len = srcPts.length;
        for (let i = 0; i < len; i++) {
            let p0 = srcPts[i];
            let p1 = i === len - 1 ? srcPts[0] : srcPts[i + 1];

            segPts.push(p0);
            let vec = new Vector(p1.x - p0.x, p1.y - p0.y);
            let mag = vec.getMagnitude();
            let unitVec = Vector.normal(vec);

            // find out how many segment lie between the points, if it divides evenly then decrement numSegs so points aren't duplicated
            let numSegsRaw = mag / segmentSize;
            let numSegsInt = numSegsRaw | 0;

            // don't duplicate points so see if number of segments is a pure integer
            if (Math.abs(numSegsRaw - numSegsInt) < 0.0001) numSegsInt--;

            // if there is a segment then push the points
            if (numSegsInt > 1) {
                for (let seg = 1; seg <= numSegsInt; seg++) {
                    let v = Vector.scale(segmentSize * seg, unitVec);
                    let newPt = Point.offsetPoint(p0, v);
                    segPts.push(newPt);
                }
            }
        }

        // for a collection of only two points the last point doesn't get pushed so we do it here
        if (srcPts.length === 2) {
            segPts.push(srcPts[1]);
        }

        return segPts;
    }
}
/* tslint:enable */
