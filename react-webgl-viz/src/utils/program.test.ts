import { HTMLCanvasElementMock, WebGL2RenderingContextMock } from './../../test/webgl2-canvas-mock';
import Program, { IProgramProps } from './program';

const vs = `
attribute vec3 positions;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying vec3 vPosition;

void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(positions, 1.0);
  vPosition = positions;
}
`;

const fs = `
void main(void) {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

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
        }).toThrow(/.*shader*/);

        expect(() => {
            const invalidProps = null;
            // @ts-ignore
            const prog = new Program(gl, invalidProps);
        }).toThrow(/.*shader*/);
        expect(() => {
            const invalidOpts = {};
            // @ts-ignore
            const prog = new Program(gl, invalidOpts as IProgramProps);
        }).toThrow(/.*shader*/);
    });

    it('program construction successful', () => {
        const program = new Program(gl, props);
        expect(program).toBeInstanceOf(Program);
    });
});
