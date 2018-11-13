<!--关联实体卡-->

<template>
    <div class="apply-for-assoiate-entity-card">
        <bread-crumb-head
            :locale-router="$t('associateEntityCard')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">
            <!--持卡人信息-->
            <card-holder-info :member-info="memberInfo">
            </card-holder-info>
            <!--会员卡信息-->
            <card-info :member-info="memberInfo">
            </card-info>
            <div class="block-title">{{$t('linkEntityCard')}}</div>
            <!--绑定实体卡-->
            <entity-card-info @set-card-data="getCardData">
            </entity-card-info>
            <i-col style="text-align: center;margin-top: 10px;">
                <Button class="ivu-btn-90px"
                        type="primary"
                        @click="applyReissuceCard">{{$t('submit')}}</Button>
            </i-col>
        </div>
    </div>
</template>

<script>
    import cardHolderInfo from '../components/cardholderInfo';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import cardInfo from '../components/cardInfo';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import entityCardInfo from '../components/entityCardInfo';
    import ajax from '@/api/index.js';

    export default {
        mixins : [ lifeCycleMixins ],
        components : {
            cardHolderInfo,
            breadCrumbHead,
            cardInfo,
            entityCardInfo,
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'newCard',
                        router : {
                            name : 'associateEntityCard'
                        }
                    }
                ],
                //会员信息
                memberInfo : {},
                //表单信息
                formData : {
                    //物理卡号
                    physicalNum : '',
                    //卡面号
                    faceNum : ''
                }
            };
        },
        methods : {
            /**
             * 关联实体卡
             */
            applyReissuceCard () {
                if (this.formData.physicalNum && this.formData.faceNum) {
                    ajax.post('entityCardrelationEntityCard',{
                        faceNum : this.formData.faceNum,
                        physicalNum : this.formData.physicalNum,
                        cardId : this.memberInfo.cardId
                    }).then(res => {
                        if (res.success) {
                            this.$Message.success(this.$t('successTip', { tip : this.$t('associateEntityCard') }));
                            this.$router.push({
                                name : 'associateEntityCard'
                            });
                        } else if (res.code === 'M030') {
                            this.$Message.error(this.$t('memLinkedEntityCard' , { name : this.memberInfo.custName }));
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('associateEntityCard') }));
                        }
                    });
                } else {
                    this.$Message.warning(this.$t('pleaseReadEntityCard'));
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
                        name : 'associateEntityCard'
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
    .apply-for-assoiate-entity-card{
        @include block_outline();
        background: $color_fff;

        .content{
            padding: 0 15px;
            @include block_outline($height : unquote('calc(100% - 60px)'));
        }
    }
</style>
