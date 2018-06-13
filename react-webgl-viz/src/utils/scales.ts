import {max, min} from 'd3';

import {scaleLinear,} from 'd3-scale';

export type Range = [number, number];
export type Domain = [number, number];

export interface IDatum {
    x: number;
    y: number;
}

export type DatumSlice = number[];

export type ScaleTypes = 'linear' | 'log';

export interface ILinearScale {
    kind: 'linear';
    readonly data?: DatumSlice;
    range: Range;
    domain?: Domain;
}

export interface ILogScale {
    kind: 'log';
    readonly data?: DatumSlice;
    base: number;
    range: Range;
    domain?: Domain;
}

export type Scale = ILinearScale | ILogScale;

function linearFunc(range: Range, data?: DatumSlice, domain?: Domain) {
    const [domainMin, domainMax] = data ? [min(data)!, max(data)!] : domain!;
    return scaleLinear()
        .domain([domainMin, domainMax])
        .range(range);
}

/**
 * Retrieve a scale function
 * @param type
 * @param domain
 * @param range
 * @param data
 * @returns Scale function.
 */
export function getScaleFunc(s: Scale) {
    switch (s.kind) {
        case 'linear': return linearFunc(s.range, s.data, s.domain);
        case 'log': return linearFunc(s.range, s.data, s.domain);
    }
}