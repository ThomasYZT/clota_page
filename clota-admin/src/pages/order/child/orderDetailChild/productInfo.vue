<!--产品信息-->

<template>
    <div class="product-info">
        <table-com
            :table-data="tableData"
            :column-data="productHead"
            :is-pack-up="true"
            :title="$t('产品信息')"
            :show-page="true"
            :total="totalCount"
            @get-new-data="getSubCompany">
            <el-table-column
                slot="column5"
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
                        <li class="operate-list" @click="changeTicket(scoped.row)">改签</li>
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
    import {productHead} from './productConfig';
    import tableCom from '../../../lessee/child/organization/tableCom';
    import operateModal from './productChild/operateModal';
    export default {
        components : {
            tableCom,
            operateModal
        },
        data() {
            return {
                //下属景区表头配置
                productHead : productHead,
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
            }
        },
        methods: {
            /**
             * 获取下属景区信息
             */
            getSubCompany () {

            },
            /**
             * 退票
             */
            returnTicket () {
                this.operateType = 'returnTicket';
                this.operateModalShow = true;
            },
            /**
             * 改签
             */
            changeTicket () {
                this.operateType = 'changeTicket';
                this.operateModalShow = true;
            }
        },
        created () {
            this.getSubCompany();
        }
    }
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
