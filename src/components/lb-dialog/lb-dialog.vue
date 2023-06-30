<template>
  <el-dialog
    class="ld-dialog"
    v-bind="$attrs"
    v-on="$listeners"
    :visible.sync="visible"
  >
    <template #title>
      <div>
        <slot name="title">
          {{ $attrs.title }}
        </slot>
      </div>
    </template>
    <div class="dialog-content">
      <slot />
    </div>
    <div>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button
            type="primary"
            @click="handleConfirm"
            :loading="propsRef.confirmLoading"
          >
            确定
          </el-button>
        </div>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "LbDialog",
};
</script>

<script setup name="lb-ialog">
import { computed, ref, unref, watch, getCurrentInstance } from "vue";
import { cloneDeep } from "loadsh";

const instance = getCurrentInstance();

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  confirmLoading: {
    type: Boolean,
    default: false,
  },
});

const visible = computed({
  get() {
    return propsRef.value.value;
  },
  set(val) {
    propsRef.value.value = val;
    emit("input", val);
  },
});

const propsRef = ref({
  value: false,
  confirmLoading: false,
});
const emit = defineEmits(["input", "confirm", "register", "cancel"]);

const handleConfirm = () => {
  emit("confirm");
};

const handleCancel = () => {
  visible.value = false;
  emit("cancel");
};

function setDialogProps(props) {
  propsRef.value = Object.assign(cloneDeep(unref(propsRef)), props);
  if (!props) return;
  if (Reflect.has(props, "value")) {
    visible.value = !!props.value;
  }
}

watch(
  () => props.value,
  (val) => {
    propsRef.value.value = val;
  }
);

watch(
  () => props.confirmLoading,
  (val) => {
    propsRef.value.confirmLoading = val;
  }
);

emit("register", { setDialogProps }, instance.proxy._uid);
</script>

<style lang="scss" scoped>
.ld-dialog {
  ::v-deep(.el-dialog__header) {
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 500;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 0;
  }
  ::v-deep(.el-dialog__body) {
    padding: 0;
    .dialog-content {
      padding: 20px;
      min-height: 100px;
    }
    .dialog-footer {
      padding: 10px 20px;
      text-align: right;
      background-color: #fff;
      border-top: 1px solid #ebeef5;
    }
  }
}
</style>
