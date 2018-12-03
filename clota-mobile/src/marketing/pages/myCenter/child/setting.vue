<!--设置-->

<template>
    <div class="setting">
        <div class="hr"></div>
        <group>
            <!-- 姓名 -->
            <x-input
                :title="$t('name')"
                text-align="right"
                disabled
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.name"
                placeholder-align="right">
            </x-input>
            <!-- 身份证号 -->
            <x-input
                :title="$t('身份证号')"
                text-align="right"
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.idNum"
                placeholder-align="right">
            </x-input>
            <!-- 手机 -->
            <cell
                :title="$t('手机')"
                is-link
                class="padding-right"
                :value="formData.phoneNum"
                @click.native="changePhone">
            </cell>
            <!-- 登录密码 -->
            <cell
                :title="$t('登录密码')"
                is-link
                class="padding-right"
                :value="formData.password"
                @click.native="changePassword">
            </cell>
            <!-- 收款账户 -->
            <cell
                :title="$t('收款账户')"
                is-link
                class="padding-right"
                :value="formData.account"
                @click.native="toAccount">
            </cell>
        </group>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //表单配置
                formData : {
                    name : 'name',
                    //手机号
                    phoneNum : '121212',
                    //登录密码
                    password : '',
                    //收款账户
                    account : '',
                    //证件号
                    idNum : ''
                }
            };
        },
        methods : {
            /**
             * 跳转到收款账户页面
             */
            toAccount () {
                this.$router.push({
                    name : 'marketingSetAccount'
                });
            },
            /**
             * 跳转到修改手机号的界面
             */
            changePhone () {
                this.$router.push({
                    name : 'marketingChangePhone'
                });
            },
            /**
             * 跳转到修改密码的界面
             */
            changePassword () {
                this.$router.push({
                    name : 'marketingChangePassword'
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .setting{
        @include block_outline();
        background: #f2f3f4;

        .hr{
            @include block_outline($height:8px);
        }

        /deep/ .weui-cell{
            height: 50px;
        }

        /deep/ .vux-cell-primary p,
        /deep/ .weui-cell__ft,
        /deep/ .weui-label{
            color: #172434;
        }
    }
</style>
