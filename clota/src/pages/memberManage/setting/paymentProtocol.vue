<!--
内容：支付协议
作者：
日期：
-->

<template>
    <div class="pay-protocol">
        <bread-crumb-head
            :before-router-list="beforeRouterList"
            locale-router="paymentSetting">
        </bread-crumb-head>

        <div class="protocol-content">
            <Button type="primary"
                    v-if="!editFlag"
                    class="edit-button"
                    @click="editFlag = true">{{$t('edit')}}
            </Button>

            <h3>{{$t('paymentAgreement')}}</h3>
            <Input v-model.trim="protocol.paymentAgreement"
                   :class="{'edit-disabled': !editFlag}"
                   type="textarea"
                   :readonly="!editFlag" />

            <!--底部按钮-->
            <div class="footer-wrap" v-if="editFlag">
                <Button type="primary"
                        style="margin-right: 20px;"
                        :loading="isLoading"
                        :disabled="!protocol.paymentAgreement"
                        @click="saveProtocol()">{{$t('save')}}
                </Button>
                <Button type="ghost" @click="hide()">{{$t('cancel')}}</Button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import ajax from '@/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        components : { breadCrumbHead },
        props : {},
        mixins : [lifeCycleMixins],
        data () {
            return {
                //面包屑上级路由信息
                beforeRouterList : [
                    {
                        name : 'fundSetting', // 储值设置
                        router : {
                            name : 'fundSetting'
                        },
                    },
                ],
                // 是否编辑协议标记
                editFlag : false,
                // 协议内容
                protocol : {
                    id : '',
                    paymentAgreement : ''
                },
                isLoading : false,

            };
        },
        computed : {},
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {

            // 隐藏编辑状态
            hide () {
                this.editFlag = false;
            },
            /**
             * 获取路由详情
             * @param params
             */
            getParams (params) {
                if (params && 'paymentAgreement' in params && 'id' in params) {
                    Object.assign(this.protocol, params);
                } else {
                    this.$router.push({
                        name : 'memberSetting'
                    });
                }
            },

            // 保存支付协议的设置
            saveProtocol () {
                this.isLoading = true;
                ajax.post('basicSet', this.protocol).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('save') }));
                        this.hide();
                    } else {
                        this.$Message.error(res.message ? res.message : this.$t('failureTip', { tip : this.$t('save') }));
                    }
                }).finally(() => {
                    this.isLoading = false;
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .pay-protocol {
        height: 100%;

        .protocol-content {
            position: relative;
            height: calc(100% - 50px);
            padding: 40px 30px;

            .edit-button {
                position: absolute;
                top: 20px;
            }

            > h3 {
                margin-bottom: 26px;
                font-family: MicrosoftYaHei;
                text-align: center;
                font-size: 24px;
                color: #354052;
                letter-spacing: 1.71px;
            }

            /deep/ .ivu-input-wrapper {
                height: calc(100% - 120px);
            }

            /deep/ textarea.ivu-input {
                height: 100%;
                font-size: 18px;
                color: #666666;
                letter-spacing: 1.29px;
                line-height: 34px;
                white-space: pre;
            }

            .edit-disabled {
                /deep/ textarea.ivu-input {
                    border: none;

                    &:focus {
                        box-shadow: none;
                    }
                }
            }
        }

        .footer-wrap {
            margin-top: 25px;
            text-align: center;
            font-size: 0;
        }

        /deep/ .ivu-btn {
            width: 108px;
        }
    }
</style>
