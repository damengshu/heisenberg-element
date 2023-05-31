<template>
  <el-dialog class="ld-dialog" v-bind="$attrs" :visible.sync="visible">
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
          <el-button>取消</el-button>
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

<script lang="ts" setup>
import { computed, ref } from "vue";

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  confirmLoadong: {
    type: Boolean,
    default: false,
  },
});

const visible = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit("input", val);
  },
});

const propsRef = ref({
  visible: false,
  confirmLoading: false,
});
const emit = defineEmits(["input", "confirm", "register"]);

const handleConfirm = () => {
  emit("confirm");
};
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
