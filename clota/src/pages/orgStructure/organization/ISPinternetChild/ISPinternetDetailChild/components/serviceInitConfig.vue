<!--服务初始化配置 -->

<template>
    <div class="service-init-config">
        <div class="pick-up-title" >
            <span class="label">{{$t('服务初始化配置')}}</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
                    {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-arrow-down" :class="{'icon-reverse' : isPackUp}"></span>
            </span>
        </div>

        <transition name="fade">
            <div class="table-wrap" v-if="isPackUp">
                <div class="edit-wrap">
                    <!--<span class="edit" v-if="!isEditing" @click="edit">-->
                        <!--<span v-if="!isEditing" data-v-d42ae04c="" class="iconfont icon-edit"></span>{{$t('编辑')}}-->
                    <!--</span>-->
                    <!--<template v-else>-->
                        <!--<span class="save" @click="saveEdit">{{$t('save')}}</span>-->
                        <!--<span class="cancel" @click="cancelEdit">{{$t('cancel')}}</span>-->
                    <!--</template>-->
                </div>
                <Form ref="formValidate"
                      :model="formData"
                      :rules="ruleValidate"
                      :label-width="280">
                    <FormItem :label="$t('已开通会员-储值服务，储值账户类型:')"
                              v-if="defaultSetting.memberRecharge === 'true'"
                              prop="accountType">
                        <Select v-model="formData.accountType"
                                style="width: 200px;"
                                transfer
                                :disabled="!isEditing">
                            <Option v-for="item in accountTypeList"
                                    :key="item.key"
                                    :disabled="item.disabled"
                                    :value="item.value"
                                    :label="item.label" >
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('已开通会员相关服务，会员卡相关配置:')"
                              v-if="defaultSetting.memberRecharge === 'true' || defaultSetting.memberPoint === 'true'"
                              prop="accountType">
                        <Select v-model="formData.accountAttribute"
                                style="width: 200px;"
                                transfer
                                :disabled="!isEditing">
                            <Option v-for="item in accountAttrList"
                                    :key="item.key"
                                    :value="item.value"
                                    :disabled="item.disabled"
                                    :label="item.label" >
                            </Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
        </transition>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';

    export default {
        props : {
            //是否默认展开
            'isDefaultPackUp' : {
                type : Boolean,
                default : false
            },
            //初始化设置默认配置信息
            'default-setting' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //表格查询参数
            'search-params' : {
                type : Object,
                default () {
                    return {};
                }
            },
        },
        data () {
            return {
                //是否收起
                isPackUp : true,
                //表单数据
                formData : {
                    //账户类型
                    accountType : '',
                    //账户属性
                    accountAttribute : ''
                },
                //表单数据复制值，用户取消恢复
                formDataCopy : {},
                //校验规则
                ruleValidate : {

                },
                //是否正在编辑中
                isEditing : false,
            };
        },
        methods : {
            /**
             * 服务初始化配置
             */
            edit () {
                this.isEditing = true;
                this.formDataCopy = JSON.parse(JSON.stringify(this.formData));
            },
            /**
             * 取消编辑
             */
            cancelEdit () {
                this.isEditing = false;
                this.formData = JSON.parse(JSON.stringify(this.formDataCopy));
                this.$refs.formValidate.resetFields();
            },
            /**
             * 保存编辑数据
             */
            saveEdit () {
                ajax.post('setUserService',{
                    orgId : this.searchParams.id,
                    accountPattern : this.formData.accountType,
                    cardType : this.formData.accountAttribute,
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('save') }));
                        this.isEditing = false;
                        this.$emit('fresh-member-config');
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('save') }));
                    }
                });
            }
        },
        computed : {
            //账户类型列表
            accountTypeList () {
                //单账户是否禁用
                let singleDisabled = false;
                //多账户是否禁用
                let multipleDisabled = false;
                if (this.formDataCopy.accountType === 'multiple') {
                    singleDisabled = true;
                    multipleDisabled = false;
                } else if (!this.formDataCopy.accountType) {
                    singleDisabled = false;
                    multipleDisabled = false;
                }
                return [
                    {
                        label : this.$t('单账户'),
                        value : 'single',
                        disabled : singleDisabled
                    },
                    {
                        label : this.$t('多账户'),
                        value : 'multiple',
                        disabled : multipleDisabled
                    }
                ];
            },
            //会员卡属性列表
            accountAttrList () {
                //成长型是否禁用
                let growthDisabled = false;
                //售卖型是否禁用
                let saleDisabled = false;
                if (this.formDataCopy.accountAttribute === 'growth') {
                    growthDisabled = false;
                    saleDisabled = true;
                } else if (this.formDataCopy.accountAttribute === 'sale') {
                    growthDisabled = true;
                    saleDisabled = false;
                } else if (this.formDataCopy.accountAttribute === 'sale_growth') {
                    growthDisabled = true;
                    saleDisabled = true;
                }
                //如果只开通了会员积分，那么只有成长型的会员卡配置
                if (this.defaultSetting.memberPoint === 'true' && this.defaultSetting.memberRecharge === 'false') {
                    return [
                        {
                            label : this.$t('成长型'),
                            value : 'growth',
                            disabled : growthDisabled
                        },
                        {
                            label : this.$t('售卖型'),
                            value : 'sale',
                            disabled : true
                        },
                        {
                            label : this.$t('成长型+售卖型'),
                            value : 'sale_growth',
                            disabled : true
                        }
                    ];
                } else {
                    return [
                        {
                            label : this.$t('成长型'),
                            value : 'growth',
                            disabled : growthDisabled
                        },
                        {
                            label : this.$t('售卖型'),
                            value : 'sale',
                            disabled : saleDisabled
                        },
                        {
                            label : this.$t('成长型+售卖型'),
                            value : 'sale_growth',
                            disabled : false
                        }
                    ];
                }
            }
        },
        watch : {
            //从默认设置中获取服务初始化配置
            defaultSetting : {
                handler (newVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        this.formData.accountType = newVal.accountPattern;
                        this.formData.accountAttribute = newVal.cardType;
                    } else {
                        this.formData.accountType = '';
                        this.formData.accountAttribute = '';
                    }
                    this.isEditing = false;
                },
                immediate : true
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .service-init-config{

        .pick-up-title{
            @include block_outline($height: 59px);
            padding: 25px 0 10px 0;

            .label {
                display: inline-block;
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                vertical-align: middle;
            }

            .back-up {
                font-size: $font_size_14px;
                color: $color_blue;
                display: inline-block;
                margin-left: 10px;
                margin-top: 2px;
                vertical-align: middle;
                cursor: pointer;

                .icon-pull-down{
                    display: inline-block;
                    transition: all 0.5s;

                    &::before{
                        color: $color_blue;
                        font-size: 12px;
                    }

                    &.icon-reverse{
                        transform: rotate(180deg);
                        transition: all 0.5s;
                    }

                }
            }
        }

        .table-wrap{

            .edit-wrap{
                @include block_outline($height : 30px);
                line-height: 30px;
                text-align: right;

                .edit,
                .save{
                    color: $color_blue;
                    cursor: pointer;
                }

                .cancel{
                    cursor: pointer;
                }
            }
        }
    }
</style>
