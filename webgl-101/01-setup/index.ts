
enum Attrs {
    Coords = 'coords',
    PointSize = 'pointSize',
}

const colors = [
  1.0, 1.0, 1.0, 1.0, // white
  1.0, 0.0, 0.0, 1.0, // red
  0.0, 1.0, 0.0, 1.0, // green
  0.0, 0.0, 1.0, 1.0, // blue
];

type Optional<T> = T | undefined;

interface IState {
    readonly gl: WebGLRenderingContext;
    readonly shaderProgram: Optional<WebGLProgram>;
    readonly colorsBuffer: Optional<WebGLBuffer>;
    readonly verticesBuffer: Optional<WebGLBuffer>;
}

interface IProps {
    readonly color?: number[];
    readonly pointsSize?: number;
    readonly width?: number;
    readonly height?: number;
    readonly vertices: number[];
}

class GlPoints {
    private state: IState;
    private readonly props: IProps;

    constructor(props?: IProps) {
        console.log('webgl constructor');
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.state = {
            colorsBuffer: undefined,
            gl: canvas.getContext('webgl'),
            shaderProgram: undefined,
            verticesBuffer: undefined,
        };
        this.props = {
            ...props,
            height: canvas.height,
            width: canvas.width,
        };
        this.init();
    }

    public draw() {
        const {gl} = this.state;
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 3);
    }

    private init() {
        console.log('webgl init');
        const {gl} = this.state;
        const {height, width} = this.props;
        gl.viewport(0, 0, width, height);
        gl.clearColor(1, 1, 1, 1);

        this.initBuffers();
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
            precision mediump float;
            uniform vec4 color;
            void main(void) {
                gl_FragColor = color;
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
            shaderProgram,
        };
    }

    private createVertices() {
        const {gl, shaderProgram, vertices} = this.state;
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        const coords = gl.getAttribLocation(shaderProgram, Attrs.Coords);
        // gl.vertexAttrib3f(coords, 0, 0.8, 0);
        gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coords);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        const pointSize = gl.getAttribLocation(shaderProgram, Attrs.PointSize);
        gl.vertexAttrib1f(pointSize, 30);

        const color = gl.getUniformLocation(shaderProgram, 'color');
        gl.uniform4f(color, 0, 1, 0, 1);
    }

    private initBuffers() {
        // buffer colors
        const {gl} = this.state;
        const {vertices} = this.props;
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        // buffer vertices
        const verticesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }
}

const gp = new GlPoints({
    vertices: [
        -0.9, -0.9, 0.0,
        0.9, -0.9, 0.0,
        0.0,  0.9, 0.0,
    ],
});

gp.draw();
