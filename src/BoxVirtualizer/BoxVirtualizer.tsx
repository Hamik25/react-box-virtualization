import React, { useState, useEffect, useMemo, useRef, memo, FC, ReactElement } from 'react';
import Box from './Box';
import { cancelTimeout, requestTimeout } from './timer';
import { useInViewportArea } from './UseInViewportArea';

import { BoxVirtualizerProps, ICoordinatesMap, ICanvasSize, TimeoutID } from './types';

// @TODO comment of function role and behavior
// move to helpers and create two functions (keyEncoder - keyDecoder)
const keyGenerator = (item: any, coordinatesMap: ICoordinatesMap): string => {
    // @TODO need to use more effective serialization/deserialization method like -> msgpack-lite instead of JSON serialization/deserialization
    return JSON.stringify({
        x: { 1: item[coordinatesMap.x], 2: item[coordinatesMap.x] + item[coordinatesMap.width] },
        y: { 1: item[coordinatesMap.y], 2: item[coordinatesMap.y] + item[coordinatesMap.height] }
    });
};

// @TODO comment of function role and behavior
const getCanvasSize = (
    item: any,
    coordinatesMap: ICoordinatesMap,
    canvasWidthMax: number,
    canvasHeighthMax: number
): ICanvasSize => {
    // @TODO will not work with grouped data think solution
    const itemX2 = item[coordinatesMap.x] + item[coordinatesMap.width];
    if (itemX2 > canvasWidthMax) canvasWidthMax = itemX2;
    const itemY2 = item[coordinatesMap.y] + item[coordinatesMap.height];
    if (itemY2 > canvasHeighthMax) canvasHeighthMax = itemY2;

    return {
        width: canvasWidthMax,
        height: canvasHeighthMax
    };
};

// @TODO comment of function role and behavior
const iterateData = (data: any = [], coordinatesMap: ICoordinatesMap) => {
    let canvasSize: ICanvasSize = {
        width: 0,
        height: 0
    };

    const hashTable = new Map();

    data.forEach((item: any) => {
        hashTable.set(keyGenerator(item, coordinatesMap), item);
        canvasSize = getCanvasSize(item, coordinatesMap, canvasSize.width, canvasSize.height);
    });

    return {
        canvasSize,
        hashTable
    };
};

// @TODO add scroll to vertical and horizontal positions
const BoxVirtualizer: FC<BoxVirtualizerProps> = ({
    data,
    coordinatesMap,
    visualizableContent,
    isVirtualized = true,
    viewportHeight = '100%',
    viewportWidth = '100%',
    boxGap = 0
}: BoxVirtualizerProps): ReactElement => {
    const scrollTimerIdRef: React.MutableRefObject<TimeoutID> = useRef({ id: null });
    const viewportRef: any = useRef(null);

    const [inViewportBoxes, setInViewportBoxes] = useState<any[]>([]);

    const { selectNeedfulBoxes } = useInViewportArea(isVirtualized);

    const { canvasSize, hashTable } = useMemo(() => iterateData(data, coordinatesMap), [data]);

    function onScroll({ currentTarget }: React.UIEvent<HTMLDivElement>) {
        if (scrollTimerIdRef.current.id !== null) {
            cancelTimeout(scrollTimerIdRef.current);
        }

        scrollTimerIdRef.current = requestTimeout(() => {
            const selectResult = selectNeedfulBoxes(hashTable, {
                viewportHeight: currentTarget?.clientHeight,
                viewportWidth: currentTarget?.clientWidth,
                scrollLeft: currentTarget?.scrollLeft,
                scrollTop: currentTarget?.scrollTop
            });

            setInViewportBoxes(selectResult);
        }, 150);
    }

    function init() {
        const selectResult = selectNeedfulBoxes(hashTable, {
            viewportHeight: viewportRef.current?.offsetHeight,
            viewportWidth: viewportRef.current?.offsetWidth,
            scrollLeft: viewportRef.current?.scrollLeft,
            scrollTop: viewportRef.current?.scrollTop
        });

        setInViewportBoxes(selectResult);
    }

    useEffect(init, [hashTable]);

    return (
        <div
            ref={viewportRef}
            style={{
                width: viewportWidth,
                height: viewportHeight,
                overflow: 'auto',
                position: 'relative'
            }}
            onScroll={onScroll}
        >
            {/* viewport */}
            <div
                style={{
                    width: `${canvasSize.width}px`,
                    height: `${canvasSize.height}px`,
                    position: 'relative'
                }}
            >
                {/* canvas */}
                {inViewportBoxes.map((box: any, index: number) => {
                    return (
                        <Box
                            key={index}
                            boxData={box}
                            gap={boxGap}
                            coordinatesMap={coordinatesMap}
                            visualizableContent={visualizableContent}
                        />
                    );
                })}
            </div>
        </div>
    );
};

BoxVirtualizer.displayName = 'BoxVirtualizer';

export default memo(BoxVirtualizer);
