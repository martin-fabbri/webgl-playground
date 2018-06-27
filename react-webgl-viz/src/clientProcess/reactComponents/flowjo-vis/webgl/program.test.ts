import { fs, vs } from './../../../../../tests/webgl2-canvas-mock/fixture';

import { HTMLCanvasElementMock, WebGL2RenderingContextMock } from './../../../../../tests/webgl2-canvas-mock';

import { GL } from './constants';
import { default as Program, IProgramProps } from './program';
import { default as Texture2d } from './texture-2d';


// const BUFFER_DATA = new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]);

const canvas = new HTMLCanvasElementMock(100, 100);
const gl = new WebGL2RenderingContextMock(canvas);
const props: IProgramProps = {
    fs,
    vs
};

const testTexture2DUnit0 = new Texture2d(gl, {
    data: new Uint32Array([0, 32, 60, 255, 87, 235]),
    height: 3,
    internalFormat: GL.RGB,
    width: 2
});

const testTexture2DUnit1 = new Texture2d(gl, {
    data: new Float32Array([0.0, 32.0, 64.0, 128.0, 192.0, 255.0]),
    height: 1,
    internalFormat: GL.RED,
    width: 10
});

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

describe('WebGL#Program setUniforms', () => {
    it('sets a Texture2D as a uniform ', () => {
        const testProgram = new Program(gl, props);
        expect(testProgram).toBeInstanceOf(Program);
        expect(testProgram.program).toBeDefined();

        testProgram.setUniforms({
            u_testTextureUniformId0: testTexture2DUnit0,
            u_testTextureUniformId1: testTexture2DUnit1

        });

        expect(testTexture2DUnit0.textureUnit).toEqual(0);
        expect(testTexture2DUnit1.textureUnit).toEqual(1);
    });
});
