import { HTMLCanvasElementMock, WebGL2RenderingContextMock } from './../../../../../tests/webgl2-canvas-mock';

import { default as Texture2d, ITextureProps } from './texture-2d';
import { GL } from './constants';

const canvas = new HTMLCanvasElementMock(100, 100);
const gl = new WebGL2RenderingContextMock(canvas);

const testR8Data = new Uint8Array([0, 32, 64, 128, 192, 255]);
const testR8DataProps: ITextureProps = {
    data: testR8Data,
    internalFormat: GL.R8,
    height: 2,
    width: 3
}

// const texture2d = new Texture2d(gl!, {
//     data,
//     internalFormat: gl!.R8,
//     dataFormat: gl!.RED,
//     height: 2,
//     type: gl!.UNSIGNED_BYTE,
//     width: 3
// });

describe('WebGL#Program construct', () => {
    it('texture construction successful', () => {
        const testTexture2d = new Texture2d(gl, testR8DataProps);
        expect(testTexture2d).toBeInstanceOf(Texture2d);

        expect(testTexture2d.textureProps.internalFormat).toEqual(GL.R8);
        expect(testTexture2d.textureProps.dataFormat).toEqual(GL.RED);
    });
});
