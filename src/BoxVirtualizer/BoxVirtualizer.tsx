import React, { useState, useEffect, useMemo, useRef, memo, FC, ReactElement } from 'react';

import { BoxVirtualizerProps, TimeoutID, IScrollToOptions } from './types';

import Box from './Box';
import { iterateData } from './utils';
import { cancelTimeout, requestTimeout } from './timer';
import { useInViewportArea } from './UseInViewportArea';

// @TODO add scroll to vertical and horizontal positions
const BoxVirtualizer: FC<BoxVirtualizerProps> = ({
    data,
    coordinatesMap,
    visualizableContent,
    isVirtualized = true,
    viewportHeight = '100%',
    viewportWidth = '100%',
    boxGap = 0,
    leftScrollPos,
    topScrollPos
}: BoxVirtualizerProps): ReactElement => {
    const scrollTimerIdRef: React.MutableRefObject<TimeoutID> = useRef({ id: null });
    const viewportRef: any = useRef(null);

    const [inViewportBoxes, setInViewportBoxes] = useState<any[]>([]);

    const { selectNeedfulBoxes } = useInViewportArea(isVirtualized);

    const { canvasSize, hashTable } = useMemo(() => iterateData(data, coordinatesMap), [data]);

    function onScroll({ currentTarget }: React.UIEvent<HTMLDivElement>): void {
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

    function scrollToCustomPositionsHandler(x: number | undefined, y: number | undefined): void {
        let options: IScrollToOptions = {
            behavior: 'auto'
        };

        if (Number.isInteger(x)) {
            options.left = x;
        }

        if (Number.isInteger(y)) {
            options.top = y;
        }

        viewportRef.current.scrollTo(options);
    }

    function init(): void {
        const selectResult = selectNeedfulBoxes(hashTable, {
            viewportHeight: viewportRef.current?.offsetHeight,
            viewportWidth: viewportRef.current?.offsetWidth,
            scrollLeft: viewportRef.current?.scrollLeft,
            scrollTop: viewportRef.current?.scrollTop
        });

        setInViewportBoxes(selectResult);
    }

    useEffect(init, [hashTable]);

    useEffect(() => {
        scrollToCustomPositionsHandler(leftScrollPos, topScrollPos);
    }, [leftScrollPos, topScrollPos]);

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
