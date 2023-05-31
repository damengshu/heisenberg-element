<template>
  <div>
    <LbTable @register="register" :data="data">
      <template v-slot:date="{ slotScope }">
        {{ getDate(slotScope) }}
      </template>
    </LbTable>
    <el-button @click="open">打开Drawer</el-button>
    <TestDrawer @register="registerDrawer" />
  </div>
</template>

<script>
export default {
  name: 'test'
}
</script>

<script setup>
import { ref } from 'vue'
import LbTable from '../components/lb-table/lb-table.vue'
import { useTable } from '../hooks/useTable/index'
import { useDrawer } from "../hooks/useDrawer/index";
import TestDrawer from "./test.vue";

import axios from 'axios'

const [registerDrawer, { openDrawer, closeDrawer }] = useDrawer()

const data = ref([
  {
    date: '2016-05-03',
    name: '王小虎1',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-02',
    name: '王小虎2',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-02',
    name: '王小虎3',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-02',
    name: '王小虎4',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-02',
    name: '王小虎5',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }
])
const column = ref([
  {
    prop: 'date',
    label: '日期',
    slot: 'date'
  },
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'province',
    label: '省份'
  },
  {
    prop: 'city',
    label: '市区'
  },
  {
    prop: 'address',
    label: '地址'
  },
  {
    prop: 'zip',
    label: '邮编'
  }
])
const test = async (params) => {
  const { data } = await axios.get('http://localhost:30012/', {
    params: params
  })
  return data
}

const [register] = useTable({
  column: [
    {
      prop: 'date',
      label: '日期',
      slot: 'date'
    },
    {
      prop: 'name',
      label: '姓名'
    },
    {
      prop: 'province',
      label: '省份'
    },
    {
      prop: 'city',
      label: '市区'
    },
    {
      prop: 'address',
      label: '地址'
    },
    {
      prop: 'zip',
      label: '邮编'
    }
  ],
  pagination: true,
  height: '719',
})

const getDate = (scope) => {
  return scope.row.date
}

const open = () => {
  openDrawer({
    data: '我是传递的参数',
  })
}

</script>

