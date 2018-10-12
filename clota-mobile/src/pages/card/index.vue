<!--我的卡包-->

<template>
    <div class="card">
        <div class="tab-wrap" v-if="tapInfo.length > 1">
            <!--卡包tap列表-->
            <tab v-model="tabSelected">
                <tab-item
                    v-for="(item,i) in tapInfo"
                    :key="i"
                    @on-item-click="selectCard(item)">
                    {{$t(item)}}
                </tab-item>
            </tab>
        </div>
        <swiper dots-position="center"
                v-model="cardType"
                :class="{'no-top-padding' : tapInfo.length < 2}"
                v-if="tapInfo.length > 0"
                :threshold="100"
                :aspect-ratio="10"
                :show-dots="false"
                @on-index-change="cardTypeChange">
            <swiper-item
                v-if="tapInfo.includes('yearCard')"
                class="swiper-demo-img">
                <div class="year-card">
                    <div class="card-area">
                        <div class="card-inner">
                            <img class="head-img" :src="yearyCardInfo.pic | headImgFilter" @click="previewImg(yearyCardInfo.pic)" alt="">
                            <span class="mem-name">{{yearyCardInfo.issuser | contentFilter}}</span>
                            <div class="scene-area">{{yearyCardInfo.vipCardName | contentFilter}}</div>
                            <div class="card-id">{{yearyCardInfo.physicalCardNo | contentFilter}}</div>
                            <span class="iconfont icon-code" @click="showYearCode"></span>
                            <span class="iconfont icon-arrow-right"></span>
                        </div>
                    </div>
                    <!--年卡信息-->
                    <card-info :title="$t('yearCardInfo')" :card-info="yearyCardInfo">
                    </card-info>
                    <!--成员信息-->
                    <member-info :avail-persons="yearyCardInfo.availPersons">
                    </member-info>
                    <!--可用范围-->
                    <use-area :avail-orgs="yearyCardInfo.availOrgs">
                    </use-area>
                    <!--使用说明-->
                    <use-explain :explain="yearyCardInfo.instructions">
                    </use-explain>
                </div>
            </swiper-item>
            <swiper-item
                v-if="tapInfo.includes('timeCard')"
                class="swiper-demo-img">
                <div class="time-card">
                    <div class="card-area">
                        <div class="card-inner">
                            <img class="head-img" :src="timeCardInfo.pic | headImgFilter" @click="previewImg(timeCardInfo.pic)" alt="">
                            <span class="mem-name">{{timeCardInfo.issuser | contentFilter}}</span>
                            <div class="scene-area">{{timeCardInfo.vipCardName | contentFilter}}</div>
                            <div class="card-id">{{timeCardInfo.physicalCardNo | contentFilter}}</div>
                            <span class="iconfont icon-code" @click="showTimeCode"></span>
                            <span class="iconfont icon-arrow-right"></span>
                        </div>
                    </div>
                    <!--次卡信息-->
                    <card-info :title="$t('timeCardInfo')" :card-info="timeCardInfo">
                    </card-info>
                    <!--成员信息-->
                    <member-info :avail-persons="timeCardInfo.availPersons">
                    </member-info>
                    <!--可用范围-->
                    <use-area :avail-orgs="timeCardInfo.availOrgs">
                    </use-area>
                    <!--使用说明-->
                    <use-explain :explain="timeCardInfo.instructions">
                    </use-explain>
                </div>
            </swiper-item>
        </swiper>
        <!--无数据显示-->
        <no-data class="page-no-data" v-else>
        </no-data>
        <!--预览图片-->
        <div v-transfer-dom class="img-preview">
            <previewer
                :list="prevList"
                ref="previewer">
            </previewer>
        </div>
        <!--年卡会员二维码-->
        <qrcode ref="yearQrcode"
                style="position: absolute;z-index: -1;"
                :value="yearyCardInfo.physicalCardNo"
                type="img">
        </qrcode>
        <!--次卡会员二维码-->
        <qrcode ref="timesQrcode"
                style="position: absolute;z-index: -1;"
                :value="timeCardInfo.physicalCardNo"
                type="img">
        </qrcode>
    </div>
</template>

<script>
    import cardInfo from './child/cardInfo';
    import memberInfo from './child/memberInfo';
    import useArea from './child/useArea';
    import useExplain from './child/use-explain';
    import ajax from '@/api/index.js';
    import noData from '@/components/noData/index.vue';
    export default {
        data() {
            return {
                //卡包类型
                cardType : 0,
                //选中的tap列
                tabSelected : 0,
                prevList : [],
                //tap信息
                tapInfo : [],
                //年卡信息
                yearyCardInfo : {},
                //次卡信息
                timeCardInfo : {}
            }
        },
        components : {
            cardInfo,
            memberInfo,
            useArea,
            useExplain,
            noData
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
                if(type === 'yearCard'){
                    this.cardType = 0;
                }else if(type === 'timeCard'){
                    this.cardType = 1;
                }
            },
            /**
             * 显示年卡二维码
             */
            showYearCode () {
                this.prevList = [
                    {
                        src: this.$refs.yearQrcode.imgData,
                        w: 240,
                        h: 240
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0)
                });
            },
            /**
             * 显示次卡二维码
             */
            showTimeCode () {
                this.prevList = [
                    {
                        msrc: this.$refs.timesQrcode.imgData,
                        src: this.$refs.timesQrcode.imgData,
                        w: 240,
                        h: 240,
                        initialPosition : {
                            x : 100
                        }
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0)
                });
            },
            /**
             * 预览照片
             * @param imgSrc 预览图片链接
             */
            previewImg (imgSrc) {
                this.prevList = [
                    {
                        src: imgSrc ? imgSrc : require('../../assets/images/defaut-face.png'),
                        w: document.body.offsetWidth,
                        h: 240
                    }
                ];
                this.$nextTick(() =>{
                    this.$refs.previewer.show(0)
                });
            },
            /**
             * 获取卡包信息
             */
            getCard () {
                ajax.post('getCardPackage').then(res => {
                    if(res.success){
                        this.setCardInfo(res.data ? res.data : []);
                    }else{
                        this.tapInfo = [];
                    }
                })
            },
            /**
             * 获取卡包信息
             * @param cardData 卡包信息
             */
            setCardInfo (cardData) {
                this.tapInfo = [];
                if(cardData.length > 0){
                    for(let i  =0,j = cardData.length;i < j;i++){
                        //获取卡包tap栏列表
                        if(cardData[i].vipType === 'annual'){
                            this.tapInfo.push('yearCard');
                            this.yearyCardInfo = cardData[i];
                        }else if(cardData[i].vipType === 'times'){
                            this.tapInfo.push('timeCard');
                            this.timeCardInfo = cardData[i];
                        }
                    }
                }
            }
        },
        created () {
            this.getCard();
        },
        filters : {
            //头像过滤器
            headImgFilter (content) {
                if(content) return content;
                else{
                    return require('../../assets/images/defaut-face.png');
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

        .page-no-data{
            @include block_outline();
        }

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
            padding-top: 55px;

            &.no-top-padding{
                padding-top: 0;
            }

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
                        font-weight: bold;
                    }

                    .icon-code{
                        @include absolute_pos(absolute,$bottom : 19px,$right : 27px);
                        color: $color_fff;
                    }

                    .icon-arrow-right{
                        @include absolute_pos(absolute,$bottom : 20px,$right : 13px);
                        color: $color_fff;
                        font-size: 12px;
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

    .img-preview .pswp__img{
        padding: 49px;
        background: #ffffff;
    }
</style>
