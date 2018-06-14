export enum Orientation {
    Bottom = 'BOTTOM',
    Left = 'LEFT',
    Top = 'UP',
    Right = 'RIGHT',
    Vertical = 'VERTICAL',
    Horizontal = 'HORIZONTAL'
}

export enum Direction {
    Vertical = 'VERTICAL',
    Horizontal = 'HORIZONTAL'
}

export enum TitlePosition {
    End = 'END',
    Middle = 'MIDDLE',
    Start = 'START'
}

/**
 * Get total amount of ticks from a given size in pixels.
 * @param Size of the axis in pixels.
 * @returns Total amount of ticks.
 */
export const ticksTotalFromSize = (size: number) => {
    if (size < 700) {
        if (size > 300) {
            return 10;
        }
        return 5;
    }
    return 20;
};
