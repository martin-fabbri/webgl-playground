import { IWebGLProgramMock, IWebGLShaderMock } from './webgl2-rendering-context-mock';

export const vs = `
    attribute vec3 positions;
    attribute vec2 data;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    varying vec3 vPosition;
    
    void main(void) {
      gl_Position = uPMatrix * uMVMatrix * vec4(positions, 1.0);
      vPosition = positions;
    }
`;

export const fs = `
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
    type: 0x8b31,
    compiled: false,
    hasErrors: false,
    source: undefined,
    infoLog: null
};


export const fragmentShader: IWebGLShaderMock = {
    type: 0x8b30,
    compiled: false,
    hasErrors: false,
    source: undefined,
    infoLog: null
};

export const program: IWebGLProgramMock = {
    parameters: {
        //ACTIVE_ATTRIBUTES
        0x8B89: 2
    },
    activeAttrib: {
        0: {
            name: 'positions',
            size: 100,
            type: 0
        },
        1: {
            name: 'data',
            size: 100,
            type: 0
        }
    }
};
