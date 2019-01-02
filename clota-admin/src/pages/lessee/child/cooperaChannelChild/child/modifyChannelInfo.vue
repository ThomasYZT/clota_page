<!--修改合作伙伴信息-->

<template>
    <div class="change-partners">
        <!--面包屑导航-->
        <bread-crumb-head
            locale-router="modify"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>

        <div class="add-less-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :label-width="120">
                <i-row>
                    <i-col span="11">
                        <!--合作机构名称-->
                        <FormItem :label="$t('companyBgName')"
                                  v-if="orgChannel"
                                  prop="name"
                                  :rules="{ required : true, validator : validateName ,trigger : 'blur' }">
                            <Input v-model.trim="formData.name" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11" v-if="orgChannel" >
                        <!--社会信用代码-->
                        <FormItem :label="$t('社会信用代码')"
                                  prop="certificateNumber"
                                  :rules="{ required : true, validator : validateCertificateNumber ,trigger : 'blur' }">
                            <Input v-model.trim="formData.certificateNumber" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--合作伙伴名称-->
                        <FormItem :label="$t('name')" v-if="personalChannel" >
                            {{formData.name | contentFilter}}
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--身份证号-->
                        <FormItem :label="$t('身份证号')" v-if="personalChannel" >
                            {{formData.certificateNumber | contentFilter}}
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--管理账号-->
                        <FormItem :label="$t('管理账号')">
                            {{formData.managerAccount | contentFilter}}
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--联系方式-->
                        <FormItem :label="$t('phone')"
                                  prop="telephone"
                                  :rules="{ required : true, validator : validatePhone ,trigger : 'blur' }">
                            <Input v-model.trim="formData.telephone" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--电子邮箱-->
                        <FormItem :label="$t('email')"
                                  prop="email"
                                  :rules="{ required : true, validator : validateEmail ,trigger : 'blur' }">
                            <Input v-model.trim="formData.email" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--地点-->
                        <FormItem :label="$t('location')"
                                  prop="place"
                                  :rules="{ required : true, validator : validatePlace ,trigger : 'blur' }">
                            <city-plugin @select="placeChange"
                                         style="width: 280px;"
                                         :defaultValue="defaultAddress">
                            </city-plugin>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <!--详细地址-->
                    <i-col span="11">
                        <FormItem :label="$t('address')"
                                  prop="address"
                                  :rules="{ validator : validateAddress ,trigger : 'blur' }">
                            <Input v-model.trim="formData.address" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--联系人-->
                        <FormItem :label="$t('person')"
                                  v-if="orgChannel"
                                  prop="linkName"
                                  :rules="{ required : true, validator : validateLinkName ,trigger : 'blur' }" >
                            <Input v-model.trim="formData.linkName" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <FormItem :label="personalChannel ? $t('身份证') : $t('营业执照')"
                                  prop="images"
                                  :rules="{ required : true, validator : validateAttaches ,trigger : 'change' }">
                            <div class="img-wrap"
                                 v-for="(item,index) in attaches"
                                 :key="index">
                                <img class="img-item"  :src="item"/>
                                <div class="mask-wrap">
                                    <span class="iconfont icon-delete" @click="delImg(index)"></span>
                                </div>
                            </div>
                            <Upload
                                v-show="uploadImgLimit"
                                class="upload-wrap"
                                :action="uploadUrl"
                                :headers="uploadHeaders"
                                :show-upload-list="false"
                                :max-size="maxSize * 1024"
                                :on-exceeded-size="handleExceededSize"
                                :format="['gif','img','jpeg','jpg','jpeg','png','svg']"
                                :on-format-error="handleFormatError"
                                :on-success="handleSuccess"
                                accept="image/*">
                                <div class="upload-btn">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <!--个人说明-->
                    <i-col span="24">
                        <FormItem :label="$t('个人说明')"
                                  v-if="personalChannel"
                                  prop="description"
                                  :rules="{ validator : validateDescription ,trigger : 'blur' }">
                            <Input v-model.trim="formData.description" type="textarea"/>
                        </FormItem>
                    </i-col>
                    <!--备注-->
                    <i-col span="24">
                        <FormItem :label="$t('remark')"
                                  v-if="orgChannel"
                                  prop="description"
                                  :rules="{ validator : validateDescription ,trigger : 'blur' }">
                            <Input v-model.trim="formData.description" type="textarea"/>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
            <div class="footer">
                <Button @click="save"
                        type="primary"
                        class="ivu-btn-min btn-margin"
                        :loading="addLoading">{{$t('confirmEdit')}}</Button>
                <Button  @click="cancel" class="ivu-btn-min">{{$t('cancel')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index.js';
    import { validator } from 'klwk-ui';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //表单数据
                formData : {
                    name : '',
                    certificateNumber : '',
                    managerAccount : '',
                    telephone : '',
                    email : '',
                    description : '',
                    address : '',
                    provinceId : '',
                    cityId : '',
                    areaId : '',
                    linkName : '',
                },
                //上传的附件
                attaches : [],
                //是否在提交中
                addLoading : false,
                //合作伙伴详情
                partnerDetail : {},
                // 上传文件请求头
                uploadHeaders : {
                    "Accept" : 'application/json',
                    "token" : ajax.getToken(),
                },
                //上传文件的最大值,单位是M
                maxSize : 10
            };
        },
        components : {
            breadCrumbHead,
            cityPlugin
        },
        methods : {
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    if (this.$route.name === 'cooperaChannelPerDetailModify') {
                        this.formData.name = params.formData.orgName;
                        this.formData.certificateNumber = params.formData.certificateNumber;
                        this.formData.managerAccount = params.formData.managerAccount;
                        this.formData.telephone = params.formData.telephone;
                        this.formData.email = params.formData.email;
                        this.formData.description = params.formData.description;
                        this.formData.address = params.formData.address;
                        this.formData.provinceId = params.formData.provinceId;
                        this.formData.cityId = params.formData.cityId;
                        this.formData.areaId = params.formData.areaId;
                        this.partnerDetail = params.formData;
                        this.getAttaches(this.partnerDetail.attach);
                    } else if (this.$route.name === 'cooperaChannelOrgDetailModify') {
                        this.formData.name = params.formData.orgName;
                        this.formData.telephone = params.formData.telephone;
                        this.formData.managerAccount = params.formData.managerAccount;
                        this.formData.email = params.formData.email;
                        this.formData.address = params.formData.address;
                        this.formData.description = params.formData.description;
                        this.formData.certificateNumber = params.formData.certificateNumber;
                        this.formData.linkName = params.formData.linkName;
                        this.formData.provinceId = params.formData.provinceId;
                        this.formData.cityId = params.formData.cityId;
                        this.formData.areaId = params.formData.areaId;
                        this.partnerDetail = params.formData;
                        this.getAttaches(this.partnerDetail.attach);
                    } else {
                        this.$router.push({
                            name : this.personalChannel ? 'cooperaChannelPerDetail' : 'ISPinternetDetail'
                        });
                    }
                } else {
                    this.$router.push({
                        name : this.personalChannel ? 'cooperaChannelPerDetail' : 'ISPinternetDetail'
                    });
                }
            },
            /**
             * 获取默认图片信息
             * @param{String data 图片字符串值
             */
            getAttaches (data) {
                if (data) {
                    this.attaches = JSON.parse(data);
                } else {
                    this.attaches = [];
                }
            },
            /**
             * 取消编辑合作伙伴详情
             */
            cancel () {
                this.$router.push({
                    name : 'cooperaChannelPerDetail'
                });
            },
            /**
             * 保存编辑的信息
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        if (this.personalChannel) {
                            this.savePerPartnerInfo();
                        } else if (this.orgChannel) {
                            this.saveOrgPartnerInfo();
                        }
                    }
                });
            },
            /**
             * 保存修改后的合作伙伴信息
             */
            savePerPartnerInfo () {
                ajax.post('updatePartner',{
                    id : this.partnerDetail.id,
                    telephone : this.formData.telephone,
                    provinceId : this.formData.provinceId,
                    cityId : this.formData.cityId,
                    areaId : this.formData.areaId,
                    address : this.formData.address,
                    description : this.formData.description,
                    certificateNumber : this.formData.certificateNumber,
                    email : this.formData.email,
                    attach : this.attaches.join(',')
                }).then(res => {
                    if (res.status === 200) {
                        this.$router.push({
                            name : 'cooperaChannelPerDetail'
                        });
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('edit') }));
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('edit') }));
                    }
                });
            },
            /**
             * 校验手机号
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validatePhone (rule,value,callback) {
                if (value) {
                    if (validator.isMobile(value)) {
                        callback();
                    } else {
                        callback(this.$t('errorFormat',{ field : this.$t('mobilePhone') }));
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('mobilePhone') }));
                }
            },
            /**
             * 校验邮箱
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validateEmail (rule,value,callback) {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('errorFormat',{ field : this.$t('email') }));
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('email') }));
                }
            },
            /**
             * 所在地更改
             * @param{Object} districtInfo 所在地信息
             */
            placeChange (districtInfo) {
                this.formData.provinceId = districtInfo.province.provinceid;
                this.formData.cityId = districtInfo.city.cityid;
                this.formData.areaId = districtInfo.area.areaid;
            },
            /**
             * 校验所在地
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validatePlace (rule,value,callback) {
                if (this.formData.provinceId) {
                    callback();
                } else {
                    callback(this.$t('selectField',{ msg : this.$t('location') }));
                }
            },
            /**
             * 校验详细地址
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validateAddress (rule,value,callback) {
                if (value) {
                    if (value.length > 100) {
                        callback(this.$t('errorMaxLength',{ field : this.$t('address'),length : 100 }));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            },
            /**
             * 校验个人说明
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validateDescription (rule,value,callback) {
                if (value) {
                    if (value.length > 200) {
                        callback(this.$t('errorMaxLength',{ field : this.$t('个人说明'),length : 200 }));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            },
            /**
             * 校验公司名称
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validateName (rule,value,callback) {
                if (value) {
                    if (value.length > 50) {
                        callback(this.$t('errorMaxLength',{ field : this.$t('公司名称'),length : 50 }));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            },
            /**
             * 校验社会信用代码
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validateCertificateNumber (rule,value,callback) {
                if (value) {
                    let reg = /[0-9A-Z]{18}/;
                    if (!reg.test(value)) {
                        callback(this.$t('errorFormat',{ field : this.$t('社会信用代码') }));
                    } else if (value.length > 100) {
                        callback(this.$t('errorMaxLength',{ field : this.$t('社会信用代码'),length : 100 }));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            },
            /**
             * 校验联系人
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validateLinkName (rule,value,callback) {
                if (value) {
                    if (value.length > 20) {
                        callback(this.$t('errorMaxLength',{ field : this.$t('联系人'),length : 20 }));
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('联系人') }));
                }
            },
            /**
             * 保存机构详情
             */
            saveOrgPartnerInfo () {
                ajax.post('updatePartner',{
                    id : this.partnerDetail.id,
                    telephone : this.formData.telephone,
                    provinceId : this.formData.provinceId,
                    cityId : this.formData.cityId,
                    areaId : this.formData.areaId,
                    address : this.formData.address,
                    description : this.formData.description,
                    certificateNumber : this.formData.certificateNumber,
                    email : this.formData.email,
                    attach : this.attaches.join(',')
                }).then(res => {
                    if (res.status === 200) {
                        this.$router.push({
                            name : 'cooperaChannelPerDetail'
                        });
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('edit') }));
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('edit') }));
                    }
                });
            },
            /**
             * 删除图片
             * @param{Number} index 图片序列
             */
            delImg (index) {
                this.attaches.splice(index,1);
            },
            /**
             * 图片大小超过设置大小，给出提示
             * @param{Object} file 上传的文件
             */
            handleExceededSize (file) {
                this.$Message.warning({
                    content : `${file.name}大小超${this.maxSize}M限制，暂时不支持上传该文件`,
                });
            },
            /**
             * 上传图片格式错误提示
             * @param{Object} file 上传的文件
             */
            handleFormatError (file) {
                this.$Message.warning({
                    content : `${file.name}文件格式不符合要求，请重新选择文件`,
                });
            },
            /**
             * 上传文件成功
             * @param{Object} response 上传文件接口返回值
             * @param{Object} file 上传文件
             */
            handleSuccess (response, file) {
                let avatar = response.paths && response.paths.length > 0 ? response.paths : [];
                if ( avatar.length > 0 ) {
                    avatar.forEach(url => {
                        this.attaches.push(url);
                    });
                } else {
                    this.$Message.error({
                        content : `${file.name}文件上传失败，请重新上传`
                    });
                }
                this.$refs.formValidate.validateField('images');
            },
            /**
             * 校验上传附件是否正确
             * @param{Array} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 校验结果回调函数
             */
            validateAttaches (rule,value,callback) {
                if (this.personalChannel) {
                    if (this.attaches.length < 2) {
                        callback(this.$t('请上传身份证'));
                    } else {
                        callback();
                    }
                } else if (this.orgChannel) {
                    if (this.attaches.length < 1) {
                        callback(this.$t('请上传营业执照'));
                    } else {
                        callback();
                    }
                } else {
                    callback('error');
                }
            }
        },
        computed : {
            //面包屑路由信息
            beforeRouterList () {
                if (this.$route.name === 'cooperaChannelPerDetailModify') { //个人合作伙伴
                    return [
                        {
                            name : 'cooperaChannelPer',
                            router : {
                                name : 'cooperaChannelPer'
                            }
                        },
                        {
                            name : 'lesseeDetail',
                            router : {
                                name : 'cooperaChannelPerDetail'
                            }
                        }
                    ];
                } else if (this.$route.name === 'cooperaChannelOrgDetailModify') { //机构合作伙伴
                    return [
                        {
                            name : 'cooperaChannelOrg',
                            router : {
                                name : 'cooperaChannelOrg'
                            }
                        },
                        {
                            name : 'lesseeDetail',
                            router : {
                                name : 'cooperaChannelPerDetail'
                            }
                        }
                    ];
                }
                return [];
            },
            //个人合作伙伴
            personalChannel () {
                return this.$route.name === 'cooperaChannelPerDetailModify';
            },
            //机构合作伙伴
            orgChannel () {
                return this.$route.name === 'cooperaChannelOrgDetailModify';
            },
            //默认选中的所在地信息
            defaultAddress () {
                if (this.partnerDetail && Object.keys(this.partnerDetail).length > 0) {
                    return {
                        province : {
                            provinceid : this.partnerDetail.provinceId,
                            province : this.partnerDetail.province,
                        },
                        city : {
                            cityid : this.partnerDetail.cityId,
                            city : this.partnerDetail.city
                        },
                        area : {
                            areaid : this.partnerDetail.areaId,
                            area : this.partnerDetail.area
                        },
                    };
                } else {
                    return {};
                }
            },
            // 附件上传地址, 分上传关联附件和普通上传附件
            uploadUrl () {
                return ajax.getHost('uploadImage');
            },
            //上传图片限制
            uploadImgLimit () {
                if (this.personalChannel) {
                    return this.attaches.length < 2;
                } else if (this.orgChannel) {
                    return this.attaches.length < 1;
                } else {
                    return false;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-partners{
        @include block_outline();
        overflow: auto;

        .add-less-info {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline(924px, auto);
                margin: 0 auto;
            }
        }

        .footer {
            text-align: center;
            margin-top: 40px;

            /deep/ .btn-margin {
                margin-right: 18px;
            }
        }

        .img-wrap{
            display: inline-block;
            position: relative;
            margin-right: 5px;
            vertical-align: middle;

            &:hover .mask-wrap{
                display: flex;
            }

            .mask-wrap{
                display: none;
                @include absolute_pos(absolute,0,0,0,0);
                background: rgba(0,0,0,0.4);
                align-items: center;
                justify-content: center;

                .icon-delete{
                    cursor: pointer;

                    &:before{
                        color: #ffffff;
                    }
                }
            }
        }

        .img-item{
            width: 58px;
            height: 58px;
            display: inline-block;
            vertical-align: top;
            border-radius: 4px;
            border: 1px dashed antiquewhite;
        }

        .upload-wrap{
            display: inline-block;
            width: 58px;
            vertical-align: middle;
        }

        .upload-btn{
            width: 58px;
            height:58px;
            line-height: 58px;
            border: 1px dashed  $color_DCE0E6;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
        }
    }
</style>
