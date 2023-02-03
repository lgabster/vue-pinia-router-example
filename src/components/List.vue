<template>
  <div class="list mb-3">
    <div class="item mb-3" v-for="(item, index) in modelValue" :key="index">
      <div class="text-right mb-n2">
        <button class="btn danger" @click="deleteItem(index)">刪除</button>
      </div>
      <slot :index="index" :item="item" />
    </div>
    <button class="btn secondary" @click="addItem">新增</button>
  </div>
</template>

<script setup>
// import useVModel from '@/composables/use-v-model';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  initItem: {
    type: [Object, Function],
    required: true
  }
});
const emit = defineEmits({
  'update:modelValue': null
});

function addItem() {
  const newItem =
    typeof props.initItem === 'function' ? props.initItem() : props.initItem;
  emit('update:modelValue', [...props.modelValue, { ...newItem }]);
}
function deleteItem(removeIndex) {
  emit(
    'update:modelValue',
    props.modelValue.filter((item, index) => index !== removeIndex)
  );
}
</script>

<style lang="scss" scoped>
.item {
  padding: 1rem;
  border: 1px solid #ced4da;
}
</style>
