<template>
  <LbDrawer v-bind="$attrs" @register="register" :visible.sync="visible" title="title">
    <el-button @click="closeDrawer">内部关闭</el-button>
    <el-button @click="setConfirmLoadong()">加载</el-button>
    <el-button @click="setConfirmLoadong(false)">取消加载</el-button>
  </LbDrawer>
</template>
<script setup>
import { ref } from 'vue'
import LbDrawer from '@/components/lb-drawer/lb-drawer.vue'
import { useDrawerInner } from "../hooks/useDrawer";

const visible = ref(false)

const [register, { closeDrawer, setConfirmLoadong }] = useDrawerInner((data) => {
  console.log(data);
})

</script>
