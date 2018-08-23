<template>
    <!--会员级别设置-->
    <Modal
        v-model="visible"
        title="会员级别设置"
        class-name="add-member-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="145">
                <div class="ivu-form-item-wrap">
                    <Form-item label="会员等级：" prop="levelNum">
                        <Input v-model.trim="formData.levelNum"
                               type="text"
                               :maxlength="10"
                               placeholder="请输入会员等级"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="等级名称：" prop="levelDesc">
                        <Input v-model.trim="formData.levelDesc"
                               type="text"
                               :maxlength="10"
                               placeholder="请输入会员级别名称，例：黄金会员"/>
                    </Form-item>
                </div>
                <!--<div class="ivu-form-item-wrap" style="transform: scale(0);">-->
                    <!--<Form-item  prop="lowerGrowthValue">-->
                    <!--</Form-item>-->
                <!--</div>-->
                <div class="ivu-form-item-wrap">
                    <Form-item label="会员成长值范围：" prop="highestGrowthValue">
                        <Input v-model.trim="formData.lowerGrowthValue"
                               :maxlength="10"
                               placeholder="请输入"
                               class="single-input"/>
                        <span class="split-line">–</span>
                        <Input v-model.trim="formData.highestGrowthValue"
                               :maxlength="10"
                               placeholder="请输入"
                               class="single-input"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="备注：" prop="remark">
                        <Input v-model.trim="formData.remark"
                               :maxlength="20"
                               type="textarea"
                               placeholder="请输入"/>
                    </Form-item>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc">保存</Button>
            <Button type="ghost" @click="hide" >取消</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components: {},
        data () {
            const validMethod = {
                isNumber : (rule, value, callback) => {
                    if ( value && ( parseInt(value) < 0 || parseInt(value) + '' !== value + '' ) ) {
                        callback( new Error( '当前输入只能是非负整数') );
                    } else {
                        callback();
                    }
                },
            };
            return {
                visible: false,
                //表单数据
                formData: {
                    levelNum: '',
                    levelDesc: '',
                    lowerGrowthValue: '0',
                    highestGrowthValue: '999',
                    remark: '',
                },
                ruleValidate: {
                    levelNum: [
                        { required: true, message: '会员等级不能为空', trigger: 'blur' },
                        { validator: validMethod.isNumber, trigger: 'blur' }
                    ],
                    levelDesc: [
                        { required: true, message: '会员级别名称不能为空', trigger: 'blur' },
                    ],
                    lowerGrowthValue: [
                        { required: true, message: '会员成长值不能为空', trigger: 'blur' },
                        { validator: validMethod.isNumber, trigger: 'blur' }
                    ],
                    highestGrowthValue: [
                        { required: true, message: '会员成长值不能为空', trigger: 'blur' },
                        { validator: validMethod.isNumber, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {

            show ( data ) {
                if(data && data.id){
                    this.formData = defaultsDeep({}, data);
                    this.formData.levelNum = this.formData.levelNum+'';
                    this.formData.lowerGrowthValue = this.formData.lowerGrowthValue+'';
                    this.formData.highestGrowthValue = this.formData.highestGrowthValue+'';
                }
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        console.log(true)
                        this.updateMemberLevel(this.formData);
                    }
                })
            },

            //新增/修改数据
            updateMemberLevel ( data ) {
                console.log( data )
                ajax.post('updateMemberLevel', {
                    id: data.id,
                    levelNum: data.levelNum,
                    levelDesc: data.levelDesc,
                    lowerGrowthValue: data.lowerGrowthValue,
                    highestGrowthValue: data.highestGrowthValue,
                    remark: data.remark,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('操作成功！');
                        this.$emit('modify-success');
                        this.hide();
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'updateMemberLevel 操作失败！');
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                //重置数据
                this.formData = {
                    levelNum: '',
                    levelDesc: '',
                    lowerGrowthValue: '0',
                    highestGrowthValue: '999',
                    remark: '',
                };
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-member-modal{

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

        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>

