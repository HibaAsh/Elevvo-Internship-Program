<template>
  <VContainer>
    <div class="content-wrapper">
      <span class="title">
        {{ $t('title') }}
      </span>
    </div>

    <div class="content-wrapper options-wrapper">
      <NuxtLink to="/register">
       {{ locale === 'en' ? 'Register' : 'تسجيل' }}
      </NuxtLink>
      
      <div class="d-flex ga-4">
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>

    <div v-if="store?.savedData" class="content-wrapper">
      <VCard>
        <VCardTitle>
          {{ locale === 'en' ? store.savedData['fullname-en'] : store.savedData['fullname-ar'] }}
        </VCardTitle>

        <VCardText>
          {{ store.savedData['email'] }}
        </VCardText>
        
        <VCardText>
          {{ store.savedData['subject'] }}
        </VCardText>

        <VCardText>
          {{ locale === 'en' ? store.savedData['address-en'] : store.savedData['address-ar'] }}
        </VCardText>
      </VCard>
    </div>
  </VContainer>
</template>

<script setup>
import { useContactStore } from '@/stores/contact'

const { locale } = useI18n()
const store = useContactStore()
</script>

<style lang="scss" scoped>
.v-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 2rem;

  height: 100%;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 24rem;
  padding: 2rem;

  a {
    text-decoration: none;
    color: rgb(var(--v-theme-main-title));
    font-weight: 600;
    font-size: 1rem;
    padding: .75rem;
  }

  a:hover {
    background-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-surface));
    border-radius: .75rem;
  }

  .v-card {
    width: 100%;
    background: linear-gradient(to right, purple, violet, purple);
    color: rgb(var(--v-theme-main-title));

    .v-card-title,
    .v-card-text {
      text-wrap: wrap;
    }
  }
}

.title {
  font-size: 3rem;
  font-weight: 600;
  color: rgb(var(--v-theme-main-title));
  width: 100%;
  text-align: center;
}

.text {
  font-size: 2rem;
  font-weight: 400;
  color: rgb(var(--v-theme-sub-title));
}

[dir="rtl"] {
  .options-wrapper {
    flex-direction: row-reverse;
  }
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
  .v-container {
    align-items: center;
  }

  .content-wrapper {
    max-width: 100%;
  }

  .title {
    font-size: 2rem;
  }

  .text {
    font-size: 1rem;
  }
}
</style>