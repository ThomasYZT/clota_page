/**
 * 项目公用插件
 * Created by Sasha on 2018/6/1.
 */
import iView from 'iview'
// import {TableColumn, Scrollbar, Pagination, Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
import Table from 'element-ui/lib/table';
import TableColumn from 'element-ui/lib/table-column';
import Scrollbar from 'element-ui/lib/scrollbar';
import Pagination from 'element-ui/lib/pagination';
import Dropdown from 'element-ui/lib/dropdown';
import DropdownMenu from 'element-ui/lib/dropdown-menu';
import DropdownItem from 'element-ui/lib/dropdown-item';

// 引入 ECharts 主模块
// import ECharts from '@/components/vueEcharts/ECharts.vue'
// // 按需引入 Echarts 图表
// require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
// require('echarts/lib/component/title');
// require('echarts/lib/component/tooltip');
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
