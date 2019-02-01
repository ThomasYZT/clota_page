<!--
内容：产品列表 - 编辑/新增产品 - 新增产品
作者：
日期：
-->
<template>
    <Modal
        title="Title"
        v-model="visible"
        :mask-closable="false"
        class="edit-product-modal"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >
                {{title}}
            </span>
        </div>
        <div class="content-info">

            <!--一票制表单信息-->
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">

                <div class="padding-bottom" style="padding: 10px 0;">
                    <span>{{$t('scenePlace')}}：</span>
                    <span>{{manageOrgs.orgName}}</span>
                </div>
                <i-row>
                    <i-col span="12">
                        <FormItem :label="$t('chooseProduct')" prop="productId"><!--选择产品-->
                            <template v-if="type === 'modify'">
                                <Input :value="formData.productName"
                                       disabled
                                       placeholder=""/>
                            </template>
                            <template v-else>
                                <Select v-model="formData.productId"
                                        :disabled="type === 'check'"
                                        transfer
                                        :placeholder="$t('selectField', {msg: ''})"
                                        @on-change="changeChooseProduct">
                                    <Option v-for="(item,index) in list"
                                            :key="index"
                                            :value="item.id">
                                        {{item.productName}}
                                    </Option>
                                </Select>
                            </template>
                        </FormItem>
                    </i-col>
                    <i-col span="12" v-if="Object.keys(productInfo).length > 0">
                        <FormItem :label="$t('productEffect')" prop="productId"><!--产品有效性-->
                            <span>{{$t(productInfo.productEffSet)}}</span>
                        </FormItem>
                    </i-col>
                </i-row>

                <template v-if="formData.productId">

                    <!--分割线-->
                    <div class="split-line"></div>

                    <i-row>
                        <i-col span="12">
                            <FormItem :label="$t('stockType')" prop="stockType"><!--限制库存-->
                                <Select v-model="formData.stockType"
                                        @on-change="changeStockType"
                                        :placeholder="$t('selectField', {msg: ''})">
                                    <Option v-for="(item,index) in enumData.limitStore"
                                            :key="index"
                                            :value="item.value">
                                        {{$t(item.label)}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <template v-if="formData.stockType">
                                <FormItem :label="$t('stockNum')" prop="stockNum"><!--库存数量-->
                                    <Input v-if="formData.stockType !== 'is_no_limit'"
                                           v-model.trim="formData.stockNum"
                                           :disabled="type === 'check'"
                                           :placeholder="$t('inputField', {field: ''})"/>
                                    <span v-else>
                                        {{$t('disableSet')}}
                                    </span>
                                </FormItem>
                            </template>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <FormItem :label="$t('standardPrice')"><!--景区成本价-->
                                <Input v-model.trim="productInfo.standardPrice"
                                       disabled
                                       placeholder=""/>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem :label="$t('settlePrice')" prop="settlePrice"><!--产品单价-->
                                <Input v-model.trim="formData.settlePrice"
                                       :disabled="type === 'check'"
                                       :placeholder="$t('inputField', {field: ''})"/>
                            </FormItem>
                        </i-col>
                    </i-row>

                    <template v-if="formData.itemRule && formData.itemRule.length > 1">

                        <i-row>
                            <i-col span="24">
                                <FormItem :label="$t('priceSet')"><!--分账设置-->
                                    <!--入园检票处--核销表格,区分查看与编辑-->
                                    <table-com
                                        :table-com-min-height="250"
                                        :column-data="subAccountColumn"
                                        :table-data="formData.itemRule"
                                        :border="true">
                                        <el-table-column
                                            slot="column1"
                                            :label="row.title"
                                            :prop="row.field"
                                            :key="row.index"
                                            :width="row.width"
                                            :min-width="row.minWidth"
                                            show-overflow-tooltip
                                            slot-scope="row">
                                            <template slot-scope="scope">
                                                <InputNumber   class="short-input"
                                                               :max="formData.settlePrice ? Number(formData.settlePrice) : 9999999999"
                                                               :min="0"
                                                               :disabled="type === 'check'"
                                                               v-model.trim="scope.row.subPrice"
                                                               :placeholder="$t('inputField', {field: ''})">
                                                </InputNumber>
                                            </template>
                                        </el-table-column>
                                    </table-com>
                                </FormItem>
                            </i-col>
                        </i-row>

                        <div><span class="red-span" v-if="showCountMoney > 0">{{$t('unShareMoney')}}：{{showCountMoney}}{{$t('yuan')}}</span></div>

                    </template>

                </template>

            </Form>

        </div>
        <div slot="footer">
            <Button type="primary" class="ivu-btn-90px" @click="confirm">{{$t('confirm')}}</Button>
            <Button type="ghost" class="ivu-btn-90px" @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import titlePark from '../../../components/titlePark.vue';
    import { limitStore } from '@/assets/js/constVariable';
    import { subAccountColumn } from '../editSalePolicy/editPolicyConfig';
    import common from '@/assets/js/common.js';
    import { mapGetters } from 'vuex';
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components : {
            tableCom,
            titlePark,
        },
        data () {
            let validateMethod = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                }
            };
            //校验正整数
            const validateNumber = (rule,value,callback) => {
                if (value) {
                    common.validateInteger(value).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t(err,{ field : this.$t(rule.field),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t(rule.field) }));
                        }
                    });
                } else {
                    callback();
                }
            };
            //校验钱
            const validateMoney = (rule,value,callback) => {
                if (value) {
                    common.validateMoney(value).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t('errorMaxLength',{ field : this.$t(rule.field),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t(rule.field) }));
                        }
                    });
                } else {
                    callback();
                }
            };
            //校验库存数量
            const validateStockNum = (rule,value,callback) => {
                if (this.formData.stockType && this.formData.stockType != "is_no_limit"/* && value && this.productDetail.productSaleVo.stockNum*/) {
                    /*if ( Number(value) > Number(this.productDetail.productSaleVo.stockNum) ) {
                        //console.log(Number(value), Number(this.productDetail.productSaleVo.stockNum))
                        callback(this.$t('errorGreaterThan',{ small : this.$t('stockNum'),big : this.$t('upLevelStockName') + this.productDetail.productSaleVo.stockNum }));
                    } else {
                        callback();
                    }*/
                    if (!value) {
                        callback(this.$t('errorEmpty', { msg : this.$t('stockNum') }));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            //校验单价
            const validateSettlePrice = (rule,value,callback) => {
                if (value && this.productInfo.standardPrice) {
                    if ( Number(value) < Number(this.productInfo.standardPrice) ) {
                        callback(this.$t('sizeErrorS',{ filed1 : this.$t('settlePrice'),filed2 : this.productInfo.standardPrice }));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };

            return {
                //可选产品下拉列表数据
                list : [],
                //类型 add/modify/check
                type : 'add',
                //标题信息
                title : this.$t('append') + this.$t('product'),
                //是否显示模态框
                visible : false,
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
                //表单数据
                formData : {
                    productId : '',//"产品ID",
                    productName : '',//"产品名称",
                    standardPrice : '',//"景区成本价",
                    stockType : "",//库存限制类型（总量-total,每日-everyday,不限库存-is_no_limit）
                    stockNum : "",//库存数量
                    settlePrice : "",//单价
                    //分账设置表格数据 {orgId: "",parkName: "",subPrice: 0 }
                    itemRule : [],
                },
                ruleValidate : {
                    productId : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('chooseProduct') }), trigger : 'change' }, // 不能为空
                    ],
                    stockType : [
                        { required : true, message : this.$t('selectField', { msg : this.$t('stockType') }), trigger : 'change' }, // 不能为空
                    ],
                    stockNum : [
                        { validator : validateStockNum, trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' },
                    ],
                    settlePrice : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('settlePrice') }), trigger : 'change' }, // 不能为空
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('settlePrice'), length : 10 }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur' },
                        { validator : validateSettlePrice, trigger : 'blur' },
                    ],
                },
                //枚举数据
                enumData : {
                    //限制库存
                    limitStore : limitStore,
                },
                //所选产品
                productInfo : {},
                productDetail : {},
                //分账表头
                subAccountColumn : subAccountColumn,
            };
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs',
            }),
            //未分账金额
            showCountMoney () {
                if (this.formData.settlePrice && this.formData.itemRule && this.formData.itemRule.length > 1) {
                    let sum = 0;
                    this.formData.itemRule.forEach(item => {
                        sum += Number(item.subPrice);
                    });
                    if (this.formData.settlePrice - sum < 0) {
                        this.$Message.warning(this.$t('sizeErrorB', { filed1 : this.$t('priceSet'), filed2 : this.$t('settlePrice') }),);
                    }
                    return this.formData.settlePrice - sum;
                } else {
                    return 0;
                }
            },
        },
        methods : {

            //选择产品改变
            changeChooseProduct ( val , bool) {
                if (bool) {
                    this.findProductById(this.productInfo, bool);
                } else {
                    if (val) {
                        this.productInfo = this.list.find( item => val === item.id );
                        if (this.productInfo && this.productInfo.id) {
                            this.formData.productName = this.productInfo.productName;
                            this.formData.standardPrice = this.productInfo.standardPrice;
                            this.findProductById(this.productInfo);
                        }
                        //改变限制库存选择列表
                        if (this.productInfo.productEffSet === 'same_to_policy') {
                            this.enumData = {
                                limitStore : limitStore.filter((item) => {
                                    return item.value !== 'everyday';
                                })
                            };
                        } else {
                            this.enumData = {
                                limitStore : limitStore,
                            };
                        }
                    }
                }
            },

            // 根据产品Id查明细
            findProductById ( data , bool) {
                ajax.post('findProductById', {
                    productId : data.id
                }).then(res => {
                    if (res.success) {
                        this.productDetail = res.data || {};
                        //this.formData.stockType = res.data.productSaleVo.stockType;
                        if (!bool) {
                            this.formData.itemRule = [];
                            if (res.data && res.data.productPlayRuleVo && res.data.productPlayRuleVo.length > 0) {
                                res.data.productPlayRuleVo.forEach( item => {
                                    this.formData.itemRule.push({
                                        orgId : item.orgId,
                                        parkName : item.parkName,
                                        subPrice : 0,
                                    });
                                } );
                            }
                        }

                    } else {
                        this.itemRule = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            /**
             * 确认
             */
            confirm () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        if (this.showCountMoney == 0) {
                            this.loading = true;
                            if (this.confirmCallback) {
                                let formData = defaultsDeep({},this.formData);
                                this.confirmCallback( formData );
                                this.cancel();
                            }
                        } else {
                            this.$Message.error(this.$t('unShareMoney') + '：' + this.showCountMoney + this.$t('yuan'));
                        }
                    }
                });
            },

            /**
             * 取消
             */
            cancel () {
                this.visible = false;
                this.$refs.formValidate.resetFields();
                if (this.cancelCallback) {
                    this.cancelCallback();
                }
                this.resetFunc();
            },

            /**
             * 显示 模态框
             * @param data
             * @param type
             * @param title
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({ data, type, productList, chosedProducts, title, confirmCallback = null, cancelCallback }) {
                this.title = title;
                this.type = type;
                let _productList = productList;
                let _chosedProducts = chosedProducts;
                for (let i = 0, len = _productList.length; i < len; i++) {
                    for (let j = 0, jlen = _chosedProducts.length; j < jlen; j++) {
                        if (_chosedProducts[j].productId === _productList[i].id) {
                            _productList.splice(i, 1);
                            _chosedProducts.splice(j, 1);
                            i--;
                            len--;
                            j--;
                            jlen--;
                            break;
                        }
                    }
                }
                this.list = _productList;
                if (data) {
                    this.formData = defaultsDeep({}, data);
                    this.formData.settlePrice = this.formData.settlePrice.toString();
                    if (data.productId) {
                        this.productInfo = data;
                        this.productInfo.id = data.productId;
                        this.changeChooseProduct(data.productId, true);
                    }
                }
                if (confirmCallback && typeof confirmCallback == 'function') {
                    this.confirmCallback = confirmCallback;
                }
                if (cancelCallback && typeof cancelCallback == 'function') {
                    this.cancelCallback = cancelCallback;
                }
                this.visible = true;
            },

            //重置数据
            resetFunc () {
                this.formData = {
                    productId : '',
                    stockType : '',
                    stockNum : '',
                    settlePrice : '',
                    itemRule : [],
                };
                this.productInfo = {};
                this.productDetail = {};
            },
            /**
             * 更改困存限制
             * @param {string} val
             */
            changeStockType (val) {
                this.formData.stockNum = '';
                this.$nextTick(() => {
                    this.$refs.formValidate.validateField('stockNum');
                });
            }

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-product-modal {
        & /deep/ .ivu-modal {
            width: 740px !important;
            min-height: 580px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                display: inline-block;
                width: 100%;
                @include overflow_tip(100%);
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 12px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 7px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline();
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .content-info {
            @include block_outline();
            font-size: $font_size_14px;
            color: $color_333;
            padding: 20px 40px;
            text-align: left;
            max-height: 600px;
            min-height: 240px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline();
                margin: 0 auto;
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                &.short-input{
                    width: 180px;
                }
            }

            /deep/ .ivu-select{
                width: 280px;
            }

            /deep/ .ivu-input{
                font-size: $font_size_14px;
            }

            /deep/ .ivu-select-placeholder{
                font-size: $font_size_14px;
            }

            .padding-bottom{
                padding-bottom: 10px;
            }

            .split-line{
                border-top: 1px dashed $color_979797_020;
                padding-bottom: 20px;
            }

            .red-span{
                color: $color_red;
            }

        }
    }

    .span-yellow{
        color: $color_yellow !important;
    }

    /deep/ .el-table {
        th {
            padding: 7px 0;
        }
    }

</style>
