/**
 * 项目公用插件
 * Created by Sasha on 2018/6/1.
 */
//按需引入vux组件
import {
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
    DatetimePlugin
} from 'vux';


// 引入公用样式，指令及方法等
import klwkUi from 'klwk-ui';
import VueBarcode from '@xkeshi/vue-barcode';
//引入地图工具
import VueAMap from 'vue-amap';


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
    Vue.use(DatetimePlugin);
    Vue.use(AlertPlugin);

    Vue.directive('transfer-dom', TransferDom);
    Vue.directive('click-outside', ClickOutsideDirective);

    Vue.use(WechatPlugin);
    //地图插件
    Vue.use(VueAMap);

    VueAMap.initAMapApiLoader({
        key : '91e8fc59f5a65ca490ce419c646b7b35',
        plugin : ['Geolocation'],
        v : '1.4.4'
    });

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
                if (content === '' || content === null || content === undefined) {
                    return '-';
                } else {
                    return content;
                }
            },
            //货比格式化
            moneyFilter (content,places = 2,symbol = '',defaultValue = '-') {
                if (content === '' || content === null || content === undefined) {
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
