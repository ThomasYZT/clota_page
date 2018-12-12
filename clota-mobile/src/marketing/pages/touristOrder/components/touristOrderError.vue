<!--游客下单失败提示-->

<template>
    <x-dialog :show="value" class="dialog-demo" v-transfer-dom>
        <div :class="$style.ProductInfo">
            <ul :class="$style.proList">
                <li :class="$style.liTitle">{{$t('根据产品销售政策设置：')}}</li>
                <li v-for="item in touristInfo"
                    :key="item.productId"
                    :class="$style.detail">{{item.visitorName}}最多购买{{item.maxCount}}个{{item.productName}}。</li>
            </ul>
            <div :class="$style.confirm" @click="$emit('input',false)">{{$t('confirm')}}</div>
        </div>
    </x-dialog>
</template>

<script>
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
            //游客信息
            'tourist-info' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>
<style module>
    .ProductInfo{
        width: 100%;
        min-height: 100px;
        background: #ffffff;
        position: relative;
        padding-top: 10px;
    }
    .liTitle{
        font-size: 15px;
        padding: 10px 0;
    }
    .proList{
        padding: 0 10px 20px;
    }
    .confirm{
        width: 100%;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 14px;
        color: #333333;
        position: relative;
        bottom: 0;
        border-top: 0.5px solid #d5d5d6;
    }
    .detail{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
    }
</style>
