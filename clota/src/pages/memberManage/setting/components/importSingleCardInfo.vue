<!--导入单个实体卡信息-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        width="560"
        class="import-single-card"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >{{$t('singleImport')}}</span>
        </div>
        <div class="target-body">
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="lang === 'zh-CN' ? 100 : 180">
                <FormItem :label="$t('卡类型')" prop="entityCardType">
                    <Select v-model="formData.entityCardType" :disabled="disabledChangeCardType">
                        <Option value="common">{{$t('普通卡')}}</Option>
                        <Option value="password">{{$t('密码卡')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('cardFaceNum')" prop="faceNum">
                    <Input v-model.trim="formData.faceNum"/>
                </FormItem>
                <FormItem :label="$t('physicalCardNo')" prop="physicalNum">
                    <Input v-model.trim="formData.physicalNum"/>
                </FormItem>
                <FormItem :label="$t('涂层密码')" prop="password"
                          v-if="formData.entityCardType === 'password'">
                    <Input v-model.trim="formData.password"/>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary"
                    :loading="saveIng"
                    class="ivu-btn-90px"
                    @click="save">{{$t('save')}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
    import common from '@/assets/js/common.js';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
            //修改时，卡的数据
            'card-data' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            //校验字符串是否包含数字和字母
            const validateNumAndStr = (rule,value,callback) => {
                if (common.isNotEmpty(value)) {
                    if (/^[A-Za-z0-9]{0,}$/g.test(value)) {
                        if (value.length > rule.maxLength) {
                            callback(this.$t('errorMaxLength',{ field : rule.name,length : rule.maxLength }));
                        } else {
                            callback();
                        }
                    } else {
                        callback(this.$t('filterError',{ field : rule.name }));
                    }
                } else {
                    callback();
                }
            };
            return {
                //表单数据
                formData : {
                    //卡面号
                    faceNum : '',
                    //物理卡号
                    physicalNum : '',
                    //实体卡类型
                    entityCardType : 'common',
                    //图层密码
                    password : ''
                },
                //表单校验规则
                ruleValidate : {
                    faceNum : [
                        { required : true,message : this.$t('inputField',{ field : this.$t('cardFaceNum') }),trigger : 'blur' },
                        { validator : validateNumAndStr,trigger : 'blur',name : this.$t('cardFaceNum'),maxLength : 60 }
                    ],
                    physicalNum : [
                        { required : true,message : this.$t('inputField',{ field : this.$t('physicalCardNo') }),trigger : 'blur' },
                        { validator : validateNumAndStr,trigger : 'blur',name : this.$t('physicalCardNo'),maxLength : 60 }
                    ],
                    entityCardType : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('卡类型') }),
                            trigger : 'blur'
                        }
                    ],
                    password : [
                        {
                            required : true,
                            message : this.$t('inputField',{ field : this.$t('password') }),
                            trigger : 'blur'
                        },
                        {
                            max : 100,
                            message : this.$t('errorMaxLength', { field : this.$t('password'),length : 100 }),
                            trigger : 'blur'
                        }
                    ]
                },
                //是否在保存中
                saveIng : false
            };
        },
        computed : {
            ...mapGetters({
                lang : 'lang'
            }),
            //是否可以禁用选择卡类型
            disabledChangeCardType () {
                return this.cardData && Object.keys(this.cardData).length > 0;
            }
        },
        methods : {
            /**
             * 模态框状态改变
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {
                if (type === true) {
                    if (this.cardData && Object.keys(this.cardData).length > 0) {
                        this.formData.faceNum = this.cardData.faceNum;
                        this.formData.physicalNum = this.cardData.physicalNum;
                        this.formData.entityCardType = this.cardData.entityCardType;
                        this.formData.password = this.cardData.password;
                    } else {
                        this.formData.entityCardType = 'common';
                        this.formData.password = '';
                    }
                } else {
                    this.$refs.formValidate.resetFields();
                }
            },
            /**
             * 导入单个实体卡
             */
            save () {
                this.saveIng = true;
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        if (this.cardData.id) {
                            this.modifyEntityCard();
                        } else {
                            this.saveEntityCard();
                        }
                    } else {
                        this.saveIng = false;
                    }
                });
            },
            /**
             * 取消导入
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 增卡信息
             */
            saveEntityCard () {
                ajax.post('saveEntityCard',{
                    physicalNum : this.formData.physicalNum,
                    faceNum : this.formData.faceNum,
                    entityCardType : this.formData.entityCardType,
                    password : this.formData.password,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('add') }));
                        this.$emit('fresh-data');
                        this.cancel();
                    } else {
                        if (res.code === 'M011') {
                            this.$Message.error(this.$t('M011'));
                        } else {
                            this.$Message.error(this.$t('failureTip',{ tip : this.$t('add') }));
                            this.cancel();
                        }
                    }
                }).finally(() => {
                    this.saveIng = false;
                });
            },
            /**
             * 保存修改卡信息
             */
            modifyEntityCard () {
                ajax.post('saveEntityCard',{
                    id : this.cardData.id,
                    physicalNum : this.formData.physicalNum,
                    faceNum : this.formData.faceNum,
                    entityCardType : this.formData.entityCardType,
                    password : this.formData.password,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('modify') }));
                        this.$emit('fresh-data');
                        this.cancel();
                    } else {
                        if (res.code === 'M011') {
                            this.$Message.error(this.$t('M011'));
                        } else {
                            this.$Message.error(this.$t('failureTip',{ tip : this.$t('modify') }));
                            this.cancel();
                        }
                    }
                }).finally(() => {
                    this.saveIng = false;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .import-single-card{
        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                width: 100%;
                display: inline-block;
                @include overflow_tip();
            }
        }

        .target-body{
            padding: 30px 70px 10px 70px;
        }
    }
</style>
