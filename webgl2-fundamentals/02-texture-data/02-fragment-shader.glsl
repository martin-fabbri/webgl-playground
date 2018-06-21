#version 300 es

// fragment shaders don't have a default precision so we need to pick one. mediump is a good default.
// it means "medium precision"
precision mediump float;

// we need to declare an output for the fragment shader
out vec4 outColor;

// all shader have a main function
void main() {
    // just set the output to a constant redish-purple
    outColor = vec4(1, 0, 0.5, 1);
}