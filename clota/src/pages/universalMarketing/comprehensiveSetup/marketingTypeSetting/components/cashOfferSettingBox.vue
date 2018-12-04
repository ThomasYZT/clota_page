<!--
    提现设置组件
    作者：杨泽涛
-->
<template>
    <div class="cash-offer-setting-box">
        <div class="content">
            <div class="icon-area">
                <img class="picture" src="../../../../../assets/images/cash-offer.svg" alt="">
            </div>
            <div class="info">
                <h4 class="title">{{$t('cashOfferDays')}}
                    <Tooltip :content="$t('setDaysCashOffer')" placement="right">
                        <i class="iconfont icon-help"></i>
                    </Tooltip>
                </h4>
                <span v-if="status === 'show'" class="value">{{cashOfferInfo.withdrawDay | contentFilter}}</span>
                <Form ref="form"
                      v-if="status === 'edit'"
                      :model="formData"
                      :rules="ruleValidate"
                      :label-width="0">
                    <i-row class="box-row">
                        <i-col span="24">
                            <!-- 提现天数 -->
                            <FormItem label=""  prop="withdrawDay">
                                <Input style="width:120px;"
                                       type="text"
                                       v-model.trim="formData.withdrawDay"
                                       :placeholder="$t('inputField', { field : $t('cashOfferDays') })"/>
                            </FormItem>
                        </i-col>
                    </i-row>
                </Form>
            </div>
        </div>

        <div class="box-footer">
            <template v-if="status === 'show'">
                <div class="btn">
                    <i class="iconfont icon-edit"></i>
                    <span class="blue-btn" @click="edit">{{$t('edit')}}</span>
                </div>
            </template>
            <template v-if="status === 'edit'">
                <div class="btn"><span class="blue-btn" @click="save">{{$t('save')}}</span></div>
                <div class="btn"><span @click='cancel'> {{$t('cancel')}} </span></div>
            </template>
        </div>
    </div>
</template>

<script>
    import common from '@/assets/js/common.js';
    import ajax from '@/api/index';
    export default {
        props : {
            cashOfferInfo : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {},
        data () {
            //校验正整数
            const validateNumber = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t(err,{ field : this.$t('cashOfferDays'),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('cashOfferDays') }));
                    }
                });
            };
            return {
                formData : {
                    withdrawDay : ''
                },
                ruleValidate : {
                    withdrawDay : [
                        { required : true, message : this.$t('inputField', { field : this.$t('cashOfferDays') }), trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                }
            };
        },
        computed : {
            status : {
                get : function () {
                    return this.cashOfferInfo.status;
                },
                set : function (newVal) {
                    this.cashOfferInfo.status = newVal;
                }
            }
        },
        methods : {
            /**
             * 编辑
             */
            edit () {
                this.status = 'edit';
            },
            /**
             * 组件数据重置
             */
            reset () {
                if (this.status === 'show') {
                    this.formData = { withdrawDay : '' };
                } else {
                    this.$refs.form.resetFields();
                }
            },
            /**
             * 保存设置
             */
            save () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        ajax.post('marketing-updateType', {
                            id : this.cashOfferInfo.id,
                            withdrawDay : this.formData.withdrawDay
                        }).then(res => {
                            if (res.success) {
                                this.$Message.success(this.$t('successTip', { tip : this.$t('edit') }));
                                this.reset();
                                this.status = 'show';
                                this.$emit('updateSuccess');
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('edit') }));
                            }
                        });
                    }
                });
            },
            /**
             * 取消
             */
            cancel () {
                this.status = 'show';
                this.reset();
            }
        },
        watch : {
            codeInfo : {
                handler () {
                    this.reset();
                }
            },
            deep : true
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .cash-offer-setting-box {
        width: 360px;
        height: 178px;
        border: 1px solid #E9E9E9;
    }

    .content {
        height: 137px;
        width: 100%;
        display: flex;

        .icon-area {
            padding-top: 30px;
            flex: 1 0;
            flex-basis: 20%;
            text-align: center;

            .picture {
                width: 38px;
                height: 38px;
            }
        }

        .info {
            padding-top: 30px;
            flex: 1 0;
            flex-basis: 80%;

            .title {
                height: 24px;
                line-height: 24px;
                font-size: 18px;
                color: #000;
                i {
                    color: $color_gray;
                }
            }

            .value {
                font-size: 28px;
                color: #000;
            }
        }
    }

    .box-footer {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #F7F9FA;

        span, i {
            cursor: pointer;
        }

        .blue-btn {
            color: $color_blue;
        }

        .btn {
            flex: 1 0;
            flex-basis: 50%;
            height: 40px;
            line-height: 40px;
            text-align : center;
        }
    }
</style>
