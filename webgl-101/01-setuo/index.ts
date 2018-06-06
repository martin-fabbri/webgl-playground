console.log('webgl-101');


// const gl = initGL();
// const shaderProgram = createShaders(gl);
// createVertices(shaderProgram);
// draw();

type Props = {
    coordsVec4Attr: string,
    gl: WebGLRenderingContext
}

class GlPoints {
    private readonly props: Props;

    constructor() {
        console.log('initGL');
        const canvas = <HTMLCanvasElement>document.getElementById('canvas');

        this.gl = canvas.getContext('webgl');
        this.gl.viewport(0, 0, canvas.width, canvas.height)
        this.gl.clearColor(1, 1, 1, 1);
    }

    private createShaders() {

        const gl = this.gl;
        const vs = `
        attribute vec4 coords;
        void main(void) {
            gl_Position = ${this.coordsVec4Attr};
            gl_PointSize = 10.0;
        }
    `;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vs);
        gl.compileShader(vertexShader);

        const fs = `
        void main(void) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
    `;

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fs);
        gl.compileShader(fragmentShader);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
        return shaderProgram;
    }

    private createVertices(shaderProgram: WebGLProgram) {
        const gl = this.gl;
        const coords = gl.getAttribLocation(
            shaderProgram, coordsVec4Attr);
        gl.vertexAttrib3f(coords, 0, 0, 0);

    }

    private draw() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

const gp = new GlPoints();
