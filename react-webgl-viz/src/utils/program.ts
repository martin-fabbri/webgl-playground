
//  initialize({vs, fs, defaultUniforms, varyings, bufferMode = GL_SEPARATE_ATTRIBS} = {}) {

export interface IProgramOpts {
    fs: string;
    vs: string;
    // , fs, defaultUniforms, varyings, bufferMode = GL_SEPARATE_ATTRIBS
}

export default class Program {

    constructor(gl: WebGL2RenderingContext, opts: IProgramOpts) {
        if (!gl) {
            throw new Error('Invalid WebGLRenderingContext.');
        }

        this.initialize(opts);
    }


    private initialize(opts: IProgramOpts) {
        if (!opts || !opts.vs || !opts.fs) {
            throw new Error('Invalid shaders options.');
        }
    }



}