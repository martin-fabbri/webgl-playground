console.log('webgl-101');
var GlPoints = /** @class */ (function () {
    function GlPoints() {
        console.log('initGL');
        var canvas = document.getElementById('canvas');
        this.gl = canvas.getContext('webgl');
        this.gl.viewport(0, 0, canvas.width, canvas.height);
        this.gl.clearColor(1, 1, 1, 1);
    }
    GlPoints.prototype.createShaders = function () {
        var gl = this.gl;
        var vs = "\n        attribute vec4 coords;\n        void main(void) {\n            gl_Position = " + this.coordsVec4Attr + ";\n            gl_PointSize = 10.0;\n        }\n    ";
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vs);
        gl.compileShader(vertexShader);
        var fs = "\n        void main(void) {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    ";
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fs);
        gl.compileShader(fragmentShader);
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
        return shaderProgram;
    };
    GlPoints.prototype.createVertices = function (shaderProgram) {
        var gl = this.gl;
        var coords = gl.getAttribLocation(shaderProgram, coordsVec4Attr);
        gl.vertexAttrib3f(coords, 0, 0, 0);
    };
    GlPoints.prototype.draw = function () {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);
    };
    return GlPoints;
}());
var gp = new GlPoints();
