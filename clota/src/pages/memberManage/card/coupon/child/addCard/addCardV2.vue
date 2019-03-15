<!--
    新增/修改卡券信息
    作者：杨泽涛
-->
<template>
    <div class="add-card">
        <div class="breadcrumb-box">
            <!--新增卡券 : 修改卡券信息-->
            <bread-crumb-head
                :locale-router="type === 'add' ? 'newCardCoupon' : 'modifyCardInfo'"
                :before-router-list="beforeRouterList">
            </bread-crumb-head>
        </div>

        <div class="form-container">
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">
                <i-row>
                    <i-col span="24">
                        <!--卡券名称-->
                        <Form-item :label="$t('couponName')" prop="couponName">
                            <Input v-model.trim="formData.couponName"
                                   style="width: 280px;"
                                   :disabled="type !== 'add'"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <!--应用场景-->
                        <Form-item :label="$t('applicationScenario')" prop="appScene">
                            <Select v-model.trim="formData.appScene"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    style="width: 280px;"
                                    :disabled="type !== 'add'"
                                    @on-change="sceneChange">
                                <Option v-for="(item,index) in cardScenarioList"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <Tooltip transfer placement="right">
                                <span class="iconfont icon-note"></span>
                                <div style="width: 200px; word-break: break-all;"
                                     slot="content">
                                    <p>传播型主要用于：创建创建一定数量的优惠券后将优惠券进行生成链接、批量导出、上架积分商城</p>
                                    <p>会员权益型主要用于：将创建的该类型优惠券通过自动或手动的形式发放至会员名下，该类型优惠券不可进行传播</p>
                                </div>
                            </Tooltip>
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <!--卡券类别-->
                        <Form-item :label="$t('couponType')" prop="couponType">
                            <Select v-model.trim="formData.couponType"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    style="width: 280px;"
                                    :disabled="type !== 'add'"
                                    @on-change="typeChange">
                                <Option v-for="(item,index) in couponTypeList"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </i-col>
                </i-row>
            </Form>
            <!-- 代金券表单 -->
            <voucherTypeForm ref="cash_coupon"
                             :type="type"
                             v-if="formData.couponType === 'cash_coupon'"
                             :scene="formData.appScene"
                             :channelSetList="channelSetList"
                             :listAmountRange="listAmountRange"
                             :productTypeList="productTypeList"></voucherTypeForm>
            <!-- 兑换券表单 -->
            <redemptionTypeForm ref="exchange_coupon"
                                :type="type"
                                v-else-if="formData.couponType === 'exchange_coupon'"
                                :scene="formData.appScene"
                                :channelSetList="channelSetList"
                                :productList="productList"
                                :listAmountRange="listAmountRange"></redemptionTypeForm>
            <!-- 折扣券表单 -->
            <discountTypeForm ref="discount_coupon"
                              :type="type"
                              v-else-if="formData.couponType === 'discount_coupon'"
                              :scene="formData.appScene"
                              :channelSetList="channelSetList"
                              :listAmountRange="listAmountRange"
                              :productTypeList="productTypeList"></discountTypeForm>
        </div>

        <div class="content-footer">
            <i-button type="primary"
                      class="ivu-btn-108px"
                      @click="formValidateFunc">{{$t('confirm')}}</i-button>
            <i-button type="ghost"
                      class="ivu-btn-108px"
                      @click="cancelEdit">
                {{$t('cancel')}}
            </i-button>
        </div>
    </div>
</template>

