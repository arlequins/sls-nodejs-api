module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'eslint-config-prettier',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'sonarjs',
    'eslint-plugin-prettier',
  ],
  rules: {
    'import/prefer-default-export': 0,
    'no-promise-executor-return': 0,
    'import/extensions': 0,
    'prettier/prettier': 1,
    'prefer-destructuring': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'sonarjs/prefer-immediate-return': 0,
    'no-shadow': 0,
    'sonarjs/no-duplicate-string': 0,
    'no-case-declarations': 0,
    'new-cap': 0,
    '@typescript-eslint/no-var-requires': 0,
    'no-return-await': 0, // for sonarjs
    'no-continue': 0,
    'import/no-cycle': 0,
    'sonarjs/cognitive-complexity': 0, // care this problem in sonarcube
    'no-restricted-imports': [
      1,
      {
        patterns: [
          {
            group: [
              '../*',
              '!@libs/*',
              '!@functions/*',
              '!@settings/*',
              '!@typing/*',
              '!@constants/*',
              '!@test/*',
            ],
            message:
              'relative path is deprecated, except the alias path @libs/*, @functions/* or @settings/* or @typing/* or @constants/* or @test/*',
          },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
};
