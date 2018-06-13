import * as React from 'react';
import {IDatum} from '../utils/scales';
// type MouseEventHandler = (event: React.MouseEvent<HTMLElement>) => void;

export interface IProps<T> {
    className?: string;
    xDomain: [number, number];
    yDomain: [number, number];
    style?: React.CSSProperties;
    width: number;
    height: number;
    data: IDatum[];
    onValueMouseOver?: (ev: React.MouseEvent<T>) => void; // E -> HTMLCanvasElement
    // onValueMouseOut?: EventHandler;
    // onValueClick?: EventHandler;
    // onValueRightClick?: EventHandler;
    onSeriesMouseOver?: (ev: React.MouseEvent<T>) => void; // E -> HTMLCanvasElement
    // onSeriesMouseOut?: EventHandler;
    // onSeriesClick?: EventHandler;
    // onSeriesRightClick?: EventHandler;
    // onNearestX?: EventHandler;
    // onNearestXY?: EventHandler;
    // animation?: any;
    stack?: boolean;
    strokeDasharray?: string;
    strokeStyle?: string;
    strokeWidth?: string;
    xRange: [number, number];
    yRange: [number, number];
    curve?: string; // smooth
    marginLeft?: number;
    marginTop?: number;
    y0?: [number, number];
}

export interface IDefaultProps {
    className: string;
    marginLeft: number;
    marginTop: number;
    stack: boolean;
    style: React.CSSProperties;
    strokeStyle: string;
}

export type PropsWithDefaults<T> = IProps<T> & IDefaultProps

class BaseSeries<T, P extends IProps<T>> extends React.Component<P> {

    static get requireSVG() {
        return true;
    }

    public static defaultProps: IDefaultProps = {
        className: '',
        marginLeft: 0,
        marginTop: 0,
        stack: false,
        strokeStyle: 'solid',
        style: {},
    };

    protected handleOnSeriesMouseOver = (ev: React.MouseEvent<T>) => {
        const {onSeriesMouseOver} = this.props as PropsWithDefaults<T>;
        if (onSeriesMouseOver) {
            onSeriesMouseOver(ev)
        }
    }
};

export default BaseSeries;