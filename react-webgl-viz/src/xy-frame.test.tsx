import * as React from 'react';
import XyFrame, {IProps as XyProps} from './xy-frame';

import {shallow} from 'enzyme';

// const xyProps = {width: 10, height:10};

const testProps: XyProps = {height: 10, width: 10};

const {height, width} = testProps;

describe('xy-frame', () => {

    it('renders container & svg elements without crashing', () => {
        const wrapper = shallow(<XyFrame {...testProps}/>).dive();


        const container = wrapper.find('div');
        expect(container.length).toEqual(1);
        expect(container.prop('style')).toEqual({width: `${width}px`, height: `${height}px`});
        expect(wrapper.find('svg').length).toEqual(1);
    });

});
