<template>
  <VContainer>
    <span class="title">
      {{ $t('title') }}
    </span>

    <span class="text">
      {{ $t('routes.products') }}
    </span>
  </VContainer>
</template>

<style lang="scss" scoped>
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