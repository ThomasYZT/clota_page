<!--
    上传海报组件
    作者：杨泽涛
-->
<template>
    <Modal class="upload-poster-modal"
           v-model="visible"
           :title="$t('uploadPoster')"
           class-name="vertical-center-modal"
           width="600"
           :mask-closable="false">
        <div class="form-wrapper">
            <Form ref="form"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="150">
                <i-row>
                    <i-col span="18" offset="3">
                        <FormItem :label="$t('colonSetting', { key : $t('posterName') })" prop="posterName">
                            <Input type="text"
                                   prefix="ios-contact"
                                   style="width:200px;"
                                   v-model.trim="formData.posterName"
                                   :placeholder="$t('posterName')"/>
                        </FormItem>
                        <FormItem :label="$t('colonSetting', { key : $t('industryType') })">
                            <Select v-model="formData.industryType"
                                    :placeholder="$t('industryType')"
                                    show-name
                                    style="width:200px">
                                <Option v-for="item in industryTypeList"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem :label="$t('colonSetting', { key : $t('scenePlace') })">
                            <Select v-model="formData.scenePlace"
                                    :placeholder="$t('scenePlace')"
                                    show-name
                                    style="width:200px">
                                <Option v-for="item in scenePlaceList"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem :label="$t('colonSetting', { key : $t('uploadPicture') })">

                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button class="ivu-btn-90px"
                    type="primary"
                    @click="upload" >{{$t('save')}}</Button>
            <Button class="ivu-btn-90px"
                    type="ghost"
                    @click="toggle" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    posterName : '',
                    scenePlace : '',
                    industryType : ''
                },
                //表单验证规则
                ruleValidate : {

                },
                //业态类型下拉列表
                industryTypeList : [
                    {
                        label : '111',
                        value : 111
                    },
                    {
                        label : '222',
                        value : 222
                    },
                    {
                        label : '333',
                        value : 333
                    },
                    {
                        label : '444',
                        value : 444
                    }
                ],
                scenePlaceList : [
                    {
                        label : '111',
                        value : 111
                    },
                    {
                        label : '222',
                        value : 222
                    },
                    {
                        label : '333',
                        value : 333
                    },
                    {
                        label : '444',
                        value : 444
                    }
                ]
            };
        },
        methods : {
            /**
             * 显示、隐藏模态框
             */
            toggle () {
                this.visible = !this.visible;
            },
            /**
             * 上传
             */
            upload () {

            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
