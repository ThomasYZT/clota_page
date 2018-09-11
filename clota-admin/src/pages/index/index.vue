<!--首頁-->

<template>
    <div class="index-page">
        <div class="time-chose">
            <DatePicker type="date"
                        v-model="date"
                        :editable="false"
                        :clearable="false"
                        placement="bottom-end"
                        style="width: 224px"
                        @on-change="dateChange">
            </DatePicker>
        </div>
        <div class="top-data">
            <!--今日登陆-->
            <top-data :label-name="$t('todayLogin')"
                      :label-rate="logCountData.contrastWithYesterday"
                      :label-num="logCountData.loginCount"
                      :icon="require('../../assets/images/icon-login-count.svg')"
                      label-curve="up">
            </top-data>
            <!--旅游产品订单-->
            <top-data :label-name="$t('travelOrder')"
                      :label-rate="travelOrderData.contrastWithYesterday"
                      :label-num="travelOrderData.orderCount"
                      :icon="require('../../assets/images/icon-travel-order.svg')"
                      label-curve="up">
            </top-data>
            <!--租户累计-->
            <top-data :label-name="$t('tenementCount')"
                      :label-rate="tenantCountData.contrastWithYesterday"
                      :label-num="tenantCountData.tenantCount"
                      :icon="require('../../assets/images/icon-trade-money.svg')"
                      label-curve="up">
            </top-data>
            <!--服务器数量-->
            <top-data :label-name="$t('serverCount')"
                      :label-num="serverCountData.serverCount"
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
    import ajax from '@/api/index.js';

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
                //数据统计时间
                date : new Date(),
                //登录统计数据
                logCountData : {
                    //同比上周
                    contrastWithYesterday : 0,
                    //今日登录
                    loginCount : 0
                },
                //旅游产品订单数据
                travelOrderData : {
                    //同比上周
                    contrastWithYesterday : 0,
                    //旅游产品订单
                    orderCount : 0
                },
                //租户累计数据
                tenantCountData : {
                    //同比上周
                    contrastWithYesterday : 0,
                    //租户累计数
                    tenantCount : 0,
                },
                //服务器数据
                serverCountData : {
                    //同比上周
                    contrastWithYesterday : 0,
                    //服务器数量
                    serverCount : 0,
                }
            }
        },
        methods: {
            /**
             * 获取当前登录的用户数
             */
            getLoginCount () {
                ajax.get('loginCount',{
                    date : this.date.format('yyyy-MM-dd 00:00:00')
                }).then(res => {
                    if(res.status === 200){
                        this.logCountData = res.data;
                    }else{
                        this.logCountData.contrastWithYesterday = '-';
                        this.logCountData.loginCount = '-';
                    }
                }).catch(err => {
                    this.logCountData.contrastWithYesterday = '-';
                    this.logCountData.loginCount = '-';
                });
            },
            /**
             * 获取旅游产品订单数
             */
            getOrderCount () {
                ajax.get('orderCount',{
                    date : this.date.format('yyyy-MM-dd 00:00:00')
                }).then(res => {
                    if(res.status === 200){
                        this.travelOrderData = res.data;
                    }else{
                        this.logCountData.contrastWithYesterday = '-';
                        this.logCountData.orderCount = '-';
                    }
                }).catch(err => {
                    this.logCountData.contrastWithYesterday = '-';
                    this.logCountData.orderCount = '-';
                });
            },
            /**
             * 获取租户累计数据
             */
            getTenantCount () {
                ajax.get('tenantCount',{
                    date : this.date.format('yyyy-MM-dd 00:00:00')
                }).then(res => {
                    if(res.status === 200){
                        this.tenantCountData = res.data;
                    }else{
                        this.tenantCountData.contrastWithYesterday = '-';
                        this.tenantCountData.tenantCount = '-';
                    }
                }).catch(err => {
                    this.tenantCountData.contrastWithYesterday = '-';
                    this.tenantCountData.tenantCount = '-';
                });
            },
            /**
             * 获取服务器数据
             */
            getServerCount () {
                ajax.get('serverCount',{
                    date : this.date.format('yyyy-MM-dd 00:00:00')
                }).then(res => {
                    if(res.status === 200){
                        this.serverCountData = res.data;
                    }else{
                        this.serverCountData.contrastWithYesterday = '-';
                        this.serverCountData.serverCount = '-';
                    }
                }).catch(err => {
                    this.serverCountData.contrastWithYesterday = '-';
                    this.serverCountData.serverCount = '-';
                });
            },
            /**
             * 日期改变，重新获取数据
             */
            dateChange () {
                this.getLoginCount();
                this.getOrderCount();
                this.getTenantCount();
                this.getServerCount();
            }
        },
        created () {
            this.getLoginCount();
            this.getOrderCount();
            this.getTenantCount();
            this.getServerCount();
        }
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
