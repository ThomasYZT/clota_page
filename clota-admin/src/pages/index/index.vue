<!--首頁-->

<template>
    <div class="index-page">
        <div class="time-chose">
            <Select v-model="dataType" style="width:224px">
                <Option v-for="item in dataList"
                        :value="item.value"
                        :key="item.value">
                    {{ item.label }}
                </Option>
            </Select>
            <DatePicker type="daterange"
                        placement="bottom-end"
                        style="width: 224px">
            </DatePicker>
        </div>
        <div class="top-data">
            <!--今日登陆-->
            <top-data :label-name="$t('todayLogin')"
                      :label-rate="23"
                      :label-num="100"
                      :icon="require('../../assets/images/icon-login-count.svg')"
                      label-curve="up">
            </top-data>
            <!--旅游产品订单-->
            <top-data :label-name="$t('travelOrder')"
                      :label-rate="23"
                      :label-num="100"
                      :icon="require('../../assets/images/icon-travel-order.svg')"
                      label-curve="up">
            </top-data>
            <!--交易金额-->
            <top-data :label-name="$t('tenementCount')"
                      :label-rate="23"
                      :label-num="100"
                      :icon="require('../../assets/images/icon-trade-money.svg')"
                      label-curve="up">
            </top-data>
            <!--租户累计-->
            <top-data :label-name="$t('serverCount')"
                      :label-rate="23"
                      :label-num="100"
                      :icon="require('../../assets/images/icon-lessee-count.svg')"
                      label-curve="down">
            </top-data>
        </div>
        <div class="abnormal">
            <!--异常事件报警-->
            <abnormal-warn>
            </abnormal-warn>
            <!--租户所在地饼图-->
            <lessee-place>
            </lessee-place>
        </div>
        <div class="server-info">
            <!--服务器列表-->
            <server-list>
            </server-list>
            <!--排行榜-->
            <rank-list>
            </rank-list>
        </div>
    </div>
</template>

<script>
    import topData from './child/topData';
    import abnormalWarn from './child/abnormalWarn';
    import lesseePlace from './child/lesseePlace';
    import serverList from './child/serverList';
    import rankList from './child/rankList';

    export default {
        components: {
            topData,
            abnormalWarn,
            lesseePlace,
            serverList,
            rankList
        },
        data() {
            return {
                //数据类型
                dataType: '',
                //类型列表
                dataList: [
                    {
                        label: '运营数据大盘',
                        value: ''
                    }
                ]
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .index-page {
        padding: 12px 100px 0 100px;
        background: $color_f4f6f9;
        @include block_outline();
        @include padding_place();
        overflow: auto;

        &:after{
            background: $color_f4f6f9;
        }

        .time-chose {
            .ivu-select {
                margin-right: 17px;
            }
        }

        .top-data,
        .abnormal,
        .server-info {
            overflow: auto;
            margin-top: 15px;
        }
    }
</style>
