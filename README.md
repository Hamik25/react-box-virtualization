# react-box-virtualization

> React component for the optimized rendering of large datasets by custom positioning via virtualization.

React box virtualizer works by only **rendering part** of a large datasets.
1. It reduces the memory footprint by avoiding the over-allocation of DOM nodes.
2. It reduces the CPU load by avoiding calculating custom boxes positions initially.

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

## Demo
Here's a [Code Sandbox demo](https://codesandbox.io/s/musing-saha-tcl5od).

## License

MIT © [Hamik25](https://github.com/Hamik25)
