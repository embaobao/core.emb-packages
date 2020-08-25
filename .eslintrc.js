/*
 * @Author: zhumeng@sensorsdata.cn
 * @Descripttion:
 * @Date: 2020-08-25 09:33:00
 * @LastEditTime: 2020-08-25 09:34:58
 */

const WARN = 'warn';
const OFF = 'off';

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  settings: {
    react: {
      version: '16.8.0',
    },
  },
  rules: {
    'prettier/prettier': WARN,
    'no-console': OFF,
    'no-debugger': OFF,
    'react/prop-types': OFF,
    'react/no-find-dom-node': OFF,
    'react/display-name': OFF,
  },
};
