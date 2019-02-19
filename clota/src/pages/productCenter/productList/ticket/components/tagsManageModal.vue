<!--
    标签管理模态框
    作者：杨泽涛
-->
<template>
    <div class="tags-manage-modal">
        <Modal v-model="visible"
               class-name="vertical-center-modal tags-manage"
               transfer
               width="500"
               :title="$t('产品标签：')"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="manager-wrapper">
                <div class="tool-box">
                    <div class="left-box">
                        <span class="tip" v-if="chosedTags.length >= 3">
                            最多只能添加3个标签
                        </span>
                    </div>
                    <div class="right-box">
                        <span class="manage-btn" v-if="!isManaging" @click="manage">{{$t('管理标签')}}</span>
                        <span class="manage-btn" @click="cancelManage" v-else>{{$t('cancel')}}</span>
                    </div>
                </div>

                <div class="tags-wrapper">
                    <productTag v-for="item in tagsList"
                                :checkable="!isManaging && item.canCheck"
                                :closable="isManaging"
                                :key="item.uid"
                                :name="item.name"
                                :chosed="item.chosed"
                                @closeTag="deleteTag"
                                @toggleChecked="toggleChecked">
                    </productTag>
                </div>

                <div class="form-wrapper">
                    <Form ref="tagForm"
                          :model="formData"
                          :rules="ruleValidate"
                          label-position="top">
                        <FormItem prop="name">
                            <Input v-model="formData.name"
                                   :placeholder="$t('请输入标签名称')" style="width: 200px" />
                            <span class="btn-inline" @click="validateTag">新增标签</span>
                        </FormItem>
                    </Form>
                </div>
            </div>

            <div slot="footer">
                <Button class="ivu-btn-90px" type="primary" @click="confirm">{{$t('confirm')}}</Button>
                <Button class="ivu-btn-90px" type="default" @click="hide">{{$t('cancel')}}</Button>
            </div>
        </Modal>

        <delModal ref="delModal">
            <div :class="$style.delTips">
                <Icon :class="$style.icon" type="help-circled"></Icon>
                <span :class="$style.redBale">以下{{inUsePList.length}}个产品正在使用这些标签，确定要删除这些标签吗？</span>
                <br><span :class="$style['blue-txt']" v-for="(item, index) in inUsePList" :key="index">{{item}}</span>
            </div>
        </delModal>
    </div>
</template>

