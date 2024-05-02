<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: '80px',
  },
  height: {
    type: String,
    default: '80px',
  },
});
</script>

<template>
  <div
    class="logo"
    :style="`
      width: ${width};
      height: ${height};
    `"
  ></div>
</template>

<style scoped>
.logo {
  background-image: url('/img/allocate-logo.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
