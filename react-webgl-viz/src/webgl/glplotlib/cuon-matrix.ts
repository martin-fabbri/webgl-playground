/* tslint:disable */
/**
 * cuon-matrix.ts (c) 2012 kanda and matsuda
 * adaptation of the cuon-matrix by kanda and matsuda
 * a class that implements a 4x4 matrix in typescript
 * equipped with functions equivalent to webgl matrix stack.
 * the matrix after conversion is calculated by multiplying the transformation matrix from the right.
 * the content of the matrix is ??replaced by the calculated result.
 * additional author: Chris Wolf
 */

export interface IViewportTransformInfo {
    srcLeft: number;
    srcRight: number;
    destLeft: number;
    destRight: number;
    srcBottom: number;
    srcTop: number;
    destBottom: number;
    destTop: number;
    srcFront: number;
    srcBack: number;
    destFront: number;
    destBack: number;
}

/** vector of 4 floats */
export class Vector4 {
    elements: Float32Array;

    constructor(source?: Float32Array | number[]) {
        if (source && source.length === 4) {
            this.elements = new Float32Array(source);
        } else if (source && source.length === 3) {
            this.elements = new Float32Array([source[0], source[1], source[2], 1]);
        } else if (source && source.length === 2) {
            this.elements = new Float32Array([source[0], source[1], 0, 1]);
        } else {
            this.elements = new Float32Array([0, 0, 0, 1]);
        }
    }
}

//   * A newly generated matrix is ??copied and initialized when an instance of Matrix 4 is passed to opt_src.
//  * Otherwise, it is initialized to identity matrix.
export class Matrix4 {
    elements: Float32Array;
    constructor(source?: Float32Array) {
        if (source && source.length === 16) {
            this.elements = new Float32Array(source);
        } else {
            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
    }

    clone() {
        return new Matrix4(this.elements);
    }

    /** set to unit matrix */
    setIdentity() {
        let e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    }

    // copy the element of the passed matrix.
    set(source: Float32Array) {
        let i, s, d;

        if (s === d) {
            return;
        }

        for (i = 0; i < 16; ++i) {
            d[i] = s[i];
        }

        return this;
    }

    /**
     * The order of the matrix operation will be a prepend so that the matrix passed
     * in will have its operations performed first.
     *
     * @param {Matrix4} matrix
     */
    multiply(prependMatrix: Matrix4) {
        return this.concat(prependMatrix);
    }

    /**
     *  Call the passed matrix from the right.
     *
     * @param {Float32Array} other
     */
    concat(matrix: Matrix4) {
        let i, e, a, b, ai0, ai1, ai2, ai3;

        // e = a
        e = this.elements;
        a = this.elements;
        b = matrix.elements;

        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }

        for (i = 0; i < 4; i++) {
            ai0 = a[i];
            ai1 = a[i + 4];
            ai2 = a[i + 8];
            ai3 = a[i + 12];
            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }

        return this;
    }

    /** Multiply the passed vector4 */
    multiplyVector4(pos: Vector4) {
        let e = this.elements;
        let p = pos.elements;
        let v = new Vector4();
        let result = v.elements;

        result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + p[3] * e[12];
        result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + p[3] * e[13];
        result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
        result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];

