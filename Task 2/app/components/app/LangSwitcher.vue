<script setup>
const { locale, locales,  setLocale } = useI18n()
const { setLocaleCustom } = useLocale()

const switchLocalePath = useSwitchLocalePath()

const newLocale = ref(locale.value ? locale.value : 'en')

const getFlagIcon = (locale) => {
  const flags = {
    en: 'twemoji:flag-united-states',
    ar: 'twemoji:flag-syria'
  };
  return flags[locale] || 'twemoji:globe-showing-americas';
}

const onLocaleChanged = async (newLocaleValue) => {
  setLocale(newLocaleValue)
  setLocaleCustom(newLocaleValue)

  locale.value = newLocaleValue
  newLocale.value = newLocaleValue
  navigateTo(switchLocalePath(newLocaleValue))

  // try {
  //   // 1. Get the current path without any existing locale prefix
  //   let cleanPath = route.path
    
  //   // Remove all existing locale prefixes
  //   for (const loc of locales.value) {
  //     const prefix = `/${loc.code}`
  //     if (cleanPath.startsWith(prefix)) {
  //       cleanPath = cleanPath.slice(prefix.length) || '/'
  //       break // Exit after first match
  //     }
  //   }

  //   // 2. Handle special cases
  //   if (cleanPath === '') cleanPath = '/'
    
  //   // 3. Construct the new path
  //   const newPath = newLocale.value === 'en' 
  //     ? cleanPath  // Default locale (no prefix)
  //     : `/${newLocale.value}${cleanPath}`  // Non-default locale (with prefix)

  //   // 4. Update locale and navigate
  //   locale.value = newLocale.value
  //   await navigateTo(newPath)
    
  // } catch (error) {
  //   console.error('Language switch failed:', error)
  // }
}
</script>

<template>
  <v-select
    v-model="newLocale"
    :items="locales"
    item-value="code"
    density="compact"
    variant="plain"
    @update:modelValue="onLocaleChanged"
    hide-details
    class="flag-selector"
  >
    <!-- Selected flag -->
    <template v-slot:selection="{ item }">
      <Icon :name="getFlagIcon(item.value)" />
    </template>

    <!-- Dropdown flags -->
    <template v-slot:item="{ item }">
      <v-list-item class="flag-item" @click="onLocaleChanged(item.value)">
        <Icon :name="getFlagIcon(item.value)" />
      </v-list-item>
    </template>
  </v-select>
</template>

<style scoped lang="scss">
.flag-selector {
  width: 4.5rem; /* Fixed width for closed state */
  background-color: rgb(var(--v-theme-primary));
  border-radius: .75rem;
  padding: .5rem;
  
  /* Remove default padding and styling */
  :deep(.v-field) {
    background: transparent;
    box-shadow: none;
    padding: 0;
    min-height: 0;
    
    .v-field__input {
      padding: 0;
      min-height: 0;

      .iconify {
        width: 2rem;
        height: 1.5rem;
      }
    }
    
    .v-field__append-inner {
      padding: 0;
    }
  }
}

/* Dropdown menu styling */
:deep(.v-overlay__content) {
  min-width: 0 !important;
  background-color: red;

  .v-list {
    padding: 4px 0;
    
    .v-list-item {
      min-height: 32px !important;
      padding: 0 12px !important;
      display: flex;
      justify-content: center;
      align-items: center;
      
      &__content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.flag-item {
  width: fit-content !important;
  max-width: fit-content !important;
  min-width: fit-content !important;

  .iconify {
    width: 2rem;
    height: 1.5rem;
    margin: auto;
  }
}
</style>