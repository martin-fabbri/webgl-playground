import { UniformArrayType } from './../../src/clientProcess/reactComponents/flowjo-vis/webgl/uniforms';

import {
    fragmentShader,
    fs,
    invalidShaderInfoLog,
    invalidSource,
    program,
    vertexShader,
    vs
} from './fixture';

export interface IWebGLShaderMock extends WebGLShader {
    type: number;
    compiled: boolean;
    hasErrors: boolean;
    source: string | undefined;
    infoLog: string | null;
}

export interface IProgramParametersMock {
    [index: number]: any;
}

export interface IActiveAttribMock {
    [index: number]: WebGLActiveInfo;
}

export interface IWebGLUniformLocationMock extends WebGLUniformLocation {
    readonly name: string;
    readonly size: number;
    readonly type: number;
    data?: UniformArrayType;
}

export interface IActiveUniforMock {
    [index: number]: IWebGLUniformLocationMock | null;
}

export interface IWebGLProgramMock extends WebGLProgram {
    parameters: IProgramParametersMock;
    activeAttrib: IActiveAttribMock;
    activeUniform: IActiveUniforMock;
}

class WebGL2RenderingContextMock implements WebGL2RenderingContext {
    public readonly ACTIVE_ATTRIBUTES: number = 0x8b89;
    public readonly ACTIVE_TEXTURE: number = -1;
    public readonly ACTIVE_UNIFORMS: number = 0x8b86;
    public readonly ACTIVE_UNIFORM_BLOCKS: number = -1;
    public readonly ALIASED_LINE_WIDTH_RANGE: number = -1;
    public readonly ALIASED_POINT_SIZE_RANGE: number = -1;
    public readonly ALPHA: number = -1;
    public readonly ALPHA_BITS: number = -1;
    public readonly ALREADY_SIGNALED: number = -1;
    public readonly ALWAYS: number = -1;
    public readonly ANY_SAMPLES_PASSED: number = -1;
    public readonly ANY_SAMPLES_PASSED_CONSERVATIVE: number = -1;
    public readonly ARRAY_BUFFER: number = -1;
    public readonly ARRAY_BUFFER_BINDING: number = -1;
    public readonly ATTACHED_SHADERS: number = -1;
    public readonly BACK: number = -1;
    public readonly BLEND: number = -1;
    public readonly BLEND_COLOR: number = -1;
    public readonly BLEND_DST_ALPHA: number = -1;
    public readonly BLEND_DST_RGB: number = -1;
    public readonly BLEND_EQUATION: number = -1;
    public readonly BLEND_EQUATION_ALPHA: number = -1;
    public readonly BLEND_EQUATION_RGB: number = -1;
    public readonly BLEND_SRC_ALPHA: number = -1;
    public readonly BLEND_SRC_RGB: number = -1;
    public readonly BLUE_BITS: number = -1;
    public readonly BOOL: number = -1;
    public readonly BOOL_VEC2: number = -1;
    public readonly BOOL_VEC3: number = -1;
    public readonly BOOL_VEC4: number = -1;
    public readonly BROWSER_DEFAULT_WEBGL: number = -1;
    public readonly BUFFER_SIZE: number = -1;
    public readonly BUFFER_USAGE: number = -1;
    public readonly BYTE: number = -1;
    public readonly CCW: number = -1;
    public readonly CLAMP_TO_EDGE: number = -1;
    public readonly COLOR: number = -1;
    public readonly COLOR_ATTACHMENT0: number = -1;
    public readonly COLOR_ATTACHMENT1: number = -1;
    public readonly COLOR_ATTACHMENT10: number = -1;
    public readonly COLOR_ATTACHMENT11: number = -1;
    public readonly COLOR_ATTACHMENT12: number = -1;
    public readonly COLOR_ATTACHMENT13: number = -1;
    public readonly COLOR_ATTACHMENT14: number = -1;
    public readonly COLOR_ATTACHMENT15: number = -1;
    public readonly COLOR_ATTACHMENT2: number = -1;
    public readonly COLOR_ATTACHMENT3: number = -1;
    public readonly COLOR_ATTACHMENT4: number = -1;
    public readonly COLOR_ATTACHMENT5: number = -1;
    public readonly COLOR_ATTACHMENT6: number = -1;
    public readonly COLOR_ATTACHMENT7: number = -1;
    public readonly COLOR_ATTACHMENT8: number = -1;
    public readonly COLOR_ATTACHMENT9: number = -1;
    public readonly COLOR_BUFFER_BIT: number = -1;
    public readonly COLOR_CLEAR_VALUE: number = -1;
    public readonly COLOR_WRITEMASK: number = -1;
    public readonly COMPARE_REF_TO_TEXTURE: number = -1;
    public readonly COMPILE_STATUS: number = 0x8b81;
    public readonly COMPRESSED_TEXTURE_FORMATS: number = -1;
    public readonly CONDITION_SATISFIED: number = -1;
    public readonly CONSTANT_ALPHA: number = -1;
    public readonly CONSTANT_COLOR: number = -1;
    public readonly CONTEXT_LOST_WEBGL: number = -1;
    public readonly COPY_READ_BUFFER: number = -1;
    public readonly COPY_READ_BUFFER_BINDING: number = -1;
    public readonly COPY_WRITE_BUFFER: number = -1;
    public readonly COPY_WRITE_BUFFER_BINDING: number = -1;
    public readonly CULL_FACE: number = -1;
    public readonly CULL_FACE_MODE: number = -1;
    public readonly CURRENT_PROGRAM: number = -1;
    public readonly CURRENT_QUERY: number = -1;
    public readonly CURRENT_VERTEX_ATTRIB: number = -1;
    public readonly CW: number = -1;
    public readonly DECR: number = -1;
    public readonly DECR_WRAP: number = -1;
    public readonly DELETE_STATUS: number = -1;
    public readonly DEPTH: number = -1;
    public readonly DEPTH24_STENCIL8: number = -1;
    public readonly DEPTH32F_STENCIL8: number = -1;
    public readonly DEPTH_ATTACHMENT: number = -1;
    public readonly DEPTH_BITS: number = -1;
    public readonly DEPTH_BUFFER_BIT: number = -1;
    public readonly DEPTH_CLEAR_VALUE: number = -1;
    public readonly DEPTH_COMPONENT: number = -1;
    public readonly DEPTH_COMPONENT16: number = -1;
    public readonly DEPTH_COMPONENT24: number = -1;
    public readonly DEPTH_COMPONENT32F: number = -1;
    public readonly DEPTH_FUNC: number = -1;
    public readonly DEPTH_RANGE: number = -1;
    public readonly DEPTH_STENCIL: number = -1;
    public readonly DEPTH_STENCIL_ATTACHMENT: number = -1;
    public readonly DEPTH_TEST: number = -1;
    public readonly DEPTH_WRITEMASK: number = -1;
    public readonly DITHER: number = -1;
    public readonly DONT_CARE: number = -1;
    public readonly DRAW_BUFFER0: number = -1;
    public readonly DRAW_BUFFER1: number = -1;
    public readonly DRAW_BUFFER10: number = -1;
    public readonly DRAW_BUFFER11: number = -1;
    public readonly DRAW_BUFFER12: number = -1;
    public readonly DRAW_BUFFER13: number = -1;
    public readonly DRAW_BUFFER14: number = -1;
    public readonly DRAW_BUFFER15: number = -1;
    public readonly DRAW_BUFFER2: number = -1;
    public readonly DRAW_BUFFER3: number = -1;
    public readonly DRAW_BUFFER4: number = -1;
    public readonly DRAW_BUFFER5: number = -1;
    public readonly DRAW_BUFFER6: number = -1;
    public readonly DRAW_BUFFER7: number = -1;
    public readonly DRAW_BUFFER8: number = -1;
    public readonly DRAW_BUFFER9: number = -1;
    public readonly DRAW_FRAMEBUFFER: number = -1;
    public readonly DRAW_FRAMEBUFFER_BINDING: number = -1;
    public readonly DST_ALPHA: number = -1;
    public readonly DST_COLOR: number = -1;
    public readonly DYNAMIC_COPY: number = -1;
    public readonly DYNAMIC_DRAW: number = -1;
    public readonly DYNAMIC_READ: number = -1;
    public readonly ELEMENT_ARRAY_BUFFER: number = -1;
    public readonly ELEMENT_ARRAY_BUFFER_BINDING: number = -1;
    public readonly EQUAL: number = -1;
    public readonly FASTEST: number = -1;
    public readonly FLOAT: number = -1;
    public readonly FLOAT_32_UNSIGNED_INT_24_8_REV: number = -1;
    public readonly FLOAT_MAT2: number = -1;
    // tslint:disable-next-line
    public readonly FLOAT_MAT2x3: number = -1;
    // tslint:disable-next-line
    public readonly FLOAT_MAT2x4: number = -1;
    // tslint:disable-next-line
    public readonly FLOAT_MAT3: number = -1;
    // tslint:disable-next-line
    public readonly FLOAT_MAT3x2: number = -1;
    // tslint:disable-next-line
    public readonly FLOAT_MAT3x4: number = -1;
    public readonly FLOAT_MAT4: number = -1;
    // tslint:disable-next-line
    public readonly FLOAT_MAT4x2: number = -1;
    // tslint:disable-next-line
    public readonly FLOAT_MAT4x3: number = -1;
    public readonly FLOAT_VEC2: number = -1;
    public readonly FLOAT_VEC3: number = -1;
    public readonly FLOAT_VEC4: number = -1;
    public readonly FRAGMENT_SHADER: number = 0x8b30;
    public readonly FRAGMENT_SHADER_DERIVATIVE_HINT: number = -1;
    public readonly FRAMEBUFFER: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_RED_SIZE: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: number = -1;
    public readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number = -1;
    public readonly FRAMEBUFFER_BINDING: number = -1;
    public readonly FRAMEBUFFER_COMPLETE: number = -1;
    public readonly FRAMEBUFFER_DEFAULT: number = -1;
    public readonly FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number = -1;
    public readonly FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number = -1;
    public readonly FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number = -1;
    public readonly FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: number = -1;
    public readonly FRAMEBUFFER_UNSUPPORTED: number = -1;
    public readonly FRONT: number = -1;
    public readonly FRONT_AND_BACK: number = -1;
    public readonly FRONT_FACE: number = -1;
    public readonly FUNC_ADD: number = -1;
    public readonly FUNC_REVERSE_SUBTRACT: number = -1;
    public readonly FUNC_SUBTRACT: number = -1;
    public readonly GENERATE_MIPMAP_HINT: number = -1;
    public readonly GEQUAL: number = -1;
    public readonly GREATER: number = -1;
    public readonly GREEN_BITS: number = -1;
    public readonly HALF_FLOAT: number = -1;
    public readonly HIGH_FLOAT: number = -1;
    public readonly HIGH_INT: number = -1;
    public readonly IMPLEMENTATION_COLOR_READ_FORMAT: number = -1;
    public readonly IMPLEMENTATION_COLOR_READ_TYPE: number = -1;
    public readonly INCR: number = -1;
    public readonly INCR_WRAP: number = -1;
    public readonly INT: number = -1;
    public readonly INTERLEAVED_ATTRIBS: number = -1;
    public readonly INT_2_10_10_10_REV: number = -1;
    public readonly INT_SAMPLER_2D: number = -1;
    public readonly INT_SAMPLER_2D_ARRAY: number = -1;
    public readonly INT_SAMPLER_3D: number = -1;
    public readonly INT_SAMPLER_CUBE: number = -1;
    public readonly INT_VEC2: number = -1;
    public readonly INT_VEC3: number = -1;
    public readonly INT_VEC4: number = -1;
    public readonly INVALID_ENUM: number = -1;
    public readonly INVALID_FRAMEBUFFER_OPERATION: number = -1;
    public readonly INVALID_INDEX: number = -1;
    public readonly INVALID_OPERATION: number = -1;
    public readonly INVALID_VALUE: number = -1;
    public readonly INVERT: number = -1;
    public readonly KEEP: number = -1;
    public readonly LEQUAL: number = -1;
    public readonly LESS: number = -1;
    public readonly LINEAR: number = -1;
    public readonly LINEAR_MIPMAP_LINEAR: number = -1;
    public readonly LINEAR_MIPMAP_NEAREST: number = -1;
    public readonly LINES: number = -1;
    public readonly LINE_LOOP: number = -1;
    public readonly LINE_STRIP: number = -1;
    public readonly LINE_WIDTH: number = -1;
    public readonly LINK_STATUS: number = -1;
    public readonly LOW_FLOAT: number = -1;
    public readonly LOW_INT: number = -1;
    public readonly LUMINANCE: number = -1;
    public readonly LUMINANCE_ALPHA: number = -1;
    public readonly MAX: number = -1;
    public readonly MAX_3D_TEXTURE_SIZE: number = -1;
    public readonly MAX_ARRAY_TEXTURE_LAYERS: number = -1;
    public readonly MAX_CLIENT_WAIT_TIMEOUT_WEBGL: number = -1;
    public readonly MAX_COLOR_ATTACHMENTS: number = -1;
    public readonly MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: number = -1;
    public readonly MAX_COMBINED_TEXTURE_IMAGE_UNITS: number = -1;
    public readonly MAX_COMBINED_UNIFORM_BLOCKS: number = -1;
    public readonly MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: number = -1;
    public readonly MAX_CUBE_MAP_TEXTURE_SIZE: number = -1;
    public readonly MAX_DRAW_BUFFERS: number = -1;
    public readonly MAX_ELEMENTS_INDICES: number = -1;
    public readonly MAX_ELEMENTS_VERTICES: number = -1;
    public readonly MAX_ELEMENT_INDEX: number = -1;
    public readonly MAX_FRAGMENT_INPUT_COMPONENTS: number = -1;
    public readonly MAX_FRAGMENT_UNIFORM_BLOCKS: number = -1;
    public readonly MAX_FRAGMENT_UNIFORM_COMPONENTS: number = -1;
    public readonly MAX_FRAGMENT_UNIFORM_VECTORS: number = -1;
    public readonly MAX_PROGRAM_TEXEL_OFFSET: number = -1;
    public readonly MAX_RENDERBUFFER_SIZE: number = -1;
    public readonly MAX_SAMPLES: number = -1;
    public readonly MAX_SERVER_WAIT_TIMEOUT: number = -1;
    public readonly MAX_TEXTURE_IMAGE_UNITS: number = -1;
    public readonly MAX_TEXTURE_LOD_BIAS: number = -1;
    public readonly MAX_TEXTURE_SIZE: number = -1;
    public readonly MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: number = -1;
    public readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: number = -1;
    public readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: number = -1;
    public readonly MAX_UNIFORM_BLOCK_SIZE: number = -1;
    public readonly MAX_UNIFORM_BUFFER_BINDINGS: number = -1;
    public readonly MAX_VARYING_COMPONENTS: number = -1;
    public readonly MAX_VARYING_VECTORS: number = -1;
    public readonly MAX_VERTEX_ATTRIBS: number = -1;
    public readonly MAX_VERTEX_OUTPUT_COMPONENTS: number = -1;
    public readonly MAX_VERTEX_TEXTURE_IMAGE_UNITS: number = -1;
    public readonly MAX_VERTEX_UNIFORM_BLOCKS: number = -1;
    public readonly MAX_VERTEX_UNIFORM_COMPONENTS: number = -1;
    public readonly MAX_VERTEX_UNIFORM_VECTORS: number = -1;
    public readonly MAX_VIEWPORT_DIMS: number = -1;
    public readonly MEDIUM_FLOAT: number = -1;
    public readonly MEDIUM_INT: number = -1;
    public readonly MIN: number = -1;
    public readonly MIN_PROGRAM_TEXEL_OFFSET: number = -1;
    public readonly MIRRORED_REPEAT: number = -1;
    public readonly NEAREST: number = -1;
    public readonly NEAREST_MIPMAP_LINEAR: number = -1;
    public readonly NEAREST_MIPMAP_NEAREST: number = -1;
    public readonly NEVER: number = -1;
    public readonly NICEST: number = -1;
    public readonly NONE: number = -1;
    public readonly NOTEQUAL: number = -1;
    public readonly NO_ERROR: number = -1;
    public readonly OBJECT_TYPE: number = -1;
    public readonly ONE: number = -1;
    public readonly ONE_MINUS_CONSTANT_ALPHA: number = -1;
    public readonly ONE_MINUS_CONSTANT_COLOR: number = -1;
    public readonly ONE_MINUS_DST_ALPHA: number = -1;
    public readonly ONE_MINUS_DST_COLOR: number = -1;
    public readonly ONE_MINUS_SRC_ALPHA: number = -1;
    public readonly ONE_MINUS_SRC_COLOR: number = -1;
    public readonly OUT_OF_MEMORY: number = -1;
    public readonly PACK_ALIGNMENT: number = -1;
    public readonly PACK_ROW_LENGTH: number = -1;
    public readonly PACK_SKIP_PIXELS: number = -1;
    public readonly PACK_SKIP_ROWS: number = -1;
    public readonly PIXEL_PACK_BUFFER: number = -1;
    public readonly PIXEL_PACK_BUFFER_BINDING: number = -1;
    public readonly PIXEL_UNPACK_BUFFER: number = -1;
    public readonly PIXEL_UNPACK_BUFFER_BINDING: number = -1;
    public readonly POINTS: number = -1;
    public readonly POLYGON_OFFSET_FACTOR: number = -1;
    public readonly POLYGON_OFFSET_FILL: number = -1;
    public readonly POLYGON_OFFSET_UNITS: number = -1;
    public readonly QUERY_RESULT: number = -1;
    public readonly QUERY_RESULT_AVAILABLE: number = -1;
    public readonly R11F_G11F_B10F: number = -1;
    public readonly R16F: number = -1;
    public readonly R16I: number = -1;
    public readonly R16UI: number = -1;
    public readonly R32F: number = -1;
    public readonly R32I: number = -1;
    public readonly R32UI: number = -1;
    public readonly R8: number = -1;
    public readonly R8I: number = -1;
    public readonly R8UI: number = -1;
    public readonly R8_SNORM: number = -1;
    public readonly RASTERIZER_DISCARD: number = -1;
    public readonly READ_BUFFER: number = -1;
    public readonly READ_FRAMEBUFFER: number = -1;
    public readonly READ_FRAMEBUFFER_BINDING: number = -1;
    public readonly RED: number = -1;
    public readonly RED_BITS: number = -1;
    public readonly RED_INTEGER: number = -1;
    public readonly RENDERBUFFER: number = -1;
    public readonly RENDERBUFFER_ALPHA_SIZE: number = -1;
    public readonly RENDERBUFFER_BINDING: number = -1;
    public readonly RENDERBUFFER_BLUE_SIZE: number = -1;
    public readonly RENDERBUFFER_DEPTH_SIZE: number = -1;
    public readonly RENDERBUFFER_GREEN_SIZE: number = -1;
    public readonly RENDERBUFFER_HEIGHT: number = -1;
    public readonly RENDERBUFFER_INTERNAL_FORMAT: number = -1;
    public readonly RENDERBUFFER_RED_SIZE: number = -1;
    public readonly RENDERBUFFER_SAMPLES: number = -1;
    public readonly RENDERBUFFER_STENCIL_SIZE: number = -1;
    public readonly RENDERBUFFER_WIDTH: number = -1;
    public readonly RENDERER: number = -1;
    public readonly REPEAT: number = -1;
    public readonly REPLACE: number = -1;
    public readonly RG: number = -1;
    public readonly RG16F: number = -1;
    public readonly RG16I: number = -1;
    public readonly RG16UI: number = -1;
    public readonly RG32F: number = -1;
    public readonly RG32I: number = -1;
    public readonly RG32UI: number = -1;
    public readonly RG8: number = -1;
    public readonly RG8I: number = -1;
    public readonly RG8UI: number = -1;
    public readonly RG8_SNORM: number = -1;
    public readonly RGB: number = -1;
    public readonly RGB10_A2: number = -1;
    public readonly RGB10_A2UI: number = -1;
    public readonly RGB16F: number = -1;
    public readonly RGB16I: number = -1;
    public readonly RGB16UI: number = -1;
    public readonly RGB32F: number = -1;
    public readonly RGB32I: number = -1;
    public readonly RGB32UI: number = -1;
    public readonly RGB565: number = -1;
    public readonly RGB5_A1: number = -1;
    public readonly RGB8: number = -1;
    public readonly RGB8I: number = -1;
    public readonly RGB8UI: number = -1;
    public readonly RGB8_SNORM: number = -1;
    public readonly RGB9_E5: number = -1;
    public readonly RGBA: number = -1;
    public readonly RGBA16F: number = -1;
    public readonly RGBA16I: number = -1;
    public readonly RGBA16UI: number = -1;
    public readonly RGBA32F: number = -1;
    public readonly RGBA32I: number = -1;
    public readonly RGBA32UI: number = -1;
    public readonly RGBA4: number = -1;
    public readonly RGBA8: number = -1;
    public readonly RGBA8I: number = -1;
    public readonly RGBA8UI: number = -1;
    public readonly RGBA8_SNORM: number = -1;
    public readonly RGBA_INTEGER: number = -1;
    public readonly RGB_INTEGER: number = -1;
    public readonly RG_INTEGER: number = -1;
    public readonly SAMPLER_2D: number = -1;
    public readonly SAMPLER_2D_ARRAY: number = -1;
    public readonly SAMPLER_2D_ARRAY_SHADOW: number = -1;
    public readonly SAMPLER_2D_SHADOW: number = -1;
    public readonly SAMPLER_3D: number = -1;
    public readonly SAMPLER_BINDING: number = -1;
    public readonly SAMPLER_CUBE: number = -1;
    public readonly SAMPLER_CUBE_SHADOW: number = -1;
    public readonly SAMPLES: number = -1;
    public readonly SAMPLE_ALPHA_TO_COVERAGE: number = -1;
    public readonly SAMPLE_BUFFERS: number = -1;
    public readonly SAMPLE_COVERAGE: number = -1;
    public readonly SAMPLE_COVERAGE_INVERT: number = -1;
    public readonly SAMPLE_COVERAGE_VALUE: number = -1;
    public readonly SCISSOR_BOX: number = -1;
    public readonly SCISSOR_TEST: number = -1;
    public readonly SEPARATE_ATTRIBS: number = -1;
    public readonly SHADER_TYPE: number = -1;
    public readonly SHADING_LANGUAGE_VERSION: number = -1;
    public readonly SHORT: number = -1;
    public readonly SIGNALED: number = -1;
    public readonly SIGNED_NORMALIZED: number = -1;
    public readonly SRC_ALPHA: number = -1;
    public readonly SRC_ALPHA_SATURATE: number = -1;
    public readonly SRC_COLOR: number = -1;
    public readonly SRGB: number = -1;
    public readonly SRGB8: number = -1;
    public readonly SRGB8_ALPHA8: number = -1;
    public readonly STATIC_COPY: number = -1;
    public readonly STATIC_DRAW: number = -1;
    public readonly STATIC_READ: number = -1;
    public readonly STENCIL: number = -1;
    public readonly STENCIL_ATTACHMENT: number = -1;
    public readonly STENCIL_BACK_FAIL: number = -1;
    public readonly STENCIL_BACK_FUNC: number = -1;
    public readonly STENCIL_BACK_PASS_DEPTH_FAIL: number = -1;
    public readonly STENCIL_BACK_PASS_DEPTH_PASS: number = -1;
    public readonly STENCIL_BACK_REF: number = -1;
    public readonly STENCIL_BACK_VALUE_MASK: number = -1;
    public readonly STENCIL_BACK_WRITEMASK: number = -1;
    public readonly STENCIL_BITS: number = -1;
    public readonly STENCIL_BUFFER_BIT: number = -1;
    public readonly STENCIL_CLEAR_VALUE: number = -1;
    public readonly STENCIL_FAIL: number = -1;
    public readonly STENCIL_FUNC: number = -1;
    public readonly STENCIL_INDEX: number = -1;
    public readonly STENCIL_INDEX8: number = -1;
    public readonly STENCIL_PASS_DEPTH_FAIL: number = -1;
    public readonly STENCIL_PASS_DEPTH_PASS: number = -1;
    public readonly STENCIL_REF: number = -1;
    public readonly STENCIL_TEST: number = -1;
    public readonly STENCIL_VALUE_MASK: number = -1;
    public readonly STENCIL_WRITEMASK: number = -1;
    public readonly STREAM_COPY: number = -1;
    public readonly STREAM_DRAW: number = -1;
    public readonly STREAM_READ: number = -1;
    public readonly SUBPIXEL_BITS: number = -1;
    public readonly SYNC_CONDITION: number = -1;
    public readonly SYNC_FENCE: number = -1;
    public readonly SYNC_FLAGS: number = -1;
    public readonly SYNC_FLUSH_COMMANDS_BIT: number = -1;
    public readonly SYNC_GPU_COMMANDS_COMPLETE: number = -1;
    public readonly SYNC_STATUS: number = -1;
    public readonly TEXTURE: number = -1;
    public readonly TEXTURE0: number = -1;
    public readonly TEXTURE1: number = -1;
    public readonly TEXTURE10: number = -1;
    public readonly TEXTURE11: number = -1;
    public readonly TEXTURE12: number = -1;
    public readonly TEXTURE13: number = -1;
    public readonly TEXTURE14: number = -1;
    public readonly TEXTURE15: number = -1;
    public readonly TEXTURE16: number = -1;
    public readonly TEXTURE17: number = -1;
    public readonly TEXTURE18: number = -1;
    public readonly TEXTURE19: number = -1;
    public readonly TEXTURE2: number = -1;
    public readonly TEXTURE20: number = -1;
    public readonly TEXTURE21: number = -1;
    public readonly TEXTURE22: number = -1;
    public readonly TEXTURE23: number = -1;
    public readonly TEXTURE24: number = -1;
    public readonly TEXTURE25: number = -1;
    public readonly TEXTURE26: number = -1;
    public readonly TEXTURE27: number = -1;
    public readonly TEXTURE28: number = -1;
    public readonly TEXTURE29: number = -1;
    public readonly TEXTURE3: number = -1;
    public readonly TEXTURE30: number = -1;
    public readonly TEXTURE31: number = -1;
    public readonly TEXTURE4: number = -1;
    public readonly TEXTURE5: number = -1;
    public readonly TEXTURE6: number = -1;
    public readonly TEXTURE7: number = -1;
    public readonly TEXTURE8: number = -1;
    public readonly TEXTURE9: number = -1;
    public readonly TEXTURE_2D: number = -1;
    public readonly TEXTURE_2D_ARRAY: number = -1;
    public readonly TEXTURE_3D: number = -1;
    public readonly TEXTURE_BASE_LEVEL: number = -1;
    public readonly TEXTURE_BINDING_2D: number = -1;
    public readonly TEXTURE_BINDING_2D_ARRAY: number = -1;
    public readonly TEXTURE_BINDING_3D: number = -1;
    public readonly TEXTURE_BINDING_CUBE_MAP: number = -1;
    public readonly TEXTURE_COMPARE_FUNC: number = -1;
    public readonly TEXTURE_COMPARE_MODE: number = -1;
    public readonly TEXTURE_CUBE_MAP: number = -1;
    public readonly TEXTURE_CUBE_MAP_NEGATIVE_X: number = -1;
    public readonly TEXTURE_CUBE_MAP_NEGATIVE_Y: number = -1;
    public readonly TEXTURE_CUBE_MAP_NEGATIVE_Z: number = -1;
    public readonly TEXTURE_CUBE_MAP_POSITIVE_X: number = -1;
    public readonly TEXTURE_CUBE_MAP_POSITIVE_Y: number = -1;
    public readonly TEXTURE_CUBE_MAP_POSITIVE_Z: number = -1;
    public readonly TEXTURE_IMMUTABLE_FORMAT: number = -1;
    public readonly TEXTURE_IMMUTABLE_LEVELS: number = -1;
    public readonly TEXTURE_MAG_FILTER: number = -1;
    public readonly TEXTURE_MAX_LEVEL: number = -1;
    public readonly TEXTURE_MAX_LOD: number = -1;
    public readonly TEXTURE_MIN_FILTER: number = -1;
    public readonly TEXTURE_MIN_LOD: number = -1;
    public readonly TEXTURE_WRAP_R: number = -1;
    public readonly TEXTURE_WRAP_S: number = -1;
    public readonly TEXTURE_WRAP_T: number = -1;
    public readonly TIMEOUT_EXPIRED: number = -1;
    public readonly TIMEOUT_IGNORED: number = -1;
    public readonly TRANSFORM_FEEDBACK: number = -1;
    public readonly TRANSFORM_FEEDBACK_ACTIVE: number = -1;
    public readonly TRANSFORM_FEEDBACK_BINDING: number = -1;
    public readonly TRANSFORM_FEEDBACK_BUFFER: number = -1;
    public readonly TRANSFORM_FEEDBACK_BUFFER_BINDING: number = -1;
    public readonly TRANSFORM_FEEDBACK_BUFFER_MODE: number = -1;
    public readonly TRANSFORM_FEEDBACK_BUFFER_SIZE: number = -1;
    public readonly TRANSFORM_FEEDBACK_BUFFER_START: number = -1;
    public readonly TRANSFORM_FEEDBACK_PAUSED: number = -1;
    public readonly TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: number = -1;
    public readonly TRANSFORM_FEEDBACK_VARYINGS: number = -1;
    public readonly TRIANGLES: number = -1;
    public readonly TRIANGLE_FAN: number = -1;
    public readonly TRIANGLE_STRIP: number = -1;
    public readonly UNIFORM_ARRAY_STRIDE: number = -1;
    public readonly UNIFORM_BLOCK_ACTIVE_UNIFORMS: number = -1;
    public readonly UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: number = -1;
    public readonly UNIFORM_BLOCK_BINDING: number = -1;
    public readonly UNIFORM_BLOCK_DATA_SIZE: number = -1;
    public readonly UNIFORM_BLOCK_INDEX: number = -1;
    public readonly UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: number = -1;
    public readonly UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: number = -1;
    public readonly UNIFORM_BUFFER: number = -1;
    public readonly UNIFORM_BUFFER_BINDING: number = -1;
    public readonly UNIFORM_BUFFER_OFFSET_ALIGNMENT: number = -1;
    public readonly UNIFORM_BUFFER_SIZE: number = -1;
    public readonly UNIFORM_BUFFER_START: number = -1;
    public readonly UNIFORM_IS_ROW_MAJOR: number = -1;
    public readonly UNIFORM_MATRIX_STRIDE: number = -1;
    public readonly UNIFORM_OFFSET: number = -1;
    public readonly UNIFORM_SIZE: number = -1;
    public readonly UNIFORM_TYPE: number = -1;
    public readonly UNPACK_ALIGNMENT: number = -1;
    public readonly UNPACK_COLORSPACE_CONVERSION_WEBGL: number = -1;
    public readonly UNPACK_FLIP_Y_WEBGL: number = -1;
    public readonly UNPACK_IMAGE_HEIGHT: number = -1;
    public readonly UNPACK_PREMULTIPLY_ALPHA_WEBGL: number = -1;
    public readonly UNPACK_ROW_LENGTH: number = -1;
    public readonly UNPACK_SKIP_IMAGES: number = -1;
    public readonly UNPACK_SKIP_PIXELS: number = -1;
    public readonly UNPACK_SKIP_ROWS: number = -1;
    public readonly UNSIGNALED: number = -1;
    public readonly UNSIGNED_BYTE: number = -1;
    public readonly UNSIGNED_INT: number = -1;
    public readonly UNSIGNED_INT_10F_11F_11F_REV: number = -1;
    public readonly UNSIGNED_INT_24_8: number = -1;
    public readonly UNSIGNED_INT_2_10_10_10_REV: number = -1;
    public readonly UNSIGNED_INT_5_9_9_9_REV: number = -1;
    public readonly UNSIGNED_INT_SAMPLER_2D: number = -1;
    public readonly UNSIGNED_INT_SAMPLER_2D_ARRAY: number = -1;
    public readonly UNSIGNED_INT_SAMPLER_3D: number = -1;
    public readonly UNSIGNED_INT_SAMPLER_CUBE: number = -1;
    public readonly UNSIGNED_INT_VEC2: number = -1;
    public readonly UNSIGNED_INT_VEC3: number = -1;
    public readonly UNSIGNED_INT_VEC4: number = -1;
    public readonly UNSIGNED_NORMALIZED: number = -1;
    public readonly UNSIGNED_SHORT: number = -1;
    public readonly UNSIGNED_SHORT_4_4_4_4: number = -1;
    public readonly UNSIGNED_SHORT_5_5_5_1: number = -1;
    public readonly UNSIGNED_SHORT_5_6_5: number = -1;
    public readonly VALIDATE_STATUS: number = -1;
    public readonly VENDOR: number = -1;
    public readonly VERSION: number = -1;
    public readonly VERTEX_ARRAY_BINDING: number = -1;
    public readonly VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number = -1;
    public readonly VERTEX_ATTRIB_ARRAY_DIVISOR: number = -1;
    public readonly VERTEX_ATTRIB_ARRAY_ENABLED: number = -1;
    public readonly VERTEX_ATTRIB_ARRAY_INTEGER: number = -1;
    public readonly VERTEX_ATTRIB_ARRAY_NORMALIZED: number = -1;
    public readonly VERTEX_ATTRIB_ARRAY_POINTER: number = -1;
    public readonly VERTEX_ATTRIB_ARRAY_SIZE: number = -1;
    public readonly VERTEX_ATTRIB_ARRAY_STRIDE: number = -1;
    public readonly VERTEX_ATTRIB_ARRAY_TYPE: number = -1;
    public readonly VERTEX_SHADER: number = 0x8b31;
    public readonly VIEWPORT: number = -1;
    public readonly WAIT_FAILED: number = -1;
    public readonly ZERO: number = -1;
    public readonly drawingBufferHeight: number = -1;
    public readonly drawingBufferWidth: number = -1;

