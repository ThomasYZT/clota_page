<!--
    生成链接模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal generate-link-modal"
               transfer
               width="600"
               :title="$t('generateLink')"
               @on-cancel="hide"
               :mask-closable="false">
            <!-- 步骤1 -->
            <div class="step-1" v-if="editing">
                <Form v-if="isFormShow"
                      ref="formValidate"
                      :model="formData"
                      :rules="ruleValidate"
                      :label-width="120"
                      label-position="right">
                    <!-- 优惠券名称 -->
                    <FormItem :label="$t('couponNameV2')">
                        <span>{{rowData.couponName | contentFilter}}</span>
                    </FormItem>
                    <!-- 可生成数量 -->
                    <FormItem :label="$t('generatedQuantity')">
                        <span>{{countWaitNum | contentFilter}}</span>
                    </FormItem>
                    <!-- 链接地址 -->
                    <FormItem :label="$t('urLink')" prop="preUrl">
                        <Input v-model.trim="formData.preUrl"/>
                    </FormItem>
                    <!-- 生成数量 -->
                    <FormItem :label="$t('generationNum')" prop="needCount">
                        <Input v-model.trim="formData.needCount"/>
                    </FormItem>
                </Form>
            </div>

            <!-- 步骤2 -->
            <div ref="step2" class="step-2" v-else>
                <Input :value="link" style="width: 410px" readonly id="_coupon-copy-target-btn">
                    <span slot="append"
                          id="_coupon_copy-btn"
                          data-clipboard-action="copy"
                          :data-clipboard-target="'#_coupon-copy-target-btn .ivu-input'">{{$t('copy')}}</span>
                </Input>
            </div>

            <div v-if="editing"
                 slot="footer"
                 class="modal-footer">
                <Button type="primary" @click="nextStep()" >{{$t("generate")}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </div>
            <div v-else
                 slot="footer"
                 class="modal-footer">
                <Button type="ghost" @click="hide" >{{$t("close")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import { validateNum, noBiggerValidate } from '../../validateMethods';
    import { validator } from 'klwk-ui';

    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                visible : false,
                //数据是否处于编辑中
                editing : true,
                //列表行数据
                rowData : {},
                //表单数据
                formData : {
                    //生成数量
                    needCount : '',
                    //链接地址
                    preUrl : ''
                },
                //链接地址
                link : '',
                //可生成数量
                countWaitNum : 0,
                //表单是否显示
                isFormShow : false,
            };
        },
        computed : {
            //表单校验规则
            ruleValidate () {
                return {
                    needCount : [ //生成数量
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('generationNum') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'generationNum' },
                        { validator : noBiggerValidate, trigger : 'blur',
                          customField : 'generationNum',
                          compareFeild : 'generatedQuantity',
                          compareValue : this.countWaitNum }
                    ],
                    preUrl : [
                        {
                            required : true,
                            trigger : 'blur',
                            validator : this.validateHttp
                        }
                    ]
                };
            },
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.rowData = data;
                this.queryCountWaitNum().then(() => {
                    this.visible = true;
                });
            },
            /**
             * 下一步 生成链接
             */
            nextStep () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.generateLinks().then(link => {
                            this.editing = false;
                            this.link = link;
                            this.setClipboardAction();
                        }).catch(code => {
                            if (code) {
                                this.$Message.error(this.$t(code));
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('generate') }));
                            }
                        });
                    }

                });
            },
            /**
             *  生成链接
             */
            generateLinks () {
                return new Promise((resolve, reject) => {
                    ajax.post('generateLinks', {
                        ...this.formData,
                        couponId : this.rowData.id,
                        preUrl : this.formData.preUrl + '?'
                    }).then(res => {
                        if (res.success) {
                            res.data ? resolve(res.data) : reject();
                        } else {
                            reject(res.code);
                        }
                    });
                });
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.formData = {
                    needCount : '',
                };
                this.countWaitNum = 0;
                this.isFormShow = false;
                this.link = '';
                this.rowData = {};
                this.editing = true;
                this.visible = false;
            },
            /**
             * 查询可生成数量
             */
            queryCountWaitNum () {
                return new Promise((resolve, reject) => {
                    ajax.post('countWaitNum', {
                        couponId : this.rowData.id,
                    }).then(res => {
                        if (res.success) {
                            this.countWaitNum = res.data ? res.data : 0;
                            this.isFormShow = true;
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            },
            /**
             * 校验链接地址
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 回调地址
             */
            validateHttp (rule,value,callback) {
                if (value) {
                    if (validator.isUrl(value)) {
                        callback();
                    } else {
                        callback(this.$t('errorFormat',{ field : this.$t('urLink') }));
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('urLink') }));
                }
            },
            /**
             * 设置复制到剪贴板功能
             */
            setClipboardAction () {
                this.$nextTick(() => {
                    let btnEle = document.querySelector('#_coupon_copy-btn');
                    let copyBtn = null;
                    if (btnEle) {
                        copyBtn = new this.Clipboard(btnEle);
                        //复制到剪贴板成功
                        copyBtn.on('success', () => {
                            this.$Message.success(this.$t('copyToClipBoard',{ field : this.$t('urLink') }));
                        });
                        //复制到剪贴板失败
                        copyBtn.on('error', () => {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('copy') }));
                        });
                    }
                });
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        height: 300px;
        overflow: auto;
    }
    .generate-link-modal {
        .step-1 {
            width: 70%;
            margin: 30px auto 0px;
        }

        .step-2 {
            width: 70%;
            margin: 125px auto 0px;
            word-break: break-all;
        }

        .inline-btn {
            color: $color_blue;
            cursor: pointer;
        }
    }

    /deep/ .ivu-input-group-append{
        cursor: pointer;
    }
</style>
