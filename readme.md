## 简介

heisenberg-element 是基于 element-ui 二次封装的几个常用组件,可以运行在 vue2.6 vue2.7 的项目中

## 安装使用

- 安装

```bash
npm install heisenberg-element  or  yarn add heisenberg-element
```

- 导入依赖

```bash
// main.js

import HeisenbergElement from 'heisenberg-element'
import 'heisenberg-element/lib/heisenberg-element.css'

Vue.use(HeisenbergElement)
```

## 使用

```vue
//JavaScript
<template>
  <div>
    <el-button @click="handleOpen">打开Dialog</el-button>
    <LbDialog
      title="aaaa"
      @register="register"
      @confirm="hanndleConfirm"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      12321321
    </LbDialog>
  </div>
</template>
<script setup>
import { useDialog } from "heisenberg-element";
import { ref } from "vue";

const confirmLoading = ref(false);

const [register, { openDialog, closeDialog }] = useDialog();

const handleOpen = () => {
  openDialog();
};

const hanndleConfirm = () => {
  confirmLoading.value = true;
  setTimeout(() => {
    confirmLoading.value = false;
    closeDialog();
  }, 2000);
};

const handleCancel = () => {
  console.log("cancel");
};
</script>
```

- LbDrawer

```vue
<template>
  <div>
    <el-button @click="openDrawer">打开抽屉</el-button>
    <LbDrawer title="aaaa" @register="register" @confirm="confirm">
      <el-button @click="closeDrawer">关闭</el-button>
    </LbDrawer>
  </div>
</template>
<script setup>
import { useDrawer } from "heisenberg-element";

const [register, { openDrawer, closeDrawer }] = useDrawer();

const confirm = () => {
  console.log("confirm");
};
</script>
```

- lbForm

```vue
<template>
  <div>
    <LbForm ref="lbForm" @register="register"> </LbForm>
    <el-button @click="handleSubmit">提交</el-button>
    <el-button @click="handleRefSubmit">ref提交</el-button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useForm } from "heisenberg-element";

const lbForm = ref(null);

const [register, { submit }] = useForm({
  schemas: [
    {
      field: "name",
      label: "姓名",
      component: "Input",
      rules: [{ required: true, message: "请输入姓名" }],
      colProps: {
        span: 8,
      },
    },
    {
      field: "age",
      label: "年龄",
      component: "InputNumber",
      rules: [{ required: true, message: "请输入年龄" }],
      colProps: {
        span: 8,
      },
    },
  ],
});

const handleSubmit = async () => {
  const data = await submit();
  console.log(data);
};

const handleRefSubmit = async () => {
  const res = await lbForm.value.submit();
  console.log(res);
};
</script>
```

- LbTable

```vue
<template>
  <div>
    <div>
      <el-button @click="test2">设置加载</el-button>
    </div>
    <lb-table @register="register" boder>
      <template v-slot:date="{ slotScope }">
        <span>{{ slotScope.row.date }}</span>
      </template>
    </lb-table>
  </div>
</template>
<script setup>
import { useTable } from "heisenberg-element";
import axios from "axios";

const test = async (params) => {
  const { data } = await axios.get("http://localhost:30012/", {
    params: params,
  });
  return data;
};

const [register, { setLoading }] = useTable({
  column: [
    {
      prop: "date",
      label: "日期",
      slot: "date",
    },
    {
      prop: "name",
      label: "姓名",
    },
    {
      prop: "province",
      label: "省份",
    },
    {
      prop: "city",
      label: "市区",
    },
    {
      prop: "address",
      label: "地址",
    },
    {
      prop: "zip",
      label: "邮编",
    },
  ],
  pagination: true,
  height: "750",
  boder: true,
  api: test,
});

const test2 = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
};
</script>
```

- LbDialog

```vue
<template>
  <div>
    <el-button @click="handleOpen">打开Dialog</el-button>
    <LbDialog
      title="aaaa"
      @register="register"
      @confirm="hanndleConfirm"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      12321321
    </LbDialog>
  </div>
</template>
<script setup>
import { useDialog } from "heisenberg-element";
import { ref } from "vue";

const confirmLoading = ref(false);

const [register, { openDialog, closeDialog }] = useDialog();

const handleOpen = () => {
  openDialog();
};

const hanndleConfirm = () => {
  confirmLoading.value = true;
  setTimeout(() => {
    confirmLoading.value = false;
    closeDialog();
  }, 2000);
};

const handleCancel = () => {
  console.log("cancel");
};
</script>
```
