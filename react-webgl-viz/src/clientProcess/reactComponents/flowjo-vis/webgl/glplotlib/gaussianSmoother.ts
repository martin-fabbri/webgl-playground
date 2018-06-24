/* tslint:disable */
/* GaussianSmoother.ts
* Gaussian smoother that convolves in 1D or 2D. Uses optimizations
* that separate the convolve into two operations for less operations. There
* is also an option to smooth the edges using data reflecting.
*/

/**
 * Creates a Gaussian Smoother used to smooth an array of data. Two parameters
 * are used to control the amount of smoothing, the kernel size and the smoothing
 * factor. To smooth the edges, data extension is used (data reflected).
 * The output of the smoothing is a Float array since there are fractional values
 * @author Chris J. Wolf
 */

export class GaussianSmoother {
    // the values of the kernel
    private _gaussianCoefficients: Float32Array | undefined;
    private static DefaultSmoothing: number = 1.0;
    private _smoothing: number = GaussianSmoother.DefaultSmoothing;

    /** backing store for the Smoothing property (sigma) */
    private static MinSmoothing: number = 0.8;
    private static MaxSmoothing: number = 3.0;

    // backing store for the KernelSize property
    private static MinKernelSize: number = 3;
    private static MaxKernelSize: number = 9;
    private static DefaultKernelSize: number = 3;
    private _kernelSize: number = GaussianSmoother.DefaultKernelSize;

    /**
     * constructs the GaussianSmoother object
     * @param {number} smoothing - the smoothing factor 0.8 - 3.0
     * @param {number} kernelSize - the kernel size, if not specified is the default kernel size
     */
    constructor(
        smoothing: number = GaussianSmoother.DefaultSmoothing,
        kernelSize: number = GaussianSmoother.DefaultKernelSize,
    ) {
        this.setSmoothing(smoothing);
        this.setKernelSize(kernelSize);

        // now create the kernel using the smoothing and kernelSize
        this.createKernel();
    }

    // Gets the Smoothing property
    getSmoothing(): number {
        return this._smoothing;
    }

    /**
     * Checks the value against the supported range and adjusts if necessary
     * @param {number} smoothing - the smoothing value
     * @return {number} the smoothing value or if out of range an adjusted value
     */
    private static checkSmoothing(smoothing: number): number {
        smoothing = Math.abs(smoothing);

        // in range case
        if (
            smoothing >= GaussianSmoother.MinSmoothing &&
            smoothing <= GaussianSmoother.MaxSmoothing
        ) {
            return smoothing;
        }

        // if outside the range or Nan
        if (smoothing < GaussianSmoother.MinSmoothing) {
            smoothing = GaussianSmoother.MinSmoothing;
        } else if (smoothing > GaussianSmoother.MaxSmoothing) {
            smoothing = GaussianSmoother.MaxSmoothing;
        } else {
            smoothing = GaussianSmoother.MinSmoothing; // NaN case
        }

        return smoothing;
    }

    /**
     * Sets the smoothing factor. This is the sigma value and can range from .8 to 3.0
     * @param {number} smoothing - the smoothing value
     */
    private setSmoothing(smoothing: number) {
        this._smoothing = GaussianSmoother.checkSmoothing(smoothing);
    }

    /**
     * Gets the KernelSize property
     */
    getKernelSize() {
        return this._kernelSize;
    }

    /**
     * @param {number} kernelSize - checks for kernel size validaty
     * @returns {number} the kernel size
     */
    private static checkKernelSize(kernelSize: number) {
        kernelSize = Math.abs(kernelSize);
        let isOdd = kernelSize % 2 !== 0;

        // make sure it's odd and in range, make it so
        if (!isOdd) {
            kernelSize++;
        }

        // in range case
        if (
            kernelSize >= GaussianSmoother.MinKernelSize &&
            kernelSize <= GaussianSmoother.MaxKernelSize
        ) {
            return kernelSize;
        }

        if (kernelSize < GaussianSmoother.MinKernelSize) {
            kernelSize = GaussianSmoother.MinKernelSize;
        } else if (kernelSize > GaussianSmoother.MaxKernelSize) {
            kernelSize = GaussianSmoother.MaxKernelSize;
        } else {
            kernelSize = GaussianSmoother.MinKernelSize; // NaN case
        }

        return kernelSize;
    }

