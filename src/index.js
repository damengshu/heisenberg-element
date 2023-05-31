import { useTable } from './hooks/useTable';
import { useDrawer, useDrawerInner } from "./hooks/useDrawer";

const requireComponents = require.context('./components', true, /\.vue$/)

const install = (Vue) => {
  if (install.installed) return
  // 遍历引入组件
  requireComponents.keys().forEach(fileName => {
    const config = requireComponents(fileName) // 当前组件
    const componentName = config.default.name // 获取组件名，即vue文件中的name
    Vue.component(componentName, config.default) // 注册组件
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}

export {
  useTable,
  useDrawer,
  useDrawerInner
}
