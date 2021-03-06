import { default as VertexBuffer } from './buffer';
import { ScaleType } from './constants';
import { mock2DHistogram64} from './mock-2d-histogram'

import { Algorithms, LevelScale } from './glplotlib/algorithms';
import { ColorTable } from './glplotlib/colorTable';
import { Matrix4 } from './glplotlib/cuon-matrix';
import { DataGenerator } from './glplotlib/data-generator';
import { GaussianSmoother } from './glplotlib/gaussianSmoother';
import { ShaderUtilMethods } from './glplotlib/shader-util-methods';
import Program from './program';
import Texture2d from './texture-2d';


const VERTEX_SHADER = `#version 300 es
      precision mediump float;

      // an attribute is an input (in) to a vertex shader.
      in vec4 a_position;
   
      uniform float u_zIndex;    // ranges from 0 - 255, convert to 0 to -1
      
      void main() {
         // though we're not drawing points we need to set the zindex
         float zindexNdc = (-1.0 / 255.0) * u_zIndex;      // convert to NDC
         gl_Position = vec4(a_position.xy, zindexNdc, 1.0);
      }`;

const FRAGMENT_SHADER = `#version 300 es

      precision mediump float;

      uniform mat4 u_projMatrix;       // actual world viewport to NDC
      uniform mat4 u_invProjMatrix;    // inverse actual world viewport to NDC
      uniform vec2 u_viewport;         // the viewport in pixels
      uniform int u_dimension;         // contour histogram dimension
      uniform int u_activeColorTable;  // contains the active color table     
      uniform float u_pointSize;       // point size
      uniform int u_isDensityRound;       // if 1 then draw wells as circles
      uniform sampler2D u_histogramLookupId;       // set to lookup histogram value from texture
      uniform sampler2D u_densityLevelLookupId;    // set to lookup bincount value from texture
      uniform sampler2D u_colorTableLookupId;      // set to appropriate palette texture id

      // we need to declare an output for the fragment shader
      out vec4 fragColor; 

      ${ShaderUtilMethods.methods}

      /*
      * gets the corner value from a histogram using coordinate in the array.
      * @param histogramCoord the xy in histogram coordinates
      * @param dim the dimension of the histogram must be square
      */
      float getHistogramCornerValue(vec2 histogramCoord, int dim) {      
         // note: no bounds checking against the histogram width-height 
         // truncation is occuring on the vector here, but it's already integer value

         ivec2 texelPos = ivec2(histogramCoord.x, histogramCoord.y);
         float cornerVal = texelFetch(u_histogramLookupId, texelPos, 0).r;        // value is in the red channel of the texture 
         
         return cornerVal;
      }
      
      /** get the corresponding histogram coordinate given the 
       * fragment position (viewport device coord)
       */
      vec2 getHistogramCoordFromFrag(vec2 fragCoord) {
         // get the normalized coordinates (NDC)
         vec2 ndc = 2.0 * fragCoord.xy / (u_viewport.xy - 1.0) - 1.0;
   
         // get the histogram coordinate space location from NDC
         vec4 histogramCoord = u_invProjMatrix * vec4(ndc.xy, 0.0, 1.0);
         return vec2(histogramCoord.xy);
      }

      /* get the corresponding fragment coord (viewport device coord)
       * given the histogram coordinate
       */
      vec2 getFragCoordFromHistogram(float x, float y) {
         // convert histogram coord to NDC, then to frag coordinates
         vec4 ndc = u_projMatrix * vec4(x, y, 0.0, 1.0);
         vec2 fragCoord = (ndc.xy + 1.0) / 2.0 * (u_viewport.xy - 1.0);

         return fragCoord;
      }

      bool distance1(vec2 p1, vec2 p2, float dist) {
         return (distance(p1, p2) <= dist);
      }

      bool distance2(vec2 p1, vec2 p2, float dist) {
         bool x = abs(p1.x - p2.x) <= dist;
         bool y = abs(p1.y - p2.y) <= dist;
         return x && y;
      }

      bool getDistance(bool isRound, vec2 p1, vec2 p2, float dist) {
         return isRound? distance1(p1, p2, dist) : distance2(p1, p2, dist);
      }

      /*
       * find the closest corner to the fragment coordinate. If the 
       * coordinate is close enough to a corner then get the value from the histogram
       */
      int getClosestCorner(vec2 fragCoord, out vec2 resultHistCoord) {
         int result = -1;

         // get the histogram coordinate
         vec2 histCoord = getHistogramCoordFromFrag(fragCoord);
         
         // check to make sure in bounds

         // get the frag coord for the lower-left origin of the histogram cell originY truncating
         float histOriginX = trunc(histCoord.x);
         float histOriginY = trunc(histCoord.y);
         vec2 fragOrigin = getFragCoordFromHistogram(histOriginX, histOriginY);

         // get the delta in frag coord for a histogram cell so we can determine the maximum
         // size for a point. If the pointsize is smaller that's ok
         vec2 URFragPt = getFragCoordFromHistogram(histOriginX + 1.0, histOriginY + 1.0);
         float deltaFrag = (URFragPt.x - fragOrigin.x);
         float halfFrag = deltaFrag / 2.0 - .5;   // maximum radius of point, sub .5 so they don't touch

         // now get the best size for the point
         float pointSize = (u_pointSize < halfFrag) ? u_pointSize : halfFrag;
         if (pointSize < 1.0) {
            pointSize = 1.0;
         }

         bool isRound = u_isDensityRound > 0;
         float dist = isRound ? pointSize : halfFrag + .5;

         // UL corner
         if (getDistance(isRound, fragCoord, vec2(fragOrigin.x, fragOrigin.y + deltaFrag), dist)) {
            resultHistCoord = vec2(histOriginX, histOriginY + 1.0);
            result = 0;
         }
         // UR corner
         else if (getDistance(isRound, fragCoord, vec2(fragOrigin.x + deltaFrag, fragOrigin.y + deltaFrag), dist)) {
            resultHistCoord = vec2(histOriginX + 1.0, histOriginY + 1.0);
            result = 1;
         }
         // LR corner
         else if (getDistance(isRound, fragCoord, vec2(fragOrigin.x + deltaFrag, fragOrigin.y), dist)) {
            resultHistCoord = vec2(histOriginX + 1.0, histOriginY);
            result = 2;
         }
         // LL corner
         else if (getDistance(isRound, fragCoord, vec2(fragOrigin.x, fragOrigin.y), dist)) {
            resultHistCoord = vec2(histOriginX, histOriginY);
            result = 3;
         }

         return result;
      }

      void main() {
         // get the histogram coordinate the frag coordinate is closest to, histogramCoord is an output
         vec2 histogramCoord;    
         int cornerIndex = getClosestCorner(vec2(gl_FragCoord.xy), histogramCoord);

         float value = 0.0;
         if (cornerIndex != -1) {
            value = getHistogramCornerValue(histogramCoord, u_dimension);
         }
            
         // only color wells that have a count > 0
         if (value >= 1.0) {
            // now lookup the value in the table
            ivec2 texSize = textureSize(u_densityLevelLookupId, 0);
            int index = lookup(value, u_densityLevelLookupId, texSize.x);

            // convert the index to a colortable index (256 entries), retrieve the color
            int ctableIndex = 255 / (texSize.x - 1) * index;
            fragColor = texelFetch(u_colorTableLookupId, ivec2(ctableIndex, u_activeColorTable), 0);  
         }
         else {
            discard;
         }
      }`;

