<!--游客信息-->

<template>
    <div class="product-info">
        <table-com
            :table-data="tableData"
            :column-data="touristHead"
            :is-pack-up="true"
            :title="$t('游客信息')"
            :show-page="true"
            :total="totalCount"
            @get-new-data="getSubCompany">
            <el-table-column
                slot="column11"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-info">
                        <li class="operate-list" @click="returnTicket(scoped.row)">退票</li>
                        <li class="operate-list" @click="reSendSms(scoped.row)">重发短信</li>
                        <!--<li class="operate-list" @click="changeTicket(scoped.row)">改签</li>-->
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--操作模态框-->
        <operate-modal v-model="operateModalShow"
                       :operate-type="operateType">
        </operate-modal>
    </div>
</template>

<script>
    import { touristHead } from './touristConfig';
    import tableCom from '../../../lessee/child/organization/tableCom';
    import operateModal from './touristChild/operateModal';
    export default {
        props : {
            //订单类型
            'order-type' : {
                type : String,
                default : ''
            }
        },
        components : {
            tableCom,
            operateModal
        },
        data () {
            return {
                //表格数据
                tableData : [
                    {
                        examName : 'examName',
                        status : 'open'
                    },
                    {
                        examName : 'examName',
                        status : 'close'
                    },
                    {
                        examName : 'examName',
                        status : 'pause'
                    }
                ],
                //下属景区总数
                totalCount : 100,
                //操作模态框是否显示
                operateModalShow : false,
                //操作类型
                operateType : ''
            };
        },
        methods : {
            /**
             * 获取下属景区信息
             */
            getSubCompany () {

            },
            /**
             * 退票
             * @param data
             */
            returnTicket (data) {
                this.operateType = 'returnTicket';
                this.operateModalShow = true;
            },
            /**
             * 改签
             * @param data
             */
            changeTicket (data) {
                this.operateType = 'changeTicket';
                this.operateModalShow = true;
            },
            /**
             * 重发短信
             * @param data
             */
            reSendSms (data) {
                this.$Message.success('短信重发成功');
            }
        },
        created () {
            this.getSubCompany();
        },
        computed : {
            //游客信息表头配置
            touristHead () {
                if (this.orderType === 'custom') {
                    return touristHead;
                } else if (this.orderType === 'team') {
                    return touristHead.slice(0,4);
                } else {
                    return [];
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .product-info{
        @include block_outline($height : auto);

        .operate-info{
            @include table_operate();

            .operate-list{
                color: $color_blue;
            }
        }
    }
</style>
