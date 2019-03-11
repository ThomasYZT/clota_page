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
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </i-col>
                    <i-col span="12">
                        <!--应用场景-->
                        <Form-item :label="$t('applicationScenario')" prop="scene">
                            <Select v-model.trim="formData.scene"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    style="width: 280px;"
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
            <voucherTypeForm v-if="formData.couponType === 'cash_coupon'" :scene="formData.scene"></voucherTypeForm>
            <!-- 兑换券表单 -->
            <redemptionTypeForm v-else-if="formData.couponType === 'exchange_coupon'" :scene="formData.scene"></redemptionTypeForm>
            <!-- 折扣券表单 -->
            <discountTypeForm v-else-if="formData.couponType === 'discount_coupon'" :scene="formData.scene"></discountTypeForm>
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
                    scene : 'communicate',
                },
                //卡券类别列表
                couponTypeList : couponTypeList,
                //卡券应用场景列表
                cardScenarioList : cardScenario.filter((item) => {return item.value !== 'all';}),
            };
        },
        computed : {
            //表单验证规则
            ruleValidate () {
                return {
                    nominalValue : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('couponFaceValue') }), trigger : 'blur' },
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

            },
            /**
             * 校验表单信息
             */
            formValidateFunc () {

            },
            /**
             * 取消编辑
             */
            cancelEdit () {

            }
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
