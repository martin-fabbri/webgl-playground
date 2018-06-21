var WebGL2HelloWorld;
(function (WebGL2HelloWorld) {
    let Attrs;
    (function (Attrs) {
        Attrs["Position"] = "a_position";
        Attrs["Texcoord"] = "a_texcoord";
        Attrs["Resolution"] = "u_resolution";
        Attrs["Color"] = "u_color";
    })(Attrs || (Attrs = {}));
    function degToRad(d) {
        return d * Math.PI / 180;
    }
    // vertex shader program
    // prettier-ignore
    const vsSource = `#version 300 es
        // an attribute is an input (in) to a vertex shader.
        // It will receive data from a buffer
        in vec2 a_position;
        in vec2 a_texcoord;
                
        // A matrix to transform the positions by
        uniform vec2 u_resolution;
        
        // a varying to pass the texture coordinates to the fragment shader
        out vec2 setTexcoords;
        
        // all shaders have a main function
        void main() {
           // convert the rectangle from pixels to 0.0 to 1.0
            vec2 zeroToOne = a_position / u_resolution;
            // convert from 0->1 to 0->2
            vec2 zeroToTwo = zeroToOne * 2.0;
            // convert from 0->2 to -1->+1 (clipspace)
            vec2 clipSpace = zeroToTwo - 1.0;
        
        
          // Multiply the position by the matrix.
          gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        
          // Pass the texcoord to the fragment shader.
          v_texcoord = a_texcoord;
        }
    `;
    // fragment shader program
    const fs = `#version 300 es
        precision mediump float;
        
        // Passed in from the vertex shader.
        in vec2 v_texcoord;
        
        // The texture.
        uniform sampler2D u_texture;
        
        // we need to declare an output for the fragment shader
        out vec4 outColor;
        
        void main() {
          outColor = texture(u_texture, v_texcoord);
        }
    `;
    class GlPoints {
        constructor(props) {
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
            const texcoorAttributeLocation = gl.getAttribLocation(program, Attrs.Texcoord);
            // look up uniform locations
            const resolutionLocation = gl.getUniformLocation(program, Attrs.Resolution);
            const textureLocation = gl.getUniformLocation(program, 'u_texture');
            const positionBuffer = gl.createBuffer();
            const vao = gl.createVertexArray();
            gl.bindVertexArray(vao);
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            this.setGeometry();
            let size = 2; // 2 components per interaction
            let type = gl.FLOAT; // the data is 32 bit floats
            let normalize = false; // don't normalize the data
            let stride = 0; // 0 = move forward size * sizeof(type)
            let offset = 0; // start at the beginning of the buffer
            gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
            const texcoorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoorBuffer);
            this.setTexcoords();
            // Turn on the attribute
            gl.enableVertexAttribArray(texcoorAttributeLocation);
            // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
            size = 2; // 2 components per iteration
            type = gl.FLOAT; // the data is 32bit floating point values
            normalize = true; // convert from 0-255 to 0.0-1.0
            stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next color
            offset = 0; // start at the beginning of the buffer
            gl.vertexAttribPointer(texcoorAttributeLocation, size, type, normalize, stride, offset);
            const texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0 + 0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            const level = 0;
            const internalFormat = gl.R8;
            const width = 3;
            const height = 2;
            const border = 0;
            const format = gl.RED;
            type = gl.UNSIGNED_BYTE;
            const data = new Uint8Array([
                0, 32, 64, 128, 192, 255
            ]);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // Clear the canvas AND the depth buffer.
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // Tell it to use our program (pair of shaders)
            gl.useProgram(program);
            // Bind the attribute/buffer set we want.
            gl.bindVertexArray(vao);
            // Set the matrix.
            gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
            // Tell the shader to use texture unit 0 for u_texture
            gl.uniform1i(textureLocation, 0);
            // Draw the geometry.
            const primitiveType = gl.TRIANGLES;
            gl.drawArrays(primitiveType, 0, 6);
        }
        setTexcoords() {
            const { gl } = this.state;
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                // select the bottom left image
                1.0, 0.0,
                1.0, 1.0,
                0.0, 0.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0,
            ]), gl.STATIC_DRAW);
        }
        setGeometry() {
            const { gl } = this.state;
            const positions = new Float32Array([
                20, 20,
                120, 20,
                20, 80,
                20, 80,
                120, 20,
                120, 80
            ]);
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        }
    }
    const canvas = document.getElementById('canvas');
    const gp = new GlPoints({
        canvas,
        // vertices: [0, 0, 0, 0.5, 0.7, 0]
        vertices: [
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,
        ]
    });
})(WebGL2HelloWorld || (WebGL2HelloWorld = {}));
//# sourceMappingURL=texture-data-02.js.map