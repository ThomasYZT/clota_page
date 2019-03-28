<!--购票须知模态框-->
<template>
    <popup :value="value" :class="$style.wrap" v-transfer-dom @input="changeStatus">
        <div :class="$style.popupBody">
            <div :class="$style.head">
                <span :class="$style.known" @click="changeStatus(false)">{{$t('isee')}}</span>
                {{$t('ticketInfo')}}
            </div>
            <div :class="$style.content">
                <div :class="$style.productTitle">{{choosedProductInfo.productName | contentFilter}}</div>
                <div :class="$style.productNotice">{{$t('colonSetting',{ key : $t('productExplain') })}}</div>
                <div :class="$style.notice">{{choosedProductInfo.productDes | contentFilter}}</div>
                <div :class="$style.productNotice">{{$t('colonSetting',{ key : $t('ticketInfo') })}}</div>
                <div :class="$style.notice" v-html="choosedProductInfo.buyTicketNotes"></div>
            </div>
        </div>
    </popup>
</template>

<script>
    export default {
        props : {
            //是否显示模态框
            value : {
                type : Boolean,
                default : false
            },
            //选择的产品信息
            'choosedProductInfo' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {};
        },
        methods : {
            /**
             * 修改模态框状态
             * @param{Boolean} status 是否显示模态框
             */
            changeStatus (status) {
                this.$emit('input',status);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>

<style module>
    .wrap{
        overflow: hidden;
    }
    .popupBody{
        width: 100%;
        height: 400px;
        background: #fff;
    }
    .productTitle{
        text-align: center;
        height: 46px;
        padding: 19px 0 5px 0;
        line-height: 22px;
        font-size: 15px;
        color: #333333;
    }
    .head{
        width: 100%;
        height: 44px;
        background: #F5F6F8;
        position: relative;
        text-align: center;
        line-height: 44px;
        font-size: 15px;
        color: #666666;
    }
    .known{
        position: absolute;
        right: 10px;
        font-size: 15px;
        color: #046FDB;
    }
    .content{
        height: 364px;
        overflow: auto;
        padding: 0 24px;
    }
    .content::after{
        content : '';
        display: block;
        width: 100%;
        height: 20px;
    }

    .productNotice{
        height: 30px;
        font-size: 15px;
        color: #333333;
        padding-bottom: 9px;
        margin-top: 14px;
    }
    .notice{
        font-size: 12px;
        color: #999999;
        word-break: break-all;
        white-space: pre-line;
    }
    .footer{
        height: 38px;
        background: #F5F6F8;
        line-height: 38px;
        text-align: right;
    }
    .price{
        color: #F7981C;
    }
    .commission{
        color: #046FDB;
        margin-left: 20px;
        padding-right: 10px;
    }
</style>
