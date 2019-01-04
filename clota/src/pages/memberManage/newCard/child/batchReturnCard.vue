<!--批量退卡-->

<template>
    <div class="batch-return-card">
        <bread-crumb-head
            :locale-router="$t('batchRefundCard')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="container">
            <div class="title">
                <Button type="primary"
                        :disabled="tableData.length >= 50 || !cardReadEnabled"
                        @click="readEntityCard">{{$t('readEntityCard')}}</Button>
            </div>
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :border="true"
                :ofset-height="204">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    show-overflow-tooltip
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
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
        </div>
        <!--footer 按钮-->
        <div class="content-footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirmOperate">
                {{$t('refundedCard')}}
            </Button>
            <Button type="ghost"
                    @click="cancelOperate">
                {{$t("cancel")}}
            </Button>
        </div>
        <!--确认退卡信息-->
        <confirm-member-info v-model="showConfirmModal"
                             @confirm-data="confirmDataInfo">
            <Form  :label-width="110">
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('thisTimeRefundCardNum') })">
                        {{tableData.length | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('backTotalMoney') })">
                        {{sumRefundMoney | moneyFilter | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('backMoneyFromOnline') })">
                        {{sumOnlineMoney | moneyFilter | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('backMoney') })">
                        {{sumCashMoney | moneyFilter | contentFilter}}
                    </FormItem>
                </i-col>
            </Form>
        </confirm-member-info>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import { batchRefundColumnData } from './batchReturnCardConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { mapGetters } from 'vuex';
    import confirmMemberInfo from '../components/confirmDetailModal';
    import ajax from '@/api/index.js';

	export default {
		data () {
			return {
			    //表头配置
                columnData : batchRefundColumnData,
                //表格数据
                tableData : [],
                //是否显示确认模态框
                showConfirmModal : false
            };
		},
        components : {
            breadCrumbHead,
            tableCom,
            confirmMemberInfo
        },
		methods : {
            /**
             * 取消操作
             */
            cancelOperate () {

            },
            /**
             * 确认批量退卡
             */
            confirmOperate () {
                this.showConfirmModal = true;
            },
            /**
             * 读取实体卡
             */
            readEntityCard () {
                if (this.tableData.length >= 50 || !this.cardReadEnabled) return;
                this.$store.dispatch('getCardReadData').then(res => {
                    //校验当前页面是否已经使用了读取的卡
                    for (let i = 0,j = this.tableData.length; i < j; i++) {
                        if (this.tableData[i]['physicalNum'] === res) {
                            return;
                        }
                    }
                    this.findRefundCardMoney(res);
                });
            },
            /**
             * 确认开卡信息
             */
            confirmDataInfo () {
                this.showConfirmModal = false;
                this.batchRefundCard();
            },
            /**
             * 查询需要退卡的金额
             * @param{String} physicalNum 物理卡号
             */
            findRefundCardMoney (physicalNum) {
                ajax.post('findRefundCardMoney',{
                    physicalNum : physicalNum
                }).then(res => {
                    if (res.success && res.data) {
                        this.tableData.push({
                            physicalNum : physicalNum,
                            faceNum : res.data.faceNum,
                            cardId : res.data.cardId,
                            sumCashMoney : res.data.sumCashMoney,
                            sumOnlineMoney : res.data.sumOnlineMoney,
                            sumRefundMoney : res.data.sumRefundMoney,
                        });
                    } else if (res.code === 'M018') {
                        this.$Message.error(this.$t('memberCardInusedTip'));
                    } else if (res.code === 'M036') {
                        this.$Message.error(this.$t('memberCardNotExisit'));
                    } else {
                        this.refundMoneyInfo = {};
                    }
                });
            },
            /**
             * 删除读取的实体卡
             * @param{Number} index 实体卡序号
             */
            delCard (index) {
                this.tableData.splice(index,1);
            },
            /**
             * 批量退卡
             */
            batchRefundCard () {
                ajax.post('batchRefundCard',{
                    cardIds : this.tableData.map(item => item.cardId).join(',')
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('batchRefundCard') }));
                        this.tableData = [];
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('batchRefundCard') }));
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                cardReadEnabled : 'cardReadEnabled',
            }),
            //面包屑路由信息
            beforeRouterList () {
                return [{
                    name : 'newCard',
                    router : {
                        name : 'refundedCard'
                    }
                }];
            },
            //本次线下退卡金额
            sumCashMoney () {
                return this.tableData.reduce((price,item) => item.sumCashMoney + price,0);
            },
            //本次线上退卡金额
            sumOnlineMoney () {
                return this.tableData.reduce((price,item) => item.sumOnlineMoney + price,0);
            },
            //本次退卡全部金额
            sumRefundMoney () {
                return this.tableData.reduce((price,item) => item.sumRefundMoney + price,0);
            }
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .batch-return-card{
        @include block_outline();
        overflow: auto;
        background: $color_fff;

        .container{
            width: 1000px;
            height: calc(100% - 110px);
            margin: 0 auto;
        }

        .title{
            @include block_outline($height : 60px);
            padding: 15px 10px;
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