        return v;
    }

    /**
     * transpose the matrix
     */
    transpose() {
        let e, t;

        e = this.elements;

        t = e[1];
        e[1] = e[4];
        e[4] = t;
        t = e[2];
        e[2] = e[8];
        e[8] = t;
        t = e[3];
        e[3] = e[12];
        e[12] = t;
        t = e[6];
        e[6] = e[9];
        e[9] = t;
        t = e[7];
        e[7] = e[13];
        e[13] = t;
        t = e[11];
        e[11] = e[14];
        e[14] = t;

        return this;
    }

    /**
     * Computes the inverse matrix of the passed matrix and assigns it to this matrix
     */
    setInverseOf(matrix: Matrix4) {
        let i, s, d, inv, det;

        s = matrix.elements;
        d = this.elements;
        inv = new Float32Array(16);

        inv[0] =
            s[5] * s[10] * s[15] -
            s[5] * s[11] * s[14] -
            s[9] * s[6] * s[15] +
            s[9] * s[7] * s[14] +
            s[13] * s[6] * s[11] -
            s[13] * s[7] * s[10];
        inv[4] =
            -s[4] * s[10] * s[15] +
            s[4] * s[11] * s[14] +
            s[8] * s[6] * s[15] -
            s[8] * s[7] * s[14] -
            s[12] * s[6] * s[11] +
            s[12] * s[7] * s[10];
        inv[8] =
            s[4] * s[9] * s[15] -
            s[4] * s[11] * s[13] -
            s[8] * s[5] * s[15] +
            s[8] * s[7] * s[13] +
            s[12] * s[5] * s[11] -
            s[12] * s[7] * s[9];
        inv[12] =
            -s[4] * s[9] * s[14] +
            s[4] * s[10] * s[13] +
            s[8] * s[5] * s[14] -
            s[8] * s[6] * s[13] -
            s[12] * s[5] * s[10] +
            s[12] * s[6] * s[9];

        inv[1] =
            -s[1] * s[10] * s[15] +
            s[1] * s[11] * s[14] +
            s[9] * s[2] * s[15] -
            s[9] * s[3] * s[14] -
            s[13] * s[2] * s[11] +
            s[13] * s[3] * s[10];
        inv[5] =
            s[0] * s[10] * s[15] -
            s[0] * s[11] * s[14] -
            s[8] * s[2] * s[15] +
            s[8] * s[3] * s[14] +
            s[12] * s[2] * s[11] -
            s[12] * s[3] * s[10];
        inv[9] =
            -s[0] * s[9] * s[15] +
            s[0] * s[11] * s[13] +
            s[8] * s[1] * s[15] -
            s[8] * s[3] * s[13] -
            s[12] * s[1] * s[11] +
            s[12] * s[3] * s[9];
        inv[13] =
            s[0] * s[9] * s[14] -
            s[0] * s[10] * s[13] -
            s[8] * s[1] * s[14] +
            s[8] * s[2] * s[13] +
            s[12] * s[1] * s[10] -
            s[12] * s[2] * s[9];

        inv[2] =
            s[1] * s[6] * s[15] -
            s[1] * s[7] * s[14] -
            s[5] * s[2] * s[15] +
            s[5] * s[3] * s[14] +
            s[13] * s[2] * s[7] -
            s[13] * s[3] * s[6];
        inv[6] =
            -s[0] * s[6] * s[15] +
            s[0] * s[7] * s[14] +
            s[4] * s[2] * s[15] -
            s[4] * s[3] * s[14] -
            s[12] * s[2] * s[7] +
            s[12] * s[3] * s[6];
        inv[10] =
            s[0] * s[5] * s[15] -
            s[0] * s[7] * s[13] -
            s[4] * s[1] * s[15] +
            s[4] * s[3] * s[13] +
            s[12] * s[1] * s[7] -
            s[12] * s[3] * s[5];
        inv[14] =
            -s[0] * s[5] * s[14] +
            s[0] * s[6] * s[13] +
            s[4] * s[1] * s[14] -
            s[4] * s[2] * s[13] -
            s[12] * s[1] * s[6] +
            s[12] * s[2] * s[5];

        inv[3] =
            -s[1] * s[6] * s[11] +
            s[1] * s[7] * s[10] +
            s[5] * s[2] * s[11] -
            s[5] * s[3] * s[10] -
            s[9] * s[2] * s[7] +
            s[9] * s[3] * s[6];
        inv[7] =
            s[0] * s[6] * s[11] -
            s[0] * s[7] * s[10] -
            s[4] * s[2] * s[11] +
            s[4] * s[3] * s[10] +
            s[8] * s[2] * s[7] -
            s[8] * s[3] * s[6];
        inv[11] =
            -s[0] * s[5] * s[11] +
            s[0] * s[7] * s[9] +
            s[4] * s[1] * s[11] -
            s[4] * s[3] * s[9] -
            s[8] * s[1] * s[7] +
            s[8] * s[3] * s[5];
        inv[15] =
            s[0] * s[5] * s[10] -
            s[0] * s[6] * s[9] -
            s[4] * s[1] * s[10] +
            s[4] * s[2] * s[9] +
            s[8] * s[1] * s[6] -
            s[8] * s[2] * s[5];

        det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
        if (det === 0) {
            return this;
        }

        det = 1 / det;
        for (i = 0; i < 16; i++) {
            d[i] = inv[i] * det;
        }

        return this;
    }

    /**
     * Compute the inverse matrix of this matrix and replace the contents
     */
    invert() {
        return this.setInverseOf(this);
    }

    /**
     * Set it as an orthogonal projection matrix.
     * @ param left X coordinate of left clip plane
     * @ param right X coordinate of the right clip plane
     * @ param bottom Y coordinate of the lower clip plane
     * @ param top Y coordinate of upper clip plane
     * @ param near distance to clip plane.If the plane is behind the viewpoint, it is a negative number
     * @ param far Distance to the far clip plane.If the plane is behind the viewpoint, it is a negative number
     */
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        let e, rw, rh, rd;

        if (left === right || bottom === top || near === far) {
            throw 'null frustum';
        }

        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);

        e = this.elements;

        e[0] = 2 * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;

        e[4] = 0;
        e[5] = 2 * rh;
        e[6] = 0;
        e[7] = 0;

        e[8] = 0;
        e[9] = 0;
        e[10] = -2 * rd;
        e[11] = 0;

        e[12] = -(right + left) * rw;
        e[13] = -(top + bottom) * rh;
        e[14] = -(far + near) * rd;
        e[15] = 1;

        return this;
    }

    /**
     * Place an orthogonal projection matrix from the right.
     * @ param left X coordinate of left clip plane
     * @ param right X coordinate of the right clip plane
     * @ param bottom Y coordinate of the lower clip plane
     * @ param top Y coordinate of upper clip plane
     * @ param near distance to clip plane.If the plane is behind the viewpoint, it is a negative number
     * @ param far Distance to the far clip plane.If the plane is behind the viewpoint, it is a negative number
     */
    ortho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
    }

    /**
     * Set to the scaling matrix.
     * @ param x Magnification in X direction
     * @ param y Magnification in Y direction
     * @ param z Zoom magnification
     */
    setScale(x: number, y: number, z: number) {
        let e = this.elements;
        e[0] = x;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = y;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = z;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;

        return this;
    }

    scale(x: number, y: number, z: number) {
        let e = this.elements;
        e[0] *= x;
        e[4] *= y;
        e[8] *= z;
        e[1] *= x;
        e[5] *= y;
        e[9] *= z;
        e[2] *= x;
        e[6] *= y;
        e[10] *= z;
        e[3] *= x;
        e[7] *= y;
        e[11] *= z;
        return this;
    }

    /**
     * Set it as translation matrix
     * @ param x Transfer amount in X direction
     * @ param y Transfer amount in Y direction
     * @ param z Transfer amount in Z direction
     */
    setTranslate(x: number, y: number, z: number) {
        let e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = x;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = y;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = z;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    }

    /**
     * Place the translation matrix from the right.
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    translate(x: number, y: number, z: number) {
        let e = this.elements;
        e[12] += e[0] * x + e[4] * y + e[8] * z;
        e[13] += e[1] * x + e[5] * y + e[9] * z;
        e[14] += e[2] * x + e[6] * y + e[10] * z;
        e[15] += e[3] * x + e[7] * y + e[11] * z;
        return this;
    }

    /**
     * Set to rotation matrix.
     * The direction vector of the rotation axis does not have to be normalized.
     * @ param angle rotation angle [degree]
     * @ param x X component of direction vector of rotation axis
     * @ param y Y component of direction vector of rotation axis
     * @ param z Z component of direction vector of rotation axis
     */
    setRotate(angle: number, x: number = 0, y: number = 0, z: number = 0) {
        let e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

        angle = (Math.PI * angle) / 180;
        e = this.elements;

        s = Math.sin(angle);
        c = Math.cos(angle);

        if (0 !== x && 0 === y && 0 === z) {
            // rotation around X axis
            if (x < 0) {
                s = -s;
            }
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = c;
            e[9] = -s;
            e[13] = 0;
            e[2] = 0;
            e[6] = s;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        } else if (0 === x && 0 !== y && 0 === z) {
            // rotation about the Y axis
            if (y < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = 0;
            e[8] = s;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = -s;
            e[6] = 0;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        } else if (0 === x && 0 === y && 0 !== z) {
            // rotation around the Z axis
            if (z < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = -s;
            e[8] = 0;
            e[12] = 0;
            e[1] = s;
            e[5] = c;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        } else {
            // rotation around other arbitrary axes
            len = Math.sqrt(x * x + y * y + z * z);
            if (len !== 1) {
                rlen = 1 / len;
                x *= rlen;
                y *= rlen;
                z *= rlen;
            }
            nc = 1 - c;
            xy = x * y;
            yz = y * z;
            zx = z * x;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            e[0] = x * x * nc + c;
            e[1] = xy * nc + zs;
            e[2] = zx * nc - ys;
            e[3] = 0;

            e[4] = xy * nc - zs;
            e[5] = y * y * nc + c;
            e[6] = yz * nc + xs;
            e[7] = 0;

            e[8] = zx * nc + ys;
            e[9] = yz * nc - xs;
            e[10] = z * z * nc + c;
            e[11] = 0;

            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }

        return this;
    }

    /**
     * Spin the rotation matrix from the right.
     * The direction vector of the rotation axis does not have to be normalized.
     * @ param angle rotation angle [degree]
     * @ param x X component of direction vector of rotation axis
     * @ param y Y component of direction vector of rotation axis
     * @ param z Z component of direction vector of rotation axis
     */
    rotate(angle: number, x: number = 0, y: number = 0, z: number = 0) {
        return this.concat(new Matrix4().setRotate(angle, x, y, z));
    }

    /**
     * Set the field of view transformation matrix.
     * @ param eyeX, eyeY, eyeZ viewpoint position
     * @ param centerX, centerY, centerZ Position of the reference point
     * @ param upX, upY, upZ direction vector representing the upward direction of the camera
     * @return this
     */
    setLookAt(
        eyeX: number,
        eyeY: number,
        eyeZ: number,
        centerX: number,
        centerY: number,
        centerZ: number,
        upX: number,
        upY: number,
        upZ: number
    ) {
        let e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

        fx = centerX - eyeX;
        fy = centerY - eyeY;
        fz = centerZ - eyeZ;

        // normalize f
        rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;

        // Find the outer product of f and up
        sx = fy * upZ - fz * upY;
        sy = fz * upX - fx * upZ;
        sz = fx * upY - fy * upX;

        // normalize s
        rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;

        // Find the outer product of s and f
        ux = sy * fz - sz * fy;
        uy = sz * fx - sx * fz;
        uz = sx * fy - sy * fx;

        // substitute
        e = this.elements;
        e[0] = sx;
        e[1] = ux;
        e[2] = -fx;
        e[3] = 0;

        e[4] = sy;
        e[5] = uy;
        e[6] = -fy;
        e[7] = 0;

        e[8] = sz;
        e[9] = uz;
        e[10] = -fz;
        e[11] = 0;

        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;

        // translate
        return this.translate(-eyeX, -eyeY, -eyeZ);
    }

    /**
     * Spread the view field transformation matrix from the right.
     * @ param eyeX, eyeY, eyeZ viewpoint position
     * @ param centerX, centerY, centerZ Position of the reference point
     * @ param upX, upY, upZ direction vector representing the upward direction of the camera
     * @return this
     */
    lookAt(
        eyeX: number,
        eyeY: number,
        eyeZ: number,
        centerX: number,
        centerY: number,
        centerZ: number,
        upX: number,
        upY: number,
        upZ: number
    ) {
        return this.concat(
            new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
        );
    }

    /**
     * Creates a matrix the encapsulates the transform from one coordinate system
     * to another
     *
     * @param {Matrix4} mat
     * @param {IViewportTransformInfo} vp
     * @returns the matrix compatible with the glsl matrix
     */
    static createViewportTransform(vp: IViewportTransformInfo) {
        let mat = new Matrix4();

        // get the scale in each axis from the source viewport to the destination viewport
        let scaleX: number = (vp.destRight - vp.destLeft) / (vp.srcRight - vp.srcLeft);
        let scaleY: number = (vp.destTop - vp.destBottom) / (vp.srcTop - vp.srcBottom);
        let scaleZ: number = (vp.destFront - vp.destBack) / (vp.srcFront - vp.srcBack);

        // since the matrix class appends transforms, we must reverse the order
        // if instead prepend was used, we could use the order of operation

        // reset the matrix
        // and translate the source viewport to the origin so we can scale it
        mat.setTranslate(vp.destLeft, vp.destBottom, vp.destFront);
        mat.scale(scaleX, scaleY, scaleZ);
        mat.translate(-vp.srcLeft, -vp.srcBottom, -vp.srcFront);

        return mat;
    }

    /**
     * Update a current viewport transform given the percent
     * @param viewportPercent the viewport percent edges
     */
    updateViewport(viewportPercent: { xmin: number; xmax: number; ymin: number; ymax: number }) {
        // take the fractional NDC and scale to [-1, 1]
        let projMatrix = Matrix4.createViewportTransform({
            srcLeft: 2 * viewportPercent.xmin - 1,
            srcRight: 2 * viewportPercent.xmax - 1,
            destLeft: -1,
            destRight: 1,
            srcBottom: 2 * viewportPercent.ymin - 1,
            srcTop: 2 * viewportPercent.ymax - 1,
            destBottom: -1,
            destTop: 1,
            srcFront: -1,
            srcBack: 0,
            destFront: -1,
            destBack: 0
        });

        // append the zoom matrix so there is a translation and scale
        // in other words prepend the previous project matrix
        return projMatrix.multiply(this);
    }
}
/* tslint:enable */
