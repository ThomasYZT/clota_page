/**
 * 项目公用插件
 * Created by Sasha on 2018/6/1.
 */
//按需引入vux组件
// import {
//     Group,
//     XButton
// } from 'vux';
import XInput from '../../utils/vux/components/x-input/index.min';
import XButton from '../../utils/vux/components/x-button/index.min';
import Group from '../../utils/vux/components/group/index.min';
//引入vux指令
import TransferDom from '../../utils/vux/directives/transfer-dom/index.min';


// // 按需引入 Echarts 图表
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/legendScroll');


// 引入公用样式，指令及方法等
import klwkUi from 'klwk-ui';

let plugin = {};
plugin.install = function (Vue, options) {

    //vux按需引入
    Vue.component( 'XInput', XInput);
    Vue.component( 'Group', Group);
    Vue.component( 'XButton', XButton);

    //vux全局指令
    Vue.directive('transfer-dom', TransferDom);

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

        }
    })

};

export default plugin;
