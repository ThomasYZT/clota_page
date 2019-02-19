<!--
内容：批量开卡
作者：djc
日期：
-->

<template>
    <div class="batch-card">
        <!--头部tab组件-->
        <header-tabs :router-name="'newBatchCard'"></header-tabs>
        <div class="container">
            <div class="content-wrap">
                <!--选择会员卡类型、级别-->
                <select-card @on-change-card="handleCardChanged" :need-company-card="false"></select-card>
                <template v-if="cardTypeInfo && Object.keys(cardTypeInfo).length > 0">
                    <!--实体卡信息-->
                    <h3>{{$t('entityCardInfo')}}</h3>
                    <div class="btn-wrap">
                        <Button type="primary"
                                :disabled="tableData.length >= 50 || !cardReadEnabled"
                                @click="readEntityCard">{{$t('readEntityCard')}}</Button>
                        <Button type="primary"
                                style="margin-left: 10px;"
                                @click="openCardRightNow">{{$t('openCardSpeedly')}}</Button>
                    </div>
                    <table-com
                        :show-pagination="false"
                        :column-data="columnData"
                        :table-data="tableData"
                        :auto-height="true"
                        :table-com-min-height="250"
                        :border="true">
                        <el-table-column
                            slot="column0"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            slot="column3"
                            slot-scope="row"
                            show-overflow-tooltip
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                <ul class="operate-list">
                                    <li class="red-label" @click="delCard(scope.$index)">{{$t('del')}}</li>
                                </ul>
                            </template>
                        </el-table-column>
                    </table-com>
                    <div class="table-bottom">
                        {{$t('totalPrice')}}：<span class="total-money">{{entityCardTotalPrice | moneyFilter | contentFilter}}  {{$t('yuan')}}</span>
                    </div>
                    <!--收款方式-->
                    <h3>{{$t('paymentMethod')}}</h3>
                    <Form label-position="top" :model="cardParam">
                        <Form-item prop="payType"
                                   :label="$t('paymentMethod')"
                                   :rules="{ required : true,trigger : 'change' }" >
                            <RadioGroup v-model="cardParam.payType">
                                <Radio v-for="(item,index) in payAccountList"
                                       :key="index"
                                       :label="item.value">
                                    {{$t('onlineAccount.' + item.value)}}
                                </Radio>
                            </RadioGroup>
                        </Form-item>
                    </Form>
                    <!--footer 按钮-->
                    <div class="content-footer">
                        <Button type="primary"
                                :loading="loading"
                                @click="batchOpenCard">
                            {{$t('submit')}}
                        </Button>
                        <Button type="ghost"
                                @click="cancelOperate">
                            {{$t("cancel")}}
                        </Button>
                    </div>
                </template>
            </div>
        </div>
        <!--确认会员信息模态框-->
        <confirm-member-info v-model="showConfirmModal"
                             @confirm-data="confirmDataInfo">
            <Form :label-width="110">
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('selectCardAttribution') })">
                        {{cardTypeInfo.levelName | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('memberCardPrice') })">
                        {{cardTypeInfo.salePrice | moneyFilter | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('openCardNum') })">
                        {{tableData.length | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('memberCardAmount') })">
                        {{entityCardTotalPrice | moneyFilter | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('payType') })">
                        {{$t('payType.' + cardParam.payType) | contentFilter}}
                    </FormItem>
                </i-col>
            </Form>
        </confirm-member-info>
        <!--查询支付结果模态框-->
        <loop-for-pay-result v-model="payModalShow"
                             ref="payResultModal"
                             :transaction-id="transctionId"
                             @search-success="cancelOperate"
                             @start-pay="createMember">
        </loop-for-pay-result>
        <!--输入批量开卡范围-->
        <card-number-scope v-model="cardScopeModalShow"
                           @get-num-scope="getCarScope">
        </card-number-scope>
    </div>
