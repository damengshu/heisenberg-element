<template>
  <LbDialog
    title="title"
    v-bind="$attrs"
    v-on="$listeners"
    @register="register"
    :confirmLoading="true"
  >
    <el-button @click="closeDialog">内部关闭</el-button>
    <el-button @click="setConfirmLoadong()">设置加载</el-button>
    <el-button @click="setConfirmLoadong(false)">取消加载</el-button>
  </LbDialog>
</template>

<script setup>
import LbDialog from "../components/lb-dialog/lb-dialog.vue";
import { useDialogInner } from "../hooks/useDialog";
import { useAttrs, useListeners } from "vue";

const attrs = useAttrs();
const listeners = useListeners();

console.log(attrs);
console.log(listeners);

const [register, { closeDialog, setConfirmLoadong }] = useDialogInner(
  (data) => {
    console.log(data);
  }
);
</script>
