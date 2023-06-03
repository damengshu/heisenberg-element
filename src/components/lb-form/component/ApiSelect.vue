<template>
  <el-select v-bind="$attrs" :loading="loading" v-model="modelValue">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item[props.labelField]"
      :value="item[props.valueField]"
    >
    </el-option>
  </el-select>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { isArray } from "../../../util/is";

const props = defineProps({
  value: {
    type: [String, Number],
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

const options = ref();
const loading = ref();
const modelValue = computed({
  get: () => props.value,
  set: (val) => {
    emit("change", val);
  },
});

onMounted(async () => {
  loading.value = true;
  const result = await props.api(props.params);
  options.value = isArray(result) ? result : result[props.resultField];
  loading.value = false;
});

const emit = defineEmits(["change"]);
</script>
