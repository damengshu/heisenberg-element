import { ref, nextTick, unref, watch } from "vue";

export function useForm (props) {
  const formRef = ref(null);
  const loadedRef = ref(false);

  async function getForm () {
    const form = unref(formRef);
    if (!form) {
      error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!',
      );
    }
    await nextTick();
    return form;
  }

  function register (instance) {
    if (unref(loadedRef) && instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(props);
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  const methods = {
    setFieldsValue: (values) => {
      formRef.value.setFieldsValue(values);
    },
    validateField: (name) => {
      return formRef.value.validateField(name);
    },
    validate: () => {
      return formRef.value.validate();
    },
    resetFields: () => {
      formRef.value.resetFields();
    },
    clearValidate: (name) => {
      formRef.value.clearValidate(name);
    },
    updateSchema: (schema, index) => {
      formRef.value.updateSchema(schema, index);
    }
  }

  return [register, methods]
}
