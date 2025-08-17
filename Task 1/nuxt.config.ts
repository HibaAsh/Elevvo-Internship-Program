// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    '~/assets/css/themes.css',
    '~/assets/css/directions.css',

    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  routeRules: {
    '/': { redirect: '/en' },
  },
  
  i18n: {
    locales: [
      { code: 'en', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'ar', name: 'Arabic', dir: 'rtl', file: 'ar.json' }
    ],
    defaultLocale: 'en',
    strategy: "prefix",
    detectBrowserLanguage: false,
  },

  alias: {
    '@i18n': fileURLToPath(new URL('./i18n', import.meta.url)),
    '@icons': '~/assets/icons',
    '@images': '~/assets/images',
  },

  vite: {
    resolve: {
      alias: {
        '@i18n': fileURLToPath(new URL('./i18n', import.meta.url))
      }
    },

    ssr: {
      noExternal: ['vuetify'],
    },

    define: {
      'process.env.DEBUG': false,
    },
  },

  components: [
    { path: '~/components/app', prefix: false },
    { path: '~/components/auth', prefix: false },
    { path: '~/components/products', prefix: false },
  ],
})