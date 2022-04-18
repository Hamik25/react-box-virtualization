import { ICoordinatesMap, ICanvasSize, IRectangle, IPoint } from './types';

// @TODO comment of function role and behavior
// move to helpers and create two functions (keyEncoder - keyDecoder)
function keyGenerator(item: any, coordinatesMap: ICoordinatesMap): string {
    // @TODO need to use more effective serialization/deserialization method like -> msgpack-lite instead of JSON serialization/deserialization
    return JSON.stringify({
        x: { 1: item[coordinatesMap.x], 2: item[coordinatesMap.x] + item[coordinatesMap.width] },
        y: { 1: item[coordinatesMap.y], 2: item[coordinatesMap.y] + item[coordinatesMap.height] }
    });
}

// @TODO comment of function role and behavior
function getCanvasSize(
    item: any,
    coordinatesMap: ICoordinatesMap,
    canvasWidthMax: number,
    canvasHeighthMax: number
): ICanvasSize {
    // @TODO will not work with grouped data think solution
    const itemX2 = item[coordinatesMap.x] + item[coordinatesMap.width];
    if (itemX2 > canvasWidthMax) canvasWidthMax = itemX2;
    const itemY2 = item[coordinatesMap.y] + item[coordinatesMap.height];
    if (itemY2 > canvasHeighthMax) canvasHeighthMax = itemY2;

    return {
        width: canvasWidthMax,
        height: canvasHeighthMax
    };
}

// @TODO comment of function role and behavior
export function iterateData(data: any = [], coordinatesMap: ICoordinatesMap) {
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
}

export function isPointInRectangle({ x1, x2, y1, y2 }: IRectangle, { x, y }: IPoint) {
    return x > x1 && x < x2 && y > y1 && y < y2;
}