    /**
     * set the kernel size
     * @param {number} kernelSize - the desired size of the kernel: 3, 5, 7, 9 are supported. Values outside the range will
     * be clamped to the minimum and maximum.
     */
    private setKernelSize(kernelSize: number) {
        kernelSize = GaussianSmoother.checkKernelSize(kernelSize);
        this._kernelSize = kernelSize;
    }

    /**
     * creates the kernel
     */
    private createKernel() {
        this._gaussianCoefficients = GaussianSmoother.generate1DGaussianCoefficients(
            this.getKernelSize(),
            this.getSmoothing(),
        );
        GaussianSmoother.normalize(this._gaussianCoefficients);
    }

    /**
     * This will normalize the coefficients so that the total is equal to 1
     * @param {Float32Array} src - the source array of gaussian coefficients
     */
    static normalize(src: Float32Array) {
        if (src == null) {
            return;
        }

        let sum = 0;
        src.forEach(v => (sum += v));

        if (sum > 0) {
            let scale = 1 / sum;
            for (let i = 0; i < src.length; i++) {
                src[i] = src[i] * scale;
            }
        }
    }

    /**
     * Gets the kernel coefficients. This is a 1D array
     */
    coefficients(): Float32Array {
        return GaussianSmoother.generate1DGaussianCoefficients(
            this.getKernelSize(),
            this.getSmoothing(),
        );
    }

    /**
     * Gets the normalized kernel coefficients. This is a 1D array.
     */
    coefficientsNormalized(): Float32Array {
        let coeff = GaussianSmoother.generate1DGaussianCoefficients(
            this.getKernelSize(),
            this.getSmoothing(),
        );
        GaussianSmoother.normalize(coeff);
        return coeff;
    }

    /**
     * Gets the 2D kernel coefficients. This is a 2D array.
     */
    coefficients2D(): Float32Array {
        return GaussianSmoother.generate2DGaussianCoefficients(
            this.getKernelSize(),
            this.getSmoothing(),
        );
    }

    /**
     * Generate the 1D array of gaussian coefficients
     * @param {number} kernelSize - size of the kernel
     * @param {number} sigma - the smoothing factor
     * @returns {Float32Array} the coefficients
     */
    static generate1DGaussianCoefficients(kernelSize: number, sigma: number): Float32Array {
        kernelSize = GaussianSmoother.checkKernelSize(kernelSize);
        sigma = GaussianSmoother.checkSmoothing(sigma);

        let gaussianCoefficients: Float32Array = new Float32Array(kernelSize);

        // need a symmetrical kernel about zero
        let index = 0;
        let limit = (kernelSize / 2) | 0;
        let upperLimit = limit;
        let lowerLimit = -limit;
        let scaler = 1 / (Math.sqrt(2 * Math.PI) * sigma);
        for (let x = lowerLimit; x <= upperLimit; x++) {
            gaussianCoefficients[index] = scaler * Math.exp((-x * x) / (2 * sigma * sigma));
            index++;
        }

        return gaussianCoefficients;
    }

