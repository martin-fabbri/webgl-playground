import { HTMLCanvasElementMock, WebGL2RenderingContextMock } from '../../test/webgl2-canvas-mock';

import { default as Texture2d } from './texture-2d';

const canvas = new HTMLCanvasElementMock(100, 100);
const gl = new WebGL2RenderingContextMock(canvas);

describe('WebGL#Program contruct', () => {
    it('texture construction successful', () => {
        const testTexture2d = new Texture2d(gl);
        expect(testTexture2d).toBeInstanceOf(Texture2d);
    });
});

