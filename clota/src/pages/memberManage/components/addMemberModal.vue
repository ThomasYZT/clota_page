<template>
    <div>
        <!--会员级别设置-->
        <Modal
            v-model="visible"
            :title="$t('memberLevelSetting')"
            class-name="add-member-modal vertical-center-modal"
            width="560"
            :mask-closable="false"
            @on-visible-change="visibleChange"
            @on-cancel="hide"><!--会员级别设置-->

            <div class="modal-body">

                <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="145">
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('memberCardName') + '：'" prop="levelDesc"><!--等级名称-->
                            <Input v-model.trim="formData.levelDesc"
                                   type="text"
                                   :placeholder="$t('inputField', {field: $t('memberLevelName')})"/><!--请输入会员级别名称，例：黄金会员-->
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('memberGrade') + '：'" prop="levelNum" v-if="cardAttribute === 'growth'"><!--会员等级-->
                            <Select v-model="formData.levelNum"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    style="width: 280px;"><!--请选择会员等级-->
                                <Option v-for="item in 12" :key="item"
                                        :disabled="usedLevels.includes(item)"
                                        :value="item">{{item}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap" v-if="cardAttribute === 'growth'">
                        <Form-item :label="$t('memberGrowthRange') + '：'" prop="highestGrowthValue"><!--会员成长值范围-->
                            <Input v-model.trim="formData.lowerGrowthValue"
                                :placeholder="$t('inputField', {field: ''})"
                                class="single-input"/>
                            <span class="split-line">–</span>
                            <Input v-model.trim="formData.highestGrowthValue"
                                :placeholder="$t('inputField', {field: ''})"
                                class="single-input"/>
                        </Form-item>
                    </div>
                    <!--会员4期暂时去掉-->
                    <!--<div class="ivsu-form-item-wrap">-->
                        <!--<Form-item :label="$t('会员卡功能') + '：'" prop="function">&lt;!&ndash;会员卡功能&ndash;&gt;-->
                            <!--<CheckboxGroup v-model="formData.function">-->
                                <!--<Checkbox v-for="item in rightList"-->
                                          <!--:key="item.value"-->
                                          <!--:label="item.value">-->
                                    <!--{{item.label}}-->
                                <!--</Checkbox>-->
                            <!--</CheckboxGroup>-->
                        <!--</Form-item>-->
                    <!--</div>-->
                    <div class="ivu-form-item-wrap" v-if="cardAttribute === 'sale'">
                        <Form-item :label="$t('cardSaleMoney') + '：'" prop="salePrice"><!--售卡金额-->
                            <Input v-model.trim="formData.salePrice"
                                   type="text"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap" v-if="cardAttribute === 'sale'">
                        <Form-item :label="$t('moneyInCard') + '：'" prop="amountInCard"><!--卡内金额-->
                            <Input v-model.trim="formData.amountInCard"
                                   type="text"/>
                        </Form-item>
                    </div>
                    <!--有效期设置-->
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('validityPeriod') + '：'" prop="effTime">
                            <Select v-model="formData.effTime" style="width:280px">
                                <Option v-for="(item,index) in effTimeListDetail"
                                        :value="item.value"
                                        :label="item.value !== 'forEver' ? (item.label + $t('time.' + formData.effUnit)) : $t(item.label)"
                                        :key="item.value">
                                    <div class="time-list-item">
                                        <span class="time-label" v-if="item.value !== 'add'">
                                            {{ $t(item.label) }}
                                            <template v-if="item.value !== 'forEver'">
                                                {{$t('time.' + formData.effUnit)}}
                                            </template>
                                        </span>
                                        <span class="time-label blue-label add-label"
                                              v-else
                                              @click.stop="addEffectTime">
                                            {{ $t(item.label) }}
                                        </span>
                                        <span v-if="item.value !== 'add' && item.value !== 'forEver' && item.value !== formData.effTime"
                                              class="operate-label"
                                              @click.stop="delTimeItem(index)">{{$t('delete')}}</span>
                                    </div>
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('remark') + '：'" prop="remark">
                            <Input v-model.trim="formData.remark"
                                   type="textarea"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <!--<div class="ivu-form-item-wrap">-->
                    <!--<i-row>-->
                    <!--<i-col span="6">-->
                    <!--<Form-item :label="$t('remark') + '：'" prop="remark">-->
                    <!--<Input v-model.trim="formData.effTime"-->
                    <!--type="textarea"-->
                    <!--:placeholder="$t('inputField', {field: ''})"/>-->
                    <!--</Form-item>-->
                    <!--</i-col>-->
                    <!--<i-col span="3">-->
                    <!--<Form-item :label="$t('remark') + '：'" prop="remark">-->
                    <!--<Input v-model.trim="formData.effUnit"-->
                    <!--type="textarea"-->
                    <!--:placeholder="$t('inputField', {field: ''})"/>-->
                    <!--</Form-item>-->
                    <!--</i-col>-->
                    <!--</i-row>-->
                    <!--</div>-->
                </Form>
            </div>

            <div slot="footer" class="modal-footer">
                <Button type="primary" @click="formValidateFunc">{{$t("save")}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </div>

        </Modal>
        <!--删除有效期确认框-->
        <del-modal ref="delModal">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>
                {{$t('isDoing')}}{{$t('delete')}}{{$t('validityPeriod')}}：
                <span class="yellow-label" v-w-title="currentData ? currentData.effValue : ''">
                    {{currentData ? currentData.effValue : ''}}{{$t('time.year')}}
                </span>
            </span>
            <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>，{{$t('sureToDel')}}</span>
        </del-modal>
        <!--新增有效期-->
        <edit-modal ref="editModal">
            <Form ref="effTimeForm"
                  :model="effectFormData"
                  label-position="right"
                  :label-width="80">
                <!--新增有效期-->
                <FormItem prop="addEffectTimeValue"
                          :label="$t('validityPeriod')"
                          :rules="[{ required : true, validator : validateEffectTime,trigger : 'blur' }]">
                    <Input v-model.trim="effectFormData.addEffectTimeValue" style="width: 280px"/>
                    {{$t('time.year')}}
                </FormItem>
            </Form>
        </edit-modal>
    </div>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import delModal from '@/components/delModal/index.vue';
    import editModal from '@/components/editModal/index.vue';
    import { mapGetters } from 'vuex';

    export default {
        props : {
            //会员卡类别id
            'card-type-id' : {
              type : String,
              default : ''
            },
            //会员卡属性
            cardAttribute : {
                type : String,
                default : ''
            }
        },
        components : {
            delModal,
            editModal
        },
        data () {

            const validateMethod = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };

            //校验正整数
            const validateNumber = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    let field = '';
                    switch (rule.field) {
                        case 'levelNum' :
                            field = 'memberGrade';
                            break;
                        case 'lowerGrowthValue' :
                        case 'highestGrowthValue' :
                            field = 'memberGrowthValue';
                            break;
                        default :
                            field = '';
                            break;
                    }
                    callback(this.$t(err, { field : this.$t(field) }));
                });
            };

            //校验最高值范围
            const validateHigh = (rule,value,callback) => {
                common.validateInteger( this.formData.lowerGrowthValue).then(() => {
                    if (Number(this.formData.lowerGrowthValue) > Number(value)) {
                        callback(new Error( this.$t('errorGreaterThan', {
                                small : this.$t('startingValue'),
                                big : this.$t('maximumValue') }
                            ) )); // 起始值不能大于最高值
                    } else {
                        callback();
                    }
                }).catch(err => {
                    callback(this.$t(err, { field : this.$t('memberGrowthRange') }));
                });
            };

            //校验输入的是否是金额，且符合金额的格式
            const validateMoney = (rule,value,callback) => {
                common.validateMoney(value,0,10).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t('errorMaxLength',{ field : this.$t(rule._field),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t(rule._field) }));
                    }
                });
            };

            return {
                visible : false,
                //表单数据
                formData : {
                    id : '',
                    levelNum : '',
                    levelDesc : '',
                    lowerGrowthValue : '',
                    highestGrowthValue : '',
                    remark : '',
                    //功能
                    function : [],
                    //售卡金额
                    salePrice : '',
                    //卡内金额
                    amountInCard : '',
                    //有效期
                    effTime : 1,
                    //有效期单位
                    effUnit : 'year'
                },
                //有效期列表
                effTimeList : [],
                //功能列表
                rightList : [
                    {
                        label : 'recharge',
                        value : 'isRecharge'
                    },
                    {
                        label : 'allowance',
                        value : 'isDiscount'
                    },
                    {
                        label : 'integral',
                        value : 'isScore'
                    }
                ],
                effectFormData : {
                    //新增有效期的值
                    addEffectTimeValue : '',
                },
                // 已被创建的会员级别
                usedLevels : [],
                //当前操作的有效期数据
                currentData : {},
                ruleValidate : {
                    levelNum : [
                        {
                            required : true,
                            message : this.$t('errorEmpty', { msg : this.$t('memberGrade') }),
                            type : "number",
                            trigger : 'change'
                        },
                        { validator : validateNumber, trigger : 'change' },
                    ],
                    levelDesc : [
                        {
                            required : true,
                            message : this.$t('errorEmpty', { msg : this.$t('levelSetting') }),
                            trigger : 'blur'
                        }, // 会员级别名称不能为空
                        {
                            max : 4,
                            message : this.$t('errorMaxLength', { field : this.$t('levelSetting'), length : 4 }),
                            trigger : 'blur'
                        }, // 会员级别不能超过10字符
                        { validator : validateMethod.emoji, trigger : 'blur' },
                    ],
                    lowerGrowthValue : [
                        {
                            required : true,
                            message : this.$t('errorEmpty', { msg : this.$t('memberGrowthValue') }),
                            trigger : 'blur'
                        }, // 会员成长值不能为空
                        {
                            max : 10,
                            message : this.$t('errorMaxLength', { field : this.$t('memberGrowthValue'), length : 10 }),
                            trigger : 'blur'
                        }, // 会员成长值不能超过10字符
                        { validator : validateNumber, trigger : 'blur' },
                    ],
                    highestGrowthValue : [
                        {
                            required : true,
                            message : this.$t('errorEmpty', { msg : this.$t('memberGrowthValue') }),
                            trigger : 'blur'
                        }, // 会员成长值不能为空
                        {
                            max : 10,
                            message : this.$t('errorMaxLength', { field : this.$t('memberGrowthValue'), length : 10 }),
                            trigger : 'blur'
                        }, // 会员成长值不能超过10字符
                        { validator : validateNumber, trigger : 'blur' },
                        { validator : validateHigh, trigger : 'blur' },
                    ],
                    remark : [
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        // 备注不能超过20字符
                        {
                            max : 20,
                            message : this.$t('errorMaxLength', { field : this.$t('remark'), length : 20 }),
                            trigger : 'blur'
                        },
                    ],
                    salePrice : [
                        {
                            required : true,
                            validator : validateMoney ,
                            trigger : 'blur',
                            _field : 'cardSaleMoney'
                        }
                    ],
                    amountInCard : [
                        {
                            required : true,
                            validator : validateMoney ,
                            trigger : 'blur',
                            _field : 'moneyInCard'
                        }
                    ],
                    function : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('memberCardFunction') }),
                            trigger : 'change',
                            type : 'array'
                        }
                    ],
                    effTime : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('validityPeriod') }),
                            trigger : 'change',
                        }
                    ]
                },
            };
        },
        methods : {

            show ( data, usedLevels ) {
                if (data && data.id) {
                    for (let item in data) {
                        //获取选择的功能
                        if (item === 'isRecharge' && data['isRecharge'] === 'true') {
                            this.formData.function.push('isRecharge');
                        } else if (item === 'isScore' && data['isScore'] === 'true') {
                            this.formData.function.push('isScore');
                        } else if (item === 'isDiscount' && data['isDiscount'] === 'true') {
                            this.formData.function.push('isDiscount');
                        }
                        if (item in this.formData) {
                            if (item === 'effTime') {
                                this.formData['effTime'] = data['effTime'] ? String(data['effTime']) : 'forEver';
                            } else {
                                this.formData[item] = data[item];
                            }
                        }
                    }
                    this.formData.levelNum = this.formData.levelNum > -1 ? this.formData.levelNum : '';
                    this.formData.lowerGrowthValue = this.formData.lowerGrowthValue > -1
                        ? this.formData.lowerGrowthValue + '' : '';
                    this.formData.highestGrowthValue = this.formData.highestGrowthValue > -1
                        ? this.formData.highestGrowthValue + '' : '';

                    // 会员3期暂时去掉
                    // setTimeout( () => {
                    //     this.$refs.formValidate.validateField('highestGrowthValue');
                    // }, 300);
                }

                this.usedLevels = usedLevels;
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.updateMemberLevel(this.formData);
                    }
                });
            },

            //新增/修改数据
            updateMemberLevel ( data ) {
                let levelEffSetId = this.effTimeListDetail.filter(item => item.value === data.effTime);
                ajax.post('updateMemberLevel', {
                    cardTypeId : this.cardTypeId,
                    id : data.id,
                    levelNum : data.levelNum,
                    levelDesc : data.levelDesc,
                    lowerGrowthValue : data.lowerGrowthValue,
                    highestGrowthValue : data.highestGrowthValue,
                    remark : data.remark,
                    salePrice : data.salePrice,
                    amountInCard : data.amountInCard,
                    isRecharge : data.function.includes('isRecharge'),
                    isScore : data.function.includes('isScore'),
                    isDiscount : data.function.includes('isDiscount'),
                    effTime : data.effTime === 'forEver' ? null : data.effTime,
                    effTimeUnit : data.effTime === 'forEver' ? null : data.effUnit,
                    levelEffSetId : levelEffSetId.length > 0 ? levelEffSetId[0]['id'] : '',
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('save') })); // 操作成功
                        this.$emit('modify-success');
                        this.hide();
                    } else if (res.code === 'M003') {
                        this.$Message.error(this.$t('changeMemLevelPlease')); // 会员级别已存在，请重新选择会员级别
                    } else if (res.message === 'M001') {
                        this.$Message.error(this.$t('M001'));
                    } else {
                        this.$Message.warning(('updateMemberLevel ' + this.$t('failureTip', { tip : this.$t('save') }))); // 操作失败
                    }
                });
            },

            //关闭模态框
            hide () {
                //重置数据
                this.visible = false;

            },
            /**
             * 模态框状态改变
             * @param type
             */
            visibleChange (type) {
                if (type === false) {
                    this.formData.lowerGrowthValue = '';
                    this.formData.function = [];
                    this.formData.id = '';
                    this.$refs.formValidate.resetFields();
                } else {
                    this.getEffTimeList();
                }
            },
            /**
             * 删除有效期
             * @param{Number} index 会员级别有效期删除
             */
            delTimeItem (index) {
                document.body.click();
                this.currentData = this.effTimeList[index];
                this.$refs.delModal.show({
                    title : this.$t('deletePermanentValidity'),
                    confirmCallback : () => {
                        this.deleteEffectTime(this.currentData.id);
                    }
                });
            },
            /**
             * 获取会员卡有效期信息
             */
            getEffTimeList () {
                ajax.post('queryLevelEffSets').then(res => {
                    if (res.success) {
                        this.effTimeList = res.data ? res.data : [];
                    } else {
                        this.effTimeList = [];
                    }
                });
            },
            /**
             * 新增有效期
             */
            addEffectTime () {
                document.body.click();
                this.$refs.editModal.show({
                    title : this.$t('addPermanentValidity'),
                    confirmCallback : () => {
                        this.confirmAddEffectTime();
                    },
                    cancelCallback : () => {
                        this.$nextTick(() => {
                            this.$refs.effTimeForm.resetFields();
                        });
                    }
                });
            },
            /**
             * 校验成长值有效期值
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validateEffectTime (rule,value,callback) {
                if (value) {
                    common.validateInteger( value ).then(() => {
                        if (value > 0 && value < 99) {
                            callback();
                        } else {
                            callback(this.$t('inputField', { field : this.$t('valueRangeInfo', { val1 : '0', val2 : '99' }) }));
                        }
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t(err,{ field : this.$t('permanentValidityValue'),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t('permanentValidityValue') }));
                        }
                    });
                } else {
                    callback(this.$t('inputField',{ field : this.$t('permanentValidityValue') }));
                }
            },
            /**
             * 确认新增有效期
             */
            confirmAddEffectTime () {
                this.$refs.effTimeForm.validate(valid => {
                    if (valid) {
                        this.saveEffectTime();
                    }
                });
            },
            /**
             * 保存有效期信息
             */
            saveEffectTime () {
                ajax.post('saveLevelEffSet',{
                    effValue : this.effectFormData.addEffectTimeValue,
                    effUnit : this.formData.effUnit
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('add') }));
                        this.$refs.editModal.hide();
                        this.getEffTimeList();
                        this.effectFormData.addEffectTimeValue = '';
                    } else if (res.code === 'M046') {
                        this.$Message.error('permanentValidityExist');
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('add') }));
                    }
                });
            },
            /**
             * 删除有效期
             * @param{String} id 有效期id
             */
            deleteEffectTime (id) {
                ajax.post('deleteLevelEffSet',{
                    id : id
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('delete') }));
                        this.$refs.delModal.cancel();
                        this.getEffTimeList();
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('delete') }));
                    }
                });
            }

        },
        computed : {
            //会员卡有效期设置
            effTimeListDetail () {
                return [].concat(this.effTimeList.sort((a,b) => a.effValue - b.effValue).map(item => {
                    return {
                        label : item.effValue,
                        value : String(item.effValue),
                        ...item
                    };
                }),[
                    {
                        label : 'permanentValidity',
                        value : 'forEver'
                    },
                    {
                        label : 'addPermanentValidityWithoutUnit',
                        value : 'add'
                    },
                ]);
            },
            ...mapGetters({
                memberConfigInfo : 'memberConfigInfo',
            }),
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是成长型型会员卡
            cardIsGrowth () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'growth' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-member-modal{

        .time-list-item{
            @include block_outline($height : 20px);
            display: flex;

            .time-label{
                flex: 1;

                &.blue-label{
                    color: $color_blue;
                }

                &.add-label{
                    @include absolute_pos(absolute,0,0,0,0);
                    height: 34px;
                    padding: 7px 16px;
                }
            }

            .operate-label{
                color: $color_err;
                font-size: $font_size_14px;
            }

        }

        .modal-body{
            padding: 15px 30px 0;

            /deep/ .ivu-input-wrapper{
                width: 280px;

                &.single-input{
                    width: 120px !important;
                }
            }

            .split-line{
                margin: 0 12px;
                color: $color_585858;
            }

            /deep/ .ivu-select-item-disabled {
                color: #bbbec4;
                &:hover {
                    color: #bbbec4 !important;
                }
            }

        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
    .content-text {
        width: 210px;
        position: relative;

        .delete-icon {
            position: absolute;
            left: -27px;
            margin-right: 12px;
            color: $color_red;
        }

        .yellow-label{
            display: inline-block;
            max-width: 100%;
            color: $color_yellow;
            vertical-align: middle;
            @include overflow_tip();
        }
    }
</style>

