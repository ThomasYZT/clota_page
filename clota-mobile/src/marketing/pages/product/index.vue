<!--我的产品-->

<template>
    <div class="product-info">
        <div class="date-list">
            <span class="date-area" @click="choseDate">
            {{productDate}}
            <span class="iconfont icon-arrow-right"></span>
            </span>
        </div>
        <div class="area-info">
            地址：广州市番禺区迎宾路长隆旅游度假区内
        </div>
        <div class="product-list">
            <scroll ref="scroll"
                    :data="productListData"
                    :scrollbar="scrollbarObj"
                    :pullDownRefresh="pullDownRefreshObj"
                    :pullUpLoad="pullUpLoadObj"
                    :startY="parseInt(startY)"
                    @pullingDown="onPullingDown"
                    @pullingUp="onPullingUp">
                <template v-for="(item,index) in productListData">
                    <product-list :key="index"
                                  :product-info="item"
                                  @show-notice="showProductNoticeMethod">
                    </product-list>
                </template>
            </scroll>
        </div>
        <div v-transfer-dom>
            <popup v-model="showProductNotice">
                <div :class="$style.popupBody">
                    <div :class="$style.head">
                        <span :class="$style.known" @click="showProductNotice = false">{{$t('知道了')}}</span>
                        购票须知
                    </div>
                    <div :class="$style.content">
                        <div :class="$style.productTitle">广州长隆水上乐园成人单人票</div>
                        <div :class="$style.productNotice">{{$t('colonSetting',{ key : $t('产品说明') })}}</div>
                        <div :class="$style.notice">本产品包含：水上乐园全天双人票1张，野生动物园门票1张以及飞鸟乐园10选3门票1张。
                            其中飞鸟乐园可选游玩项目包括：丛林飞龙、旋转木马、哪吒闹海。。。
                            使用规则：两人同时检票入园，每张票限免费携带一名1.0米（不含）以下儿童入园。
                            有效期：游玩日期当天起3天有效。
                            适用条件：成人或身高1.5米（含）以上儿童。</div>
                        <div :class="$style.productNotice">{{$t('colonSetting',{ key : $t('购票须知') })}}</div>
                        <div :class="$style.notice">本产品包含：水上乐园全天双人票1张，野生动物园门票1张以及飞鸟乐园10选3门票1张。
                            其中飞鸟乐园可选游玩项目包括：丛林飞龙、旋转木马、哪吒闹海。。。
                            使用规则：两人同时检票入园，每张票限免费携带一名1.0米（不含）以下儿童入园。
                            有效期：游玩日期当天起3天有效。
                            适用条件：成人或身高1.5米（含）以上儿童。</div>
                    </div>
                    <div :class="$style.footer">
                        <span :class="$style.price">{{$t('colonSetting',{ key : $t('佣金') })}}{{ 121 | moneyFilter(2,'¥') | contentFilter }}</span>
                        <span :class="$style.commission">{{$t('colonSetting',{ key : $t('佣金') })}}{{ 121 | moneyFilter(2,'¥') | contentFilter }}</span>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
    import productList from './components/product-list';
    import scroll from '@/components/scroll/scroll';
    import Vue from 'vue';
    import ajax from '@/api/index.js';
	export default {
		data () {
			return {
			    //查看产品日期
			    productDate : new Date().format('yyyy-MM-dd'),
                //是否显示滚动条
                scrollbar : false,
                pullDownRefresh : true,
                pullUpLoad : true,
                pullDownRefreshThreshold : 90,
                scrollbarFade : true,
                pullDownRefreshStop : 40,
                pullUpLoadThreshold : 0,
                pullUpLoadMoreTxt : 'pullUpLoadMoreTxt',
                pullUpLoadNoMoreTxt : 'loading',
                startY : 0,
                //产品列表数据
                productListData : [
                    {}
                ],
                //显示购票须知
                showProductNotice : false
            };
		},
        components : {
            productList,
            scroll
        },
		methods : {
            /**
             * 选择日期
             */
            choseDate () {
                this.$vux.datetime.show({
                    cancelText : '取消',
                    confirmText : '确定',
                    format : 'YYYY-MM-DD',
                    value : this.productDate,
                    onConfirm : (val) => {
                        this.productDate = val;
                    }
                });
            },
            /**
             * 下拉刷新
             */
            onPullingDown () {
                ajax.post('',{

                }).then((res) => {
                    // if (this._isDestroyed) {
                    //     return;
                    // }
                    if (res.success) {
                        this.productListData = res.data ? res.data : [];
                    } else {
                        // 如果没有新数据
                        this.$refs.scroll.forceUpdate()
                    }
                });
            },
            /**
             * 上拉刷新
             */
            onPullingUp () {
                ajax.post('',{

                }).then((res) => {
                    // if (this._isDestroyed) {
                    //     return;
                    // }
                    if (res.success) {
                        this.productListData = res.data ? res.data : [];
                    } else {
                        // 如果没有新数据
                        this.$refs.scroll.forceUpdate()
                    }
                });
            },
            /**
             * 重新渲染scroll组件
             */
            rebuildScroll : function () {
                Vue.nextTick(() => {
                    this.$refs.scroll.destroy();
                    this.$refs.scroll.initScroll();
                });
            },
            /**
             * 显示购票须知详情
             * @param data
             */
            showProductNoticeMethod (data) {
                this.showProductNotice = true;
            },
            /**
             * 获取产品信息
             */
            getProductListInfo () {
                ajax.post('',{

                }).then(res => {
                    if (res.success) {
                        this.productListData = res.data ? res.data : [];
                    } else {
                        this.productListData = [];
                    }
                });
            }
        },
        computed : {
            scrollbarObj : function () {
                return this.scrollbar ? { fade : this.scrollbarFade } : false;
            },
            pullDownRefreshObj : function () {
                return this.pullDownRefresh ? {
                    threshold : parseInt(this.pullDownRefreshThreshold),
                    stop : parseInt(this.pullDownRefreshStop),
                    txt : 'freshComplete'
                } : false;
            },
            pullUpLoadObj : function () {
                return this.pullUpLoad ? {
                    threshold : parseInt(this.pullUpLoadThreshold),
                    txt : { more : 'loading', noMore : 'noMoreData' }
                } : false;
            }
        },
        watch : {
            startY () {
                this.rebuildScroll();
            }
        },
        created () {
		    this.getProductListInfo();
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .product-info{
        @include block_outline();
        background: #f2f3f4;

        .date-list{
            @include block_outline($height : 40px);
            line-height: 40px;
            font-size: $font_size_16px;
            color: #353B48;
            padding-left: 20px;
            background: $color_fff;

            .date-area{
                display: inline-block;
            }

            .icon-arrow-right{
                display: inline-block;
                transform: rotate(90deg);
                font-size: $font_size_15px;
                color: #8395A7;
            }
        }

        .area-info{
            @include block_outline($height : 30px);
            line-height: 30px;
            padding-left: 14px;
            @include overflow_tip();
        }

        .product-list{
            @include block_outline($height : unquote('calc(100% - 70px)'));

            .flex-box{
                background: transparent;
            }
        }
    }
</style>
<style module>
    .popupBody{
        width: 100%;
        height: 400px;
        background: #fff;
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
        height: 318px;
        overflow: auto;
        padding: 0 24px;
    }
    .productTitle{
        text-align: center;
        height: 46px;
        padding: 19px 0 5px 0;
        line-height: 22px;
        font-size: 15px;
        color: #333333;
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
