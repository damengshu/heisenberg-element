<template>
  <el-date-picker
    v-bind="$attrs"
    v-on="$listeners"
    :value-format="valueFormat"
    type="datetime"
  />
</template>

<script setup name="date-time-picker">
const props = defineProps({
  valueFormat: {
    type: String,
    default: "yyyy-MM-dd HH:mm:ss",
  },
});
</script>

<script>
export default {
  name: "LbDateTimePicker",
};
</script>
