<!--产品列表-->

<template>
    <!--产品列表是否显示-->
    <popup :value="value"
           position="right"
           @input="changeStatus($event)"
           v-transfer-dom
           @on-show="initData">
        <div :class="$style.productWrap">
            <div :class="$style.head">{{$t('筛选')}}</div>
            <div :class="$style.content">
                <div :class="$style.productList"
                     v-for="(item,index) in productData"
                     :key="index"
                     @click="chooseProduct(item)">
                    <span class="iconfont icon-checked"
                          :class="[choosedProductList.find(list => list.productId === item.productId) ? $style.checked : '',$style.icon]"></span>{{item.productName | contentFilter}}
                </div>
            </div>
            <ul :class="$style.btnWrap">
                <li :class="$style.reset" @click="reset">{{$t('重置')}}</li>
                <li :class="[$style.complete]" @click="completeChoose">{{$t('完成')}}</li>
            </ul>
        </div>
    </popup>
</template>

<script>
    export default {
        props : {
            //列表页面是否显示
            value : {
                type : Boolean,
                default : false
            },
            //产品列表信息
            data : {
                type : Array,
                default () {
                    return [];
                }
            },
            //默认选中的产品信息
            'default-choosed-data' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                //选择的产品信息
                choosedProductList : []
            };
        },
        methods : {
            /**
             * 改变弹框状态
             * @param{Boolean} status 改变后的状态
             */
            changeStatus (status) {
                this.$emit('input',status);
            },
            /**
             * 选择产品信息
             * @param{Object} productInfo 产品信息
             */
            chooseProduct (productInfo) {
                this.choosedProductList = [productInfo];
            },
            /**
             * 完成选择
             */
            completeChoose () {
                this.$emit('set-choosed-product',this.choosedProductList);
                this.changeStatus(false);
            },
            /**
             * 重置选择
             */
            reset () {
                this.choosedProductList = [{
                    productName : this.$t('全部'),
                    productId : 'all'
                }];
                this.completeChoose();
            },
            /**
             * 初始化数据
             */
            initData () {
                this.choosedProductList = this.defaultChoosedData;
            }
        },
        computed : {
            //产品信息列表
            productData () {
                return [{
                    productName : this.$t('全部'),
                    productId : 'all'
                }].concat(this.data);
            }
        }
    };
</script>
<style module>
    .productWrap{
        background: #fff;
        width:235px;
        height: 100%;
    }
    .head{
        height: 25px;
        line-height: 25px;
        padding-left: 10px;
        color: #333333;
        font-size:12px;
        background: #FAFBFE;
    }
    .content{
        height: calc(100% - 65px);
        overflow: auto;
        padding: 0 10px;
    }

    .btnWrap{
        height: 40px;
        background: #FAFBFE;
    }

    .reset,
    .complete{
        width: 50%;
        height: 100%;
        float: left;
        text-align: center;
        line-height: 28px;
        font-size: 13px;
        padding: 6px 0;
        border-top: 0.5px solid #C5C5C5;
    }
    .complete{
        color: #2F70DF;
        border-left: 0.5px solid #C5C5C5;
    }
    .productList{
        height: 41px;
        line-height: 41px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333333;
        font-size: 14px;
        position: relative;
    }

    .icon{
        font-size: 15px;
        position: relative;
        top : 2px;
        padding: 0 10px;
        color: #C5C5C5;
    }

    .checked{
        color: #2F70DF;
    }
</style>
