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
                            <FormItem :label="$t('colonSetting', { key : $t('marketType') })"
                                      :label-width="lang === 'zh-CN' ? 100 : 160">
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
                    <vueQRcode :previewable="true" v-if="codeInfo.registerUrl" :codeUrl="codeInfo.registerUrl" :width="140"></vueQRcode>
                </div>
                <Form ref="form"
                      class="show-form"
                      :label-width="100">
                    <i-row class="box-row">
                        <i-col span="24">
                            <!-- 营销类别 -->
                            <FormItem :label="$t('colonSetting', { key : $t('marketType') })"
                                      :label-width="lang === 'zh-CN' ? 100 : 150">
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
            <div class="box-footer" v-if="boxStatus !== 'null' && canOperateMarketType">
                <template v-if="boxStatus === 'show'">
                    <div class="btn"><i class="iconfont icon-edit"></i><span class="blue-btn" @click="edit">{{$t('edit')}}</span></div>
                    <div class="btn"><i class="iconfont icon-delete"></i><span class="warn-btn" @click="del">{{$t('del')}}</span></div>
                </template>
                <template v-if="boxStatus === 'add' || boxStatus === 'edit'">
                    <div class="btn"><span class="blue-btn" @click="save">{{$t('save')}}</span></div>
                    <div class="btn"><span @click="back">{{$t('cancel')}}</span></div>
                </template>
            </div>
        </transition>

        <delModal ref="delModal" class="del-min-width">
            <div class="del-modal">
                <i class="iconfont icon-help"></i>
                <span class="result">{{$t('sureToDelQRcode')}}</span>
                <span class="warn-tip">{{$t('operationIrrevocable')}}{{$t('sureToDel')}}</span>
            </div>
        </delModal>
    </div>
</template>

<script>
    import vueQRcode from './vueQRcode';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';
    import delModal from '@/components/delModal/index';
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
            vueQRcode,
            delModal
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
                'manageOrgs',
                'permissionInfo',
                'lang',
            ]),
            boxStatus : {
                get : function () {
                    return this.codeInfo.status;
                },
                set : function (newVal) {
                    this.codeInfo.status = newVal;
                }
            },
            //是否可以编辑营销类别
            canOperateMarketType () {
                return this.permissionInfo && 'operateMarketType' in this.permissionInfo;
            },
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
                this.$refs.delModal.show({
                    title : this.$t('notice'),
                    confirmCallback : () => {
                        this.boxStatus = 'null';
                        this.updateCode({ path : '', type : 'del' });
                        this.resetBox();
                    }
                });
            },
            /**
             * 接口保存二维码信息
             * @param {string} path
             * @param {string} type
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
                },
                deep : true
            }
        },
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

            .show-path {
                display: inline-block;
                height: 100px;
                overflow: auto;
                padding-right: 5px;
                &::-webkit-scrollbar {display:none}
                &:hover {
                    &::-webkit-scrollbar {display:block}
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
                position: relative;
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

                &:first-child:after {
                    position: absolute;
                    margin-top: -8px;
                    top: 50%;
                    right: 0px;
                    content: '';
                    height: 16px;
                    width: 1px;
                    background-color: #E8E8E8;
                }
            }

            .icon-edit {
                color: $color_blue;
                margin-right: 6px;
            }

            .icon-delete {
                color: $color_red;
                margin-right: 6px;
            }

        }
    }

    .del-modal {
        width: 80%;
        .icon-help {
            color: #EB6751;
        }

        .type-name {
            color: $color_yellow;
        }

        .result {
            color: $color_red;
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

    /deep/ .ivu-form-item {
        margin-bottom: 5px;
    }
</style>
