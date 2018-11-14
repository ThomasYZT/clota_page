<!--申请退卡-->

<template>
    <div class="apply-refund-card">
        <bread-crumb-head
            :locale-router="$t('refundedCard')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">
            <!--个人信息-->
            <person-info :member-info="memberInfo">
            </person-info>
            <div class="info-title">{{$t('selectCardAttribution')}}</div>
            <ButtonGroup>
                <Button v-for="(item,index) in memberDetail"
                        :key="index"
                        :type="choosedCard === item ? 'primary' : 'ghost'"
                        @click="choseCard(item)">
                    {{item.levelDesc}}
                </Button>
            </ButtonGroup>
            <div class="no-data-wrap" v-if="memberDetail.length < 1">
                <!--无数据组件-->
                <no-data >
                </no-data>
            </div>
            <template v-if="choosedCard && Object.keys(choosedCard).length > 0">
                <!--会员卡信息-->
                <member-card-detail :card-info="choosedCard">
                </member-card-detail>
                <div class="info-title">{{$t('储值账户信息')}}</div>
                <!--储值账户信息-->
                <store-account-info v-for="(item,index) in chargeAccount"
                                    :class="{'last-item-class' : index === chargeAccount.length - 1 }"
                                    :key="item.id"
                                    :charge-info="item">
                </store-account-info>
                <div class="info-title">{{$t('积分账户信息')}}</div>
                <!--积分账户信息-->
                <integral-account-info v-for="item in integerAccount"
                                       :key="item.id"
                                       :account-info="item">
                </integral-account-info>
                <!--footer 按钮-->
                <div class="content-footer">
                    <Button type="primary"
                            class="ivu-btn-90px"
                            @click="refundCard">
                        {{$t('refundedCard')}}
                    </Button>
                    <Button type="ghost"
                            @click="cancelOperate">
                        {{$t("cancel")}}
                    </Button>
                </div>
            </template>
        </div>
        <!--退卡确认模态框-->
        <confirm-modal ref="confirmModal">
            <div class="confirm-label">
                <i class="iconfont icon-warn" style="color : #F7981C;font-size: 17px;"></i>
                <span>{{$t('sureToReturnMemInfo')}}</span>
                <ul class="tips-label">
                    <li>
                        <span class="key-label">线上返回金额：</span>
                        <span class="value-label">{{refundMoneyInfo.sumOnlineMoney | moneyFilter | contentFilter}}</span>
                    </li>
                    <li>
                        <span class="key-label">返回现金：</span>
                        <span class="value-label">{{refundMoneyInfo.sumCashMoney | moneyFilter | contentFilter}}</span>
                    </li>
                    <li>
                        <span class="key-label">返还总额：</span>
                        <span class="value-label">{{refundMoneyInfo.sumRefundMoney | moneyFilter | contentFilter}}</span>
                    </li>
                </ul>
            </div>
        </confirm-modal>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import personInfo from '../components/personInfo';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import storeAccountInfo from '../components/storeAccountInfo.vue';
    import integralAccountInfo from '../components/integralAccountInfo.vue';
    import memberCardDetail from '../components/memberCardDetail';
    import ajax from '@/api/index.js';
    import confirmModal from '@/components/delModal/index.vue';
    import noData from '@/components/noDataTip/noData-tip.vue';

	export default {
        mixins : [ lifeCycleMixins ],
        components : {
            breadCrumbHead,
            personInfo,
            storeAccountInfo,
            integralAccountInfo,
            memberCardDetail,
            confirmModal,
            noData
        },
		data () {
			return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'newCard',
                        router : {
                            name : 'refundedCard'
                        }
                    }
                ],
                //会员信息
                memberInfo : {},
                //会员卡详情
                memberDetail : [],
                //选择的会员卡信息
                choosedCard : {},
                //储值账户信息
                chargeAccount : [],
                //积分账户信息
                integerAccount : [],
                //退卡金额明细
                refundMoneyInfo : {}
            };
		},
		methods : {
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && params.memberInfo) {
                    this.memberInfo = params.memberInfo;
                    this.listCardsByMemberId();
                } else {
                    this.$router.push({
                        name : 'refundedCard'
                    });
                }
            },
            /**
             * 查询会员卡信息
             */
            listCardsByMemberId () {
                ajax.post('listCardsByMemberId',{
                    memberId : this.memberInfo.id
                }).then(res => {
                    if (res.success) {
                        this.memberDetail = res.data ? res.data : [];
                    } else {
                        this.memberDetail = [];
                    }
                });
            },
            /**
             * 选择会员卡
             * @param{Object} item 会员卡信息
             */
            choseCard (item) {
                this.choosedCard = item;
                this.listCardAccountInfo(item.id);
            },
            /**
             * 查询储值账户以及积分账户信息
             * @param{String} cardId 会员卡id
             */
            listCardAccountInfo (cardId) {
                ajax.post('listCardAccountInfo',{
                    cardId : cardId,
                    memberId : this.memberInfo.id,
                }).then(res => {
                    this.chargeAccount = [];
                    this.integerAccount = [];
                    if (res.success) {
                        let accountInfo = res.data ? res.data : [];
                        for (let i = 0,j = accountInfo.length; i < j; i++) {
                            if (accountInfo[i]['accountType'] === 'charging') {//储值账户
                                this.chargeAccount.push(accountInfo[i]);
                            } else if (accountInfo[i]['accountType'] === 'score') {//积分账户
                                this.integerAccount.push(accountInfo[i]);
                            }
                        }
                    }
                });
            },
            /**
             * 查询需要退卡的金额
             */
            findRefundCardMoney () {
                ajax.post('findRefundCardMoney',{
                    cardId : this.choosedCard.id
                }).then(res => {
                    if (res.success) {
                        this.refundMoneyInfo = res.data ? res.data : {};
                        this.$refs.confirmModal.show({
                            title : this.$t('notice'),
                            confirmCallback : () => {
                                this.confirmRefund();
                            }
                        });
                    } else {
                        this.refundMoneyInfo = {};
                    }
                });
            },
            /**
             * 退卡
             */
            refundCard () {
                this.findRefundCardMoney();
            },
            /**
             * 确认退卡
             */
            confirmRefund () {
                ajax.post('refundCard',{
                    cardId : this.choosedCard.id
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('refundedCard') }));
                        this.listCardsByMemberId();
                    } else {
                        this.listCardsByMemberId();
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('refundedCard') }));
                    }
                }).finally(() => {
                    this.choosedCard = {};
                });
            },
            /**
             * 取消退卡
             */
            cancelOperate () {
                this.$router.push({
                    name : 'refundedCard'
                });
            }
        },
        created () {
            this.listCardAccountInfo();
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .apply-refund-card{
        @include block_outline();
        background: $color_fff;

        .content{
            padding: 0 50px;
            @include block_outline($height : unquote('calc(100% - 60px)'));
            overflow: auto;
            @include padding_place($height : 50px);

            .no-data-wrap{
                @include block_outline(100%,200px);
                position: relative;
            }

            .content-footer {
                @include absolute_pos(absolute,$left : 0,$right : 0,$bottom : 0);
                text-align: center;
                background: $color_fff;
                height: 56px;
                line-height: 56px;
                box-shadow: 0 -5px 3px 0 rgba(0, 0, 0, 0.03);
                background: $color_fff;
                z-index: 10;

                /deep/ .ivu-btn {
                    width: 108px;
                    &:nth-child(1) {
                        margin-right: 20px;
                    }
                }
            }

            /deep/ .info-title{
                text-align: left;
                font-size: $font_size_16px;
                color: $color_000;
                padding: 30px 0 20px 0;
            }
        }

        .btn-wrap{
            padding: 20px 0;
            text-align: center;
        }
    }
    .tips-label{
        padding-left: 22px;
        line-height: 20px;

        .key-label{
            color: $color_yellow;
        }

        .value-label{
            color: $color_666;
        }
    }
</style>
