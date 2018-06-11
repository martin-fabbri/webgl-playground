var Animation02;
(function (Animation02) {
    let Attrs;
    (function (Attrs) {
        Attrs["Position"] = "aCoords";
        Attrs["PointSize"] = "aPointSize";
        Attrs["Colors"] = "aVertexColors";
    })(Attrs || (Attrs = {}));
    const vertexCount = 5000;
    // prettier-ignore
    const colors = [
        1.0, 1.0, 1.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0 // blue
    ];
    // vertex shader program
    const vsSource = `
        attribute vec4 ${Attrs.Coords};
        attribute float ${Attrs.PointSize};
                
        void main(void) {
            gl_Position = ${Attrs.Coords};
            gl_PointSize = ${Attrs.PointSize};
        }
    `;
    // fragment shader program
    const fs = `
        precision mediump float;
        uniform vec4 color;
        
        void main(void) {
            gl_FragColor = color;
        }
    `;
    class GlPoints {
        constructor(props) {
            this.draw = () => {
                const { gl } = this.state;
                const { vertices } = this.props;
                for (let i = 0; i < vertexCount; i += 2) {
                    vertices[i] += Math.random() * 0.01 - 0.005;
                    vertices[i + 1] += Math.random() * 0.01 - 0.005;
                }
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.POINTS, 0, vertexCount);
                requestAnimationFrame(this.draw);
            };
            console.log('webgl constructor');
            const canvas = document.getElementById('canvas');
            this.state = {
                gl: canvas.getContext('webgl')
            };
            this.props = Object.assign({}, props, { height: canvas.height, width: canvas.width });
            this.init();
        }
        init() {
            console.log('webgl init');
            const { gl } = this.state;
            const { height, width } = this.props;
            gl.viewport(0, 0, width, height);
            gl.clearColor(1, 1, 1, 1);
            this.initBuffers();
            this.createShaders();
            this.createVertices();
        }
        createShaders() {
            const { gl } = this.state;
            // vertex shader
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vsSource);
            gl.compileShader(vertexShader);
            if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                console.error(`An error occurred compiling the vertex shader. ${gl.getShaderInfoLog(vertexShader)}`);
                return;
            }
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fs);
            gl.compileShader(fragmentShader);
            if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                console.error(`An error occurred compiling the fragment shader. ${gl.getShaderInfoLog(fragmentShader)}`);
                return;
            }
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);
            this.state = Object.assign({}, this.state, { programInfo: Object.assign({}, this.state.programInfo, { program }) });
            console.log('this.state ----->>>>');
            console.log('this.state', this.state);
        }
        createVertices() {
            const { gl, programInfo: { program } } = this.state;
            const { vertices } = this.props;
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
            const coords = gl.getAttribLocation(program, Attrs.Coords);
            // gl.vertexAttrib3f(coords, 0, 0.8, 0);
            gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(coords);
            // gl.bindBuffer(gl.ARRAY_BUFFER, null);
            const pointSize = gl.getAttribLocation(program, Attrs.PointSize);
            gl.vertexAttrib1f(pointSize, 2);
            const color = gl.getUniformLocation(program, 'color');
            gl.uniform4f(color, 1, 0, 1, 1);
        }
        initBuffers() {
            // buffer colors
            const { gl } = this.state;
            const { vertices } = this.props;
            const colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
            // buffer vertices
            const verticesBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        }
    }
    const points = new Array(vertexCount * 2).fill(0).map(function (n) {
        return Math.random() * 2 - 1;
    });
    console.log(points);
    const gp = new GlPoints({
        vertices: points
    });
    gp.draw();
})(Animation02 || (Animation02 = {}));
//# sourceMappingURL=animations02.js.map