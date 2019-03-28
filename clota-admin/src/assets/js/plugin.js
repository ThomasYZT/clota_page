/**
 * 项目公用插件
 * Created by Sasha on 2018/6/1.
 */
//按需引入element-ui组件
import Table from 'element-ui/lib/table';
import TableColumn from 'element-ui/lib/table-column';
import Scrollbar from 'element-ui/lib/scrollbar';
import Pagination from 'element-ui/lib/pagination';
import Dropdown from 'element-ui/lib/dropdown';
import DropdownMenu from 'element-ui/lib/dropdown-menu';
import DropdownItem from 'element-ui/lib/dropdown-item';
import tooltip from 'element-ui/lib/tooltip';
import Tree from 'element-ui/lib/tree';
import ElUpload from 'element-ui/lib/upload';
//按需引入iview组件
import {
    Affix,
    Steps,
    Button,
    Input,
    Menu,
    Select,
    OptionGroup,
    Modal,
    breadcrumb,
    Icon,
    Radio,
    Switch,
    Checkbox,
    DatePicker,
    Form,
    TimePicker,
    Row,
    Col,
    Option,
    Tooltip,
    Message,
    InputNumber,
    Timeline,
    TimelineItem,
    Upload
} from 'iview';

//自定义全局组件
import confirmModal from '../../components/confirmModal/index';
import selectTree from '../../components/selectTree/index';

//引入富文本编辑
import VueQuillEditor from 'vue-quill-editor';

// 引入公用样式，指令及方法等
import klwkUi from 'klwk-ui';


// 按需引入 Echarts 图表
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');

let plugin = {};
plugin.install = function (Vue, options) {

    // element-ui按需引入
    Vue.use(Scrollbar);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Pagination);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(tooltip);
    Vue.use(Tree);
    Vue.use(ElUpload);

    //iview按需引入
    Vue.component('Affix',Affix);
    Vue.component('Steps',Steps);
    Vue.component('Step',Steps.Step);
    Vue.component('Button',Button);
    Vue.component('Input',Input);
    Vue.component('iInput',Input);
    Vue.component('ButtonGroup',Button.Group);
    Vue.component('MenuGroup',Menu.Group);
    Vue.component('MenuItem',Menu.Item);
    Vue.component('iMenu',Menu);
    Vue.component('Menu',Menu);
    Vue.component('Submenu',Menu.Sub);
    Vue.component('Select',Select);
    Vue.component('OptionGroup',OptionGroup);
    Vue.component('Modal',Modal);
    Vue.component('Breadcrumb',breadcrumb);
    Vue.component('BreadcrumbItem',breadcrumb.Item);
    Vue.component('Icon',Icon);
    Vue.component('Radio',Radio);
    Vue.component('RadioGroup',Radio.Group);
    Vue.component('iSwitch',Switch);
    Vue.component('Checkbox',Checkbox);
    Vue.component('CheckboxGroup',Checkbox.Group);
    Vue.component('DatePicker',DatePicker);
    Vue.component('TimePicker',TimePicker );
    Vue.component('Form',Form );
    Vue.component('iForm',Form );
    Vue.component('FormItem',Form.Item );
    Vue.component('TimePicker',TimePicker );
    Vue.component('Row',Row );
    Vue.component('i-row',Row );
    Vue.component('Col',Col );
    Vue.component('i-col',Col );
    Vue.component('Option',Option );
    Vue.component('Tooltip',Tooltip );
    Vue.component('Message',Message );
    Vue.component('InputNumber',InputNumber );
    Vue.component('Timeline',Timeline );
    Vue.component('TimelineItem',TimelineItem);
    Vue.component('Upload',Upload);
    Vue.prototype.$Message = Message;

    //引入富文本编辑器组件
    Vue.use(VueQuillEditor)

    //自定义全局组件
    Vue.component('confirmModal',confirmModal);
    Vue.component('selectTree',selectTree);

    // 公用样式，指令及方法
    Vue.use(klwkUi);


    // 注入全局变量
    Vue.mixin({
        components : {},
        filters : {
            // 时间格式化过滤器
            timeFormat (value, format = 'yyyy/MM/dd', emptyVal = '') {
                if (!value) {
                    return emptyVal;
                } else if (value instanceof Date) {
                    return value.format(format);
                } else if (klwkUi.validator.isNumber(value)) {
                    return new Date(Number(value)).format(format);
                } else if (typeof value === 'string') {
                    value = value.replace(/-/g,'/');
                    return value.toDate().format(format);
                } else {
                    return value;
                }
            },
            //内容过滤器，如果内容为空或null，返回-
            contentFilter (content) {
                if (content === '' || content === null || content === undefined) {
                    return '-';
                } else {
                    return content;
                }
            },
            //货比格式化
            moneyFilter (content) {
                if (content === '' || content === null || content === undefined) {
                    return '-';
                } else {
                    return content === 0 ? '0.00' : Number(content).toCurrency();
                }
            }
        },
        created () {
            //修改iview message全局配置
            this.$Message.config({
                duration : 3
            });

        }
    });

};

export default plugin;
