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
                    <i-col span="12">
                        <!--卡券类别-->
                        <Form-item :label="$t('couponType')" prop="couponType"><!--卡券类别-->
                            <Select v-model.trim="formData.couponType"
                                    :placeholder="$t('selectField', {msg: ''})"
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
        </div>
    </div>
</template>

<script>
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import { couponTypeList, cardScenario } from '@/assets/js/constVariable.js';
    import discountTypeForm from './child/discountTypeForm';
    import defaultsDeep from 'lodash/defaultsDeep';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            discountTypeForm
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
                //页面当前类型 add -- 新增 modify -- 修改
                type : '',
                //表单数据
                formData : {
                    couponType : '',
                    scene : '',
                },
                //卡券类别列表
                couponTypeList : couponTypeList,
                //卡券应用场景列表
                cardScenarioList : cardScenario,
            };
        },
        computed : {
            //表单验证规则
            ruleValidate () {
                return {
                    nominalValue : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('couponFaceValue') }), trigger : 'blur' },
                    ],
                }
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
            typeChange (val) {
                this.$nextTick(() => {
                    this.formData = defaultsDeep(this.formData, this.$refs['discountTypeForm'].getFormData());
                })
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
            margin: 0 auto;
            width: 80%;
        }
    }

</style>