export interface IModelProps {
    color?: number;
    pointSize?: number;
    xScale?: ScaleType;
    yScale?: ScaleType;
    zIndex?: number;
    transform?: Matrix4;
}

export interface IDefaultModelProps {
    color: number;
    pointSize: number;
    xScale: ScaleType;
    yScale: ScaleType;
    zIndex: number;
    transform: Matrix4;
}

const defaultModelProps: IDefaultModelProps = {
    color: 0xffff0000,
    pointSize: 30,
    transform: DataGenerator.createTransformMatrix(),
    xScale: ScaleType.Linear,
    yScale: ScaleType.Linear,
    zIndex: 0
};

export type ModelPropsWithDefaults = IModelProps & IDefaultModelProps;

class Model {
    public static MAX_POINT_SIZE = 30;
    protected color: number;
    protected zIndex: number;
    protected pointSize: number;
    protected xScale: ScaleType;
    protected yScale: ScaleType;
    protected transform: Matrix4;
    protected readonly program: Program;

    constructor(private gl: WebGL2RenderingContext, props: IModelProps = {}) {
        this.color = props.color || defaultModelProps.color;
        this.zIndex = props.zIndex || defaultModelProps.zIndex;
        this.pointSize = props.pointSize || defaultModelProps.pointSize;
        this.xScale = props.xScale || defaultModelProps.xScale;
        this.yScale = props.yScale || defaultModelProps.yScale;
        this.transform = props.transform || defaultModelProps.transform;

        this.program = new Program(gl, {
            fs: FRAGMENT_SHADER,
            vs: VERTEX_SHADER
        });
    }

