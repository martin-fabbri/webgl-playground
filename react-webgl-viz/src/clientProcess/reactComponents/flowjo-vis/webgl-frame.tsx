import * as React from 'react';

import styled from './theme/index';
import Program from './webgl/program';

interface IState {
    gl: WebGL2RenderingContext;
    programInfo?: Program;
}

export interface IProps {
    autoResizeViewport?: boolean;
    autoResizeDrawingBuffer?: boolean;
    createFrameBuffer?: boolean;
    debug?: boolean;
    height?: number;
    offScreen?: boolean;
    useDevicePixels?: boolean;
    width?: number;
}

interface IDefaultProps {
    autoResizeViewport?: boolean;
    autoResizeDrawingBuffer?: boolean;
    createFrameBuffer?: boolean;
    debug?: boolean;
    offScreen?: boolean;
    useDevicePixels?: boolean;
}

type PropsWithDefaults = IProps & IDefaultProps;

class WebglFrame extends React.Component<IProps, IState> {
    public static defaultProps: IDefaultProps = {
        autoResizeDrawingBuffer: true,
        autoResizeViewport: true,
        createFrameBuffer: false,
        debug: false,
        offScreen: false,
        useDevicePixels: true
    };

    private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    public componentDidMount() {
        const canvas = this.canvasRef.current;
        if (canvas === null) {
            this.onContextCreationError();
            return;
        }
        canvas.addEventListener('webglcontextcreationerror', this.onContextCreationError, false);

        const s: IState = {
            gl: canvas.getContext('webgl2') as WebGL2RenderingContext
        };

        this.setState(s as IState);
        canvas.removeEventListener('webglcontextcreationerror', this.onContextCreationError, false);

        this.resizeGLContext();
        this.resizeViewport();
    }

    public render() {
        return <canvas ref={this.canvasRef} />;
    }

    private onContextCreationError = () => {
        // handle context creation error
    };

    /**
     * Resize the canvas' drawing buffer.
     *
     * Can match the canvas CSS size, and optionally also consider devicePixelRatio
     * Can be called every frame
     *
     * Regardless of size, the drawing buffer will always be scaled to the viewport, but
     * for best visual results, usually set to either:
     *  canvas CSS width x canvas CSS height
     *  canvas CSS width * devicePixelRatio x canvas CSS height * devicePixelRatio
     * See http://webgl2fundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
     *
     * resizeGLContext(gl, {width, height, useDevicePixels})
     */
    private resizeGLContext() {
        const { gl } = this.state;
        const { height, useDevicePixels, width } = this.props as PropsWithDefaults;

        // Resize browser context
        if (gl.canvas) {
            /* global window */
            const devicePixelRatio = useDevicePixels ? window.devicePixelRatio || 1 : 1;
            const glCanvasWidth = width ? width : gl.canvas.clientWidth;
            const glCanvasHeight = height ? height : gl.canvas.clientHeight;

            gl.canvas.width = glCanvasWidth * devicePixelRatio;
            gl.canvas.height = glCanvasHeight * devicePixelRatio;
        }
    }

    // default viewport setup
    private resizeViewport() {
        const { gl } = this.state;
        const { autoResizeViewport } = this.props as PropsWithDefaults;
        if (autoResizeViewport) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
    }
}

const StyledWebglFrame = styled(WebglFrame)`
    canvas {
        display: block;
        width: 100px;
        height: 100px;
    }
`;

export default StyledWebglFrame;
