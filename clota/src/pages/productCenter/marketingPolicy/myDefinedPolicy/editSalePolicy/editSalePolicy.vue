<!--
内容：产品列表 - 销售政策列表 - 新建销售政策
作者：
日期：
-->

<template>
    <div class="edit-sale-policy">

        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="localeRouter">
        </bread-crumb-head>

        <div class="container">
            <!-- 基础信息 -->
            <baseInfo ref="baseInfo"></baseInfo>
            <!-- 政策可售期 -->
            <saleRule ref="saleRule"
                      :specialHoliday="specialHoliday"
                      @queryDatePlanList="queryDatePlanList"></saleRule>
            <!-- 游玩规则 -->
            <playRule ref="playRule"
                      :specialHoliday="specialHoliday"
                      @queryDatePlanList="queryDatePlanList"></playRule>
            <!-- 产品信息 -->
            <productInfo ref="productInfo"></productInfo>
            <!-- 销售渠道 -->
            <saleChannels ref="saleChannels"></saleChannels>
            <!-- 全民营销 -->
            <marketInfo ref="marketInfo"
                        v-if="hasMarket === 'true'"></marketInfo>
            <!-- 退改规则 -->
            <returnRule ref="returnRule"></returnRule>

            <!--底部操作-->
            <div class="footer" v-if="canAddSalePolicy">
                <Button type="primary"
                        :loading="loading"
                        @click="formValidateFunc">
                    {{$t('save')}}
                </Button>
                <Button type="ghost"
                        @click="goBack">
                    {{$t("cancel")}}

                </Button>
            </div>

        </div>

    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import baseInfo from './child/baseInfo';
    import saleRule from './child/saleRule';
    import playRule from './child/playRule';
    import productInfo from './child/productInfo';
    import saleChannels from './child/saleChannels';
    import marketInfo from './child/marketInfo';
    import returnRule from './child/returnRule';
    import { specialHoliday } from '@/assets/js/constVariable';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import pick from 'lodash/pick';
    import defaultsDeep from 'lodash/defaultsDeep';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            baseInfo,
            saleRule,
            playRule,
            productInfo,
            saleChannels,
            marketInfo,
            returnRule,
        },
        data () {
            return {
                //新增/修改 add/modify
                type : 'add',
                //面包屑上级路由信息
                beforeRouterList : [
                    {
                        name : 'marketingPolicy', //  销售政策列表
                        router : {
                            name : 'marketingPolicy'
                        },
                    }
                ],
                loading : false,
                //控制点选日期控件显示/隐藏
                open : true,
                //表单数据
                formData : {
                    //政策id
                    id : '',
                    //业态类型 ticket-票类，repast-餐饮，hotel-酒店，ticket_package-套票
                    productType : 'ticket',

                },
                //是否有全名营销模块
                hasMarket : 'false',
                //枚举数据
                enumData : {
                    //指定日期-节假日
                    specialHoliday : specialHoliday,
                },
                //指定日期-节假日
                specialHoliday : specialHoliday,
            };
        },
        created () {
            //获取有效的假期数据
            this.queryDatePlanList();
        },
        methods : {
            /**
             *  获取自定义日期方案
             */
            queryDatePlanList () {
                this.specialHoliday = this.enumData.specialHoliday;
                ajax.post('queryDatePlanList').then(res => {
                    if (res.success) {
                        this.specialHoliday = res.data ? this.enumData.specialHoliday.concat(res.data.map((item) => {
                                return {
                                    //日期方案id
                                    id : item.id,
                                    //日期方案名称
                                    holidayName : item.name,
                                    //是否是系统日期方案
                                    isSystem : item.isSystem,
                                    //日期数据
                                    rangeDates : item.dateList,

                                }
                            })) : this.enumData.specialHoliday;
                    } else {
                        this.specialHoliday = this.enumData.specialHoliday;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             *  表单校验
             */
            formValidateFunc () {
                Promise.all([
                    //校验基础信息表单
                    this.$refs.baseInfo.formValidate(),
                    //校验销售规则表单
                    this.$refs.saleRule.formValidate(),
                    //校验游玩规则表单
                    this.$refs.playRule.formValidate(),
                    //校验产品信息表单
                    this.$refs.productInfo.formValidate(),
                    //校验销售渠道表单
                    this.$refs.saleChannels.formValidate(),
                    //校验全民营销表单
                    this.hasMarket === 'true' ? this.$refs.marketInfo.formValidate() : '',
                    //校验退改规则
                    this.$refs.returnRule.formValidate(),
                ]).then((formData) => {
                    formData.forEach((item) => {
                        if (item) {
                            Object.assign(this.formData, item);
                        }
                    });
                    //渠道和营销等级至少选填其一
                    if (this.hasMarket === 'true') {
                        if (this.formData.saleChannels && this.formData.saleChannels.length < 1 &&
                            this.formData.marketingData && this.formData.marketingData.length < 1) {
                            this.$Message.warning(this.$t('selectMarketingOrSaleChannel'));
                            return;
                        }
                    } else {
                        if (this.formData.saleChannels && this.formData.saleChannels.length < 1) {
                            this.$Message.warning(this.$t('selectField',{ msg : this.$t('saleChannels') }));
                            return;
                        }
                    }
                    //处理表单数据
                    this.packingData();
                }).catch((err) => {
                    console.log(err);
                });

            },
            /**
             *  组装表单数据
             */
            packingData () {
                let params = defaultsDeep({}, this.formData);
                //销售渠道数据
                params.groupIds = this.formData.saleChannels.length > 0 ? this.formData.saleChannels.map( item => {
                    return item.id;
                }).join(',') : '';
                //产品数据
                params.itemsData = JSON.stringify(defaultsDeep([], this.formData.itemsData));
                //销售规则数据
                params.saleRule.weekSold = this.formData.saleRule.weekSold && this.formData.saleRule.weekSold.length > 0 ?
                    this.formData.saleRule.weekSold.join(',') : '';
                params.saleRule.specifiedTime = this.formData.saleRule.type === 'specifiedDateSold' && this.formData.saleRule.specifiedTime && this.formData.saleRule.specifiedTime.length > 0 ?
                    this.formData.saleRule.specifiedTime.map( item => {
                        return new Date(item).format('yyyy-MM-dd');
                    }).join(',') : '';
                params.saleRule.startTime = this.formData.saleRule.time[0] ? new Date(this.formData.saleRule.time[0]).format('yyyy-MM-dd') : '';
                params.saleRule.endTime = this.formData.saleRule.time[1] ? new Date(this.formData.saleRule.time[1]).format('yyyy-MM-dd') : '';
                delete params.saleRule.time;
                params.saleRule = JSON.stringify(params.saleRule);
                //游玩规则数据
                params.playRule.weekSold = this.formData.playRule.weekSold && this.formData.playRule.weekSold.length > 0 ?
                    this.formData.playRule.weekSold.join(',') : '';
                params.playRule.specifiedTime = this.formData.playRule.type === 'specifiedDateSold' && this.formData.playRule.specifiedTime && this.formData.playRule.specifiedTime.length > 0 ?
                    this.formData.playRule.specifiedTime.map( item => {
                        return new Date(item).format('yyyy-MM-dd');
                    }).join(',') : '';
                params.playRule.startTime = this.formData.playRule.time[0] ? new Date(this.formData.playRule.time[0]).format('yyyy-MM-dd') : '';
                params.playRule.endTime = this.formData.playRule.time[1] ? new Date(this.formData.playRule.time[1]).format('yyyy-MM-dd') : '';
                delete params.playRule.time;
                params.playRule = JSON.stringify(params.playRule);

                //退票规则数据
                if (this.formData.returnRule.type === 'notAllow') {
                    params.returnRule.rules = [];
                } else {
                    let rules = [];
                    this.formData.returnRule.rules.forEach(item => {
                        if (!item.active) {
                            rules.push({
                                befPlayStart : item.befPlayStart,
                                befPlayEnd : item.befPlayEnd,
                                procedureRates : item.procedureRates,
                                returnRuleType : item.returnRuleType,
                            });
                        }
                    });
                    params.returnRule.rules = rules;
                }
                params.returnRule = JSON.stringify(params.returnRule);
                //改签规则数据
                if (this.formData.alterRule.type === 'notAllow') {
                    params.alterRule.befPlayLatestDays = '';
                    params.alterRule.alterNum = '';
                }
                params.alterRule = JSON.stringify(params.alterRule);

                params.saleStartTime = this.formData.saleTime[0];
                params.saleEndTime = this.formData.saleTime[1];
                params.todaySaleStartTime = this.formData.todaySaleTime[0];
                params.todaySaleEndTime = this.formData.todaySaleTime[1];
                params.checkinTime = this.formData.checkinTime.join('~');
                params.allocationId = this.allocationId || ''; //分销id

                //全民营销表单数据
                params.marketSaleData = JSON.stringify(this.formData.marketingData.map((item) => {
                    return {
                        market_type_id : item.typeId,
                        market_level_id : item.levelId,
                    };
                }));

                delete params.marketingData;
                delete params.saleTime;
                delete params.todaySaleTime;

                //区分新增与修改
                if ( this.type === 'add' ) {
                    this.saveAndEditPolicy( 'addPolicy', params);
                }
                if ( this.type === 'modify' ) {
                    this.saveAndEditPolicy( 'modifyPolicy', params);
                }

            },
            /**
             *  新增/修改销售政策
             *  @param url
             *  @param params
             */
            saveAndEditPolicy ( url, params ) {
                ajax.post(url, params).then(res => {
                    if (res.success) {
                        //区分新增与修改
                        this.$Message.success(this.$t('successTip',{ tip : this.$t(this.type) }));
                        this.goBack();
                    } else {
                        //区分新增与修改
                        this.$Message.error(res.message || this.$t('failureTip',{ tip : this.$t(this.type) }));
                    }
                });
            },
            /**
             *  返回
             */
            goBack () {
                //区分新增与修改
                if ( this.type === 'add' ) {
                    this.$router.push({ name : 'marketingPolicy' });
                }
                if ( this.type === 'modify' ) {
                    this.$router.back();
                }
            },
            /**
             * 获取路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.type = params.type;
                    if (params.productType) {
                        this.formData.productType = params.productType;
                    }
                    if (params.allocationId) {
                        this.allocationId = params.allocationId;
                    }
                    if (params.type === 'modify') {
                        this.initData(params.info);
                    }

                    //查询是否有全民营销模块
                    this.checkOrgServiceById();
                }
            },
            /**
             * 查询是否有全民营销模块
             */
            checkOrgServiceById () {
                ajax.post('checkOrgServiceById', {
                    serviceId : '20'
                }).then(res => {
                    if (res.success) {
                        this.hasMarket = res.data ? res.data : 'false';
                    } else {
                        this.hasMarket = 'false';
                    }
                });
            },
            /**
             * 初始化数据
             * @param data
             */
            initData (data) {
                //公共表单初始化
                let commonForm = pick(data.productPolicy, ['id', 'productType']);

                //基础信息表单初始化
                let baseInfoForm = pick(data.productPolicy, ['name', 'policyDesc']);
                this.$refs.baseInfo.initData(baseInfoForm);

                //销售规则表单初始化
                let saleRuleForm = pick(data.productPolicy, ['saleStartTime', 'saleEndTime', 'todaySaleStartTime', 'todaySaleEndTime']);
                saleRuleForm.saleTime = [data.productPolicy.saleStartTime, data.productPolicy.saleEndTime];
                saleRuleForm.todaySaleTime = [data.productPolicy.todaySaleStartTime, data.productPolicy.todaySaleEndTime];
                saleRuleForm.saleRule = data.productPolicy.saleRuleModel;
                saleRuleForm.saleRule.time = [data.productPolicy.saleRuleModel.startTime, data.productPolicy.saleRuleModel.endTime];
                saleRuleForm.saleRule.beforeDay = data.productPolicy.saleRuleModel.beforeDay ? Number(data.productPolicy.saleRuleModel.beforeDay) : 0;
                saleRuleForm.saleRule.afterDay = data.productPolicy.saleRuleModel.afterDay ? Number(data.productPolicy.saleRuleModel.afterDay) : 1;
                saleRuleForm.saleRule.weekSold = data.productPolicy.saleRuleModel.weekSold ?
                    data.productPolicy.saleRuleModel.weekSold.split(',') : ['1','2','3','4','5'];
                saleRuleForm.saleRule.dateType = 'custom';
                saleRuleForm.saleRule.specifiedTime = data.productPolicy.saleRuleModel.specifiedTime ?
                    data.productPolicy.saleRuleModel.specifiedTime.split(',').map((item) => {
                        return new Date(new Date(item).setHours(0, 0, 0, 0));
                    }) : [];
                this.$refs.saleRule.initData(saleRuleForm);

                //游玩规则表单初始化
                let playRuleForm = {};
                playRuleForm.playRule = data.productPolicy.playRuleModel;
                playRuleForm.playRule.time = [data.productPolicy.playRuleModel.startTime, data.productPolicy.playRuleModel.endTime];
                playRuleForm.playRule.beforeDay = data.productPolicy.playRuleModel.beforeDay ? Number(data.productPolicy.playRuleModel.beforeDay) : 1;
                playRuleForm.playRule.afterDay = data.productPolicy.playRuleModel.afterDay ? Number(data.productPolicy.playRuleModel.afterDay) : 1;
                playRuleForm.playRule.weekSold = data.productPolicy.playRuleModel.weekSold ?
                    data.productPolicy.playRuleModel.weekSold.split(',') : ['1','2','3','4','5'];
                playRuleForm.playRule.dateType = 'custom';
                playRuleForm.playRule.specifiedTime = data.productPolicy.playRuleModel.specifiedTime ?
                    data.productPolicy.playRuleModel.specifiedTime.split(',').map((item) => {
                        return new Date(new Date(item).setHours(0, 0, 0, 0));
                    }) : [];
                if (data.productPolicy.checkinTime.indexOf('~')) {
                    playRuleForm.checkinTime = data.productPolicy.checkinTime.split('~');
                } else {
                    playRuleForm.checkinTime = data.productPolicy.checkinTime.split(',');
                }
                playRuleForm.delayValidTime = data.productPolicy.delayValidTime ? Number(data.productPolicy.delayValidTime) : 0;
                this.$refs.playRule.initData(playRuleForm);

                //退改规则表单初始化
                let returnRuleForm = pick(data.productPolicy, ['buyTicketNotes']);
                returnRuleForm.returnRule = data.productPolicy.returnRuleModel;
                let rules = [];
                data.productPolicy.returnRuleModel.rules.forEach(item => {
                    rules.push({
                        befPlayStart : Number(item.befPlayStart),
                        befPlayEnd : Number(item.befPlayEnd),
                        procedureRates : Number(item.procedureRates),
                        active : false,
                    });
                });
                returnRuleForm.returnRule.rules = rules;
                //改签规则表单初始化
                returnRuleForm.alterRule = data.productPolicy.alterRuleModel;
                returnRuleForm.alterRule.befPlayLatestDays = data.productPolicy.alterRuleModel.befPlayLatestDays ?
                    Number(data.productPolicy.alterRuleModel.befPlayLatestDays) : 10;
                returnRuleForm.alterRule.alterNum = data.productPolicy.alterRuleModel.alterNum ?
                    Number(data.productPolicy.alterRuleModel.alterNum) : 1;
                this.$refs.returnRule.initData(returnRuleForm);


                //销售渠道列表表单初始化
                let saleChannelsForm = {};
                saleChannelsForm.groupIds = data.policyChannels.map( item => {
                    return item.groupId;
                });
                this.$refs.saleChannels.initData(saleChannelsForm);

                //产品列表表单初始化
                let productInfoForm = {
                    itemsData : [],
                };
                data.policyItems.forEach( item => {
                    productInfoForm.itemsData.push({
                        id : item.id,
                        productId : item.productId,
                        productName : item.productName,
                        settlePrice : item.settlePrice,
                        standardPrice : item.standardPrice,
                        stockNum : item.stockNum,
                        stockType : item.stockType,
                        itemRule : item.itemRule ? JSON.parse(item.itemRule) : [],
                    });
                });
                this.$refs.productInfo.initData(productInfoForm);

                //全民营销表单初始化
                let marketInfoForm = {
                    marketingData : [],
                };
                marketInfoForm.marketingData = data.marketSalePriceVos && data.marketSalePriceVos.length > 0 ? data.marketSalePriceVos.map((item) => {
                    return {
                        typeId : item.typeId,
                        typeName : item.typeName,
                        levelId : item.levelId,
                        levelName : item.levelName,
                        editable : false
                    };
                }) : [];
                if (this.hasMarket === 'true') {
                    this.$refs.marketInfo.initData(marketInfoForm);
                }

                this.formData = defaultsDeep( {}, commonForm, baseInfoForm, saleRuleForm, playRuleForm, returnRuleForm,
                    saleChannelsForm, productInfoForm, marketInfoForm );
            },
        },
        computed : {
            ...mapGetters([
                'manageOrgs',
                'permissionInfo',
            ]),
            localeRouter () {
                return this.type === 'add' ? this.$t('addSalePolicy') : this.$t('modifySalePolicy'); // 新建销售政策 ： 修改销售政策
            },
            //新建/修改/提交审核我定义的销售政策
            canAddSalePolicy () {
                return this.permissionInfo && 'addAndModifyPolicy' in this.permissionInfo;
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .edit-sale-policy {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .container{

            /deep/ .ivu-form {
                padding: 10px 0 0;
                text-align: center;
            }

            /deep/ .blue {
                color: $color_blue;
                cursor: pointer;
                &.add-rate{
                    position: relative;
                    display: inline-table;
                    width: 180px;
                    text-align: right;
                    left: calc(100% - 575px);
                }
            }
            /deep/ .red-btn {
                color: $color_red;
                cursor: pointer;
                &.add-rate{
                    position: relative;
                    display: inline-table;
                    width: 180px;
                    text-align: right;
                    left: calc(100% - 575px);
                }
            }

            /deep/ .form-content {
                border-top: 1px dashed $color_979797_020;
                width: 1000px;
                margin: 0 auto;
                padding-top: 20px;

                &:first-child{
                    border-top: none;
                }

                /deep/ .ivu-form-item-label{
                    padding-left: 0;
                }

                .ivu-form-item-wrap{
                    position: relative;
                    display: inline-block;
                    min-width: 495px;
                    width: 49%;
                    text-align: left;
                    vertical-align: middle;

                    .ivu-form-item{
                        width: 395px;
                        margin: 0 auto 18px;
                        text-align: left;

                        /deep/ .ivu-date-picker {
                            display: block;
                        }

                        /deep/ .ivu-select-selected-value,
                        /deep/ .ivu-input{
                            font-size: $font_size_14px;
                        }

                        /deep/ .ivu-input-number{
                            width: 120px;
                            font-size: $font_size_14px;
                        }

                        /deep/ .ivu-date-picker{
                            font-size: $font_size_14px;
                            width: 120px;
                            display: inline-block;
                        }

                        /deep/ .ivu-select{
                            max-width: 395px;
                            clear: both;
                        }

                        /deep/ .ivu-select-item{
                            font-size: $font_size_14px !important;
                        }

                        /deep/ .ivu-input-wrapper{
                            &.short-input{
                                width: 123px;
                                display: inline-block;
                                margin-right: 10px;
                            }
                        }

                        /deep/ .ivu-checkbox-wrapper{
                            margin-right: 24px;
                            &:last-child{
                                margin-right: 0;
                            }
                        }

                        /deep/ .ivu-checkbox{
                            margin-right: 5px;
                        }

                        .label{
                            margin-right: 10px;
                        }

                        .split{
                            margin: 0 10px;
                        }
                    }

                    &.single{
                        width: calc(49% + 455px);
                        padding: 0 24px 0 24px;
                        .ivu-form-item{
                            width: 100%;
                        }
                    }
                    /deep/ .ivu-btn{
                        position: relative;
                        &.week-btn{
                            min-width: 70px;
                            margin-right: 10px;
                            @include overflow_tip();
                            .iconfont{
                                font-size: $font_size_20px;
                                position: absolute;
                                bottom: 0;
                                right: 1px;
                            }
                        }
                    }

                    .notice{
                        font-size: $font_size_14px;
                        color: $color_999;
                        display: inline-block;
                        width: calc(100% - 300px);
                        line-height: 14px;
                        padding-left: 8px;
                        vertical-align: middle;
                    }

                    .custom-row{
                        padding-top: 10px;
                    }

                    .date-table-wrap{
                        width: 400px;
                    }
                    /deep/ .el-input__inner {
                        height: 100%;
                    }
                    /deep/ .el-input__icon {
                        line-height: 28px;
                    }
                }
                .marketing-tip {
                    margin-bottom: 10px;
                    color: $color_yellow;
                }
            }

            .footer {
                text-align: center;

                /deep/ .ivu-btn{
                    min-width: 108px;
                    &:nth-child(1){
                        margin-right: 20px;
                    }
                }

            }

            /deep/ .channel {
                span {
                    margin-right: 13px;
                }

                span.disable {
                    letter-spacing: -1px;
                }
            }
            /deep/ .disable {
                color: $color_red;
            }

        }

        /deep/ .remark {
            color: $color_yellow;
            &:last-child {
                margin-bottom: 20px;
            }
        }

        /deep/ .el-table {
            th {
                padding: 7px 0;
            }
        }

    }
</style>
