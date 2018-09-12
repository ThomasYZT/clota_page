<template>
    <div class="klwk-city-select">
        <!-- 触发器 -->
        <div ref="Input"
             class="klwk-city-select-input"
             :class="{
                disabled: disabled
            }"
             @mouseenter="hovering = true"
             @mouseleave="hovering = false"
             @mousedown.stop="()=>{}"
             @click="onClickInput($event)">
            <input v-model="curVal"
                   type="text"
                   readonly
                   :placeholder="placeholder">
            <!-- 尾部图标 -->
            <div class="suffix"
                 @click="onClickSuffix($event)">
                <!-- 清除 -->
                <span class="icon-clear el-icon-circle-close"
                      v-if="iconClearShow">
                </span>
                <!-- 箭头 -->
                <span class="icon-arrow-down el-icon-arrow-down"
                      :class="{
                        'visible': visible
                    }"
                      v-else>
                </span>
            </div>
        </div>
        <!-- dropdown -->
        <transition name="klwk-dropdown">
            <div ref="Drop"
                 class="klwk-cityselect-dropdown"
                 :style="style"
                 :data-transfer="transfer"
                 v-transfer-dom
                 v-show="visible"
                 @mousedown.stop="()=>{}">
                <div class="data-tabs clearfix">
                    <div class="tab" :class="{active: view === 'p'}" @click="view = 'p'">省份</div>
                    <div class="tab" :class="{active: view === 'c'}" v-if="'a,c'.includes(type)" @click="view = 'c'">
                        城市
                    </div>
                    <div class="tab" :class="{active: view === 'a'}" v-if="type === 'a'" @click="view = 'a'">区域</div>
                </div>
                <div class="data-container clearfix"
                     :class="{[view]: true}">
                    <!-- 省 -->
                    <div class="p-section"
                         :key="key"
                         v-show="view === 'p'"
                         v-for="(arr, key) in provinces">
                        <div class="p-key">{{key}}</div>
                        <div class="p-container clearfix">
                            <div class="select-item"
                                 :key="i + key"
                                 v-for="(item, i) in arr"
                                 @click="onClickItem(item)">
                                <div :class="{
                                    active: select.province && select.province.provinceid === item.provinceid
                                }" v-w-title="item.province">
                                    {{item.province}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 市 -->
                    <div class="select-item c"
                         :key="i + 'c'"
                         v-show="view === 'c'"
                         v-for="(item, i) in cityInfoList"
                         @click="onClickItem(item)">
                        <div
                            :class="{
                                active: select.city && select.city.cityid === item.cityid
                            }"
                            v-w-title="item.city">
                            {{item.city}}
                        </div>
                    </div>
                    <!-- 区 -->
                    <div class="select-item a"
                         :key="i + 'a'"
                         v-show="view === 'a'"
                         v-for="(item, i) in areaInfoList"
                         @click="onClickItem(item)">
                        <div
                            :class="{
                                active: select.area && select.area.areaid === item.areaid
                            }"
                            v-w-title="item.area">
                            {{item.area}}
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import dom from '@/utils/domUtils';
    // import provinces from './dicts/provinces';
    // import citys from './dicts/citys';
    // import areas from './dicts/areas';
    import {commonFunc} from 'klwk-ui'
    import ajax from '@/api/index.js';

    export default {
        name: 'KCityPicker',
        props: {
            // 类型 {string} 只选到省、市、区，分别传'p' 'c' 'a'，默认：'a'
            type: {
                type: String,
                default: 'a'
            },
            // 是否将弹层放置在 body 内 {boolean} 默认：true
            transfer: {
                type: Boolean,
                default: true
            },
            // 是否禁用组件 {boolean} 默认：false
            disabled: {
                type: Boolean,
                default: false
            },
            // 占位文本
            placeholder: {
                type: String,
                default: '请选择'
            },
            //默认选中省、市、区信息
            defaultValue : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data() {
            return {
                // 当前显示内容
                curVal: '',
                // 是否可见dropdown
                visible: false,
                // dropdown样式
                style: null,
                // 是否是hover状态
                hovering: false,
                // 当前所在视图 'p'：省，'c'：市，'a'：区
                view: 'p',
                // 展示数据
                provinces: {
                    'A-G': [],
                    'H-K': [],
                    'L-S': [],
                    'T-Z': []
                },
                citys: [],
                areas: [],
                // 选择结果
                select: {
                    province: null,
                    city: null,
                    area: null,
                    value: ''
                },
                //省份信息列表展示
                provinceInfoList : [],
                //市区信息列表展示
                cityInfoList : [],
                //区县列表
                areaInfoList : []
            }
        },
        computed: {
            // 清除图标可见
            iconClearShow() {
                return !this.disabled && this.hovering && this.curVal
            }
        },
        methods: {
            /**
             * 图标点击
             */
            onClickSuffix(ev) {
                if (this.iconClearShow) {
                    this.select.province = this.select.city = this.select.area = null
                    this.callback()

                    ev.stopPropagation()
                }
            },
            /**
             * 点击触发器
             */
            onClickInput(ev) {
                if (this.disabled) return

                if (this.visible) {
                    this.hide()
                } else {
                    this.show()
                }
            },
            /**
             * 点击选项
             */
            onClickItem(data) {
                // 根据不同视图存储不同数据
                switch (this.view) {
                    case 'p':
                        this.select.province = data
                        // 如果类型只选到省则直接回调
                        if (this.type === 'p') {
                            this.callback()
                            this.hide()
                        } else {
                            this.queryCityInfoList(data.provinceid);
                        }
                        break
                    case 'c':
                        this.select.city = data
                        // 如果类型只选到省则直接回调
                        if (this.type === 'c') {
                            this.callback()
                            this.hide()
                        } else {
                            this.getSysAreassByCityid(data.cityid);
                        }
                        break
                    case 'a':
                        this.select.area = data
                        if (this.type === 'a') {
                            this.callback()
                            this.hide()
                        }
                        break
                }
            },
            /**
             * 回调数据
             */
            callback() {
                // 合理清空数据
                switch (this.type) {
                    case 'p':
                        this.select.city = this.select.area = null
                        break
                    case 'c':
                        this.select.area = null
                        break
                    case 'a':
                        break
                }

                this.curVal = this.select.value = (this.select.province && this.select.province.province || '')
                    + (this.select.city && (`${this.select.city.city}`) || '')
                    + (this.select.area && (`${this.select.area.area}`) || '')
                this.$emit('select', this.select);
            },
            /**
             * 选择选项
             * @param {object} 选项 {province:'', city:'', area: '', value}
             */
            setSelect(option) {
                if (option) {
                    // 如果参数value则按 value
                    if (option.value) {
                        this.curVal = this.select.value = option.value
                    } else {
                        // 根据 code 选中对应的数据
                        if (option.province) {
                            this.select.province = provinces.find(item => item.code === option.province)
                        }

                        if (option.city) {
                            this.select.city = citys.find(item => item.code === option.city)
                        }

                        if (option.area) {
                            this.select.area = areas.find(item => item.code === option.area)
                        }

                        this.curVal = this.select.value = (this.select.province && this.select.province.name || '')
                            + (this.select.city && this.select.city.name || '')
                            + (this.select.area && this.select.area.name || '')
                    }
                } else {
                    this.select.province = null
                    this.select.city = null
                    this.select.area = null
                    this.curVal = ''
                }
            },
            /**
             * 直接设置文本
             */
            setValue(value) {
                this.setSelect({value});
            },
            show() {
                if (this.visible) return

                // 初始化
                this.view = 'p'

                this.$nextTick(() => {
                    this.visible = true
                    this.setPos()
                })
            },
            /**
             * 定位
             */
            setPos() {
                if (!this.visible) return

                this.style = null

                this.$nextTick(() => {
                    const input = this.$refs.Input
                    const inputRc = input.getBoundingClientRect()
                    const dropdown = this.$refs.Drop

                    let style = {bottom:''};

                    // 如果弹层在body内定位
                    if (this.transfer) {
                        style.left = `${inputRc.left}px`
                        // 如果弹层超出底线则显示在上方
                        if (inputRc.bottom + dropdown.offsetHeight + 5 >= window.innerHeight) {
                            const newTop = inputRc.top - dropdown.offsetHeight - 10
                            // 如果新位置小于顶部则继续显示在底部
                            if (newTop < 0) {
                                style.top = `${inputRc.bottom}px`
                            } else {
                                style.top = `${newTop}px`
                                style.bottom = `${window.innerHeight - inputRc.top}px`
                            }
                        } else {
                            style.top = `${inputRc.bottom}px`
                        }
                    } else {
                        style = {
                            left: 0,
                            top: `${inputRc.height}px`
                        }
                    }

                    this.style = style
                })
            },
            hide() {
                if (!this.visible) return
                this.visible = false
            },
            /**
             * 初始化数据
             * @param
             */
            init(type) {
                if (type) {
                    let pCode = ''
                    switch (type) {
                        case 'c':
                            pCode = this.select.province.code
                            // this.citys = this.cityInfoList.filter(city => {
                            //     city.city = city.city.split('市')[0]
                            //     city.city = city.city.split('市')[0]
                            //     city.city = city.city.split('县')[0]
                            //     return city.cityid === pCode && city.city
                            // })
                            break
                        case 'a':
                            pCode = this.select.city.code
                            this.areas = this.areaInfoList.filter(area => {
                                return area.cityCode === pCode && area.name
                            })
                            break
                    }
                } else {
                    // 先排序再初始化数据
                    this.provinceInfoList.sort((a, b) => {
                        let pinyin = commonFunc.getNamePinYin(a.province)
                        let pinyin1 = commonFunc.getNamePinYin(b.province)
                        if (a.province.includes('重庆')) pinyin = 'chongqingshi'
                        if (b.province.includes('重庆')) pinyin1 = 'chongqingshi'

                        a.fstCh = pinyin[0]
                        b.fstCh = pinyin1[0]

                        return pinyin > pinyin1 ? 1 : -1
                    }).forEach(province => {
                        // 整改文案
                        // province.province = province.province.split('省')[0]
                        // province.province = province.province.split('市')[0]
                        // province.province = province.province.split('自治区')[0]
                        // province.province = province.province.split('壮族')[0]
                        // province.province = province.province.split('回族')[0]
                        // province.province = province.province.split('维吾尔')[0]

                        if (province.fstCh >= 'a' && province.fstCh <= 'g') {
                            this.provinces['A-G'].push(province)
                        }
                        if (province.fstCh >= 'h' && province.fstCh <= 'k') {
                            this.provinces['H-K'].push(province)
                        }
                        if (province.fstCh >= 'l' && province.fstCh <= 's') {
                            this.provinces['L-S'].push(province)
                        }
                        if (province.fstCh >= 't' && province.fstCh <= 'z') {
                            this.provinces['T-Z'].push(province)
                        }
                    })
                }
            },
            /**
             * 获取省份列表
             */
            listProvince () {
                ajax.post('getProvinceList').then(res => {
                    if(res.success){
                        this.provinceInfoList = res.data ? res.data : [];
                        this.init()
                    }else{
                        this.provinceInfoList = [];
                    }
                })
            },
            /**
             * 根据省id获取市信息
             * @param provinceId
             */
            queryCityInfoList (provinceId) {
                ajax.post('getCityList',{
                    provinceid : provinceId
                }).then(res => {
                    if(res.success){
                        this.cityInfoList = res.data ? res.data : [];
                        // 加载对应省下的市数据
                        this.init('c')
                        // 如果没有市数据则选择本身，且清空下级数据
                        if (!this.cityInfoList.length) {
                            this.select.city = this.select.area = null
                            this.callback()
                            this.hide()
                        } else {
                            this.view = 'c'
                        }
                    }else{
                        this.cityInfoList = [];
                    }
                })
            },
            /**
             * 根据市id获取区县
             * @param cityid
             */
            getSysAreassByCityid (cityid) {
                ajax.post('getAreaList',{
                    cityid : cityid
                }).then(res => {
                   if(res.success){
                       this.areaInfoList = res.data ? res.data : [];
                       // 加载对应省下的市数据
                       this.init('a')

                       // 如果没有区数据则选择本身，且清空下级数据
                       if (!this.areaInfoList.length) {
                           this.select.area = null
                           this.callback()
                           this.hide()
                       } else {
                           this.view = 'a'
                       }
                   }else{
                       this.areaInfoList = [];
                   }
                });
            },
            /**
             * 设置默认选中的值
             */
            setDefaultValue (){

                if (this.defaultValue.province) {
                    this.select.province = this.defaultValue.province;
                }

                if (this.defaultValue.city) {
                    this.select.city = this.defaultValue.city;
                }

                if (this.defaultValue.area) {
                    this.select.area = this.defaultValue.area;
                }

                this.curVal = this.select.value = (this.select.province && this.select.province.province || '')
                    + (this.select.city && this.select.city.city || '')
                    + (this.select.area && this.select.area.area || '')
            }
        },
        created () {
          this.listProvince();
        },
        mounted() {
            const mousedown = document.onmousedown
            document.onmousedown = (ev) => {
                if (mousedown) mousedown(ev)
                // 点击外部隐藏
                this.hide()
            }

            // 如果弹层放置在body中，则跟随滚动
            const resizeFunc = window.onresize
            window.onresize = (ev) => {
                if (resizeFunc) resizeFunc(ev)
                this.setPos()
            }

            if (this.transfer) {
                const scrollEls = dom.getAllHasScrollParentEls(this.$refs.Input)
                scrollEls.forEach(el => {
                    const scrollFunc = el.onscroll
                    el.onscroll = (ev) => {
                        if (scrollFunc) scrollFunc(ev)
                        this.setPos()
                    }
                })
            }
        },
        watch : {
            'defaultValue' : {
                handler (newVal,oldVal) {
                    this.setDefaultValue();
                },
                deep : true,
                immediate : true
            }
        }
    }
</script>

<style lang="scss">
    $hoverColor: #C5C5C5;
    $highLightColor: #1875F0;

    .klwk-dropdown-enter-active,
    .klwk-dropdown-leave-active {
        transition: all .2s ease-in-out;
    }

    .klwk-dropdown-enter,
    .klwk-dropdown-leave-to {
        transform: translateY(6px);
        opacity: 0;
    }

    .klwk-city-select {
        position: relative;
        display: inline-block;
        width: 100%;
    }

    .klwk-city-select-input {
        position: relative;
        width: 100%;
        input {
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
            padding-right: 30px;
            border: 1px solid #dddee1;
            background-color: transparent;
            border-radius: 4px;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: all .2s ease-in-out;
            cursor: pointer;
        }
        .suffix {
            position: absolute;
            display: flex;
            right: 5px;
            top: 0;
            height: 100%;
            width: 24px;
            z-index: 6;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .icon-arrow-down {
                display: inline-block;
                transition: all .2s ease-in-out;
                color: #C5C5C5;
                &.visible {
                    transform: rotate(180deg);
                }
            }
            &:hover {
                .icon-clear:before {

                }
            }
        }
        &:not(.disabled) {
            &:hover {
                input {
                    border-color: $hoverColor;
                }
            }
            input:focus,
            &:hover input:focus {
                border-color: $highLightColor;
            }
        }
        // 禁用
        &.disabled {
            input,
            .suffix {
                color: #ccc;
                cursor: not-allowed;
            }
            input {
                background-color: #f3f3f3;
            }
        }
    }

    .klwk-cityselect-dropdown {
        position: absolute;
        width: 420px;
        margin: 2px 0;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        z-index: 2230;

        .clearfix {
            &:after {
                display: block;
                clear: both;
                content: '';
            }
        }

        .data-tabs {
            height: 40px;
            background: #FAFAFA;
            border-bottom: 1px solid #DFE3E9;
            .tab {
                display: flex;
                float: left;
                width: 64px;
                height: 100%;
                font-size: 12px;
                color: #999999;
                letter-spacing: 0.86px;
                justify-content: center;
                align-items: center;
                transition: all .2s ease-in-out;
                cursor: pointer;
                &:not(:first-child) {
                    border-left: 1px solid #DFE3E9;
                }
                &.active {
                    color: $highLightColor;
                    background: #fff;
                }
            }
        }

        .data-container {
            padding: 17px 0 11px;

            .p-section {
                position: relative;
            }

            .p-key {
                position: absolute;
                left: 0;
                top: 0;
                width: 64px;
                padding-top: 6px;
                font-size: 12px;
                color: #333333;
                letter-spacing: 0.86px;
                text-align: center;
            }

            .p-container {
                padding-left: 64px;
            }

            .select-item {
                float: left;
                width: 70px;
                margin-bottom: 6px;
                cursor: pointer;
                > div {
                    display: inline-block;
                    height: 24px;
                    max-width: 100%;
                    padding: 0 12px;
                    line-height: 24px;
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 1px;
                    transition: all .2s ease-in-out;
                    border-radius: 2px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;

                    &:hover,
                    &.active {
                        color: #fff;
                        background-color: $highLightColor;
                    }
                }

                &.c,
                &.a {
                    width: 75px;
                }
            }

            &.c,
            &.a {
                padding-left: 25px;
            }
        }
    }
</style>
