<!--
内容：（团队订单、散客退票、散客改签）筛选器
作者：
日期：
-->

<template>
    <div class="audit-filter">
        <Form ref="formCustom"
              :model="formData"
              :rules="formRule"
              :label-width="75"
              :label-position="'right'">
            <i-row>
                <i-col span="7">
                    <!--下单时间-->
                    <FormItem :label="$t('orderTime')"
                              :label-width="lang === 'zh-CN' ? 75 : 80">
                        <DatePicker v-model="orderTimeRange"
                                    type="daterange"
                                    style="width: 100%"
                                    :editable="false"
                                    @on-change="changeOrderTime">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="7">
                    <!--游玩时间-->
                    <FormItem :label="$t('visitTime')">
                        <DatePicker v-model="visitDateRange"
                                    style="width: 100%"
                                    type="daterange"
                                    :editable="false"
                                    @on-change="changeVisitDate">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="5" v-if="auditName=='group'">
                    <!--支付状态-->
                    <FormItem :label="$t('paymentStatus')" :label-width="lang === 'zh-CN' ? 75 : 120">
                        <Select v-model="formData.paymentStatus"
                                style="width: 100%"
                                @on-change="searchAuditList">
                            <Option v-for="item in paymentList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="5">
                    <!--业态类型-->
                    <FormItem :label="$t('industryType')" :label-width="lang === 'zh-CN' ? 75 : 120">
                        <Select v-model="formData.productType"
                                style="width: 100%"
                                @on-change="searchAuditList">
                            <Option value="all">{{$t('all')}}</Option>
                            <Option value="ticket">{{$t('tickets')}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="6">
                    <!--下单企业-->
                    <FormItem :label="$t('orderOrg')" :label-width="lang === 'zh-CN' ? 75 : 120">
                        <Select v-model="formData.channelId"
                                style="width: 100%"
                                @on-change="searchAuditList">
                            <Option v-for="item in orderEnterprise"
                                    :key="item.id"
                                    :value="item.id">
                                {{$t(item.orgName)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--下单渠道-->
                    <FormItem :label="$t('orderChannel')" :label-width="lang === 'zh-CN' ? 75 : 105">
                        <Select v-model="formData.orderChannel"
                                style="width: 100%"
                                @on-change="searchAuditList">
                            <Option v-for="item in orderChannelList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label=='all' ? item.label : 'order.' + item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col style="display:inline-block;width: 36%;">
                    <FormItem :label="$t('keywords')" :label-width="lang === 'zh-CN' ? 75 : 80">
                        <Input v-model.trim="formData.keyword"
                               style="width: 100%;"
                               :placeholder="$t('inputField', { field : $t('vistorNameOrPhoneNumOrOrderNo') })" /><!--请输入游客姓名/手机号/订单号/订单明细编号-->
                    </FormItem>
                </i-col>
                <i-col style="display:inline-block;float:right;text-align: right">
                    <Button type="primary" class="ivu-btn-65px" @click="searchAuditList">{{$t('empQuery')}}</Button><!--搜索-->
                    <Button type="ghost" class="ivu-btn-65px reset" @click="reset">{{$t('reset')}}</Button><!--重置-->
                </i-col>
            </i-row>
            <!--<i-row>


                <i-col span="6" style="text-align: right;float: right">
                    <Button type="primary" class="ivu-btn-90px" @click="searchAuditList">{{$t('搜索')}}</Button>&lt;!&ndash;搜索&ndash;&gt;
                    <Button type="ghost" class="ivu-btn-90px reset" @click="reset">{{$t('reset')}}</Button>&lt;!&ndash;重置&ndash;&gt;
                </i-col>
            </i-row>-->
        </Form>
    </div>
</template>
<script type="text/ecmascript-6">
//    import {orderChannelEnum, paymentStatusEnum} from '../auditConfig';
    import { notDistributorChannelList, payStatusList } from '@/assets/js/constVariable';
    import { mapGetters } from 'vuex';
    import ajax from '@/api/index';

    export default {
        components : {},
        props : {
            // 审核名称
            auditName : {
                type : String,
            }
        },
        data () {
            return {
                //表单数据
                formData : {
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
                },

                // 下单企业列表
                orderEnterprise : [{ id : 'all', orgName : this.$t('all') }],
                // 下单渠道列表
                orderChannelList : notDistributorChannelList.filter((item) => {
 return item.value !== 'market';
}),
                // 支付状态
                paymentList : payStatusList,
                // 下单时间范围
                orderTimeRange : [],
                // 游玩日期范围
                visitDateRange : [],

                //表单校验规则
                formRule : {

                },
                // 重置使用的初始筛选条件
                resetFormData : {}
            };
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs',
                lang : 'lang',
            })
        },
        created () {
            this.queryOrderOrgList();
            this.resetFormData = JSON.stringify(this.formData);
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 下单时间选择变化后的处理
             * @param date   范围日期
             */
            changeOrderTime (date) {
                this.formData.orderStartDate = date[0];
                this.formData.orderEndDate = date[1];
                this.searchAuditList();
            },
            /**
             * 游玩日期选择变化后的处理
             * @param date   范围日期
             */
            changeVisitDate (date) {
                this.formData.visitStartDate = date[0];
                this.formData.visitEndDate = date[1];
                this.searchAuditList();
            },
            /**
             * 当选择的支付状态为全部时（此时code为'all'），需将‘支付状态’筛选字段的值改为空。
             * @param statusCode   支付状态code
             */
            /*changePayStatus(statusCode) {
                if (statusCode.includes('all')) {
                    this.formData.paymentStatus = '';
                }
            },*/
            /**
             * 查询下单企业
             */
            queryOrderOrgList () {
                ajax.post('getOrderOrgList', {
                    allocationStatus : false, // 是否分销：true/false
                    scenicId : this.manageOrgs.id,
                }).then(res => {
                    if (res.success) {
                        this.orderEnterprise = this.orderEnterprise.concat(res.data || []);
                    }
                });
            },
            /**
             * emit事件：on-filter，在父组件查询审核列表
             */
            searchAuditList () {
                let keys = ['channelId', 'orderChannel', 'productType', 'paymentStatus'];
                let queryParams = Object.assign({}, this.formData);
                keys.forEach((key) => {
                    if (queryParams[key].includes('all')) {
                        queryParams[key] = '';
                    }
                });

                this.$emit('on-filter', queryParams);
            },
            /**
             * 重置筛选条件
             */
            reset () {
                this.$refs.formCustom.resetFields();
                this.formData = JSON.parse(this.resetFormData);
                this.orderTimeRange = [];
                this.visitDateRange = [];
                this.searchAuditList();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .audit-filter {
        padding: 15px 10px 0 10px;
        /*border: 1px solid #EEEEEE;*/
        position: relative;

        /deep/ .ivu-form-item{
            margin-bottom: 10px;
            .ivu-form-item-label {
                padding: 8px 5px 8px 5px;
            }
            .ivu-form-item-content {
                line-height: 30px;
            }
        }

        .reset{
            margin-left: 5px;
            border-color: #0055B8;
            color: #0055B8;
        }
    }
</style>
