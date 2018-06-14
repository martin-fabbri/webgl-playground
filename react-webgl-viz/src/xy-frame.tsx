import * as React from 'react';

import styled from './theme';

export interface IProps {
    className?: string;
    style?: React.CSSProperties;
    width: number;
    height: number;
}

interface IDefaultProps {
    style: React.CSSProperties;
}

type PropsWithDefaults = IProps & IDefaultProps;

class XyFrame extends React.Component<IProps> {
    public static defaultProps: IDefaultProps = {
        style: {}
    };

    public render() {
        const { height, width } = this.props as PropsWithDefaults;
        return (
            <div style={{ width: `${width}px`, height: `${height}px` }}>
                <svg width={width} height={height} style={{ padding: '3rem' }}>
                    {this.props.children}
                </svg>
            </div>
        );
    }
}

const StyledXyFrame = styled(XyFrame)`
    color: #c3c3c3;
    position: relative;

    svg {
        display: block;
        padding: 3rem;
    }
`;

export default StyledXyFrame;
