import FragmentShader from './fragment-shader';
import { default as Resource, Handle, IResourceProps } from './resource';
import VertexShader from './vertex-shader';

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
    // private readonly uniformSetters: IAttributeToLocationMap = {};

    constructor(gl: WebGL2RenderingContext | null, props: IProgramProps) {
        super(gl);
        this.initialize(props);
    }

    get program() {
        return this.handle as WebGLProgram;
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

    // // query uniform locations and build name to setter map.
    // _queryUniformLocations() {
    //     const {gl} = this;
    //     this._uniformSetters = {};
    //     this._uniformCount = this.getUniformCount();
    //     for (let i = 0; i < this._uniformCount; i++) {
    //         const info = this.getUniformInfo(i);
    //         const parsedName = parseUniformName(info.name);
    //         const location = this.getUniformLocation(parsedName.name);
    //         this._uniformSetters[parsedName.name] =
    //             getUniformSetter(gl, location, info, parsedName.isArray);
    //     }
    //     this._textureIndexCounter = 0;
    // }
    //
    // this._getParameter(GL.ACTIVE_UNIFORMS);
    //
    //   _getParameter(pname) {
    //     return this.gl.getProgramParameter(this.handle, pname);
    //   }
    //
    //
    // getUniformInfo(index) {
    //     return this.gl.getActiveUniform(this.handle, index);
    // }
    // return this.gl.getUniformLocation(this.handle, name);

    private buildUniformLocations() {
        // const {gl, program, uniformSetters} = this;
        const { gl, program } = this;
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const info = gl.getActiveUniform(program, i);
            if (info) {
                const uniformName = info.name;
                // const uniformLocation = gl.getUniformLocation(program, uniformName);
                gl.getUniformLocation(program, uniformName);
                // uniformSetters[uniformName] = getUniformSetter(gl, location, info, parsedName.isArray);
            }
        }
    }
}
