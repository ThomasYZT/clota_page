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
                    <FormItem :label="$t('productList')" prop="itemsData">
                        <!--新增产品-->
                        <span class="blue"
                              v-if="formData.itemsData.length < productListCount"
                              @click="addProduct">+ {{$t('appendProduct')}}</span>
                        <table-com
                            auto-height
                            :table-com-min-height="260"
                            :column-data="productColumn"
                            :table-data="formData.itemsData"
                            :border="false">
                            <el-table-column
                                slot="column3"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    {{$t(scope.row.stockType)}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column4"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
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


        <!--添加/修改产品-->
        <edit-product-modal ref="editProduct"></edit-product-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { productColumn } from '../editPolicyConfig';
    import { validateProductInfo } from '../validateMethods';
    import editProductModal from '../../components/editProductModal.vue';
    import ajax from '@/api/index';

    export default {
        components : {
            tableCom,
            editProductModal
        },
        data () {
            return {
                //产品列表表头
                productColumn : productColumn,
                //编辑好的产品列表
                formData : {
                    itemsData : [],
                },
                //产品列表--用于编辑的产品列表
                productList : [],
                //产品列表表格数据总数
                productListCount : 0,
            };
        },
        computed : {
            ruleValidate () {
                return {
                    //编辑好的产品列表
                    itemsData : [
                        {
                            validator : validateProductInfo,
                            trigger : 'change',
                            params : {
                                itemsData : this.formData.itemsData
                            }
                        },
                    ]
                }
            }
        },
        methods : {
            /**
             * 新增产品，显示新增产品弹窗
             */
            addProduct () {
                this.$refs.editProduct.show({
                    title : this.$t('append') + this.$t('product'),
                    type : 'add',
                    productList : [...this.productList],
                    chosedProducts : [...this.formData.itemsData],
                    confirmCallback : ( data ) => {
                        this.open = true;
                        this.formData.itemsData.push(data);
                    },
                    cancelCallback : () => {
                        this.open = true;
                    }
                });
                this.open = false;
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
                    chosedProducts : [...this.formData.itemsData],
                    confirmCallback : ( _data ) => {
                        this.open = true;
                        this.$set(this.formData.itemsData, index, _data);
                    },
                    cancelCallback : () => {
                        this.open = true;
                    }
                });
                this.open = false;
            },
            /**
             * 删除产品
             * @param data
             * @param index
             */
            del ( data, index ) {
                this.formData.itemsData.splice(index, 1);
            },
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
                        this.productListCount = res.data.data.length || 0;
                    } else {
                        this.productList = [];
                        this.productListCount = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
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
                                itemsData : this.formData.itemsData
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
