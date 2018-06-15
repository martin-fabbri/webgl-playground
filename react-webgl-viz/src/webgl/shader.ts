import { default as Resource, Handle } from './resource';

class Shader extends Resource {
    protected createHandle(): Handle {
        return undefined;
    }
}

export default Shader;
