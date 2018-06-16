import { invalidSource, fragmentShader, fs } from '../../test/webgl2-canvas-mock/fixture';
import { HTMLCanvasElementMock, WebGL2RenderingContextMock } from '../../test/webgl2-canvas-mock';
import { default as FragmentShader } from './fragment-shader';

const canvas = new HTMLCanvasElementMock(100, 100);
const gl = new WebGL2RenderingContextMock(canvas);

describe('WebGL#FragmentShader', () => {
    it('compiles provided shader source', () => {
        const shader = new FragmentShader(gl, fs);
        expect(shader).toBeInstanceOf(FragmentShader);
        expect(shader.id).toContain('FragmentShader');
        expect(shader.id).toContain('1');
        expect(shader.handle).toBe(fragmentShader);
    });

    it('should thrown an error when source is invalid', () => {
        expect(() => {
            new FragmentShader(gl, invalidSource);
        }).toThrow(/.*GLSL*/);
    });
});
