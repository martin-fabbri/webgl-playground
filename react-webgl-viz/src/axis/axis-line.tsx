import * as React from 'react';

import styled, { theme } from '../theme/index';

import { Orientation } from '../utils/axis';

interface IProps {
    className?: string;
    height: number;
    style?: React.CSSProperties;
    orientation: Orientation;
    width: number;
}

interface IDefaultProps {
    style: React.CSSProperties;
}

type PropsWithDefaults = IProps & IDefaultProps;

const { Bottom, Left, Right } = Orientation;

class AxisLine extends React.Component<IProps> {
    public static defaultProps: IDefaultProps = {
        style: {}
    };

    public render() {
        const { height, style, orientation, width, className } = this.props as PropsWithDefaults;

        // default orientation Top
        let lineProps = {
            x1: 0,
            x2: width,
            y1: 0,
            y2: 0
        };

        switch (orientation) {
            case Bottom: {
                lineProps = {
                    x1: 0,
                    x2: width,
                    y1: height,
                    y2: height
                };
                break;
            }
            case Left: {
                lineProps = {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: height
                };
                break;
            }
            case Right: {
                lineProps = {
                    x1: width,
                    x2: width,
                    y1: 0,
                    y2: height
                };
                break;
            }
        }

        return <line {...lineProps} style={style} className={className} />;
    }
}

const StyledAxisLine = styled(AxisLine)`
    fill: none;
    stroke-width: 2px;
    stroke: ${theme.xyPlotAxisLineColor};
`;

export default StyledAxisLine;