    private returnPlaceholder: any = {};

    constructor(public canvas: HTMLCanvasElement) {}

    public activeTexture(texture: number): void {
        return;
    }

    public attachShader(prog: WebGLProgram | null, shader: WebGLShader | null): void {
        return;
    }

    public beginQuery(target: number, query: WebGLQuery): void {
        return;
    }

    public beginTransformFeedback(primitiveMode: number): void {
        return;
    }

    public bindAttribLocation(prog: WebGLProgram | null, index: number, name: string): void {
        return;
    }

    public bindBuffer(target: number, buffer: WebGLBuffer | null): void {
        return;
    }

    public bindBufferBase(target: number, index: number, buffer: WebGLBuffer | null): void {
        return;
    }

    public bindBufferRange(
        target: number,
        index: number,
        buffer: WebGLBuffer | null,
        offset: number,
        size: number
    ): void {
        return;
    }

    public bindFramebuffer(target: number, framebuffer: WebGLFramebuffer | null): void {
        return;
    }

    public bindRenderbuffer(target: number, renderbuffer: WebGLRenderbuffer | null): void {
        return;
    }

    public bindSampler(unit: number, sampler: WebGLSampler | null): void {
        return;
    }

    public bindTexture(target: number, texture: WebGLTexture | null): void {
        return;
    }

