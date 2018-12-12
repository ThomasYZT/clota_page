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
                        <!-- 业态类型下拉框暂不需要 -->
                        <!--<FormItem :label="$t('colonSetting', { key : $t('industryType') })"  prop="posterType">-->
                            <!--<Select v-model="formData.posterType"-->
                                    <!--:placeholder="$t('selectField', { msg : $t('industryType') })"-->
                                    <!--show-name-->
                                    <!--style="width:200px">-->
                                <!--<Option v-for="item in posterTypeList"-->
                                        <!--:value="item.value"-->
                                        <!--:key="item.value">{{ item.label }}-->
                                <!--</Option>-->
                            <!--</Select>-->
                        <!--</FormItem>-->
                        <!-- 所属景区下拉框暂不需要 -->
                        <!--<FormItem :label="$t('colonSetting', { key : $t('scenePlace') })"  prop="scenePlace">-->
                            <!--<Select v-model="formData.scenePlace"-->
                                    <!--:placeholder="$t('selectField', { msg : $t('scenePlace') })"-->
                                    <!--show-name-->
                                    <!--style="width:200px">-->
                                <!--<Option v-for="item in scenePlaceList"-->
                                        <!--:value="item.value"-->
                                        <!--:key="item.value">{{ item.label }}-->
                                <!--</Option>-->
                            <!--</Select>-->
                            <!--<span>{{manageOrgs.orgName}}</span>-->
                        <!--</FormItem>-->
                        <FormItem :label="$t('colonSetting', { key : $t('uploadPicture') })"  prop="img">
                            <uploadImg v-if="visible"
                                       :quantityLimit="1"
                                       :size="20"
                                       :format="['jpeg','png','bmp']"
                                       @remove-img="removeImg"
                                       @upload-success="uploadSuccess"></uploadImg>

                            <span class="format-info">{{$t('colonSetting', { key : $t('imgFormat') })}} PNG/JPG/BMP   {{$t('colonSetting', { key : $t('imgSize') })}}< 20Mb </span>
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
                    @click="toggle({type : 'hide'})" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import uploadImg from './uploadImg';
    export default {
        components : {
            uploadImg
        },
        data () {
            return {
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    //海报名称
                    posterName : '',
                    //业态类型
                    //posterType : '',
                    //海报图片地址
                    posterUrl : '',
                    img : []
                },
                //表单验证规则
                ruleValidate : {
                    posterName : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('posterName') }), trigger : 'blur' },
                        { type : 'string', max : 20, message : this.$t('errorMaxLength',{ field : this.$t('posterName'),length : 20 }), trigger : 'blur' },
                    ],
                    // posterType : [
                    //     { required : true, message : this.$t('selectField',{ msg : this.$t('industryType') }), trigger : 'blur' },
                    // ],
                    img : [
                        { required : true, type : 'array', min : 1, message : this.$t('pleaseUploadImgAtleastOne'), trigger : 'blur' },
                    ]
                },
                //业态类型下拉列表
                posterTypeList : [],
            };
        },
        methods : {
            /**
             * 显示、隐藏模态框
             * @param {string} type
             */
            toggle ({ type }) {
                if (type && type === 'show') {
                    //this.getIndustryTypeList();
                } else if (type && type === 'hide') {
                    this.reset();
                }
                this.visible = !this.visible;
            },
            /**
             * 上传
             */
            upload () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.addPoster();
                    }
                });
            },
            /**
             *  删除图片
             * @param {array} uploadList
             */
            removeImg (uploadList) {
                this.formData.img = uploadList;
                this.$refs.form.validateField('img');
            },
            /**
             *  上传图片成功
             * @param {array} uploadList
             */
            uploadSuccess (uploadList) {
                this.formData.img = uploadList;
                this.$refs.form.validateField('img');
            },
            /**
             *  添加海报
             */
            addPoster () {
                this.formData.posterUrl = this.formData.img && this.formData.img.length > 0 ? this.formData.img[0] : '';
                ajax.post('marketing-addPoster', this.formData).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                        this.$emit('addSuccess');
                        this.toggle({ type : 'hide' });
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                    }
                });
            },
            /**
             * 获取业态类型下拉列表数据
             */
            getIndustryTypeList () {
                ajax.post('getAllPolicyType').then(res => {
                    if (res.success) {
                        this.posterTypeList = res.data && res.data.length > 0 ? res.data.map((item) => {
                            return {
                                label : item.desc,
                                value : item.name
                            };
                        }) : [];
                    } else {
                        this.posterTypeList = [];
                        this.$Message.error(this.$t('failToGet', { feild : this.$t('industryType') }));
                    }
                });
            },
            /**
             * 重置模态框数据
             */
            reset () {
                this.formData = {
                    posterName : '',
                    //posterType : '',
                    posterUrl : '',
                    img : []
                };
                this.posterTypeList = [];
                this.$refs.form.resetFields();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .format-info {
        font-size: 12px;
        color: #F7981C;
    }
</style>
