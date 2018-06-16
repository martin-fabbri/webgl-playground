import {
    invalidSource,
    vertexShader,
    vs
} from '../../test/webgl2-canvas-mock/fixture';
import {
    HTMLCanvasElementMock,
    WebGL2RenderingContextMock
} from '../../test/webgl2-canvas-mock';
import {default as VertexShader } from './vertex-shader';

const canvas = new HTMLCanvasElementMock(100, 100);
const gl = new WebGL2RenderingContextMock(canvas);

describe('WebGL#VertexShader', () => {
    it('compiles provided shader source', () => {
        const shader = new VertexShader(gl, vs);
        expect(shader).toBeInstanceOf(VertexShader);
        expect(shader.id).toContain('VertexShader');
        expect(shader.id).toContain('1');
        expect(shader.handle).toBe(vertexShader);
    });

    it('should thrown an error when source is invalid', () => {
        expect(() => {
            new VertexShader(gl, invalidSource);
        }).toThrow(/.*GLSL*/);
    })
});