    public bindTransformFeedback(target: number, tf: WebGLTransformFeedback | null): void {
        return;
    }

    public bindVertexArray(array: WebGLVertexArrayObject | null): void {
        return;
    }

    public blendColor(red: number, green: number, blue: number, alpha: number): void {
        return;
    }

    public blendEquation(mode: number): void {
        return;
    }

    public blendEquationSeparate(modeRGB: number, modeAlpha: number): void {
        return;
    }

    public blendFunc(sfactor: number, dfactor: number): void {
        return;
    }

    public blendFuncSeparate(
        srcRGB: number,
        dstRGB: number,
        srcAlpha: number,
        dstAlpha: number
    ): void {
        return;
    }

    public blitFramebuffer(
        srcX0: number,
        srcY0: number,
        srcX1: number,
        srcY1: number,
        dstX0: number,
        dstY0: number,
        dstX1: number,
        dstY1: number,
        mask: number,
        filter: number
    ): void {
        return;
    }

    public bufferData(
        target: number,
        sizeOrData:
            | number
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | ArrayBuffer
            | null,
        usage: number
    ): void;
    // tslint:disable-next-line
    public bufferData(target: number, data: ArrayBufferView, usage: number): void;
    public bufferData(
        target: number,
        srcData:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | ArrayBuffer
            | null,
        usage: number,
        srcOffset: number,
        length?: number
    ): void;
    public bufferData(
        target: number,
        // tslint:disable-next-line:unified-signatures
        size:
            | number
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | ArrayBuffer
            | null,
        usage: number
    ): void;
    public bufferData(
        target: number,
        sizeOrData:
            | number
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | ArrayBuffer
            | null
            | ArrayBufferView
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array,
        usage: number,
        srcOffset?: number,
        length?: number
    ): void {
        return;
    }

