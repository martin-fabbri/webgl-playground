import * as React from 'react';
import Program from './webgl/program';

const VERTEX_SHADER = `\
attribute vec3 positions;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(positions, 1.0);
}
`;

const FRAGMENT_SHADER = `\
#ifdef GL_ES
precision highp float;
#endif
void main(void) {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

class App extends React.Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    public componentDidMount() {
        const gl = this.canvasRef.current!.getContext('webgl2');
        // tslint:disable-next-line
        console.log(gl);

        const program = new Program(gl, {
            fs: FRAGMENT_SHADER,
            vs: VERTEX_SHADER
        });
        // tslint:disable-next-line
        console.log(program);
    }

    public render() {
        return <canvas ref={this.canvasRef} width={100} height={100} />;
    }
}

export default App;
