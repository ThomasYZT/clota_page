<!--
    手动推送模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal manual-push-modal"
               transfer
               width="450"
               :title="$t('手动推送')"
               @on-cancel="hide"
               :mask-closable="false">
            <div  class="form-wrapper">
                <Form v-show="step === 1"
                      ref="modalForm"
                      label-position="top"
                      :model="formData"
                      :rules="ruleValidate">
                    <FormItem :label="$t('选择要推送的会员卡级别:')" prop="levelIds">
                        <treeSelector v-model="formData.levelIds"
                                      v-if="step === 1 && visible"
                                      nodeKey="id"
                                      :defaultProps="{ label : 'levelDesc' }"
                                      :data="typeList"
                                      @on-change="resetField('levelIds')">

                        </treeSelector>
                    </FormItem>
                </Form>

                <div v-show="step === 2" class="content">
                    <span class="tip">是否确定推送？</span>
                </div>
            </div>

            <div slot="footer" class="modal-footer">
                <template v-if="step === 1">
                    <Button type="primary" @click="nextStep" >{{$t("下一步")}}</Button>
                    <Button type="ghost" @click="hide" >{{$t("close")}}</Button>
                </template>
                <template v-else>
                    <Button type="primary" @click="push" >{{$t("推送")}}</Button>
                    <Button type="ghost" @click="back" >{{$t("返回")}}</Button>
                </template>
            </div>
        </Modal>
    </div>
</template>

<script>
    import treeSelector from '../child/addCard/components/treeSelector';
    import ajax from '@/api/index';
    import { validateNum } from '../../validateMethods';
    export default {
        components : {
            treeSelector
        },
        data () {
            return {
                //是否显示模态框
                visible : false,
                //列表行数据
                rowData : {},
                //表单数据
                formData : {
                    //会员卡id
                    levelIds : [],
                },
                //会员卡类型列表
                typeList : [],
                //弹窗状态
                step : 1
            };
        },
        computed : {
            //校验规则
            ruleValidate () {
                return {
                    levelIds : [
                        { required : true, type : 'array', min : 1, message : this.$t('selectField',{ msg : this.$t('memberCardCategory') }), trigger : 'blur' },
                    ]
                }
            }
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.queryLevelsByCardType().then(() => {
                    this.rowData = data;
                    this.visible = true;
                });
            },
            /**
             *  下一步
             */
            nextStep () {
                this.$refs.modalForm.validate((valid) => {
                    if (valid) {
                        this.step = 2;
                    }
                });
            },
            /**
             * 确定推送
             */
            push () {
                ajax.post('manualPullCoupons', {
                    couponId : this.rowData.id,
                    levelIds : this.formData.levelIds.map(item => {
                        return item.id;
                    }).join(','),
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('推送') }));
                        this.hide();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('推送') }));
                    }
                })
            },
            /**
             *  返回
             */
            back () {
                this.step = 1;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.$refs.modalForm.resetFields();
                this.step = 1;
                this.typeList = [];
                this.rowData = {};
                this.visible = false;
            },
            /**
             *  查询会员卡级别列表数据
             */
            queryLevelsByCardType () {
                return new Promise((resolve, reject) => {
                    ajax.post('queryLevelsByCardType', {
                        cardTypeId : ''
                    }).then(res => {
                        if (res.success) {
                            this.typeList = res.data ? res.data : [];
                            resolve()
                        } else {
                            this.typeList = [];
                            reject();
                        }
                    });
                })
            },
            /**
             * 重置校验
             */
            resetField () {
                this.$refs.modalForm.validateField('levelIds');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        height: 280px;
        overflow: auto;
    }

    .manual-push-modal {
        .form-wrapper {
            margin: 0 auto;

            /deep/ .ivu-form-item {
                margin: 0;
            }

            /deep/ .ivu-form-item-content {
                text-align: center;
            }
            /deep/ .tree-selector {
                display: inline-block;
            }
        }

        .content {
            position: relative;
            height: 240px;
            .tip {
                @include center_center();
                font-size: 14px;
            }
        }
    }
</style>
