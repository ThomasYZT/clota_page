<!--申请补卡-->

<template>
    <div class="apply-reissuce-card">
        <bread-crumb-head
            :locale-router="$t('replenishCard')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">
            <!--持卡人信息-->
            <card-holder-info :member-info="memberInfo">
            </card-holder-info>
            <!--会员卡信息-->
            <card-info :member-info="memberInfo">
            </card-info>
            <div class="card-info-title">{{$t('linkEntityCard')}}</div>
            <!--绑定实体卡-->
            <entity-card-info ref="entityCardInfo"
                              @set-card-data="getCardData">
            </entity-card-info>
            <!--支付方式选择-->
            <pay-type-select v-show="replaceCardFee > 0"
                             @set-pay-type="formData.payType = $event">
            </pay-type-select>
            <!--footer 按钮-->
            <div class="content-footer">
                <Button class="ivu-btn-90px"
                        type="primary"
                        @click="applyReissuceCard">{{$t('submit')}}</Button>
                <Button type="ghost"
                        @click="cancelOperate">
                    {{$t("cancel")}}
                </Button>
            </div>
        </div>
        <!--确认会员信息模态框-->
        <confirm-member-info v-model="showConfirmModal"
                             @confirm-data="confirmDataInfo">
            <Form :label-width="110">
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('selectCardAttribution') })">
                        {{memberInfo.levelDesc | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('reissueCardFee') })">
                        {{replaceCardFee | moneyFilter | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('name') })">
                        {{memberInfo.custName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('gender') })">
                        {{$t(memberInfo.gender) | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('credentialsType') })">
                        {{memberInfo.certificationTypeName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('identificationNum') })">
                        {{memberInfo.idCardNumber | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('birthday') })">
                        {{memberInfo.birthDay | timeFormat('yyyy-MM-dd') | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('mobilePhone') })">
                        {{memberInfo.phoneNum | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('remark') })">
                        {{memberInfo.remark | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('address') })">
                        {{memberInfo.homeAddr | contentFilter}}
                    </FormItem>
                </i-col>
            </Form>
        </confirm-member-info>
        <!--查询支付结果模态框-->
        <loop-for-pay-result v-model="payModalShow"
                             ref="payResultModal"
                             :transaction-id="transctionId"
                             @search-success="tipSuccess"
                             @start-pay="createMember">
        </loop-for-pay-result>
        <!--挂失确认模态框-->
        <confirm-modal ref="confirmModal">
            <div class="confirm-label">
                <i class="iconfont icon-warn" style="color : #F7981C;font-size: 17px;"></i>
                {{$t('reissueCardErr',{ name : memberInfo.custName })}}
            </div>
        </confirm-modal>
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
    import confirmMemberInfo from '../components/confirmDetailModal';
    import loopForPayResult from '../../../../components/loopForPayResult/loopForPayResult';
    import confirmModal from '@/components/delModal/index.vue';
    import { mapGetters } from 'vuex';

	export default {
        mixins : [ lifeCycleMixins ],
        components : {
            cardHolderInfo,
            breadCrumbHead,
            cardInfo,
            payTypeSelect,
            entityCardInfo,
            confirmMemberInfo,
            loopForPayResult,
            confirmModal
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
                    faceNum : '',
                    //扫码结果
                    qrCode : ''
                },
                //显示确认信息模态框
                showConfirmModal : false,
                //支付查询结果是否显示
                payModalShow : false,
                //内部交易id
                transctionId : '',
                //补卡费
                replaceCardFee : ''
            };
		},
		methods : {
            /**
             * 申请补卡
             */
            applyReissuceCard () {
                if (this.formData.physicalNum && this.formData.faceNum) {
                    this.showConfirmModal = true;
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
            },
            /**
             * 确认用户信息成功，可以补卡
             * @param{String} qrCode 扫码枪扫码结果
             */
            createMember (qrCode) {
                let paymentChannel = this.payAccountList.find(item => item.value === this.formData.payType);
                this.showConfirmModal = false;
                ajax.post('reissueEntityCard',{
                    faceNum : this.formData.faceNum,
                    physicalNum : this.formData.physicalNum,
                    cardId : this.memberInfo.cardId,
                    levelId : this.memberInfo.levelId,
                    channelType : this.formData.payType,
                    qrCode : qrCode,
                    paymentChannel : paymentChannel ? paymentChannel['payType'] : ''
                }).then(res => {
                    if (res.success) {
                        this.$refs.payResultModal.setStage('success');
                        this.payModalShow = true;
                        // this.cancelOperate();
                    } else if (res.code === 'P002') {
                        this.startSearchForPayResult({
                            ...(res.data ? res.data : {})
                        });
                    } else if (res.code === 'P001') {
                        if (this.payModalShow) {
                            this.$refs.payResultModal.setStage('fail');
                        } else {
                            this.$Message.error(this.$t('payField'));
                        }
                    } else if (res.code === 'M030') {
                        this.payModalShow = false;
                        this.$refs.confirmModal.show({
                            title : this.$t('notice'),
                            confirmCallback : () => {
                                this.confirmApplyForLost();
                            }
                        });
                    } else if (res.code === 'M015') { //实体卡不存在
                        this.$Message.error(this.$t('entityNotExist'));
                    } else if (res.code === 'M057') { //该卡为新卡 请进行关联实体卡操作
                        this.$Message.error(this.$t('M057'));
                    } else {
                        if (this.payModalShow) {
                            this.$refs.payResultModal.setStage('fail');
                        } else {
                            this.$Message.error(this.$t('payField'));
                        }
                    }
                });
            },
            /**
             * 查询到支付成功
             */
            tipSuccess () {
                this.$Message.success(this.$t('successTip',{ tip : this.$t('replenishCard') }));
                this.$router.push({
                    name : 'replenishCard'
                });
            },
            /**
             * 开启查询支付结果
             * @param{Object} transctionId 内部交易id
             */
            startSearchForPayResult ({ transctionId }) {
                this.transctionId = transctionId;
                this.$refs.payResultModal.startSearchPayResult();
            },
            /**
             * 查询补卡费
             */
            queryCardReplaceFee () {
                ajax.post('queryCardReplaceFee').then(res => {
                    if (res.success) {
                        this.replaceCardFee = res.data;
                    } else {
                        this.replaceCardFee = '';
                    }
                });
            },
            /**
             * 跳转到挂失页面进行挂失操作
             */
            confirmApplyForLost () {
                this.$router.push({
                    name : 'applyForLost',
                    params : {
                        memberInfo : this.memberInfo
                    }
                });
            },
            /**
             * 取消补卡操作
             */
            cancelOperate () {
                this.$router.push({
                    name : 'replenishCard'
                });
            },
            /**
             * 确认填写的数据是否正确
             */
            confirmDataInfo () {
                if (this.formData.payType === 'cash' || !this.replaceCardFee) {
                    this.createMember();
                } else {
                    this.$refs.payResultModal.setStage('scan');
                    this.payModalShow = true;
                    this.showConfirmModal = false;
                }
            }
        },
        created () {
            this.queryCardReplaceFee();
        },
        computed : {
            ...mapGetters([
                'payAccountList'
            ])
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
            overflow: auto;
            @include block_outline($height : unquote('calc(100% - 60px)'));
            @include padding_place($height : 50px);

            .card-info-title{
                text-align: center;
                font-size: $font_size_16px;
                color: $color_333;
                padding: 47px 0 16px 0;
            }
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
    .confirm-label{
        max-width: 250px;
    }
</style>
