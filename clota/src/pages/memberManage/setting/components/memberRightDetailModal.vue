<!--会员卡权益-->

<template>
    <Modal
        :title="$t('memberCardRight')"
        :mask-closable="false"
        :value="value"
        :width="550"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="member-rights-modal"
        class-name="vertical-center-modal">
        <Form ref="formValidate">
            <template v-for="(item,index) in rightInfo.birthday" v-if="detailInfo.cardTypeId !== '3'">
                <!--生日购票优惠-->
                <i-row :key="'birthday' + index">
                    <i-col style="display: inline-block;width : auto;">
                        <i-switch v-model="item.isEnable" @on-change="changeValidateStatus(index,'birthday')"></i-switch>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="word-label">{{$t('limitedInbirthDay')}}</span>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem :prop="'birthdayNum' + index"
                                  :rules="{ required : true,validator : validateNum,trigger : 'blur',data : item.rule.num,isEnable : item.isEnable }">
                            <i-input type="text"
                                     v-model.trim="item.rule.num"
                                     style="width: 70px;">
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="word-label">{{$t('paper')}}</span>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem :prop="'birthdayDiscount' + index"
                                  :rules="{ required : true,validator : validateDecimail,trigger : 'blur',data : item.rule.discount,isEnable : item.isEnable }">
                            <i-input type="text"
                                     v-model.trim="item.rule.discount"
                                     style="width: 70px;">
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="word-label">{{$t('discountTicket')}}</span>
                    </i-col>
                </i-row>
            </template>
            <!--每月优惠门票-->
            <template v-for="(item,index) in rightInfo.ticket">
                <i-row :key="'ticket' + index" v-if="item.type === 'ticket'">
                    <i-col style="display: inline-block;width : auto;">
                        <i-switch v-model="item.isEnable" @on-change="changeValidateStatus(index,'ticket')"></i-switch>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="word-label">{{$t('everyMonth')}}</span>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem :prop="'ticketNum' + index"
                                  :rules="{ required : true,validator : validateNum,trigger : 'blur',data : item.rule.num,isEnable : item.isEnable  }">
                            <i-input type="text"
                                     v-model.trim="item.rule.num"
                                     style="width: 70px;">
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="word-label">{{$t('paper')}}</span>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem
                            :prop="'ticketScenicId' + index"
                            :rules="{ validator : validateScenic,trigger : 'change',index : index,isEnable : item.isEnable }">
                            <Select v-model="item.rule.scenicId"
                                    transfer
                                    :label-in-value="true"
                                    @on-change="selectChange($event, item)"
                                    style="width: 100px;">
                                <Option :value="item.id"
                                        class="overflow-tip-list"
                                        v-for="(item,index) in scenicList"
                                        v-w-title="item.productName"
                                        :key="index">
                                    {{item.productName}}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem :prop="'ticketDiscount' + index"
                                  :rules="{ validator : validateMoney,trigger : 'blur',data : item.rule.discount,isEnable : item.isEnable }">
                            <i-input type="text"
                                     v-model.trim="item.rule.discount"
                                     style="width: 70px;">
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;"><span class="word-label">{{$t('moneyTicket')}}</span></i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="blue-label" v-if="index === 0" @click="addTicket">{{$t('add')}}</span>
                        <span class="red-label" v-else @click="delTicket(index)">{{$t('delete')}}</span>
                    </i-col>
                </i-row>
            </template>
            <!--优惠通知-->
            <template v-for="(item,index) in rightInfo.desc">
                <i-row :key="'desc' + index">
                    <i-col style="display: inline-block;width : auto;">
                        <i-switch v-model="item.isEnable" @on-change="changeValidateStatus(index,'desc')"></i-switch>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem :prop="'descContent' + index"
                                  :rules="{ required : true, validator : validateContent,trigger : 'blur',data : item.content,isEnable : item.isEnable}">
                            <i-input type="textarea"
                                     v-model="item.content"
                                     style="width: 342px;">
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="blue-label" v-if="index === 0" @click="addDesc">{{$t('add')}}</span>
                        <span class="red-label" v-else @click="delDesc(index)">{{$t('delete')}}</span>
                    </i-col>
                </i-row>
            </template>
        </Form>
        <div slot="footer">
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
            <Button type="primary"
                    :loading="saveIng"
                    class="ivu-btn-90px"
                    @click="save">{{$t('save')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import common from '@/assets/js/common';
    import ajax from '@/api/index.js';

    export default {
        props : {
            value : {
                type : Boolean,
                default : false
            },
            //会员权益详情
            'detail-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                //默认权益信息
                rightDefaultInfo : [
                    //生日打折门票
                    {
                        type : 'birthday',
                        rule : {
                            num : '',
                            discount : '',
                            price : '',
                            scenicId : ''
                        },
                        isEnable : false,
                        content : ''
                    },
                    //每月优惠门票
                    {
                        type : 'ticket',
                        rule : {
                            num : '',
                            discount : '',
                            price : '',
                            scenicId : '',
                            scenicName : ''
                        },
                        isEnable : false,
                        content : ''
                    },
                    //通知信息
                    {
                        type : 'desc',
                        rule : {
                            num : '',
                            discount : '',
                            price : '',
                            scenicId : ''
                        },
                        isEnable : false,
                        content : ''
                    }
                ],
                //权益信息
                rightInfo : {
                    birthday : [],
                    ticket : [],
                    desc : []
                },
                //是否在保存中
                saveIng : false,
                //景区列表
                scenicList : []
            };
        },
        methods : {
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前模态框状态
             */
            visibleChange (type) {
                this.rightInfo = {
                    birthday : [],
                    ticket : [],
                    desc : []
                };
                if (type === true) {
                    let rightInfoLocale = [];
                    if (this.detailInfo && this.detailInfo.rights) {
                        rightInfoLocale = JSON.parse(this.detailInfo.rights);
                    } else {
                        rightInfoLocale = JSON.parse(JSON.stringify(this.rightDefaultInfo));
                    }
                    for (let i = 0,j = rightInfoLocale.length; i < j; i++ ) {
                        if (rightInfoLocale[i]['type'] === 'birthday') {
                            this.rightInfo.birthday.push(rightInfoLocale[i]);
                        } else if (rightInfoLocale[i]['type'] === 'ticket') {
                            this.rightInfo.ticket.push(rightInfoLocale[i]);
                        } else if (rightInfoLocale[i]['type'] === 'desc') {
                            this.rightInfo.desc.push(rightInfoLocale[i]);
                        }
                    }
                }
            },
            /**
             * 取消操作，隐藏模态框
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 保存结果
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.saveRightInfo();
                    }
                });
            },
            /**
             * 新增优惠通知
             */
            addDesc () {
                this.rightInfo.desc.push( {
                    type : 'desc',
                    rule : {
                        num : '',
                        discount : '',
                        price : '',
                        scenicId : ''
                    },
                    isEnable : false,
                    content : ''
                });
            },
            /**
             * 校验优惠通知信息
             * @param{Object} rule 校验规则
             * @param{String} value 输入的值
             * @param{Function} callback 回调函数
             */
            validateContent (rule,value,callback) {
                if (rule.isEnable) {
                    if (rule.data) {
                        if (rule.data.length > 300) {
                            callback(this.$t('errorMaxLength',{ field : '',length : 300 }));
                        } else {
                            callback();
                        }
                    } else {
                        callback(this.$t('inputField', { field : '' }));
                    }
                } else {
                    callback();
                }
            },
            /**
             * 删除优惠通知信息
             * @param{Number} index
             */
            delDesc (index) {
                this.rightInfo.desc.splice(index,1);
            },
            /**
             * 校验是否为整数
             * @param{Object} rule 校验规则
             * @param{String} value 输入的值
             * @param{Function} callback 回调函数
             */
            validateNum (rule,value,callback) {
                if (rule.isEnable) {
                    if (common.isNotEmpty(rule.data)) {
                        common.validateInteger(rule.data).then(() => {
                            callback();
                        }).catch(err => {
                            if (err === 'errorMaxLength') {
                                callback(this.$t(err,{ field : '',length : 10 }));
                            } else {
                                callback(this.$t(err,{ field : '' }));
                            }
                        });
                    } else {
                        callback(this.$t('inputField', { field : '' }));
                    }
                } else {
                    callback();
                }
            },
            /**
             * 校验是否为小数
             * @param{Object} rule 校验规则
             * @param{String} value 输入的值
             * @param{Function} callback 回调函数
             */
            validateDecimail (rule,value,callback) {
                if (rule.isEnable) {
                    if (common.isNotEmpty(rule.data)) {
                        common.validateMoney(rule.data,0,2).then(() => {
                            if ( rule.data > 10) {
                                callback(this.$t('errorGreaterThan',{ small : '',big : '10' }));
                            } else {
                                callback();
                            }
                        }).catch(err => {
                            if (err === 'errorMaxLength') {
                                callback(this.$t('errorMaxLength',{ field : '',length : 10 }));
                            } else {
                                callback(this.$t(err,{ field : '' }));
                            }
                        });
                    } else {
                        callback(this.$t('inputField', { field : '' }));
                    }
                } else {
                    callback();
                }
            },
            /**
             * 校验是否选择了景区
             * @param{Object} rule 校验规则
             * @param{String} value 输入的值
             * @param{Function} callback 回调函数
             */
            validateScenic (rule,value,callback) {
                let scenicId = this.rightInfo.ticket[rule.index]['rule']['scenicId'];
                if (rule.isEnable) {
                    if (scenicId) {
                        let tickets = this.rightInfo.ticket;
                        for (let i = 0,j = tickets.length; i < j; i++) {
                            if (i !== rule.index) {
                                if (scenicId === tickets[i]['rule']['scenicId']) {
                                    callback('sceneHasSelectedTip');
                                } else {
                                    callback();
                                }
                            }
                        }
                        callback();
                    } else {
                        callback(this.$t('inputField', { field : this.$t('scenic') }));
                    }
                } else {
                    callback();
                }
            },
            /**
             * 校验是否为金钱
             * @param{Object} rule 校验规则
             * @param{String} value 输入的值
             * @param{Function} callback 回调函数
             */
            validateMoney (rule,value,callback) {
                if (rule.isEnable) {
                    common.validateMoney(rule.data,0,10).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t('errorMaxLength',{ field : '',length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : '' }));
                        }
                    });
                } else {
                    callback();
                }
            },
            /**
             * 保存会员权益信息
             */
            saveRightInfo () {
                let rights = this.getRights();
                ajax.post('updateMemberLevel',{
                    id : this.detailInfo.id,
                    rights : rights
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('save') } ));
                        this.cancel();
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('save') }));
                    }
                });
            },
            /**
             * 获取会员权益信息
             */
            getRights () {
                let result = [];
                for (let item in this.rightInfo) {
                    result = [].concat(result,this.rightInfo[item]);
                }
                return JSON.stringify(result);
            },
            /**
             * 新增每月特价门票
             */
            addTicket () {
                this.rightInfo.ticket.push( {
                    type : 'ticket',
                    rule : {
                        num : '',
                        discount : '',
                        price : '',
                        scenicId : '',
                        scenicName : ''
                    },
                    isEnable : false,
                    content : ''
                });
            },
            /**
             * 删除每月特价门票
             * @param{Number} index
             */
            delTicket (index) {
                this.rightInfo.ticket.splice(index,1);
            },
            /**
             *
             */
            getTicketList () {
                ajax.post('getTicketList').then(res => {
                    if (res.success) {
                        this.scenicList = res.data ? res.data : [];
                    } else {
                        this.scenicList = [];
                    }
                });
            },
            /**
             * 改变开启关闭状态重新校验输入信息
             * @param{Number} index 当前序列
             * @param{String} label 当前校验的权益类型
             */
            changeValidateStatus (index,label) {
                this.$nextTick(() => {
                    if (label === 'birthday') {
                        this.$refs.formValidate.validateField('birthdayNum' + index);
                        this.$refs.formValidate.validateField('birthdayDiscount' + index);
                    } else if (label === 'ticket') {
                        this.$refs.formValidate.validateField('ticketNum' + index);
                        this.$refs.formValidate.validateField('ticketScenicId' + index);
                        this.$refs.formValidate.validateField('ticketDiscount' + index);
                    } else if (label === 'desc') {
                        this.$refs.formValidate.validateField('descContent' + index);
                    }
                });
            },
            /**
             * 选择园区下拉框值变化时
             */
            selectChange (val,item) {
                item.rule.scenicName = val.label;
            }
        },
        computed : {
        },
        created () {
            this.getTicketList();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-rights-modal{

        /deep/ .ivu-modal-body{
            padding: 16px 40px;
            max-height: 300px;
            min-height : 202px;
            overflow: auto;
        }

        .word-label{
            font-size: $font_size_14px;
            color: $color_666;
        }

        .blue-label{
            font-size: $font_size_14px;
            cursor: pointer;
            color: $color_blue;
            padding-left: 10px;
        }

        .red-label{
            font-size: $font_size_14px;
            cursor: pointer;
            color: $color_red;
            padding-left: 10px;
        }

        .title{
            margin-bottom: 10px;
            color: $color_333;
        }

        /deep/ .ivu-form-item-error-tip{
            white-space: nowrap;
        }
    }
</style>
