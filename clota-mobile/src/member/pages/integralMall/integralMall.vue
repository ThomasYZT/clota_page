<!--
    积分商城
    作者：杨泽涛
-->
<template>
    <div class="integral-mall">
        <div class="header">
            <h4 class="title">{{$t('allGoods')}}</h4>
            <span class="right-title" @click="toExchangeRecord">{{$t('conversionRecord')}}</span>
        </div>

        <div class="scroll-wrapper">
            <scroll ref="scroll"
                    :data="goodsList"
                    :scrollbar="scrollbar"
                    :pullDownRefresh="pullDownRefreshObj"
                    :pullUpLoad="pullUpLoadObj"
                    @pullingDown="onPullingDown"
                    @pullingUp="onPullingUp">
                <div class="good-board">
                    <good-card v-for="(item, index) in goodsList"
                               :key="index"
                               :info="item">

                    </good-card>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
    import goodCard from './components/goodCard';
    import scroll from '@/components/scroll/scroll';
    import ajax from '@/member/api/index.js';
    export default {
        components : {
            scroll,
            goodCard
        },
        data () {
            return {
                //商品列表数据
                goodsList : [],
                //是否显示滚动条
                scrollbar : false,
                //下拉刷新配置
                pullDownRefreshObj : {
                    //临界值
                    threshold : 90,
                    //刷新完成bubble停留的位置
                    stop : 40,
                    //设置加载和加载中显示的文字
                    txt : 'freshComplete'
                },
                //上拉加载配置
                pullUpLoadObj : {
                    //临界值
                    threshold : 20,
                    //设置加载和加载中显示的文字
                    txt : { more : 'loading', noMore : 'noMoreData' }
                },
                //分页设置
                pageSetting : {
                    pageNo : 1,
                    pageSize : 10
                },
            };
        },
        methods : {
            /**
             * 下拉刷新操作
             */
            onPullingDown () {
                this.pageSetting = {
                    pageNo : 1,
                    pageSize : 10
                };
                this.getData();
            },
            /**
             * 上拉加载操作
             */
            onPullingUp () {
                this.pageSetting.pageSize += 10;
                this.getData();
            },
            /**
             * 获取列表数据
             */
            getData () {
                ajax.post('queryPagedGoods', this.pageSetting).then(res => {
                    if (res.success) {
                        if (res.data) {
                            if ( res.data.data.length >= this.pageSetting.pageNo * (this.pageSetting.pageSize - 10) && res.data.data.length <= this.pageSetting.pageNo * this.pageSetting.pageSize) {
                                this.goodsList = res.data ? res.data.data : [];
                            } else {
                                this.goodsList = res.data ? res.data.data : [];
                                this.refresh();
                                this.pageSetting.pageSize -= 10;
                            }
                        } else {
                            this.goodsList = [];
                        }
                    } else {
                        this.goodsList = [];
                        this.$vux.toast.text(this.$t('getDataFailure'));
                    }
                });
            },
            /**
             * 强制刷新scroll
             */
            refresh () {
                this.$refs.scroll.forceUpdate();
            },
            /**
             * 前往兑换记录
             */
            toExchangeRecord () {
                this.$router.push({
                    name : 'exchangeRecord'
                })
            }
        },
        created () {
            this.getData();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .integral-mall {
        height: 100%;
        background: #F4F6F9;
        .header {
            position: relative;
            height: 30px;
            width: 100%;
            text-align: center;
            margin-bottom: 8px;
            .title {
                margin-top: 8px;
                display: inline-block;
                min-width: 100px;
                text-align: center;
                font-size: 16px;
                color: $color_333;
                background-image: url("../../../assets/images/integral-title-bg.svg");
                background-size: 100% 100%;
            }

            .right-title {
                position: absolute;
                top: 8px;
                right: 18px;
                font-size: 14px;
                color: $color_333;
                white-space: nowrap;
            }
        }

        .scroll-wrapper {
            position: relative;
            height: calc(100% - 92px);
            background: #F4F6F9;

            .good-board {
                padding: 10px 11.5px 0;
                position: relative;
                width: 100%;
                height: calc(100% - 92px);
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: stretch;
                z-index: 10;
            }
        }
    }
</style>
