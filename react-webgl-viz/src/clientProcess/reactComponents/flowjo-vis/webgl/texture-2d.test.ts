import { HTMLCanvasElementMock, WebGL2RenderingContextMock } from './../../../../../tests/webgl2-canvas-mock';

import { GL } from './constants';
import { default as Texture2d, ITextureProps } from './texture-2d';

const canvas = new HTMLCanvasElementMock(100, 100);
const gl = new WebGL2RenderingContextMock(canvas);

const testR8Data = new Uint8Array([0, 32, 64, 128, 192, 255]);
const testR8DataProps: ITextureProps = {
    data: testR8Data,
    height: 2,
    internalFormat: GL.R8,
    width: 3
};
const testRedData = new Float32Array([0.0, 32.0, 64.0, 128.0, 192.0, 255.0]);
const testRedDataProps: ITextureProps = {
    data: testRedData,
    height: 1,
    internalFormat: GL.RED,
    width: 10
};
// const densityLevelsTexture = new Texture2d(gl, {
//     dataFormat: gl.R32F,
//     internalFormat: gl.RED,
//     height: 1,
//     type: gl.FLOAT,
//     width: levels.length
// });

describe('WebGL#Program construct', () => {
    it('constructs a texture using R8 common combinations', () => {
        const testTexture2d = new Texture2d(gl, testR8DataProps);
        expect(testTexture2d).toBeInstanceOf(Texture2d);

        expect(testTexture2d.textureProps.internalFormat).toEqual(GL.R8);
        expect(testTexture2d.textureProps.dataFormat).toEqual(GL.RED);
        expect(testTexture2d.textureProps.type).toEqual(GL.UNSIGNED_BYTE);
        expect(testTexture2d.textureProps.border).toEqual(0);
        expect(testTexture2d.textureProps.width).toEqual(testR8DataProps.width);
        expect(testTexture2d.textureProps.height).toEqual(testR8DataProps.height);
        expect(testTexture2d.textureProps.data).toEqual(testR8DataProps.data);
    });

    it('constructs a texture using RED common combinations', () => {
        const testTexture2d = new Texture2d(gl, testRedDataProps);
        expect(testTexture2d).toBeInstanceOf(Texture2d);

        expect(testTexture2d.textureProps.internalFormat).toEqual(GL.RED);
        expect(testTexture2d.textureProps.dataFormat).toEqual(GL.R32F);
        expect(testTexture2d.textureProps.type).toEqual(GL.FLOAT);
        expect(testTexture2d.textureProps.border).toEqual(0);
        expect(testTexture2d.textureProps.width).toEqual(testRedDataProps.width);
        expect(testTexture2d.textureProps.height).toEqual(testRedDataProps.height);
        expect(testTexture2d.textureProps.data).toEqual(testRedDataProps.data);
    });
});



