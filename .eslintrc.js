module.exports = {
  extends: ["expo", "prettier"],
  plugins: [
    "prettier",
    "simple-import-sort",
    "import",
    "no-relative-import-paths",
  ],
  rules: {
    "prettier/prettier": "error",
    "simple-import-sort/imports": "off",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { allowSameFolder: false, rootDir: ".", prefix: "@" },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
