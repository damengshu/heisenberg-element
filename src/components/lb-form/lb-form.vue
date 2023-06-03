<script setup>
import Vue, { reactive, ref, onMounted, watch } from "vue";
import LbFormItem from "./lb-form-item.vue";
import { isFunction, isArray } from "../../util/is";

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
  schemas: {
    type: Array,
    default: () => [],
  },
  baseColProps: {
    type: Object,
  },
});

const modelValue = reactive({});
const fromRef = ref();
const propsRef = ref();
const emit = defineEmits(["register"]);

const setModel = (val, field) => {
  Vue.set(modelValue, field, val);
};

const getBseColProps = (schema) => {
  const { colProps } = schema;
  const baseColProps = {
    ...props.baseColProps,
    ...colProps,
  };
  return baseColProps;
};

const setProps = (props) => {
  propsRef.value = Object.assign({}, propsRef.value, props);
};

const validate = () => {
  return new Promise((resolve, reject) => {
    fromRef.value.validate((valid) => {
      if (valid) {
        resolve(modelValue);
      } else {
        reject();
      }
    });
  });
};

/**
 *
 * @param {Function(props: array | string, callback: Function(errorMessage: string))} prop
 */
const validateField = (prop) => {
  return new Promise((resolve, reject) => {
    fromRef.value.validateField(prop, (errorMessage) => {
      if (errorMessage) {
        reject(errorMessage);
      } else {
        resolve(modelValue.prop);
      }
    });
  });
};

const resetFields = () => {
  fromRef.value.resetFields();
};

/**
 *
 * @param {Function(props: array | string)} props
 */
const clearValidate = (props) => {
  fromRef.value.clearValidate(props);
};

const setFieldsValue = (model) => {
  Object.keys(model).forEach((key) => {
    setModel(model[key], key);
  });
};

const updateSchema = (schema, insertionIndex) => {
  const schemas = propsRef.value.schemas;
  if (!isArray(schema)) {
    const index = schemas.findIndex((item) => item.field === schema.field);
    if (index > -1) {
      schemas.splice(index, 1, schema);
    } else {
      console.log(index);
      schemas.splice(insertionIndex, 0, schema);
    }
  } else {
    schemas.splice(insertionIndex, 0, ...schema);
  }
};

const submit = async (fun) => {
  if (isFunction(fun)) {
    const res = await validate();
    fun(res);
  } else {
    return await validate();
  }
};

const formAction = {
  submit,
  setModel,
  validate,
  validateField,
  resetFields,
  clearValidate,
  setProps,
  updateSchema,
  setFieldsValue,
};

onMounted(() => {
  emit("register", formAction);
});

watch(
  () => props,
  (val) => {
    setProps(val);
  },
  {
    immediate: true,
  }
);

defineExpose(formAction);
</script>

<template>
  <el-form
    ref="fromRef"
    :model="modelValue"
    v-bind="$attrs"
    label-position="right"
    label-width="150px"
  >
    <el-row v-if="propsRef">
      <el-col
        v-for="schema in propsRef.schemas"
        :key="schema.prop"
        v-bind="getBseColProps(schema)"
      >
        <LbFormItem
          v-bind="schema"
          :schema="schema"
          :model="modelValue"
          @update:model="setModel"
        />
      </el-col>
    </el-row>
  </el-form>
</template>
