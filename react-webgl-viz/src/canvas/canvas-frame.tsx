// import * as React from 'react'
//
// import styled from '../theme/index';
//
// import {Optional} from '../global-types';
//
// export interface IProps {
//     style?: React.CSSProperties;
//     innerHeight: number;
//     innerWidth: number;
//     marginBottom: number;
//     marginLeft: number;
//     marginRight: number;
//     marginTop: number;
// }
//
// interface IDefaultProps {
//     children: any | null;
//     style: React.CSSProperties;
//     pixelRatio: number;
// }
//
// type PropsWithDefaults = IProps & IDefaultProps
//
// class CanvasFrame extends React.Component<IProps> {
//     public static defaultProps: IDefaultProps = {
//         children: undefined,
//         pixelRatio: window && window.devicePixelRatio || 1,
//         style: {},
//     };
//
//     private readonly canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();
//
//     public componentDidMount() {
//         const ctx = this.canvasRef.current!.getContext('2d');
//         const {pixelRatio} = this.props as PropsWithDefaults;
//         if (!ctx) {
//             return;
//         }
//
//         ctx.scale(pixelRatio, pixelRatio);
//         this.drawChildren(this.props as PropsWithDefaults, undefined, ctx);
//     }
//
//     public componentDidUpdate() {
//         return;
//     }
//
//     public render() {
//         const {
//             innerHeight,
//             innerWidth,
//             marginBottom,
//             marginLeft,
//             marginRight,
//             marginTop,
//             pixelRatio
//         } = this.props as PropsWithDefaults;
//
//         const height = innerHeight + marginTop + marginBottom;
//         const width = innerWidth + marginLeft + marginRight;
//
//         return (
//             <div style={{left: 0, top: 0}}>
//                 <canvas
//                     className="rv-xy-canvas-element"
//                     height={height * pixelRatio}
//                     width={width * pixelRatio}
//                     style={{
//                         height: `${height}px`,
//                         width: `${width}px`
//                     }}
//                     ref={this.canvasRef} />
//             </div>
//         );
//     }
//
//
//     /**
//      * Check that we can and should be animating, then kick off animations as needed
//      * @param newProps the new props to be interpolated to
//      * @param oldProps the old props to be interpolated against
//      * @param ctx the canvas context to be drawn on.
//      * @returns Object for rendering
//      */
//     private drawChildren(newProps: PropsWithDefaults, oldProps: Optional<PropsWithDefaults>,
//                          ctx: CanvasRenderingContext2D) {
//         return;
//         // const {
//         //     children,
//         //     innerHeight,
//         //     innerWidth,
//         //     marginBottom,
//         //     marginLeft,
//         //     marginRight,
//         //     marginTop
//         // } = newProps;
//         // if (!ctx) {
//         //     return;
//         // }
//         //
//         // const childrenShouldAnimate = children.find(child => child.props.animation);
//         //
//         // const height = innerHeight + marginTop + marginBottom;
//         // const width = innerWidth + marginLeft + marginRight;
//         // const layers = buildLayers(newProps.children, oldProps ? oldProps.children : []);
//         // // if we don't need to be animating, dont! cut short
//         // if (!childrenShouldAnimate) {
//         //     drawLayers(ctx, height, width, layers);
//         //     return;
//         // }
//         //
//         // engageDrawLoop(ctx, height, width, layers);
//     }
// };
//
// const StyledCanvasFrame = styled(CanvasFrame)`
//   canvas {
//     pointer-events: none;
//   }
//
//   .rv-xy-canvas {
//     pointer-events: none;
//     position: absolute;
//   }
// `;
//
// export default StyledCanvasFrame;