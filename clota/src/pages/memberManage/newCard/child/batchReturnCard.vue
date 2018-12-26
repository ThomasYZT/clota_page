<!--批量退卡-->

<template>
    <div class="batch-return-card">
        <bread-crumb-head
            locale-router="批量退卡"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="container">
            <div class="title">
                <Button type="primary"
                        :disabled="tableData.length >= 50 || !cardReadEnabled"
                        @click="readEntityCard">{{$t('读取实体卡')}}</Button>
            </div>
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :border="true"
                :ofset-height="204">
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
                    <FormItem :label="$t('colonSetting',{ key : $t('本次退卡数量') })">
                        {{'a' | contentFilter}}
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :label="$t('colonSetting',{ key : $t('本次退卡总金额') })">
                        {{'a' | contentFilter}}
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

	export default {
		data() {
			return {
			    //表头配置
                columnData : batchRefundColumnData,
                //表格数据
                tableData : [],
                //是否显示确认模态框
                showConfirmModal : true
            }
		},
        components : {
            breadCrumbHead,
            tableCom,
            confirmMemberInfo
        },
		methods: {
            /**
             * 取消操作
             */
            cancelOperate () {

            },
            /**
             * 确认批量退卡
             */
            confirmOperate () {

            },
            /**
             * 读取实体卡
             */
            readEntityCard () {
                if (this.tableData.length >= 50 || !this.cardReadEnabled) return;
                this.$store.dispatch('getCardReadData').then(res => {
                    for (let i  = 0,j = this.tableData.length;i < j; i++) {

                    }
                });
            },
            /**
             * 确认开卡信息
             */
            confirmDataInfo () {
                this.$Message.success('退卡成功');
            }
        },
        computed : {
            ...mapGetters({
                cardReadEnabled : 'cardReadEnabled',
            }),
            beforeRouterList () {
                return [{
                    name : 'newCard',
                    router : {
                        name : 'refundedCard'
                    }
                }];
            }
        }
	}
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
