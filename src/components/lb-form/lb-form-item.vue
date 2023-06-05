<script setup name="lb-form-item">
import { computed } from "vue";
import { componentMap } from "./componentMap";

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
  schema: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:model"]);

const modelValue = computed({
  get() {
    return props.model[props.schema.field];
  },
  set(val) {
    emit("update:model", val, props.schema.field);
  },
});

const formItemPorp = computed(() => {
  const {
    field,
    label,
    labelWidth,
    required,
    rules,
    error,
    showMessage,
    inlineMessage,
    size,
  } = props.schema;
  return {
    field,
    label,
    labelWidth,
    required,
    rules,
    error,
    showMessage,
    inlineMessage,
    size,
  };
});

const Comp = () => {
  const { component, field } = props.schema;
  return componentMap.get(component);
};

const compPoprs = () => {
  const { componentProps } = props.schema;
  return componentProps;
};
emit("update:model", props.schema.defaultValue, props.schema.field);
// Reflect.has(props.schema, "defaultValue") &&
//   emit("update:model", props.schema.defaultValue, props.schema.field);
</script>

<script>
export default {
  name: "LbFormItem",
};
</script>

<template>
  <el-form-item v-bind="formItemPorp" :prop="schema.field">
    <Comp
      if="!schema.slot"
      v-model="modelValue"
      :is="Comp()"
      v-bind="compPoprs()"
      @change="($event) => emit('update:model', $event, schema.field)"
    />
    <template name="schema.slot" :data="schema"></template>
  </el-form-item>
</template>
