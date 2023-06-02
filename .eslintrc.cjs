module.exports = {
  "extends": [
    "eslint:recommended",
    "airbnb-typescript/base",
    "airbnb-typescript-prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": ["./tsconfig.json"]
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "root": true
}
