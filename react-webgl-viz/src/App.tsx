// @ts-ignore
import {Matrix4} from 'math.gl';
import * as React from 'react';
import Model from './webgl/model';


class App extends React.Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

    public componentDidMount() {
        const gl = this.canvasRef.current!.getContext('webgl2');
        // tslint:disable-next-line
        console.log(gl);

        const model = new Model(gl!);
        model.draw();


    }

    public render() {
        return <canvas ref={this.canvasRef} width={500} height={500} />;
    }
}

export default App;
