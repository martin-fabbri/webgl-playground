// @ts-ignore
import {Matrix4} from 'math.gl';

import * as React from 'react';

import {default as VertexBuffer} from './webgl/buffer'
import Program from './webgl/program';
import Texture2d from './webgl/texture-2d';

const VERTEX_SHADER = `#version 300 es
in vec3 positions;
in vec4 colors;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
out vec4 vColor;
in vec2 a_texcoord;
out vec2 v_texcoord;

void main(void) {
  vColor = colors;
  gl_Position = uPMatrix * uMVMatrix * vec4(positions, 1.0);
  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
`;

const FRAGMENT_SHADER = `#version 300 es
#ifdef GL_ES
precision highp float;
#endif
in vec4 vColor;

// Passed in from the vertex shader.
in vec2 v_texcoord;
        
// The texture.
uniform sampler2D u_texture;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main(void) {
  outColor = texture(u_texture, v_texcoord);
}
`;

class App extends React.Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    public componentDidMount() {
        const gl = this.canvasRef.current!.getContext('webgl2');
        // tslint:disable-next-line
        console.log(gl);

        // todo: integrate this parameters to PROGRAM.CLEAR
        // setParameters(gl, {
        //     clearColor: [0, 0, 0, 1],
        //     clearDepth: [1],
        //     depthTest: true,
        //     depthFunc: gl.LEQUAL
        // });

        // const positionsBuffer = new VertexBuffer(gl, {data: new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]), size: 3});
        // const colorsBuffer = new VertexBuffer(gl, {data: new Float32Array([1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1]), size: 4});
        // // const resolutionUniform = new Int32Array([gl!.canvas.width, gl!.canvas.height]);

        const program = new Program(gl, {
            fs: FRAGMENT_SHADER,
            vs: VERTEX_SHADER
        });

        // Tell WebGL how to convert from clip space to pixels
        gl!.viewport(0, 0, gl!.canvas.width, gl!.canvas.height);

        // Clear the canvas
        gl!.clearColor(0, 0, 0, 0);
        gl!.clear(gl!.COLOR_BUFFER_BIT);


        const projection = new Matrix4().perspective(1.6624737945492662);
        const view = new Matrix4().translate([-1.5, 0, -7]);

        // program
        //     .use()
        //     .setBuffers({
        //         'colors': colorsBuffer,
        //         'positions': positionsBuffer
        //     })
        //     .setUniforms({
        //         'uMVMatrix': view,
        //         'uPMatrix': projection
        //     });
        //
        // gl!.drawArrays(gl!.TRIANGLES, 0, 3);

        const data = new Uint8Array([
            0, 32, 64, 128, 192, 255
        ]);

        // const level = 0;
        // const internalFormat = gl!.R8;
        // const width = 3;
        // const height = 2;
        // const border = 0;
        // const dataFormat = gl!.RED;
        // const type = gl!.UNSIGNED_BYTE;
        //
        // const texture = gl!.createTexture();
        // gl!.activeTexture(gl!.TEXTURE0 + 0);
        // gl!.bindTexture(gl!.TEXTURE_2D, texture);
        //
        // gl!.pixelStorei(gl!.UNPACK_ALIGNMENT, 1);
        // gl!.texImage2D(gl!.TEXTURE_2D, level, internalFormat, width, height, border, dataFormat, type, data);


        const texture2d = new Texture2d(gl!, {
            data,
            dataFormat: gl!.R8,
            format: gl!.RED,
            height: 2,
            type: gl!.UNSIGNED_BYTE,
            width: 3
        });

        texture2d
            .bind()
            .setPixeldStorei(gl!.UNPACK_ALIGNMENT, 1)
            .setImageData()
            .clamp();

        view.translate([3, 0, 0]);
        program
            .use()
            .setBuffers({
                'a_texcoord':  new VertexBuffer(gl, {data: new Float32Array([
                        // select the bottom left image
                        1.0,  0.0,
                        1.0,  1.0,
                        0.0,  0.0,

                        0.0,  0.0,
                        1.0,  1.0,
                        1.0,  0.0
                    ]), size: 2}),
                'colors': new VertexBuffer(gl, {data: new Float32Array([0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1]), size: 4}),
                'positions':  new VertexBuffer(gl, {data: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0]), size: 3}),
            })
            .setUniforms({
                'uMVMatrix': view,
                'uPMatrix': projection,
                'u_texture': 0
            });

        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

        // tslint:disable-next-line
        console.log(program);
    }

    public render() {
        return <canvas ref={this.canvasRef} width={500} height={500} />;
    }
}

export default App;
