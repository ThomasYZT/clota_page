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
            <span class="title" >单个导入</span>
        </div>
        <div class="target-body">
            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="100">
                <FormItem label="卡面号" prop="faceNum">
                    <Input v-model.trim="formData.faceNum"/>
                </FormItem>
                <FormItem label="物理卡号" prop="physicalNum">
                    <Input v-model.trim="formData.physicalNum"/>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary"
                    :loading="saveIng"
                    class="ivu-btn-90px"
                    @click="save">保存</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">取消</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
    import common from '@/assets/js/common.js';
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
                    return {}
                }
            }
        },
        data() {
            //校验字符串是否包含数字和字母
            const validateNumAndStr = (rule,value,callback) => {
                if(common.isNotEmpty(value)){
                    if(/^[A-Za-z0-9]{0,}$/g.test(value)){
                        if(value.length > rule.maxLength){
                            callback(this.$t('errorMaxLength',{field : rule.name,length : rule.maxLength}));
                        }else{
                            callback();
                        }
                    }else{
                        callback(this.$t('filterError',{field : rule.name}));
                    }
                }else{
                    callback();
                }
            };
            return {
                //表单数据
                formData : {
                    //卡面号
                    faceNum : '',
                    //物理卡号
                    physicalNum : ''
                },
                //表单校验规则
                ruleValidate : {
                    faceNum : [
                        {required : true,message : this.$t('inputField',{field : '卡面号'}),trigger : 'blur'},
                        {validator : validateNumAndStr,trigger : 'blur',name : this.$t('卡面号'),maxLength : 30}
                    ],
                    physicalNum :[
                        {required : true,message : this.$t('inputField',{field : '物理卡号'}),trigger : 'blur'},
                        {validator : validateNumAndStr,trigger : 'blur',name : this.$t('物理卡号'),maxLength : 30}
                    ]
                },
                //是否在保存中
                saveIng : false
            }
        },
        methods: {
            /**
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if (type === false) {
                }else{
                }
            },
            /**
             * 导入单个实体卡
             */
            save () {
                this.saveIng = true;
                this.$refs.formValidate.validate(valid => {
                    if(valid) {
                        if(this.cardData.id){
                            this.modifyEntityCard();
                        }else{
                            this.saveEntityCard();
                        }
                    }else{
                        this.saveIng = false;
                    }
                });
            },
            /**
             * 取消导入
             */
            cancel () {
                this.$refs.formValidate.resetFields();
                this.$emit('input', false);
            },
            /**
             * 增卡信息
             */
            saveEntityCard () {
                ajax.post('saveEntityCard',{
                    physicalNum : this.formData.physicalNum,
                    faceNum : this.formData.faceNum,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('新增成功');
                        this.$emit('fresh-data');
                        this.cancel();
                    }else{
                        if(res.code === 'M011'){
                            this.$Message.error('实体卡已存在');
                        }else{
                            this.$Message.error('新增失败');
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
                }).then(res => {
                    if(res.success){
                        this.$Message.success('修改成功');
                        this.$emit('fresh-data');
                        this.cancel();
                    }else{
                        if(res.code === 'M011'){
                            this.$Message.error('实体卡已存在');
                        }else{
                            this.$Message.error('修改失败');
                            this.cancel();
                        }
                    }
                }).finally(() => {
                    this.saveIng = false;
                });
            }
        },
        watch :{
            //修改时给输入框添加默认值
            cardData (newVal,oldVal) {
                if(newVal){
                    this.formData.faceNum = newVal.faceNum;
                    this.formData.physicalNum = newVal.physicalNum;
                }else{
                    this.formData.physicalNum = '';
                    this.formData.faceNum = '';
                }
            }
        }
    }
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
            padding: 82px 70px 0 70px;
            height: 262px;
        }
    }
</style>
