module.exports = {
  root: true, // 当前目录为根目录
  env: {
    node: true, // 在node环境下实行eslint的检测
    'vue/setup-compiler-macros': true, // 关闭它会导致definProps触发eslint错误
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'vue/require-default-prop': 'off',
    'vue/no-v-model-argument': 'off',
  },
}
