import { Divider, Input, Switch, Cascader, InputNumber } from "element-ui";
import CheckboxGroup from "./component/checkbox-group.vue";
import RadioGroup from "./component/radio-group.vue";
import Select from "./component/Select.vue";
import ApiSelect from "./component/ApiSelect.vue";
import ApiCascader from "./component/ApiCascader.vue";
import DatePicker from "./component/DatePicker.vue";
import DateTimePicker from "./component/DateTimePicker";

const componentMap = new Map();

componentMap.set('Input', Input);
componentMap.set('DatePicker', DatePicker);
componentMap.set('DateTimePicker', DateTimePicker);
componentMap.set('Select', Select);
componentMap.set('CheckboxGroup', CheckboxGroup);
componentMap.set('RadioGroup', RadioGroup);
componentMap.set('Switch', Switch);
componentMap.set('Cascader', Cascader);
componentMap.set('InputNumber', InputNumber);

componentMap.set('Divider', Divider);

componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiCascader', ApiCascader);

export {
  componentMap
}