    /**
     * Generate the 2D array of gaussian coefficients. This is here more
     * for reference since gaussian is separable into two operations using a 1D
     * kernel for efficiency. It shows how to generate the 2D array.
     * @param {number} kernelSize
     * @param {number} sigma - the smoothing factor
     * @returns {Float32Array} the 2D coefficients
     */
    static generate2DGaussianCoefficients(kernelSize: number, sigma: number): Float32Array {
        // to generate 2D coefficients, just use the 1D and multiply the matrices
        let coeff1D: Float32Array = GaussianSmoother.generate1DGaussianCoefficients(
            kernelSize,
            sigma,
        );

        // iterate thru the row and multiply by the column
        let coeff2D: Float32Array = new Float32Array(kernelSize * kernelSize);
        for (let row = 0; row < kernelSize; row++) {
            for (let column = 0; column < kernelSize; column++) {
                coeff2D[row * kernelSize + column] = coeff1D[row] * coeff1D[column];
            }
        }

        return coeff2D;
    }

    /**
     * checks to make sure that both arrays are non-null and same length
     * @param {ArrayBufferView} sourceData - the source data
     * @param {Float32Array} destData - the destination data array
     */
    static checkArrays(
        sourceData: Float32Array | Uint32Array | Uint16Array,
        destData: Float32Array,
    ) {
        if (sourceData == null || destData == null) {
            throw "Smoother: Arrays cannot be null:";
        }

        if (sourceData.length !== destData.length) {
            throw "Smoother: Arrays not the same length: ";
        }
    }

    /**
     * convolves the 1D kernel horizontally with the source array to output to the destination array
     * @param {ArrayBufferView} src - the source array
     * @param {number} rowWidth - the width of a row
     * @param {Float32Array} coefficients - the gaussian smoothing array
     */
    static convolveHorz(
        src: Float32Array | Uint32Array | Uint16Array,
        dest: Float32Array,
        rowWidth: number,
        coefficients: Float32Array,
    ) {
        let kernelSize = coefficients.length;
        let halfKernel = (kernelSize / 2) | 0;
        let numRows = (dest.length / rowWidth) | 0;
        let rowOffset = 0;

        for (let row = 0; row < numRows; row++) {
            for (let col = halfKernel; col < rowWidth - halfKernel; col++) {
                // get the dest pixel index
                let pixelIndex = rowOffset + col;
                let startIndex = pixelIndex - halfKernel;

                // convolve the values around the pixel of interest
                for (let coeffIndex = 0; coeffIndex < kernelSize; coeffIndex++) {
                    let srcDataIndex = startIndex + coeffIndex;
                    dest[pixelIndex] += coefficients[coeffIndex] * src[srcDataIndex];
                }
            }
            // increment to next row
            rowOffset += rowWidth;
        }
    }

    /**
     * convolves the 1D kernel vertically with the source array to output to the destination array
     * @param {ArrayBufferView} src - the source array
     * @param {number} rowWidth - the width of a row
     * @param {Float32Array} coefficients - the gaussian smoothing array
     */
    static convolveVert(
        src: Float32Array | Uint32Array | Uint16Array,
        dest: Float32Array,
        rowWidth: number,
        coefficients: Float32Array,
    ) {
        let kernelSize = coefficients.length;
        let halfKernel = (kernelSize / 2) | 0;
        let numRows = (dest.length / rowWidth) | 0;
        let rowOffset = halfKernel * rowWidth;

        for (let row = halfKernel; row < numRows - halfKernel; row++) {
            for (let col = 0; col < rowWidth; col++) {
                // get the dest pixel index
                let pixelIndex = rowOffset + col;
                let startIndex = pixelIndex - halfKernel * rowWidth;

                // convolve the values around the pixel of interest
                for (let coeffIndex = 0; coeffIndex < kernelSize; coeffIndex++) {
                    let srcDataIndex = startIndex + coeffIndex * rowWidth;
                    dest[pixelIndex] += coefficients[coeffIndex] * src[srcDataIndex];
                }
            }
            rowOffset += rowWidth;
        }
    }

