<template>
  <el-date-picker
    v-bind="$attrs"
    v-on="$listeners"
    :value-format="valueFormat"
  ></el-date-picker>
</template>

<script setup name="lb-date-picker">
const props = defineProps({
  valueFormat: {
    type: String,
    default: "yyyy-MM-dd",
  },
});
</script>

<script>
export default {
  name: "LbDatePicker",
};
</script>
