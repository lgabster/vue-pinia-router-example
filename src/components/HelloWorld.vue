<template>
  <div class="hello">
    <p>{{ msg }}</p>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String
  }
});
</script>

<style lang="scss" scoped></style>
