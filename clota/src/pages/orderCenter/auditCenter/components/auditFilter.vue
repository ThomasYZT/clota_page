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
              :label-width="80">
            <i-row>
                <i-col span="9">
                    <!--下单时间-->
                    <FormItem :label="$t('下单时间')">
                        <DatePicker type="daterange"
                                    style="width: 300px"
                                    @on-change="">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--下单渠道-->
                    <FormItem :label="$t('下单渠道')">
                        <Select v-model="formData.orderChannel"
                                style="width: 160px">
                            <Option v-for="item in orderChannelList"
                                    :key="item.value"
                                    :value="item.value">
                                {{item.label}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="9">
                    <!--游玩日期-->
                    <FormItem :label="$t('游玩日期')">
                        <DatePicker type="daterange"
                                    style="width: 300px"
                                    @on-change="">
                        </DatePicker>
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <!--下单企业-->
                    <FormItem :label="$t('下单企业')" >
                        <Select v-model="formData.channelId" style="width: 160px">
                            <Option v-for="item  in orderEnterprise"
                                    :key="item.id"
                                    :value="item.id">
                                {{item.orgName}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6" v-if="auditName=='group'">
                    <!--支付状态-->
                    <FormItem :label="$t('支付状态')" >
                        <Select v-model="formData.paymentStatus" style="width: 160px"
                                @on-change="">
                            <Option v-for="item  in paymentList"
                                    :key="item.value"
                                    :value="item.value">
                                {{$t(item.label)}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="9">
                    <FormItem :label="$t('关键字')" >
                        <Input v-model.trim="formData.keyword"
                               style="width: 300px"
                               :placeholder="$t('请输入游客姓名/手机号/订单号/订单明细编号')" />
                    </FormItem>
                </i-col>
                <i-col span="6">
                    <FormItem :label="$t('业态类型')" >
                        <Select v-model="formData.productType" style="width: 160px">
                            <Option value="ticket">票</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="6" style="text-align: right;float: right">
                    <Button type="primary" class="ivu-btn-90px" @click="searchAuditList">{{$t('搜索')}}</Button><!--搜索-->
                    <Button type="ghost" class="ivu-btn-90px reset" @click="reset">{{$t('reset')}}</Button><!--重置-->
                </i-col>
            </i-row>
        </Form>
    </div>
</template>
<script type="text/ecmascript-6">
    import {orderChannelEnum} from '../auditConfig';
    import {mapGetters} from 'vuex';
    import ajax from '@/api/index';

    export default {
        components: {},
        props : {
            // 审核名称
            auditName : {
                type : String,
            }
        },
        data() {
            return {
                //表单数据
                formData : {
                    // 下单起始日期
                    orderStartDate: '',
                    // 下单结束日期
                    orderEndDate: '',
                    // 游玩起始日期
                    visitStartDate : '',
                    // 游玩结束日期
                    visitEndDate : '',
                    // 支付状态（全部、已支付、未支付）
                    paymentStatus: 'all',
                    // 下单企业ID
                    channelId: '',
                    // 下单渠道
                    orderChannel: '',
                    // 业态类型
                    productType : '',
                    // 关键字查询：游客姓名/手机号/订单号/订单明细编号
                    keyword : '',
                },

                // 下单企业列表
                orderEnterprise: [],
                // 下单渠道列表
                orderChannelList: orderChannelEnum,
                // 支付状态
                paymentList: [
                    {label: 'all', value: 'all'},
                    {label: '已支付', value: 'true'},
                    {label: '未支付', value: 'false'},
                ],

                //表单校验规则
                formRule : {

                },
            }
        },
        computed: {
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            })
        },
        created() {
            this.queryOrderOrgList();
        },
        mounted() {
        },
        watch: {},
        methods: {
            queryOrderOrgList() {
                ajax.post('getOrderOrgList', {
                    allocationStatus: false,   // 是否分销：true/false
                    scenicId: this.manageOrgs.id,
                }).then(res => {
                    if (res.success) {
                        this.orderEnterprise = res.data || [];
                    }
                });
            },
            /**
             * emit事件：on-filter，在父组件查询审核列表
             */
            searchAuditList() {
                this.$emit('on-filter');
            },
            /**
             * 重置筛选条件
             */
            reset() {

                this.searchAuditList();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .audit-filter {
        padding: 14px 30px 5px 30px;
        border: 1px solid #EEEEEE;

        /deep/ .ivu-form-item{
            margin-bottom: 7px;
        }

        .reset{
            margin-left: 15px;
        }
    }
</style>
