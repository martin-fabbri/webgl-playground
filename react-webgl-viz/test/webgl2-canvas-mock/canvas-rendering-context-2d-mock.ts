import { HTMLCanvasElementMock } from './index';

class CanvasRenderingContext2DMock implements CanvasRenderingContext2D {
    public readonly canvas: HTMLCanvasElement;
    public fillStyle: string | CanvasGradient | CanvasPattern;
    public font: string;
    public globalAlpha: number;
    public globalCompositeOperation: string;
    public imageSmoothingEnabled: boolean;
    public lineCap: string;
    public lineDashOffset: number;
    public lineJoin: string;
    public lineWidth: number;
    public miterLimit: number;
    public mozImageSmoothingEnabled: boolean;
    public msFillRule: CanvasFillRule;
    public oImageSmoothingEnabled: boolean;
    public shadowBlur: number;
    public shadowColor: string;
    public shadowOffsetX: number;
    public shadowOffsetY: number;
    public strokeStyle: string | CanvasGradient | CanvasPattern;
    public textAlign: string;
    public textBaseline: string;
    public webkitImageSmoothingEnabled: boolean;

    constructor(canvas: HTMLCanvasElementMock) {
        this.canvas = canvas as HTMLCanvasElement;
    }

    public arc(
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number,
        anticlockwise?: boolean
    ): void {
        return;
    }

    public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    public arcTo(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        radiusX: number,
        radiusY: number,
        rotation: number
    ): void;
    public arcTo(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        radius: number,
        radiusY?: number,
        rotation?: number
    ): void {
        return;
    }

    public beginPath(): void {
        return;
    }

    public bezierCurveTo(
        cp1x: number,
        cp1y: number,
        cp2x: number,
        cp2y: number,
        x: number,
        y: number
    ): void {
        return;
    }

    public clearRect(x: number, y: number, w: number, h: number): void {
        return;
    }

    public clip(fillRule?: CanvasFillRule): void;
    public clip(path: Path2D, fillRule?: CanvasFillRule): void;
    public clip(fillRule?: CanvasFillRule | Path2D, fillRuleX?: CanvasFillRule): void {
        return;
    }

    public closePath(): void {
        return;
    }

    public createImageData(imageDataOrSw: number | ImageData, sh?: number): ImageData {
        throw Error('not implemented');
    }

    public createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient {
        throw Error('not implemented');
    }

    public createPattern(
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
        repetition: string
    ): CanvasPattern {
        throw Error('not implemented');
    }

    public createRadialGradient(
        x0: number,
        y0: number,
        r0: number,
        x1: number,
        y1: number,
        r1: number
    ): CanvasGradient {
        throw Error('not implemented');
    }

    public drawFocusIfNeeded(element: Element): void;
    public drawFocusIfNeeded(path: Path2D, element: Element): void;
    public drawFocusIfNeeded(element: Element | Path2D, element2?: Element): void {
        return;
    }

    public drawImage(
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
        dstX: number,
        dstY: number
    ): void;
    public drawImage(
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
        dstX: number,
        dstY: number,
        dstW: number,
        dstH: number
    ): void;
    public drawImage(
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
        srcX: number,
        srcY: number,
        srcW: number,
        srcH: number,
        dstX: number,
        dstY: number,
        dstW: number,
        dstH: number
    ): void;
    public drawImage(
        image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
        dstX: number,
        dstY: number,
        dstW?: number,
        dstH?: number,
        dstX2?: number,
        dstY2?: number,
        dstW2?: number,
        dstH2?: number
    ): void {
        return;
    }

    public ellipse(
        x: number,
        y: number,
        radiusX: number,
        radiusY: number,
        rotation: number,
        startAngle: number,
        endAngle: number,
        anticlockwise?: boolean
    ): void {
        return;
    }

    public fill(fillRule?: CanvasFillRule): void;
    public fill(path: Path2D, fillRule?: CanvasFillRule): void;
    public fill(fillRule?: CanvasFillRule | Path2D, fillRule2?: CanvasFillRule): void {
        return;
    }

    public fillRect(x: number, y: number, w: number, h: number): void {
        return;
    }

    public fillText(text: string, x: number, y: number, maxWidth?: number): void {
        return;
    }

    public getImageData(sx: number, sy: number, sw: number, sh: number): ImageData {
        throw Error('not implemented');
    }

    public getLineDash(): number[] {
        return [];
    }

    public isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    public isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
    public isPointInPath(
        x: number | Path2D,
        y: number,
        fillRule?: CanvasFillRule | number,
        fillRule2?: CanvasFillRule
    ): boolean {
        return false;
    }

    public isPointInStroke(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    public isPointInStroke(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
    public isPointInStroke(
        x: number | Path2D,
        y: number,
        fillRule?: CanvasFillRule | number,
        fillRule2?: CanvasFillRule
    ): boolean {
        return false;
    }

    public lineTo(x: number, y: number): void {
        return;
    }

    public measureText(text: string): TextMetrics {
        throw Error('not implemented');
    }

    public moveTo(x: number, y: number): void {
        return;
    }

    public putImageData(
        imagedata: ImageData,
        dx: number,
        dy: number,
        dirtyX?: number,
        dirtyY?: number,
        dirtyWidth?: number,
        dirtyHeight?: number
    ): void {
        return;
    }

    public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
        return;
    }

    public rect(x: number, y: number, w: number, h: number): void {
        return;
    }

    public restore(): void {
        return;
    }

    public rotate(angle: number): void {
        return;
    }

    public save(): void {
        return;
    }

    public scale(x: number, y: number): void {
        return;
    }

    public setLineDash(segments: number[]): void {
        return;
    }

    public setTransform(
        m11: number,
        m12: number,
        m21: number,
        m22: number,
        dx: number,
        dy: number
    ): void {
        return;
    }

    public stroke(path?: Path2D): void {
        return;
    }

    public strokeRect(x: number, y: number, w: number, h: number): void {
        return;
    }

    public strokeText(text: string, x: number, y: number, maxWidth?: number): void {
        return;
    }

    public transform(
        m11: number,
        m12: number,
        m21: number,
        m22: number,
        dx: number,
        dy: number
    ): void {
        return;
    }

    public translate(x: number, y: number): void {
        return;
    }
}

export default CanvasRenderingContext2DMock;
