import { IWebGLProgramMock, IWebGLShaderMock } from './webgl2-rendering-context-mock';

export const vs = `
    attribute vec3 positions;
    attribute vec2 data;
    uniform mat4 uMVMatrix;
    uniform vec2 u_resolution;
    varying vec3 vPosition;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(positions, 1.0);
      vPosition = positions;
    }
`;

export const fs = `
    uniform vec4 u_color;
    
    void main(void) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

export const invalidSource = `
    void main(void) {
      gl_FragColor = 
    }
`;
export const invalidShaderInfoLog = 'invalid test shader source';

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
            name: 'uMVMatrix',
            size: 1,
            type: 35676
        },
        1: {
            name: 'u_color',
            size: 1,
            type: 35666
        },
        2: {
            name: 'u_resolution',
            size: 1,
            type: 35664
        }
    },
    parameters: {
        // ACTIVE_ATTRIBUTES
        0x8b89: 2,
        // ACTIVE_UNIFORMS
        0x8b86: 3
    }
};
