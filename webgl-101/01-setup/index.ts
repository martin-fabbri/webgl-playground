console.log('webgl-101');


// const gl = initGL();
// const shaderProgram = createShaders(gl);
// createVertices(shaderProgram);
// draw();

enum Attrs {
    Coords = 'coords',
    PointSize = 'pointSize'
}

type Optional<T> = T | undefined;

type State = {
    readonly gl: WebGLRenderingContext,
    shaderProgram: Optional<WebGLProgram>
}

class GlPoints {
    private state: State;

    constructor() {
        console.log('webgl constructor');
        const canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.state = {
            gl: canvas.getContext('webgl'),
            shaderProgram: undefined
        };
        this.init(canvas.width, canvas.height);
    }

    private init(width: number, height: number) {
        console.log('webgl init');
        const {gl} = this.state;
        gl.viewport(0, 0, width, height)
        gl.clearColor(1, 1, 1, 1);
        this.createShaders();
        this.createVertices();
    }

    private createShaders() {
        const {gl} = this.state;
        const vs = `
            attribute vec4 ${Attrs.Coords};
            attribute float ${Attrs.PointSize};
            void main(void) {
                gl_Position = ${Attrs.Coords};
                gl_PointSize = ${Attrs.PointSize};
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

        this.state = {
            ...this.state,
            shaderProgram
        }
    }

    private createVertices() {
        const {gl, shaderProgram} = this.state;
        const coords = gl.getAttribLocation(shaderProgram, Attrs.Coords);
        gl.vertexAttrib3f(coords, 0, 0.8, 0);

        const pointSize = gl.getAttribLocation(shaderProgram, Attrs.PointSize);
        gl.vertexAttrib1f(pointSize, 30);

    }

    public draw() {
        const {gl} = this.state;
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

const gp = new GlPoints();
gp.draw();