</template>
<script type="text/ecmascript-6">
    import headerTabs from './components/newCardTabs.vue';
    import selectCard from './components/selectCardType.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { batchEntityCardHead } from './openCardsConfig';
    import ajax from '@/api/index.js';
    import { validator } from 'klwk-ui';
    import confirmMemberInfo from './components/confirmDetailModal';
    import { mapGetters } from 'vuex';
    import loopForPayResult from '../../../components/loopForPayResult/loopForPayResult';
    import cardNumberScope from './components/cardNumberScope';

    export default {
        components : {
            headerTabs,
            selectCard,
            tableCom,
            confirmMemberInfo,
            loopForPayResult,
            cardNumberScope
        },
        props : {},
        data () {
            return {
                // 提交按钮loading
                loading : false,
                // 表头配置
                columnData : batchEntityCardHead,
                // 表格数据
                tableData : [],
                cardParam : {
                    // 收款方式
                    payType : 'cash',
                    qrCode : "",//扫码结果
                },
                //会员卡信息
                cardTypeInfo : {},
                //显示确认信息模态框
                showConfirmModal : false,
                //支付查询结果是否显示
                payModalShow : false,
                //内部交易id
                transctionId : '',
                //快速开卡范围输入模态框是否显示
                cardScopeModalShow : false
            };
        },
        computed : {
            //实体卡总价
            entityCardTotalPrice () {
                if ( this.cardTypeInfo && Object.keys(this.cardTypeInfo).length > 0 && validator.isNumber(this.cardTypeInfo.salePrice) ) {
                    return this.cardTypeInfo.salePrice * this.tableData.length;
                } else {
                    return '';
                }
            },
            ...mapGetters({
                cardReadEnabled : 'cardReadEnabled',
                payAccountList : 'payAccountList',
            }),
            //选择的会员卡信息
            cardInfo () {
                if (this.cardTypeInfo && this.cardTypeInfo.memberCard) {
                    return this.cardTypeInfo.memberCard;
                } else {
                    return {};
                }
            }
        },
        methods : {
            /**
             * 所选择会员卡的类型、级别发生改变后的处理
             * @param{Object} cardData   会员卡的类型、级别
             */
            handleCardChanged (cardData) {
                if (cardData.memberCard.cardTypeId) {
                    this.cardTypeInfo = cardData;
                } else {
                    this.cardTypeInfo = {};
                }
            },
            /**
             * 读取实体卡
             */
            readEntityCard () {
                this.$store.dispatch('getCardReadData').then(res => {
                    //校验当前页面是否已经使用了读取的卡
                    for (let i = 0,j = this.tableData.length; i < j; i++) {
                        if (this.tableData[i]['physicalNum'] === res) {
                            this.$Message.warning(this.$t('entityCardUsedErr'));
                            return;
                        }
                    }
                    this.findByPhysicalNum(res).then(item => {
                        this.tableData.push({
                            faceNum : item.faceNum,
                            physicalNum : item.physicalNum,
                            id : item.id
                        });
                    }).catch((err) => {
                        if (err && err === 'M026') {
                            this.$Message.warning(this.$t('entityCardUsedErr'));
                        } else {
                            this.$Message.warning(this.$t('noMatchCard'));
                        }
                    });
                });
            },
            /**
             * 查看实体卡是否可以使用
             * @param{String} physicalNum
             * @return{Object} promise对象
             */
            findByPhysicalNum (physicalNum) {
                return new Promise((resolve,reject) => {
                    ajax.post('findByPhysicalNum',{
                        physicalNum : physicalNum,
                        entityCardType : 'password'
                    }).then((res) => {
                        if (res.success) {
                            if (res.data && Object.keys(res.data).length > 0) {
                                resolve(res.data);
                            } else {
                                reject();
                            }
                        } else {
                            if (res.code && res.code === 'M026') {
                                reject('M026');
                            } else {
                                reject();
                            }
                        }
                    }).catch(() => {
                        reject();
                    });
                });
            },
            /**
             * 删除实体卡
             * @param{Number} index
             */
            delCard (index) {
                this.tableData.splice(index,1);
            },
            /**
             * 提交读取的卡信息
             */
            batchOpenCard () {
                if (this.tableData.length > 0) {
                    this.showConfirmModal = true;
                } else {
                    this.$Message.warning(this.$t('pleaseAddEntityCard'));
                }
            },
            /**
             * 确认用户信息成功，可以新开卡
             * @param{String} qrCode 扫码枪扫码结果
             */
            createMember (qrCode) {
                ajax.post('batchOpenCards',{
                    entityCardInfo : JSON.stringify(this.tableData),
                    cardTypeId : this.cardInfo.cardTypeId,
                    cardLevelId : this.cardInfo.levelId,
                    channelType : this.cardParam.payType,
                    qrCode : qrCode,
                    txnAmt : this.entityCardTotalPrice,
                    paymentChannel : this.payAccountList.find(item => item.accountType === this.cardParam.payType)['payType']
                }).then(res => {
                    if (res.success) {
                        this.tableData = [];
                        this.$refs.payResultModal.setStage('success');
                        this.payModalShow = true;
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
                    } else {
                        if (this.payModalShow) {
                            this.$refs.payResultModal.setStage('fail');
                        } else {
                            this.$Message.error(this.$t('failureTip',{ tip : this.$t('newBatchCard') }));
                        }
                    }
                }).finally(() => {
                    this.showConfirmModal = false;
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
             * 取消操作
             */
            cancelOperate () {
                this.tableData = [];
                this.cardParam.payType = 'weixin';
            },
            /**
             * 确认填写的数据是否正确
             */
            confirmDataInfo () {
                if (this.cardParam.payType === 'cash' || !this.entityCardTotalPrice) {
                    this.createMember();
                } else {
                    this.$refs.payResultModal.setStage('scan');
                    this.payModalShow = true;
                    this.showConfirmModal = false;
                }
            },
            /**
             * 显示快速开卡的模态框
             */
            openCardRightNow () {
                this.cardScopeModalShow = true;
            },
            /**
             * 获取快速开卡的信息
             * @param{Array} cardScope 快速开卡的信息
             */
            getCarScope (cardScope) {
                if (this.tableData.length > 0) {
                    for (let i = 0,j = this.tableData.length; i < j; i++) {
                        if (!(this.tableData[i]['physicalNum'] in cardScope)) {
                            this.tableData.push(cardScope[this.tableData[i]['physicalNum']]);
                        }
                    }
                } else {
                    for (let item in cardScope) {
                        this.tableData.push(cardScope[item]);
                    }
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .batch-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;

        h3 {
            margin-top: 10px;
            margin-bottom: 15px;
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
        }

        .table-bottom {
            text-align: right;
            margin: 10px 15px;
        }

        .total-money {
            color: $color_yellow;
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

    .container {
        height: calc(100% - 70px);
        overflow: auto;
        @include padding_place($height : 50px);

        .content-wrap {
            width: 850px;
            margin: 20px auto;

            .btn-wrap{
                height: 48px;
                padding-top: 8px;
            }
        }
    }
</style>
