<!--
    配额调配器
    作者：杨泽涛
-->
<template>
    <div class="quota-controller">
        <div class="board-wrapper">
            <div class="title">
                <span>{{$t('调出配额')}}</span>
            </div>
            <div class="board">
                <Form ref="outForm"
                      v-if="isFormShow"
                      :rules="outRule"
                      label-position="top"
                      :model="outFormData">
                    <i-row>
                        <template v-if="quotaType === 'everyday'">
                            <i-col span="7">
                                <FormItem :label="$t('指定日期')" prop="outTime">
                                    <!--<span class="label-title">{{$t('指定日期')}}</span>-->
                                    <DatePicker v-model="outFormData.outTime"
                                                format="yyyy-MM-dd"
                                                type="daterange"
                                                :clearable="false"
                                                :editable="false"
                                                transfer
                                                :placeholder="$t('selectField', { msg : $t('date') })"
                                                placement="bottom-end"
                                                style="width: 280px;margin-right: 10px;">
                                    </DatePicker>
                                </FormItem>
                            </i-col>
                        </template>
                        <i-col span="7">
                            <FormItem :label="$t('调出至共享配额')" prop="outNum">
                                <!--<span class="label-title equal-width">{{$t('调出至共享配额')}}</span>-->
                                <Input v-model="outFormData.outNum" type="text" placeholder="请输入" style="width: 280px;margin-right: 10px;"></Input>
                            </FormItem>
                        </i-col>
                        <Button class="ivu-btn-108px middle-btn" type="primary" @click="tuneOut">{{$t('确认调出')}}</Button>
                    </i-row>
                </Form>
            </div>
        </div>
        <div class="board-wrapper">
            <div class="title">
                <span>{{$t('调入配额')}}</span>
            </div>
            <div class="board">
                <Form ref="inForm"
                      v-if="isFormShow"
                      :rules="inRule"
                      label-position="top"
                      :model="inFormData">
                    <i-row>
                        <template v-if="quotaType === 'everyday'">
                            <i-col span="7">
                                <FormItem :label="$t('指定日期')" prop="inTime">
                                    <!--<span class="label-title">{{$t('指定日期')}}</span>-->
                                    <DatePicker v-model="inFormData.inTime"
                                                format="yyyy-MM-dd"
                                                type="daterange"
                                                :clearable="false"
                                                :editable="false"
                                                transfer
                                                :placeholder="$t('selectField', { msg : $t('date') })"
                                                placement="bottom-end"
                                                style="width: 280px;margin-right: 10px;">
                                    </DatePicker>
                                </FormItem>
                            </i-col>
                        </template>
                        <i-col span="7">
                            <FormItem :label="$t('从共享配额调入本渠道')" prop="inNum">
                                <!--<span class="label-title equal-width">{{$t('从共享配额调入本渠道')}}</span>-->
                                <Input v-model="inFormData.inNum" type="text" placeholder="请输入" style="width: 280px;margin-right: 10px;"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="6">
                            <Button class="ivu-btn-108px middle-btn" type="primary" @click="tuneIn">{{$t('确认调入')}}</Button>
                        </i-col>
                    </i-row>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
    import { validateNaturalNumber, validateDateRange } from '../../components/validateMethods';
    import ajax from '@/api/index';
    export default {
        props : {
            //配额类型
            quotaType : {
                type : String,
                default : '',
            },
            //销售政策详情
            policyInfo : {
                type : Object,
                default () {
                    return {};
                }
            },
            //渠道id
            channelId : {
                type : String,
                default : '',
            },
            //产品id
            productId : {
                type : String,
                default : '',
            },
        },
        data () {
            return {
                //调出配额表单
                outFormData : {
                    outTime : [],
                    outNum : '',
                },
                //调入配额表单
                inFormData : {
                    inTime : [],
                    inNum : '',
                },
                isFormShow : true,
            };
        },
        computed : {
            //调出校验规则
            outRule () {
                return {
                    outTime : [
                        { validator : validateDateRange, isRequired : this.quotaType === 'everyday' }
                    ],
                    outNum : [
                        { required : true, message : '请输入调出配额数量', trigger : 'blur' },
                        { validator : validateNaturalNumber }
                    ],
                };
            },
            //调入校验规则
            inRule () {
                return {
                    inTime : [
                        { required : this.quotaType === 'everyday', type : 'array', message : '', trigger : 'blur' },
                        { validator : validateDateRange }
                    ],
                    inNum : [
                        { required : true, message : '请输入调入配额数量', trigger : 'blur' },
                        { validator : validateNaturalNumber }
                    ],
                };
            },
            //公共表单参数
            commonFormData () {
                return {
                    policyId : this.policyInfo.id,
                    allocationId : this.policyInfo.allocationId,
                    productId : this.productId,
                    channelId : this.channelId,
                    quotaType : this.quotaType,
                };
            }
        },
        methods : {
            /**
             *  调出
             */
            tuneOut () {
                this.$refs.outForm.validate(valid => {
                    if (valid) {
                        let formData = {
                            num : this.outFormData.outNum,
                            type : 'out',
                        };
                        if (this.quotaType === 'everyday') {
                            formData.startDate = this.outFormData.outTime[0].format("yyyy-MM-dd");
                            formData.endDate = this.outFormData.outTime[1].format("yyyy-MM-dd");
                        }
                        this.getFirstSoldDate().then(() => {
                            this.getMinQuota(formData, 'channel').then(() => {
                                this.transferQuota(formData);
                            }).catch(err => {
                                if (err) {
                                    this.$Message.error(err);
                                } else {
                                    this.$Message.error("调出失败");
                                }
                            });
                        }).catch(err => {
                            if (err) {
                                this.$Message.error(err);
                            } else {
                                this.$Message.error("调出失败");
                            }
                        });

                    }
                });
            },
            /**
             * 调入
             */
            tuneIn () {
                this.$refs.inForm.validate(valid => {
                    if (valid) {
                        let formData = {
                            num : this.inFormData.inNum,
                            type : 'in',
                        };
                        if (this.quotaType === 'everyday') {
                            formData.startDate = this.inFormData.inTime[0].format("yyyy-MM-dd");
                            formData.endDate = this.inFormData.inTime[1].format("yyyy-MM-dd");
                        }
                        this.getFirstSoldDate().then(() => {
                            this.getMinQuota(formData, 'share').then(() => {
                                this.transferQuota(formData);
                            }).catch(err => {
                                if (err) {
                                    this.$Message.error(err);
                                } else {
                                    this.$Message.error("调入失败");
                                }
                            });
                        }).catch(err => {
                            if (err) {
                                this.$Message.error(err);
                            } else {
                                this.$Message.error("调入失败");
                            }
                        });
                    }
                });
            },
            /**
             *  获取最小可调配配额
             */
            getMinQuota (formData, scene) {
                return new Promise((resolve, reject) => {
                    ajax.post('getMinQuota', {
                        ...this.commonFormData,
                        startDate : formData.startDate,
                        endDate : formData.endDate,
                        quotaScene : scene,
                    }).then(res => {
                        if (res.success) {
                            if (formData.type === 'out') {
                                if (Number(this.outFormData.outNum) > Number(res.data ? res.data : 0)) {
                                    reject('输入的配额数量超过可调配数量');
                                } else {
                                    resolve();
                                }
                            } else {
                                if (Number(this.inFormData.inNum) > Number(res.data ? res.data : 0)) {
                                    reject('输入的配额数量超过共享配额数量');
                                } else {
                                    resolve();
                                }
                            }
                        } else {
                            reject();
                        }
                    });
                });
            },
            /**
             *  获取销售政策开始售卖日期
             */
            getFirstSoldDate () {
                return new Promise((resolve, reject) => {
                    ajax.post('getFirstSoldDate', {
                        policyId : this.policyInfo.id,
                    }).then(res => {
                        if (res.success) {
                            if (res.data) {
                                if (new Date() > new Date(res.data)) {
                                    resolve();
                                } else {
                                    reject("销售政策不在售卖日期内，无法调配配额");
                                }
                            } else {
                                reject();
                            }
                        } else {
                            reject();
                        }
                    });
                });
            },
            /**
             * 调配接口
             */
            transferQuota (formData) {
                ajax.post('transferQuota', {
                    ...this.commonFormData,
                    ...formData
                }).then(res => {
                    if (res.success) {
                        this.$emit('updateList');
                        this.$Message.success(formData.type === 'out' ? this.$t('"调出成功"') : this.$t('调入成功'));
                    } else {
                        this.$Message.error(formData.type === 'out' ? this.$t('"调出失败"') : this.$t('调入失败'));
                    }
                });
            }
        },
        watch : {
            quotaType : {
                handler () {
                    this.isFormShow = false;
                    this.$nextTick(() => {
                        this.isFormShow = true;
                    })
                },
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .quota-controller {
        .board-wrapper {
            margin-bottom: 10px;
            .title {
                margin-bottom: 10px;
                line-height: 21px;
                span {
                    font-size: 16px;
                    color: #333333;
                    letter-spacing: 1.14px;
                }
            }
            .board {
                .label-title {
                    margin-right: 10px;
                    font-size: 14px;
                    color: #585858;
                }
            }

            .middle-btn {
                margin-top: 25px;
            }
        }
    }
</style>
