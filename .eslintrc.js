module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js", "jest.config.ts"],
  rules: {
    "quotes": ["error", "double", {"avoidEscape": true}],
    "no-console": "error",
    "no-duplicate-imports": ["error", {"includeExports": true}],
    "no-promise-executor-return": "error",
    "require-atomic-updates": "error",
    "no-use-before-define": ["error", {"functions": false}],
    "no-constant-binary-expression": "error",
    "block-scoped-var": "error",
    "no-return-await": "error",
    "require-await": "error",
    "func-names": "off",
    "curly": ["error", "multi-or-nest"],
    "eqeqeq": "error",
    "id-length": ["error", {"exceptions": ["i"]}],
    "arrow-spacing": "error",
    "arrow-parens": ["error","as-needed"],
    "array-bracket-newline": "error",
    "array-element-newline": ["error", "consistent"],
    "no-multi-spaces": "error",
    "no-trailing-spaces": "error",
    "no-whitespace-before-property": "error",
    "object-curly-spacing": ["error", "always"],
    "object-curly-newline": ["error", {"consistent":true}],
    "object-property-newline": ["error", {"allowMultiplePropertiesPerLine": true}],
    "semi": ["error","always"],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "semi-style": ["error", "last"],
    "@typescript-eslint/array-type": [
      "error",
      {
        "default": "array",
        "readonly": "array"
      }
    ],
    "@typescript-eslint/consistent-generic-constructors": ["error","constructor"],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": ["error", {"allow": ["private-constructors"]}],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I"]
      },
      {
        "selector": ["class", "typeAlias"],
        "format": ["PascalCase"]
      },
      {
        "selector": "classProperty",
        "format": ["camelCase"],
        "modifiers": ["private"],
        "trailingUnderscore": "require"
      },
      {
        "selector": "classProperty",
        "format": ["camelCase"],
        "modifiers": ["private", "static"],
        "trailingUnderscore": "forbid"
      },
      {
        "selector": "classProperty",
        "format": ["camelCase"],
        "modifiers": ["public", "static"],
        "trailingUnderscore": "forbid"
      },
      {
        "selector": "classProperty",
        "format": ["camelCase"],
        "modifiers": ["public", "protected"],
        "trailingUnderscore": "forbid"
      },
      {
        "selector": "classMethod",
        "format": ["camelCase"]
      },
      {
        "selector": ["enum", "enumMember"],
        "format": ["PascalCase"]
      }
    ],
    "@typescript-eslint/method-signature-style": ["error", "method"]
  }
};
