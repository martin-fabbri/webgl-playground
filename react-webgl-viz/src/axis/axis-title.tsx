import * as React from 'react';

import styled, { theme } from '../theme/index';

import { Orientation, TitlePosition } from '../utils/axis';

interface IProps {
    className?: string;
    height: number;
    style?: React.CSSProperties;
    title: string;
    orientation: Orientation;
    position?: TitlePosition;
    width: number;
}

interface IDefaultProps {
    style: React.CSSProperties;
    position: TitlePosition;
}

type PropsWithDefaults = IProps & IDefaultProps;

const { Left, Right, Top, Bottom } = Orientation;
const { Start, Middle, End } = TitlePosition;

const adjustmentForTextSize = 16; // Assuming that 16px = 1em
const margin = 17; // px

/**
 * Compute transformations, keyed by orientation & title position
 */
const transformation = (width: number, height: number) => ({
    [Left]: {
        [End]: {
            rotation: -90,
            textAnchor: 'end',
            x: -adjustmentForTextSize * 2.3,
            y: margin
        },
        [Middle]: {
            rotation: -90,
            textAnchor: 'middle',
            x: -adjustmentForTextSize * 2.3,
            y: height / 2 - margin
        },
        [Start]: {
            rotation: -90,
            textAnchor: 'start',
            x: -adjustmentForTextSize * 2.3,
            y: height - margin
        }
    },
    [Right]: {
        [End]: {
            rotation: -90,
            textAnchor: 'end',
            x: width + adjustmentForTextSize * -0.5,
            y: margin
        },
        [Middle]: {
            rotation: -90,
            textAnchor: 'middle',
            x: width + adjustmentForTextSize * -0.5,
            y: height / 2 - margin
        },
        [Start]: {
            rotation: -90,
            textAnchor: 'start',
            x: width + adjustmentForTextSize * -0.5,
            y: height - margin
        }
    },
    [Top]: {
        [Start]: {
            rotation: 0,
            textAnchor: 'start',
            x: margin,
            y: adjustmentForTextSize
        },
        [Middle]: {
            rotation: 0,
            textAnchor: 'middle',
            x: width / 2 - margin,
            y: adjustmentForTextSize
        },
        [End]: {
            rotation: 0,
            textAnchor: 'end',
            x: width - margin,
            y: adjustmentForTextSize
        }
    },
    [Bottom]: {
        [Start]: {
            rotation: 0,
            textAnchor: 'start',
            x: margin,
            y: margin + adjustmentForTextSize
        },
        [Middle]: {
            rotation: 0,
            textAnchor: 'middle',
            x: width / 2 - margin,
            y: margin + adjustmentForTextSize
        },
        [End]: {
            rotation: 0,
            textAnchor: 'end',
            x: width - margin,
            y: margin + adjustmentForTextSize
        }
    }
});

class AxisTitle extends React.Component<IProps> {
    public static defaultProps: IDefaultProps = {
        position: Middle,
        style: {}
    };

    public render() {
        const { orientation, position, width, height, style, title, className } = this
            .props as PropsWithDefaults;

        // default orientation = top
        let outerGroupTranslateX = 0;
        let outerGroupTranslateY = 0;

        switch (orientation) {
            case Bottom: {
                outerGroupTranslateY = height;
                break;
            }
            case Left: {
                break;
            }
            case Right: {
                outerGroupTranslateX = width;
                break;
            }
        }

        const outerGroupTransform = `translate(${outerGroupTranslateX}, ${outerGroupTranslateY})`;
        const titleTransformations: { [o: string]: any } = transformation(width, height);
        const { x, y, rotation, textAnchor } = titleTransformations[orientation][position];
        const innerGroupTransform = `translate(${x}, ${y}) rotate(${rotation})`;

        return (
            <g transform={outerGroupTransform} className={className}>
                <g style={{ textAnchor, ...style }} transform={innerGroupTransform}>
                    <text style={style}>{title}</text>
                </g>
            </g>
        );
    }
}

const StyledAxisTitle = styled(AxisTitle)`
    text {
        fill: ${theme.xyPlotAxisFontColor};
        font-size: ${theme.xyPlotAxisFontSize};
    }
`;

export default StyledAxisTitle;
