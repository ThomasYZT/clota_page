<!--申请补卡-->

<template>
    <div class="apply-reissuce-card">
        <bread-crumb-head
            :locale-router="$t('补卡')"
            :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
        </bread-crumb-head>
        <div class="content">
            <!--持卡人信息-->
            <card-holder-info :member-info="memberInfo">
            </card-holder-info>
            <!--会员卡信息-->
            <card-info :member-info="memberInfo">
            </card-info>
            <div class="block-title">{{$t('绑定实体卡')}}</div>
            <!--绑定实体卡-->
            <entity-card-info @set-card-data="getCardData">
            </entity-card-info>
            <!--支付方式选择-->
            <pay-type-select @set-pay-type="formData.payType = $event">
            </pay-type-select>
            <i-col style="text-align: center;margin-top: 10px;">
                <Button class="ivu-btn-90px" type="primary" @click="applyReissuceCard">提交</Button>
            </i-col>
        </div>
    </div>
</template>

<script>
    import cardHolderInfo from '../components/cardholderInfo';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import cardInfo from '../components/cardInfo';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import payTypeSelect from '../components/payTypeSelect';
    import entityCardInfo from '../components/entityCardInfo';
    import ajax from '@/api/index.js';
	export default {
        mixins : [ lifeCycleMixins ],
        components : {
            cardHolderInfo,
            breadCrumbHead,
            cardInfo,
            payTypeSelect,
            entityCardInfo,
        },
		data () {
			return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'newCard',
                        router : {
                            name : 'replenishCard'
                        }
                    }
                ],
                //会员信息
                memberInfo : {},
                //表单信息
                formData : {
                    //支付方式
                    payType : '',
                    //物理卡号
                    physicalNum : '',
                    //卡面号
                    faceNum : ''
                }
            };
		},
		methods : {
            /**
             * 申请补卡
             */
            applyReissuceCard () {
                if (this.formData.physicalNum && this.formData.faceNum) {
                    ajax.post('reissueEntityCard',{
                        faceNum : this.formData.faceNum,
                        physicalNum : this.formData.physicalNum,
                        cardId : this.memberInfo.cardId,
                        channelType : this.formData.payType,
                        QRCode : this.formData.payType,
                        txnAmt : '',
                    }).then(res => {
                        if (res.success) {
                            this.$Message.success('补卡成功');
                            this.$router.push({
                                name : 'replenishCard'
                            });
                        } else {
                            this.$Message.error('补卡失败');
                        }
                    });
                } else {
                    this.$Message.warning('请读取实体卡信息');
                }
            },
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && params.memberInfo) {
                    this.memberInfo = params.memberInfo;
                } else {
                    this.$router.push({
                        name : 'reportLoss'
                    });
                }
            },
            /**
             * 获取读取的实体卡信息
             * @param{String} faceNum 卡面号
             * @param{String} physicalNum 物理卡号
             */
            getCardData ({ faceNum,physicalNum }) {
                this.formData.faceNum = faceNum;
                this.formData.physicalNum = physicalNum;
            }
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .apply-reissuce-card{
        @include block_outline();
        background: $color_fff;

        .content{
            padding: 0 15px;
            @include block_outline($height : unquote('calc(100% - 60px)'));
        }
    }
</style>
