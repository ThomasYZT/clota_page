<!--
    新增营销等级模态框
    作者：杨泽涛
-->
<template>
    <Modal class="add-marketing-level"
           v-model="visible"
           :title="$t(type) + $t('marketingLevel')"
           class-name="vertical-center-modal add-marketing-level"
           width="600"
           :mask-closable="false"
           @on-cancel=toggle({})>

        <div class="form-wrapper">
            <Form ref="form"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="180">
                <i-row>
                    <i-col span="18" offset="3">
                        <!-- 营销等级名称 -->
                        <FormItem :label="$t('colonSetting', { key : $t('marketingLevelName') })"  prop="marketingLevelName">
                            <Input type="text"
                                   style="width:200px;"
                                   v-model.trim="formData.marketingLevelName"
                                   :placeholder="$t('inputField', { field : $t('marketingLevelName') })"/>
                        </FormItem>
                        <!-- 等级 -->
                        <FormItem :label="$t('colonSetting', { key : $t('level') })"  prop="level">
                            <Select v-if="type === 'add'"
                                    v-model="formData.level"
                                    :placeholder="$t('selectField', { msg : $t('level') })"
                                    show-name
                                    style="width:200px">
                                <Option v-for="item in levelList"
                                        :disabled="item.disable"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                            <span v-else>{{formData.level}}</span>
                        </FormItem>
                        <!-- 升级金额 -->
                        <FormItem :label="$t('colonSetting', { key : $t('levelUpMoney') })"  prop="levelUpMoney">
                            <Input type="text"
                                   style="width:200px;"
                                   v-model.trim="formData.levelUpMoney"
                                   :placeholder="$t('inputField', { field : $t('levelUpMoney') })"/>
                        </FormItem>

                    </i-col>
                </i-row>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button class="ivu-btn-90px"
                    type="primary"
                    @click="save" >{{$t('save')}}</Button>
            <Button class="ivu-btn-90px"
                    type="ghost"
                    @click="toggle" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    export default {
        components : {},
        data () {
            //校验钱
            const validateMoney = (rule, value, callback) => {
                if (value) {
                    common.validateMoney(value).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t('errorMaxLength',{ field : this.$t(rule.field),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t(rule.field) }));
                        }
                    });
                } else {
                    callback();
                }
            };

            //校验等级名称
            const validateMarketingLevelName = (rule, value, callback) => {
                let valIndex = this.haslevelList.findIndex((item) => {
                    return item.levelName === value;
                });
                //不能与已存在的等级名称相同
                if (value && valIndex < 0) {
                    callback();
                } else {
                    if (this.type === 'edit' && value === this.haslevelList[valIndex].levelName) {
                        callback();
                    } else {
                        callback(new Error(this.$t('MK011')));
                    }
                }
            };

            //校验升级金额
            const validateLevelUpMoney = (rule, value, callback) => {
                if (value && this.formData.level) {
                    let biggerMix = 100,
                        smallerMax = 0,
                        biggerMixItem,
                        smallerMaxItem;
                    this.haslevelList.forEach((item) => {
                        if (item.level > parseInt(this.formData.level)) {
                            if (item.level < biggerMix) {
                                biggerMix = item.level;
                                biggerMixItem = item;
                            }
                        } else if (item.level < parseInt(this.formData.level)) {
                            if (item.level > smallerMax) {
                                smallerMax = item.level;
                                smallerMaxItem = item;
                            }
                        }
                    });
                    if (biggerMixItem && smallerMaxItem && value < biggerMixItem.levelAmount && value > smallerMaxItem.levelAmount) {
                        callback();
                    } else if (!biggerMixItem && smallerMaxItem && value > smallerMaxItem.levelAmount) {
                        callback();
                    } else if (biggerMixItem && !smallerMaxItem && value < biggerMixItem.levelAmount) {
                        callback();
                    } else if (!biggerMixItem && !smallerMaxItem) {
                        callback();
                    } else {
                        callback(new Error(this.$t('levelAmountRule')));
                    }
                } else {
                    callback(new Error(this.$t('pleaseSelectMarketingLevelFirst')));
                }
            };

            return {
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    //营销等级名称
                    marketingLevelName : '',
                    //升级金额
                    levelUpMoney : '',
                    //等级
                    level : '',
                },
                //表单验证规则
                ruleValidate : {
                    marketingLevelName : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('marketingLevelName') }), trigger : 'blur' },
                        { type : 'string', max : 20, message : this.$t('errorMaxLength',{ field : this.$t('marketingLevelName'),length : 20 }), trigger : 'blur' },
                        { validator : validateMarketingLevelName, trigger : 'blur' }
                    ],
                    level : [
                        { required : true, message : this.$t('selectField',{ msg : this.$t('level') }), trigger : 'blur' },
                    ],
                    levelUpMoney : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('levelUpMoney') }), trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur' },
                        { validator : validateLevelUpMoney }
                    ]
                },
                //已存在等级列表
                haslevelList : [],
                //类型id
                typeId : '',
                //模态框类型
                type : '',
                //等级id
                levelId : '',
            };
        },
        computed : {
            //等级下拉列表
            levelList () {
                let lvList = [
                    {
                        label : '1',
                        value : '1'
                    },
                    {
                        label : '2',
                        value : '2'
                    },
                    {
                        label : '3',
                        value : '3'
                    },
                    {
                        label : '4',
                        value : '4'
                    },
                    {
                        label : '5',
                        value : '5'
                    },
                    {
                        label : '6',
                        value : '6'
                    },
                    {
                        label : '7',
                        value : '7'
                    },
                    {
                        label : '8',
                        value : '8'
                    },
                    {
                        label : '9',
                        value : '9'
                    },
                    {
                        label : '10',
                        value : '10'
                    }
                ];
                if (this.haslevelList.length === 0) {
                    return lvList;
                } else {
                    lvList = lvList.map((item) => {
                        if (this.haslevelList.find((hasitem) => {
                            return hasitem.level === parseInt(item.value);
                        })) {
                            return {
                                ...item,
                                disable : true,
                            };
                        } else {
                            return {
                                ...item,
                                disable : false,
                            };
                        }
                    });
                    return lvList;
                }
            }
        },
        methods : {
            /**
             * 显示、隐藏模态框
             * @param {string} type 模态框新增、编辑的状态类型
             * @param {object} addParams 新增状态类型时的参数
             * @param {object} editParams 编辑状态类型时的参数
             */
            toggle ({ type, addParams, editParams }) {
                //新增
                if (type && type === 'add' && addParams) {
                    this.type = type;
                    this.visible = true;
                    this.haslevelList = addParams.haslevelList;
                    this.typeId = addParams.typeId;

                //编辑
                } else if (type && type === 'edit' && editParams) {
                    this.type = type;
                    this.visible = true;
                    this.levelId = editParams.id;
                    this.formData.level = editParams.level.toString();
                    this.formData.levelUpMoney = editParams.levelAmount.toString();
                    this.formData.marketingLevelName = editParams.levelName;
                    this.typeId = editParams.typeId;
                    this.haslevelList = editParams.haslevelList;

                //关闭
                } else {
                    this.reset();
                }
            },
            /**
             * 保存
             */
            save () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.type === 'add') {
                            this.addLevel();
                        } else {
                            this.updateLevel();
                        }
                    }
                });
            },
            /**
             *  新增等级
             */
            addLevel () {
                ajax.post('marketing-addLevel', {
                    typeId : this.typeId,
                    levelName : this.formData.marketingLevelName,
                    level : this.formData.level,
                    levelAmount : this.formData.levelUpMoney,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                        this.$emit('do-success');
                        this.toggle({});
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                    }
                });
            },
            /**
             *  编辑等级
             */
            updateLevel () {
                ajax.post('marketing-updateLevel', {
                    typeId : this.typeId,
                    id : this.levelId,
                    levelName : this.formData.marketingLevelName,
                    levelAmount : this.formData.levelUpMoney,
                    level : this.formData.level,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('edit') }));
                        this.$emit('do-success');
                        this.toggle({});
                    } else {
                        if (res.code && (res.code === 'MK010' || res.code === 'MK011' || res.code === 'MK012')) {
                            this.$Message.error(this.$t(res.code));
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('edit') }));
                        }
                    }
                });
            },
            /**
             * 模态框数据重置
             */
            reset () {
                this.$refs.form.resetFields();
                this.haslevelList = [];
                this.levelId = '';
                this.typeId = '';
                this.type = '';
                this.visible = false;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    /deep/ .ivu-select-item-disabled {
        color: $color_gray;
    }
</style>
