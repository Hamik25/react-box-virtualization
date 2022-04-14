import React, { memo, FC, ReactElement } from 'react';

import { BoxProps } from './types';

const Box: FC<BoxProps> = ({
    boxData,
    coordinatesMap,
    visualizableContent: Component,
    gap
}: BoxProps): ReactElement => {
    return (
        <div
            style={{
                position: 'absolute',
                boxSizing: 'border-box',
                padding: `${gap}px`,
                left: `${boxData[coordinatesMap.x]}px`,
                top: `${boxData[coordinatesMap.y]}px`,
                width: `${boxData[coordinatesMap.width]}px`,
                height: `${boxData[coordinatesMap.height]}px`,
                opacity: `${coordinatesMap.opacity ? boxData[coordinatesMap.opacity] : 1}`
            }}
        >
            <Component {...boxData} />
        </div>
    );
};

Box.displayName = 'Box';

export default memo(Box);
