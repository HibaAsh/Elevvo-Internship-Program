<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script setup>
const locale = useLocale()

useHead({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === 'ar' ? 'rtl' : 'ltr'
  }
})

// Watch for locale changes
watch(locale, (newLocale) => {
  const isRTL = newLocale === 'ar'
  
  // Update HTML attributes
  if (process.client) {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = newLocale
  }
}, { immediate: true })

onMounted(() => {
  // Make page visible after hydration to prevent theme flash
  document.documentElement.classList.add('visible')
})
</script>

<style lang="scss">
.v-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
}

.title {
  font-size: 4rem;
  font-weight: 600;
  color: rgb(var(--v-theme-main-title));
}

.text {
  font-size: 2rem;
  font-weight: 400;
  color: rgb(var(--v-theme-sub-title));
}


@media screen and (max-width: 960px) {
  .title {
    font-size: 3rem;
  }

  .text {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 600px) {
  .title {
    font-size: 2rem;
  }

  .text {
    font-size: 1rem;
  }
}
</style>