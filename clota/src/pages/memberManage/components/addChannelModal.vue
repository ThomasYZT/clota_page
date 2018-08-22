<template>
    <!--新增渠道-->
    <Modal
        v-model="visible"
        :title="title"
        class-name="add-channel-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="110">
                <div class="ivu-form-item-wrap">
                    <Form-item label="渠道名称：" prop="channelName">
                        <Input v-model.trim="formData.channelName" placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="备注：" prop="remark">
                        <Input v-model.trim="formData.remark" type="textarea" placeholder="请输入"/>
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

    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components: {},
        data () {
            return {
                visible: false,
                //标题
                title: '新增渠道',
                //表单数据
                formData: {
                    channelName: '',
                    remark: '',
                },
                // 表单校验
                ruleValidate: {
                    channelName: [
                        { required: true, message: '渠道名称不能为空', trigger: 'blur' },
                    ],
                    type: [

                    ],
                }
            }
        },
        methods: {

            //显示
            show ( data ) {
                if(data){
                    this.title = '修改渠道';
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
                        if(this.title === '修改渠道'){
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
                        this.$Message.success(this.title+'成功！');
                        this.hide();
                        this.$emit('close-modal');
                    } else {
                        console.log(res);
                        this.$Message.warning('queryChannelSet 删除失败！');
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

