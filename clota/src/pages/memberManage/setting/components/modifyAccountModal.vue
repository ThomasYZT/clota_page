<template>
    <!--编辑账户-->
    <Modal
        v-model="visible"
        title="编辑账户"
        class-name="modify-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap">
                    <Form-item label="账户归属" prop="account">
                        <Select v-model="formData.account">
                            <Option v-for="(item, index) in tableData"
                                    :value="item.id"
                                    :key="index">
                                {{ item.orgName }}
                                </Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="账户名称" prop="accountName">
                        <Input v-model.trim="formData.accountName" placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" prop="unit">
                    <Form-item label="单位" prop="unit">
                        <Input v-model.trim="formData.unit" placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="储值比率">
                        <Input v-model.trim="formData.start"
                               placeholder="请输入"
                               class="single-input"/>
                        <span style="padding: 0 5px;">:</span>
                        <Input v-model.trim="formData.start"
                               placeholder="请输入"
                               class="single-input"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <FormItem label="是否允许兑现">
                        <RadioGroup v-model="formData.exchangeToCash">
                            <Radio label="true">允许兑现</Radio>
                            <Radio label="false">不允许兑现</Radio>
                        </RadioGroup>
                    </FormItem>
                </div>
            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >保存</Button>
            <Button type="ghost" @click="hide" >取消</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        props: ['length','table-data'],
        components: {},
        data () {
            return {
                visible: false,
                //表单数据
                index: null,
                formData: {
                    account: '',
                    accountName: '',
                    unit: '',
                    rate: '',
                    start: 1,
                    end: 1,
                    exchangeToCash: 'true',
                    corpusAppliedOrgId: [],
                    donateAppliedOrgId: [],
                },
                //校验规则
                ruleValidate: {
                    account: [
                        { required: true, message: '账户归属不能为空', trigger: 'change' },
                    ],
                },
            }
        },
        methods: {

            show ( data ) {
                console.log(data)
                this.index = this.length;
                if( data ){
                    this.formData = data.item;
                    this.index = data.index;
                }
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){
                        let params = {
                            account: this.formData.account,
                            accountName: this.formData.accountName,
                            unit: this.formData.unit,
                            rate: this.formData.start/this.formData.end,
                            exchangeToCash: this.formData.exchangeToCash,
                            corpusAppliedOrgId: this.formData.corpusAppliedOrgId.join(','),
                            donateAppliedOrgId: this.formData.donateAppliedOrgId.join(','),
                        };
                        console.log(params)
                        this.updateMemberAccountDefine(params);
                    }
                })
            },


            //保存/更改/储值账户设置
            updateMemberAccountDefine ( params ) {
                ajax.post('updateMemberAccountDefine', params).then(res => {
                    if( res.success ) {
                        this.$Message.success('新增成功！');
                        this.hide();
                        this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.warning(res.message || 'updateMemberAccountDefine 新增失败！');
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.formData = {};
                this.index = null;
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 0 14px;
            height: 450px;

        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }
    }
</style>
