//  initialize({vs, fs, defaultUniforms, varyings, bufferMode = GL_SEPARATE_ATTRIBS} = {}) {

import { default as Resource, Handle, IResourceProps } from './resource';
import VertexShader from './vertex-shader';
import FragmentShader from './fragment-shader';

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

    constructor(gl: WebGL2RenderingContext, props: IProgramProps) {
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
        const {gl} = this;
        return gl.createProgram();
    }

    private initialize(props: IProgramProps) {
        if (!props || !props.vs || !props.fs) {
            throw new Error('Invalid Program properties.');
        }

        const {gl} = this;
        const {fs, vs} = props;

        const vertexShader = new VertexShader(gl, vs);
        const fragmentShader = new FragmentShader(gl, fs);
        this.compileAndLink(vertexShader, fragmentShader);
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

        this.buildAttributeLocations();

    }


    // // query attribute locations and build name to location map.
    // _queryAttributeLocations() {
    //     this._attributeToLocationMap = {};
    //     this._attributeCount = this.getAttributeCount();
    //     for (let location = 0; location < this._attributeCount; location++) {
    //         const name = this.getAttributeInfo(location).name;
    //         this._attributeToLocationMap[name] = this.getAttributeLocation(name);
    //     }
    //     this._warnedLocations = {};
    // }

    // return this._getParameter(GL.ACTIVE_ATTRIBUTES);
    //  _getParameter(pname) {
    //     return this.gl.getProgramParameter(this.handle, pname);
    //   }
    //   getAttributeInfo(location) {
    //     return this.gl.getActiveAttrib(this.handle, location);
    //   }
    //   getAttributeLocation(attributeName) {
    //     return this.gl.getAttribLocation(this.handle, attributeName);
    //   }

    private buildAttributeLocations() {
        const {attributeToLocationMap} = this;
        const {gl, program} = this;
        const attributeCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let location = 0; location < attributeCount; location++) {
            const activeAttrib = gl.getActiveAttrib(program, location);
            if (activeAttrib) {
                // this._attributeToLocationMap[name] = this.getAttributeLocation(name);
                attributeToLocationMap[activeAttrib.name] = gl.getAttribLocation(program, activeAttrib.name);
            }
        }
    }
}
