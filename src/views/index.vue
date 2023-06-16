<script setup name="test">
import { ref } from "vue";
import LbTable from "../components/lb-table/lb-table.vue";
import LbForm from "../components/lb-form/lb-form";
import { useTable } from "../hooks/useTable/index";
import { useDrawer } from "../hooks/useDrawer/index";
import { useDialog } from "../hooks/useDialog/index";
import { useForm } from "../hooks/useForm/index";
import TestDrawer from "./drawer.vue";
import TestDialog from "./dialogCom.vue";

import axios from "axios";

const [registerDialog, { openDialog }] = useDialog();

const api = () => {
  return Promise.resolve([
    {
      name: "选项1",
      values: "1",
    },
    {
      name: "选项2",
      values: "2",
    },
  ]);
};

const api2 = () => {
  return Promise.resolve([
    {
      value: "zhinan",
      label: "指南",
      disabled: true,
      children: [
        {
          value: "shejiyuanze",
          label: "设计原则",
          children: [
            {
              value: "yizhi",
              label: "一致",
            },
            {
              value: "fankui",
              label: "反馈",
            },
            {
              value: "xiaolv",
              label: "效率",
            },
            {
              value: "kekong",
              label: "可控",
            },
          ],
        },
        {
          value: "daohang",
          label: "导航",
          children: [
            {
              value: "cexiangdaohang",
              label: "侧向导航",
            },
            {
              value: "dingbudaohang",
              label: "顶部导航",
            },
          ],
        },
      ],
    },
    {
      value: "zujian",
      label: "组件",
      children: [
        {
          value: "basic",
          label: "Basic",
          children: [
            {
              value: "layout",
              label: "Layout 布局",
            },
            {
              value: "color",
              label: "Color 色彩",
            },
            {
              value: "typography",
              label: "Typography 字体",
            },
            {
              value: "icon",
              label: "Icon 图标",
            },
            {
              value: "button",
              label: "Button 按钮",
            },
          ],
        },
        {
          value: "form",
          label: "Form",
          children: [
            {
              value: "radio",
              label: "Radio 单选框",
            },
            {
              value: "checkbox",
              label: "Checkbox 多选框",
            },
            {
              value: "input",
              label: "Input 输入框",
            },
            {
              value: "input-number",
              label: "InputNumber 计数器",
            },
            {
              value: "select",
              label: "Select 选择器",
            },
            {
              value: "cascader",
              label: "Cascader 级联选择器",
            },
            {
              value: "switch",
              label: "Switch 开关",
            },
            {
              value: "slider",
              label: "Slider 滑块",
            },
            {
              value: "time-picker",
              label: "TimePicker 时间选择器",
            },
            {
              value: "date-picker",
              label: "DatePicker 日期选择器",
            },
            {
              value: "datetime-picker",
              label: "DateTimePicker 日期时间选择器",
            },
            {
              value: "upload",
              label: "Upload 上传",
            },
            {
              value: "rate",
              label: "Rate 评分",
            },
            {
              value: "form",
              label: "Form 表单",
            },
          ],
        },
        {
          value: "data",
          label: "Data",
          children: [
            {
              value: "table",
              label: "Table 表格",
            },
            {
              value: "tag",
              label: "Tag 标签",
            },
            {
              value: "progress",
              label: "Progress 进度条",
            },
            {
              value: "tree",
              label: "Tree 树形控件",
            },
            {
              value: "pagination",
              label: "Pagination 分页",
            },
            {
              value: "badge",
              label: "Badge 标记",
            },
          ],
        },
        {
          value: "notice",
          label: "Notice",
          children: [
            {
              value: "alert",
              label: "Alert 警告",
            },
            {
              value: "loading",
              label: "Loading 加载",
            },
            {
              value: "message",
              label: "Message 消息提示",
            },
            {
              value: "message-box",
              label: "MessageBox 弹框",
            },
            {
              value: "notification",
              label: "Notification 通知",
            },
          ],
        },
        {
          value: "navigation",
          label: "Navigation",
          children: [
            {
              value: "menu",
              label: "NavMenu 导航菜单",
            },
            {
              value: "tabs",
              label: "Tabs 标签页",
            },
            {
              value: "breadcrumb",
              label: "Breadcrumb 面包屑",
            },
            {
              value: "dropdown",
              label: "Dropdown 下拉菜单",
            },
            {
              value: "steps",
              label: "Steps 步骤条",
            },
          ],
        },
        {
          value: "others",
          label: "Others",
          children: [
            {
              value: "dialog",
              label: "Dialog 对话框",
            },
            {
              value: "tooltip",
              label: "Tooltip 文字提示",
            },
            {
              value: "popover",
              label: "Popover 弹出框",
            },
            {
              value: "card",
              label: "Card 卡片",
            },
            {
              value: "carousel",
              label: "Carousel 走马灯",
            },
            {
              value: "collapse",
              label: "Collapse 折叠面板",
            },
          ],
        },
      ],
    },
    {
      value: "ziyuan",
      label: "资源",
      children: [
        {
          value: "axure",
          label: "Axure Components",
        },
        {
          value: "sketch",
          label: "Sketch Templates",
        },
        {
          value: "jiaohu",
          label: "组件交互文档",
        },
      ],
    },
  ]);
};

