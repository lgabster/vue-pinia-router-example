<template>
  <input type="number" v-model="value" />
  <!-- <input
    type="number"
    :value="modelValue"
    @input="$emit('update:modelValue', Number($event.target.value))"
  /> -->
</template>

<script setup>
import useVModel from '@/composables/use-v-model';

defineProps({
  modelValue: {
    type: Number,
    required: false
  }
});
defineEmits({
  'update:modelValue': null
});

// const value = useVModel('modelValue', value => Number(value));
const value = useVModel.number('modelValue');
</script>

<style lang="scss" scoped></style>
