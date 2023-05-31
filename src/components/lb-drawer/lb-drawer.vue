<template>
  <el-drawer v-bind="$attrs" class="drawer" :visible.sync="visible">
    <template #title>
      <div>
        <slot name="title">
          {{ $attrs.title }}
        </slot>
      </div>
    </template>
    <div class="drawer-content">
      <slot />
    </div>
    <div>
      <div class="drawer-footer">
        <slot name="footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleConfirm"
            :loading="propsRef.confirmLoading"
          >
            确定
          </el-button>
        </slot>
      </div>
    </div>
  </el-drawer>
</template>

<script setup name="lb-drawer">
import {
  computed,
  onMounted,
  getCurrentInstance,
  ref,
  unref,
  watch,
} from "vue";
import { cloneDeep } from "loadsh";

const instance = getCurrentInstance();
const propsRef = ref({
  value: false,
  confirmLoading: false,
});

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

const emit = defineEmits(["update:value", "confirm", "register"]);

const visible = computed({
  get() {
    return propsRef.value.value;
  },
  set(val) {
    propsRef.value.value = val;
    emit("update:value", val);
  },
});

const handleConfirm = () => {
  emit("confirm");
};

function setDrawerProps(props) {
  propsRef.value = Object.assign(cloneDeep(unref(propsRef)), props);
  if (!props) return;
  if (Reflect.has(props, "value")) {
    visible.value = !!props.value;
  }
}

onMounted(() => {
  emit(
    "register",
    {
      setDrawerProps,
    },
    instance.proxy._uid
  );
});

watch(
  () => props.value,
  (val) => {
    visible.value = val;
  }
);
</script>

<style lang="scss" scoped>
.drawer {
  ::v-deep(.el-drawer__header) {
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 500;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 0;
  }

  ::v-deep(.el-drawer__body) {
    display: flex;
    flex-direction: column;

    .drawer-content {
      height: 100%;
      overflow: auto;
      padding: 10px;
    }

    .drawer-footer {
      padding: 10px;
      border-top: 1px solid #ebeef5;
      text-align: right;
    }
  }
}
</style>
