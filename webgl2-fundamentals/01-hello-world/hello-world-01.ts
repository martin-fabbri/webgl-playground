namespace WebGL2HelloWorld {
    enum Attrs {
        Position = 'a_position'
    }

    type Optional<T> = T | undefined;

    // Collect all the info needed to use shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aVertexColor and also
    // look up for uniform locations
    interface IProgramInfo {
        readonly program: Optional<WebGLProgram>;
        attribLocations?: {
            vertexPosition: any;
            vertexColor: any;
        };
        uniformLocations?: {
            projectMatrix: any;
            modelViewMatrix: any;
        };
    }

    interface IState {
        // readonly gl: WebGLRenderingContext;
        readonly gl: WebGL2RenderingContext;
        // readonly colorsBuffer: Optional<WebGLBuffer>;
        // readonly verticesBuffer: Optional<WebGLBuffer>;
        readonly programInfo?: IProgramInfo;
    }

    interface IProps {
        readonly canvas: HTMLCanvasElement;
        readonly color?: number[];
        readonly pointsSize?: number;
        readonly vertices: number[];
    }

    // vertex shader program
    // prettier-ignore
    const vsSource = `#version 300 es
    
        // an attribute is an input (in) to a vertex shader.
        // it will receive data from a buffer
        in vec4 a_position;
        
        // all shader have a main function
        void main() {
            // gl_Position is a special variable a vertex shader
            // is responsible for setting
            gl_Position = a_position;
        
        }
    `;

    // fragment shader program
    const fs = `#version 300 es

        // fragment shaders don't have a default precision so we need to pick one. mediump is a good default.
        // it means "medium precision"
        precision mediump float;
        
        // we need to declare an output for the fragment shader
        out vec4 outColor;
        
        // all shader have a main function
        void main() {
            // just set the output to a constant redish-purple
            outColor = vec4(1, 0, 0.5, 1);
        }
    `;

    class GlPoints {
        private state: IState;
        private readonly props: IProps;

        constructor(props?: IProps) {
            const { canvas } = props;

            this.state = {
                gl: canvas.getContext('webgl2') as WebGL2RenderingContext
            };

            this.props = {
                ...props
            };

            this.init();
        }

        draw = () => {
            const { gl } = this.state;
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        private init() {
            // console.log('webgl init');
            const { gl } = this.state;
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clearColor(1, 0.8, 0.1, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            this.initBuffers();
            this.createShaders();
            this.createVertices();
        }

        private createShaders() {
            const { gl } = this.state;

            // vertex shader
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vsSource);
            gl.compileShader(vertexShader);

            const successVertexShader = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
            if (!successVertexShader) {
                console.error(
                    'An error occurred compiling the fragment shader.',
                    gl.getShaderInfoLog(vertexShader)
                );
                gl.deleteShader(vertexShader);
                return;
            }

            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fs);
            gl.compileShader(fragmentShader);
            const successFragmentShader = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
            if (!successFragmentShader) {
                console.error(
                    'An error occurred compiling the fragment shader.',
                    gl.getShaderInfoLog(fragmentShader)
                );
                gl.deleteShader(fragmentShader);
                return;
            }

            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            this.state = {
                ...this.state,
                programInfo: {
                    ...this.state.programInfo,
                    program
                }
            };
        }

        private createVertices() {
            const {
                gl,
                programInfo: { program }
            } = this.state;
            const { vertices } = this.props;

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

            gl.vertexAttribPointer(
                positionAttributeLocation,
                size,
                type,
                normalize,
                stride,
                offset
            );

            // const vao = gl.getAttribLocation(program, Attrs.Position);
            // gl.vertexAttribPointer(vao, 2, gl.FLOAT, false, 0, 0);
            // gl.enableVertexAttribArray(vao);
            // gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }

        private initBuffers() {
            // buffer colors
            const { gl } = this.state;
            const { vertices } = this.props;

            // buffer vertices
            const verticesBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        }
    }

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    const gp = new GlPoints({
        canvas,
        vertices: [0, 0, 0, 0.5, 0.7, 0]
    });

    gp.draw();
}
