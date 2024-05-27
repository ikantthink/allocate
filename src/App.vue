<script setup lang="ts">
import { ref } from 'vue';
const theme = ref('dark');
</script>

<template>
  <link rel="stylesheet" type="text/css" :href="`/css/${theme}.css`" />
  <router-view />
</template>

<style scoped></style>
