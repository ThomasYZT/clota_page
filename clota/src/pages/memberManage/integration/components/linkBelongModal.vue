<template>
    <!--会员管理--会员积分--特殊会员权益管理--会员信息关联分类-->
    <Modal
        v-model="visible"
        title="会员信息关联分类"
        class-name="link-belong-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="form-item-wrap"><label>用户姓名</label><span>刘木子</span></div>
            <div class="form-item-wrap"><label>手机号</label><span>15622221221</span></div>
            <div class="form-item-wrap"><label>会员编号</label><span>0000000108</span></div>
            <div class="form-item-wrap"><label>身份证号</label><span>653616565656565656</span></div>
            <div class="form-item-wrap">
                <label>关联所属类别</label>
                <Select v-model="scene">
                    <Option value="''">www</Option>
                </Select>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" :disabled="scene ? false : true" @click="save">保存</Button>
            <Button type="ghost" @click="hide">取消</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        components: {},
        data () {
            return {
                visible: false,
                scene: '',
            }
        },
        methods: {

            show () {
                this.visible = true;
            },

            //保存
            save () {
                console.log(true)
            },

            //关闭模态框
            hide(){
                this.visible = false;
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .link-belong-modal{

        .modal-body{
            padding: 20px 0 50px 70px;
            height: 230px;

            .form-item-wrap{
                width: 100%;
                float: left;
                margin-right: 10px;
                height: 30px;
                line-height: 30px;
                font-size: $font_size_14px;
                color: $color-666;
                >label{
                    display: inline-block;
                    width: 90px;
                    text-align: right;
                    margin-right: 10px;
                    color: $color-333;
                }
                /deep/ .ivu-select{
                    width: 280px;
                }
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }

</style>

