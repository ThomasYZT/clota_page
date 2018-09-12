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
                        <Form-item :label="$t('industry') + '：'" prop="industry"><!--业态-->
                            <Select v-model="formData.industry"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in industryEnum"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
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

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components: {},
        data () {

            return {
                visible: false,
                //标题
                title: 'addSalePolicy',   // '新建销售政策'
                //表单数据
                formData: {
                    industry: '',//业态
                },
                //业态列表
                industryEnum: [],
                // 表单校验
                ruleValidate: {
                    industry: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('industry')}), trigger: 'change' },   // 业态不能为空
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
                        var params = {
                            industry: this.formData.industry,
                        };
                        this.updateChannelSet(params);
                    }
                })
            },

            //新建销售政策
            updateChannelSet ( params ) {
                ajax.post('updateChannelSet', params).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t(this.title)+ this.$t('successTip', {tip: ''}) + '！');
                        this.hide();
                        this.$emit('close-modal');
                    } else {
                        console.log(res);
                        this.$Message.warning('queryChannelSet '+ this.$t('failureTip', {tip: 'del'}) +'！');     // 删除失败
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.formData = { industry: '' };
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

