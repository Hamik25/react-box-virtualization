import { useState } from 'react';

import { IPoint, IRectangle } from './types';

function isPointInRectangle({ x1, x2, y1, y2 }: IRectangle, { x, y }: IPoint) {
    return x > x1 && x < x2 && y > y1 && y < y2;
}

export function useInViewportArea(isVirtualized: boolean) {
    const [matchedBoxes, setMatchedBoxes] = useState<any[]>([]);
    const [inViewportBoxKeysCache, setInViewportBoxKeysCache] = useState<any>(new Map());

    function selectNeedfulBoxes(data: any, viewportProps: any) {
        let result = isVirtualized ? [] : [...matchedBoxes];

        const viewportRectangleCoordinates: IRectangle = {
            x1: viewportProps.scrollLeft,
            x2: viewportProps.scrollLeft + viewportProps.viewportWidth,
            y1: viewportProps.scrollTop,
            y2: viewportProps.scrollTop + viewportProps.viewportHeight
        };

        for (let [key, value] of data) {
            const boxCoordinates: any = JSON.parse(key);

            const LTP: IPoint = { x: boxCoordinates.x[1], y: boxCoordinates.y[1] };
            const LBP: IPoint = { x: boxCoordinates.x[1], y: boxCoordinates.y[2] };
            const RTP: IPoint = { x: boxCoordinates.x[2], y: boxCoordinates.y[1] };
            const RBP: IPoint = { x: boxCoordinates.x[2], y: boxCoordinates.y[2] };

            if (
                (isPointInRectangle(viewportRectangleCoordinates, LTP) ||
                    isPointInRectangle(viewportRectangleCoordinates, LBP) ||
                    isPointInRectangle(viewportRectangleCoordinates, RTP) ||
                    isPointInRectangle(viewportRectangleCoordinates, RBP)) &&
                !inViewportBoxKeysCache.has(key)
            ) {
                result = [...result, value];
                setMatchedBoxes(result);

                if (!isVirtualized) {
                    setInViewportBoxKeysCache((prev: any) => new Map([...prev, [key, data]]));
                }
            }
        }

        return result;
    }

    return { selectNeedfulBoxes };
}
