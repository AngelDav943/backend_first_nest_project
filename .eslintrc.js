module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    ignorePatterns: ['.eslintrc.js', 'node_modules/**/*', 'dist/**/*'],
    plugins: ['@typescript-eslint/eslint-plugin', 'jsdoc'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:jsdoc/recommended-typescript',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'jsdoc/check-syntax': 'error',
        'jsdoc/require-jsdoc': [
            'error',
            {
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: true,
                    ClassDeclaration: true,
                    ArrowFunctionExpression: false,
                    FunctionExpression: true,
                },
                checkConstructors: false,
            },
        ],
    },
};
