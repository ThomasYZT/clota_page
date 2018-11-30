<!--我的订单-->

<template>
    <div class="order">
        <div class="title">
            <span class="time">
                 {{'2018-06-19'}}
                <span class="iconfont icon-arrow-right"></span>
            </span>
            <span class="zhi">至</span>
            <span class="time">
                 {{'2018-06-19'}}
                <span class="iconfont icon-arrow-right"></span>
            </span>
            <span class="product-filter">
                产品
            </span>
        </div>
        <div class="tab-wrap">
            <!--卡包tap列表-->
            <tab v-model="tabSelected">
                <tab-item
                    v-for="(item,i) in tapInfo"
                    :key="i"
                    @on-item-click="selectCard(i)">
                    {{$t(item)}}{{$t('bracketSetting',{ content : 5 })}}
                </tab-item>
            </tab>
        </div>
        <div class="content">
            <swiper dots-position="center"
                    v-model="cardType"
                    :class="{'no-top-padding' : tapInfo.length < 2}"
                    v-if="tapInfo.length > 0"
                    :threshold="100"
                    :aspect-ratio="10"
                    :show-dots="false"
                    @on-index-change="cardTypeChange">
                <swiper-item>
                    <tab-item-list :data="allOrderInfo">
                    </tab-item-list>
                </swiper-item>
                <swiper-item>
                    <tab-item-list :data="depositInfo"
                                   :show-radio="true">
                    </tab-item-list>
                </swiper-item>
                <swiper-item>
                    <tab-item-list :data="allOrderInfo">
                    </tab-item-list>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>

<script>
    import tabItemList from './components/tab-item-list';
	export default {
		data () {
			return {
			    //选择的菜单
                tabSelected : 0,
                //菜单列表
                tapInfo : [
                    '全部',
                    '未体现',
                    '已体现'
                ],
                cardType : 0,
                allOrderInfo : [
                    {
                        id : 1,
                        name : '1'
                    },
                    {
                        id : 2,
                        name : '1'
                    },{
                        id : 3,
                        name : '1'
                    },{
                        id : 4,
                        name : '1'
                    },{
                        id : 5,
                        name : '1'
                    },
                ],
                depositInfo : [
                    {
                        id : 2,
                        name : '2'
                    }
                ]
            };
		},
        components : {
            tabItemList
        },
		methods : {
            /**
             * 选择了某个菜单
             * @param{Number} item tap菜单序列号
             */
            selectCard (item) {
                this.cardType = item;
            },
            /**
             * 卡包类型改变
             * @param index 卡包序号
             */
            cardTypeChange (index) {
                this.tabSelected = index;
            },
        }
	}
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order{
        @include block_outline();
        background: #f2f3f4;

        .title{
            @include block_outline($height : 40px);
            line-height: 40px;
            padding-left: 12px;
            padding-right: 12px;
            font-size: $font_size_16px;
            color: $color_333;
            background: $color_fff;

            .zhi{
                padding: 0 15px;
            }

            .icon-arrow-right{
                display: inline-block;
                transform: rotate(90deg);
                font-size: $font_size_15px;
                color: #8395A7;
            }

            .product-filter{
                float: right;
                font-size: $font_size_14px;
                color: $color_333;
            }
        }
        .tab-wrap{
            @include block_outline($height : 45px);
            /*margin-bottom: 8px;*/
        }
        /deep/ .vux-tab-ink-bar{
            background: #046FDB;
            height: 2px!important;
        }

        .content{
            height: calc(100% - 90px);

            /deep/ .vux-slider,
            /deep/ .vux-swiper-item,
            /deep/ .vux-swiper{
                height: 100%!important;
            }
        }
    }
</style>
