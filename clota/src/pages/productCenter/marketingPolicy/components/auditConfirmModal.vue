<!--
    提交审核确认弹窗
    作者：杨泽涛
-->
<template>
    <Modal
        :title="$t('checked')"
        v-model="visible"
        width="450"
        :mask-closable="false"
        @on-cancel="toggle({})"
        class-name="vertical-center-modal audit-confirm-modal">

        <div class="modal-body">
            <template v-if="tableData.length !== 0">
                <div class="tip">
                    <span>{{$t('productCenter.editOrAddPolicyTip')}}</span>
                </div>
                <table-com
                    auto-height
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="true"
                    height="300"
                    :ofset-height="220">
                    <el-table-column
                        slot="column1"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        show-overflow-tooltip
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <template v-if="scope.row.isDeleted === 'false'">
                                <span v-if="scope.row.auditStatus === 'not_enabled'">{{$t('unStarting')}}</span>
                                <span v-else-if="scope.row.auditStatus === 'auditing'">{{$t('checking')}}</span>
                                <span v-else-if="scope.row.auditStatus === 'rejected'">{{$t('rejected')}}</span>
                                <span v-else>-</span>
                            </template>
                            <template v-else-if="scope.row.isDeleted === 'true'">
                                <span>{{$t('deletedField', { field : '' })}}</span>
                            </template>
                        </template>
                    </el-table-column>
                </table-com>
            </template>
            <div class="tip" v-else>
                <span>{{$t('whetherSure') + $t('commitCheck')}}?</span>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirm()" >{{$t('confirm')}}</Button>
        </div>
    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom';
    import { auditConfirmHeadConfig } from './myPolicyConfig';
    export default {
        components : {
            tableCom
        },
        data () {
            return {
                //是否显示模态框
                visible : false,
                //模态框确认回掉
                confirmCallback : function () {},
                //表格数据
                tableData : [],
                //表格表头配置
                columnData : auditConfirmHeadConfig,
                //该销售政策已添加的产品
                products : [],
                //产品id
                productIds : '',
            }
        },
        methods : {
            /**
             * 确认
             */
            confirm () {
                if (this.tableData.length === 0) {
                    this.confirmCallback();
                }
                this.toggle({});
            },
            /**
             * 控制是否显示模态框状态
             * @param {string} type
             * @param {objects} products
             * @param {function} confirmCallback
             */
            toggle ({ type, products, confirmCallback }) {
                if (type && type === 'audit') {
                    if (confirmCallback) {
                        this.confirmCallback = confirmCallback;
                    }
                    if (products && products.length > 0) {
                        this.products = products;
                        this.productIds = this.products.map((item) => {
                            return item.productId;
                        }).join(',');
                        this.getData();
                    }
                    this.visible = true;
                } else {
                    this.productIds = '';
                    this.products = [];
                    this.tableData = [];
                    this.confirmCallback = function () {};
                    this.visible = false;
                }
            },
            /**
             *  获取产品列表数据
             */
            getData () {
                ajax.post('queryProducts', {
                    productIds : this.productIds
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data : [];
                    } else {
                        this.tableData = [];
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .modal-body {
        &.fix-height {

        }
        .tip {
            font-size: 14px;
            color: #333;
        }
    }
</style>
