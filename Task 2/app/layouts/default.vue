<!-- layouts/default.vue -->
<script setup lang="ts">
const { setDirection } = useDirection()
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === 'ar' ? 'rtl' : 'ltr'
  }
})

// Initialize direction
setDirection(locale.value)
</script>

<template>
  <VApp>
    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>

<style lang="scss" scoped>
.v-layout {
  background-size: cover;
  background-image: url('~/assets/images/wallpaper.jpg');
  max-height: 100vh;
}

.v-main {
  width: 100%;
  margin: 5rem auto;
}
</style>