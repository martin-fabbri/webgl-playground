var WebGL2HelloWorld;
(function (WebGL2HelloWorld) {
    let Attrs;
    (function (Attrs) {
        Attrs["Position"] = "a_position";
        Attrs["Resolution"] = "u_resolution";
        Attrs["Color"] = "u_color";
    })(Attrs || (Attrs = {}));
    // vertex shader program
    // prettier-ignore
    const vsSource = `#version 300 es
        // an attribute is an input (in) to a vertex shader.
        // it will receive data from a buffer
        // in vec4 a_position;
        in vec2 a_position;
        
        uniform vec2 u_resolution;
        
        // all shader have a main function
        void main() {
            // convert the position from pixels to 0.0 to 1.0
            vec2 zeroToOne = a_position / u_resolution;
        
            // convert from 0->1 to 0->2
            vec2 zeroToTwo = zeroToOne * 2.0;
        
            // convert from 0->2 to -1->+1 (clipspace)
            vec2 clipSpace = zeroToTwo -1.0;
        
            // gl_Position is a special variable a vertex shader
            // is responsible for setting
            // gl_Position = vec4(clipSpace, 0, 1);
            gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        }
    `;
    // fragment shader program
    const fs = `#version 300 es

        // fragment shaders don't have a default precision so we need to pick one. mediump is a good default.
        // it means "medium precision"
        precision mediump float;
        
        uniform vec4 u_color;
        
        // we need to declare an output for the fragment shader
        out vec4 outColor;
        
        // all shader have a main function
        void main() {
            // just set the output to a constant redish-purple
            outColor = u_color;
        }
    `;
    class GlPoints {
        constructor(props) {
            this.draw = () => {
                const { gl } = this.state;
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            };
            const { canvas } = props;
            this.state = {
                gl: canvas.getContext('webgl2')
            };
            this.props = Object.assign({}, props);
            this.init();
        }
        init() {
            // console.log('webgl init');
            const { gl } = this.state;
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(1, 0.8, 0.1, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
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
            const successVertexShader = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
            if (!successVertexShader) {
                console.error('An error occurred compiling the fragment shader.', gl.getShaderInfoLog(vertexShader));
                gl.deleteShader(vertexShader);
                return;
            }
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fs);
            gl.compileShader(fragmentShader);
            const successFragmentShader = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
            if (!successFragmentShader) {
                console.error('An error occurred compiling the fragment shader.', gl.getShaderInfoLog(fragmentShader));
                gl.deleteShader(fragmentShader);
                return;
            }
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);
            this.state = Object.assign({}, this.state, { programInfo: Object.assign({}, this.state.programInfo, { program }) });
        }
        createVertices() {
            const { gl, programInfo: { program } } = this.state;
            const { canvas, vertices } = this.props;
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            // collection of attribute state
            // ????
            // const vao = gl.createVertexArray();
            // gl.bindVertexArray(vao);
            // ????
            const positionAttributeLocation = gl.getAttribLocation(program, Attrs.Position);
            gl.enableVertexAttribArray(positionAttributeLocation);
            const size = 2; // 2 components per interaction
            const type = gl.FLOAT; // the data is 32 bit floats
            const normalize = false; // don't normalize the data
            const stride = 0; // 0 = move forward size * sizeof(type)
            const offset = 0; // start at the beginning of the buffer
            gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
            const resolutionUniformLocation = gl.getUniformLocation(program, Attrs.Resolution);
            gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
            const colorUniform = gl.getUniformLocation(program, Attrs.Color);
            // Set a random color.
            gl.uniform4f(colorUniform, Math.random(), Math.random(), Math.random(), 1);
            // const vao = gl.getAttribLocation(program, Attrs.Position);
            // gl.vertexAttribPointer(vao, 2, gl.FLOAT, false, 0, 0);
            // gl.enableVertexAttribArray(vao);
            // gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }
        initBuffers() {
            // buffer colors
            const { gl } = this.state;
            const { vertices } = this.props;
            // buffer vertices
            const verticesBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        }
    }
    const canvas = document.getElementById('canvas');
    const gp = new GlPoints({
        canvas,
        // vertices: [0, 0, 0, 0.5, 0.7, 0]
        vertices: [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30]
    });
    gp.draw();
})(WebGL2HelloWorld || (WebGL2HelloWorld = {}));
//# sourceMappingURL=texture-data-02.jss.map