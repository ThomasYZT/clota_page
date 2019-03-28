<!--
    提交信息成功提示模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
         :title="$t('submitSuccess')"
         class-name="vertical-center-modal tip-modal"
         :mask-closable="false"
         width="400"
         @on-cancel="hide">

        <div class="modal-body">
            <div class="box-title">
                <h4 class="title">
                    <span class="iconfont icon-chenggong"></span>{{$t('submitDatumSuccess')}}
                </h4>
            </div>

            <div class="box-body">
                <span class="body-content">{{$t('registerSuccessTip', { info : email ? email : '-' })}}</span>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirm()" >{{$t("hasKnown")}}</Button>
        </div>
    </Modal>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                visible : false,
                email : '',
            };
        },
        methods : {
            /**
             * 控制模态框是否显示
             */
            show (data) {
                if (data) {
                    this.email = data;
                    this.visible = true;
                }
            },
            /**
             *  隐藏
             */
            hide () {
                this.email = '';
                this.visible = false;
            },
            /**
             * 确认
             */
            confirm () {
                this.$router.replace({
                    name : 'login'
                });
                this.hide();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .modal-body {
        .box-title {
            text-align: center;
            .title {
                font-size: 16px;
                color: #333;
                letter-spacing: 1.14px;

                .icon-chenggong {
                    margin-right: 10px;
                    color: #04BE5B;
                }
            }
        }

        .box-body {
            width: 80%;
            margin: 20px auto 0;
            text-align: center;
            .body-content {
                font-size: 12px;
                color: #606266;
            }
        }

    }
    /deep/ .ivu-modal-body {
        min-height: 164px;
    }
</style>
