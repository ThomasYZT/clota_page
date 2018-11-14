<!--
    兑换记录
    作者：杨泽涛
-->
<template>
    <div class="exchange-record">
        <div class="tab-wrap">
            <!--卡包tap列表-->
            <tab v-model="tabSelected">
                <tab-item
                    v-for="(item,i) in tapInfo"
                    :key="i">
                    {{$t(item)}}
                </tab-item>
            </tab>
        </div>
        <swiper dots-position="center"
                v-model="tabSelected"
                :threshold="100"
                :aspect-ratio="10"
                :show-dots="false"
                @on-index-change="swiperChange">
            <!-- 已领取 -->
            <swiper-item class="swiper-demo-img">
                <goodBoard v-for="(item, index) in receivedList" :key="index" :info="item"></goodBoard>
            </swiper-item>
            <!-- 未领取 -->
            <swiper-item class="swiper-demo-img">
                <goodBoard v-for="(item, index) in unreceivedList" :key="index" :info="item"></goodBoard>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import ajax from '../../api/index';
    import goodBoard from './components/goodBoard';
    import { mapGetters } from 'vuex';
    export default {
        components : {
            goodBoard
        },
        data () {
            return {
                //tab列表
                tapInfo : ['received','unreceived'],
                //当前选择的状态
                tabSelected : 0,
                //已领取数据列表
                receivedList : [],
                //未领取数据列表
                unreceivedList : [],
                //已领取/未领取
                drawStatus : true
            };
        },
        computed : {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods : {
            /**
             * tab栏切换
             * @param item
             */
            swiperChange (index) {
                this.getData(index)
            },
            /**
             * 获取列表数据
             * @param index
             */
            getData (index) {
                if (this.tapInfo[index] === 'received') {
                    this.drawStatus = true;
                } else if (this.tapInfo[index] === 'unreceived') {
                    this.drawStatus = false;
                }
                ajax.post('queryChangeRecordByDrawStatus', {
                    drawStatus : this.drawStatus,
                    memberId : this.userInfo.memberId
                }).then(res => {
                    if (res.success) {
                        if (this.drawStatus) {
                            this.receivedList = res.data ? res.data : [];
                        } else {
                            this.unreceivedList = res.data ? res.data : [];
                        }
                    } else {
                        this.receivedList = [];
                        this.unreceivedList = [];
                    }
                });
            }
        },
        created () {
            this.getData(0);

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .exchange-record {
        @include block_outline();
        overflow: auto;
        background: rgba(242,243,244,1);

        .tab-wrap{
            position: fixed;
            width: 100%;
            top : 0;
            z-index: 9;
        }

        /deep/ .vux-tab-ink-bar{
            background: #046FDB;
            height: 2px!important;
        }

        /deep/ .vux-tab-item{
            color: #353B48!important;
            font-size: $font_size_15px!important;
        }

        /deep/ .vux-tab-selected{
            color: #046FDB!important;
        }

        /deep/ .vux-slider{
            height: 100%;
            /*min-height: 100% !important;*/
            background: rgba(242,243,244,1);
            overflow: auto;
            padding-top: 50px;

            &.no-top-padding{
                padding-top: 0;
            }

            .vux-swiper{
                width: 100%;
                height: calc(100% - 52px) !important;
                overflow-x: hidden;
                overflow-y:auto;
            }
        }

        /deep/ .title{
            @include block_outline($height : 40px);
            padding: 9.5px 19px;
            font-size: $font_size_15px;
            color: #353B48;
            border-bottom: 0.5px solid #E8E8E8;

            .iconfont{
                font-size: $font_size_19px;
                vertical-align: middle;
                margin-right: 5px;
            }

            .font-label{
                vertical-align: middle;
            }
        }
        /deep/ .vux-swiper-item{
            height: 100%;

        }
    }
</style>
