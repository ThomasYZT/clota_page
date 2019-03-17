<!-- 图片上传组件-->
<template>
    <div class="upload-com">
        <span class="upload-file-name" v-if="uploadedFile" v-w-title="uploadedFile.name">{{uploadedFile.name}}</span>
        <el-upload
            v-if="!disabled"
            class="avatar-uploader"
            :action="serverUrl"
            :headers="headers"
            name="file"
            :data="extraData"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload">
            <span class="upload-text" v-if="uploadedFile === null">{{$t('上传')}}</span>
            <span class="upload-text" v-else>{{$t('重新上传')}}</span>
        </el-upload>
        <Tooltip placement="top" transfer>
            <div slot="content" class="tips-content">
                {{$t('请访问微信商户平台(pay.weixin.qq.com)，并找到账户中心-->账户设置-->API安全页面，下载名称为apiclient_cert.p12的商户证书文件。')}}
            </div>
            <span class="iconfont icon-note"></span>
        </Tooltip>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';

    export default {
        props : {
            //上传的其它参数
            'extra-data' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //显示默认上传的证书信息
            'default-data' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //是否禁用
            'disabled' : {
                type : Boolean,
                default : false
            }
        },
        data () {
            return {
                //文件最大大小
                fileMaxSize : 10 * 1024 * 1024,
                //已上传的文件
                uploadedFile : null
            };
        },
        methods : {
            /**
             * 上传成功回调函数
             * @param{Object} res 回调参数
             * @param{Object} file 上传的文件
             */
            uploadSuccess (res,file) {
                if (res.status === 200) {
                    this.uploadedFile = {
                        name : file.name
                    };
                    this.$Message.success('上传成功');
                } else {
                    this.uploadedFile = null;
                    this.$Message.error('上传失败');
                }
                this.$emit('set-upload-file',this.uploadedFile);
            },
            /**
             * 上传文件失败回调
             * @param{Object} err 错误信息
             */
            uploadError (err) {
                console.error(err);
                this.uploadedFile = null;
                this.$Message.error('上传失败');
                this.$emit('set-upload-file',this.uploadedFile);
            },
            /**
             * 上传文件前的处理
             * @param{Object} file 需要上传的文件
             */
            beforeUpload (file) {
                if (file.name && file.name.indexOf('.') !== -1) {
                    let suffx = file.name.substr(file.name.lastIndexOf('.') + 1);
                    if (suffx !== 'p12') {
                        this.$Message.warning('请上传后缀为p12格式的证书');
                        return false;
                    } else {
                        if (file.size > this.fileMaxSize) {
                            this.$Message.warning('上传文件大小不可超过10M');
                            return false;
                        }
                        return true;
                    }
                } else {
                    this.$Message.warning('上传文件不合法');
                    return false;
                }
            }
        },
        computed : {
            //上传路径
            serverUrl () {
                return ajax.getFullUrl('uploadWxApiCertificate');
            },
            headers () {
                return {
                    token : ajax.getToken()
                };
            },
        },
        watch : {
            defaultData : {
                immediate : true,
                handler (newVal) {
                    if (newVal && newVal.certificationName) {
                        this.uploadedFile = {
                            name : newVal.certificationName
                        };
                    } else {
                        this.uploadedFile = null;
                    }
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .upload-com{
        display: flex;

        .upload-file-name{
            display: inline-block;
            max-width: 190px;
            @include overflow_tip();
            margin-right: 10px;
        }

        .upload-text {
            color: $color_blue;
        }

        .icon-note {
            font-size: 15px;
            margin-left: 5px;
        }

        .tips-content{
            margin-left: 10px;
        }
    }
</style>
