import { fs, vs } from '../../test/webgl2-canvas-mock/fixture';

import { HTMLCanvasElementMock, WebGL2RenderingContextMock } from '../../test/webgl2-canvas-mock';

import Program, { IProgramProps } from './program';

// const BUFFER_DATA = new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]);

const canvas = new HTMLCanvasElementMock(100, 100);
const gl = new WebGL2RenderingContextMock(canvas);
const props: IProgramProps = {
    fs,
    vs
};

describe('WebGL#Program construct/delete', () => {
    it('throws error if gl is not passed in constructor', () => {
        expect(() => {
            const undefinedGl = undefined;
            // @ts-ignore
            const prog = new Program(undefinedGl, props);
        }).toThrow(/.*WebGLRenderingContext.*/);
    });

    it('program throws on missing shader', () => {
        expect(() => {
            const invalidProps = undefined;
            // @ts-ignore
            const prog = new Program(gl, invalidProps);
        }).toThrow(/.*Invalid*/);

        expect(() => {
            const invalidProps = null;
            // @ts-ignore
            const prog = new Program(gl, invalidProps);
        }).toThrow(/.*Invalid*/);
        expect(() => {
            const invalidOpts = {};
            // @ts-ignore
            const prog = new Program(gl, invalidOpts as IProgramProps);
        }).toThrow(/.*Invalid*/);
    });

    it('program construction successful', () => {
        const testProgram = new Program(gl, props);
        expect(testProgram).toBeInstanceOf(Program);
        expect(testProgram.program).toBeDefined();
    });
});
