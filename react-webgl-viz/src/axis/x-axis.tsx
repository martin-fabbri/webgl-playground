import * as React from 'react';

import { Orientation, TitlePosition } from '../utils/axis';
import Axis, { IProps as IAxisProps } from './axis';

interface IDefaultProps {
    orientation: Orientation;
    position: TitlePosition;
}

const { Bottom } = Orientation;
const { Middle } = TitlePosition;

type PropsWithDefaults = IAxisProps & IDefaultProps;

class XAxis extends React.Component<IAxisProps> {
    public static defaultProps: IDefaultProps = {
        orientation: Bottom,
        position: Middle
    };

    public render() {
        return <Axis {...this.props as PropsWithDefaults} />;
    }
}

export default XAxis;
