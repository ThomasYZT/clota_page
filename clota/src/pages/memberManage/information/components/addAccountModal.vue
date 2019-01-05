<template>
    <!--新增账户-->
    <Modal
        v-model="visible"
        :title="$t('newAccount')"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate"
                  :model="data"
                  :rules="ruleValidate"
                  :label-width="200">
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('selectField', {msg: $t('account')})"
                               prop="accountTypeId">
                        <Select v-model="data.accountTypeId"
                                :placeholder="$t('selectField', {msg: ''})"
                                style="width: 260px">
                            <Option v-for="(item,index) in store"
                                    :key="index"
                                    :value="item.id">
                                {{item.accountName}}
                            </Option>
                        </Select>
                    </Form-item>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';

    export default {
        props : ['store','detail'],
        components : {},
        data () {
            return {
                visible : false,
                //表单数据
                data : {
                    accountTypeId : '',
                },
                //表单校验
                ruleValidate : {
                    accountTypeId : [
                        { required : true, message : this.$t('selectField', { msg : this.$t('account') }), trigger : 'change' }, // 账户不能为空
                    ],
                }
            };
        },
        methods : {

            show () {
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.addAccountInfo();
                    }
                });
            },

            //新增账户
            addAccountInfo () {
                ajax.post('addAccountInfo', {
                    accountTypeId : this.data.accountTypeId,
                    memberId : this.detail.id,
                    cardId : this.detail.id,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(`${this.$t('newAccount')}${this.$t('success')}！`); // 新增账号成功
                        this.$emit('add-success');
                        this.hide();
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message ? this.$t(res.message) : 'addAccountInfo ' + this.$t('failure') + '！');
                    }
                });
            },

            //关闭模态框
            hide () {
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.data.accountTypeId = '';
            },

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 90px 0;
            margin: 0 auto;
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>
