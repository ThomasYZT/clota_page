<!--
    禁用模态框
    作者：杨泽涛
-->
<template>
    <Modal
        :title="$t('disabled')"
        v-model="visible"
        class-name="vertical-center-modal disable-modal"
        width="450"
        :mask-closable="false"
        @on-cancel="toggle({})">

        <div class="modal-body">
            <template v-if="tableData.length !== 0">
                <div class="tip">
                    <span>{{$t('productCenter.disableProductTip')}}</span>
                </div>
                <table-com
                    v-if="tableData.length !== 0"
                    height="200"
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="true"
                    :ofset-height="220">
                    <el-table-column
                        slot="column1"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        show-overflow-tooltip
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditStatus === 'enabled'" class="status-recharge pass">{{$t('startingUse')}}</span><!--已启用-->
                            <span v-else-if="scope.row.auditStatus === 'auditing'" class="status-recharge reject">{{$t('checking')}}</span><!--审核中-->
                            <span v-else-if="scope.row.auditStatus === 'rejected'" class="status-recharge pending">{{$t('rejected')}}</span><!--已驳回-->
                            <span v-else-if="scope.row.auditStatus === 'not_enabled'" class="status-recharge pending">{{$t('unStarting')}}</span><!--未启用-->
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </table-com>
                <div class="tip">
                    <span>{{$t('wethereContinueToDisableOrDel')}}</span>
                </div>
            </template>
            <div class="tip" v-else>
                <span>{{$t('wethereSureToDisable')}}</span>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="error" @click="forbidden" >{{$t('disabled')}}</Button>
            <Button @click="toggle({})" >{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom';
    import { disableHeadConfig } from '../../productConfig';
    export default {
        components : {
            tableCom
        },
        data () {
            return {
                //是否显示模态框
                visible : false,
                //表格数据
                tableData : [],
                //表格表头配置
                columnData : disableHeadConfig,
                //产品id
                productId : '',
            };
        },
        methods : {
            /**
             * 禁用
             */
            forbidden () {
                this.confirmCallback();
                this.toggle({});
            },
            /**
             * 控制是否显示模态框
             */
            toggle ({ type, productId, confirmCallback }) {
                if (type && type === 'disable') {
                    if (confirmCallback) {
                        this.confirmCallback = confirmCallback;
                    }
                    if (productId) {
                        this.productId = productId;
                    }
                    this.getData();
                    this.visible = true;
                } else {
                    this.tableData = [];
                    this.visible = false;
                }
            },
            /**
             * 获取引用该产品的政策列表
             */
            getData () {
                ajax.post('getPolicyIncludeProduct', {
                    productId : this.productId
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data : [];
                    } else {
                        this.tableData = [];
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .modal-body {
        .tip {
            height: 50px;
            width: 100%;
            line-height: 50px;
            color: #333;
        }

        .status-recharge {
            position: relative;
            padding-left: 14px;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 6px;
                height: 6px;
                border-radius: 50px;
            }
        }
        .pass:after {
            background: $color_green;
        }
        .pending:after {
            background: $color_BBC5D5;
        }
        .reject:after {
            background: $color_red;
        }
    }
</style>
