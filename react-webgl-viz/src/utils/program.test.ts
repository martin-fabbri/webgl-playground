// import Program, { IProgramOpts } from './program';
import Program from './program';

// const vs = `
// attribute vec3 positions;
// uniform mat4 uMVMatrix;
// uniform mat4 uPMatrix;
// varying vec3 vPosition;
//
// void main(void) {
//   gl_Position = uPMatrix * uMVMatrix * vec4(positions, 1.0);
//   vPosition = positions;
// }
// `;
//
// const fs = `
// void main(void) {
//   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
// }
// `;

// const BUFFER_DATA = new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]);

// const validProgramOptions: IProgramOpts = {
//     fs,
//     vs
// };

// mock a canvas element
window.document.body.innerHTML = `<canvas id="test-canvas"/>`;
const mockCanvas = document.getElementById('test-canvas') as HTMLCanvasElement;
const mockGl = mockCanvas.getContext('webgl2');

describe('WebGL#Program construct/delete', () => {
    // it('throws error if gl is not passed in constructor', () => {
    //     expect(() => {
    //         let undefinedGl;
    //         // @ts-ignore
    //         new Program(undefinedGl, validProgramOptions);
    //     }).toThrow(/.*WebGLRenderingContext.*/);
    // });

    it('program throws on missing shader', () => {
        // expect(() => {
        //     // @ts-ignore
        //     let invalidOpts = undefined;
        //     // @ts-ignore
        //     new Program({} as WebGL2RenderingContext, invalidOpts);
        // }).toThrow(/.*shader*/);
        //
        // expect(() => {
        //     let invalidOpts = null;
        //     // @ts-ignore
        //     new Program({} as WebGL2RenderingContext, invalidOpts);
        // }).toThrow(/.*shader*/);

        // expect(() => {
        //     const invalidOpts = {};
        //     // @ts-ignore
        //     new Program({} as WebGL2RenderingContext, invalidOpts as IProgramOpts);
        // }).toThrow(/.*shader*/);
    });

    it('program construction successful', () => {
        expect(mockGl).toBeInstanceOf(Program);
    });
});