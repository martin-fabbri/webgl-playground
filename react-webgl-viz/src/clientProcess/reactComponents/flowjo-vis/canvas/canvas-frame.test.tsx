// import * as React from 'react';
// import CanvasFrame from './canvas-frame';
//
// import {shallow} from 'enzyme';
//
// // const xyProps = {width: 10, height:10};
//
// const testProps: XyProps = {height: 10, width: 10};
//
// const {height, width} = testProps;
//
// describe('xy-frame', () => {
//
//     it('renders container & svg elements without crashing', () => {
//         const wrapper = shallow(<XyFrame {...testProps}/>).dive();
//
//
//         const container = wrapper.find('div');
//         expect(container.length).toEqual(1);
//         expect(container.prop('style')).toEqual({width: `${width}px`, height: `${height}px`});
//
//         // tslint:disable-next-line
//         console.log('okkkk', container.prop('style'));
//
//         expect(wrapper.find("svg").length).toEqual(1);
//     });
//
// });
