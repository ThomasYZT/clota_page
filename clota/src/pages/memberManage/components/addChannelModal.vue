<template>
    <!--新增渠道-->
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-channel-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="110">
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('channelName') + '：'" prop="channelName"><!--渠道名称-->
                        <Input v-model.trim="formData.channelName" :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('remark') + '：'" prop="remark"><!--备注-->
                        <Input v-model.trim="formData.remark" type="textarea" :placeholder="$t('inputField', {field: ''})"/>
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
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components: {},
        data () {

            const validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };

            return {
                visible: false,
                //标题
                title: 'addChannel',   // '新增渠道'
                //表单数据
                formData: {
                    channelName: '',
                    remark: '',
                },
                // 表单校验
                ruleValidate: {
                    channelName: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('channelName')}), trigger: 'blur' },   // 渠道名称不能为空
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 10, message: this.$t('errorMaxLength', {field: this.$t('channelName'), length: 10}), trigger: 'blur' },  // 渠道名称不能超过10字符
                    ],
                    remark: [
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { max: 100, message: this.$t('errorMaxLength', {field: this.$t('remark'), length: 100}), trigger: 'blur' },     // 备注不能超过100字符
                    ],
                }
            }
        },
        methods: {

            //显示
            show ( data ) {
                if(data){
                    this.title = 'modifyChannel';   // 修改渠道
                    this.formData = defaultsDeep({}, data);
                }
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        var params = {
                            channelName: this.formData.channelName,
                            remark: this.formData.remark,
                        };
                        //区分新增/编辑
                        if(this.title === 'modifyChannel'){     // 修改渠道
                            params.id = this.formData.id;
                            this.updateChannelSet(params);
                        }else{
                            this.updateChannelSet(params);
                        }
                    }
                })
            },

            //增加/修改渠道
            updateChannelSet ( params ) {
                ajax.post('updateChannelSet', params).then(res => {
                    if(res.success){
                        this.$Message.success(this.title + this.$t('successTip', {tip: ''}) + '！');
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
                this.formData = { channelName: '', remark: '' };
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-channel-modal{

        .modal-body{
            padding: 50px 40px;

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

