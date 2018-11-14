<!--挂失-->

<template>
    <div class="apply-for-lost">
        <bread-crumb-head
            :locale-router="$t('reportLoss')"
            :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
        </bread-crumb-head>
        <div class="content">
            <!--持卡人信息-->
            <card-holder-info :member-info="memberInfo">
            </card-holder-info>
            <!--会员卡信息-->
            <card-info :member-info="memberInfo">
            </card-info>
            <i-col style="text-align: center;margin-top: 10px;">
            </i-col>
            <!--footer 按钮-->
            <div class="content-footer">
                <Button class="ivu-btn-90px"
                        type="primary"
                        @click="reportLoss">
                    {{$t('submit')}}
                </Button>
                <Button type="ghost"
                        @click="cancelOperate">
                    {{$t("cancel")}}
                </Button>
            </div>
        </div>
        <!--挂失确认模态框-->
        <confirm-modal ref="confirmModal">
            <div class="confirm-label">
                <i class="iconfont icon-warn" style="color : #F7981C;font-size: 17px;"></i>
                {{$t('sureToLossMemInfo')}}
            </div>
        </confirm-modal>
    </div>
</template>

<script>
    import cardHolderInfo from '../components/cardholderInfo';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import cardInfo from '../components/cardInfo';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import confirmModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index.js';

    export default {
        mixins : [ lifeCycleMixins ],
        components : {
            cardHolderInfo,
            breadCrumbHead,
            cardInfo,
            confirmModal
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'newCard',
                        router : {
                            name : 'reportLoss'
                        }
                    }
                ],
                //会员信息
                memberInfo : {}
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
                } else {
                    this.$router.push({
                        name : 'reportLoss'
                    });
                }
            },
            /**
             * 挂失实体卡
             */
            reportLoss () {
                this.$refs.confirmModal.show({
                    title : this.$t('notice'),
                    confirmCallback : () => {
                        this.confirmLoss();
                    }
                });
            },
            /**
             * 确认挂失
             */
            confirmLoss () {
                ajax.post('reportTheLoss',{
                    cardId : this.memberInfo.cardId
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('reportLoss') }));
                        this.$router.push({
                            name : 'reportLoss'
                        });
                    } else if (res.code === 'M015') {
                        this.$Message.warning(this.$t('memHavnotCardErr',{ name : this.memberInfo.custName }));
                    } else if (res.code === 'M028') {
                        this.$Message.warning(this.$t('memHaveLossErr',{ name : this.memberInfo.custName }));
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('reportLoss') }));
                    }
                });
            },
            /**
             * 取消挂失操作
             */
            cancelOperate () {
                this.$router.push({
                    name : 'reportLoss'
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .apply-for-lost{
        @include block_outline();
        background: $color_fff;

        .content{
            padding: 0 15px;
            @include block_outline($height : unquote('calc(100% - 60px)'));
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
    }
</style>
