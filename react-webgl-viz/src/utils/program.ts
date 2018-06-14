//  initialize({vs, fs, defaultUniforms, varyings, bufferMode = GL_SEPARATE_ATTRIBS} = {}) {

import { default as Resource, Handle, IResourceProps } from './resource';

export interface IProgramProps extends IResourceProps {
    fs: string;
    vs: string;
    // , fs, defaultUniforms, varyings, bufferMode = GL_SEPARATE_ATTRIBS
}

export default class Program extends Resource {
    constructor(gl: WebGL2RenderingContext, props: IProgramProps) {
        super(gl);
        this.initialize(props);
    }

    public delete() {
        super.delete();
    }

    protected createHandle(): Handle {
        return undefined;
    }

    private initialize(opts: IProgramProps) {
        if (!opts || !opts.vs || !opts.fs) {
            throw new Error('Invalid shaders options.');
        }
    }
}
