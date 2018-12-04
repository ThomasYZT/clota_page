/**
 * 项目公用插件
 * Created by Sasha on 2018/6/1.
 */
//按需引入iview组件
import {
    Button,
    Input,
    Menu,
    Select,
    OptionGroup,
    Modal,
    Tree,
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
    Upload,
    Tabs,
    Steps,
    Poptip
} from 'iview';
//按需引入element-ui组件
import Table from 'element-ui/lib/table';
import TableColumn from 'element-ui/lib/table-column';
// import Scrollbar from 'element-ui/lib/scrollbar';
import Pagination from 'element-ui/lib/pagination';
import Dropdown from 'element-ui/lib/dropdown';
import DropdownMenu from 'element-ui/lib/dropdown-menu';
import DropdownItem from 'element-ui/lib/dropdown-item';
import scrollbar from 'element-ui/lib/scrollbar';
import elTree from 'element-ui/lib/tree';
import elCheckbox from 'element-ui/lib/checkbox';
import elUpload from 'element-ui/lib/upload';
import elDialog from 'element-ui/lib/dialog';
import elCollapse from 'element-ui/lib/collapse';
import elCollapseItem from 'element-ui/lib/collapse-item';
import Loading  from 'element-ui/lib/loading';

//引入qr-code工具
import QRcode from 'qrcode';
//引入地图工具
import VueAMap from 'vue-amap';


// 按需引入 Echarts 图表
require('echarts/lib/chart/pie');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/legendScroll');
require('echarts/lib/component/dataZoom');

// 引入公用样式，指令及方法等
import klwkUi from 'klwk-ui';

let plugin = {};
plugin.install = function (Vue, options) {
    // 引入iView
    // Vue.use(iView);

    // element-ui按需引入
    Vue.use(scrollbar);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Pagination);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(elTree);
    Vue.use(elCheckbox);
    Vue.use(elUpload);
    Vue.use(elDialog);
    Vue.use(elCollapse);
    Vue.use(elCollapseItem);
    Vue.use(Loading);

    //iview按需引入
    Vue.component('Button',Button);
    Vue.component('iButton',Button);
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
    Vue.component('Tree',Tree);
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
    Vue.component('Tabs',Tabs);
    Vue.component('TabPane',Tabs.Pane);
    Vue.component('Steps',Steps);
    Vue.component('Step',Steps.Step);
    Vue.component('Poptip',Poptip);
    Vue.prototype.$Message = Message;
    Vue.prototype.$QRcode = QRcode;

    // 公用样式，指令及方法
    Vue.use(klwkUi);
    Vue.use(VueAMap);

    //全局注入获取经纬度插件
    VueAMap.initAMapApiLoader({
        key: '91e8fc59f5a65ca490ce419c646b7b35',
        plugin: ['Geolocation'],
        v: '1.4.4'
    });

    // 注入全局变量
    Vue.mixin({
        components: {},
        filters: {
            // 时间格式化过滤器
            timeFormat(value, format = 'yyyy/MM/dd', emptyVal = '-') {
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
            },
            //货比格式化
            moneyFilter(content) {
                if (content === '' || content === null || content === undefined) {
                    return '-';
                } else {
                    return content === 0 ? '0.00' : Number(content).toCurrency();
                }
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
