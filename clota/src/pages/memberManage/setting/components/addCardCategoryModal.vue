<!--新增会员卡类别模态框-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        :width="500"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="add-card-category"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >{{$t('memberTypeSetting')}}</span>
        </div>
        <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="150">
            <FormItem :label="$t('memberCardTypeName')" prop="memberCategoryName">
                <Input v-model.trim="formData.memberCategoryName"
                       style="width: 280px"
                       :placeholder="$t('inputField', { field : $t('memberCardTypeNameInputTip') })"/>
            </FormItem>
            <FormItem :label="$t('会员卡类型')" prop="cardType">
                <RadioGroup v-model="formData.cardType">
                    <Radio :disabled="personCardDisabled" label="personal">{{$t('个人')}}</Radio>
                    <Radio :disabled="companyCardDisabled" label="enterprise">{{$t('企业')}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem :label="$t('会员卡属性')" prop="attribute">
                <RadioGroup v-model="formData.attribute">
                    <Radio label="growth" v-if="cardIsGrowth">{{$t('成长型')}}</Radio>
                    <Radio label="sale" v-if="cardIsSaling">{{$t('售卖型')}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem :label="$t('remark')" prop="remark">
                <Input v-model.trim="formData.remark"
                       style="width: 280px"
                       type="textarea"/>
            </FormItem>
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
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';

    export default {
        props : {
            //绑定的模态框是否显示的变量
            value : {
                type : Boolean,
                default : false
            },
            //会员类别默认信息
            'card-default-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            //校验是否重名
            const validateMemberCategoryName = (rule,value,callback) => {
                callback();
            };
            return {
                formData : {
                    //备注
                    remark : '',
                    //会员卡类别名称
                    memberCategoryName : '',
                    id : '',
                    cardType : '',
                    attribute : ''
                },
                //表单校验规则
                ruleValidate : {
                    memberCategoryName : [
                        { required : true,message : this.$t('inputField',{ field : this.$t('memberCardTypeName') }),trigger : 'blur' },
                        { validator : validateMemberCategoryName,trigger : 'blur' },
                        { max : 20, message : this.$t('errorMaxLength',{ field : this.$t('memberCardTypeName'),length : 20 }),trigger : 'blur' }
                    ],
                    remark : [
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('remark'),length : 100 }),trigger : 'blur' }
                    ],
                    cardType : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('会员卡类型') }),
                            trigger : 'change'
                        }
                    ],
                    attribute : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('会员卡属性') }),
                            trigger : 'change'
                        }
                    ]
                },
                //保存数据中
                saveIng : false,
                personCardDisabled : false,
                companyCardDisabled : false
            };
        },
        methods : {
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {
                if (type === false) {
                    this.$refs.formValidate.resetFields();
                } else {
                    if (this.cardDefaultInfo && Object.keys(this.cardDefaultInfo).length > 0) {
                        this.formData.memberCategoryName = this.cardDefaultInfo.typeName;
                        this.formData.remark = this.cardDefaultInfo.remark;
                        this.formData.id = this.cardDefaultInfo.id;
                    } else {
                        this.formData.memberCategoryName = '';
                        this.formData.remark = '';
                        this.formData.id = '';
                    }
                }
            },
            /**
             * 模态框状态改变
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 保存新增会员类别信息
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        if (this.typeSetting === 'edit') {
                            this.updateCategoryInfo();
                        } else {
                            this.addCategoryInfo();
                        }
                    }
                });
            },
            /**
             * 新增会员类别信息
             */
            addCategoryInfo () {
                this.saveIng = true;
                ajax.post('saveOrUpdateCardType',{
                    typeName : this.formData.memberCategoryName,
                    remark : this.formData.remark,
                    cardForm : this.formData.attribute,
                    type : this.formData.cardType,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('addMemberType') }));
                        this.$emit('fresh-data');
                        this.cancel();
                    } else if (res.code === 'M024') {
                        this.$Message.error(this.$t('memberCardTypeNameExist'));
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('addMemberType') }));
                    }
                }).finally(() => {
                    this.saveIng = false;
                });
            },
            /**
             * 修改会员类别信息
             */
            updateCategoryInfo () {
                this.saveIng = true;
                ajax.post('saveOrUpdateCardType',{
                    typeName : this.formData.memberCategoryName,
                    remark : this.formData.remark,
                    id : this.formData.id,
                    cardForm : this.formData.attribute,
                    type : this.formData.cardType,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('modifyMemberType') }));
                        this.$emit('fresh-data');
                        this.cancel();
                    } else if (res.code === 'M024') {
                        this.$Message.error(this.$t('memberCardTypeNameExist'));
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('modifyMemberType') }));
                    }
                }).finally(() => {
                    this.saveIng = false;
                });
            },
            /**
             * 获取会员卡类型新增个数
             */
            countCardTypeByType () {
                ajax.post('countCardTypeByType').then(res => {
                    if (res.success) {

                    }
                });
            }
        },
        computed : {
            //当前是新增还是编辑
            typeSetting () {
                if (this.cardDefaultInfo && Object.keys(this.cardDefaultInfo).length > 0) {
                    return 'edit';
                } else {
                    return 'add';
                }
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
        },
        watch : {
            'memberConfigInfo.cardType' : {
                handler (newVal) {
                    if (newVal === 'sale') {
                        this.formData.attribute = 'sale';
                    } else if (newVal === 'growth') {
                        this.formData.attribute = 'growth';
                    } else {
                        this.formData.attribute = '';
                    }
                },
                immediate : true
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .add-card-category{

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

        /deep/ .ivu-modal-body{
            display: flex;
            align-items: center;
            min-height: 220px;
        }
    }
</style>
