<!-- components/app/AppBar.vue -->
<script setup lang="ts">
import logo from '@images/profile.jpg'

const { locale } = useI18n()
const localePath = useLocalePath()

const drawer = ref(false)
const dir = computed(() => locale.value === 'ar' ? 'rtl' : 'ltr')
const isMobile = ref(false)

const routes = [
  { key: 'home', route: '/' },
  { key: 'about', route: '/about' },
  { key: 'contact', route: '/contact' },
  { key: 'products', route: '/products' },
  { key: 'settings', route: '/settings' },
]

onMounted(() => {
  isMobile.value = window.innerWidth < 960
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 960
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    isMobile.value = window.innerWidth < 960
  })
})
</script>

<template>
  <VAppBar :dir="dir">
    <div class="d-flex d-md-none content-wrapper-mobile ga-2 align-center">
      <VAppBarNavIcon 
        variant="text" 
        @click.stop="drawer = !drawer"
      />

      <VAppBarTitle :class="{ 'me-auto border-e pe-4': dir === 'rtl', 'ms-auto border-s ps-4': dir === 'ltr' }">
        <VImg :src="logo" :lazy-src="logo" :alt="locale === 'en' ? 'Unavailable image' : 'الصورة غير متوفرة'" />
        
        <span>Manolia</span>
      </VAppBarTitle>
    </div>

    <div class="d-none d-md-flex content-wrapper">
      <VAppBarTitle :class="{ 'me-auto border-e pe-4': dir === 'ltr', 'ms-auto border-s ps-4': dir === 'rtl' }">
        <VImg :src="logo" :lazy-src="logo" :alt="locale === 'en' ? 'Unavailable image' : 'الصورة غير متوفرة'" />
        
        Manolia
      </VAppBarTitle>

      <VList>
        <VListItem
          v-for="r in routes"
          :key="r.key"
        >
          <NuxtLink
            :to="localePath(r.route)"
            :class="{ 'me-auto border-e pe-10': ((dir === 'rtl') && (r.key === 'login')), 'ms-auto border-s ps-10': ((dir === 'ltr') && (r.key === 'login')) }"
          >
            {{ $t(`routes.${r.key}`) }}
          </NuxtLink>
        </VListItem>
      </VList>
    </div>
    
    <div class="switcher-wrapper">
      <theme-switcher />
      <lang-switcher />
    </div>
  </VAppBar>

  <ClientOnly>
    <VNavigationDrawer
      v-model="drawer"
      temporary
      location="top"
      class="d-md-none"
    >
      <VList class="mobile-list">
        <VListItem
          v-for="r in routes"
          :key="r.key"
          :to="localePath(r.route)"
          :title="$t(`routes.${r.key}`)"
        />
      </VList>
    </VNavigationDrawer>
  </ClientOnly>
</template>

<style scoped lang="scss">
.v-app-bar {
  :deep(.v-toolbar__content) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 2rem;

    // display: grid;
    // grid-template-columns: auto 1fr auto;
    // align-items: center;
    // padding-inline: 1rem;
    // gap: 1rem;
  }

  [dir="rtl"] {
    flex-direction: row-reverse;
  }

  .v-app-bar-title {
    max-width: fit-content;

    :deep(.v-toolbar-title__placeholder) {
      display: flex;
      align-items: center;
      gap: 1rem;
  
      .v-img {
        border-radius: 50%;
        width: 3.25rem;
        // height: 3rem;
      }
    }
  }

  .content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .v-list-item:hover {
      background-color: rgb(var(--v-theme-background));
      border-radius: .75rem !important;
    }
  }

  .switcher-wrapper {
    display: flex;
    align-items: center;
    gap: .5rem;
  }
}

.v-list {
  display: flex;
  gap: 0.5rem;
  background: none;

  .v-list-item {
    // padding: 0;
    
    a {
      text-decoration: none;
      color: rgb(var(--v-theme-text-primary));
      // padding: 0.5rem;
      display: block;
    }
  }
}

/* RTL support */
[dir="rtl"] {
  text-align: right;

  .v-list,
  .content-wrapper,
  .content-wrapper-mobile,
  .switcher-wrapper,
  :deep(.v-toolbar__content) {
    flex-direction: row-reverse;
  }
}

.content-wrapper-mobile {
  @media screen and (max-width: 450px) {
    span {
      display: none;
    }

    .v-img {
      width: 3rem !important;
    }
  }
}

/* Mobile drawer styles */
.v-navigation-drawer--top {
  height: auto !important;
  max-height: 70vh;
  
  .v-list {
    flex-direction: column;
    gap: 0;
    
    .v-list-item {
      padding-inline-start: 1rem;
    }
  }
}

@media screen and (max-width: 960px) {
  .v-app-bar {
    :deep(.v-toolbar__content) {
      padding: 1rem;
    }
  }

  .v-navigation-drawer {
    padding-inline: .5rem;

    // .v-list {
    //   margin-top: .5rem;
    // }

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
  }

  .switcher-wrapper {
    display: flex;
    align-items: center;
    gap: .5rem;

    margin-inline-start: 1rem;
  }
}
</style>