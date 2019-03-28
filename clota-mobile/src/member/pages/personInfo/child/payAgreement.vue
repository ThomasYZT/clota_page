<!--
    支付协议
    作者：杨泽涛
-->
<template>
    <div class="pay-agreement">
        <p class="content">{{txt}}</p>
    </div>
</template>

<script>
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import ajax from '@/member/api/index.js';
    export default {
        mixins : [lifeCycleMixins],
        components : {},
        data () {
            return {
                txt : '',
                //手机号码
                mobile : '',
                //验证码
                code : '',
            };
        },
        methods : {
            getData () {
                ajax.post('getAgreementToPay').then((res) => {
                    if (res.success) {
                        this.txt = res.data;
                    } else {
                        this.$vux.toast.text(res.message);
                    }
                });
            },
            getParams () {
                //获取协议数据
                this.getData();
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .pay-agreement {
        height: 100%;
        -webkit-overflow-scrolling: touch;

        .content {
            padding: 10px 20px;
            height: 100%;
            overflow: auto;
            word-break: break-all;
        }
        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 10px auto 0;
            text-align: center ;

            .agree-button {
                margin-bottom: 10px;
            }

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
                letter-spacing: 5px;
            }
        }
    }

</style>
