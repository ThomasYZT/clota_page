
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
                :value="formData.name"
                placeholder-align="right">
            </x-input>
            <!-- 身份证号 -->
            <x-input
                :title="$t('idNum')"
                text-align="right"
                disabled
                :placeholder="$t('pleaseInputMsg')"
                :show-clear="false"
                v-model.trim="formData.idNum"
                placeholder-align="right">
            </x-input>
            <!-- 手机 -->
            <cell
                :title="$t('phone')"
                is-link
                class="padding-right"
                :value="formData.phoneNum"
                @click.native="changePhone">
            </cell>
            <!-- 登录密码 -->
            <cell
                :title="$t('loginPass')"
                is-link
                class="padding-right"
                :value="formData.password"
                @click.native="changePassword">
            </cell>
            <!-- 收款账户 -->
            <cell
                :title="$t('accountToBeCredited')"
                is-link
                class="padding-right"
                :value="formData.account"
                @click.native="toAccount">
            </cell>
        </group>
        <x-button class="button"
                  @click.native="logOut">{{$t('logout')}}</x-button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ajax from '@/marketing/api/index';

    export default {
        data () {
            return {
                //表单配置
                formData : {
                    name : '',
                    //手机号
                    phoneNum : '',
                    //登录密码
                    password : '●●●●●●',
                    //收款账户
                    account : '',
                    //证件号
                    idNum : ''
                },
                //账户信息
                accountInfo : {}
            };
        },
        methods : {
            /**
             * 跳转到收款账户页面
             */
            toAccount () {
                this.$router.push({
                    name : 'marketingSetAccount',
                    params : {
                        accountInfo : this.accountInfo
                    }
                });
            },
            /**
             * 跳转到修改手机号的界面
             */
            changePhone () {
                this.$router.push({
                    name : 'marketingChangePhone',
                    params : {
                        phone : this.formData.phoneNum
                    }
                });
            },
            /**
             * 跳转到修改密码的界面
             */
            changePassword () {
                this.$router.push({
                    name : 'marketingChangePassword'
                });
            },
            /**
             * 获取用户信息
             */
            getUserInfo () {
                this.$store.dispatch('marketGetUserInfo').then((data) => {
                    if (data) {
                        this.formData.name = data.name;
                        this.formData.phoneNum = data.mobile;
                        this.formData.account = data.accountInfo;
                        this.formData.name = data.name;
                        this.formData.name = data.name;
                        this.formData.idNum = data.idno ? this.dealIdNum(data.idno) : '';
                        this.accountInfo = {
                            account : data.accountInfo,
                            accountType : data.accountType,
                            name : data.name,
                            mobile : data.mobile
                        };
                    } else {
                        this.formData.name = '';
                        this.formData.phoneNum = '';
                        this.formData.account = '';
                        this.formData.name = '';
                        this.formData.name = '';
                        this.formData.idNum = '';
                        this.accountInfo = {};
                    }
                });
            },
            /**
             * 加密身份证号
             * @param{String} idNum 身份证号
             * @param{Number} frontLen 前面不加密的位数
             * @param{Number} endLen 后面不加密的位数
             * @return {string}
             */
            dealIdNum (idNum,frontLen = 0,endLen = 4) {
                let len = idNum.length - frontLen - endLen;
                let xing = '';
                for (let i = 0; i < len; i++) {
                    xing += '*';
                }
                return idNum.substring(0,frontLen) + xing + idNum.substring(idNum.length - endLen);
            },
            /**
             * 退出登录
             */
            logOut () {
                localStorage.removeItem('marketToken');
                this.$router.replace({
                   name : 'marketingLogin'
                });
            }
        },
        computed : {
            ...mapGetters({
                marketUserInfo : 'marketUserInfo',
            })
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getUserInfo();
            });
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
