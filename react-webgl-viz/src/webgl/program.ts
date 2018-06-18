import FragmentShader from './fragment-shader';
import { default as Resource, Handle, IResourceProps } from './resource';
import VertexShader from './vertex-shader';
import { getUniformSetter, UniformArrayType } from './uniforms';

export interface IProgramProps extends IResourceProps {
    fs: string;
    vs: string;
    // , fs, defaultUniforms, varyings, bufferMode = GL_SEPARATE_ATTRIBS
}

export interface IProgramBuffers {
    [index: string]: any;
}

export interface IAttributeToLocationMap {
    [index: string]: any;
}

export default class Program extends Resource {
    private readonly attributeToLocationMap: IAttributeToLocationMap = {};
    private readonly uniformSetters: IAttributeToLocationMap = {};

    constructor(gl: WebGL2RenderingContext | null, props: IProgramProps) {
        super(gl);
        this.initialize(props);
    }

    get program() {
        return this.handle as WebGLProgram;
    }

    public use() {
        const {gl, program} = this;
        gl.useProgram(program);
        return this;
    }

    /**
     * Sets named uniforms from a map, ignoring names.
     * For each key, value of the object passed in it executes setUniform(key, value).
     * program.setUniforms(object);
     * @param uniforms (object) - An object with key value pairs matching a uniform name and its value respectively.
     * @param samplers // todo: do we need samplers???
     */
    public setUniforms(uniforms: {[index: string]: UniformArrayType}, samplers = {}) {

    }

    public setBuffers(buffers: IProgramBuffers) {
        return this;
    }

    public delete() {
        super.delete();
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
        const {gl, program, uniformSetters} = this;
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
