// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    pnpm: true,
    rules: {
      'pnpm/json-enforce-catalog': 'off',
      'vue/component-tags-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
)
