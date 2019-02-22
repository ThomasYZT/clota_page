<!--
    基本信息模版元素
    作者：杨泽涛
-->
<template>
    <!-- 基本信息 -->
    <div class="base-info">
        <Form ref="baseInfoForm"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <title-temp title="basicInfo"></title-temp>
            <div class="form-content">
                <!--产品名称-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('productName')" prop="productName">
                        <Input v-model.trim="formData.productName"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <!--景区成本价-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('standardPrice')" prop="standardPrice">
                        <Input v-model.trim="formData.standardPrice"
                               @on-blur="standardPriceChange"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <!--第三方产品编码-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('thirdCode')" prop="thirdCode">
                        <Input v-model.trim="formData.thirdCode"
                               :placeholder="$t('inputField', {field: ''})"/>
                    </Form-item>
                </div>
                <!--产品类别-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('productType')" prop="typeId">
                        <div class="flex-form-item-wrapper">
                            <div class="left-item">
                                <Select v-model="formData.typeId" style="width:280px">
                                    <Option v-for="item in typeList"
                                            :value="item.id"
                                            :key="item.id">
                                        {{ item.name }}
                                    </Option>
                                </Select>
                            </div>
                            <div class="right-item">
                                <div class="inline-btn-wrapper" style="text-align: right">
                                    <span class="add-type-btn"
                                          @click="addType">{{$t('添加类别')}}</span>
                                </div>
                            </div>
                        </div>
                    </Form-item>
                </div>
                <!--产品标签-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('产品标签')" prop="thirdCode">
                        <div class="tags-wrapper">
                            <productTag v-for="item in formData.tags"
                                        :checkable="false"
                                        :closable="false"
                                        :key="item.id"
                                        :name="item.name"
                                        :chosed="true"></productTag>
                            <span class="add-type-btn"
                                  @click="addTag">{{$t('添加标签')}}</span>
                        </div>
                    </Form-item>
                </div>
                <!--产品封面-->
                <div class="ivu-form-item-wrap">
                    <Form-item :label="$t('产品封面')" prop="pictureUrl">
                        <img-uploader  ref="imgUpload"
                                       :format="['png','jpeg']"
                                       :message="'点击上传'"
                                       :quantity-limit="1"
                                       :defaultList="defaultImg"
                                       @upload-success="uploadSuc"
                                       @remove-img="removeIDimg"></img-uploader>
                    </Form-item>
                </div>
                <!--产品描述-->
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('productDes')" prop="productDes">
                        <Input v-model.trim="formData.productDes"
                               type="textarea"
                               :rows="3"
                               :placeholder="$t('inputField', {msg: ''})"/>
                    </Form-item>
                </div>
                <!--空字段站位用-->
                <div class="ivu-form-item-wrap"></div>
            </div>
        </Form>

        <addTypeModal ref="addTypeModal" @updateTypeList="queryTagDefines({ scene : 'product_type'})"></addTypeModal>
        <tagsManageModal ref="tagsManageModal" @updateTags="updateTags" @deleteTag="deleteTag"></tagsManageModal>
    </div>
</template>

