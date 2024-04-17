# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available for Fast Refresh:

- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses
  [Babel](https://babeljs.io/) under the hood. This plugin supports both JSX and TSX files.
- [`@vitejs/plugin-react-swc`](https://github.com/vitejs/vite-plugin-react-swc) uses
  [SWC](https://swc.rs/) which is a super-fast compiler written in Rust. This plugin only supports JSX files.

Please note that if you're using TypeScript, you still need to install `@babel/preset-typescript` to enable
TypeScript support with Babel.

Also, if you're using both `react-hot-loader` and one of the Fast Refresh plugins, you need to
configure `react-hot-loader` to use the correct plugin for Fast Refresh. Check the documentation of each
plugin for more information.

