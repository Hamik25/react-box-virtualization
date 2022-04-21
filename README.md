# react-box-virtualization

> React component for the optimized rendering of large datasets by custom positioning and
> virtualization.

React box virtualizer works by only **rendering part** of a large datasets.

1. It reduces the memory footprint by avoiding the over-allocation of DOM nodes.
2. It reduces the CPU load by avoiding, calculating positions, and rendering all boxes immediately.

Below you can find a small diagram which is reflected the impact of react box virtualization. <br/>
Only boxes whose coordinates in the viewport are will be rendered.

[![NPM registry](https://img.shields.io/npm/v/react-box-virtualization?style=for-the-badge&color=red)](https://www.npmjs.com/package/react-box-virtualization)
[![License](https://img.shields.io/badge/license-mit-green.svg?style=for-the-badge)](https://github.com/Hamik25/react-box-virtualization/blob/update-readme/LICENSE)

![react-box-virtualization-1](https://user-images.githubusercontent.com/8737693/162615668-6aff5646-1022-4e5d-85f1-a155cbd53f6d.png)

## Install

```bash
# Yarn
yarn add react-box-virtualization

# NPM
npm install --save react-box-virtualization
```

## Usage

1. Import box virtualizer component

```js
import { BoxVirtualizer } from 'react-box-virtualization';
```

2. Create a variable which is responsible for mapping properties from your object to box props

```js
const coordinatesMap = {
    x: 'xVal',
    y: 'yVal',
    width: 'widthVal',
    height: 'heightVal'
};
```

Here is the `interface` of `typescript` for this prop

```js
interface ICoordinatesMap {
    x: string;
    y: string;
    width: string;
    height: string;
    opacity?: string;
    isVisible?: boolean;
    zIndex?: number;
}
```

3. Add `BoxVirtualizer` component to your `JSX` code

```js
<BoxVirtualizer
    coordinatesMap={coordinatesMap}
    data={dataset}
    isVirtualized={true}
    boxGap={20}
    visualizableContent={VisualizableContent}
/>
```

### Supported props of `BoxVirtualizer` component

| Prop name           | Description                                                                                                                    | Type            | Default value | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------- | ------------- | -------- |
| data                | Array of objects                                                                                                               | any[]           | -             | yes      |
| coordinatesMap      | Map object for mapping data item property to CSS visual property                                                               | ICoordinatesMap | -             | yes      |
| visualizableContent | React component which will receive data item object as props                                                                   | React.FC        | -             | yes      |
| isVirtualized       | In case of false value, rendering of boxes will work with a lazy render concept which means each box will be rendered one time | boolean         | true          | no       |
| viewportHeight      | Height of viewport can be all CSS acceptable units for the height property                                                     | string          | '100%'        | no       |
| viewportWidth       | Width of viewport can be all CSS acceptable units for the width property                                                       | string          | '100%'        | no       |
| boxGap              | Gap between boxes can be all CSS acceptable units for the padding property                                                     | number          | 0             | no       |

## Demos

Here's a boxes with random positions and sizes
[Code Sandbox demo](https://codesandbox.io/s/elegant-snowflake-ddtk4z?file=/src/components/VisualizableContent.js)
rendered by lazy render concept. (Dataset size 1.000.000 boxes)<br/> Here's a boxes with grid layout
[Code Sandbox demo](https://codesandbox.io/s/wizardly-germain-5depzp?file=/src/components/VisualizableContent.tsx)
rendered by virtualization concept. (Dataset size 100.000 boxes)

## License

[MIT Licensed](https://github.com/Hamik25/react-box-virtualization/blob/main/LICENSE) © 2022
[Hamik25](https://github.com/Hamik25)
