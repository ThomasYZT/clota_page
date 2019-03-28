<!--混合支付-->

<template>
    <div class="view-content">
        <div class="money-wrap" v-click-outside="hideCursor">
            <div class="title">{{$t('colonSetting',{ key : $t('支付金额') })}}</div>
            <div class="money-input" @click="changeCursorStatus">
                <div class="money-text">aa</div>
                <div class="cursor" :class="{ 'move-status' :  cursorBounce}"></div>
            </div>
        </div>
        <!--输入数字键盘-->
        <num-key-board
            @click.native.stop=""
            type="money"
            ref="numKeyBoard"
            @add-word="clickBoarad"
            @del-word="delPassWord"
            @cancel="cancelInput">
        </num-key-board>
    </div>
</template>

<script>
    import numKeyBoard from '@/components/numKeyBoard/index.vue';
    export default {
        components : {
            numKeyBoard
        },
        data () {
            return {
                //表单数据
                formData : {
                    money : ''
                },
                //游标是否跳动
                cursorBounce : false
            };
        },
        methods : {
            /**
             * 点击外部隐藏游标
             */
            hideCursor () {
                this.cursorBounce = false;
                this.$store.commit('updateKeyBoardStatus',false);
            },
            /**
             * 获取键盘输入值
             * @param data
             */
            clickBoarad (data) {
                this.formData.money += data;
            },
            /**
             * 删除键盘输入数字
             */
            delPassWord () {

            },
            /**
             * 取消输入
             */
            cancelInput () {
            },
            changeCursorStatus () {
                this.$store.commit('updateKeyBoardStatus',true);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    @keyframes cursor-event {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    .view-content{
        @include block_outline();

        .money-wrap{
            width: 100%;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 18px;

            .money-input{
                flex: 1;
                height: 25px;
                line-height: 25px;
                text-align: right;
                display: flex;
                justify-content: flex-end;
                align-items: center;

                .cursor{
                    display: none;
                    @include block_outline(1px,20px);
                    background: #ff9a57;

                    &.move-status{
                        display: block;
                        animation: cursor-event 0.8s infinite;
                    }
                }
            }
        }
    }
</style>
