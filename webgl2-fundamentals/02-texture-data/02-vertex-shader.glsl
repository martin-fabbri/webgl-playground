#version 300 es

// an attribute is an input (in) to a vertex shader.
// it will receive data from a buffer
// in vec4 a_position;
in vec2 a_position;

uniform vec2 u_resolution;

// all shader have a main function
void main() {
    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;

    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo -1.0;

    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = a_position;

}