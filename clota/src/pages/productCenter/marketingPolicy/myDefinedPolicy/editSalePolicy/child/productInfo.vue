<!--
    产品编辑信息模版元素
    作者：杨泽涛
-->
<template>
    <div class="product-info">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <div class="form-content">
                <div class="ivu-form-item-wrap single">
                    <!--产品列表-->
                    <FormItem :label="$t('productList')" prop="quotaData">
                        <!--新增产品-->
                        <span class="blue"
                              v-if="formData.quotaData.length < productList.length"
                              @click="addProduct">+ {{$t('appendProduct')}}</span>
                        <table-com
                            auto-height
                            :table-com-min-height="260"
                            :column-data="productColumn"
                            :table-data="formData.quotaData"
                            :border="false">
                            <el-table-column
                                slot="column2"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    {{scope.row.quotaType ? $t('editPolicy.' + scope.row.quotaType) +
                                    scope.row.totalQuota : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column3"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    {{scope.row.quotaType ? $t('editPolicy.' + scope.row.quotaType) +
                                        scope.row.sharedQuota : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column4"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    {{scope.row.quotaType ? $t('editPolicy.' + scope.row.quotaType) +
                                    scope.row.marketQuota : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column5"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                fixed="right"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    <ul class="operate-list">
                                        <li class="normal" @click="modify(scope.row,scope.$index)">{{$t('modify')}}</li><!--修改-->
                                        <li class="red-label" @click="del(scope.row,scope.$index)">{{$t('delete')}}</li><!--删除-->
                                    </ul>
                                </template>
                            </el-table-column>
                        </table-com>
                    </FormItem>
                </div>
            </div>
        </Form>
        <!-- 配额管理 -->
        <quotaManageModal ref="quotaManageModal"
                          :quotaData.sync="formData.quotaData"
                          @updateQuotaChannelData="updateQuotaChannelData"></quotaManageModal>
        <!--添加/修改产品-->
        <edit-product-modal ref="editProduct"></edit-product-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import quotaManageModal from '../components/quotaManageModal';
    import { productColumn } from '../editPolicyConfig';
    import { validateProductInfo } from '../validateMethods';
    import editProductModal from '../../components/editProductModal.vue';
    import ajax from '@/api/index';

    export default {
        components : {
            tableCom,
            editProductModal,
            quotaManageModal
        },
        data () {
            return {
                //产品列表表头
                productColumn : productColumn,
                //编辑好的产品列表
                formData : {
                    quotaData : [],
                    quotaChannelData : [],
                },
                //产品列表--用于编辑的产品列表
                productList : [],
            };
        },
        computed : {
            ruleValidate () {
                return {
                    //编辑好的产品列表
                    quotaData : [
                        {
                            validator : validateProductInfo,
                            trigger : 'change',
                            params : {
                                quotaData : this.formData.quotaData
                            }
                        },
                    ]
                }
            }
        },
        methods : {
            /**
             * 查询票类产品列表
             */
            queryProductPage () {
                ajax.post('queryProductPage',{
                    pageNo : 1,
                    pageSize : 99999,
                    auditStatus : 'enabled',
                }).then(res => {
                    if (res.success) {
                        this.productList = res.data.data || [];
                    } else {
                        this.productList = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 新增产品，显示新增产品弹窗
             */
            addProduct () {
                this.$refs.editProduct.show({
                    title : this.$t('append') + this.$t('product'),
                    type : 'add',
                    productList : [...this.productList],
                    chosedProducts : [...this.formData.quotaData],
                    confirmCallback : ( data ) => {
                        this.formData.quotaData.push(data);
                    }
                });
            },
            /**
             * 修改产品
             * @param data
             * @param index
             */
            modify ( data, index ) {
                this.$refs.editProduct.show({
                    data : data,
                    title : this.$t('modify') + this.$t('product'),
                    type : 'modify',
                    productList : [...this.productList],
                    chosedProducts : [...this.formData.quotaData],
                    confirmCallback : ( _data ) => {
                        this.$set(this.formData.quotaData, index, _data);
                    }
                });
            },
            /**
             * 删除产品
             * @param data
             * @param index
             */
            del ( data, index ) {
                this.formData.quotaData.splice(index, 1);
            },
            /**
             * 校验表单
             * @return {Promise<any>}
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.formValidate.validate((valid) => {
                        if (valid) {
                            resolve({
                                quotaData : this.formData.quotaData,
                                quotaChannelData : this.formData.quotaChannelData
                            });
                        } else {
                            reject('productInfoNull');
                        }
                    });
                });
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                Object.assign(this.formData, formData);
                //初始化每个产品的专享配额总数
                this.formData.quotaData.forEach(item => {
                    item.toTalExclusiveQuota = this.formData.quotaChannelData.filter(quotaItem => {
                        return quotaItem.productId === item.productId;
                    }).reduce((sum, next) => {
                        return sum + Number(next.vipQuota ? next.vipQuota : 0);
                    }, 0);
                });
            },
            /**
             * 配额管理
             * @param channelGroupData
             */
            manageQuota (channelGroupData) {
                if (this.formData.quotaData && this.formData.quotaData.length === 0) {
                    this.$Message.warning('请添加产品')
                } else {
                    this.$refs.quotaManageModal.show({
                        type : 'edit',
                        channelGroupData : channelGroupData,
                        quotaChannelData : this.formData.quotaChannelData,
                    });
                }
            },
            /**
             * 更新配额管理数据
             * @param data 新增或修改的配额管理数据
             */
            updateQuotaChannelData (data) {
                //更新配额管理数据
                if (this.formData.quotaChannelData.length === 0) {
                    this.formData.quotaChannelData = this.formData.quotaChannelData.concat(data);
                } else {
                    this.formData.quotaChannelData.forEach(item => {
                        let findIndex = data.findIndex(quotaItem => {
                            return quotaItem.productId === item.productId && quotaItem.channelId === item.channelId;
                        });
                        if (findIndex > -1) {
                            item.vipQuota = data[findIndex].vipQuota;
                        } else {
                            this.formData.quotaChannelData.push(data[findIndex]);
                        }
                    });
                }

                //根据最新的配额管理数据更新被分配出去的全部专享配额数量
                this.formData.quotaData.forEach(item => {
                    //累加各产品在各销售渠道的配额总数
                    item.toTalExclusiveQuota = this.formData.quotaChannelData.filter(quotaItem => {
                        return quotaItem.productId === item.productId;
                    }).reduce((sum, next) => {
                        return sum + Number(next.vipQuota ? next.vipQuota : 0);
                    }, 0);
                });
            }
        },
        created () {
            //查询票类产品列表
            this.queryProductPage();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .product-info {

    }
</style>
