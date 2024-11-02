module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false, // Required for using @babel/eslint-parser without a Babel config file
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021, // Modern JavaScript (ES2021)
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ['react'],
  rules: {
    // Add any custom rules here, or remove the rules block if not needed.
  },
  settings: {
    react: {
      version: 'detect' // Automatically detect the React version
    }
  }
};
