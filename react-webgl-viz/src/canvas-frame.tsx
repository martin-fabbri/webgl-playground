// import * as React from 'react';
//
// interface IProps {
//     width: number;
//     height: number;
// }
//
// interface IRectProps {
//     ctx: CanvasRenderingContext2D;
//     x: number;
//     y: number;
//     w: number;
//     h: number;
// }
//
// const rect = (props: IRectProps) => {
//     const {ctx, x, y, w, h} = props;
//     ctx.fillRect(x, y, w, h);
// }
//
// class CanvasFramePanel extends React.Component<IProps> {
//     private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
//
//     public componentDidMount() {
//         const {width, height} = this.props;
//         const ctx = this.canvasRef.current!.getContext('2d');
//         if (ctx) {
//             ctx.fillStyle = 'teal';
//             ctx.clearRect(0, 0, width, height);
//             ctx.fillRect(0, 0, width, height);
//             ctx.fillStyle = 'blue';
//             rect({ctx, x: 10, y: 10, w: 50, h: 50});
//             rect({ctx, x: 110, y: 110, w: 50, h: 50});
//         }
//     }
//
//     public render() {
//         const {width, height} = this.props;
//         return (
//             <foreignObject x={0} y={0} xmlns="http://www.w3.org/1999/xhtml">
//                 <canvas
//                     ref={this.canvasRef}
//                     width={width}
//                     height={height}/>
//             </foreignObject>
//
//         )
//     }
//
// };
//
// export default CanvasFramePanel;