import { Handle } from './resource';
import { default as Shader, ShaderType } from './shader';

class FragmentShader extends Shader {
    constructor(gl: WebGL2RenderingContext, source: string) {
        super(gl, ShaderType.FragmentShader, source);
    }

    protected createHandle(): Handle {
        const {gl} = this;
        return gl.createShader(gl.FRAGMENT_SHADER);
    }
}

export default FragmentShader;
