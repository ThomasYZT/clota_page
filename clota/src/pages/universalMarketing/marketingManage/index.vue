<!--
内容：营销产品管理
作者：djc
日期：
-->

<template>
    <div class="marketing-product">
        <!--列表数据筛选器-->
        <marketing-product-filter @on-search="searchMarketProducts"></marketing-product-filter>
        <!--营销产品列表-->
        <table-com
            :ofsetHeight="120"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            @query-data="queryList">
            <el-table-column
                slot="column1"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t('stockType.' + scope.row.stockType) | contentFilter}}
                    <span v-if="scope.row.stockType !== 'is_no_limit'">{{$t(scope.row.stockNum) | contentFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
                class-name="modifiedSalePrice"
                slot="column4"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Form ref="form"
                          v-if="currRowIndex == scope.$index"
                          :model="modifyModel"
                          :rules="ruleValidate">
                        <FormItem prop="modifiedSalePrice">
                            <i-input v-model.trim="modifyModel.modifiedSalePrice"
                                     type="text"
                                     ref="salePriceInput"></i-input>
                        </FormItem>
                    </Form>
                    <span v-else>{{scope.row.salePrice | moneyFilter | contentFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
                class-name="modifiedSalePrice"
                slot="column6"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Form ref="form"
                          v-if="currRowIndex == scope.$index"
                          :model="supportCollectModal">
                        <FormItem prop="modifiedSalePrice">
                            <Select v-model="supportCollectModal.supportCollect"
                                    transfer
                                    size="small">
                                <Option :value="'true'">{{ $t('support') }}</Option>
                                <Option :value="'false'">{{ $t('ban') }}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    <span v-else>{{scope.row.supportCollect && scope.row.supportCollect === 'true' ? $t('support') : $t('ban')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="canModifyMarketPrice || canQueryMarketPolicy"
                slot="column7"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <template v-if="currRowIndex==scope.$index">
                            <li @click="modifySalePrice(scope.row)">{{$t('save')}}</li>
                            <li style="color: #999;" @click="cancelModifyPrice()">{{$t('cancel')}}</li>
                        </template>
                        <template v-else>
                            <li @click="modifyPrice(scope)" v-if="canModifyMarketPrice">{{$t('modify')}}</li>
                            <li @click="checkPolicyDetail(scope.row)" v-if="canQueryMarketPolicy">{{$t("marketingPolicyDetail")}}</li>
                        </template>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--查看销售政策详情弹窗-->
        <policy-detail-modal ref="detailView"></policy-detail-modal>
    </div>
</template>
<script>
    import marketingProductFilter from './components/marketingProductFilter.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index';
    import { marketingProductHead } from './marketingManageConfig';
    import { validator } from 'klwk-ui';
    import { mapGetters } from 'vuex';
    import policyDetailModal from '../../productCenter/marketingPolicy/policyToMe/components/policyDetailModal';
    import debounce from 'lodash/debounce';
    export default {
        components : {
            marketingProductFilter,
            tableCom,
            policyDetailModal,
        },
        props : {},
        data () {
            //校验是否为数字、且大于0、且大于销售政策产品单价
            const validateNumber = (rule, value, callback) => {
                if (value && !validator.isNumber(value)) {
                    callback(new Error( this.$t('numError', { field : this.$t('terminalSalePrice') }) ));
                } else {
                    if (parseFloat(this.modifyModel.settlePrice) > parseFloat(value)) {
                        this.$Message.error(
                            this.$t('NoSmallerThan', { field1 : this.$t('terminalSalePrice'), field2 : this.$t('salePolicyProductUnitPrice') })
                        );
                        callback(new Error(
                            this.$t('NoSmallerThan', { field1 : this.$t('terminalSalePrice'), field2 : this.$t('salePolicyProductUnitPrice') }))
                        );
                    } else {
                        callback();
                    }
                }
            };

            return {
                //表头配置
                columnData : marketingProductHead,
                //表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //当前被修改的行
                currRowIndex : null,
                //提现记录传参
                queryParams : {
                    marketTypeId : '',
                    marketLevelId : '',
                    policyId : 'all',
                    pageNo : 1,
                    pageSize : 10,
                },
                //表单验证
                ruleValidate : {
                    modifiedSalePrice : [
                        { required : true, message : this.$t('inputField', { field : 'terminalSalePrice' }), trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' },
                    ]
                },
                //修改表单数据
                modifyModel : {
                    //修改后的终端售价
                    modifiedSalePrice : '',
                    //销售政策产品单价
                    settlePrice : '',
                },
                supportCollectModal : {
                    supportCollect : ''
                }
            };
        },
        computed : {
            ...mapGetters([
                'permissionInfo',
            ]),
            //是否可以查询销售政策详情
            canQueryMarketPolicy () {
                return this.permissionInfo && 'queryMarketPolicy' in this.permissionInfo;
            },
            //是否可以修改终端售价
            canModifyMarketPrice () {
                return this.permissionInfo && 'modifyMarketPrice' in this.permissionInfo;
            }
        },
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            /**
             * 查询营销产品列表数据
             */
            queryList : debounce(function () {
                let params = Object.assign({}, this.queryParams);
                params.policyId = params.policyId === 'all' ? '' : params.policyId;
                // ['marketTypeId', 'marketLevelId'].forEach((key, i) => {
                //     if (params[key].includes('all')) {
                //         params[key] = '';
                //     }
                // });
                ajax.post('marketing-queryMarketProductList',{
                    ...params
                }).then(res => {
                    if (res.success && res.data) {
                        this.tableData = res.data.data.map((item) => {
                            return {
                                ...item,
                                rootAllocationId : item.allocationId
                            };
                        }) || [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
                this.cancelModifyPrice();
            },200),
            /**
             * 搜索提现记录
             * @param params  Object
             */
            searchMarketProducts (params) {
                Object.assign(this.queryParams, params);
                this.queryList();
            },
            /**
             * 修改终端售价
             * @param scopeData  行数据，row  column  $index  store
             */
            modifyPrice (scopeData) {
                if (!this.canModifyMarketPrice) return;
                this.currRowIndex = scopeData.$index;
                this.modifyModel.modifiedSalePrice = scopeData.row.salePrice.toString();
                this.modifyModel.settlePrice = scopeData.row.settlePrice;
                this.supportCollectModal.supportCollect = scopeData.row.supportCollect &&
                    scopeData.row.supportCollect === 'true' ? 'true' : 'false';
            },
            /**
             * 取消修改终端售价
             **/
            cancelModifyPrice () {
                this.currRowIndex = null;
                if (this.$refs.form) {
                    this.$refs.form.resetFields();
                }
            },
            /**
             * 保存修改的终端售价
             * @param scopeRow
             */
            modifySalePrice (scopeRow) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        ajax.post('marketing-updateSalePrice', {
                            id : scopeRow.id,
                            salePrice : this.modifyModel.modifiedSalePrice,
                            supportCollect : this.supportCollectModal.supportCollect,
                            settlePrice : scopeRow.settlePrice,
                        }).then(res => {
                            if (res.success) {
                                scopeRow.salePrice = this.modifyModel.modifiedSalePrice;
                                this.$Message.success(this.$t('successTip', { tip : this.$t('modify') }));
                                this.queryList();
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('modify') }));
                            }
                        });
                    }
                });
            },
            /**
             * 查看销售政策详情
             * @param {object} data
             */
            checkPolicyDetail (data) {
                if (!this.canQueryMarketPolicy) return;
                //显示弹窗
                this.$refs.detailView.toggle(data, 'marketing');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .marketing-product {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius: 4px;
        /deep/ .ivu-form-item {
            margin: 0;
        }

        /deep/ .modifiedSalePrice {
            .ivu-form-item-content {
                line-height: 22px;
            }
            input {
                height: 22px;
            }
        }
    }
</style>
