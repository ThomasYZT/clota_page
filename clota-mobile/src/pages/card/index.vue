<!--我的卡包-->

<template>
    <div class="card">
        <div class="tab-wrap">
            <tab v-model="tabSelected">
                <tab-item @on-item-click="selectCard('year')">年卡</tab-item>
                <tab-item @on-item-click="selectCard('pop')">次卡</tab-item>
            </tab>
        </div>
        <swiper dots-position="center"
                v-model="cardType"
                :threshold="100"
                :aspect-ratio="10"
                :show-dots="false"
                @on-index-change="cardTypeChange">
            <swiper-item
                class="swiper-demo-img">
                <div class="year-card">
                    <div class="card-area">
                        <div class="card-inner"></div>
                    </div>
                    <!--年卡信息-->
                    <card-info title="年卡信息">
                    </card-info>
                    <!--成员信息-->
                    <member-info>
                    </member-info>
                    <!--可用范围-->
                    <use-area>
                    </use-area>
                    <!--使用说明-->
                    <use-explain>
                    </use-explain>
                </div>
            </swiper-item>
            <swiper-item
                class="swiper-demo-img">
                <div class="time-card">
                    <div class="card-area">
                        <div class="card-inner"></div>
                    </div>
                    <!--次卡信息-->
                    <card-info title="次卡信息">
                    </card-info>
                    <!--成员信息-->
                    <member-info>
                    </member-info>
                    <!--可用范围-->
                    <use-area>
                    </use-area>
                    <!--使用说明-->
                    <use-explain>
                    </use-explain>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import cardInfo from './child/cardInfo';
    import memberInfo from './child/memberInfo';
    import useArea from './child/useArea';
    import useExplain from './child/use-explain';
    export default {
        data() {
            return {
                //卡包类型
                cardType : 0,
                //选中的tap列
                tabSelected : 0
            }
        },
        components : {
            cardInfo,
            memberInfo,
            useArea,
            useExplain
        },
        methods: {
            /**
             * 卡包类型改变
             * @param index 卡包序号
             */
            cardTypeChange (index) {
                this.tabSelected = index;
            },
            /**
             * 选择卡包类型
             * @param type
             */
            selectCard (type) {
                if(type === 'year'){
                    this.cardType = 0;
                }else if(type === 'pop'){
                    this.cardType = 1;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    $img_base_url : '../../assets/images/';
    .card{
        @include block_outline();
        overflow: hidden;
        background: rgba(242,243,244,1);

        .tab-wrap{
            position: fixed;
            width: 100%;
            top : 0;
            z-index: 9;
        }

        /deep/ .vux-tab-ink-bar{
            background: #046FDB;
            height: 1.5px!important;
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
            padding-top: 55px;

            .vux-swiper{
                width: 100%;
                height: 100% !important;
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

        /deep/ .info-detail{

            &.detail-padding{
                padding: 9.5px 19px;
            }

            .field{
                @include block_outline($height : 26px);
                padding: 4.5px 0;
                line-height: 17px;
                font-size: $font_size_12px;

                &.bit-title{
                    font-size: $font_size_14px;
                    color: #4A4A4A;
                    margin-bottom: 1px;
                }

                .key{
                    color: #8E9091;
                }

                .value{
                    color: #353B48;
                }
            }
        }

        /deep/ .vux-swiper-item{
            height: 100%;

        }

        .year-card,
        .time-card{
            overflow: auto;
            height: 100%;
            -webkit-overflow-scrolling: touch;
            @include padding_place($height : 9px);

            .card-area{
                width: 100%;
                padding-bottom: 19px;
                padding-top: 22.5px;
                background: $color_fff;

                .card-inner{
                    @include block_outline(unquote('calc(100% - 50px)'),170px);
                    max-width: 375px;
                    background-size: 100% 170px;
                    margin: 0 auto;
                    background-repeat: no-repeat;
                }
            }

            .hr{
                height: 9px;
            }
        }

        .time-card .card-inner{
            background: url("../../assets/images/onceCard.png");
        }

        .year-card .card-inner{
            background: url("../../assets/images/yeaeCard.png");
        }
    }
</style>
