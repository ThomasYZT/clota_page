<!--
    二维码新增、编辑、展示组件 null、add、edit、show三种状态
    作者：杨泽涛
-->
<template>
    <div class="code-box" :class="[boxStatus+'-code-box']">
        <!-- 无二维码信息区域 -->

        <transition name="fade">
            <div v-if="boxStatus === 'null'" class="null-box" @click="add">
                <span> + {{$t('addNewCode')}}</span>
            </div>
        </transition>

        <!-- 新增、编辑二维码区域 -->
        <transition name="fade">
            <div class="add-box" v-if="boxStatus === 'add' || boxStatus === 'edit'">
                <Form ref="form"
                      :model="formData"
                      :rules="ruleValidate"
                      :label-width="100">
                    <i-row class="box-row">
                        <i-col span="24">
                            <!-- 营销类别 -->
                            <FormItem :label="$t('colonSetting', { key : $t('marketType') })">
                                <span>{{codeInfo.typeName | contentFilter}}</span>
                            </FormItem>

                            <!-- 路径 -->
                            <FormItem :label="$t('colonSetting', { key : $t('path') })"  prop="path">
                                <Input style="width:170px;"
                                       type="textarea"
                                       :rows="7"
                                       v-model.trim="formData.path"
                                       :placeholder="$t('inputField', { field : $t('path') })"/>
                            </FormItem>
                        </i-col>
                    </i-row>
                </Form>
            </div>
        </transition>

        <!-- 展示二维码区域 -->
        <transition name="fade">
            <div class="show-box" v-if="boxStatus === 'show'">
                <div class="code-wrapper">
                    <vueQRcode v-if="codeInfo.registerUrl" :codeUrl="codeInfo.registerUrl" :width="140"></vueQRcode>
                </div>
                <Form ref="form"
                      class="show-form"
                      :label-width="100">
                    <i-row class="box-row">
                        <i-col span="24">
                            <!-- 营销类别 -->
                            <FormItem :label="$t('colonSetting', { key : $t('marketType') })">
                                <span>{{codeInfo.typeName | contentFilter}}</span>
                            </FormItem>

                            <!-- 路径 -->
                            <FormItem :label="$t('colonSetting', { key : $t('path') })"  prop="path">
                                <span class="show-path">{{codeInfo.registerUrl}}</span>
                            </FormItem>
                        </i-col>
                    </i-row>
                </Form>
            </div>
        </transition>

        <!-- 底部按钮区域 -->
        <transition name="fade">
            <div class="box-footer" v-if="boxStatus !== 'null'">
                <template v-if="boxStatus === 'show'">
                    <div class="btn"><span class="blue-btn" @click="edit">{{$t('edit')}}</span></div>
                    <div class="btn"><span class="warn-btn" @click="del">{{$t('del')}}</span></div>
                </template>
                <template v-if="boxStatus === 'add' || boxStatus === 'edit'">
                    <div class="btn"><span class="blue-btn" @click="save">{{$t('save')}}</span></div>
                    <div class="btn"><span @click="back">{{$t('cancel')}}</span></div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>
    import vueQRcode from './vueQRcode';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            codeInfo : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            vueQRcode
        },
        data () {
            return {
                formData : {
                    //路径
                    path : '',
                },
                ruleValidate : {
                    path : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('path') }), trigger : 'blur' },
                    ],
                },
            };
        },
        computed : {
            ...mapGetters([
                'manageOrgs'
            ]),
            boxStatus : {
                get : function () {
                    return this.codeInfo.status;
                },
                set : function (newVal) {
                    this.codeInfo.status = newVal;
                }
            }
        },
        methods : {
            /**
             * 新增
             */
            add () {
                this.boxStatus = 'add';
            },
            /**
             * 保存
             */
            save () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        //接口保存二维码信息
                        this.formData.path = this.formData.path + '?Ycode=' + this.manageOrgs.saleCode
                                                                + '&Ucid=' + this.codeInfo.id;
                        this.updateCode({ path : this.formData.path, type : this.boxStatus });
                    }
                });
            },
            /**
             * 编辑
             */
            edit () {
                this.formData.path = this.codeInfo.registerUrl.split('?')[0];
                this.boxStatus = 'edit';
            },
            /**
             * 返回
             */
            back () {
                if (this.boxStatus === 'add') {
                    this.boxStatus = 'null';
                } else if (this.boxStatus === 'edit') {
                    this.boxStatus = 'show';
                }
                this.resetBox();
            },
            /**
             * 重置
             */
            resetBox () {
                if (this.boxStatus === 'add' || this.boxStatus === 'edit') {
                    this.$refs.form.resetFields();
                } else {
                    this.formData = { path : '' };
                }
            },
            /**
             * 删除
             */
            del () {
                this.boxStatus = 'null';
                this.updateCode({ path : '', type : 'del' });
                this.resetBox();
            },
            /**
             * 接口保存二维码信息
             */
            updateCode ({ path, type }) {
                ajax.post('marketing-updateType', {
                    id : this.codeInfo.id,
                    registerUrl : path
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t(type) }));
                        this.boxStatus = 'show';
                        if (type === 'add' || type === 'edit') {
                            this.resetBox();
                        }
                        this.$emit('updateSuccess');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t(type) }));
                    }
                });
            },
        },
        watch : {
            codeInfo : {
                handler () {
                    this.resetBox();
                }
            },
            deep : true
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';


    .code-box {
        position: relative;
        width: 300px;
        height: 350px;
        border-radius: 8px;


        .null-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            color: $color_blue;
            font-size: 16px;
            line-height: 350px;
            text-align: center;
        }

        .show-box, .add-box {
            position: absolute;
            top: 0;
            left: 0;
            height: 310px;
            width: 100%;
        }

        .add-box, .show-box {
            padding-top: 70px;

        }
        .show-box {
            padding: 0;
            margin-left: 10%;
            width: 80%;
            word-break: break-all;

            .code-wrapper {
                margin-top: 20px;
                text-align: center;
            }
            .show-form {
                /deep/ .ivu-form-item-content {
                    line-height: 20px;
                }

                /deep/ .ivu-form-item-label {
                    padding: 3px 3px 0px 10px;
                }
            }

        }

        .box-footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 40px;
            display: flex;
            background-color: #F7F9FA;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            .btn {
                flex: 1 0;
                height: 100%;
                width: 100%;
                line-height: 40px;
                text-align: center;

                span {
                    cursor: pointer;
                }

                .blue-btn {
                    color: $color_blue;
                }

                .warn-btn {
                    color: $color_red;
                }
            }

        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .null-code-box {
        border: 1px dashed #D9D9D9;
    }

    .add-code-box, .edit-code-box {
        border: 1px solid #D9D9D9;
        box-shadow: #D9D9D9 0px 0px 10px 1px;
    }

    .show-code-box {
        border: 1px solid #D9D9D9;
    }
</style>
