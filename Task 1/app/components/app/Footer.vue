<!-- components/app/Footer.vue -->
<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <VFooter class="mt-12">
    <VContainer>
      <VRow class="w-100">
        <VCol cols="12" sm="6">
          <h3 class="text-h5 mb-4">
            {{ $t('quick-access') }}
          </h3>
          <VList density="compact">
            <VListItem
              v-for="link in [
                { title: $t('routes.home'), to: '/' },
                { title: $t('routes.about'), to: '/about' },
                { title: $t('routes.contact'), to: '/contact' },
                { title: $t('routes.products'), to: '/products' },
                { title: $t('routes.settings'), to: '/settings' },
              ]"
              :key="link.to"
              :to="localePath(link.to)"
              :title="link.title"
            />
          </VList>
        </VCol>

        <VCol cols="12" sm="6">
          <h3 class="text-h5 mb-4">
            {{ $t('routes.contact') }}
          </h3>
          <VList density="compact">
            <VListItem
              prepend-icon="mdi-email"
              title="hibashakoof@gmail.com"
            />
            <VListItem
              prepend-icon="mdi-phone"
              title="+963 *** *** ***"
            />
            <VListItem
              prepend-icon="mdi-map-marker"
              :title="$t('location')"
            />
          </VList>
        </VCol>
      </VRow>

      <VDivider class="my-4" />

      <div class="text-center">
        &copy; {{ new Date().getFullYear() }} {{ $t('my-name') }}. {{ $t('my-rights') }}
      </div>
    </VContainer>
  </VFooter>
</template>

<style scoped lang="scss">
.v-footer {
  flex: 0 0 auto;
}

.v-list {
  margin-top: .5rem;
}

.v-list-item {
  margin-inline: .25rem;
  border-radius: .75rem !important;
}

.v-list-item--active {
  background-color: rgba(var(--v-theme-primary), .125);
  
  :deep(.v-list-item-title) {
    color: rgb(var(--v-theme-primary));
    font-weight: 600;
  }
}
</style>