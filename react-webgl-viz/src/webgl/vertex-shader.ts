import { default as Shader, ShaderType } from './shader';
import { Handle } from './resource';

class VertexShader extends Shader {
    constructor(gl: WebGL2RenderingContext, source: string) {
        super(gl, ShaderType.VertexShader, source);
    }

    protected createHandle(): Handle {
        const {gl} = this;
        return gl.createShader(gl.VERTEX_SHADER);
    }
}

export default VertexShader;
