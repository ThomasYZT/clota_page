/**
 * 项目公用插件
 * Created by Sasha on 2018/6/1.
 */

// import {TableColumn, Scrollbar, Pagination, Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
import Table from 'element-ui/lib/table';
import TableColumn from 'element-ui/lib/table-column';
import Scrollbar from 'element-ui/lib/scrollbar';
import Pagination from 'element-ui/lib/pagination';
import Dropdown from 'element-ui/lib/dropdown';
import DropdownMenu from 'element-ui/lib/dropdown-menu';
import DropdownItem from 'element-ui/lib/dropdown-item';

import Button from 'iview/src/components/button/index.js';
// import ButtonGroup from 'iview/src/components/button-group/index.js';
// import MenuGroup from 'iview/src/components/menu-group/index.js';
// import MenuItem from 'iview/src/components/menu-item/index.js';
import Menu from 'iview/src/components/menu/index.js';
// import subMenu from 'iview/src/components/submenu/index.js';
import Input from 'iview/src/components/input/index.js';
import {Select, Option, OptionGroup} from 'iview/src/components/select/index.js';
import Modal from 'iview/src/components/modal/index.js';
import Tree from 'iview/src/components/tree/index.js';
import breadCrumb from 'iview/src/components/breadcrumb/index.js';
// import breadcrumbItem from 'iview/src/components/breadcrumb-item/index.js';
import Icon from 'iview/src/components/icon/index.js';
import Radio from 'iview/src/components/radio/index.js';
// import radioGroup from 'iview/src/components/radio-group/index.js';
import Switch from 'iview/src/components/switch/index.js';
import Checkbox from 'iview/src/components/checkbox/index.js';
// import checkboxGroup from 'iview/src/components/checkbox-group/index.js';
import DatePicker from 'iview/src/components/date-picker/index.js';
import TimePicker  from 'iview/src/components/time-picker/index.js';
import Form  from 'iview/src/components/form/index.js';
import {Row, Col} from 'iview/src/components/grid';
// import Option  from 'iview/src/components/option/index.js';
import Tooltip  from 'iview/src/components/tooltip/index.js';
import Message  from 'iview/src/components/message/index.js';

import iView from 'iview'

// 引入 ECharts 主模块
// import ECharts from '@/components/vueEcharts/ECharts.vue'
// // 按需引入 Echarts 图表
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
// require('echarts/lib/component/legendScroll');


// 引入公用样式，指令及方法等
import klwkUi from 'klwk-ui';


// ajax作为全局变量引入
import ajax from '@/api/ajaxList'


let plugin = {};
plugin.install = function (Vue, options) {
    // 引入iView
    Vue.use(iView);

    // element-ui按需引入(Table)
    // Vue.use(Table);
    // Vue.use(TableColumn);
    // Vue.use(Scrollbar);
    // Vue.use(Pagination);
    // Vue.use(Dropdown);
    // Vue.use(DropdownMenu);
    // Vue.use(DropdownItem);
    Vue.component(Table.name,Table);
    Vue.component(TableColumn.name,TableColumn);
    Vue.component(Scrollbar.name,Scrollbar);
    Vue.component(Pagination.name,Pagination);
    Vue.component(Dropdown.name,Dropdown);
    Vue.component(DropdownMenu.name,DropdownMenu);
    Vue.component(DropdownItem.name,DropdownItem);


    // Vue.component(Input.name,Input);
    // Vue.component('iInput',Input);
    // Vue.component(Button.name,Button);
    // Vue.component('ButtonGroup',Button.Group);
    // Vue.component('MenuGroup',Menu.Group);
    // Vue.component('MenuItem',Menu.Item);
    // Vue.component('iMenu',Menu);
    // Vue.component('Menu',Menu);
    // Vue.component('Submenu',Menu.Sub);
    // Vue.component(Select.name,Select);
    // Vue.component('OptionGroup',OptionGroup);
    // Vue.component(Modal.name,Modal);
    // Vue.component(Tree.name,Tree);
    // Vue.component(breadCrumb.name,breadCrumb);
    // Vue.component('BreadcrumbItem',breadCrumb.Item);
    // Vue.component(Icon.name,Icon);
    // Vue.component(Radio.name,Radio);
    // Vue.component('RadioGroup',Radio.Group);
    // Vue.component(Switch.name,Switch);
    // Vue.component('iSwitch',Switch);
    // Vue.component(Checkbox.name,Checkbox);
    // Vue.component('CheckboxGroup',Checkbox.Group);
    // Vue.component('DatePicker',DatePicker);
    // Vue.component('TimePicker',TimePicker );
    // Vue.component('Form',Form );
    // Vue.component('iForm',Form );
    // Vue.component('FormItem',Form.Item );
    // Vue.component('TimePicker',TimePicker );
    // Vue.component(Row.name,Row );
    // Vue.component(Col.name,Col );
    // Vue.component(Option.name,Option );
    // Vue.component(Tooltip.name,Tooltip );
    // Vue.component(Message.name,Message );
    // Vue.prototype.$Message = Message;

    // 公用样式，指令及方法
    Vue.use(klwkUi);


    // 注入全局变量
    Vue.mixin({
        components: {},
        filters: {
            // 时间格式化过滤器
            timeFormat(value, format = 'yyyy/MM/dd', emptyVal = '') {
                if (!value) {
                    return emptyVal;
                } else if (value instanceof Date) {
                    return value.format(format);
                } else if (validator.isNumber(value)) {
                    return new Date(Number(value)).format(format);
                } else if (typeof value === 'string') {
                    return value.toDate().format(format);
                } else {
                    return value
                }
            },
            //内容过滤器，如果内容为空或null，返回-
            contentFilter(content) {
                if (content === '' || content === null || content === undefined) {
                    return '-';
                } else {
                    return content;
                }
            }
        },
        data() {
            return {
                // ajax作为全局变量引入
                ajax
            }
        },
        created() {
            //修改iview message全局配置
            this.$Message.config({
                duration: 3
            });

        }
    })

};

export default plugin;
