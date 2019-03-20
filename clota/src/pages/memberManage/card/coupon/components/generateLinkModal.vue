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
                      label-position="left">
                    <!-- 优惠券名称 -->
                    <FormItem :label="$t('couponNameV2')">
                        <span>{{rowData.couponName | contentFilter}}</span>
                    </FormItem>
                    <!-- 可生成数量 -->
                    <FormItem :label="$t('generatedQuantity')">
                        <span>{{countWaitNum | contentFilter}}</span>
                    </FormItem>
                    <!--&lt;!&ndash; 链接地址 &ndash;&gt;-->
                    <!--<FormItem :label="$t('urLink')" prop="preUrl">-->
                        <!--<Input v-model.trim="formData.preUrl"></Input>-->
                    <!--</FormItem>-->
                    <!-- 生成数量 -->
                    <FormItem :label="$t('generationNum')" prop="needCount">
                        <Input v-model.trim="formData.needCount"></Input>
                    </FormItem>
                </Form>
            </div>

            <!-- 步骤2 -->
            <div class="step-2" v-else>
                <span>{{link}}</span>
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
                }
            },
            /**
             *  链接
             */
            preUrl () {
                return location.origin + '/clota/mobile/member/getCoupon?';
            }
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
                this.generateLinks().then(link => {
                    this.editing = false;
                    this.link = link;
                }).catch(code => {
                    if (code) {
                        this.$Message.error(this.$t(code));
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('generate') }));
                    }
                });
            },
            /**
             *  生成链接
             */
            generateLinks () {
                return new Promise((resolve, reject) => {
                    ajax.post('generateLinks', {
                        couponId : this.rowData.id,
                        preUrl : this.preUrl,
                        ...this.formData
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
                    })
                })
            }
        }
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
            margin: 100px auto 0px;
            word-break: break-all;
        }
    }
</style>
