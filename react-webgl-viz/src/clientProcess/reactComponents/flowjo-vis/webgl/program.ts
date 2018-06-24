import { default as VertexBuffer } from './buffer';
import FragmentShader from './fragment-shader';
import { default as Resource, Handle, IResourceProps } from './resource';
import { getUniformSetter, UniformArrayType } from './uniforms';
import VertexArray from './vertex-array';
import VertexShader from './vertex-shader';

export interface IProgramProps extends IResourceProps {
    fs: string;
    vs: string;
    // , fs, defaultUniforms, varyings, bufferMode = GL_SEPARATE_ATTRIBS
}

export interface IProgramBuffers {
    [index: string]: VertexBuffer;
}

export interface IAttributeToLocationMap {
    [index: string]: number;
}

export interface IUniformToSetterMap {
    [index: string]: (value: UniformArrayType) => void;
}

export default class Program extends Resource {
    private readonly attributeToLocationMap: IAttributeToLocationMap = {};
    private readonly uniformSetters: IUniformToSetterMap = {};
    private readonly viewport = new Float32Array(2);
    private clearColor = 0xffffffff;

    get vertexArray() {
        const { gl } = this;
        return VertexArray.getInstance(gl);
    }

    constructor(gl: WebGL2RenderingContext | null, props: IProgramProps) {
        super(gl);
        this.initialize(props);
    }

    get program() {
        return this.handle as WebGLProgram;
    }

    public use() {
        const { gl, program } = this;
        gl.useProgram(program);
        return this;
    }

    /**
     * Sets named uniforms from a map, ignoring names.
     * For each key, value of the object passed in it executes setUniform(key, value).
     * program.setUniforms(object);
     * @param uniforms An object with key value pairs matching a uniform name and its value respectively.
     */
    public setUniforms(uniforms: { [index: string]: UniformArrayType }) {
        const { uniformSetters } = this;

        Object.keys(uniformSetters).map(k => {
            uniformSetters[k](uniforms[k]);
        });

        return this;
    }

    public setBuffers(buffers: IProgramBuffers) {
        const { attributeToLocationMap, vertexArray } = this;

        Object.keys(attributeToLocationMap).map(k => {
            vertexArray.setBuffer(attributeToLocationMap[k], buffers[k]);
        });

        return this;
    }

    public delete() {
        super.delete();
    }

    public setViewport(canvasWidth: number, canvasHeight: number) {
        const { gl } = this;
        gl.viewport(0, 0, canvasWidth, canvasHeight);
        // cache for speed later
        this.viewport[0] = canvasWidth;
        this.viewport[1] = canvasHeight;
        return this;
    }

    public setClearColor(color: number) {
        this.clearColor = color;
        return this;
    }

    public clear() {
        const { gl } = this;

        const c = this.clearColor;
        // note the alpha is always 1.0. This may change in the future, >>> operator needed to avoid sign ext

        gl.clearColor(
            // tslint:disable-next-line:no-bitwise
            (c & 0xff) / 255,
            // tslint:disable-next-line:no-bitwise
            ((c & 0xff00) >> 8) / 255,
            // tslint:disable-next-line:no-bitwise
            ((c & 0xff0000) >> 16) / 255,
            // tslint:disable-next-line:no-bitwise
            ((c & 0xff000000) >>> 24) / 255
        );
        gl.enable(gl.DEPTH_TEST);
        // tslint:disable-next-line:no-bitwise
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        return this;
    }

    protected createHandle(): Handle {
        const { gl } = this;
        return gl.createProgram();
    }

    private initialize(props: IProgramProps) {
        if (!props || !props.vs || !props.fs) {
            throw new Error('Invalid Program properties.');
        }

        const { gl } = this;
        const { fs, vs } = props;

        const vertexShader = new VertexShader(gl, vs);
        const fragmentShader = new FragmentShader(gl, fs);

        this.compileAndLink(vertexShader, fragmentShader);
        this.buildAttributeLocations();
        this.buildUniformLocations();
    }

    private compileAndLink(vertexShader: VertexShader, fragmentShader: FragmentShader) {
        const { gl, program } = this;
        gl.attachShader(program, vertexShader.shader);
        gl.attachShader(program, fragmentShader.shader);
        gl.linkProgram(program);

        // todo: implement debug level
        // todo: avoid checking program linking error in production
        // if (gl is set to debug  OR log priority is low) {
        //     gl.validateProgram(this.handle);
        //     const linked = gl.getProgramParameter(this.handle, gl.LINK_STATUS);
        //     if (!linked) {
        //         throw new Error(`Error linking: ${gl.getProgramInfoLog(this.handle)}`);
        //     }
        // }
    }

    private buildAttributeLocations() {
        const { attributeToLocationMap } = this;
        const { gl, program } = this;
        const attributeCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let location = 0; location < attributeCount; location++) {
            const activeAttrib = gl.getActiveAttrib(program, location);
            if (activeAttrib) {
                attributeToLocationMap[activeAttrib.name] = gl.getAttribLocation(
                    program,
                    activeAttrib.name
                );
            }
        }
    }

    private buildUniformLocations() {
        const { gl, program, uniformSetters } = this;
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const info = gl.getActiveUniform(program, i);
            if (info) {
                const uniformName = info.name;
                const uniformLocation = gl.getUniformLocation(program, uniformName);
                if (uniformLocation) {
                    uniformSetters[uniformName] = getUniformSetter(gl, uniformLocation, info);
                }
            }
        }
    }
}
