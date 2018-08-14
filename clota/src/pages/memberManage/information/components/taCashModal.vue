<template>
    <!--兑现-->
    <Modal
        v-model="visible"
        title="兑现"
        class-name="to-cash-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="110">
                <div class="ivu-form-item-wrap">
                    <Form-item label="兑现数量：" prop="num">
                        <Input v-model.trim="data.num" placeholder="请输入"></Input>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="兑换后数量：" prop="afterNum">
                        <Input v-model.trim="data.afterNum" disabled placeholder="请输入"></Input>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <FormItem label="充值渠道：" prop="channel">
                        <RadioGroup v-model="data.channel">
                            <Radio label="cash">转化为现金</Radio>
                            <Radio label="account">转化至账户</Radio>
                        </RadioGroup>
                    </FormItem>
                </div>
                <div class="ivu-form-item-wrap" v-if="data.channel === 'account'">
                    <Form-item label="转入账户：" prop="account">
                        <Select v-model="data.account" placeholder="请选择">
                            <Option value="">账户</Option>
                        </Select>
                    </Form-item>
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
        components: {},
        data () {
            return {
                visible: false,
                data: {
                    num: '',
                    afterNum: '20',
                    channel: 'cash',
                    account: '',
                },
                ruleValidate: {
                    num: [
                        { required: true, message: '兑现数量不能为空', trigger: 'change' },
                    ],
                    channel: [
                        { required: true, message: '充值渠道不能为空', trigger: 'change' },
                    ],
                }
            }
        },
        methods: {

            show () {
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        console.log(true)
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

</style>
