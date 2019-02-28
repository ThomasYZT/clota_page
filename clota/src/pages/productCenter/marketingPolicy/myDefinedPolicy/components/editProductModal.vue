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
        width="740"
        class="edit-product-modal"
        class-name="vertical-center-modal"
        @on-cancel="cancel">
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
                <!-- 产品选择选择 -->
                <template>
                    <!-- 所属景区 -->
                    <div class="padding-bottom" style="padding: 10px 0;">
                        <span class="label-title">{{$t('scenePlace')}}：</span>
                        <span class="label-name">{{manageOrgs.orgName}}</span>
                    </div>
                    <i-row>
                        <i-col span="12">
                            <!--选择产品-->
                            <FormItem :label="$t('chooseProduct')" prop="productId">
                                <template v-if="type !== 'add'">
                                    <Input :value="formData.productName"
                                           disabled
                                           placeholder=""/>
                                </template>
                                <template v-else>
                                    <Select v-model="formData.productId"
                                            transfer
                                            :placeholder="$t('selectField', {msg: ''})"
                                            @on-change="changeChooseProduct">
                                        <Option v-for="(item,index) in productSelectList"
                                                :key="index"
                                                :value="item.id">
                                            {{item.productName}}
                                        </Option>
                                    </Select>
                                </template>
                            </FormItem>
                        </i-col>
                        <i-col span="12"  v-if="Object.keys(chosedProductInfo).length > 0">
                            <!--产品单价-->
                            <FormItem :label="$t('settlePrice')" prop="settlePrice">
                                <Input v-model.trim="formData.settlePrice"
                                       :disabled="type === 'check'"
                                       :placeholder="$t('inputField', {field: ''})"/>
                            </FormItem>
                        </i-col>
                    </i-row>
                </template>
                <!-- 配额设置 -->
                <template v-if="Object.keys(chosedProductInfo).length > 0">
                    <div class="divider-header">
                        <span>{{$t('quotaSetting')}}</span>
                    </div>
                    <i-row>
                        <i-col span="12">
                            <!--限制配额方式-->
                            <FormItem :label="$t('limitationOfQuotas')" prop="quotaType">
                                <Select v-model="formData.quotaType"
                                        :disabled="type === 'check' || formData.id"
                                        transfer
                                        :placeholder="$t('selectField', {msg: ''})">
                                    <Option v-for="(item,index) in enumData.quotaType"
                                            :key="index"
                                            :value="item.value">
                                        {{$t(item.label)}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <!--产品配额数量-->
                            <FormItem :label="$t('quotaOfProduct')" prop="totalQuota">
                                <Input v-model.trim="formData.totalQuota"
                                       :disabled="type === 'check'"
                                       :placeholder="$t('inputField', {field: ''})"/>
                                <Tooltip transfer placement="right">
                                    <i class="iconfont icon-note" style="color: #C5C5C5"></i>
                                    <div slot="content">
                                        <p style="width: 100px;">{{$t('descOfProductQuota')}}</p>
                                    </div>
                                </Tooltip>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <!--共享配额数量-->
                            <FormItem :label="$t('sharedQuota')" prop="sharedQuota">
                                <Input v-model.trim="formData.sharedQuota"
                                       :disabled="type === 'check'"
                                       :placeholder="$t('inputField', {field: ''})"/>
                                <Tooltip transfer placement="right">
                                    <i class="iconfont icon-note" style="color: #C5C5C5"></i>
                                    <div slot="content">
                                        <p style="width: 100px;">{{$t('descOfProductShareQuota')}}</p>
                                    </div>
                                </Tooltip>
                            </FormItem>
                        </i-col>
                        <i-col span="12" v-if="formData.isGroup !== 'true'">
                            <!--全民营销配额数量-->
                            <FormItem :label="$t('marketQuota')" prop="marketQuota">
                                <Input v-model.trim="formData.marketQuota"
                                       :disabled="type === 'check'"
                                       :placeholder="$t('inputField', {field: ''})"/>
                                <Tooltip transfer placement="right">
                                    <i class="iconfont icon-note" style="color: #C5C5C5"></i>
                                    <div slot="content">
                                        <p style="width: 100px;">{{$t('descOfProductMarketQuota')}}</p>
                                    </div>
                                </Tooltip>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <!--可分配配额数量-->
                            <FormItem :label="$t('allowableQuotaQuantity')">
                                <Input :value="allocableQuota"
                                       disabled
                                       :placeholder="$t('inputField', {field: ''})"/>
                            </FormItem>
                        </i-col>
                    </i-row>
                </template>
                <!-- 分账设置 -->
                <template v-if="formData.itemRule && formData.itemRule.length > 1">
                    <div class="divider-header">
                        <span>{{$t('priceSet')}}</span>
                    </div>
                    <i-row>
                        <i-col span="24">
                            <!--分账设置-->
                            <!--入园检票处--核销表格,区分查看与编辑-->
                            <FormItem prop="itemRule">
                                <table-com
                                    :auto-height="true"
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
                                                           :precision="1"
                                                           v-model.trim="scope.row.subPrice"
                                                           :placeholder="$t('inputField', {field: ''})">
                                            </InputNumber>
                                        </template>
                                    </el-table-column>
                                </table-com>
                            </FormItem>
                        </i-col>
                    </i-row>
                    <div><span class="red-span" >{{$t('unShareMoney')}}：{{showCountMoney}}{{$t('yuan')}}</span></div>
                </template>
            </Form>
        </div>
        <div slot="footer">
            <template v-if="type !=='check'">
                <Button type="primary" class="ivu-btn-90px" @click="confirm">{{$t('confirm')}}</Button>
                <Button type="ghost" class="ivu-btn-90px" @click="cancel">{{$t('cancel')}}</Button>
            </template>
            <template v-else>
                <Button type="ghost" class="ivu-btn-90px" @click="cancel">{{$t('close')}}</Button>
            </template>
        </div>
    </Modal>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import titlePark from '../../../components/titlePark.vue';
    import { quotaType } from '@/assets/js/constVariable';
    import { subAccountColumn } from '../editSalePolicy/editPolicyConfig';
    import { mapGetters } from 'vuex';
    import { emoji, validateMoney, validateSettlePrice, validateNumber,validateSharedQuota,
        validateMarketQuota, validateNaturalNumber, validateTotalQuota, validateItemRule } from './validateMethods';
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components : {
            tableCom,
            titlePark,
        },
        data () {
            return {
                //可选产品下拉列表数据
                productSelectList : [],
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
                    settlePrice : '',//单价
                    standardPrice : '',//"景区成本价",
                    itemRule : [],//分账设置数据 {orgId: "",parkName: "",subPrice: 0 }
                    quotaType : '',//配额限制方式
                    totalQuota : '',//产品配额数量
                    sharedQuota : '',//共享配额数量
                    marketQuota : '',//全民营销配额数量
                    toTalExclusiveQuota : 0,//分配出去的全部专享配额数量
                },
                //枚举数据
                enumData : {
                    //配额限制类型
                    quotaType : quotaType,
                },
                //所选产品列表项信息数据
                chosedProductInfo : {},
                //所选产品详细信息数据
                chosedProductDetail : {},
                //分账表头
                subAccountColumn : subAccountColumn,
            };
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs',
            }),
            //可分配配额数量
            allocableQuota () {
                return Number(this.formData.totalQuota ? this.formData.totalQuota : 0) - Number(this.formData.sharedQuota ? this.formData.sharedQuota : 0) -
                    Number(this.formData.marketQuota ? this.formData.marketQuota : 0) - Number(this.formData.toTalExclusiveQuota ? this.formData.toTalExclusiveQuota : 0);
            },
            //未分账金额
            showCountMoney () {
                if (this.formData.settlePrice && this.formData.itemRule && this.formData.itemRule.length > 1) {
                    let sum = 0;
                    this.formData.itemRule.forEach(item => {
                        sum += Number(item.subPrice);
                    });
                    return (this.formData.settlePrice - sum).toFixed(1);
                } else {
                    return 0;
                }
            },
            //表单校验规则
            ruleValidate () {
                return {
                    productId : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('chooseProduct') }), trigger : 'change' }, // 不能为空
                    ],
                    settlePrice : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('settlePrice') }), trigger : 'change' }, // 不能为空
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('settlePrice'), length : 10 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur' },
                        { validator : validateSettlePrice, trigger : 'blur', standardPrice : this.chosedProductInfo.standardPrice },
                    ],
                    quotaType : [
                        { required : true, message : this.$t('selectField', { msg : this.$t('limitationOfQuotas') }), trigger : 'change' }, // 不能为空
                    ],
                    totalQuota : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('quotaOfProduct') }), trigger : 'change' }, // 不能为空
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNumber, name : this.$t('quotaOfProduct'), trigger : 'blur' },
                        { validator : validateTotalQuota, trigger : 'change',
                          marketQuota : this.formData.marketQuota,
                          sharedQuota : this.formData.sharedQuota,
                          toTalExclusiveQuota : this.formData.toTalExclusiveQuota}
                    ],
                    sharedQuota : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('sharedQuota') }), trigger : 'change' }, // 不能为空
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNaturalNumber, trigger : 'blur' },
                        { validator : validateSharedQuota,
                          trigger : 'change',
                          totalQuota : this.formData.totalQuota,
                          marketQuota : this.formData.marketQuota,
                          toTalExclusiveQuota : this.formData.toTalExclusiveQuota}
                    ],
                    marketQuota : [
                        { required : this.formData.isGroup !== 'true', message : this.$t('errorEmpty', { msg : this.$t('marketQuota') }), trigger : 'change' }, // 不能为空
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNaturalNumber, trigger : 'blur' },
                        { validator : validateMarketQuota,
                            trigger : 'change',
                            totalQuota : this.formData.totalQuota,
                            sharedQuota : this.formData.sharedQuota,
                            toTalExclusiveQuota : this.formData.toTalExclusiveQuota }
                    ],
                    itemRule : [
                        { validator : validateItemRule,
                          itemRule : this.formData.itemRule,
                          settlePrice : this.formData.settlePrice }
                    ]
                }
            }
        },
        methods : {
            /**
             *  选择产品改变
             */
            changeChooseProduct ( val , bool) {
                if (bool) {
                    this.findProductById(this.chosedProductInfo, bool);
                } else {
                    if (val) {
                        this.reset();
                        this.formData.productId = val;
                        this.chosedProductInfo = this.productSelectList.find( item => val === item.id );
                        if (this.chosedProductInfo && this.chosedProductInfo.id) {
                            this.formData.productName = this.chosedProductInfo.productName;
                            this.formData.standardPrice = this.chosedProductInfo.standardPrice;
                            this.findProductById(this.chosedProductInfo);
                        }
                    }
                }
            },
            /**
             *  根据产品Id查明细
             *  @param data
             *  @param bool
             */
            findProductById ( data , bool) {
                ajax.post('findProductById', {
                    productId : data.id
                }).then(res => {
                    if (res.success) {
                        this.productDetail = res.data || {};
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
                this.reset();
                this.visible = false;
                if (this.cancelCallback) {
                    this.cancelCallback();
                }
            },
            /**
             * 显示 模态框
             * @param data
             * @param type
             * @param title
             * @param productList 所有产品列表数据
             * @param chosedProducts 已添加的产品列表数据
             * @param quotaChannelData 配额管理数据
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({ data, type, productList, chosedProducts, title, confirmCallback = null, cancelCallback }) {
                this.$refs.formValidate.resetFields();
                this.title = title;
                this.type = type;
                if (this.type === 'add') {
                    //过滤已添加的产品
                    this.productSelectList = productList.filter(item => {
                        return chosedProducts.findIndex(choesedProduct => {
                            return choesedProduct.productId === item.id;
                        }) <= -1;
                    });
                } else {
                    if (data) {
                        this.formData = defaultsDeep({}, data);
                        this.formData.settlePrice = this.formData.settlePrice.toString();
                        if (data.productId) {
                            this.chosedProductInfo = data;
                            this.chosedProductInfo.id = data.productId;
                            this.changeChooseProduct(data.productId, true);
                        }
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
            /**
             *  重置数据
             */
            reset () {
                this.formData.itemRule = [];
                this.formData.productName = '';
                this.formData.toTalExclusiveQuota = 0;
                this.$refs.formValidate.resetFields();
                this.chosedProductInfo = {};
                this.productDetail = {};
            },

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-product-modal {
        & /deep/ .ivu-modal {
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

            /deep/ .ivu-form {
                @include block_outline();
                margin: 0 auto;
                .ivu-form-item-label {
                    font-size: 14px;
                    color: #666666 !important;
                    padding: 0 0 5px 0;
                }
                .ivu-form-item-content {
                    line-height: 29px;
                }
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

            .label-title {
                font-size: 14px;
                color: #333333;
                line-height: 22px;
            }

            .label-name {
                font-size: 14px;
                color: #666666;
                line-height: 22px;
            }

            .padding-bottom{
                padding-bottom: 10px;
            }
            .red-span{
                color: $color_red;
            }
            /**
                分割线样式
            */
            .divider-header {
                margin: 20px 0;
                display: table;
                position: relative;
                text-align: center;
                width: 100%;

                span {
                    white-space: nowrap;
                    margin: 0 20px;
                    font-size: 14px;
                    color: #333333;
                }
                &:before {
                    display: table-cell;
                    position: relative;
                    content: "";
                    border-top: 1px dashed #E1E1E1;
                    width: 50%;
                    transform: translateY(50%);
                }
                &:after {
                    display: table-cell;
                    position: relative;
                    content: "";
                    border-top: 1px dashed #E1E1E1;
                    width: 50%;
                    transform: translateY(50%);
                }
            }
        }
    }

    .span-yellow{
        color: $color_yellow !important;
    }

</style>
