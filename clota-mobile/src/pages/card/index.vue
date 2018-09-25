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
                        <div class="card-inner">
                            <img class="head-img" src="../../assets/images/icon-ali-pay.svg" @click="previewImg" alt="">
                            <span class="mem-name">刘木子</span>
                            <div class="scene-area">北京欢乐谷景区年卡</div>
                            <div class="card-id">8799  7493  6102</div>
                            <span class="iconfont icon-alipay" @click="showCode"></span>
                        </div>
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
                        <div class="card-inner">
                            <img class="head-img" src="../../assets/images/icon-ali-pay.svg" alt="">
                            <span class="mem-name">刘木子</span>
                            <div class="scene-area">北京欢乐谷景区年卡</div>
                            <div class="card-id">8799  7493  6102</div>
                            <span class="iconfont icon-alipay"></span>
                        </div>
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
        <!--预览图片-->
        <div v-transfer-dom class="img-preview">
            <previewer :list="prevList" ref="previewer"></previewer>
        </div>
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
                tabSelected : 0,
                prevList : [],
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
            },
            /**
             * 显示二维码
             */
            showCode () {
                this.prevList = [
                    {
                        msrc: require('../../assets/images/test.jpg'),
                        src: require('../../assets/images/test.jpg'),
                        w: 240,
                        h: 240
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0)
                });
            },
            /**
             * 预览照片
             */
            previewImg () {
                this.prevList = [
                    {
                        msrc: require('../../assets/images/onceCard.png'),
                        src: require('../../assets/images/onceCard.png'),
                        w: document.body.offsetWidth,
                        h: 240
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0)
                });
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
                    position: relative;
                    padding: 19px 22px;
                    @include block_outline(unquote('calc(100% - 50px)'),170px);
                    max-width: 375px;
                    background-size: 100% 170px;
                    margin: 0 auto;
                    background-repeat: no-repeat;

                    .head-img{
                        display: inline-block;
                        @include block_outline(33px,33px);
                        border-radius: 17px;
                        float: left;
                        vertical-align: middle;
                    }

                    .mem-name{
                        display: inline-block;
                        vertical-align: middle;
                        max-width: calc(100% - 100px);
                        height: 33px;
                        line-height: 33px;
                        padding-left: 10px;
                        @include overflow_tip();
                        color: $color_fff;
                        font-size: $font_size_14px;
                    }

                    .scene-area{
                        @include absolute_pos(absolute,$bottom : 45px);
                        font-size: $font_size_12px;
                        color: $color_fff;
                    }

                    .card-id{
                        @include absolute_pos(absolute,$bottom : 19px);
                        font-size: $font_size_12px;
                        color: $color_fff;
                    }

                    .iconfont{
                        @include absolute_pos(absolute,$bottom : 19px,$right : 27px);
                        color: $color_fff;
                    }
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
<style>
    .img-preview .pswp__bg{
        background: rgba(0,0,0,0.7)!important;
    }
</style>
