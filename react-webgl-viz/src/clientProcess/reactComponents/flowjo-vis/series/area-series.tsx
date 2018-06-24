import * as React from 'react';

import styled from '../theme/index';
import BaseSeries, {
    IDefaultProps as IBaseSeriesDefaultProps,
    IProps as IBaseSeriesProps
} from './base-series';

import { getScaleFunc, IDatum } from '../utils/scales';

import { ScaleContinuousNumeric } from 'd3-scale';
import { area, curveCardinal } from 'd3-shape';

export interface IProps extends IBaseSeriesProps<SVGElement> {
    y0: [number, number];
}

export type PropsWithDefaults = IProps & IBaseSeriesDefaultProps;

class AreaSeries extends BaseSeries<SVGElement, IProps> {
    public render() {
        const {
            className,
            curve,
            data,
            marginLeft,
            marginTop,
            xDomain,
            xRange,
            yDomain,
            yRange,
            y0
        } = this.props as PropsWithDefaults;
        // const {animation} = this.props;

        if (!data) {
            return undefined;
        }

        // if (animation) {
        //     return (
        //         <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
        //             <LineSeries {...this.props} animation={null} />
        //         </Animation>
        //     );
        // }

        const x = getScaleFunc({
            data: xDomain ? undefined : data.map(elem => elem.x),
            domain: xDomain,
            kind: 'linear',
            range: xRange
        });

        const y = getScaleFunc({
            data: yDomain ? undefined : data.map(elem => elem.y),
            domain: yDomain,
            kind: 'linear',
            range: yRange
        });

        // const stroke =
        //     this._getAttributeValue('stroke') || this._getAttributeValue('color');
        // const newOpacity = this._getAttributeValue('opacity');
        // const opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;
        // const getNull = this.props.nullAccessor || this.props.getNull;

        return (
            <path
                d={this.renderArea(data, x, y, y0, curve)}
                className={className}
                transform={`translate(${marginLeft},${marginTop})`}
                onMouseOver={this.handleOnSeriesMouseOver}
                // onMouseOut={this.onSeriesMouseOutHandler}
                // onClick={this.onSeriesClickHandler}
                // onContextMenu={this.onSeriesRightClickHandler}
                // style={{
                //     opacity,
                //     stroke,
                //     strokeDasharray: strokeStyles[strokeStyle] || strokeDasharray,
                //     strokeWidth,
                //     ...style
                // }}
            />
        );
    }

    private renderArea(
        data: IDatum[],
        x: ScaleContinuousNumeric<number, number>,
        y: ScaleContinuousNumeric<number, number>,
        y0: [number, number],
        curve?: string
    ) {
        const l = area<IDatum>()
            .x(d => x(d.x))
            .y0(y0[0])
            .y1(d => y(d.y))
            .curve(curveCardinal);
        return l.call(this, data);
    }
}

const StyledAreaSeries = styled(AreaSeries)`
    fill: #64afaf;
    stroke: teal;
    stroke-width: 2px;
    opacity: 0.75;
    path {
        pointer-events: all;
    }
`;

export default StyledAreaSeries;