const schemas = [
  {
    field: "divider-basic",
    component: "Divider",
    label: "基础字段",
    labelWidth: "100PX",
    colProps: {
      span: 24,
    },
  },
  {
    field: "field1",
    component: "Input",
    label: "字段1",
    colProps: {
      span: 8,
    },
    rules: { required: true, message: "请输入活动名称", trigger: "blur" },
  },
  {
    field: "field2",
    component: "Input",
    label: "带后缀",
    defaultValue: "111",
    colProps: {
      span: 8,
    },
    componentProps: {
      onChange: (e) => {
        console.log(e);
      },
    },
    suffix: "天",
  },
  {
    field: "field3",
    component: "DatePicker",
    label: "字段3",
    colProps: {
      span: 8,
    },
  },
  {
    field: "field4",
    component: "Select",
    label: "字段4",
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: "选项1",
          value: "1",
          key: "1",
        },
        {
          label: "选项2",
          value: "2",
          key: "2",
        },
      ],
    },
  },
  {
    field: "field5",
    component: "CheckboxGroup",
    label: "字段5",
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: "选项1",
          value: "1",
        },
        {
          label: "选项2",
          value: "2",
        },
      ],
    },
  },
  {
    field: "field6",
    component: "InputNumber",
    label: "字段6",
    colProps: {
      span: 8,
    },
  },
  {
    field: "field9",
    component: "Switch",
    label: "字段9",
    colProps: {
      span: 8,
    },
    defaultValue: true,
  },
  {
    field: "field7",
    component: "RadioGroup",
    label: "字段7",
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: "选项1",
          value: "1",
        },
        {
          label: "选项2",
          value: "2",
        },
      ],
    },
  },
  {
    field: "field11",
    component: "Cascader",
    label: "字段11",
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake",
                },
              ],
            },
          ],
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    field: "divider-api-select",
    component: "Divider",
    label: "远程下拉演示",
    labelWidth: "100px",
    colProps: {
      span: 24,
    },
  },
  {
    field: "field8",
    component: "ApiSelect",
    label: "字段8",
    colProps: {
      span: 8,
    },
    componentProps: {
      api,
      labelField: "name",
      valueField: "values",
      clearable: true,
    },
  },
  {
    field: "field10",
    component: "ApiCascader",
    label: "字段10",
    colProps: {
      span: 8,
    },
    componentProps: {
      api: api2,
      labelField: "name",
      valueField: "values",
      clearable: true,
    },
  },
  {
    field: "field31",
    component: "Input",
    label: "下拉本地搜索",
    helpMessage: [
      "ApiSelect组件",
      "远程数据源本地搜索",
      "只发起一次请求获取所有选项",
    ],
    required: true,
    slot: "localSearch",
    colProps: {
      span: 8,
    },
    defaultValue: "0",
  },
  {
    field: "field32",
    component: "Input",
    label: "下拉远程搜索",
    helpMessage: ["ApiSelect组件", "将关键词发送到接口进行远程搜索"],
    required: true,
    slot: "remoteSearch",
    colProps: {
      span: 8,
    },
    defaultValue: "0",
  },
  {
    field: "divider-selects",
    component: "Divider",
    label: "互斥多选",
    labelWidth: "100px",
    helpMessage: ["两个Select共用数据源", "但不可选择对方已选中的项目"],
    colProps: {
      span: 24,
    },
  },
  {
    field: "selectA",
    component: "Select",
    label: "互斥SelectA",
    slot: "selectA",
    defaultValue: [],
    colProps: {
      span: 8,
    },
  },
  {
    field: "selectB",
    component: "Select",
    label: "互斥SelectB",
    slot: "selectB",
    defaultValue: [],
    colProps: {
      span: 8,
    },
  },
  {
    field: "divider-deconstruct",
    component: "Divider",
    label: "字段解构",
    labelWidth: "100px",
    helpMessage: [
      "如果组件的值是 array 或者 object",
      "可以根据 ES6 的解构语法分别取值",
    ],
    colProps: {
      span: 24,
    },
  },
  {
    field: "[startTime, endTime]",
    label: "时间范围",
    component: "RangePicker",
    componentProps: {
      format: "YYYY-MM-DD HH:mm:ss",
      placeholder: ["开始时间", "结束时间"],
      showTime: { format: "HH:mm:ss" },
    },
  },
];

