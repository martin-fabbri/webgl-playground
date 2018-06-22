// @ts-ignore
import { Matrix4 } from 'math.gl';
import * as React from 'react';
import Model from './webgl/model';

class App extends React.Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    public componentDidMount() {
        const webglCanvas = document.createElement('canvas');

        webglCanvas.setAttribute('width', '600');
        webglCanvas.setAttribute('height', '600');

        const gl = webglCanvas.getContext('webgl2') as WebGL2RenderingContext;

        // tslint:disable-next-line
        console.log(gl);

        const model = new Model(gl!);
        model.draw();

        const ctx = this.canvasRef.current!.getContext('2d');

        const vpWidth = ctx!.canvas.width;
        const vpHeight = ctx!.canvas.height;
        const webglHeight = 600;

        ctx!.translate(ctx!.canvas.width, 0);
        ctx!.scale(-1, 1);
        ctx!.drawImage(
            webglCanvas,
            0,
            webglHeight - vpHeight,
            vpWidth,
            vpHeight,
            0,
            0,
            vpWidth,
            vpHeight
        );
    }

    public render() {
        return <canvas ref={this.canvasRef} width={600} height={600} />;
    }
}

export default App;
