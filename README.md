# react-box-virtualization

> React component for the optimized rendering of large datasets by custom positioning and virtualization.

React box virtualizer works by only **rendering part** of a large datasets.
1. It reduces the memory footprint by avoiding the over-allocation of DOM nodes.
2. It reduces the CPU load by avoiding, calculating positions, and rendering all boxes immediately.

Below you can find a small diagram which is reflected the impact of react box virtualization. <br/>
Only boxes whose coordinates are in the viewport are will be rendered.

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
<BoxVirtualizer coordinatesMap={coordinatesMap} 
                data={dataset}
                isVirtualized={true}
                boxGap={20}
                visualizableContent={VisualizableContent}/>
```

### Supported props of `BoxVirtualizer` component

| Prop name | Description | Type | Default value | Required |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| data | Text | any | - | yes |
| coordinatesMap | Text | ICoordinatesMap | - | yes |
| visualizableContent | Text | React.FC | - | yes |
| isVirtualized | Text | boolean | true | no |
| viewportHeight | Text | string | '100%' | no |
| viewportWidth | Text | string | '100%' | no |
| boxGap | Text | number | 0 | no |

## Demos
Here's a boxes with random positions and sizes [Code Sandbox demo](https://codesandbox.io/s/musing-saha-tcl5od) rendered by lazy render concept.<br/>
Here's a boxes with grid layout [Code Sandbox demo](https://codesandbox.io/s/musing-saha-tcl5od) rendered by virtualization concept.

## License

[MIT Licensed](https://github.com/Hamik25/react-box-virtualization/blob/main/LICENSE) © 2022 [Hamik25](https://github.com/Hamik25)
