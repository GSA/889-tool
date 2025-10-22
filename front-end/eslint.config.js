import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import vueAccessibility from 'eslint-plugin-vuejs-accessibility'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true,
        node: true
      }
    },
    plugins: {
      'vuejs-accessibility': vueAccessibility
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vuejs-accessibility/label-has-for': [
        'error',
        {
          required: {
            some: ['id']
          }
        }
      ]
    }
  },
  prettier
]