var Animation02;
(function (Animation02) {
    let Attrs;
    (function (Attrs) {
        Attrs["Position"] = "aCoords";
        Attrs["PointSize"] = "aPointSize";
        Attrs["Colors"] = "aVertexColors";
    })(Attrs || (Attrs = {}));
    // prettier-ignore
    const colors = [
        1.0, 1.0, 1.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0 // blue
    ];
    // vertex shader program
    // prettier-ignore
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
    const map = (value, minSrc, maxSrc, minDst, maxDst) => {
        return (value - minSrc) / (maxSrc - minSrc) * (maxDst - minDst) + minDst;
    };
    class GlPoints {
        constructor(props) {
            this.draw = () => {
                const { gl, mouseX, mouseY } = this.state;
                const { vertices } = this.props;
                // console.log('under draw', mouseX, mouseY);
                for (let i = 0; i < vertexCount; i += 2) {
                    const dx = vertices[i] - mouseX;
                    const dy = vertices[i + 1] - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 0.2) {
                        // console.log('Moving');
                        vertices[i] = mouseX + dx / dist * 0.2;
                        vertices[i + 1] = mouseY + dy / dist * 0.2;
                    }
                    else {
                        vertices[i] += Math.random() * 0.01 - 0.005;
                        vertices[i + 1] += Math.random() * 0.01 - 0.005;
                    }
                }
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.POINTS, 0, vertexCount);
                requestAnimationFrame(this.draw);
            };
            this.onMouseMoveHandler = (ev) => {
                // console.log('Mouse Move', ev.clientX, ev.clientY);
                const { height, width } = this.props;
                const mouseX = map(ev.clientX, 0, width, -1, 1);
                const mouseY = map(ev.clientY, 0, height, 1, 0);
                this.state = Object.assign({}, this.state, { mouseX,
                    mouseY });
                // console.log('this state', this.state.mouseX, this.state.mouseY);
            };
            const { canvas } = props;
            this.state = {
                gl: canvas.getContext('webgl'),
                mouseX: 0,
                mouseY: 0
            };
            this.props = Object.assign({}, props, { height: canvas.height, width: canvas.width });
            canvas.addEventListener('mousemove', this.onMouseMoveHandler);
            this.init();
        }
        init() {
            // console.log('webgl init');
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
            // console.log('this.state ----->>>>');
            // console.log('this.state', this.state);
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
    const canvas = document.getElementById('canvas');
    const vertexCount = 5000;
    const points = new Array(vertexCount * 2)
        .fill(0).map(n => (Math.random() * 2 - 1));
    const gp = new GlPoints({
        canvas,
        vertices: points
    });
    gp.draw();
})(Animation02 || (Animation02 = {}));
//# sourceMappingURL=interactions03.js.map