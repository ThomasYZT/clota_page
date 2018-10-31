<template>
    <!--新建销售政策-->
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-sale-policy-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">
                <i-row>
                    <i-col span="22">
                        <Form-item :label="$t('industry') + '：'" prop="productType"><!--业态-->
                            <Select v-model="formData.productType"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in list"
                                        :key="index"
                                        :value="item.name">
                                    {{$t(item.name)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </i-col>
                </i-row>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    export default {
        props: ['list'],
        components: {},
        data () {

            return {
                visible: false,
                //标题
                title: 'addSalePolicy',   // '新建销售政策'
                //表单数据
                formData: {
                    productType: '',//业态
                },
                // 表单校验
                ruleValidate: {
                    productType: [
                        { required: true, message: this.$t('errorEmpty', { msg: this.$t('industry') }), trigger: 'change' },   // 业态不能为空
                    ],
                }
            }
        },
        methods: {

            //显示
            show (  ) {
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.$router.push({
                            name: 'editSalePolicy',
                            params: {
                                type: 'add',
                                productType: this.formData.productType
                            }
                        })
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.formData = { productType: '' };
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-sale-policy-modal{

        .modal-body{
            padding: 50px 100px;

            /deep/ .ivu-input-wrapper{
                width: 280px;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }
    }
</style>