    /**
     * convolves the 1D kernel vertically with left edge of the source array to output to the destination array
     * @param {Float32Array} src - the source array
     * @param {number} rowWidth - the width of a row
     * @param {Float32Array} coefficients - the gaussian smoothing array
     */
    static convolveLeftHorz(
        src: Float32Array | Uint32Array | Uint16Array,
        dest: Float32Array,
        rowWidth: number,
        coefficients: Float32Array,
    ) {
        let kernelSize = coefficients.length;
        let halfKernel = (kernelSize / 2) | 0;
        let numRows = (dest.length / rowWidth) | 0;

        let rowOffset = 0;

        // left side
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < halfKernel; col++) {
                // get the dest pixel index
                let pixelIndex = rowOffset + col;

                // convolve the values around the pixel of interest
                for (let coeffIndex = 0; coeffIndex < kernelSize; coeffIndex++) {
                    let offset = coeffIndex - halfKernel;
                    if (col + offset < 0) {
                        offset = halfKernel - coeffIndex;
                    }
                    let srcDataIndex = pixelIndex + offset;
                    dest[pixelIndex] += coefficients[coeffIndex] * src[srcDataIndex];
                }
            }

            // increment to next row avoids multiply
            rowOffset += rowWidth;
        }
    }

    /**
     * Convolves the 1D kernel with the right edge of the source array and output to the destination array
     * @param {ArrayBufferView} src - the source array
     * @param {number} rowWidth - the width of a row
     * @param {Float32Array} coefficients - the gaussian smoothing array
     */
    static convolveRightHorz(
        src: Float32Array | Uint32Array | Uint16Array,
        dest: Float32Array,
        rowWidth: number,
        coefficients: Float32Array,
    ) {
        let kernelSize = coefficients.length;
        let halfKernel = (kernelSize / 2) | 0;
        let numRows = (dest.length / rowWidth) | 0;
        let rowOffset = 0;

        // left side
        for (let row = 0; row < numRows; row++) {
            for (let col = rowWidth - halfKernel; col < rowWidth; col++) {
                // get the dest pixel index
                let pixelIndex = rowOffset + col;

                // convolve the values around the pixel of interest
                for (let coeffIndex = 0; coeffIndex < kernelSize; coeffIndex++) {
                    // only worry about the upper half since it is reflected
                    let offset = coeffIndex - halfKernel;
                    if (col + offset >= rowWidth) {
                        offset = halfKernel - coeffIndex;
                    }
                    let srcDataIndex = pixelIndex + offset;
                    dest[pixelIndex] += coefficients[coeffIndex] * src[srcDataIndex];
                }
            }

            // increment to next row
            rowOffset += rowWidth;
        }
    }

    /**
     * Convolves the 1D kernel with the top edge of the source array and output to the destination array
     * @param {ArrayBufferView} src - the source array
     * @param {number} rowWidth - the width of a row
     * @param {Float32Array} coefficients - the gaussian smoothing array
     */
    static convolveTopVert(
        src: Float32Array | Uint32Array | Uint16Array,
        dest: Float32Array,
        rowWidth: number,
        coefficients: Float32Array,
    ) {
        let kernelSize = coefficients.length;
        let halfKernel = (kernelSize / 2) | 0;
        // @ts-ignore
        let numRows = (dest.length / rowWidth) | 0;
        let rowOffset = 0;

        for (let row = 0; row < halfKernel; row++) {
            for (let col = 0; col < rowWidth; col++) {
                // get the dest pixel index
                let pixelIndex = rowOffset + col;

                // convolve the values around the pixel of interest
                for (let coeffIndex = 0; coeffIndex < kernelSize; coeffIndex++) {
                    // only worry about the upper half since it is reflected
                    let offset = coeffIndex - halfKernel;
                    if (row + offset < 0) {
                        offset = halfKernel - coeffIndex;
                    }

                    let srcDataIndex = pixelIndex + offset * rowWidth;
                    dest[pixelIndex] += coefficients[coeffIndex] * src[srcDataIndex];
                }
            }

            // increment to next row
            rowOffset += rowWidth;
        }
    }

    /**
     * Convolves the 1D kernel with the bottom edge of the source array and output to the destination array
     * @param {ArrayBufferView} src - the source array
     * @param {number} rowWidth - the width of a row
     * @param {Float32Array} coefficients - the gaussian smoothing array
     */
    static convolveBottomVert(
        src: Float32Array | Uint32Array | Uint16Array,
        dest: Float32Array,
        rowWidth: number,
        coefficients: Float32Array,
    ) {
        let kernelSize = coefficients.length;
        let halfKernel = (kernelSize / 2) | 0;
        let numRows = (dest.length / rowWidth) | 0;
        let rowOffset = (numRows - halfKernel) * rowWidth;

        // bottom side
        for (let row = numRows - halfKernel; row < numRows; row++) {
            for (let col = 0; col < rowWidth; col++) {
                // get the dest pixel index
                let pixelIndex = rowOffset + col;

                // convolve the values around the pixel of interest
                for (let coeffIndex = 0; coeffIndex < kernelSize; coeffIndex++) {
                    let offset = coeffIndex - halfKernel;
                    if (row + offset >= numRows) {
                        offset = halfKernel - coeffIndex;
                    }

                    let srcDataIndex = pixelIndex + offset * rowWidth;
                    dest[pixelIndex] += coefficients[coeffIndex] * src[srcDataIndex];
                }
            }

            // increment to next row
            rowOffset += rowWidth;
        }
    }

    /** Smooth the data in the source array into the destination array. The
     * arrays must be identical in size. The source array can be any ArrayBufferView type: 8/16/32 bit signed/unsigned or float. The output
     * array will always be float32
     * <param name="src">the source array: any ArrayBufferView type</param>
     * <param name="dest">the destination ArrayBufferView. The length in elements much match the source</param>
     * <param name="rowWidth">The width of the arrays.</param>
     * <param name="smoothEdges">If true, edges are smoothed using data extension, otherwise edges are clear</param>
     */
    smooth<T extends Float32Array | Uint32Array | Uint16Array>(
        src: T,
        dest: Float32Array,
        rowWidth: number,
        smoothEdges: boolean = true,
    ) {
        GaussianSmoother.checkArrays(src, dest);

        // get number of complete rows, integer/float width is always 4
        let numRows = (dest.length / rowWidth) | 0;

        if (numRows === 0) return;

        // if this is a 2D array then a scratch array is needed for two-pass convolve, otherwise set to dest ref
        // horizontally then vertically
        let scratch = numRows === 1 ? dest : new Float32Array(dest.length);

        // horizontal convolve to scratch array
        // @ts-ignore
      GaussianSmoother.convolveHorz(src, scratch, rowWidth, this._gaussianCoefficients);

        if (smoothEdges) {
            // @ts-ignore
          GaussianSmoother.convolveLeftHorz(src, scratch, rowWidth, this._gaussianCoefficients);
            // @ts-ignore
          GaussianSmoother.convolveRightHorz(src, scratch, rowWidth, this._gaussianCoefficients);
        }

        // for 2D vertical convolve to final array, if there is more than 1 row
        if (numRows > 1) {
            // @ts-ignore
          GaussianSmoother.convolveVert(scratch, dest, rowWidth, this._gaussianCoefficients);

            if (smoothEdges) {

              GaussianSmoother.convolveTopVert(
                    scratch,
                    dest,
                    rowWidth,
                    // @ts-ignore
                    this._gaussianCoefficients,
                );

              GaussianSmoother.convolveBottomVert(
                    scratch,
                    dest,
                    rowWidth,
                    // @ts-ignore
                    this._gaussianCoefficients,
                );
            }
        }

        // GaussianSmoother.outputHistogram(dest);
    }

    static outputHistogram(histogram: Float32Array | Uint32Array | Uint16Array) {
        console.log("BEGIN");
        let s = "";
        for (let row = 0; row < 64; row++) {
            for (let col = 0; col < 64; col++) {
                s += histogram[row * 64 + col] + ",";
            }
            console.log(s);
            s = "";
        }
    }
}
/* tslint:enable */
