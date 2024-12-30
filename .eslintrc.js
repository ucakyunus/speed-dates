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
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports
          ["^\\u0000"],
          // React and React Native imports always at the top
          ["^react$", "^react-native$"],
          // Other React and React Native related packages
          ["^@react", "^react", "react-native"],
          // Expo imports
          ["^expo", "^@expo"],
          // Other external packages
          ["^@?\\w"],
          // Internal imports starting with @
          ["^@/"],
          // Other internal imports
          ["^[./]"],
          // Style and asset imports
          ["^.+\\.(css|sass|scss|less|png|jpg|ttf|woff|woff2)$"],
        ],
      },
    ],
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
