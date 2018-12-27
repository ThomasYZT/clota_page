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
                        <Form-item :label="$t('会员卡名称') + '：'" prop="levelDesc"><!--等级名称-->
                            <Input v-model.trim="formData.levelDesc"
                                   type="text"
                                   :placeholder="$t('inputField', {field: $t('memberLevelName')})"/><!--请输入会员级别名称，例：黄金会员-->
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('memberGrade') + '：'" prop="levelNum"><!--会员等级-->
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
                    <div class="ivu-form-item-wrap">
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
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('售卡金额') + '：'" prop="salePrice"><!--售卡金额-->
                            <Input v-model.trim="formData.salePrice"
                                   type="text"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('卡内金额') + '：'" prop="amountInCard"><!--卡内金额-->
                            <Input v-model.trim="formData.amountInCard"
                                   type="text"/>
                        </Form-item>
                    </div>
                    <!--有效期设置-->
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('validityPeriod') + '：'" prop="effTime">
                            <Select v-model="formData.effTime" style="width:280px">
                                <Option v-for="(item,index) in effTimeList"
                                        :value="item.value"
                                        :key="item.value">
                                    <div class="time-list-item">
                                        <span class="time-label" :class="{ 'blue-label' : item.value === 'add' }">
                                        {{ item.label }}{{$t('time.' + formData.effTimeUnit)}}
                                        </span>
                                        <span v-if="item.value !== 'add'" class="operate-label" @click.stop="delTimeItem(index)">{{$t('删除')}}</span>
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
                    <!--<Input v-model.trim="formData.effTimeUnit"-->
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
                <span class="yellow-label" v-w-title="currentData ? currentData.label : ''">{{currentData ? currentData.label : ''}}</span>
            </span>
            <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>，{{$t('sureToDel')}}</span>
        </del-modal>
    </div>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import delModal from '@/components/delModal/index.vue';

    export default {
        props : {
            //会员卡类别id
            'card-type-id' : {
              type : String,
              default : ''
            }
        },
        components : {
            delModal
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
                    effTimeUnit : 'year'
                },
                //有效期列表
                effTimeList : [
                    {
                        label : '1',
                        value : 1
                    },
                    {
                        label : '2',
                        value : 2
                    },
                    {
                        label : '3',
                        value : 3
                    },
                    {
                        label : '4',
                        value : 4
                    }
                ],
                //功能列表
                rightList : [
                    {
                        label : '储值',
                        value : 'isRecharge'
                    },
                    {
                        label : '折扣',
                        value : 'isDiscount'
                    },
                    {
                        label : '积分',
                        value : 'isScore'
                    }
                ],
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
                            _field : '售卡金额'
                        }
                    ],
                    amountInCard : [
                        {
                            required : true,
                            validator : validateMoney ,
                            trigger : 'blur',
                            _field : '卡内金额'
                        }
                    ],
                    function : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('会员卡功能') }),
                            trigger : 'change',
                            type : 'array'
                        }
                    ],
                    effTime : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('validityPeriod') }),
                            trigger : 'change',
                            type : 'number'
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
                            this.formData[item] = data[item];
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
                ajax.post('updateMemberLevel', {
                    cardTypeId : this.cardTypeId,
                    id : data.id,
                    levelNum : data.levelNum,
                    levelDesc : data.levelDesc,
                    // lowerGrowthValue : data.lowerGrowthValue,
                    // highestGrowthValue : data.highestGrowthValue,
                    remark : data.remark,
                    salePrice : data.salePrice,
                    amountInCard : data.amountInCard,
                    isRecharge : data.function.includes('isRecharge'),
                    isScore : data.function.includes('isScore'),
                    isDiscount : data.function.includes('isDiscount'),
                    effTime : data.effTime,
                    effTimeUnit : data.effTimeUnit,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('save') })); // 操作成功
                        this.$emit('modify-success');
                        this.hide();
                    } else if (res.code === 'M003') {
                        this.$Message.error(this.$t('changeMemLevelPlease')); // 会员级别已存在，请重新选择会员级别
                    } else {
                        this.$Message.warning(res.code
                            ? this.$t(res.code) :
                            ('updateMemberLevel ' + this.$t('failureTip', { tip : this.$t('save') }))); // 操作失败
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
                this.currentData = this.effTimeList[index];
                this.$refs.delModal.show({
                    title : this.$t('删除有效期'),
                    confirmCallback : () => {
                        // this.deleteLevelInfo(rowData);
                    }
                });
            },
            /**
             * 获取会员卡有效期信息
             */
            getEffTimeList () {
                ajax.post('').then(res => {
                    if (res.success) {
                        this.effTimeList = [];
                    } else {
                        this.effTimeList = []
                    }
                    this.effTimeList.push({
                        label : '新增有效期',
                        value : 'add'
                    });
                });
            }

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-member-modal{

        .time-list-item{
            @include block_outline();
            display: flex;

            .time-label{
                flex: 1;

                &.blue-label{
                    color: $color_blue;
                }
            }

            .operate-label{
                padding-right: 22px;
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