    public draw() {
        const { gl, program, transform, xScale, yScale } = this;

        const dim = 64;

        const trianglePts = new Float32Array([-1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, 1]);

        const verticesBuffer = new VertexBuffer(gl, { data: trianglePts, size: 2, type: gl.FLOAT });

        const histogram = new Float32Array(mock2DHistogram64.reverse());

        // throw in smoothing
        const copy = new Float32Array(histogram);
        const sm = new GaussianSmoother();
        sm.smooth(histogram, copy, dim);

        /* tslint:disable */
        const vp = {
            srcLeft: 0, srcRight: dim - 1 , destLeft: -1, destRight: 1,
            srcBottom: 0, srcTop: dim - 1, destBottom: -1, destTop: 1,
            srcFront: 255, srcBack: 0, destFront: -1, destBack: 0
        };

        const projMatrix = Matrix4.createViewportTransform(vp);
        /* tslint:enable */

        // tslint:disable-next-line
        console.log('projMatrix', projMatrix);
        // tslint:disable-next-line
        console.log('projMatrix inverse', projMatrix.invert().elements);

        const histogramTexture = new Texture2d(gl, {
            data: histogram,
            height: dim,
            internalFormat: gl.RED,
            width: dim
        });

        const levels = Algorithms.generateLevels(histogram, LevelScale.ProbabilityDensity, 10);
        const densityLevelsTexture = new Texture2d(gl, {
            data: levels,
            height: 1,
            internalFormat: gl.RED,
            width: levels.length
        });

        const colorTableInfo = ColorTable.getAllColorTables();

        const rgbTable = colorTableInfo.colorTables;
        const numTables = colorTableInfo.numberTables;
        const tableLen = colorTableInfo.tableLength / 3;
        const colorTableTexture = new Texture2d(gl, {
            data: rgbTable,
            height: numTables,
            internalFormat: gl.RGB,
            width: tableLen
        });

        // tslint:disable-next-line
        console.log('transform.elements', transform.elements);

        program
            .use()
            .setViewport(gl.canvas.width, gl.canvas.height)
            .setClearColor(0xffffffff)
            .clear()
            .setBuffers({
                a_position: verticesBuffer
            })
            .setUniforms({
                u_activeColorTable: 0,
                u_colorTableLookupId: colorTableTexture,
                u_densityLevelLookupId: densityLevelsTexture,
                u_dimension: dim,
                u_histogramLookupId: histogramTexture,
                u_invProjMatrix: [
                    31.499998092651367,
                    -0,
                    -0,
                    -0,
                    -0,
                    31.499998092651367,
                    -0,
                    -0,
                    -0,
                    -0,
                    -255,
                    -0,
                    31.499998092651367,
                    31.499998092651367,
                    0.000015080440789461136,
                    1
                ],
                u_isDensityRound: 0,
                u_pointSize: 15,
                u_projMatrix: [
                    0.0317460335791111,
                    0,
                    0,
                    0,
                    0,
                    0.0317460335791111,
                    0,
                    0,
                    -0,
                    -0,
                    -0.003921568859368563,
                    -0,
                    -1,
                    -1,
                    5.9138983488082886e-8,
                    1
                ],
                u_viewport: [gl.canvas.width, gl.canvas.height],
                u_xScale: xScale,
                u_yScale: yScale,
                u_zIndex: 2
            });

        gl.drawArrays(gl.TRIANGLES, 0, trianglePts.length / 2);
    }
}

export default Model;
