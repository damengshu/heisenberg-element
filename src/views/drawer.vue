<template>
  <LbDrawer
    v-bind="$attrs"
    v-on="$listeners"
    title="title"
    @register="register"
    :confirmLoadong="true"
  >
    <el-button @click="closeDrawer()">内部关闭</el-button>
    <el-button @click="setConfirmLoadong()">加载</el-button>
    <el-button @click="setConfirmLoadong(false)">取消加载</el-button>
  </LbDrawer>
</template>
<script setup>
import LbDrawer from "@/components/lb-drawer/lb-drawer.vue";
import { useDrawerInner } from "../hooks/useDrawer";

const [register, { closeDrawer, setConfirmLoadong }] = useDrawerInner(
  (data) => {
    console.log(data);
  }
);
</script>