    public bufferSubData(
        target: number,
        dstByteOffset: number,
        srcData:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | ArrayBuffer
            | null
    ): void;
    // tslint:disable-next-line:unified-signatures
    public bufferSubData(target: number, dstByteOffset: number, srcData: ArrayBufferView): void;
    public bufferSubData(
        target: number,
        dstByteOffset: number,
        srcData: ArrayBufferView,
        srcOffset: number,
        // tslint:disable-next-line:unified-signatures
        length?: number
    ): void;
    public bufferSubData(
        target: number,
        offset: number,
        // tslint:disable-next-line:unified-signatures
        data:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | ArrayBuffer
            | null
    ): void;
    public bufferSubData(
        target: number,
        dstByteOffset: number,
        srcData:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | ArrayBuffer
            | null
            | ArrayBufferView
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array,
        srcOffset?: number,
        length?: number
    ): void {
        return;
    }

    public checkFramebufferStatus(target: number): number {
        return 0;
    }

    public clear(mask: number): void {
        return;
    }

    public clearBufferfi(buffer: number, drawbuffer: number, depth: number, stencil: number): void {
        return;
    }

    public clearBufferfv(
        buffer: number,
        drawbuffer: number,
        values: Float32Array | ArrayLike<number>,
        srcOffset?: number
    ): void {
        return;
    }

