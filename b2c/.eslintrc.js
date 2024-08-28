module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // extends: [
  //   'eslint:recommended',
  //   'plugin:@typescript-eslint/recommended',
  //   'plugin:prettier/recommended'
  // ],
  // rules: {
  //   'prettier/prettier': 'error'
  // },
  ignorePatterns: ['**/*.js'],
  overrides: [
    {
      files: ['*.ts'],
      excludedFiles: ['./cypress/**/*.ts'],
      parserOptions: {
        project: ['tsconfig.*?.json'],
        createDefaultProgram: true,
      },
      plugins: ['rxjs', 'import'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:prettier/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:import/recommended',
      ],
      rules: {
        'rxjs/no-async-subscribe': 'error',
        'rxjs/no-ignored-observable': 'error',
        'rxjs/no-nested-subscribe': 'error',
        'rxjs/no-unbound-methods': 'error',
        'rxjs/throw-error': 'error',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public',
          },
        ],
        'no-console': [
          'error',
          {
            allow: ['warn', 'error', 'log'],
          },
        ],
        'no-debugger': 'error',
        'import/named': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        '@angular-eslint/template/banana-in-box': ['error'],
        '@angular-eslint/template/no-any': ['warn'],
        '@angular-eslint/template/no-autofocus': ['error'],
        '@angular-eslint/template/no-distracting-elements': ['error'],
        '@angular-eslint/template/conditional-complexity': ['error'],
        '@angular-eslint/template/eqeqeq': 'off',
      },
    },
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            parser: 'angular',
          },
        ],
      },
    },
  ],
};
