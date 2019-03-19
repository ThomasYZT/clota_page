<!--
    作废优惠券模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal obsolete-modal"
               transfer
               width="420"
               :title="$t('obsolete')"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="modal-content">
                <div class="center-modal">
                    <p class="label-title">
                        <i class="iconfont icon-help"></i>
                        <span> {{$t('sureToObsolete')}} </span>
                    </p>
                    <span class="label-title">{{$t('isContinuesEffective')}}</span><br>
                    <RadioGroup v-model="cancelEff">
                        <Radio label="true">{{$t('continuesEffective')}}</Radio><!--可同时使用-->
                        <Radio label="false">{{$t('allFailed')}}</Radio><!--不可同时使用-->
                    </RadioGroup>
                </div>

                <p class="tip">{{$t('obsoleteTip')}}</p>
            </div>

            <div slot="footer" class="modal-footer">
                <Button type="error" class="ivu-btn-90px" @click="confirm" >{{$t("submit")}}</Button>
                <Button type="ghost" class="ivu-btn-90px" @click="hide" >{{$t("cancel")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep'
    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                visible : false,
                //列表行数据
                rowData : {},
                //已兑换、已领取的卡券是否继续有效
                cancelEff : 'true',
            };
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.rowData = data;
                this.visible = true;
            },
            /**
             * 确认
             */
            confirm () {
                ajax.post('updateCoupon', {
                    id : this.rowData.id,
                    cancelEff : this.cancelEff,
                    status : 'invalid',
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('obsolete') }));
                        this.$emit('updateList');
                        this.hide();
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('obsolete') }));
                    }
                });
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.cancelEff = "true";
                this.rowData = {};
                this.visible = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        min-height: 184px;
        overflow: auto;
    }

    .obsolete-modal {
        .modal-content {
            position: relative;
            width: 100%;
            height: 144px;

            .center-modal {
                @include center_center();
                bottom: 40px;

            }
        }

        .label-title {
            color: #333333;
            font-size: 14px;
            line-height: 24px;
        }

        .icon-help {
            color: $color_red;
        }

        .tip {
            width: 100%;
            height: 20px;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -15px;
            text-align: center;
            font-size: 12px;
            color: $color_red;
        }
    }
</style>
