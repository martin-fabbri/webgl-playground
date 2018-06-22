/* tslint:disable */
import { IPoint } from './vector-points';

/** A simple matrix class to handle 2D transforms. Operation are prepended to the front of the matrix.
 * this will be deprecated in the near future to make way for Matrix4 that works with webgl for 3 dimensions
 * and vectors.
 *
 *        [x']    [ M11 M12 tx ]   [x]
 *        |y'| =  [ M21 M22 ty ] x |y|
 *        [1 ]    [  0   0  1  ]   [1]
 * Author: Chris Wolf
 **/
export class Matrix {
    private EPSILON = 0.000001;

    /** constructs the matrix from a set of coefficients
     * @constructor
     * @param {number} m11 - coefficient
     * @param m12 - coefficient
     * @param m21 - coefficient
     * @param m22 - coefficient
     * @param tx - translation in x
     * @param ty - translation in y
     */
    constructor(
        public m11: number = 1.0,
        public m12: number = 0,
        public m21: number = 0,
        public m22: number = 1.0,
        public tx: number = 0,
        public ty: number = 0
    ) {}

    /**
     * @name getFloat32Array
     * @desc This function returns a 3D array that can be used for WebGL matrix transform attributes
     * @returns {Float32Array} the coefficients
     */
    getFloat32Array(): Float32Array {
        let coefficients = new Float32Array(16);

        coefficients[0] = this.m11;
        coefficients[1] = this.m21;
        coefficients[2] = 0.0;
        coefficients[3] = 0.0;
        coefficients[4] = this.m12;
        coefficients[5] = this.m22;
        coefficients[6] = 0.0;
        coefficients[7] = 0.0;
        coefficients[8] = 0.0;
        coefficients[9] = 0.0;
        coefficients[10] = 1.0;
        coefficients[11] = 0.0;
        coefficients[12] = this.tx;
        coefficients[13] = this.ty;
        coefficients[14] = 0.0;
        coefficients[15] = 1.0;

        return coefficients;
    }

    /**  */
    /**
     * @name coordinateSystemTransform
     * @desc Set the matrix to transform from one coordinate system to another.
     * @param {number} srcLeft - The  side of the viewport
     * @param {number} srcRight - The  side of the viewport
     * @param {number} srcBottom - The  side of the viewport
     * @param {number} srcTop - The  side of the viewport
     * @param {number} destLeft - The  side of the viewport
     * @param {number} destRight - The  side of the viewport
     * @param {number} destBottom - The  side of the viewport
     * @param {number} destTop - The  side of the viewport
     * @param {number} append - The  side of the viewport
     */
    coordinateSystemTransform(
        srcLeft: number,
        srcRight: number,
        srcBottom: number,
        srcTop: number,
        destLeft: number,
        destRight: number,
        destBottom: number,
        destTop: number,
        append: boolean = false
    ) {
        // if this is not an append operation then set to identity
        if (!append) {
            this.setIdentity();
        }

        // translate the source viewport to the origin so we can scale it
        this.translate(-srcLeft, -srcBottom);

        // scale from the source viewport to the destination viewport
        let scaleX: number = (destRight - destLeft) / (srcRight - srcLeft);
        let scaleY: number = (destTop - destBottom) / (srcTop - srcBottom);
        this.scale(scaleX, scaleY);

        // translate the origin to the lower left of the new viewport
        this.translate(destLeft, destBottom);
    }

    /**
     * helper function
     *
     * @param matrix the matrix to copy the values from
     */
    copyFields(matrix: Matrix) {
        this.m11 = matrix.m11;
        this.m12 = matrix.m12;
        this.m21 = matrix.m21;
        this.m22 = matrix.m22;
        this.tx = matrix.tx;
        this.ty = matrix.ty;
    }

    /** make a copy of this matrix */
    clone() {
        return new Matrix(this.m11, this.m12, this.m21, this.m22, this.tx, this.ty);
    }

