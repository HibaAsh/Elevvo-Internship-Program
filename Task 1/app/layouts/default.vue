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
    <AppBar />
    
    <VMain>
      <slot />
    </VMain>
    
    <Footer />
  </VApp>
</template>

<style lang="scss" scoped>
.v-main {
  width: 95%;
  margin: 5rem auto;
}
</style>