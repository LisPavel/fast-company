module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        semi: [2, "always"],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "comma-dangle": ["error", "only-multiline"],
        "space-before-function-paren": ["error", { named: "never" }],
        "multiline-ternary": ["off"],
        indent: ["error", 4, { SwitchCase: 1 }],
    },
};
