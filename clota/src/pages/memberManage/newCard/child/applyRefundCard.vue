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
            <div class="block-title">{{$t('selectCardAttribution')}}</div>
            <ButtonGroup>
                <Button v-for="(item,index) in memberDetail"
                        :key="index"
                        :type="choosedCard === item ? 'primary' : 'ghost'"
                        @click="choseCard(item)">
                    {{item.levelDesc}}
                </Button>
            </ButtonGroup>
            <template v-if="choosedCard && Object.keys(choosedCard).length > 0">
                <!--会员卡信息-->
                <member-card-detail :card-info="choosedCard">
                </member-card-detail>
                <!--储值账户信息-->
                <store-account-info v-for="item in chargeAccount"
                                    :key="item.id"
                                    :charge-info="item">
                </store-account-info>
                <!--积分账户信息-->
                <integral-account-info v-for="item in integerAccount"
                                       :key="item.id"
                                       :account-info="item">
                </integral-account-info>
                <div class="btn-wrap">
                    <Button type="primary" class="ivu-btn-90px" @click="refundCard">{{$t('refundedCard')}}</Button>
                </div>
            </template>
        </div>
        <!--退卡确认模态框-->
        <confirm-modal ref="confirmModal">
            <div class="confirm-label">
                <i class="iconfont icon-warn" style="color : #F7981C;font-size: 17px;"></i>
                <span>{{$t('sureToLossMemInfo')}}</span>
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

	export default {
        mixins : [ lifeCycleMixins ],
        components : {
            breadCrumbHead,
            personInfo,
            storeAccountInfo,
            integralAccountInfo,
            memberCardDetail,
            confirmModal
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
                memberDetail : {},
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
                        this.memberDetail = res.data ? res.data : {};
                    } else {
                        this.memberDetail = {};
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
                        this.choosedCard = {};
                        this.listCardsByMemberId();
                    } else if (res.code === 'M031') {//原路退还金额失败
                        this.$Message.success('线上退款失败，请在在线交易记录中重新退款');
                        this.listCardsByMemberId();
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('refundedCard') }));
                    }
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
            padding: 0 15px;
            @include block_outline($height : unquote('calc(100% - 60px)'));
            overflow: auto;
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
