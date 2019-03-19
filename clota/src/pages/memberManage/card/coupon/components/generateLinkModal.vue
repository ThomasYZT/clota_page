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
                <Form ref="formValidate"
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
                        <span>{{rowData.couponName | contentFilter}}</span>
                    </FormItem>
                    <!-- 链接地址 -->
                    <FormItem :label="$t('urLink')" prop="preUrl">
                        <Input v-model.trim="formData.preUrl"></Input>
                    </FormItem>
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
    import { validateNum } from '../../validateMethods';
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
                    //链接地址
                    preUrl : '',
                    //生成数量
                    needCount : '',
                },
                link : '',
            };
        },
        computed : {
            //表单校验规则
            ruleValidate () {
                return {
                    preUrl : [ //链接地址
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('urLink') }), trigger : 'blur' },
                        { type : 'string', max : 30, message : this.$t('errorMaxLength', { field : this.$t('urLink'), length : 30 }), trigger : 'blur' }, // 不能多于30个字符
                    ],
                    needCount : [ //生成数量
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('generationNum') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'generationNum' },
                    ],
                }
            }
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
                this.link = '';
                this.rowData = {};
                this.editing = true;
                this.visible = false;
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
            margin: 0 auto;
        }
    }
</style>
