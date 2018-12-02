<!--设置收款账户-->

<template>
    <div class="set-deposit-account">
        <div class="hr"></div>
        <group>
            <!-- 账户类型 -->
            <popup-picker
                :title="$t('收款账户类型')"
                show-name
                :placeholder="$t('pleaseInputMsg')"
                v-model.trim="formData.accountType"
                :data="[accountTypeList]">
                <div>aa</div>
            </popup-picker>
            <!-- 收款人姓名 -->
            <x-input
                :title="$t('收款人姓名')"
                text-align="right"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.name"
                placeholder-align="right">
            </x-input>
            <!-- 收款账户 -->
            <x-input
                :title="$t('收款账户')"
                text-align="right"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.account"
                placeholder-align="right">
            </x-input>
        </group>
        <x-button class="button"
                  @click.native="save">{{$t('save')}}</x-button>
        <confirm v-model="confirmShow"
                 v-transfer-dom
                 :title="$t('提示')"
                 :show-cancel-button="false"
                 :confirm-text="$t('立即返回')"
                 @on-confirm="onConfirm">
            <p style="text-align:center;">{{ $t('设置成功，5S后返回。') }}</p>
        </confirm>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //设置成功提示框是否显示
                confirmShow : false,
                //表单数据
                formData : {
                    //账户类别
                    accountType : [],
                    // 收款人姓名
                    name : '',
                    //收款账户
                    account : ''
                },
                //账户列表
                accountTypeList : [
                    {
                        name : this.$t('wx'),
                        value : 'weixin'
                    },
                    {
                        name : this.$t('ali'),
                        value : 'alipay'
                    }
                ],
            };
        },
        methods : {
            /**
             * 保存收款账户信息
             */
            save () {
                this.validateAccountType().then(() => {
                    return this.validateName();
                }).then(() => {
                    return this.validateAccount();
                }).then(() => {
                    this.confirmShow = true;
                    setTimeout(() => {
                        this.onConfirm();
                    },5000);
                });
            },
            /**
             * 校验收款账户类型
             * @return{Function} promise函数
             */
            validateAccountType () {
                return new Promise((resolve,reject) => {
                    if (this.formData && this.formData.accountType && this.formData.accountType.length > 0) {
                        resolve();
                    } else {
                        this.$vux.toast.text(this.$t('pleaseSelect',{ field : this.$t('收款账户类型') }));
                        reject();
                    }
                });
            },
            /**
             * 校验姓名
             * @return {Promise<any>}
             */
            validateName () {
                return new Promise ((resolve,reject) => {
                    if (this.formData && this.formData.name ) {
                        if (this.formData.name.length > 20) {
                            this.$vux.toast.text(this.$t('maxLengthErr',{ field : this.$t('收款人姓名'),length : 20 }));
                            reject();
                        } else {
                            resolve();
                        }
                    } else {
                        this.$vux.toast.text(this.$t('pleaseInput',{ field : this.$t('收款人姓名') }));
                        reject();
                    }
                });
            },
            /**
             * 校验收款账户
             * @return {Promise<any>}
             */
            validateAccount () {
                return new Promise((resolve,reject) => {
                    if (this.formData && this.formData.account ) {
                        if (this.formData.account.length > 100) {
                            this.$vux.toast.text(this.$t('maxLengthErr',{ field : this.$t('收款账户'),length : 100 }));
                            reject();
                        } else {
                            resolve();
                        }
                    } else {
                        this.$vux.toast.text(this.$t('pleaseInput',{ field : this.$t('收款账户') }));
                        reject();
                    }
                });
            },
            /**
             * 确认立即返回
             */
            onConfirm () {
                this.$router.push({
                    name : 'marketingOwnerCenter'
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .set-deposit-account{
        @include block_outline();
        background: #f2f3f4;

        .hr{
            @include block_outline($height:8px);
        }

        .weui-btn{
            margin-top: 44px;
        }

        /deep/ .weui-cell{
            height: 50px;
        }

        /deep/ .weui-label{
            color: #172434;
        }
    }
</style>
