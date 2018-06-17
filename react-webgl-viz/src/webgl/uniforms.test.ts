import { getUniformSetter, toFloatArray, toIntArray, toUIntArray } from './uniforms';
import { HTMLCanvasElementMock, WebGL2RenderingContextMock } from '../../test/webgl2-canvas-mock';
import { fs, vs } from '../../test/webgl2-canvas-mock/fixture';
import { IProgramProps } from './program';
import Program from './program';

// const MATRIX_2 = [1, 0, 0, 1];
//
// const MATRIX_3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
// const MATRIX_4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

const canvas = new HTMLCanvasElementMock(100, 100);
const gl = new WebGL2RenderingContextMock(canvas);
const props: IProgramProps = {
    fs,
    vs
};

describe('WebGL#Uniforms#FloatArray', () => {
    it('convert an int array to a FloatArray', () => {
        const floatArray = toFloatArray([350, 220], 2);
        expect(floatArray).toBeInstanceOf(Float32Array);
        expect(floatArray.length).toEqual(2);
    });

    it('returns the same object if it is already a FloatArray32', () => {
        const floatArray = new Float32Array([350, 220]);
        const convetedArray = toFloatArray(floatArray, 2);
        expect(convetedArray).toBeInstanceOf(Float32Array);
        expect(convetedArray).toBe(floatArray);
    });

    it('convert from Uint32Array to FloatArray', () => {
        const uintArray = new Uint32Array([350, 220]);
        const convetedArray = toFloatArray(uintArray, 2);
        expect(convetedArray).toBeInstanceOf(Float32Array);
        expect(convetedArray.length).toEqual(2);
    });
});

describe('WebGL#Uniforms#toIntArray', () => {
    it('returns the same object if it is already an IntArray', () => {
        const intArray = new Int32Array([350, 220]);
        const convetedArray = toIntArray(intArray, 2);
        expect(convetedArray).toBeInstanceOf(Int32Array);
        expect(convetedArray).toBe(intArray);
    });

    it('converts a float array to an IntArray', () => {
        const floatArray = new Float32Array([350, 220]);
        const convertedArray = toIntArray(floatArray, 2);
        expect(convertedArray).toBeInstanceOf(Int32Array);
        expect(convertedArray.length).toEqual(2);
    });


    it('converts from Uint32Array to IntArray', () => {
        const uintArray = new Uint32Array([350, 220]);
        const convetedArray = toIntArray(uintArray, 2);
        expect(convetedArray).toBeInstanceOf(Int32Array);
        expect(convetedArray.length).toEqual(2);
    });

    it('converts a numbers array to Int32Array', () => {
        const numbersArray = [350, 220];
        const convetedArray = toIntArray(numbersArray, 2);
        expect(convetedArray).toBeInstanceOf(Int32Array);
        expect(convetedArray.length).toEqual(2);
    });
});

describe('WebGL#Uniforms#toUIntArray', () => {
    it('returns the same object if it is already a UIntArray', () => {
        const uintArray = new Uint32Array([350, 220]);
        const convetedArray = toUIntArray(uintArray, 2);
        expect(convetedArray).toBeInstanceOf(Uint32Array);
        expect(convetedArray).toBe(uintArray);
    });

    it('converts a float array to an UintArray', () => {
        const floatArray = new Float32Array([350, 220]);
        const convertedArray = toUIntArray(floatArray, 2);
        expect(convertedArray).toBeInstanceOf(Uint32Array);
        expect(convertedArray.length).toEqual(2);
    });

    it('converts a numbers array to UintArray', () => {
        const numbersArray = [350, 220];
        const convetedArray = toUIntArray(numbersArray, 2);
        expect(convetedArray).toBeInstanceOf(Uint32Array);
        expect(convetedArray.length).toEqual(2);
    });
});

describe('WebGL#Uniforms#getUniformSetter', () => {
    it('returns uniform setter', () => {
        const testProgram = new Program(gl, props);
        const location = gl.getUniformLocation(testProgram, 'uMVMatrix');
        const info: WebGLActiveInfo = {
            name: 'uMVMatrix',
            size: 1,
            type: 35676
        };
        const setter = getUniformSetter(gl, location!, info);
        expect(setter).toBeDefined();
    });
});

// export function getUniformSetter(
//     gl: WebGL2RenderingContext,
//     location: WebGLUniformLocation,
//     info: WebGLActiveInfo
// ) {
//     const setter = uniformSetters[info.type];
//     if (!setter) {
//         throw new Error(`Unknown GLSL uniform type ${info.type}`);
//     }
//     return setter.bind(null, gl, location);
// }
