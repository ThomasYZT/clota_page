<!--
内容：销售用户详细信息
作者：djc
日期：
-->

<template>
    <Modal
        v-model="visible"
        :title="$t('销售用户详细信息')"
        class-name="vertical-center-modal"
        width="1000"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <!--个人基本信息-->
            <div class="info-item">
                <div class="info-item-title">
                    <span class="title-name">{{$t('个人基本信息')}}</span>
                </div>
                <div class="content">
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <span class="info-key">{{$t('colonSetting', { key: $t('name') })}}</span>
                                <span class="info-val" v-w-title="'刘木子'">{{'刘木子' | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <span class="info-key">{{$t('colonSetting', { key: $t('gender') })}}</span>
                                <span class="info-val">{{$t('female') | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--身份证号码-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('身份证号码') })}}</span>
                                <span class="info-val">{{'431129199411090989'}}</span>
                            </div>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <span class="info-key">{{$t('colonSetting', { key: $t('birthday') })}}</span>
                                <span class="info-val">{{'11-09'}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <span class="info-key">{{$t('colonSetting', { key: $t('mobilePhone') })}}</span>
                                <span class="info-val">{{'176387263872'}}</span>
                            </div>
                        </i-col>
                    </i-row>
                </div>
            </div>
            <!--收款账户信息-->
            <div class="info-item">
                <div class="info-item-title">
                    <span class="title-name">{{$t('收款账户信息')}}</span>
                </div>
                <div class="content">
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <!--收款账户类型-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('collectionAccountType') })}}</span>
                                <span class="info-val">{{$t('支付宝') | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--收款用户姓名-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('收款用户姓名') })}}</span>
                                <span class="info-val">{{$t('张依依') | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--收款账号-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('收款账号') })}}</span>
                                <span class="info-val">{{'59789792839809'}}</span>
                            </div>
                        </i-col>
                    </i-row>
                </div>
            </div>
            <!--注册信息-->
            <div class="info-item">
                <div class="info-item-title">
                    <span class="title-name">{{$t('注册信息')}}</span>
                </div>
                <div class="content">
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <!--营销类别-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('marketType') })}}</span>
                                <span class="info-val" v-w-title="'物美超市'">{{'物美超市' | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--营销等级-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('marketingLevel') })}}</span>
                                <span class="info-val" v-w-title="'物美超市1级'">{{'物美超市1级' | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <span class="info-key">{{$t('colonSetting', { key: $t('signTime') })}}</span>
                                <span class="info-val">{{'2018-08-06'}}</span>
                            </div>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <!--用户邀请码-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('用户邀请码') })}}</span>
                                <span class="info-val">{{'1109'}}</span>
                            </div>
                        </i-col>
                    </i-row>
                </div>
            </div>
            <!--销售信息-->
            <div class="info-item">
                <div class="info-item-title">
                    <span class="title-name">{{$t('销售信息')}}</span>
                </div>
                <div class="content" style="margin-bottom: 26px;">
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <!--累计销售额-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('totalMoney') })}}</span>
                                <span class="info-val text-org">{{'3478.00'}}</span>
                            </div>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <!--佣金总额-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('佣金总额') })}}</span>
                                <span class="info-val text-org">{{'8932.93' | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--已提现金额-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('已提现金额') })}}</span>
                                <span class="info-val text-org">{{'8932.93' | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--未提现金额-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('未提现金额') })}}</span>
                                <span class="info-val text-org">{{'8932.93' | contentFilter}}</span>
                            </div>
                        </i-col>
                    </i-row>
                </div>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="ghost" style="width: 88px;"
                    @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>
<script>

    export default {
        components : {},
        props : {},
        data () {
            return {
                visible : false,
            }
        },
        computed : {},
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 弹窗弹出时传入销售用户详细信息数据
             * @param data
             */
            show ( data ) {
                if (data) {
//                    this.salesUserInfo = data;

                }

                this.visible = true;
            },
            /**
             * 关闭模态框
             */
            hide () {
                this.visible = false;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .modal-body {
        margin: 14px 24px;
        font-size: 14px;
    }

    .text-org {
        color: $color_yellow !important;
    }

    .info-item {
        .info-item-title {
            position: relative;
            height: 20px;
            line-height: 20px;
            &:after {
                content: '';
                display: inline-block;
                border-top: 1px dashed #E1E1E1;
                width: 100%;
                vertical-align: middle;
            }
        }

        .title-name {
            position: absolute;
            padding-right: 16px;
            background: #fff;
            z-index: 10;
            font-size: 16px;
            color: #354052;
            letter-spacing: 1.14px;
        }

        .content {
            margin: 20px 0 40px 0;
        }

        .node-info{
            display: flex;
            flex-direction: row;
            height: 30px;
            line-height: 30px;
            @include overflow_tip();

            .info-val{
                flex: 1;
                display: inline-block;
                @include overflow_tip();
                color: $color_666;
                padding-right: 10px;
            }
            .info-key{
                color: $color_333;
                display: inline-block;
                /*float: left;*/
            }
        }
    }
</style>