<script>
    import { validateMoney, emoji, validateNumber } from '../../../../validateMethods';
    import titleTemp from '../../../../components/titleTemp';
    import productTag from '../../components/productTag';
    import ImgUploader from '../../../../../register/components/ImgUploader';
    import addTypeModal from '../../components/addTypeModal';
    import tagsManageModal from '../../components/tagsManageModal';
    import ajax from '@/api/index';
    export default {
        props : {
            //景区成本价
            standardPrice : {
                type : String,
                default : '',
            }
        },
        components : {
            titleTemp,
            productTag,
            ImgUploader,
            addTypeModal,
            tagsManageModal
        },
        data () {
            return {
                //表单数据 -- 基本信息
                formData : {
                    productName : '',//产品名称
                    standardPrice : '',//景区成本价
                    thirdCode : '',//第三方产品编码
                    productDes : '',//产品描述
                    typeId : '',//类别id
                    pictureUrl : '',
                    tags : [],
                },
                //类别列表数据
                typeList : [],
                //已上传的产品封面
                defaultImg : []
            };
        },
        computed : {
            //校验规则
            ruleValidate () {
                return {
                    //产品名称
                    productName : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('productName') }), trigger : 'blur' }, // 不能为空
                        { type : 'string', max : 50, message : this.$t('errorMaxLength', { field : this.$t('productName'), length : 50 }), trigger : 'blur' }, // 不能多于15个字符
                        { validator : emoji, trigger : 'blur' }
                    ],
                    //景区成本价
                    standardPrice : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('standardPrice') }), trigger : 'blur' },
                        { max : 10, message : this.$t('errorMaxLength', { field : this.$t('standardPrice'), length : 10 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateMoney, trigger : 'blur' }
                    ],
                    //第三方产品编码
                    thirdCode : [
                        { max : 50, message : this.$t('errorMaxLength', { field : this.$t('thirdCode'), length : 50 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { validator : validateNumber, trigger : 'blur' }
                    ],
                    //产品描述
                    productDes : [
                        { type : 'string', max : 500, message : this.$t('errorMaxLength', { field : this.$t('productDes'), length : 500 }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                    ],
                    typeId : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('产品类别') }), trigger : 'change' }, // 不能为空
                    ],
                    pictureUrl : [
                        { required : true, message : this.$t('pleaseUpload', { field : this.$t('产品封面') }), trigger : 'change' }, // 不能为空
                    ]
                };
            }
        },
        methods : {
            /**
             * 基本信息表单校验
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.baseInfoForm.validate((valid) => {
                        if (valid) {
                            resolve(this.formData);
                        } else {
                            reject('baseInfoFormErr');
                        }
                    });
                });
            },
            /**
             * 景区成本价改变
             * @param val
             */
            standardPriceChange () {
                this.$emit('update:standardPrice', this.formData.standardPrice);
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                this.formData = formData;
                this.formData.tags = this.formData.tags.map((item) => {
                    return {
                        id : item.tagId,
                        name : item.name,
                    };
                });
                this.defaultImg = [
                    {
                        name : 0,
                        url : this.formData.pictureUrl,
                    }
                ];
                this.$emit('update:standardPrice', this.formData.standardPrice);
            },
            /**
             * 添加类别
             */
            addType () {
                this.$refs.addTypeModal.show({
                    type : 'add',
                    scene : 'product_type',
                });
            },
            /**
             * 添加标签
             */
            addTag () {
                this.$refs.tagsManageModal.show({
                    chosedTags : Array.from(this.formData.tags)
                });
            },
            /**
             *  更新标签列表
             *  @param chosedTags
             */
            updateTags (chosedTags) {
                this.formData.tags = chosedTags;
            },
            /**
             * 查询类别、标签列表
             */
            queryTagDefines ({ scene }) {
                ajax.post('queryTagDefines', {
                    scene : scene,
                }).then(res => {
                    if (res.success) {
                        this.typeList = res.data ? res.data : [];
                    } else {
                        this.typeList = [];
                    }
                });
            },
            /**
             * 上传图片成功
             * @param data
             */
            uploadSuc (data) {
                this.formData.pictureUrl = data[0] ? data[0] : '';
                this.$refs.baseInfoForm.validateField('pictureUrl');
            },
            /**
             * 删除图片成功
             */
            removeIDimg () {
                this.formData.pictureUrl = '';
                this.$refs.baseInfoForm.validateField('pictureUrl');
            },
            /**
             * 删除当前拥有的标签时，更新详情标签列表
             * @param tag 删除的标签
             */
            deleteTag (tag) {
                let _index = this.formData.tags.findIndex((item) => {
                    return item.id === tag.id;
                });
                if (_index > -1) {
                    this.formData.tags.splice(_index, 1);
                }
            }
        },
        created () {
            //查询产品类别列表数据
            this.queryTagDefines({
                scene : 'product_type'
            });
        },
        watch : {
            //监听表单数据变化，向编辑页面传递模版表单数据
            formData : {
                handler (formData) {
                    this.$emit('updateFormData', formData);
                },
                deep : true,
                immediate : true,
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-form{
        padding: 10px 0 20px;
        text-align: center;
    }
    .form-content{
        width: 1000px;
        margin: 0 auto;

        .ivu-input-icon{
            z-index: 2;
        }

        /deep/ .ivu-form-item-label{
            padding-left: 0;
        }

        .ivu-form-item-wrap{
            position: relative;
            display: inline-block;
            min-width: 340px;
            width: 49%;
            text-align: left;
            vertical-align: top;

            .ivu-form-item {
                width: 340px;
                margin: 0 auto 18px;
                text-align: left;

                /deep/ .ivu-date-picker {
                    display: block;
                }

                /deep/ .ivu-select-selected-value,
                /deep/ .ivu-input{
                    font-size: $font_size_14px;
                }

                /deep/ .ivu-select-item{
                    font-size: $font_size_14px !important;
                }

                /deep/ .ivu-input-wrapper{
                    &.short-input{
                        width: 123px;
                        display: inline-block;
                        margin-right: 10px;
                    }
                }

                /deep/ .ivu-checkbox-wrapper{
                    margin-right: 24px;
                    &:last-child{
                        margin-right: 0;
                    }
                }

                /deep/ .ivu-checkbox{
                    margin-right: 5px;
                }

                .label{
                    margin-right: 10px;
                }

                /deep/ .ivu-form-item-content {
                    line-height: 22px;
                }
            }

            .flex-form-item-wrapper {
                display: flex;

                .left-item {
                    flex: 0 1;
                }

                .right-item {
                    flex: 1 1;
                }
            }
        }

        .add-type-btn {
            margin-left: 5px;
            color: $color_blue;
            cursor: pointer;
            white-space: nowrap;
            line-height: 30px;
        }


        .tags-wrapper {
            width: auto;
            min-height: 30px;
        }

        .single {
            width: calc(49% + 340px);
            /deep/ .ivu-form-item{
                width: 100%;
            }
        }

        .icon-note {
            color: $color_gray;
        }

        /deep/ .el-upload {
            min-width: 80px;
            width: 80px;
            height: 80px;
            font-size: 12px;
            background-color: #FAFAFA;
            color: #999999;
            display: flex;
            align-items: center;
            justify-content: center;

            i.el-icon-plus {
                color: #999999;
                font-size: 12px;
            }
        }
        /deep/ .el-upload-list__item {
            width: 80px;
            height: 80px;
        }

        /deep/ .picture-preview.ivu-modal-wrap {
            z-index: 9999;
        }
    }
</style>
