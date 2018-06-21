import { IWebGLProgramMock, IWebGLShaderMock } from './webgl2-rendering-context-mock';

export const vs = `
precision highp float;

void main(void) {
  gl_Position = vec4(0., 0., 0., 0.);
}
`;

export const fs = `
precision highp float;

uniform float f;
uniform vec2 v2;
uniform vec3 v3;
uniform vec4 v4;
uniform vec4 v4Array[4];

uniform int i;
uniform ivec2 iv2;
uniform ivec3 iv3;
uniform ivec4 iv4;

uniform bool b;
uniform bvec2 bv2;
uniform bvec3 bv3;
uniform bvec4 bv4;

uniform mat2 m2;
uniform mat3 m3;
uniform mat4 m4;

uniform sampler2D s2d;
// uniform samplerCube sCube;

void main(void) {
  vec4 v = vec4(f) + vec4(v2, 0., 0.) + vec4(v3, 0.) + v4;

  // Note: Insructions added in a way to create dependecy between i, and iv* variables,
  // without this dependecy compiler can otimize the shader and remove these uniforms.
  ivec4 iv = ivec4(i, 0, 0, 0);
  iv = iv + ivec4(iv2, 0, 0);
  iv = iv + ivec4(iv3, 0);
  iv = iv + iv4;

  bvec4 bv = bv4;
  bv = bvec4(bv3, 0.);
  bv = bvec4(bv2, 0., 0.);
  bv = bvec4(b);

  // Note: Insructions added in a way to create dependecy between transform_v* variables,
  // without this dependecy compiler can otimize the shader and remove these uniforms.
  vec2 transform_v2 = m2 * v2;
  vec3 transform_v3 = m3 * v3;
  vec4 transform_v4 = m4 * v4;
  transform_v4 = vec4(transform_v2, 0., 0.) + vec4(transform_v3, 0.);

  for (int index = 0; index < 4; index++) {
    transform_v4 += v4Array[index];
  }

  v = texture2D(s2d, v2);

  gl_FragColor = vec4(transform_v2, 1.0, 1.0) + vec4(transform_v3, 1.0) + transform_v4;
}
`;

export const vertexShader: IWebGLShaderMock = {
    compiled: false,
    hasErrors: false,
    infoLog: null,
    source: undefined,
    type: 0x8b31
};

export const fragmentShader: IWebGLShaderMock = {
    compiled: false,
    hasErrors: false,
    infoLog: null,
    source: undefined,
    type: 0x8b30
};

export const program: IWebGLProgramMock = {
    activeAttrib: {
        0: {
            name: 'positions',
            size: 1,
            type: 0
        },
        1: {
            name: 'data',
            size: 1,
            type: 0
        }
    },
    activeUniform: {
        0: {
            name: 'f',
            size: 1,
            type: 0x1406 // GL_FLOAT
        },
        1: {
            name: 'v2',
            size: 1,
            type: 0x8B50 // FLOAT_VEC2
        },
        2: {
            name: 'v3',
            size: 1,
            type: 0x8B51 // FLOAT_VEC3
        },
        3: {
            name: 'v4',
            size: 1,
            type: 0x8B52 // FLOAT_VEC4
        },
        4 : {
            name: 'i',
            size: 1,
            type: 0x1404 // INT
        },
        5 : {
            name: 'iv2',
            size: 1,
            type: 0x8B53 // INT_VEC2
        },
        6 : {
            name: 'iv3',
            size: 1,
            type: 0x8B54 // INT_VEC3
        },
        7 : {
            name: 'iv4',
            size: 1,
            type: 0x8B55 // INT_VEC4
        },
        8 : {
            name: 'b',
            size: 1,
            type: 0x8B56 // BOOL
        },
        9 : {
            name: 'bv2',
            size: 1,
            type: 0x8B57 // BOOL_VEC2
        },
        10 : {
            name: 'bv3',
            size: 1,
            type: 0x8B58 // BOOL_VEC3
        },
        11 : {
            name: 'bv4',
            size: 1,
            type: 0x8B59 // BOOL_VEC4
        },
        12 : {
            name: 'm2',
            size: 1,
            type: 0x8B5A // FLOAT_MAT2
        },
        13 : {
            name: 'm3',
            size: 1,
            type: 0x8B5B // FLOAT_MAT3
        },
        14 : {
            name: 'm3',
            size: 1,
            type: 0x8B5C // FLOAT_MAT4
        },
        15 : {
            name: 's2d',
            size: 1,
            type: 0x8B5E // SAMPLER_2D
        }
    },
    parameters: {
        // ACTIVE_ATTRIBUTES
        0x8b89: 2,
        // ACTIVE_UNIFORMS
        0x8b86: 16
    }
};

// const MATRIX_2 = [
//     1, 0,
//     0, 1
// ];
//
// const MATRIX_3 = [
//     1, 0, 0,
//     0, 1, 0,
//     0, 0, 1
// ];
// const MATRIX_4 = [
//     1, 0, 0, 0,
//     0, 1, 0, 0,
//     0, 0, 1, 0,
//     0, 0, 0, 1
// ];

// const testUniforms = {
//     f: 1.0,
//
//     b: true, // BOOL  0x8B56
//     // @ts-ignore: TS2345
//     bv2: new Int32Array([false, true]), // BOOL_VEC2 0x8B57
//     // @ts-ignore: TS2345
//     bv3: new Int32Array([false, true, false]), // BOOL_VEC3 0x8B58
//     // @ts-ignore: TS2345
//     bv4: new Int32Array([false, true, false, true]), // BOOL_VEC4 0x8B59
//
//     i: -1,
//     iv2: new Int32Array([1, 2]), // INT_VEC2  0x8B53
//     iv3: new Int32Array([1, 2, 3]), // INT_VEC3  0x8B54
//     iv4: new Int32Array([1, 2, 3, 4]), // INT_VEC4  0x8B55
//
//     m2: new Float32Array(MATRIX_2), // FLOAT_MAT2  0x8B5A
//     m3: new Float32Array(MATRIX_3), // FLOAT_MAT3  0x8B5B
//     m4: new Float32Array(MATRIX_4), // FLOAT_MAT4  0x8B5C
//
//     s2d: new Texture2D(fixture.gl),    // SAMPLER_2D  0x8B5E
//
//     v2: new Float32Array([1, 2]), // FLOAT_VEC2  0x8B50
//     v3: new Float32Array([1, 2, 3]), // FLOAT_VEC3  0x8B51
//     v4: new Float32Array([1, 2, 3, 4]), // FLOAT_VEC4  0x8B52
// };

