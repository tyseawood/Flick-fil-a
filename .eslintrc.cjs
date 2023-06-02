module.exports = {
  "root": true,
  "plugins": ["@typescript-eslint", "import", "prettier"],
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
    "tsconfigRootDir": __dirname,
    "project": ["./tsconfig.json"],
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
}
