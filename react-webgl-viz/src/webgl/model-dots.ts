import { default as VertexBuffer } from './buffer';
import { ScaleType } from './constants';
import { Matrix4 } from './glplotlib/cuon-matrix';
import { DataGenerator } from './glplotlib/data-generator';
import { ShaderScaleMethods } from './glplotlib/shader-scale-methods';
import Program from './program';

const VERTEX_SHADER = `#version 300 es
      ${ShaderScaleMethods.fields}
      ${ShaderScaleMethods.methods}

      // an attribute is an input (in) to a vertex shader.
      in vec4 a_position;

      uniform mat4 u_projMatrix;
      uniform float u_pointSize;
      uniform float u_zIndex;

      // the scale for each axis
      uniform int u_xScale;
      uniform int u_yScale;
      
      void main() {
         // get the point which is in linear coordinates
         vec4 pos = a_position;

         // get the modified values based on the scale (biexp, glog)
         pos.x = getValue(pos.x, u_xScale, 0);
         pos.y = getValue(pos.y, u_yScale, 1);

         gl_Position = u_projMatrix * vec4(pos.xy, u_zIndex, 1.0);
         gl_PointSize = u_pointSize;
      }`;

const FRAGMENT_SHADER = `#version 300 es
      precision mediump float;
      
      // we need to declare an output for the fragment shader
      out vec4 fragColor;
      uniform vec4 u_color;

      void main() {
         // code to generate circle shaped points
         float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
         if (dist > 0.5) {
            discard;
         }
         
         fragColor = u_color;
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
    zIndex: 0,
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
        const {color, gl, pointSize, program, transform, xScale, yScale, zIndex} = this;

        const vertices = new Float32Array([0, 0, 132.0, 192, 194, 64, 66, 64, 32, 32, 128, 128]);

        const verticesBuffer = new VertexBuffer(
            gl,{ data: vertices, size: 2, type: gl.FLOAT }
        );

        // tslint:disable-next-line:no-bitwise
        const uColor = [(color & 0xff) / 255,
            // tslint:disable-next-line:no-bitwise
            ((color >> 8) & 0xff) / 255,
            // tslint:disable-next-line:no-bitwise
            ((color >> 16) & 0xff) / 255,
            // tslint:disable-next-line:no-bitwise
            ((color >> 24) & 0xff) / 255];

        // tslint:disable-next-line
        console.log('transform.elements', transform.elements);

        program
            .use()
            .setViewport(gl.canvas.width, gl.canvas.height)
            .setClearColor(0xffffffff)
            .clear();

        program
            .use()
            .setBuffers({
                'a_position': verticesBuffer
            })
            .setUniforms({
                'u_color': uColor,
                'u_pointSize': pointSize,
                'u_projMatrix': [0.007843137718737125, 0, 0, 0, 0, 0.007843137718737125, 0, 0, -0, -0, -0.003921568859368563, -0, -1, -1, 5.9138983488082886e-8, 1],
                'u_xScale': xScale,
                'u_yScale': yScale,
                'u_zIndex': zIndex
            });

        gl.drawArrays(WebGL2RenderingContext.POINTS, 0, vertices.length / 2);

        // tslint:disable-next-line:no-bitwise
        const uNewColor = [(0x560000ff & 0xff) / 255,
            // tslint:disable-next-line:no-bitwise
            ((0x560000ff >> 8) & 0xff) / 255,
            // tslint:disable-next-line:no-bitwise
            ((0x560000ff >> 16) & 0xff) / 255,
            // tslint:disable-next-line:no-bitwise
            ((0x560000ff >> 24) & 0xff) / 255];

        program
            .setUniforms({
                'u_color': uNewColor,
                'u_pointSize': 20,
                'u_projMatrix': [0.007843137718737125, 0, 0, 0, 0, 0.007843137718737125, 0, 0, -0, -0, -0.003921568859368563, -0, -1, -1, 5.9138983488082886e-8, 1],
                'u_xScale': xScale,
                'u_yScale': yScale,
                'u_zIndex': 1
            });


        gl.drawArrays(WebGL2RenderingContext.POINTS, 0, vertices.length / 2);

    }

}

export default Model;
