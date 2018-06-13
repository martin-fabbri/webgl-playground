#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

// all shader have a main function
void main() {
    // just set the output to a constant redish-purple
    outColor = vec4(1, 0, 0.5, 1);
}