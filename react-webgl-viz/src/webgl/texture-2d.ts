import { GL } from './constants';
import { default as Resource, Handle, IResourceProps } from './resource';

export interface ITexture extends IResourceProps {
    target: number; // i.e. gl.TEXTURE_2D
}

export interface ITextureProps {
    data?: any;
    format?: number;
    type?: number;
    border?: number;
    recreate?: boolean;
    width?: number;
    height?: number;
    dataFormat?: any;
    offset?: number;
    level?: number;
}

export interface IDefaultProps {
    format: number;
    type: number;
    border: number;
    recreate: boolean;
    width: number;
    height: number;
    dataFormat: number;
    offset: number;
    level: number;
}

type TexturePropsWithDefaults = ITextureProps & IDefaultProps;

class Texture2d extends Resource {
    protected readonly props: ITextureProps;
    private textureUnit = 0;

    constructor(gl: WebGL2RenderingContext, props: ITextureProps = {}) {
        super(gl);
        this.props = {
            border: props.border || 0,
            data: props.data,
            dataFormat: props.dataFormat || gl.R8,
            format: props.format || GL.RGBA,
            height: props.height || 1,
            level: props.level || 0,
            offset: props.offset || 0,
            recreate: props.recreate || false,
            type: props.type || GL.UNSIGNED_BYTE,
            width: props.width || 1
        };
    }

    get texture() {
        return this.handle as WebGLTexture;
    }

    public bind(textureUnit = this.textureUnit) {
        const { gl, texture } = this;
        this.textureUnit = textureUnit;
        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return this;
    }

    public unbind() {
        const { gl } = this;
        gl.activeTexture(gl.TEXTURE0 + this.textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    public setImageData() {
        const { border, dataFormat, format, height, level, type, width, data } = this
            .props as TexturePropsWithDefaults;
        const { gl } = this;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, level, dataFormat, width, height, border, format, type, data);
        return this;
    }

    public setPixeldStorei(param: number, value: number) {
        const { gl } = this;
        gl.pixelStorei(param, value);
        return this;
    }

    public magnification() {
        const { gl } = this;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        return this;
    }

    public clamp() {
        const { gl } = this;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return this;
    }

    protected createHandle(): Handle {
        const { gl } = this;
        return gl.createTexture();
    }
}

export default Texture2d;
