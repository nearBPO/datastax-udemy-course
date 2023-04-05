<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue';
import MainTable from '@/components/MainTable.vue';

</script>

<template>
  <MainNavbar/>
  <div class="m-4">
    <MainTable/>
  </div>
</template>

<style>
a {
  text-decoration: none;
}

body {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
