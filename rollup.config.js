import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            exports: 'named',
            sourcemap: true,
            name: 'react-box-virtualization'
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true
        }
    ],
    plugins: [
        external(),
        url(),
        resolve(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true
        }),
        commonjs()
    ]
};
