<script setup name="lb-form">
import Vue, { reactive, ref, onMounted, watch, isRef, watchEffect } from "vue";
import LbFormItem from "./lb-form-item.vue";
import { isFunction, isArray, isBoolean } from "../../util/is";

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
  rules: {
    type: Object,
  },
  labelPosition: {
    type: String,
    default: "right",
  },
  labelWidth: {
    type: String,
    default: "100px",
  },
  inline: {
    type: Boolean,
    default: false,
  },
  labelSuffix: {
    type: String,
    default: "",
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
  inlineMessage: {
    type: Boolean,
    default: false,
  },
  statusIcon: {
    type: Boolean,
    default: false,
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const modelValue = reactive({});
const fromRef = ref();
const propsRef = ref({ labelPosition: "right", labelWidth: "100px" });
const emit = defineEmits(["register"]);

const setModel = (val, field) => {
  return Vue.set(modelValue, field, val);
};

const getBseColProps = (schema) => {
  const { colProps } = schema;
  const baseColProps = {
    ...propsRef.value.baseColProps,
    ...colProps,
  };
  return baseColProps;
};

const setProps = (props) => {
  for (const key in props) {
    if (isRef(props[key])) {
      propsRef.value = Object.assign({}, propsRef.value, {
        [key]: props[key].value,
      });
    } else {
      Vue.set(propsRef.value, key, props[key]);
    }
  }
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
  for (const item of propsRef.value.schemas) {
    setModel(model[item.setField || item.field], item.field);
  }
};
const updateSchema = (schema, insertionIndex) => {
  const schemas = propsRef.value.schemas;
  if (!isArray(schema)) {
    const index = schemas.findIndex((item) => item.field === schema.field);
    if (index > -1) {
      schemas.splice(index, 1, schema);
    } else {
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

const getShow = (schema) => {
  let isShow = true;
  const { show } = schema;
  if (isFunction(show)) {
    return show(modelValue);
  }
  if (isBoolean(show)) {
    isShow = show.value;
  }
  return isShow;
};

defineExpose(formAction);
</script>

<script>
export default {
  name: "LbForm",
};
</script>

<template>
  <el-form
    :model="modelValue"
    :rules="propsRef.rules"
    :label-position="propsRef.labelPosition"
    :label-width="propsRef.labelWidth"
    :inline="propsRef.inline"
    :label-suffix="propsRef.labelSuffix"
    :hide-required-asterisk="propsRef.hideRequiredAsterisk"
    :show-message="propsRef.showMessage"
    :inline-message="propsRef.inlineMessage"
    :status-icon="propsRef.statusIcon"
    :validate-on-rule-change="propsRef.validateOnRuleChange"
    :size="propsRef.size"
    :disabled="propsRef.disabled"
    ref="fromRef"
  >
    <el-row v-if="propsRef">
      <el-col
        v-for="schema in propsRef.schemas"
        :key="schema.prop"
        v-bind="getBseColProps(schema)"
      >
        <LbFormItem
          v-if="getShow(schema)"
          :schema="schema"
          :model="modelValue"
          @update:model="setModel"
        >
          <template #[schema.slot]="{ model, schema }">
            <slot :name="schema.slot" v-bind="{ model, schema }"></slot>
          </template>
        </LbFormItem>
      </el-col>
    </el-row>
  </el-form>
</template>
