## 简介

heisenberg-element 是基于 element-ui 二次封装的几个常用组件, 可以运行在 vue2.6 vue2.7 的项目中

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

- Dialog

```js
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

Attributes

| 参数           | 说明                         | 类型    | 可选值 | 默认值 |
| -------------- | ---------------------------- | ------- | ------ | ------ |
| value          | 是否显示 dialog 支持 v-model | boolean | —      | false  |
| confirmLoading | 提交按钮加载状态             | boolean | —      | false  |

其他属性请查看[element-ui](https://element.eleme.io/#/zh-CN/component/dialog#attributes)。

Slot
| name | 说明 |
| ----------- | --------------------- |
| footer | Dialog 按钮操作区的内容,传入后不触发`confirm` 和`handleCancel`事件 |

Events
| name | 说明 |
| ----------- | --------------------- |
| confirm | 点击提交按钮 |
| cancel | 点击取消按钮触发 |
| register | 注册组件事件,在 setup 中配合`useDialog`使用|

```js
import { useDialog } from "heisenberg-element";
const [
  register,
  { setDialogProps, openDialog, closeDialog, setConfirmLoadong },
] = useDialog();
```

useDialog

| name           | 说明                                             | 类型     | 参数                                                                |
| -------------- | ------------------------------------------------ | -------- | ------------------------------------------------------------------- |
| register       | 要使用方达必须要监听 register 方法传入`register` | -        | -                                                                   |
| setDialogProps | 设置 Dialog 的 props                             | Function | 见上 Attributes                                                     |
| openDialog     | 打开 Dialog                                      | Function | 传输的数据，可使用`useDialogInuseDialogInner`的导出的 register 接收 |
| closeDialog    | 关闭 Dialog                                      | Function | -                                                                   |

useDialogInuseDialogInner

| name           | 说明                   | 类型     | 参数                                       |
| -------------- | ---------------------- | -------- | ------------------------------------------ |
| closeDialog    | 关闭 Dialog            | Function | -                                          |
| setDialogProps | 设置 Dialog 的 props   | Function | 见上 Attributes                            |
| register       | 监听 register 方法传入 | Function | Function, 回调参数为 openDialog 传入的参数 |

- LbDrawer

```js
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

```js
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

| schemas   | 描述                                                      | 类型                                                                                                                     |
| --------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| field     | 字段名称                                                  | string                                                                                                                   |
| label     | 表单 label                                                | string                                                                                                                   |
| component | 组件                                                      | Input、DatePicker、Select、CheckboxGroup、RadioGroup、Switch、Cascader、InputNumber、Divider、`ApiSelect`、`ApiCascader` |
| rules     | 规则                                                      | array                                                                                                                    |
| colProps  | [布局](https://element.eleme.io/#/zh-CN/component/layout) | -                                                                                                                        |
| slot      | 传入插槽后将优先渲染具名插槽                              | -                                                                                                                        |

- LbTable

```js
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

```js
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
