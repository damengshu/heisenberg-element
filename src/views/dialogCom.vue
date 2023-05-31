<template>
  <LbDialog
    title="title"
    v-bind="$attrs"
    v-on="$listeners"
    @register="register"
  >
    <el-button @click="closeDialog">内部关闭</el-button>
    <el-button @click="setConfirmLoadong()">设置加载</el-button>
    <el-button @click="setConfirmLoadong(false)">取消加载</el-button>
  </LbDialog>
</template>

<script setup>
import LbDialog from "../components/lb-dialog/lb-dialog.vue";
import { useDialogInner } from "../hooks/useDialog";

const [register, { closeDialog, setConfirmLoadong }] = useDialogInner(
  (data) => {
    console.log(data);
  }
);
</script>
