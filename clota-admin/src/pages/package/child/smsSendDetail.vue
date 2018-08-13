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
                  :rules="ruleValidate"
                  :label-width="100">
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('orderCode')">
                        <span class="form-value">{{formData.orderCode}}</span>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('lessee')">
                        <span class="form-value">{{formData.lessee}}</span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <FormItem :label="$t('mobileNum')" >
                            <span class="form-value">{{formData.mobile}}</span>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem :label="$t('strips')">
                            <span class="form-value">{{formData.strips}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('smsProvider')">
                        <span class="form-value">{{formData.smsProvider}}</span>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('sendTime')">
                        <span class="form-value">{{formData.sendTime | timeFormat('yyyy-MM-dd HH:mm:ss')}}</span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('sendStatus')">
                        <span class="form-value">{{formData.sendStatus}}</span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                        <FormItem :label="$t('smsContent')">
                            <span class="form-value sms-con">{{formData.smsContent}}</span>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import {validator} from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';

    export default {
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
                    orderCode: 'F00021039',
                    //租户
                    lessee: '广州长隆有限公司',
                    //手机号
                    mobile: '13600000005',
                    //条数
                    strips : 0,
                    //短信供应商
                    smsProvider : '银科环企',
                    //短信发送时间
                    sendTime : new Date(),
                    sendStatus : '成功',
                    //短信内容
                    smsContent : '答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时答复阿斯蒂芬安抚按时'
                },
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
            }
        },
        beforeRouteEnter(to,fromm,next){
            next(vm => {
                vm.getParams(to.params);
            });
        }
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
