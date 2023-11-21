module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{jsx,js,css,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: '18.2.0' // specify your React version explicitly
    }
  },
  rules: {
    // your rules here
    // ESLint recommended rules
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error',

    // React recommended rules
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',

    // Additional rules you might consider
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'react/prop-types': 'off', // If you don't use prop-types

    // Add your project-specific rules here

    // Example: Allow console statements in development
    no_console: process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
