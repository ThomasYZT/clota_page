<!--短信发送详情-->

<template>
    <div class="sms-detail">
        <bread-crumb-head
            :locale-router="$t('smsDetail')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="sms-detail-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :label-width="100">
                <i-row>
                    <i-col span="11">
                        <!--订单编号-->
                        <FormItem :label="$t('orderCode')">
                            <span class="form-value">{{formData.orderCode | contentFilter}}</span>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--租户-->
                        <FormItem :label="$t('lessee')">
                            <span class="form-value">{{formData.lessee | contentFilter}}</span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--手机号-->
                        <FormItem :label="$t('mobileNum')" >
                            <span class="form-value">{{formData.mobile | contentFilter}}</span>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--条数-->
                        <FormItem :label="$t('strips')">
                            <span class="form-value">{{formData.strips | contentFilter}}</span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--短信供应商-->
                        <FormItem :label="$t('smsProvider')">
                            <span class="form-value">{{formData.smsProvider | contentFilter}}</span>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--发送时间-->
                        <FormItem :label="$t('sendTime')">
                            <span class="form-value">{{formData.sendTime | timeFormat('yyyy-MM-dd HH:mm:ss') | contentFilter}}</span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--发送状态-->
                        <FormItem :label="$t('sendStatus')">
                            <span class="form-value">{{$t(formData.sendStatus) | contentFilter}}</span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="22">
                        <!--短信内容-->
                        <FormItem :label="$t('smsContent')">
                            <span class="form-value sms-con">{{formData.smsContent | contentFilter}}</span>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import {validator} from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import ajax from '@/api/index.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            cityPlugin
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('smsSendRecord'),
                        router: {
                            name: 'smsSendRecord'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //订单编号
                    orderCode: '',
                    //租户
                    lessee: '',
                    //手机号
                    mobile: '',
                    //条数
                    strips : '',
                    //短信供应商
                    smsProvider : '',
                    //短信发送时间
                    sendTime : '',
                    sendStatus : '',
                    //短信内容
                    smsContent : ''
                },
                //短信发送记录id
                smsId : ''
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.id){
                    this.smsId = params.id;
                    this.getSmsDetail();
                }else{
                    this.$router.push({
                        name : 'smsSendRecord'
                    });
                }
            },
            /**
             * 获取短信发送记录详情
             */
            getSmsDetail () {
                ajax.post('getSmsDetail',{
                    id : this.smsId
                }).then(res =>{
                    if(res.status === 200){
                        this.formData.orderCode = res.data.orderNo;
                        this.formData.lessee = res.data.orgName;
                        this.formData.mobile = res.data.target;
                        this.formData.smsProvider = res.data.provider;
                        this.formData.sendTime = res.data.createdTime;
                        this.formData.sendStatus = res.data.status;
                        this.formData.smsContent = res.data.content;
                        this.formData.strips = res.data.amount;
                    }else{
                        this.formData.orderCode = '';
                        this.formData.lessee = '';
                        this.formData.mobile = '';
                        this.formData.smsProvider = '';
                        this.formData.sendTime = '';
                        this.formData.sendStatus = '';
                        this.formData.smsContent = '';
                        this.formData.strips = '';
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .sms-detail {
        @include block_outline();
        background: $color_f4f6f9;

        .sms-detail-info {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline(924px, auto);
                margin: 0 auto;
            }

            .unit{
                vertical-align: middle;
                display: inline-block;
                margin-left: 5px;
            }

            /deep/ .ivu-form-item{
                margin-bottom: 10px;
            }

            /deep/ .ivu-form-item-content{
                line-height: 25px!important;
            }

            .sms-con{
                padding-top: 5px;
                display: inline-block;
            }

            .form-value{
                display: inline-block;
                padding-top: 4px;
            }
        }
    }
</style>
