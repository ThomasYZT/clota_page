<!--
内容：（团队订单、散客退票、散客改签）筛选器
作者：
日期：
-->

<template>
    <div class="audit-filter">
        <Form ref="formCustom"
              :model="formData"
              :label-width="90"
              :label-position="'left'">
            <i-row>
                <i-col span="6">
                    <!--下单时间-->
                    <FormItem :label="$t('orderTime')">
                        <DatePicker v-model="orderTimeRange"
                                    type="daterange"
                                    :editable="false"
                                    style="max-width: 260px"
                                    @on-change="changeOrderTime">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--游玩时间-->
                    <FormItem :label="$t('visitTime')">
                        <DatePicker v-model="visitDateRange"
                                    type="daterange"
                                    :editable="false"
                                    style="max-width: 260px"
                                    @on-change="changeVisitDate">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--所属景区-->
                    <FormItem :label="$t('scenePlace')">
                        <Select v-model.trim="formData.scenicOrgId"
                                style="max-width: 260px"
                                @on-change="sceneChange">
                            <Option v-for="item  in belongScene"
                                    :key="item.id"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--下单企业-->
                    <FormItem :label="$t('orderOrg')" >
                        <Select v-model="formData.channelId"
                                style="max-width: 260px"
                                @on-change="searchAuditList">
                            <Option v-for="item in orderTakeListDeal"
                                    :key="item.id"
                                    :value="item.id">
                                {{$t(item.orgName)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="6">
                    <!--下单渠道-->
                    <FormItem :label="$t('orderChannel')">
                        <Select v-model="formData.orderChannel"
                                style="max-width: 260px"
                                @on-change="searchAuditList">
                            <Option v-for="item in orderChannelList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label=='all' ? item.label : 'order.' + item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6" v-if="auditName=='group'">
                    <!--支付状态-->
                    <FormItem :label="$t('paymentStatus')" >
                        <Select v-model="formData.paymentStatus"
                                style="max-width: 260px"
                                @on-change="searchAuditList">
                            <Option v-for="item in paymentList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--业态类型-->
                    <FormItem :label="$t('industryType')" >
                        <Select v-model="formData.productType"
                                style="max-width: 260px"
                                @on-change="searchAuditList">
                            <Option value="all">{{$t('all')}}</Option>
                            <Option value="ticket">{{$t('tickets')}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem :label="$t('keywords')" >
                        <Input v-model.trim="formData.keyword"
                               style="max-width: 260px"
                               :placeholder="$t('请输入游客姓名/手机号/订单号/订单明细编号')" /><!--请输入游客姓名/手机号/订单号/订单明细编号-->
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="6" v-if="isRefundAuditPage">
                    <!--过期状态-->
                    <FormItem :label="$t('过期状态')" >
                        <Select v-model="formData.overdue"
                                style="max-width: 260px"
                                @on-change="searchAuditList">
                            <Option v-for="item in overdueStatus"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6" style="float:right;text-align: right">
                    <FormItem >
                        <Button type="primary"
                                class="ivu-btn-90px"
                                @click="searchAuditList">{{$t('searching')}}</Button><!--搜索-->
                        <Button type="ghost"
                                class="ivu-btn-90px reset"
                                @click="reset">{{$t('reset')}}</Button><!--重置-->
                    </FormItem>
                </i-col>
            </i-row>
        </Form>
    </div>
</template>
<script type="text/ecmascript-6">
    import { notDistributorChannelList, payStatusList,overdueStatus } from '@/assets/js/constVariable';
    import { mapGetters } from 'vuex';
    import ajax from '@/api/index';
    import debounce from 'lodash/debounce';

    export default {
        props : {
            // 审核名称
            auditName : {
                type : String,
                default : ''
            },
            //默认筛选条件
            'params-default' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                //表单数据
                formData : {
                    //过期状态
                    overdue : 'all',
                    // 下单起始日期
                    orderStartDate : '',
                    // 下单结束日期
                    orderEndDate : '',
                    // 游玩起始日期
                    visitStartDate : '',
                    // 游玩结束日期
                    visitEndDate : '',
                    // 支付状态（全部、已支付、未支付）
                    paymentStatus : 'allStatus',
                    // 下单企业ID
                    channelId : 'all',
                    // 下单渠道
                    orderChannel : 'allStatus',
                    // 业态类型
                    productType : 'all',
                    // 关键字查询：游客姓名/手机号/订单号/订单明细编号
                    keyword : '',
                    //所属景区
                    scenicOrgId : 'all'
                },
                // 下单渠道列表
                orderChannelList : notDistributorChannelList,
                // 支付状态
                paymentList : payStatusList,
                // 过期状态
                overdueStatus : overdueStatus,
                // 下单时间范围
                orderTimeRange : [],
                // 游玩日期范围
                visitDateRange : [],
                // 重置使用的初始筛选条件
                resetFormData : {},
                //所属景区列表
                belongScene : [],
                //下单企业列表
                orderTakeList : [],
            };
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //下单企业信息
            orderTakeListDeal () {
                return [].concat([{
                    id : 'all',
                    orgName : this.$t('all')
                }],this.orderTakeList);
            },
            //是否是团队订单退票审核页面
            isRefundAuditPage () {
                return this.$route.name === 'teamOrderRefundAudit';
            }
        },
        created () {
            this.querySceneicData();
            this.resetFormData = JSON.stringify(this.formData);
        },
        methods : {
            /**
             * 下单时间选择变化后的处理
             */
            changeOrderTime () {
                this.formData.orderStartDate = this.orderTimeRange[0];
                this.formData.orderEndDate = this.orderTimeRange[1];
                this.searchAuditList();
            },
            /**
             * 游玩日期选择变化后的处理
             */
            changeVisitDate () {
                this.formData.visitStartDate = this.visitDateRange[0];
                this.formData.visitEndDate = this.visitDateRange[1];
                this.searchAuditList();
            },
            /**
             * emit事件：on-filter，在父组件查询审核列表
             */
            searchAuditList : debounce(function () {
                let keys = ['channelId', 'orderChannel', 'productType', 'paymentStatus','overdue'];
                let queryParams = Object.assign({}, this.formData);
                keys.forEach((key, i) => {
                    if (queryParams[key] && queryParams[key].includes('all')) {
                        queryParams[key] = '';
                    }
                });
                this.$emit('on-filter', queryParams);
            },200),
            /**
             * 重置筛选条件
             */
            reset () {
                this.formData = JSON.parse(this.resetFormData);
                this.orderTimeRange = [new Date().addMonths(-1), new Date()];
                this.visitDateRange = [];
                this.changeOrderTime();
            },
            /**
             * 查询所有所属景区信息
             */
            querySceneicData () {
                ajax.post('getAllScenic').then(res => {
                    if (res.status === 200) {
                        this.belongScene = res.data ? [].concat([{
                            id : 'all',
                            orgName : this.$t('all')
                        }],res.data) : [];
                        this.orderTakeList = [];
                        if (this.formData.scenicOrgId !== 'all') {
                            this.sceneChange();
                        } else {
                            this.searchAuditList();
                        }
                    } else {
                        this.belongScene = [];
                    }
                });
            },
            /**
             * 所属景区改变，查询下单企业信息
             */
            sceneChange () {
                if (!this.formData.scenicOrgId) {
                    this.orderTakeList = [];
                    return;
                }
                this.formData.channelId = 'all';
                ajax.post('getOrderCompany',{
                    scenicId : this.formData.scenicOrgId,
                }).then(res => {
                    if (res.status === 200) {
                        this.orderTakeList = res.data ? res.data : [];
                    } else {
                        this.orderTakeList = [];
                    }
                    this.searchAuditList();
                });
            },
        },
        watch : {
            //根据默认参数设置筛选条件
            paramsDefault : {
                handler (newVal,oldVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        for (let item in this.paramsDefault) {
                            if (item === 'visitStartDate') {
                                this.$set(this.formData,'visitStartDate',this.paramsDefault.visitStartDate ? new Date(String(this.paramsDefault.visitStartDate)) : '');
                                this.$set(this.visitDateRange,0,this.paramsDefault.visitStartDate ? new Date(String(this.paramsDefault.visitStartDate)) : '');
                            } else if (item === 'visitEndDate') {
                                this.$set(this.formData,'visitEndDate',this.paramsDefault.visitEndDate ? new Date(String(this.paramsDefault.visitEndDate)) : '');
                                this.$set(this.visitDateRange,1,this.paramsDefault.visitEndDate ? new Date(String(this.paramsDefault.visitEndDate)) : '');
                            } else if (item === 'orderStartDate') {
                                this.$set(this.formData,'orderStartDate',this.paramsDefault.orderStartDate ? new Date(String(this.paramsDefault.orderStartDate)) : '');
                                this.$set(this.orderTimeRange,0,this.paramsDefault.orderStartDate ? new Date(String(this.paramsDefault.orderStartDate)) : '');
                            } else if (item === 'orderEndDate') {
                                this.$set(this.formData,'orderEndDate',this.paramsDefault.orderEndDate ? new Date(String(this.paramsDefault.orderEndDate)) : '');
                                this.$set(this.orderTimeRange,1,this.paramsDefault.orderEndDate ? new Date(String(this.paramsDefault.orderEndDate)) : '');
                            } else {
                                this.formData[item] = this.paramsDefault[item];
                            }
                        }
                    } else {
                        this.$set(this.formData,'orderStartDate',new Date().addMonths(-1));
                        this.$set(this.orderTimeRange,0,new Date().addMonths(-1));
                        this.$set(this.formData,'orderEndDate',new Date());
                        this.$set(this.orderTimeRange,1,new Date());
                    }
                    this.searchAuditList();
                },
                immediate : true
            },
        }

    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .audit-filter {
        padding: 14px 20px 15px 20px;
        /*border: 1px solid #EEEEEE;*/
        position: relative;

        /deep/ .ivu-form-item{
            margin-bottom: 10px;
            .ivu-form-item-label {
                padding: 8px 10px 8px 20px;
            }
            .ivu-form-item-content {
                line-height: 30px;
            }
        }

        .reset{
            margin-left: 15px;
            border-color: #0055B8;
            color: #0055B8;
        }

        /deep/ .ivu-date-picker{
            width: 100%;
        }
    }
</style>
