/**
 * 项目公用插件
 * Created by Sasha on 2018/6/1.
 */
//按需引入vux组件
import {
    Checklist,
    XInput,
    Group,
    XButton,
    PopupPicker,
    Swiper,
    SwiperItem,
    Radio,
    Cell,
    Icon,
    Qrcode,
    Popup,
    PopupHeader,
    TransferDom,
    ToastPlugin,
    ClickOutsideDirective,
    Tab,
    TabItem,
    Sticky,
    Previewer,
    Drawer,
    CellBox,
    Confirm ,
    CheckIcon ,
    Loading ,
    Countdown ,
    XDialog,
    WechatPlugin ,
    Tabbar,
    TabbarItem,
    Datetime,
    InlineXNumber,
    AlertPlugin,
    PopupRadio,
    DatetimePlugin,
    Popover,
    XNumber,
    LoadingPlugin
} from 'vux';


// 引入公用样式，指令及方法等
import klwkUi from 'klwk-ui';
import VueBarcode from '@xkeshi/vue-barcode';


// // 按需引入 Echarts 图表
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/legendScroll');


let plugin = {};
plugin.install = function (Vue, options) {

    //一维码插件
    Vue.component(VueBarcode.name, VueBarcode);

    //以插件形式引入vux toast组件
    Vue.use(ToastPlugin,{ position : 'middle' });

    //vux按需引入
    Vue.component( 'XInput', XInput);
    Vue.component( 'Group', Group);
    Vue.component( 'Checklist', Checklist);
    Vue.component( 'XButton', XButton);
    Vue.component( 'popup-picker', PopupPicker);
    Vue.component('swiper', Swiper);
    Vue.component('swiper-item', SwiperItem);
    Vue.component('Radio', Radio);
    Vue.component('Cell', Cell);
    Vue.component('Icon', Icon);
    Vue.component('Qrcode', Qrcode);
    Vue.component('popup-header', PopupHeader );
    Vue.component('Popup', Popup );
    Vue.component('Tab', Tab );
    Vue.component('TabItem', TabItem );
    Vue.component('Sticky', Sticky );
    Vue.component('previewer', Previewer);
    Vue.component('drawer', Drawer);
    Vue.component('cell-box', CellBox);
    Vue.component('confirm', Confirm);
    Vue.component('check-icon', CheckIcon);
    Vue.component('loading', Loading);
    Vue.component('countdown', Countdown);
    Vue.component('x-dialog', XDialog);
    Vue.component('Tabbar', Tabbar);
    Vue.component('TabbarItem', TabbarItem);
    Vue.component('Datetime', Datetime);
    Vue.component('InlineXNumber', InlineXNumber);
    Vue.component('PopupRadio', PopupRadio);
    Vue.component('Popover', Popover);
    Vue.component('XNumber', XNumber);
    Vue.use(LoadingPlugin);
    Vue.use(DatetimePlugin);
    Vue.use(AlertPlugin);

    Vue.directive('transfer-dom', TransferDom);
    Vue.directive('click-outside', ClickOutsideDirective);

    Vue.use(WechatPlugin);

    // 公用样式，指令及方法
    // Vue.use(klwkUi);

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
                let contentVal = String(content).trim();
                if (contentVal === '' || contentVal === null || typeof contentVal === 'undefined') {
                    return '-';
                } else {
                    return contentVal;
                }
            },
            //货比格式化
            moneyFilter (content,places = 2,symbol = '',defaultValue = '-') {
                if (content === '' || content === null || typeof content === 'undefined') {
                    return defaultValue;
                } else {
                    return content === 0 ? '0.00' : Number(content).formatMoney(places,symbol);
                }
            }
        },
        created () {

        }
    });

};

export default plugin;
