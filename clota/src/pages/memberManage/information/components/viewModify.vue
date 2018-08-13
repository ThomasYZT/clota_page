<template>
    <!--积分修改信息/储值账户修改信息-->
    <Modal
        v-model="visible"
        :title="type === 'fund' ? '会员储值账户余额修改' : '会员积分账户修改' "
        class-name="view-modify-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="form-item-wrap"><label>本次修改金额：</label><span :class="{'red': num < 0, 'green': num > -1 }">{{num}}</span></div>
            <div class="form-item-wrap"><label>修改后账户余额为：</label><span>1999元</span></div>
            <div class="form-item-wrap"><label>操作人：</label><span>赵丽颖</span></div>
            <div class="form-item-wrap"><label>修改时间：</label><span>2018-01-01 08:00:00</span></div>
            <div class="form-item-wrap"><label>备注：</label><span>系统更新时，用户进行消费，消费信息未同步</span></div>
            <div class="form-item-wrap"><label>修改原因：</label><span>积分账户错误，手动新增金额200元</span></div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="hide" >返回</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        components: {},
        data () {
            return {
                // 储值/积分 fund/integration
                type: 'fund',
                visible: false,
                num: -1209,
            }
        },
        methods: {

            show ( type ) {
                this.type = type || 'fund';
                this.visible = true;
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
    .view-modify-modal{

        .modal-body{
            padding: 20px 0 50px 100px;
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
                    color: $color-333;
                }
                .red{
                    color: $color_red;
                }
                .green{
                    color: $color_green;
                }
            }
        }

    }
</style>
