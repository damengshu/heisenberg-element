<template>
  <el-cascader
    v-bind="$attrs"
    v-model="modelValue"
    :options="options"
    :loading="loading"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  value: {
    type: [String, Number, Array],
    default: "",
  },
  api: {
    type: Function,
    default: () => {},
  },
  params: {
    type: Object,
    default: () => {},
  },
  labelField: {
    type: String,
    default: "label",
  },
  valueField: {
    type: String,
    default: "value",
  },
  resultField: {
    type: String,
    default: "data",
  },
});

const options = ref(null);
const loading = ref(null);
const modelValue = computed({
  get: () => props.value,
  set: (val) => {
    emit("change", val);
  },
});
const emit = defineEmits(["change"]);

onMounted(async () => {
  loading.value = true;
  const result = await props.api(props.params);
  options.value = result;
  loading.value = false;
});
</script>