    public clearBufferiv(
        buffer: number,
        drawbuffer: number,
        values: Int32Array | ArrayLike<number>,
        srcOffset?: number
    ): void {
        return;
    }

    public clearBufferuiv(
        buffer: number,
        drawbuffer: number,
        values: Uint32Array | ArrayLike<number>,
        srcOffset?: number
    ): void {
        return;
    }

    public clearColor(red: number, green: number, blue: number, alpha: number): void {
        return;
    }

    public clearDepth(depth: number): void {
        return;
    }

    public clearStencil(s: number): void {
        return;
    }

    public clientWaitSync(sync: WebGLSync, flags: number, timeout: number): number {
        return 0;
    }

    public colorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void {
        return;
    }

    public compileShader(shader: WebGLShader | null): void {
        const s = shader as IWebGLShaderMock;
        if (s.source === vs || s.source === fs) {
            s.compiled = true;
            s.hasErrors = false;
        } else if (s.source === invalidSource) {
            s.compiled = false;
            s.hasErrors = true;
            s.infoLog = invalidShaderInfoLog;
        }
        return;
    }

    public compressedTexImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        imageSize: number,
        offset: number
    ): void;

    public compressedTexImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        srcData:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | null,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLengthOverride?: number
    ): void;
    public compressedTexImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        // tslint:disable-next-line:unified-signatures
        srcData: ArrayBufferView,
        srcOffset?: number,
        srcLengthOverride?: number
    ): void;
    public compressedTexImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        data:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | null
    ): void;
    public compressedTexImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        imageSize:
            | number
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | null
            | ArrayBufferView
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array,
        offset?: number,
        srcLengthOverride?: number
    ): void {
        return;
    }

    public compressedTexImage3D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        depth: number,
        border: number,
        imageSize: number,
        offset: number
    ): void;
    public compressedTexImage3D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        depth: number,
        border: number,
        srcData: ArrayBufferView,
        srcOffset?: number,
        srcLengthOverride?: number
    ): void;
    public compressedTexImage3D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        depth: number,
        border: number,
        imageSize: number | ArrayBufferView,
        offset?: number,
        srcLengthOverride?: number
    ): void {
        return;
    }

    public compressedTexSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        imageSize: number,
        offset: number
    ): void;
    public compressedTexSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        srcData:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | null,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLengthOverride?: number
    ): void;
    public compressedTexSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        // tslint:disable-next-line:unified-signatures
        srcData: ArrayBufferView | null,
        srcOffset?: number,
        srcLengthOverride?: number
    ): void;
    public compressedTexSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        data:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | null
    ): void;
    public compressedTexSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        imageSize:
            | number
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | null
            | ArrayBufferView
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array,
        offset?: number,
        srcLengthOverride?: number
    ): void {
        return;
    }

    public compressedTexSubImage3D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        zoffset: number,
        width: number,
        height: number,
        depth: number,
        format: number,
        imageSize: number,
        offset: number
    ): void;
    public compressedTexSubImage3D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        zoffset: number,
        width: number,
        height: number,
        depth: number,
        format: number,
        srcData: ArrayBufferView,
        srcOffset?: number,
        srcLengthOverride?: number
    ): void;
    public compressedTexSubImage3D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        zoffset: number,
        width: number,
        height: number,
        depth: number,
        format: number,
        imageSize: number | ArrayBufferView,
        offset?: number,
        srcLengthOverride?: number
    ): void {
        return;
    }

    public copyBufferSubData(
        readTarget: number,
        writeTarget: number,
        readOffset: number,
        writeOffset: number,
        size: number
    ): void {
        return;
    }

    public copyTexImage2D(
        target: number,
        level: number,
        internalformat: number,
        x: number,
        y: number,
        width: number,
        height: number,
        border: number
    ): void {
        return;
    }

    public copyTexSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        return;
    }

    public copyTexSubImage3D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        zoffset: number,
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        return;
    }

    public createBuffer(): WebGLBuffer | null {
        return null;
    }

    public createFramebuffer(): WebGLFramebuffer | null {
        return null;
    }

    public createProgram(): WebGLProgram | null {
        return program;
    }

    public createQuery(): WebGLQuery | null {
        return null;
    }

    public createRenderbuffer(): WebGLRenderbuffer | null {
        return null;
    }

    public createSampler(): WebGLSampler | null {
        return null;
    }

    public createShader(type: number): WebGLShader | null {
        switch (type) {
            case this.FRAGMENT_SHADER:
                return fragmentShader;
            case this.VERTEX_SHADER:
                return vertexShader;
        }
        return null;
    }

    public createTexture(): WebGLTexture | null {
        return null;
    }

    public createTransformFeedback(): WebGLTransformFeedback | null {
        return null;
    }

    public createVertexArray(): WebGLVertexArrayObject | null {
        return {};
    }

    public cullFace(mode: number): void {
        return;
    }

    public deleteBuffer(buffer: WebGLBuffer | null): void {
        return;
    }

    public deleteFramebuffer(framebuffer: WebGLFramebuffer | null): void {
        return;
    }

    public deleteProgram(prog: WebGLProgram | null): void {
        return;
    }

    public deleteQuery(query: WebGLQuery | null): void {
        return;
    }

    public deleteRenderbuffer(renderbuffer: WebGLRenderbuffer | null): void {
        return;
    }

    public deleteSampler(sampler: WebGLSampler | null): void {
        return;
    }

    public deleteShader(shader: WebGLShader | null): void {
        return;
    }

    public deleteSync(sync: WebGLSync | null): void {
        return;
    }

    public deleteTexture(texture: WebGLTexture | null): void {
        return;
    }

    public deleteTransformFeedback(tf: WebGLTransformFeedback | null): void {
        return;
    }

    public deleteVertexArray(vertexArray: WebGLVertexArrayObject | null): void {
        return;
    }

    public depthFunc(func: number): void {
        return;
    }

    public depthMask(flag: boolean): void {
        return;
    }

    public depthRange(zNear: number, zFar: number): void {
        return;
    }

    public detachShader(prog: WebGLProgram | null, shader: WebGLShader | null): void {
        return;
    }

    public disable(cap: number): void {
        return;
    }

    public disableVertexAttribArray(index: number): void {
        return;
    }

    public drawArrays(mode: number, first: number, count: number): void {
        return;
    }

    public drawArraysInstanced(
        mode: number,
        first: number,
        count: number,
        instanceCount: number
    ): void {
        return;
    }

    public drawBuffers(buffers: number[]): void {
        return;
    }

    public drawElements(mode: number, count: number, type: number, offset: number): void {
        return;
    }

    public drawElementsInstanced(
        mode: number,
        count: number,
        type: number,
        offset: number,
        instanceCount: number
    ): void {
        return;
    }

    public drawRangeElements(
        mode: number,
        start: number,
        end: number,
        count: number,
        type: number,
        offset: number
    ): void {
        return;
    }

    public enable(cap: number): void {
        return;
    }

    public enableVertexAttribArray(index: number): void {
        return;
    }

    public endQuery(target: number): void {
        return;
    }

    public endTransformFeedback(): void {
        return;
    }

    public fenceSync(condition: number, flags: number): WebGLSync | null {
        return null;
    }

    public finish(): void {
        return;
    }

    public flush(): void {
        return;
    }

    public framebufferRenderbuffer(
        target: number,
        attachment: number,
        renderbuffertarget: number,
        renderbuffer: WebGLRenderbuffer | null
    ): void {
        return;
    }

    public framebufferTexture2D(
        target: number,
        attachment: number,
        textarget: number,
        texture: WebGLTexture | null,
        level: number
    ): void {
        return;
    }

    public framebufferTextureLayer(
        target: number,
        attachment: number,
        texture: WebGLTexture | null,
        level: number,
        layer: number
    ): void {
        return;
    }

    public frontFace(mode: number): void {
        return;
    }

    public generateMipmap(target: number): void {
        return;
    }

    public getActiveAttrib(prog: WebGLProgram | null, index: number): WebGLActiveInfo | null {
        const progMock = prog as IWebGLProgramMock;
        return progMock.activeAttrib[index];
    }

    public getActiveUniform(prog: WebGLProgram | null, index: number): WebGLActiveInfo | null {
        const progMock = prog as IWebGLProgramMock;
        return progMock.activeUniform[index];
    }

    public getActiveUniformBlockName(prog: WebGLProgram, uniformBlockIndex: number): string | null {
        return null;
    }

    public getActiveUniformBlockParameter(
        prog: WebGLProgram,
        uniformBlockIndex: number,
        pname: number
    ): any {
        return {};
    }

    public getActiveUniforms(prog: WebGLProgram, uniformIndices: number[], pname: number): any {
        return this.returnPlaceholder;
    }

    public getAttachedShaders(prog: WebGLProgram | null): WebGLShader[] | null {
        return null;
    }

    public getAttribLocation(prog: WebGLProgram | null, name: string): number {
        const mockProg = prog as IWebGLProgramMock;
        let attrLoc = 0;
        Object.keys(mockProg.activeAttrib).map((key, i) => {
            // @ts-ignore
          if (mockProg.activeAttrib[key].name === name) {
                attrLoc = i;
            }
        });
        return attrLoc;
    }

    public getBufferParameter(target: number, pname: number): any {
        return this.returnPlaceholder;
    }

    public getBufferSubData(
        target: number,
        srcByteOffset: number,
        dstBuffer: ArrayBufferView,
        dstOffset?: number,
        length?: number
    ): void {
        return;
    }

    public getContextAttributes(): WebGLContextAttributes {
        return this.returnPlaceholder as WebGLContextAttributes;
    }

    public getError(): number {
        return 0;
    }

    public getExtension(extensionName: 'EXT_blend_minmax'): EXT_blend_minmax | null;
    public getExtension(
        extensionName: 'EXT_texture_filter_anisotropic'
    ): EXT_texture_filter_anisotropic | null;
    public getExtension(extensionName: 'EXT_frag_depth'): EXT_frag_depth | null;
    public getExtension(extensionName: 'EXT_shader_texture_lod'): EXT_shader_texture_lod | null;
    public getExtension(extensionName: 'EXT_sRGB'): EXT_sRGB | null;
    public getExtension(extensionName: 'OES_vertex_array_object'): OES_vertex_array_object | null;
    public getExtension(extensionName: 'WEBGL_color_buffer_float'): WEBGL_color_buffer_float | null;
    public getExtension(
        extensionName: 'WEBGL_compressed_texture_astc'
    ): WEBGL_compressed_texture_astc | null;
    public getExtension(
        extensionName: 'WEBGL_compressed_texture_s3tc_srgb'
    ): WEBGL_compressed_texture_s3tc_srgb | null;
    public getExtension(extensionName: 'WEBGL_debug_shaders'): WEBGL_debug_shaders | null;
    public getExtension(extensionName: 'WEBGL_draw_buffers'): WEBGL_draw_buffers | null;
    public getExtension(extensionName: 'WEBGL_lose_context'): WEBGL_lose_context | null;
    public getExtension(extensionName: 'WEBGL_depth_texture'): WEBGL_depth_texture | null;
    public getExtension(
        extensionName: 'WEBGL_debug_renderer_info'
    ): WEBGL_debug_renderer_info | null;
    public getExtension(
        extensionName: 'WEBGL_compressed_texture_s3tc'
    ): WEBGL_compressed_texture_s3tc | null;
    public getExtension(
        extensionName: 'OES_texture_half_float_linear'
    ): OES_texture_half_float_linear | null;
    public getExtension(extensionName: 'OES_texture_half_float'): OES_texture_half_float | null;
    public getExtension(extensionName: 'OES_texture_float_linear'): OES_texture_float_linear | null;
    public getExtension(extensionName: 'OES_texture_float'): OES_texture_float | null;
    public getExtension(extensionName: 'OES_standard_derivatives'): OES_standard_derivatives | null;
    public getExtension(extensionName: 'OES_element_index_uint'): OES_element_index_uint | null;
    public getExtension(extensionName: 'ANGLE_instanced_arrays'): ANGLE_instanced_arrays | null;
    public getExtension(extensionName: string): any;
    public getExtension(
        extensionName:
            | 'EXT_blend_minmax'
            | 'EXT_texture_filter_anisotropic'
            | 'EXT_frag_depth'
            | 'EXT_shader_texture_lod'
            | 'EXT_sRGB'
            | 'OES_vertex_array_object'
            | 'WEBGL_color_buffer_float'
            | 'WEBGL_compressed_texture_astc'
            | 'WEBGL_compressed_texture_s3tc_srgb'
            | 'WEBGL_debug_shaders'
            | 'WEBGL_draw_buffers'
            | 'WEBGL_lose_context'
            | 'WEBGL_depth_texture'
            | 'WEBGL_debug_renderer_info'
            | 'WEBGL_compressed_texture_s3tc'
            | 'OES_texture_half_float_linear'
            | 'OES_texture_half_float'
            | 'OES_texture_float_linear'
            | 'OES_texture_float'
            | 'OES_standard_derivatives'
            | 'OES_element_index_uint'
            | 'ANGLE_instanced_arrays'
            | string
    ):
        | EXT_blend_minmax
        | null
        | EXT_texture_filter_anisotropic
        | EXT_frag_depth
        | EXT_shader_texture_lod
        | EXT_sRGB
        | OES_vertex_array_object
        | WEBGL_color_buffer_float
        | WEBGL_compressed_texture_astc
        | WEBGL_compressed_texture_s3tc_srgb
        | WEBGL_debug_shaders
        | WEBGL_draw_buffers
        | WEBGL_lose_context
        | WEBGL_depth_texture
        | WEBGL_debug_renderer_info
        | WEBGL_compressed_texture_s3tc
        | OES_texture_half_float_linear
        | OES_texture_half_float
        | OES_texture_float_linear
        | OES_texture_float
        | OES_standard_derivatives
        | OES_element_index_uint
        | ANGLE_instanced_arrays
        | any {
        return undefined;
    }

    public getFragDataLocation(prog: WebGLProgram, name: string): number {
        return 0;
    }

    public getFramebufferAttachmentParameter(
        target: number,
        attachment: number,
        pname: number
    ): any {
        return this.returnPlaceholder;
    }

    public getIndexedParameter(target: number, index: number): any {
        return this.returnPlaceholder;
    }

    public getInternalformatParameter(target: number, internalformat: number, pname: number): any {
        return this.returnPlaceholder;
    }

    public getParameter(pname: number): any {
        return this.returnPlaceholder;
    }

    public getProgramInfoLog(prog: WebGLProgram | null): string | null {
        return null;
    }

    public getProgramParameter(prog: WebGLProgram | null, pname: number): any {
        const mockProgram = prog as IWebGLProgramMock;
        return mockProgram.parameters[pname];
    }

    public getQuery(target: number, pname: number): WebGLQuery | null {
        return null;
    }

    public getQueryParameter(query: WebGLQuery, pname: number): any {
        return this.returnPlaceholder;
    }

    public getRenderbufferParameter(target: number, pname: number): any {
        return this.returnPlaceholder;
    }

    public getSamplerParameter(sampler: WebGLSampler, pname: number): any {
        return this.returnPlaceholder;
    }

    public getShaderInfoLog(shader: WebGLShader | null): string | null {
        const s = shader as IWebGLShaderMock;
        return s.infoLog;
    }

    public getShaderParameter(shader: WebGLShader | null, pname: number): any {
        const s = shader as IWebGLShaderMock;
        switch (pname) {
            case this.COMPILE_STATUS:
                return s.compiled;
            default:
                return 'unknown';
        }
    }

    public getShaderPrecisionFormat(
        shadertype: number,
        precisiontype: number
    ): WebGLShaderPrecisionFormat | null {
        return null;
    }

    public getShaderSource(shader: WebGLShader | null): string | null {
        return null;
    }

    public getSupportedExtensions(): string[] | null {
        return null;
    }

    public getSyncParameter(sync: WebGLSync, pname: number): any {
        return this.returnPlaceholder;
    }

    public getTexParameter(target: number, pname: number): any {
        return this.returnPlaceholder;
    }

    public getTransformFeedbackVarying(prog: WebGLProgram, index: number): WebGLActiveInfo | null {
        return null;
    }

    public getUniform(prog: WebGLProgram | null, location: WebGLUniformLocation | null): any {
        return this.returnPlaceholder;
    }

    public getUniformBlockIndex(prog: WebGLProgram, uniformBlockName: string): number {
        return 0;
    }

    public getUniformIndices(prog: WebGLProgram, uniformNames: string[]): number[] | null {
        return null;
    }

    public getUniformLocation(
        prog: WebGLProgram | null,
        name: string
    ): WebGLUniformLocation | null {
        if (!prog) {
            return null;
        }
        const mockProg = prog as IWebGLProgramMock;
        const keys = Object.keys(mockProg.activeUniform).filter((k, i) => {
            // @ts-ignore
          return mockProg.activeUniform[k].name === name;
        });

        // @ts-ignore
      return mockProg.activeUniform[keys[0]];
    }

    public getVertexAttrib(index: number, pname: number): any {
        return this.returnPlaceholder;
    }

    public getVertexAttribOffset(index: number, pname: number): number {
        return 0;
    }

    public hint(target: number, mode: number): void {
        return;
    }

    public invalidateFramebuffer(target: number, attachments: number[]): void {
        return;
    }

    public invalidateSubFramebuffer(
        target: number,
        attachments: number[],
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        return;
    }

    public isBuffer(buffer: WebGLBuffer | null): boolean {
        return false;
    }

    public isContextLost(): boolean {
        return false;
    }

    public isEnabled(cap: number): boolean {
        return false;
    }

    public isFramebuffer(framebuffer: WebGLFramebuffer | null): boolean {
        return false;
    }

    public isProgram(prog: WebGLProgram | null): boolean {
        return false;
    }

    public isQuery(query: WebGLQuery | null): boolean {
        return false;
    }

    public isRenderbuffer(renderbuffer: WebGLRenderbuffer | null): boolean {
        return false;
    }

    public isSampler(sampler: WebGLSampler | null): boolean {
        return false;
    }

    public isShader(shader: WebGLShader | null): boolean {
        return false;
    }

    public isSync(sync: WebGLSync | null): boolean {
        return false;
    }

    public isTexture(texture: WebGLTexture | null): boolean {
        return false;
    }

    public isTransformFeedback(tf: WebGLTransformFeedback | null): boolean {
        return false;
    }

    public isVertexArray(vertexArray: WebGLVertexArrayObject | null): boolean {
        return false;
    }

    public lineWidth(width: number): void {
        return;
    }

    public linkProgram(prog: WebGLProgram | null): void {
        return;
    }

    public pauseTransformFeedback(): void {
        return;
    }

    public pixelStorei(pname: number, param: number | boolean): void {
        return;
    }

    public polygonOffset(factor: number, units: number): void {
        return;
    }

    public readBuffer(src: number): void {
        return;
    }

    public readPixels(
        x: number,
        y: number,
        width: number,
        height: number,
        format: number,
        type: number,
        dstData:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | null
    ): void;
    public readPixels(
        x: number,
        y: number,
        width: number,
        height: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        dstData: ArrayBufferView | null
    ): void;
    public readPixels(
        x: number,
        y: number,
        width: number,
        height: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        offset: number
    ): void;
    public readPixels(
        x: number,
        y: number,
        width: number,
        height: number,
        format: number,
        type: number,
        dstData: ArrayBufferView,
        dstOffset: number
    ): void;
    public readPixels(
        x: number,
        y: number,
        width: number,
        height: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        pixels:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | null
    ): void;
    public readPixels(
        x: number,
        y: number,
        width: number,
        height: number,
        format: number,
        type: number,
        dstData:
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array
            | DataView
            | null
            | ArrayBufferView
            | number
            | Int8Array
            | Int16Array
            | Int32Array
            | Uint8Array
            | Uint16Array
            | Uint32Array
            | Uint8ClampedArray
            | Float32Array
            | Float64Array,
        dstOffset?: number
    ): void {
        return;
    }

    public renderbufferStorage(
        target: number,
        internalformat: number,
        width: number,
        height: number
    ): void {
        return;
    }

    public renderbufferStorageMultisample(
        target: number,
        samples: number,
        internalformat: number,
        width: number,
        height: number
    ): void {
        return;
    }

    public resumeTransformFeedback(): void {
        return;
    }

    public sampleCoverage(value: number, invert: boolean): void {
        return;
    }

    public samplerParameterf(sampler: WebGLSampler, pname: number, param: number): void {
        return;
    }

    public samplerParameteri(sampler: WebGLSampler, pname: number, param: number): void {
        return;
    }

    public scissor(x: number, y: number, width: number, height: number): void {
        return;
    }

    public shaderSource(shader: WebGLShader | null, source: string): void {
        const s = shader as IWebGLShaderMock;
        s.source = source;
    }

    public stencilFunc(func: number, ref: number, mask: number): void {
        return;
    }

    public stencilFuncSeparate(face: number, func: number, ref: number, mask: number): void {
        return;
    }

    public stencilMask(mask: number): void {
        return;
    }

    public stencilMaskSeparate(face: number, mask: number): void {
        return;
    }

    public stencilOp(fail: number, zfail: number, zpass: number): void {
        return;
    }

    public stencilOpSeparate(face: number, fail: number, zfail: number, zpass: number): void {
        return;
    }

    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        format: number,
        type: number,
        pixels?: ArrayBufferView | null
    ): void;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        format: number,
        type: number,
        source: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
    ): void;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        source: ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
    ): void;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        format: number,
        type: number,
        pboOffset: number
    ): void;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        source: ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
    ): void;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        format: number,
        type: number,
        srcData: ArrayBufferView,
        srcOffset: number
    ): void;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        pixels: ArrayBufferView | null
    ): void;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        pixels: ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
    ): void;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border:
            | number
            | ImageData
            | HTMLImageElement
            | HTMLCanvasElement
            | HTMLVideoElement
            | ImageBitmap
            | ImageBitmap
            | ImageData
            | HTMLVideoElement
            | HTMLImageElement
            | HTMLCanvasElement,
        format?: number,
        type?: number,
        pixels?:
            | ArrayBufferView
            | null
            | number
            | ImageBitmap
            | ImageData
            | HTMLImageElement
            | HTMLCanvasElement
            | HTMLVideoElement,
        srcOffset?: number
    ): void {
        return;
    }

    public texImage3D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        depth: number,
        border: number,
        format: number,
        type: number,
        pboOffset: number
    ): void;
    public texImage3D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        depth: number,
        border: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        source: ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
    ): void;
    public texImage3D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        depth: number,
        border: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        srcData: ArrayBufferView | null
    ): void;
    public texImage3D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        depth: number,
        border: number,
        format: number,
        type: number,
        srcData: ArrayBufferView,
        srcOffset: number
    ): void;
    public texImage3D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        depth: number,
        border: number,
        format: number,
        type: number,
        pboOffset:
            | number
            | ImageBitmap
            | ImageData
            | HTMLImageElement
            | HTMLCanvasElement
            | HTMLVideoElement
            | ArrayBufferView
            | null,
        srcOffset?: number
    ): void {
        return;
    }

    public texParameterf(target: number, pname: number, param: number): void {
        return;
    }

    public texParameteri(target: number, pname: number, param: number): void {
        return;
    }

    public texStorage2D(
        target: number,
        levels: number,
        internalformat: number,
        width: number,
        height: number
    ): void {
        return;
    }

    public texStorage3D(
        target: number,
        levels: number,
        internalformat: number,
        width: number,
        height: number,
        depth: number
    ): void {
        return;
    }

    public texSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        type: number,
        pixels?: ArrayBufferView | null
    ): void;
    public texSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        format: number,
        type: number,
        source: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
    ): void;
    public texSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        source: ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
    ): void;
    public texSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        type: number,
        pboOffset: number
    ): void;
    public texSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        source: ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
    ): void;
    public texSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        type: number,
        srcData: ArrayBufferView,
        srcOffset: number
    ): void;
    public texSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        pixels: ArrayBufferView | null
    ): void;
    public texSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        pixels: ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement
    ): void;
    public texSubImage2D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        width: number,
        height: number,
        format:
            | number
            | ImageData
            | HTMLImageElement
            | HTMLCanvasElement
            | HTMLVideoElement
            | ImageBitmap
            | ImageBitmap
            | ImageData
            | HTMLVideoElement
            | HTMLImageElement
            | HTMLCanvasElement,
        type?: number,
        pixels?:
            | ArrayBufferView
            | null
            | number
            | ImageBitmap
            | ImageData
            | HTMLImageElement
            | HTMLCanvasElement
            | HTMLVideoElement,
        srcOffset?: number
    ): void {
        return;
    }

    public texSubImage3D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        zoffset: number,
        width: number,
        height: number,
        depth: number,
        format: number,
        type: number,
        pboOffset: number
    ): void;
    public texSubImage3D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        zoffset: number,
        width: number,
        height: number,
        depth: number,
        format: number,
        type: number,
        // tslint:disable-next-line:unified-signatures
        source: ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
    ): void;
    public texSubImage3D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        zoffset: number,
        width: number,
        height: number,
        depth: number,
        format: number,
        type: number,
        srcData: ArrayBufferView | null,
        srcOffset?: number
    ): void;
    public texSubImage3D(
        target: number,
        level: number,
        xoffset: number,
        yoffset: number,
        zoffset: number,
        width: number,
        height: number,
        depth: number,
        format: number,
        type: number,
        pboOffset:
            | number
            | ImageBitmap
            | ImageData
            | HTMLImageElement
            | HTMLCanvasElement
            | HTMLVideoElement
            | ArrayBufferView
            | null,
        srcOffset?: number
    ): void {
        return;
    }

    public transformFeedbackVaryings(
        prog: WebGLProgram,
        varyings: string[],
        bufferMode: number
    ): void {
        return;
    }

    public uniform1f(location: WebGLUniformLocation | null, x: number): void {
        return;
    }

    public uniform1fv(
        location: WebGLUniformLocation | null,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniform1fv(
        location: WebGLUniformLocation | null,
        v: Float32Array | ArrayLike<number>
    ): void;
    public uniform1fv(
        location: WebGLUniformLocation | null,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform1i(location: WebGLUniformLocation | null, x: number): void {
        return;
    }

    public uniform1iv(
        location: WebGLUniformLocation | null,
        data: Int32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniform1iv(
        location: WebGLUniformLocation | null,
        v: Int32Array | ArrayLike<number>
    ): void;
    public uniform1iv(
        location: WebGLUniformLocation | null,
        data: Int32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform1ui(location: WebGLUniformLocation | null, v0: number): void {
        return;
    }

    public uniform1uiv(
        location: WebGLUniformLocation | null,
        data: Uint32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform2f(location: WebGLUniformLocation | null, x: number, y: number): void {
        return;
    }

    public uniform2fv(
        location: WebGLUniformLocation | null,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniform2fv(
        location: WebGLUniformLocation | null,
        v: Float32Array | ArrayLike<number>
    ): void;
    public uniform2fv(
        location: WebGLUniformLocation | null,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform2i(location: WebGLUniformLocation | null, x: number, y: number): void {
        return;
    }

    public uniform2iv(
        location: WebGLUniformLocation | null,
        data: Int32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniform2iv(
        location: WebGLUniformLocation | null,
        v: Int32Array | ArrayLike<number>
    ): void;
    public uniform2iv(
        location: WebGLUniformLocation | null,
        data: Int32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform2ui(location: WebGLUniformLocation | null, v0: number, v1: number): void {
        return;
    }

    public uniform2uiv(
        location: WebGLUniformLocation | null,
        data: Uint32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform3f(location: WebGLUniformLocation | null, x: number, y: number, z: number): void {
        return;
    }

    public uniform3fv(
        location: WebGLUniformLocation | null,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniform3fv(
        location: WebGLUniformLocation | null,
        v: Float32Array | ArrayLike<number>
    ): void;
    public uniform3fv(
        location: WebGLUniformLocation | null,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform3i(location: WebGLUniformLocation | null, x: number, y: number, z: number): void {
        return;
    }

    public uniform3iv(
        location: WebGLUniformLocation | null,
        data: Int32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniform3iv(
        location: WebGLUniformLocation | null,
        v: Int32Array | ArrayLike<number>
    ): void;
    public uniform3iv(
        location: WebGLUniformLocation | null,
        data: Int32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform3ui(
        location: WebGLUniformLocation | null,
        v0: number,
        v1: number,
        v2: number
    ): void {
        return;
    }

    public uniform3uiv(
        location: WebGLUniformLocation | null,
        data: Uint32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform4f(
        location: WebGLUniformLocation | null,
        x: number,
        y: number,
        z: number,
        w: number
    ): void {
        return;
    }

    public uniform4fv(
        location: WebGLUniformLocation | null,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniform4fv(
        location: WebGLUniformLocation | null,
        v: Float32Array | ArrayLike<number>
    ): void;
    public uniform4fv(
        location: WebGLUniformLocation | null,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform4i(
        location: WebGLUniformLocation | null,
        x: number,
        y: number,
        z: number,
        w: number
    ): void {
        return;
    }

    public uniform4iv(
        location: WebGLUniformLocation | null,
        data: Int32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniform4iv(
        location: WebGLUniformLocation | null,
        v: Int32Array | ArrayLike<number>
    ): void;
    public uniform4iv(
        location: WebGLUniformLocation | null,
        data: Int32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniform4ui(
        location: WebGLUniformLocation | null,
        v0: number,
        v1: number,
        v2: number,
        v3: number
    ): void {
        return;
    }

    public uniform4uiv(
        location: WebGLUniformLocation | null,
        data: Uint32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniformBlockBinding(
        prog: WebGLProgram,
        uniformBlockIndex: number,
        uniformBlockBinding: number
    ): void {
        return;
    }

    public uniformMatrix2fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniformMatrix2fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        value: Float32Array | ArrayLike<number>
    ): void;
    public uniformMatrix2fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniformMatrix2x3fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniformMatrix2x4fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniformMatrix3fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniformMatrix3fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        value: Float32Array | ArrayLike<number>
    ): void;
    public uniformMatrix3fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniformMatrix3x2fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniformMatrix3x4fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniformMatrix4fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        // tslint:disable-next-line:unified-signatures
        srcLength?: number
    ): void;
    public uniformMatrix4fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        value: Float32Array | ArrayLike<number>
    ): void;
    public uniformMatrix4fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        const mockLocation = location as IWebGLUniformLocationMock;
        mockLocation.data = data;
    }

    public uniformMatrix4x2fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public uniformMatrix4x3fv(
        location: WebGLUniformLocation | null,
        transpose: boolean,
        data: Float32Array | ArrayLike<number>,
        srcOffset?: number,
        srcLength?: number
    ): void {
        return;
    }

    public useProgram(prog: WebGLProgram | null): void {
        return;
    }

    public validateProgram(prog: WebGLProgram | null): void {
        return;
    }

    public vertexAttrib1f(indx: number, x: number): void {
        return;
    }

    public vertexAttrib1fv(indx: number, values: Float32Array | number[]): void {
        return;
    }

    public vertexAttrib2f(indx: number, x: number, y: number): void {
        return;
    }

    public vertexAttrib2fv(indx: number, values: Float32Array | number[]): void {
        return;
    }

    public vertexAttrib3f(indx: number, x: number, y: number, z: number): void {
        return;
    }

    public vertexAttrib3fv(indx: number, values: Float32Array | number[]): void {
        return;
    }

    public vertexAttrib4f(indx: number, x: number, y: number, z: number, w: number): void {
        return;
    }

    public vertexAttrib4fv(indx: number, values: Float32Array | number[]): void {
        return;
    }

    public vertexAttribDivisor(index: number, divisor: number): void {
        return;
    }

    public vertexAttribI4i(index: number, x: number, y: number, z: number, w: number): void {
        return;
    }

    public vertexAttribI4iv(index: number, values: Int32Array | ArrayLike<number>): void {
        return;
    }

    public vertexAttribI4ui(index: number, x: number, y: number, z: number, w: number): void {
        return;
    }

    public vertexAttribI4uiv(index: number, values: Uint32Array | ArrayLike<number>): void {
        return;
    }

    public vertexAttribIPointer(
        index: number,
        size: number,
        type: number,
        stride: number,
        offset: number
    ): void {
        return;
    }

    public vertexAttribPointer(
        indx: number,
        size: number,
        type: number,
        normalized: boolean,
        stride: number,
        offset: number
    ): void {
        return;
    }

    public viewport(x: number, y: number, width: number, height: number): void {
        return;
    }

    public waitSync(sync: WebGLSync, flags: number, timeout: number): void {
        return;
    }
}

export default WebGL2RenderingContextMock;
