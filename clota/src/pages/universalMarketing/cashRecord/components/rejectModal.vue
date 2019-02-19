<!--
内容：驳回提现申请
作者：djc
日期：
-->

<template>
    <Modal
        v-model="visible"
        class-name="vertical-center-modal"
        :mask-closable="false"
        :width="400"
        :title="$t('reject')"
        @on-cancel="hide">

        <!--内容区域-->
        <div style="padding: 15px 20px;">
            <i class="iconfont icon-warn"></i>
            <span class="tip-word">{{$t('wetherCanApplyCashAfterReject')}}</span>
        </div>
        <!--自定义页脚-->
        <div slot="footer">
            <i-button class="ivu-btn-90px"
                      type="primary"
                      @click="handleAllow('reject')">
                {{$t('allow')}}
            </i-button>
            <i-button class="ivu-btn-90px"
                      type="ghost"
                      @click="handleAllow('reject_no_req')">
                {{$t('notAllowWithoutfield')}}
            </i-button>
        </div>
    </Modal>
</template>
<script>

    export default {
        data () {
            return {
                visible : false, //显示模态框变量
            };
        },
        methods : {
            /**
             * 显示模态框
             */
            show () {
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.visible = false;
            },
            /**
             * 是否允许驳回后再申请提现的处理
             * @param status  String  reject|reject_no_req
             */
            handleAllow (status) {
                this.$emit('on-allow', status);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .icon-warn {
        color: $color_yellow;
    }

    /deep/ .ivu-modal-body{
        min-height: 164px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tip-word {
        margin-left: 8px;
        font-size: 14px;
        color: $color_333;
        vertical-align: middle;
    }
</style>
