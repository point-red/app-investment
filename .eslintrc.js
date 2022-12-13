module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    // "@vue/prettier/@typescript-eslint",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/require-default-prop": "off",
    "vue/one-component-per-file": "off",
    "vue/no-reserved-component-names": "off",
    "vue/multi-word-component-names": "off",
    "vue/attributes-order": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "vue/valid-define-emits": "off",
    "vue/no-parsing-error": "off",
    "@typescript-eslint/no-namespace": "off",
  },
};
