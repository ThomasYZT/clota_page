<!--
    支付协议
    作者：杨泽涛
-->
<template>
    <div class="pay-agreement">
        <p class="content">{{txt}}</p>

        <div class="btn-area">
            <check-icon class="agree-button" :value.sync="isChoesd">({{$t('agreement')}})</check-icon>
            <x-button :class="{disabled: !isChoesd}"
                      :disabled="!isChoesd"
                      @click.native="nextStep">{{$t('nextStep')}}</x-button>
        </div>
    </div>
</template>

<script>
    import ajax from '../../../api/index'
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    export default {
        components: {},
        mixins : [lifeCycleMixins],
        data() {
            return {
                txt: '',
                //是否同意协议
                isChoesd: false,
                //手机号码
                mobile : '',
                //验证码
                code : '',
            }
        },
        methods: {
            getData() {
                ajax.post('getAgreementToPay').then((res) => {
                    if(res.success) {
                        this.txt = res.data;
                    }else {
                        this.$vux.toast.text(res.message)
                    }
                })
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params) {
                if(params && params.mobile && params.code) {
                    this.mobile = params.mobile;
                    this.code = params.code;
                }else{
                    this.$router.push({
                        name : 'personInfo'
                    });
                }
            },
            /**
             * 跳转到 下一步
             */
            nextStep () {
                this.$router.replace({
                    name : 'inputPass',
                    params : {
                        mobile : this.mobile,
                        code : this.code
                    }
                });
            }
        },
        created() {
            //获取协议数据
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .content {
        padding: 10px 20px;
    }
    .btn-area{
        @include block_outline(unquote('calc(100% - 55px)'),42px);
        margin: 10px auto 0;
        text-align: center ;

        .agree-button {
            margin-bottom: 10px;
        }

        .disabled {
            background: gray !important;
        }

        /deep/ .weui-btn_default{
            background: $color_0073EB;
            font-size: 17px;
            color: $color_fff;
            border-radius: 100px;
            letter-spacing: 5px;
        }
    }
</style>
