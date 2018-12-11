<!--
    编辑面板组件
    作者：杨泽涛
-->
<template>
    <div class="edit-panel">
        <template v-if="nowfileItem.type === 'new-file' || nowfileItem.type === 'edit-file'">
            <div class="form-wrapper">
                <Form ref="form"
                      inline
                      label-position="left"
                      :label-width="300"
                      :model="formData"
                      :rules="ruleValidate">
                    <FormItem :label="$t('pageTitle')" class="title-form-item">
                        <Input v-model="formData.title" :placeholder="$t('inputField', { field : this.$t('pageTitle') } )" style="width:400px;"></Input>
                    </FormItem>
                    <FormItem label="" :label-width="0" class="edit-form-item">
                        <UE :defaultMsg="defaultMsg" :config="config" id="ue" ref="ue"></UE>
                    </FormItem>
                </Form>
            </div>

            <div class="btn-wrapper">
                <Button type="primary" class="ivu-btn-90px" @click="save">保存</Button>
                <Button type="ghost" class="ivu-btn-90px" @click="cancel">取消</Button>
            </div>
        </template>
        <template v-else-if="nowfileItem.type === 'show-file'">
            <h4>{{nowfileItem.name}}</h4>
            <div v-html="nowfileItem.content"></div>
        </template>
        <template v-else>
            <div class="no-data-wrapper">
                <noDataTip></noDataTip>
            </div>
        </template>
    </div>
</template>

<script>
    import UE from '@/components/ue/ue.vue';
    import noDataTip from '@/components/noDataTip/noData-tip';
    import ajax from '@/api/index';
    export default {
        props : {
            nowfileItem : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            noDataTip,
            UE
        },
        data () {
            return {
                //校验规则
                ruleValidate : {},
                //表单数据
                formData : {
                    folderId : '',
                    title : '',
                    picsIDs : []
                },
                defaultMsg : '',
                config : {
                    initialFrameWidth : null,
                    initialFrameHeight : 400
                },
            };
        },
        methods : {
            save () {
                ajax.post('addPage', {
                    folderId : this.nowfileItem.folderId,
                    title : this.formData.title,
                    content : this.$refs.ue.getUEContent(),
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                    }
                })
            },
            cancel () {

            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-panel {
        width: 100%;
        height: 100%;

        .form-wrapper {
            width: 100%;
            margin: 0 auto;

            .title-form-item {
                display: inline-block;
                width: 100%;
                height: 34px;

                /deep/ .ivu-form-item-label {
                    text-align: right;
                }
            }

            .edit-form-item {
               /deep/ .ivu-form-item-content {
                   margin-left: 0 !important;
               }
            }
        }
        .btn-wrapper {
            text-align: center;

            .ivu-btn-90px {
                margin-right: 10px;
            }
        }

        .no-data-wrapper {
            width: 100%;
            height: 100%;
            position: relative;
        }
    }

</style>
