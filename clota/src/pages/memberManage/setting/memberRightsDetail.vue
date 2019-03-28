<!--会员权益详情-->

<template>
    <div class="member-right-detail">
        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="localRoute">
        </bread-crumb-head>
        <Form ref="formValidate">
            <template v-for="(item,index) in rightInfo.birthday" v-if="detailInfo.cardTypeId !== '3'">
                <!--生日购票优惠-->
                <i-row :key="'birthday' + index" class="birthday-row" :class="{ 'border-deal' : index === rightInfo.birthday.length - 1}">
                    <i-col style="display: inline-block;width : auto;">
                        <i-switch v-model="item.isEnable"
                                  @on-change="changeValidateStatus(index,'birthday')">
                        </i-switch>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="word-label">{{$t('limitedInbirthDay')}}</span>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem :prop="'birthdayNum' + index"
                                  :rules="{ required : true,validator : validateNum,trigger : 'blur',data : item.rule.num,isEnable : item.isEnable }">
                            <i-input type="text"
                                     :placeholder="$t('inputPlaceholder')"
                                     v-model.trim="item.rule.num"
                                     style="width: 80px;">
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
                                     :placeholder="$t('inputPlaceholder')"
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
                <i-row :key="'ticket' + index" v-if="item.type === 'ticket'" :class="{ 'border-deal' : index === rightInfo.ticket.length - 1}">
                    <i-col style="display: inline-block;width : auto;">
                        <i-switch v-model="item.isEnable"
                                  @on-change="changeValidateStatus(index,'ticket')">
                        </i-switch>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="word-label">{{$t('everyMonth')}}</span>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem :prop="'ticketNum' + index"
                                  :rules="{ required : true,validator : validateNum,trigger : 'blur',data : item.rule.num,isEnable : item.isEnable  }">
                            <i-input type="text"
                                     :placeholder="$t('inputPlaceholder')"
                                     v-model.trim="item.rule.num"
                                     style="width: 80px;">
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
                                    :placeholder="$t('selectField',{ msg : '' })"
                                    :label-in-value="true"
                                    @on-change="selectChange($event, item)"
                                    :style="{ width : '180px' }">
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
                                     :placeholder="$t('inputPlaceholder')"
                                     v-model.trim="item.rule.discount"
                                     style="width: 80px;">
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
            <!--每月优惠卡券-->
            <template v-for="(item,index) in rightInfo.coupon">
                <i-row :key="'coupon' + index"
                       v-if="item.type === 'coupon'"
                       :class="{ 'border-deal' : index === rightInfo.coupon.length - 1}">
                    <i-col style="display: inline-block;width : auto;">
                        <i-switch v-model="item.isEnable"
                                  @on-change="changeValidateStatus(index,'ticket')">
                        </i-switch>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="word-label">{{$t('everyMonth')}}</span>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem :prop="'ticketNum' + index"
                                  :rules="{ required : true,validator : validateNum,trigger : 'blur',data : item.rule.num,isEnable : item.isEnable  }">
                            <i-input type="text"
                                     :placeholder="$t('inputPlaceholder')"
                                     v-model.trim="item.rule.num"
                                     style="width: 80px;">
                            </i-input>
                        </FormItem>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="word-label">{{$t('paper')}}</span>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <FormItem
                            :prop="'coupon' + index"
                            :rules="{ validator : validateCoupon,trigger : 'change',index : index,isEnable : item.isEnable }">
                            <div class="ivu-select ivu-select-single" style="width: 265px;" @click="modifyCoupon(item,index)">
                                <div tabindex="0" class="ivu-select-selection">
                                    <input type="hidden" value="">
                                    <div>
                                        <span class="ivu-select-placeholder">{{$t('selectField',{ msg : '' })}}</span>
                                        <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
                                    </div>
                                </div>
                            </div>
                        </FormItem>
                    </i-col>
                    <i-col style="display: inline-block;width : auto;"><span class="word-label">{{$t('coupon')}}</span></i-col>
                    <i-col style="display: inline-block;width : auto;">
                        <span class="blue-label" v-if="index === 0" @click="addCoupon">{{$t('add')}}</span>
                        <span class="red-label" v-else @click="delCoupon(index)">{{$t('delete')}}</span>
                        <span class="blue-label" @click="watchDetail(index)">{{$t('check')}}</span>
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
                                     :placeholder="$t('inputPlaceholder')"
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
        <div class="footer-wrap">
            <Button type="primary"
                    :loading="saveIng"
                    class="ivu-btn-90px"
                    @click="save">{{$t('save')}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
        <!--新增优惠券弹框-->
        <add-coupon ref="addCoupon"
                    @set-coupon="setCoupon">
        </add-coupon>
        <!--优惠券详情-->
        <coupon-detail-modal ref="couponDetail">
        </coupon-detail-modal>
        <!--删除优惠券模态框-->
        <del-coupon-modal ref="delCouponModal">
        </del-coupon-modal>
    </div>
</template>

<script>
    import common from '@/assets/js/common';
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import addCoupon from './components/addCoupon';
    import couponDetailModal from './components/couponDetailModal';
    import delCouponModal from './components/delCouponModal';

    export default {
        components : {
            breadCrumbHead,
            addCoupon,
            couponDetailModal,
            delCouponModal
        },
        mixins : [ lifeCycleMixins ],
        props : {
            value : {
                type : Boolean,
                default : false
            },
        },
        data () {
            return {
                //默认权益信息
                rightDefaultInfo : {
                    //生日打折门票
                    birthday : {
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
                    ticket : {
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
                    //每月优惠券
                    coupon : {
                        type : 'coupon',
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
                    desc : {
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
                },
                //权益信息
                rightInfo : {
                    birthday : [],
                    ticket : [],
                    desc : [],
                    coupon : []
                },
                //是否在保存中
                saveIng : false,
                //景区列表
                scenicList : [],
                //会员权益详情
                detailInfo : {},
                //当前路由信息
                localRoute : ''
            };
        },
        methods : {
            /**
             * 处理会员权益信息
             */
            dealMemberRights () {
                this.rightInfo = {
                    birthday : [],
                    ticket : [],
                    desc : [],
                    coupon : [],
                };
                let rightInfoLocale = [];
                if (this.detailInfo && this.detailInfo.rights) {
                    rightInfoLocale = JSON.parse(this.detailInfo.rights);
                }
                for (let i = 0,j = rightInfoLocale.length; i < j; i++ ) {
                    if (rightInfoLocale[i]['type'] === 'birthday') {//生日优惠
                        this.rightInfo.birthday.push(rightInfoLocale[i]);
                    } else if (rightInfoLocale[i]['type'] === 'ticket') {//门票优惠
                        this.rightInfo.ticket.push(rightInfoLocale[i]);
                    } else if (rightInfoLocale[i]['type'] === 'desc') {//仅文本权益介绍
                        this.rightInfo.desc.push(rightInfoLocale[i]);
                    } else if (rightInfoLocale[i]['type'] === 'coupon') {//优惠券
                        this.rightInfo.coupon.push(rightInfoLocale[i]);
                    }
                }
                if (this.rightInfo.birthday.length < 1) {
                    this.rightInfo.birthday = [this.rightDefaultInfo.birthday];
                }
                if (this.rightInfo.ticket.length < 1) {
                    this.rightInfo.ticket = [this.rightDefaultInfo.ticket];
                }
                if (this.rightInfo.desc.length < 1) {
                    this.rightInfo.desc = [this.rightDefaultInfo.desc];
                }
                if (this.rightInfo.coupon.length < 1) {
                    this.rightInfo.coupon = [this.rightDefaultInfo.coupon];
                }
            },
            /**
             * 取消操作，隐藏模态框
             */
            cancel () {
                this.$router.push({
                    name : 'memberRights'
                });
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
                                    callback(new Error('sceneHasSelectedTip'));
                                } else {
                                    callback();
                                }
                            }
                        }
                        callback();
                    } else {
                        callback(this.$t('selectField', { msg : this.$t('scenic') }));
                    }
                } else {
                    callback();
                }
            },
            /**
             * 校验是否选择了优惠券
             * @param{Object} rule 校验规则
             * @param{String} value 输入的值
             * @param{Function} callback 回调函数
             */
            validateCoupon (rule,value,callback) {
                let scenicId = this.rightInfo.ticket[rule.index]['rule']['scenicId'];
                if (rule.isEnable) {
                    if (scenicId) {
                        let tickets = this.rightInfo.ticket;
                        for (let i = 0,j = tickets.length; i < j; i++) {
                            if (i !== rule.index) {
                                if (scenicId === tickets[i]['rule']['scenicId']) {
                                    callback(new Error('sceneHasSelectedTip'));
                                } else {
                                    callback();
                                }
                            }
                        }
                        callback();
                    } else {
                        callback(this.$t('selectField', { msg : this.$t('scenic') }));
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
                ajax.post('updateMemberLevelRights',{
                    id : this.detailInfo.id,
                    rights : rights
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('save') } ));
                        this.cancel();
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
             * 获取产品列表
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
             * @param{String} val 选择的园区信息
             * @param{Object} item 园区信息
             */
            selectChange (val,item) {
                item.rule.scenicName = val.label;
            },
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && params.detailInfo) {
                    this.detailInfo = params.detailInfo;
                    this.localRoute = params.detailInfo.typeName + '-' + params.detailInfo.levelDesc;
                    this.dealMemberRights();
                } else {
                    this.$router.back();
                }
            },
            /**
             * 查看优惠券的详情
             * @param{Number} index 优惠券序号
             */
            watchDetail (index) {
                this.$refs.couponDetail.show();
            },
            /**
             * 新增优惠券
             */
            addCoupon () {
                this.$refs.addCoupon.show({
                    type : 'add',
                    name : '',
                    invalidateDate : '',
                    index : null
                });
            },
            /**
             * 删除优惠券
             * @param{Number} index 优惠券序号
             */
            delCoupon (index) {
                this.$refs.delCouponModal.show();
                // this.rightInfo.coupon.splice(index,1);
            },
            /**
             * 新增或编辑权益信息
             * @param{Object} couponData 权益信息
             */
            setCoupon (couponData) {
                if (couponData.type === 'add') {
                    this.rightInfo.coupon.push( {
                        type : 'coupon',
                        rule : {
                            num : '',
                            discount : '',
                            price : '',
                            scenicId : couponData.name
                        },
                        isEnable : false,
                        content : ''
                    });
                }
            },
            /**
             * 修改卡券信息
             * @param{Object} couponData 卡券信息
             * @param{index} index 卡券序列号
             */
            modifyCoupon (couponData,index) {
                this.$refs.addCoupon.show({
                    type : 'modify',
                    name : '',
                    invalidateDate : '',
                    index : index
                });
            }
        },
        computed : {
            ...mapGetters([
                'lang'
            ]),
            //面包屑信息
            beforeRouterList () {
                return [
                    {
                        name : 'memberRights', // 会员权益
                        router : {
                            name : 'memberRights'
                        },
                    }
                ];
            }
        },
        created () {
            this.getTicketList();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-right-detail{
        overflow: auto;

        .footer-wrap{
            margin-top: 30px;
            text-align: center;

            .ivu-btn-90px{
                margin: 0 5px;
            }
        }

        .border-deal {
            border-bottom: 1px dashed #E1E1E1;
            margin-bottom: 20px;
        }

        .ivu-form{
            padding: 20px 40px;
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
