<template>
  <el-radio-group v-model="modelValue">
    <el-radio v-for="item in options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>
<script setup name="lb-radio-group">
import { computed } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
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
  name: "LbRadioGroup",
};
</script>
