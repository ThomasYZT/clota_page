<!--
    兑换商品
    作者：杨泽涛
-->
<template>
    <div class="exchange-good">
        <div class="good-board">
            <div class="img-wrapper">
                <div class="zoom-img" :style="{backgroundImage:'url('+detail.pics+')'}"></div>
            </div>

            <div class="content-wrapper">
                <p class="good-name">{{detail.name | contentFilter}}</p>
                <span class="price">{{$t('marketPrice')}} : {{detail.marketPrice | moneyFilter}}</span>
                <p class="score">{{detail.requiredCredits | contentFilter}}<span>{{$t('score')}}</span></p>
            </div>
        </div>

        <div class="button" @click="exchange">{{$t('confirmExchange')}}</div>

        <group class="cell">
            <popup-picker :title="$t('integrallAccountChoose')"
                          :popup-title="$t('integrallAccountChoose')"
                          show-name
                          :data="memberCardList" v-model="memberCardId"
                          :placeholder="$t('pleaseSelectCard')+' '"></popup-picker>
        </group>

    </div>
</template>

<script>
    import ajax from '../../api/index';
    import lifeCycleMixins from '../../mixins/lifeCycleMixins';
    import { mapGetters } from 'vuex';
    export default {
        mixins : [lifeCycleMixins],
        components : {},
        data () {
            return {
                //商品信息
                detail : {},
                //会员卡列表数据
                memberCardList : [],
                //指定的会员卡id
                memberCardId : []
            };
        },
        computed : {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.detail) {
                    //根据商品id查询商品详情
                    this.detail = params.detail;
                } else {
                    this.$router.push({
                        name : 'goodDetail'
                    });
                }
            },
            /**
             * 获取会员卡列表数据
             */
            getData () {
                ajax.post('queryMemberCardList', {
                    memberId : this.userInfo.memberId
                }).then(res => {
                    if (res.success) {
                        this.memberCardList = res.data && res.data.length > 0 ? [res.data.map((item) => {
                            return {
                                value : item.id,
                                name : item.levelDesc
                            };
                        })] : [];
                    } else {
                        this.memberCardList = [];
                    }
                });
            },
            /**
             * 确认兑换奖品
             */
            exchange () {
                if (!this.memberCardId.length > 0 || !this.memberCardId[0].length > 0) {
                    this.$vux.toast.text(this.$t('pleaseSelectCard'));
                } else {
                    ajax.post('exchangeGoods', {
                        goodsId : this.detail.id,
                        memberCardId : this.memberCardId[0]
                    }).then(res => {
                        if (res.success) {
                            this.$router.push({
                                name : 'exchangeRecord'
                            });
                            this.$vux.toast.show({
                                type : 'success',
                                text : this.$t('exchangeSuccess')
                            });
                        } else {
                            let text;
                            if (res.code === 'M023' || res.code === 'M022') {
                                text = res.code;
                            } else {
                                text = 'exchangeFailure';
                            }
                            this.$vux.toast.show({
                                type : 'cancel',
                                text : this.$t(text)
                            });
                        }
                    });
                }
            }
        },
        created () {
            this.getData();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .exchange-good {
        height: 100%;
        background-color: #F4F6F9;

        .good-board {
            display: flex;
            padding: 26.5px 14px 17px 14px;
            width: 100%;
            height: 103.5px;
            background-color: $color_fff;

            .img-wrapper {
                width: 60px;

                .zoom-img {
                    width:100%;
                    height:0;
                    padding-bottom: 100%;
                    overflow:hidden;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size:cover;
                }
            }

            .content-wrapper {
                width: calc(100% - 60px);
                padding-left: 14px;

                .good-name {
                    height: 20px;
                    width: 100%;
                    line-height: 20px;
                    font-size: 12px;
                    color: #333;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .price {
                    font-size: 10px;
                    color: #999;
                }

                .score {
                    font-size: 12px;
                    color: #BC3E3F;
                }
            }
        }

        .cell {
            margin-top: 8px;

            /deep/ .weui-cells.vux-no-group-title {
                height: 49px;

                .vux-cell-box {
                    height: 100%;
                    .weui-cell.vux-tap-active.weui-cell_access {
                        height: 100%;
                        .weui-label {
                            font-size: 14px;
                            color: #303030;
                        }

                        .weui-cell__ft {
                            line-height: 100%;
                        }

                        .vux-popup-picker-placeholder.vux-cell-placeholder {
                            margin-right: 5px;
                            font-size: 14px;
                            color: #303030;
                        }
                    }

                }

            }
        }

        .button {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 49px;
            line-height: 49px;
            color: $color_fff;
            font-size: 16px;
            text-align: center;
            background: linear-gradient(to left,#FE4021, #FB4A6E);
        }
    }
</style>
