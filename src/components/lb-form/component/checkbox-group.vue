<template>
  <el-checkbox-group v-model="modelValue">
    <el-checkbox v-for="item in options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script setup name="lb-checkbox-group">
import { computed } from "vue";

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const modelValue = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit("input", val);
  },
});

const emit = defineEmits(["input"]);
</script>

<script>
export default {
  name: "LbCheckboxGroup",
};
</script>
