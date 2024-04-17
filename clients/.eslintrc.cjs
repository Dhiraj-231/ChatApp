/**
 * Root level eslint config for the clientside codebase
 * Extends recommended eslint configs for React and React hooks
 * Disables the "target='_blank'" eslint rule and enables the "react-refresh/only-export-components" rule
 */
module.exports = {
  // Set root to true so this config doesn't get merged with any other configs
  root: true,

  // Enable browser and es2020 parser options so we can lint modern JavaScript
  env: { browser: true, es2020: true },

  // Extend recommended configs from the eslint:recommended, plugin:react/recommended, and plugin:react-hooks/recommended plugins
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],

  // Ignore dist and this config file in linting
  ignorePatterns: ['dist', '.eslintrc.cjs'],

  // Set the JavaScript parser to use the latest version and source type to module for module imports/exports
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },

  // Set the React version to v18.2 for linting
  settings: { react: { version: '18.2' } },

  // Enable the react-refresh/only-export-components rule
  plugins: ['react-refresh'],

  // Set eslint rules for the codebase
  rules: {
    // Disable the "target='_blank'" eslint rule
    'react/jsx-no-target-blank': 'off',
    // Enable the "react-refresh/only-export-components" rule with the "allowConstantExport" option set to true
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

