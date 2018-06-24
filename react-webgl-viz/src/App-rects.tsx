import * as React from 'react';
import { default as VertexBuffer } from './clientProcess/reactComponents/flowjo-vis/webgl/buffer';
import Program from './clientProcess/reactComponents/flowjo-vis/webgl/program';

const VERTEX_SHADER = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

// all shaders have a main function
void main() {

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

const FRAGMENT_SHADER = `#version 300 es

precision mediump float;

uniform vec4 u_color;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = u_color;
}
`;

// Returns a random integer from 0 to range - 1.
function randomInt(range: number) {
    return Math.floor(Math.random() * range);
}

function setRectangle(gl: any, x: any, y: any, width: any, height: any, program: Program) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;

    const positionBuffer = new VertexBuffer(gl, {
        data: new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2])
    });

    program.setBuffers({ a_position: positionBuffer });
}

class App extends React.Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    public componentDidMount() {
        const gl = this.canvasRef.current!.getContext('webgl2');
        // tslint:disable-next-line
        console.log(gl);

        const resolutionUniform = new Int32Array([gl!.canvas.width, gl!.canvas.height]);

        const program = new Program(gl, {
            fs: FRAGMENT_SHADER,
            vs: VERTEX_SHADER
        });

        // Tell WebGL how to convert from clip space to pixels
        gl!.viewport(0, 0, gl!.canvas.width, gl!.canvas.height);

        // Clear the canvas
        gl!.clearColor(0, 0, 0, 0);
        gl!.clear(gl!.COLOR_BUFFER_BIT);

        program.use();

        for (let ii = 0; ii < 50; ++ii) {
            setRectangle(
                gl,
                randomInt(300),
                randomInt(300),
                randomInt(300),
                randomInt(300),
                program
            );

            const colorUniform = new Float32Array([Math.random(), Math.random(), Math.random(), 1]);

            program.setUniforms({
                u_color: colorUniform,
                u_resolution: resolutionUniform
            });

            gl!.drawArrays(gl!.TRIANGLES, 0, 6);
        }

        // tslint:disable-next-line
        console.log(program);
    }

    public render() {
        return <canvas ref={this.canvasRef} width={500} height={500} />;
    }
}

export default App;
