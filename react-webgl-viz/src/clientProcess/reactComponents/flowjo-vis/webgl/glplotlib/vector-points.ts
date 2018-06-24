/* tslint:disable */
/** Simple interface for a point and vectors with some utility functions.
 * Author: Chris Wolf
 */
export interface IPoint {
    x: number;
    y: number;
}

export class Vector implements IPoint {
    static Epsilon = 0.0001;

    constructor(public x: number = 0, public y: number = 0) {}

    /** scales a vector. The vector is multiplied by the scalar value. */
    static scale(k: number, v: Vector) {
        return new Vector(k * v.x, k * v.y);
    }

    /** subtracts two vectors, v1 is subtracted from v2 */
    static subtract(v1: Vector, v2: Vector) {
        return new Vector(v2.x - v1.x, v2.y - v1.y);
    }

    /** creates a vector from two points. p1 is subtracted from p2. */
    static vectorFromPoints(p1: Point, p2: Point) {
        return new Vector(p2.x - p1.x, p2.y - p1.y);
    }

    /** adds two vectors, v1 is added to v2 */
    static add(v1: Vector, v2: Vector) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    /** gets the dot product of the two vectors */
    static dot(v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    /** Gets the magnitude of a vector */
    static magnitude(v: Vector) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    /** Gets the magnitude of this vector */
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /** Gets the normal of a vector */
    static normal(v: Vector) {
        let mag = Vector.magnitude(v);
        let div = mag === 0 ? Infinity : 1.0 / mag;
        return Vector.scale(div, v);
    }

    static areEqual(v1: Vector, v2: Vector) {
        return Math.abs(v1.x - v2.x) < this.Epsilon && Math.abs(v1.y - v2.y) < this.Epsilon;
    }
}

/** Implementation of a point */
export class Point implements IPoint {
    static Epsilon = 0.0001;

    constructor(public x: number = 0, public y: number = 0) {}

    static addPoint(pt1: IPoint, pt2: IPoint) {
        return new Point(pt1.x + pt2.x, pt1.y + pt2.y);
    }

    /** subtract pt2 - pt1 to get the vector */
    static makeVector(pt1: IPoint, pt2: IPoint) {
        return new Vector(pt2.x - pt1.x, pt2.y - pt1.y);
    }

    static distance(pt1: IPoint, pt2: IPoint) {
        let side1 = pt1.x - pt2.x;
        let side2 = pt1.y - pt2.y;
        return Math.sqrt(side1 * side1 + side2 * side2);
    }

    /** adds the vector to the point to get the new point position */
    static offsetPoint(pt: IPoint, vector: Vector) {
        return new Point(pt.x + vector.x, pt.y + vector.y);
    }

    static areEqual(pt1: IPoint, pt2: IPoint) {
        return Math.abs(pt1.x - pt2.x) < this.Epsilon && Math.abs(pt1.y - pt2.y) < this.Epsilon;
    }
}

export class TransitionPoint extends Point {
    sx: number = 0;
    sy: number = 0;
    tx: number = 0;
    ty: number = 0;

    constructor(public x: number = 0, public y: number = 0) {
        super(x, y);
    }
}
/* tslint:enable */
