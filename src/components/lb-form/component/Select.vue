<template>
  <el-select v-model="modelValue">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  value: {
    type: [String, Number],
    default: "",
  },
});

const modelValue = computed({
  get: () => props.value,
  set: (val) => {
    emit("change", val);
  },
});

const emit = defineEmits(["change"]);
</script>
