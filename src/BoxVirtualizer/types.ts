import React from 'react';

export interface ICoordinatesMap {
    x: string;
    y: string;
    width: string;
    height: string;
    opacity?: string;
    // isVisible
    // zIndex
    // ...
}

export interface BoxVirtualizerProps {
    data: any;
    coordinatesMap: ICoordinatesMap;
    visualizableContent: React.FC;
    isVirtualized?: boolean;
    viewportHeight?: string;
    viewportWidth?: string;
    boxGap?: number;
}

export interface BoxProps {
    boxData: any;
    visualizableContent: React.FC;
    gap: number;
}

export interface ICanvasSize {
    width: number;
    height: number;
}

export interface IViewportProps {
    viewportHeight: number;
    viewportWidth: number;
    scrollLeft: number;
    scrollTop: number;
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IRectangle {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export type TimeoutID = { id: number | null };