const formRules = {
  field1: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
};
const [
  registerForm,
  {
    setFieldsValue,
    validateField,
    validate,
    resetFields,
    clearValidate,
    updateSchema,
  },
] = useForm({
  schemas: schemas,
});

const [register] = useTable({
  pagination: true,
  height: "719",
});
const [registerDrawer, { openDrawer, closeDrawer }] = useDrawer();
const visible = ref(false);
const formRef = ref();

const data = ref([
  {
    date: "2016-05-03",
    name: "王小虎1",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200333,
  },
  {
    date: "2016-05-02",
    name: "王小虎2",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200333,
  },
  {
    date: "2016-05-02",
    name: "王小虎3",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200333,
  },
  {
    date: "2016-05-02",
    name: "王小虎4",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200333,
  },
  {
    date: "2016-05-02",
    name: "王小虎5",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200333,
  },
]);
const column = ref([
  {
    type: "selection",
  },
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
]);

const test = async (params) => {
  const { data } = await axios.get("http://localhost:30012/", {
    params: params,
  });
  return data;
};

const getDate = (scope) => {
  return scope.row.date;
};

const openD = () => {
  openDrawer({
    data: "我是传递的参数",
  });
};

const openDL = () => {
  openDialog();
};

const refSubmit = async () => {
  const res = await formRef.value.submit();
  console.log(res);
};

const setValue = () => {
  setFieldsValue({
    field1: "123",
  });
};

const validate1 = () => {
  validateField("field1");
};

const validate2 = () => {
  validate();
};

const resetField = () => {
  resetFields();
};

const clearValidate2 = () => {
  clearValidate();
};

const handleUpdateSchema = () => {
  updateSchema([
    {
      field: "field12",
      label: "更新后的",
      component: "Input",
      componentProps: {
        placeholder: "请输入",
      },
      colProps: {
        span: 8,
      },
    },
  ]);
};
</script>

<template>
  <div>
    <LbForm ref="formRef" @register="registerForm" />
    <el-button @click="refSubmit">ref提交</el-button>
    <el-button @click="setValue">设置字段一</el-button>
    <el-button @click="validate1">验证自断一</el-button>
    <el-button @click="validate2">验证全部字段</el-button>
    <el-button @click="resetField">重置form</el-button>
    <el-button @click="clearValidate2">清除验证</el-button>
    <el-button @click="handleUpdateSchema">设置Schema</el-button>

    <LbTable @register="register" :column="column" :data="data">
      <template v-slot:date="{ slotScope }">
        {{ getDate(slotScope) }}
      </template>
    </LbTable>
    <el-button @click="openD">打开Drawer</el-button>
    <TestDrawer @register="registerDrawer" />
    <el-button style="margin-left: 20px" @click="openDL">打开Dialog</el-button>
    <TestDialog @register="registerDialog" @click="test" />
  </div>
</template>