    /** Set the matrix to be a unit matrix */
    setIdentity() {
        this.m11 = 1;
        this.m12 = 0;
        this.m21 = 0;
        this.m22 = 1;
        this.tx = 0;
        this.ty = 0;
    }

    /**
     * Multiply a matrix with this matrix. the default is to append the
     * incoming matrix with this matrix. If the append flag is false
     * then the incoming matrix is prepended
     *
     * @param {Matrix} m the incoming matrix
     * @param {boolean} [append=true] if true append otherwise prepend
     */
    multiply(m: Matrix, append: boolean = true) {
        let m1 = append ? m : this;
        let m2 = append ? this : m;

        let r11 = m1.m11 * m2.m11 + m1.m12 * m2.m21;
        let r12 = m1.m11 * m2.m12 + m1.m12 * m2.m22;
        let rtx = m1.m11 * m2.tx + m1.m12 * m2.ty + m1.tx;

        let r21 = m1.m21 * m2.m11 + m1.m22 * m2.m21;
        let r22 = m1.m21 * m2.m12 + m1.m22 * m2.m22;
        let rty = m1.m21 * m2.tx + m1.m22 * m2.ty + m1.ty;

        // put the values into the matrix
        this.m11 = r11;
        this.m12 = r12;
        this.tx = rtx;
        this.m21 = r21;
        this.m22 = r22;
        this.ty = rty;
    }

    /** <summary>
     * Set the translation factor
     * @param tx the X axis translation factor
     * @param ty the Y axis translation factor
     */
    translate(tx: number, ty: number) {
        this.tx += tx;
        this.ty += ty;
    }

    /** <summary>
     * Scale all axes by the same factor
     * @param scaleX the x axis scaling factor
     * @param scaleY the y axis scaling factor
     */
    scale(scaleX: number, scaleY: number) {
        if (scaleX === undefined) scaleX = 1.0;
        if (scaleY === undefined) scaleY = 1.0;
        this.m11 *= scaleX;
        this.m12 *= scaleX;
        this.m21 *= scaleY;
        this.m22 *= scaleY;
        this.tx *= scaleX;
        this.ty *= scaleY;
    }

    /** Add a rotation about some coordinate origin, default is 0,0
     * [ c -s  0]
     * [ s  c  0]
     * [ 0  0  1]
     * @param angle the angle in degrees
     * @param centerX the x value of the rotation point
     * @param centerY the y value of the rotation point
     */
    rotate(angle: number, centerX: number = 0, centerY: number = 0) {
        // want to rotate about the center so translate to it
        this.translate(-centerX, -centerY);

        // convert angle to radians, and cache values
        angle *= Math.PI / 180.0;
        let ct = Math.cos(angle);
        let st = Math.sin(angle);

        // must prepend the matrix since rotation is not

        // calc the two columns of values
        let m11 = ct * this.m11 - st * this.m21;
        let m12 = ct * this.m12 - st * this.m22;
        let tx = this.tx * ct - this.ty * st;

        let m21 = st * this.m11 + ct * this.m21;
        let m22 = st * this.m12 + ct * this.m22;
        let ty = this.tx * st + this.ty * ct;

        // now store the values
        this.m11 = m11;
        this.m12 = m12;
        this.m21 = m21;
        this.m22 = m22;
        this.tx = tx;
        this.ty = ty;

        // translate back to the point
        this.translate(centerX, centerY);
    }

    /// Transform the array of points using the matrix, stored as xy pairs
    /// <param name="points">The points to be transformed
    transformPoints(points: IPoint[]) {
        // do a check for null
        if (points.length === 0) {
            return;
        }

        // if either M12 or M21 are non-zero, then this transform involves rotation
        // if no rotation involved we save on multiplies and additions
        let allowRotation = Math.abs(this.m12) > this.EPSILON || Math.abs(this.m21) > this.EPSILON;

        let len = points.length;
        if (allowRotation) {
            for (let i = 0; i < len; i++) {
                let x = points[i].x;
                let y = points[i].y;

                points[i].x = x * this.m11 + y * this.m12 + this.tx;
                points[i].y = x * this.m21 + y * this.m22 + this.ty;
            }
        } else {
            for (let i = 0; i < len; i++) {
                let x = points[i].x;
                let y = points[i].y;

                // no rotation version
                points[i].x = x * this.m11 + this.tx;
                points[i].y = y * this.m22 + this.ty;
            }
        }
    }

