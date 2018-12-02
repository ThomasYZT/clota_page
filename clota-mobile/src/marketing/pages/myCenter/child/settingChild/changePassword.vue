<!--修改密码-->

<template>
    <div class="change-password">
        <div class="hr"></div>
        <group>
            <!-- 输入旧密码 -->
            <x-input
                :title="$t('输入旧密码')"
                text-align="right"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                type="password"
                v-model.trim="formData.oldPassword"
                placeholder-align="right">
            </x-input>
            <!-- 输入新密码 -->
            <x-input
                :title="$t('输入新密码')"
                text-align="right"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                type="password"
                v-model.trim="formData.password"
                placeholder-align="right">
            </x-input>
            <!-- 再次输入密码 -->
            <x-input
                :title="$t('再次输入密码')"
                text-align="right"
                type="password"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.passwordAgain"
                placeholder-align="right">
            </x-input>
        </group>
        <x-button class="button"
                  @click.native="confirm">{{$t('确定')}}</x-button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //表单数据
                formData : {
                    //新密码
                    password : '',
                    //再次输入的密码
                    passwordAgain : '',
                    //旧密码
                    oldPassword : ''
                }
            };
        },
        methods : {
            /**
             * 校验新密码
             * @return {Promise<any>}
             */
            validatePassword () {
                return new Promise((resolve,reject) => {
                    if (this.formData && this.formData.password) {
                        let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/;
                        if (reg.test(this.formData.password)) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('errorPwdRule'));
                            reject();
                        }
                    } else {
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('新密码') }));
                        reject();
                    }
                });
            },
            /**
             * 校验第二次输入的密码
             * @return {Promise<any>}
             */
            validatePasswordAgain () {
                return new Promise((resolve,reject) => {
                    if (this.formData && this.formData.passwordAgain) {
                        if (this.formData.password === this.formData.passwordAgain) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('twicePassError'));
                            reject();
                        }
                    } else {
                        this.$vux.toast.text(this.$t('inputPassAgain'));
                        reject();
                    }
                });
            },
            /**
             * 校验旧密码
             * @return {Promise<any>}
             */
            validateOldPassword () {
                return new Promise((resolve,reject) => {
                    if (this.formData && this.formData.oldPassword) {
                        resolve();
                    } else {
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('旧密码') }));
                        reject();
                    }
                });
            },
            /**
             * 确认修改登录密码
             */
            confirm () {
                this.validateOldPassword().then(() => {
                    return this.validateOldPassword();
                }).then(() => {
                    return this.validatePassword();
                }).then(() => {
                    return this.validatePasswordAgain();
                }).then(() => {
                    this.$router.push({
                        name : 'marketingChangePasswordSuc',
                        params : {
                            from : true
                        }
                    });
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-password{
        @include block_outline();
        overflow: auto;
        background: #f2f3f4;

        .hr{
            @include block_outline($height:8px);
        }

        /deep/ .vux-x-input-right-full{
            height: 50px!important;
        }

        /deep/ .weui-btn{
            margin-top: 44px;
        }

        /deep/ .vux-cell-primary p,
        /deep/ .weui-cell__ft,
        /deep/ .weui-label{
            color: #172434;
        }
    }
</style>
