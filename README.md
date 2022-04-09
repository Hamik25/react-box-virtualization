# react-box-virtualization

> React component for the optimized rendering of large datasets by custom positioning via virtualization.

React box virtualizer works by only **rendering part** of a large datasets.
1. It reduces the memory footprint by avoiding the over-allocation of DOM nodes.
2. It reduces the CPU load by avoiding calculating custom boxes positions initially.
