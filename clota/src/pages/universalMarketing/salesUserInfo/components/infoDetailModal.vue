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
                                <span class="info-val" v-w-title="salesUserInfo.name">{{salesUserInfo.name | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <span class="info-key">{{$t('colonSetting', { key: $t('gender') })}}</span>
                                <span class="info-val">{{$t(salesUserInfo.sex) | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--身份证号码-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('身份证号码') })}}</span>
                                <span class="info-val">{{salesUserInfo.idno | contentFilter}}</span>
                            </div>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <span class="info-key">{{$t('colonSetting', { key: $t('birthday') })}}</span>
                                <span class="info-val">{{salesUserInfo.birthday | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <span class="info-key">{{$t('colonSetting', { key: $t('mobilePhone') })}}</span>
                                <span class="info-val">{{salesUserInfo.mobile | contentFilter}}</span>
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
                                <span class="info-val">{{salesUserInfo.accountType | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--收款用户姓名-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('收款用户姓名') })}}</span>
                                <span class="info-val">{{salesUserInfo.name | contentFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--收款账号-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('收款账号') })}}</span>
                                <span class="info-val">{{salesUserInfo.accountInfo | contentFilter}}</span>
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
                                <span class="info-val"
                                      v-w-title="$t(salesUserInfo.typeName)">
                                    {{salesUserInfo.typeName | contentFilter}}
                                </span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--营销等级-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('marketingLevel') })}}</span>
                                <span class="info-val"
                                      v-w-title="salesUserInfo.levelName">
                                    {{salesUserInfo.levelName | contentFilter}}
                                </span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <span class="info-key">{{$t('colonSetting', { key: $t('signTime') })}}</span>
                                <span class="info-val">{{salesUserInfo.createdTime | contentFilter}}</span>
                            </div>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <!--用户邀请码-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('用户邀请码') })}}</span>
                                <span class="info-val">{{salesUserInfo.inviteCode | contentFilter}}</span>
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
                                <span class="info-val text-org">{{salesUserInfo.totalMarketAmount | contentFilter | moneyFilter}}</span>
                            </div>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="8">
                            <div class="node-info">
                                <!--佣金总额-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('佣金总额') })}}</span>
                                <span class="info-val text-org">{{salesUserInfo.totalEarnAmount | contentFilter | moneyFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--已提现金额-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('已提现金额') })}}</span>
                                <span class="info-val text-org">{{salesUserInfo.haveWithdrawAmount | contentFilter | moneyFilter}}</span>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="node-info">
                                <!--未提现金额-->
                                <span class="info-key">{{$t('colonSetting', { key: $t('未提现金额') })}}</span>
                                <span class="info-val text-org">{{salesUserInfo.unWithdrawAmount | contentFilter | moneyFilter}}</span>
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
    import ajax from '@/api/index';

    export default {
        components : {},
        props : {},
        data () {
            return {
                visible : false,
                salesUserInfo : {}
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
             * 获取销售用户详情
             * @param rowData  当前销售用户的列表信息
             */
            getDetailInfo (rowData) {
                ajax.post('marketing-findMarketUserDetail', {
                    userId : rowData.id
                }).then(res => {
                    if (res.success) {
                        this.salesUserInfo = res.data || {};
                    } else {
                        this.salesUserInfo = {};
                    }
                });
            },
            /**
             * 弹窗弹出时传入销售用户详细信息数据
             * @param data
             */
            show ( data ) {
                if (data) {
                    this.getDetailInfo(data);
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
