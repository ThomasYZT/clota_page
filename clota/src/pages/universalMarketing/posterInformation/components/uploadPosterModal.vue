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
                                   style="width:200px;"
                                   v-model.trim="formData.posterName"
                                   :placeholder="$t('inputField', { field : $t('posterName') })"/>
                        </FormItem>
                        <FormItem :label="$t('colonSetting', { key : $t('industryType') })"  prop="industryType">
                            <Select v-model="formData.industryType"
                                    :placeholder="$t('selectField', { msg : $t('industryType') })"
                                    show-name
                                    style="width:200px">
                                <Option v-for="item in industryTypeList"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem :label="$t('colonSetting', { key : $t('scenePlace') })"  prop="scenePlace">
                            <Select v-model="formData.scenePlace"
                                    :placeholder="$t('selectField', { msg : $t('scenePlace') })"
                                    show-name
                                    style="width:200px">
                                <Option v-for="item in scenePlaceList"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem :label="$t('colonSetting', { key : $t('uploadPicture') })"  prop="img">
                            <uploadImg v-if="visible"
                                       :quantityLimit="1"
                                       @remove-img="removeImg"
                                       @upload-success="uploadSuccess"></uploadImg>
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
    import uploadImg from './uploadImg';
    export default {
        components : {
            uploadImg
        },
        data () {
            //上传文件类型校验
            const fileType = (rule, value, callback) => {
                let reg = /\.(bmp|jpg|png|JPG|PNG|BMP)$/;
                if (!reg.test(value)) {
                    callback(new Error(this.$t('errorFormat', { field : this.$t('picture') })));
                } else {
                    callback();
                }
            };

            return {
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    posterName : '',
                    scenePlace : '',
                    industryType : '',
                    img : []
                },
                //表单验证规则
                ruleValidate : {
                    posterName : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('posterName') }), trigger : 'blur' },
                        { type : 'string', max : 20, message : this.$t('errorMaxLength',{ field : this.$t('posterName'),length : 20 }), trigger : 'blur' },
                    ],
                    scenePlace : [
                        { required : true, message : this.$t('selectField',{ msg : this.$t('scenePlace') }), trigger : 'blur' },
                    ],
                    industryType : [
                        { required : true, message : this.$t('selectField',{ msg : this.$t('industryType') }), trigger : 'blur' },
                    ],
                    img : [
                        { required : true, type : 'array', min : 1, message : this.$t('pleaseUploadImgAtleastOne'), trigger : 'blur' },
                        { validator : fileType, trigger : 'blur' }
                    ]
                },
                //业态类型下拉列表
                industryTypeList : [],
                scenePlaceList : []
            };
        },
        methods : {
            /**
             * 显示、隐藏模态框
             */
            toggle () {
                this.formData = {
                    posterName : '',
                    scenePlace : '',
                    industryType : '',
                    img : []
                };
                this.industryTypeList = [
                    {
                        label : '111',
                        value : '111'
                    },
                    {
                        label : '222',
                        value : '222'
                    },
                    {
                        label : '333',
                        value : '333'
                    },
                    {
                        label : '444',
                        value : '444'
                    }
                ];
                this.scenePlaceList = [
                    {
                        label : '111',
                        value : '111'
                    },
                    {
                        label : '222',
                        value : '222'
                    },
                    {
                        label : '333',
                        value : '333'
                    },
                    {
                        label : '444',
                        value : '444'
                    }
                ];
                this.$refs.form.resetFields();
                this.visible = !this.visible;
            },
            /**
             * 上传
             */
            upload () {
                this.$refs.form.validate((valid) => {
                    if (valid) {

                    }
                })
            },
            /**
             *  删除图片
             * @param uploadList
             */
            removeImg (uploadList) {
                this.formData.img = uploadList;
                this.$refs.form.validateField('img');
            },
            /**
             *  上传图片成功
             * @param uploadList
             */
            uploadSuccess (uploadList) {
                this.formData.img = uploadList;
                this.$refs.form.validateField('img');
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