<script>
    import productTag from '../components/productTag';
    import delModal from '@/components/delModal/index';
    import ajax from '@/api/index';
    export default {
        components : {
            productTag,
            delModal
        },
        data () {
            const validateMethods = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
            };
            return {
                //是否处于管理状态
                isManaging : false,
                //模态框是否显示
                visible : false,
                //标签列表
                tagsList : [],
                //选择的标签列表
                chosedTags : [],
                //新增标签表单数据
                formData : {
                    //标签名称
                    name : '',
                    //标签标识
                    scene : 'product_tag'
                },
                //表单校验方法
                validateMethods : validateMethods,
                //正在使用标签的产品列表
                inUsePList : [],
            };
        },
        computed : {
            //表单校验规则
            ruleValidate () {
                return {
                    name : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('标签名称') }), trigger : 'blur' },
                        { max : 10, message : this.$t('errorMaxLength', { field : this.$t('标签名称'), length : 10 }), trigger : 'blur' },
                        { validator : this.validateMethods.emoji, trigger : 'blur' },
                    ]
                };
            }
        },
        methods : {
            /**
             *  显示模态框
             *  @param chosedTags 已选择的标签
             */
            show ({chosedTags}) {
                this.chosedTags = chosedTags;
                this.queryTagDefines(this.chosedTags);
            },
            /**
             *  标签选择数量控制控制
             */
            limitControl () {
                if (this.chosedTags.length >= 3) {
                    this.tagsList.forEach(item => {
                        if (this.chosedTags.find((tag) => {
                            return tag.id === item.id;
                        })) {
                            this.$set(item, 'canCheck', true);
                        } else {
                            this.$set(item, 'canCheck', false);
                        }
                    });
                } else {
                    this.tagsList.forEach((item) => {
                        this.$set(item, 'canCheck', true);
                    });
                }
            },
            /**
             * 关闭模态框
             */
            hide () {
                this.$refs.tagForm.resetFields();
                this.isManaging = false;
                this.chosedTags = [];
                this.tagsList = [];
                this.visible = false;
            },
            /**
             * 确定并保存设置
             */
            confirm () {
                this.$emit('updateTags', this.chosedTags);
                this.hide();
            },
            /**
             * 管理标签
             */
            manage () {
                this.isManaging = true;
            },
            /**
             * 取消管理标签
             */
            cancelManage () {
                this.isManaging = false;
            },
            /**
             *  校验标签标签
             */
            validateTag () {
                this.$refs.tagForm.validate((valid) => {
                    if (valid) {
                        this.addTag();
                    }
                });
            },
            /**
             *  新增标签
             */
            addTag () {
                ajax.post('addTagDefine', {
                    name : this.formData.name,
                    scene : this.formData.scene,
                }).then((res) => {
                    if (res.success) {
                        this.$refs.tagForm.resetFields();
                        this.queryTagDefines(this.chosedTags).then(() => {
                            // this.chosedTags.push(this.tagsList[this.tagsList.length - 1]);
                            // this.tagsList.forEach(item => {
                            //     if (this.chosedTags.find(tag => {
                            //         return tag.id === item.id;
                            //     })) {
                            //         item.chosed = true;
                            //     } else {
                            //         item.chosed = false;
                            //     }
                            // });
                            // this.limitControl();
                        });
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                    } else {
                        if (res.code && res.code === 'S015') {
                            this.$Message.error(this.$t(res.code));
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                        }
                    }
                });
            },
            /**
             *  标签选中状态改变
             * @param type 标签选中状态
             * @param name 标签名称
             */
            toggleChecked ({type, name}) {
                if (type) {
                    //最多不能超过3个标签
                    if (this.chosedTags.length < 3) {
                        this.chosedTags.push(this.tagsList.find((item) => {
                            return item.name === name;
                        }));
                    }
                } else {
                    this.chosedTags.splice(this.chosedTags.findIndex((item) => {
                        return item.name === name;
                    }), 1);
                }
                this.limitControl();
            },
            /**
             * 查询标签列表
             * @param tags 已选择的标签
             */
            queryTagDefines (tags) {
                return new Promise((resolve, reject) => {
                    ajax.post('queryTagDefines', {
                        scene : 'product_tag'
                    }).then(res => {
                        if (res.success) {
                            this.tagsList = res.data ? res.data : [];
                            this.tagsList.forEach(item => {
                                if (tags.find(tag => {
                                    return tag.id === item.id;
                                })) {
                                    item.chosed = true;
                                } else {
                                    item.chosed = false;
                                }
                            });
                            this.limitControl();
                            this.visible = true;
                            resolve();
                        } else {
                            this.tagsList = [];
                            this.visible = false;
                            reject();
                        }
                    });
                })
            },
            /**
             * 删除标签
             * @param name 标签名称
             */
            deleteTag (name) {
                let _tag = this.tagsList.find((item) => {
                    return item.name === name;
                })
                //删除标签校验
                this.validateTagDelete(_tag);
            },
            /**
             * 删除标签校验
             * @param tag
             */
            validateTagDelete (tag) {
                ajax.post('deleteProductTags', {
                    ids : tag.id,
                }).then((res) => {
                    if (res.success) {
                        this.queryTagDefines(this.chosedTags);
                        this.chosedTags.splice(this.chosedTags.findIndex(item => {
                            return tag.id === item.id;
                        }), 1);
                        this.$emit('deleteTag', tag)
                        this.$Message.success(this.$t('successTip', { tip : this.$t('delete') }));
                    } else {
                        this.inUsePList = [];
                        for (let key in res.data) {
                            this.inUsePList.push(key);
                        }
                        this.$refs.delModal.show({
                            title : this.$t('删除产品标签'),
                            confirmCallback : () => {
                                this.forceDelete(tag);
                            }
                        })
                    }
                })
            },
            /**
             * 强制删除标签
             * @param tag
             */
            forceDelete (tag) {
                ajax.post('forceDeleteTagDefines', {
                    ids : tag.id
                }).then((res) => {
                    if (res.success) {
                        this.queryTagDefines(this.chosedTags);
                        this.$emit('deleteTag', tag);
                        this.chosedTags.splice(this.chosedTags.findIndex(item => {
                            return tag.id === item.id;
                        }), 1);
                        this.$Message.success(this.$t('successTip', { tip : this.$t('delete') }));
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('delete') }));
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        position: relative;
        min-height: 168px;
    }

    .tags-manage {
        .manager-wrapper {
            .tool-box {
                display: flex;
                .left-box {
                    flex: 1 0;
                    flex-basis: 50%;

                    .tip {
                        color: $color_yellow;
                    }
                }
                .right-box {
                    flex: 1 0;
                    flex-basis: 50%;
                    text-align: right;
                    .manage-btn {
                        margin-right: 5px;
                        font-size: 12px;
                        color: $color_blue;
                        cursor: pointer;
                    }
                }
            }
        }

        .tags-wrapper {
            min-height: 100px;
        }

        .form-wrapper {
            position: relative;
            height: 50px;
            form {
                @include center_center();
            }
            .btn-inline {
                font-size: 12px;
                color: $color_blue;
                cursor: pointer;
            }
        }
    }
</style>
<style module lang="scss">
    .delTips{
        position: absolute;
        padding: 0 76px 0 106px;
        color: #333333;
        font-size: 14px;
    }

    .icon{
        position: absolute;
        left: 88px;
        top : 2px;
        font-size: 15px;
        color: #EB6751;
    }

    .redBale {
        color: #ED3F14;
    }

    .blue-txt {
        color: #2F70DF;
        margin-right: 5px;
    }
</style>
