// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const { theme } = useTheme()

  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: theme.value,
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#ee82ee',
            secondary: '#5CBBF6',
            accent: '#005CAF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#F8F7FA',
            surface: '#FAFAFA',
            
            'main-title': '#2F3349',
            'sub-title': '#565656',
          }
        },
        dark: {
          dark: true,
          colors: {
            primary: '#ee82ee',
            secondary: '#424242',
            accent: '#FF4081',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
            background: '#25293C',
            surface: '#2F3349',

            'main-title': '#FFFFFF',
            'sub-title': '#C8C8C8',
          }
        }
      }
    },
    defaults: {
      global: {
        rtl: false, // Default is LTR
      },
    },
  })

  // Watch for theme changes
  watch(theme, (newTheme) => {
    vuetify.theme.global.name.value = newTheme
  })

  nuxtApp.vueApp.use(vuetify)
  
  // Provide vuetify instance
  return {
    provide: {
      vuetify
    }
  }
})