<!--
    会员注册
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
    import scroll from '../../components/scroll/scroll';
    import ajax from '../../api/index';
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
                    txt : this.$t('freshComplete')
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
                this.pageSetting.pageNo = 1;
                this.getData();
            },
            /**
             * 上拉刷新操作
             */
            onPullingUp () {
                this.pageSetting.pageNo += 1;
                this.getData();
            },
            /**
             * 获取列表数据
             */
            getData () {
                ajax.post('queryPagedGoods', this.pageSetting).then(res => {
                    if (res.success) {
                        //下拉 刷新加载第1页
                        if (this.pageSetting.pageNo === 1) {
                            this.goodsList = res.data ? res.data.data : [];
                            //上拉 刷新加载第N页
                        } else {
                            if (res.data.data.length !== 0) {
                                this.goodsList = this.goodsList.concat(res.data ? res.data.data : []);
                            } else {
                                this.pageSetting.pageNo -= 1;
                                this.refresh();
                            }
                        }
                    } else {
                        this.goodsList = [];
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
                background-image: url("../../assets/images/integral-title-bg.svg");
                background-size: 100% 100%;
            }

            .right-title {
                position: absolute;
                top: 8px;
                right: 18px;
                font-size: 14px;
                color: $color_333;
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
