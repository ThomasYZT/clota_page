<!--公司在线收款-->

<template>
    <div class="online-receipt">
        <div class="pick-up-title" >
            <span class="label">{{$t('在线收款账户')}}</span>
            <span class="back-up"
                  @click="isPackUp = !isPackUp">
                    {{$t(isPackUp ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUp}"></span>
            </span>
        </div>

        <transition name="fade">
            <div class="data-wrap" v-if="isPackUp">
                <div class="edit-wrap">
                    <span class="edit" v-if="!isEditing" @click="editAccountInfo">{{$t('编辑')}}</span>
                    <template v-else>
                        <span class="save" @click="saveOnlineReceipt">{{$t('save')}}</span>
                        <span class="cancel" @click="cancelEdit">{{$t('cancel')}}</span>
                    </template>
                </div>
                <Form ref="formValidate"
                      :model="formData"
                      :rules="ruleValidate"
                      :label-width="120">
                    <i-row v-if="isScenic">
                        <i-col span="10">
                            <!--设置收款账户-->
                            <FormItem :label="$t('colonSetting',{ key : '设置收款账户' })" prop="name">
                                <Select v-model="formData.accountType" :disabled="!isEditing">
                                    <Option v-for="(item,index) in accountListDeal"
                                            :key="index"
                                            :value="item.value" >
                                        {{$t(item.name)}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="10">
                            <!--MerchantID-->
                            <FormItem :label="$t('colonSetting',{ key : 'MerchantID' })" prop="MerchantID">
                                <Input v-model.trim="formData.MerchantID" :disabled="!isEditing || formData.accountType !== 'auto'"/>
                            </FormItem>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="10">
                            <!--partnerID-->
                            <FormItem :label="$t('colonSetting',{ key : 'partnerID' })" prop="partnerID">
                                <Input v-model.trim="formData.partnerID" :disabled="!isEditing || formData.accountType !== 'auto'"/>
                            </FormItem>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="10">
                            <FormItem :label="$t('colonSetting',{ key : $t('收款账户类型') })" prop="name">
                                <CheckboxGroup v-model="formData.payChannel" >
                                    <Checkbox label="weixin" :disabled="!isEditing || formData.accountType !== 'auto'">{{$t('weixin')}}</Checkbox>
                                    <Checkbox label="alipay" :disabled="!isEditing || formData.accountType !== 'auto'">{{$t('alipay')}}</Checkbox>
                                </CheckboxGroup>
                            </FormItem>
                        </i-col>
                    </i-row>
                </Form>
            </div>
        </transition>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';

    export default {
        props : {
            //节点信息
            'node-info' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //是否在景区
            'is-scenic' : {
                type : Boolean,
                default : false
            },
            //收款账户信息
            'receipt-account-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                //是否收起
                isPackUp : true,
                //表单数据
                formData : {
                    MerchantID : '',
                    partnerID : '',
                    //收款账户类型
                    payChannel : [],
                    //收款账户
                    accountType : 'auto'
                },
                //表单数据复制
                formDataCopy : {},
                //表单校验规则
                ruleValidate : {
                    MerchantID : [
                        {
                            required : true,
                            message : this.$t('inputField',{ field : this.$t('MerchantID') }),
                            trigger : 'blur'
                        },
                        {
                            max : 50,
                            message : this.$t('errorMaxLength',{ field : this.$t('MerchantID'),length : 50 }),
                            trigger : 'blur'
                        }
                    ],
                    partnerID : [
                        {
                            required : true,
                            message : this.$t('inputField',{ field : this.$t('MerchantID') }),
                            trigger : 'blur'
                        },
                        {
                            max : 50,
                            message : this.$t('errorMaxLength',{ field : this.$t('MerchantID'),length : 50 }),
                            trigger : 'blur'
                        }
                    ]
                },
                //是否在编辑中
                isEditing : false,
                //收款账户信息
                accountList : [
                    {
                        value : '1',
                        name : '2'
                    }
                ]
            };
        },
        methods : {
            /**
             * 编辑在线收款账户信息
             */
            editAccountInfo () {
                this.isEditing = true;
                this.formDataCopy = JSON.parse(JSON.stringify(this.formData));
            },
            /**
             * 保存在线收款账户信息
             */
            saveOnlineReceipt () {
                this.$refs.formValidate.validate(valid => {
                    if (valid ) {
                        ajax.post('addPayInfo',{
                            id : this.nodeInfo.id,
                            partnerId : this.formData.partnerID,
                            merchantId : this.formData.MerchantID,
                            payChannel : this.formData.payChannel.join(','),
                            useCorpPayAcc : this.isScenic
                        }).then(res => {
                            if (res.status === 200) {
                                this.isEditing = false;
                                this.$Message.success(this.$t('successTip',{ tip : this.$t('add') }));
                                this.$emit('fresh-org-data');
                            } else {
                                this.$Message.error(this.$t('failureTip',{ tip : this.$t('add') }));
                            }
                        });
                    }
                });
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
             * 获取上级公司的收款账户
             */
            getCompanyPayInfo () {
                ajax.post('getCompanyPayInfo',{
                    id : this.nodeInfo.id,
                }).then(res => {
                    if (res.success) {
                        this.accountList = [{

                        }];
                    } else {

                    }
                });
            }
        },
        computed : {
            //收款账户处理数据
            accountListDeal () {
                return this.accountList.concat({
                    value : 'auto',
                    name : '自定义'
                });
            }
        },
        created () {
            if (this.isScenic) {
                this.getCompanyPayInfo();
            }
        },
        watch : {
            //如果节点信息变化重置收款账户信息
            receiptAccountInfo : {
                handler (newVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        this.formData.partnerID = newVal.partnerId;
                        this.formData.MerchantID = newVal.merchantId;
                        this.formData.payChannel = newVal.payChannelInfo ? newVal.payChannelInfo : [];
                        if (this.isScenic) {
                            this.formData.accountType = 'auto';
                        } else {
                            this.formData.accountType = 'auto';
                        }
                    }
                },
                immediate : true
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .online-receipt{
        @include block_outline($height : auto);
        overflow: auto;

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
        .data-wrap{
            @include block_outline($height : auto);

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