<script>
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import { couponTypeList, cardScenario } from '@/assets/js/constVariable.js';
    import discountTypeForm from './components/discountTypeForm';
    import voucherTypeForm from './components/voucherTypeForm';
    import redemptionTypeForm from './components/redemptionTypeForm';
    import { emoji } from '../../../validateMethods';
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { mapGetters } from 'vuex';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            discountTypeForm,
            voucherTypeForm,
            redemptionTypeForm,
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'coupon',
                        router : {
                            name : 'coupon'
                        }
                    }
                ],
                //页面当前类型 add -- 新增 modify -- 修改 check -- 查看
                type : '',
                //表单数据
                formData : {
                    //卡券名称
                    couponName : '',
                    //卡券类别
                    couponType : 'cash_coupon',
                    //应用场景
                    appScene : 'spread',
                },
                //卡券类别列表
                couponTypeList : couponTypeList.filter((item) => {return item.value !== 'all';}),
                //卡券应用场景列表
                cardScenarioList : cardScenario.filter((item) => {return item.value !== 'all';}),
                //可用渠道列表
                channelSetList : [],
                //可用店铺列表
                listAmountRange : [],
                //可用产品类别列表
                productTypeList : [],
                //商品列表数据
                productList : [],
                //列表项数据
                rowData : {},
            };
        },
        computed : {
            ...mapGetters({
                lang : 'lang',
                manageOrgs : 'manageOrgs'
            }),
            //表单验证规则
            ruleValidate () {
                return {
                    //卡券名称
                    couponName : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('couponName') }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { type : 'string', max : 30, message : this.$t('errorMaxLength', { field : this.$t('couponName'), length : 30 }), trigger : 'blur' }, // 不能多于30个字符
                    ],
                    //应用场景
                    appScene : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('applicationScenario') }), trigger : 'blur' },
                    ],
                    //卡券类别
                    couponType : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('couponType') }), trigger : 'blur' },
                    ],
                };
            }
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.type) {
                    this.type = params.type;
                    if (this.type !== 'add' && params.rowData && Object.keys(params.rowData).length > 0) {
                        this.rowData = params.rowData;
                    } else {
                        this.$router.push({
                            name : 'coupon'
                        });
                    }
                } else {
                    this.$router.push({
                        name : 'coupon'
                    });
                }
            },
            /**
             *  卡券类别选项变更
             *  @param val 卡券类别
             */
            typeChange (val) {

            },
            /**
             * 应用场景选项变更
             * @param val 应用场景
             */
            sceneChange (val) {
                this.$refs[this.formData.couponType].formReset();
            },
            /**
             *  公共表单验证
             */
            commonFormValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.formValidate.validate(valid => {
                        if (valid) {
                            resolve(this.formData);
                        } else {
                            reject();
                        }
                    })
                })
            },
            /**
             * 校验表单信息
             */
            formValidateFunc () {
                Promise.all([
                    this.commonFormValidate(),
                    this.$refs[this.formData.couponType].formValidate(),
                ]).then(resultSet => {
                    //最终表单数据
                    let resultFormData = {};
                    resultSet.forEach(res => {
                        resultFormData = defaultsDeep(resultFormData, res);
                    });
                    this.updateCoupon(resultFormData);
                }).catch(err => {
                    console.log(err)
                })
            },
            /**
             *  新增/编辑优惠券
             */
            updateCoupon (resultFormData) {
                console.log(resultFormData);
                ajax.post('updateCoupon', resultFormData).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                        //前往卡券列表页面
                        this.$router.push({
                            name : 'coupon',
                        });
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                    }
                });
            },
            /**
             * 取消编辑
             */
            cancelEdit () {

            },
            /**
             * 查询所有可用渠道
             */
            queryChannelSet () {
                ajax.post('querySelfOwnedChannel', {
                    status : 'valid',
                    pageNo : 1,
                    pageSize : 999
                }).then(res => {
                    if (res.success) {
                        this.channelSetList = res.data ? res.data.data : [];
                    } else {
                        this.channelSetList = [];
                    }
                }).catch(() => {
                    this.channelSetList = [];
                });
            },
            /**
             * 查询所有可用店铺
             */
            queryListAmountRange () {
                ajax.post('getSubNode',{
                    orgType : 'scenic',
                    includeMe : this.manageOrgs.nodeType === 'scenic'
                }).then(res => {
                    if (res.success) {
                        this.listAmountRange = res.data ? res.data : [];
                    } else {
                        this.listAmountRange = [];
                    }
                }).catch(() => {
                    this.listAmountRange = [];
                });
            },
            /**
             * 查询所有产品类别信息
             */
            queryProductType () {
                ajax.post('queryProductType',{
                    pageNo : 1,
                    pageSize : 9999,
                }).then(res => {
                    if (res.success) {
                        this.productTypeList = res.data ? res.data.data : [];
                    } else {
                        this.productTypeList = [];
                    }
                }).catch(err => {
                    this.productTypeList = [];
                });
            },
            /**
             * 查询商品列表数据
             */
            listProductList () {
                ajax.post('listProductList', {
                    pageNo : 1,
                    pageSize : 9999,
                }).then(res => {
                    if (res.success) {
                        this.productList = res.data ? res.data.data : [];
                    } else {
                        this.productList = [];
                    }
                })
            }
        },
        created () {
            //查询所有可用渠道
            this.queryChannelSet();
            //查询所有可用店铺
            this.queryListAmountRange();
            //查询所有产品类别信息
            this.queryProductType();
            //查询所有商品数据
            this.listProductList();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .form-container {
            padding: 50px 0 50px 130px;
            margin: 0 auto;
            width: 90%;

        }

        .content-footer{
            text-align: center;

            /deep/ .ivu-btn-ghost{
                margin-left: 15px;;
            }
        }
    }

    /deep/ .ivu-tooltip {
        vertical-align: bottom;
    }

</style>