    /// Transform the array of points using the matrix, stored as xy pairs
    /// <param name="points">The points to be transformed
    transformPoints2(points: Float32Array | number[], stride: number = 2) {
        // do a check for null
        if (points.length === 0) {
            return;
        }

        // if either M12 or M21 are non-zero, then this transform involves rotation
        // if no rotation involved we save on multiplies and additions
        let allowRotation = Math.abs(this.m12) > this.EPSILON || Math.abs(this.m21) > this.EPSILON;

        let len = points.length;
        if (allowRotation) {
            for (let i = 0; i < len; i += stride) {
                let x = points[i];
                let y = points[i + 1];

                points[i] = x * this.m11 + y * this.m12 + this.tx;
                points[i + 1] = x * this.m21 + y * this.m22 + this.ty;
            }
        } else {
            for (let i = 0; i < len; i += 2) {
                let x = points[i];
                let y = points[i + 1];

                // no rotation version
                points[i] = x * this.m11 + this.tx;
                points[i + 1] = y * this.m22 + this.ty;
            }
        }
    }

    /** Transform the point using the matrix. Returns an IPoint object.
     * @param point The point to be transformed
     */
    transform(x: number, y: number): IPoint {
        let pt = this.transform2(x, y);

        return { x: pt[0], y: pt[1] };
    }

    /** Transform the point using the matrix. Returns an array of two numbers (x, y)
     * @param point The point to be transformed
     */
    transform2(x: number, y: number): number[] {
        // if either rotation coefficients are non-zero then allow rotation
        // if no rotation, we save a couple of multiplies per point
        let allowRotation = Math.abs(this.m12) > this.EPSILON || Math.abs(this.m21) > this.EPSILON;

        // @ts-ignore
        let resultPt: IPoint;
        let rx, ry;
        if (allowRotation) {
            rx = x * this.m11 + y * this.m12 + this.tx;
            ry = x * this.m21 + y * this.m22 + this.ty;
        } else {
            // no rotation version
            rx = x * this.m11 + this.tx;
            ry = y * this.m22 + this.ty;
        }

        return [rx, ry];
    }

    /// <summary>
    /// This is a helper method that returns the center of rotation for a collection of points.
    /// This center can be used to call the Matrix.Rotate() method.
    /// </summary>
    /// <param name="points">the collection of points
    /// <returns>the center of rotation</returns>
    static getCenterOfRotation(points: IPoint[]): IPoint {
        let ptArray = new Float32Array(points.length * 2);
        let index = 0;
        for (let i = 0; i < points.length; i++) {
            ptArray[index++] = points[i].x;
            ptArray[index++] = points[i].y;
        }

        return this.getCenterOfRotationF(ptArray);
    }

    /// <summary>
    /// This is a helper method that returns the center of rotation for a collection of points.
    /// This center can be used to call the Matrix.Rotate() method.
    /// </summary>
    /// <param name="points">the collection of points
    /// <returns>the center of rotation</returns>
    static getCenterOfRotationF(points: Float32Array): IPoint {
        // sort by x ascending
        let xmin = Number.MAX_VALUE;
        let xmax = -xmin;
        let ymin = Number.MAX_VALUE;
        let ymax = -ymin;

        let len = points.length;
        for (let i = 0; i < len; i += 2) {
            let x = points[i];
            let y = points[i + 1];
            if (x > xmax) {
                xmax = x;
            }
            if (x < xmin) {
                xmin = x;
            }

            if (y > ymax) {
                ymax = y;
            }
            if (y < ymin) {
                ymin = y;
            }
        }
        let centerX = xmin + (xmax - xmin) / 2;
        let centerY = ymin + (ymax - ymin) / 2;

        return { x: centerX, y: centerY };
    }
}
/* tslint:enable */
