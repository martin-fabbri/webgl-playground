var Animation02;
(function (Animation02) {
    let Attrs;
    (function (Attrs) {
        Attrs["Position"] = "position";
    })(Attrs || (Attrs = {}));
    // vertex shader program
    // prettier-ignore
    const vsSource = `
        attribute vec2 position;
        
        varying vec2 texCoords;
        
        void main() {
            texCoords = (position + 1.0) / 2.0;
            texCoords.y = 1.0 - texCoords.y;
            gl_Position = vec4(position, 0, 1.0);
        }
    `;
    // fragment shader program
    const fs = `
        precision highp float;
    
        varying vec2 texCoords;
        
        uniform sampler2D textureSampler;
    
        void main() {
            float warmth = 0.2;
            float brightness = 0.2;
            
            vec4 color = texture2D(textureSampler, texCoords);
            
            color.r += warmth; 
            color.b -= warmth;
            
            color.rgb += brightness; 
            
            gl_FragColor = color;
        }
    `;
    class GlPoints {
        constructor(props) {
            this.draw = () => {
                const { gl } = this.state;
                const { vertices } = this.props;
                const texture = gl.createTexture();
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            };
            const { canvas } = props;
            this.state = {
                gl: canvas.getContext('webgl')
            };
            this.props = Object.assign({}, props);
            this.init();
        }
        init() {
            // console.log('webgl init');
            const { gl } = this.state;
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
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
        }
        createVertices() {
            const { gl, programInfo: { program } } = this.state;
            const { vertices } = this.props;
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            const coords = gl.getAttribLocation(program, Attrs.Position);
            // gl.vertexAttrib3f(coords, 0, 0.8, 0);
            gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(coords);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            // const color = gl.getUniformLocation(program, 'color');
            // gl.uniform4f(color, 0, 0, 0, 1);
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
    const image = new Image();
    image.src = 'image.jpg';
    image.onload = () => {
        const canvas = document.getElementById('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const gp = new GlPoints({
            canvas,
            vertices: [
                -1, -1,
                -1, 1,
                1, 1,
                -1, -1,
                1, 1,
                1, -1
            ]
        });
        gp.draw();
    };
})(Animation02 || (Animation02 = {}));
//# sourceMappingURL=imgproc04.js.map