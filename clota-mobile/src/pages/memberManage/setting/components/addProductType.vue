<!--新增产品类别-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        width="560"
        class="add-product-type"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >新增产品类别</span>
        </div>
        <div class="target-body">
            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="100">
                <FormItem label="类别名称" prop="typeName">
                    <Input v-model.trim="formData.typeName"/>
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Input v-model.trim="formData.remark" height="58" type="textarea"/>
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
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
            //当前修改的产品类型的数据
            'product-data' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data() {
            return {
                //表单数据
                formData : {
                    //类别名称
                    typeName : '',
                    //备注
                    remark : ''
                },
                //表单校验规则
                ruleValidate : {
                    typeName : [
                        {required : true,message : this.$t('inputField',{field : '类别名称'}),trigger : 'blur'},
                        {max : 20,message : this.$t('errorMaxLength',{field : '类别名称',length : 20}),trigger : 'blur'},
                    ],
                    remark :[
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('remark'),length : 100}),trigger : 'blur'},
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
             * 取消新增
             */
            cancel () {
                this.$refs.formValidate.resetFields();
                this.$emit('input',false);
            },
            /**
             * 报错新增产品类别
             */
            save () {
                this.saveIng = true;
                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        if(this.productData.id){
                            this.modifyProductType();
                        }else{
                            this.addProductType();
                        }
                    }else{
                        this.saveIng = false;
                    }
                });
            },
            /**
             * 新增产品类型
             */
            addProductType () {
                ajax.post('saveProductType',{
                    typeName : this.formData.typeName,
                    remark : this.formData.remark,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('新增成功');
                        this.$emit('fresh-data');
                    }else{
                        this.$Message.error(res.message || '新增失败');
                    }
                }).finally(() =>{
                    this.saveIng = false;
                    this.cancel();
                });
            },
            /**
             * 编辑产品类型
             */
            modifyProductType () {
                ajax.post('saveProductType',{
                    typeName : this.formData.typeName,
                    remark : this.formData.remark,
                    id : this.productData.id
                }).then(res => {
                    if(res.success){
                        this.$Message.success('修改成功');
                        this.$emit('fresh-data');
                    }else{
                        this.$Message.error(res.message || '修改失败');
                    }
                }).finally(() =>{
                    this.saveIng = false;
                    this.cancel();
                });
            }
        },
        watch :{
            //修改时给输入框添加默认值
            productData (newVal,oldVal) {
                if(newVal){
                    this.formData.typeName = newVal.typeName;
                    this.formData.remark = newVal.remark;
                }else{
                    this.formData.typeName = '';
                    this.formData.remark = '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .add-product-type{

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
            padding: 60px 70px 0 70px;
            height: 223px;
        }
    }
</style>
