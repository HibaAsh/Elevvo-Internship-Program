<template>
  <div>    
    <v-btn @click="toggleTheme" aria-label="Toggle theme">
      <span v-if="theme === 'light'">🌙</span>
      <span v-else>☀️</span>
    </v-btn>
  </div>
</template>

<script setup>
const { theme, toggleTheme } = useTheme()


</script>

<style scoped lang="scss">
.v-btn {
  cursor: pointer;
  font-size: 1.5rem;
  margin-bottom: .25rem;

  padding: .25rem;
  height: fit-content;
  min-width: fit-content;
}
</style>