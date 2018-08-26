<!--删除卡劵modal-->

<template>
    <Modal
        :value="value"
        title="删除卡券"
        class-name="delete-card-modal vertical-center-modal"
        width="420"
        :mask-closable="false"
        @on-cancel="hide">
        <div class="modal-body">
            <div class="left"><Icon type="help-circled"></Icon></div>
            <div class="right">
                您正在删除卡券：<span class="name">{{couponData.couponName}}</span><br>
                <span class="notice">本操作不可撤销，</span>是否确认删除？
            </div>
        </div>
        <div slot="footer" class="modal-footer">
            <Button class="ivu-btn-90px" 
                    type="error" 
                    @click="deleteCardFunc" >确定</Button>
            <Button class="ivu-btn-90px" 
                    type="ghost" 
                    @click="hide" >取消</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        props :{
            //模态框是否显示
            'value' : {
                type : Boolean,
                default : false
            },
            //卡券数据
            'coupon-data' : {
                type : Object,
                default () {
                    return  {};
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            /**
             * 删除券
             */
            deleteCardFunc () {
                this.$emit('confirm-del');
                this.hide();
            },
            /**
             * 关闭模态框
             */
            hide(){
                this.$emit('input',false);
            },
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .delete-card-modal{
        .modal-body{
            padding: 45px 60px;
            text-align: left;
            @include clearfix();
            .left{
                float: left;
                width: 14px;
                text-align: right;
                span{
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    background-color: pink;
                    vertical-align: middle;
                }

                .ivu-icon{
                    font-size: 17px;
                    vertical-align: middle;
                    color: #EB6751;
                }
            }
            .right{
                float: right;
                width: calc(100% - 14px);
                font-size: $font_size_14px;
                color: $color_333;
                letter-spacing: 1px;
                line-height: 24px;
                padding-left: 10px;
                .name{
                    color: $color_yellow;
                }
                .notice{
                    color: $color_red;
                }
            }
        }
    }
</style>
