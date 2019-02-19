<template>
    <el-upload
        class="upload-demo"
        :on-error="uploadFail"
        :before-upload="beforeUpload"
        :on-success="uploadSuc"
        :headers="headers"
        :data="configData"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :format="['xlsx']"
        :action="action"
        :show-file-list="false">
        <span>{{$t('selectCardFileImport')}}</span>
    </el-upload>
</template>
<script>
    import config from '@/config/index';
    import apiList from '@/api/apiList';
    import ajaxConfig from '@/api/index.js';

    export default {
        props : {
            //导入实体卡类型
            'entityCardType' : {
                type : String,
                default : ''
            }
        },
        data () {
            return {};
        },
        computed : {
            /**
             * 上传文件的headers
             */
            headers () {
                return {
                    token : ajaxConfig.getToken()
                };
            },
            /**
             * 上传附件地址
             */
            action () {
                return config.HOST + apiList.resolverEntityCard;
            },
            /**
             * 上传文件的其它配置参数
             */
            configData () {
                return {
                    entityCardType : this.entityCardType
                };
            }
        },
        methods : {
            /**
             * 文件上传成功
             * @param response
             * @param file
             * @param fileList
             */
            uploadSuc (response, file, fileList) {
                if (response.success) {
                    this.$emit('upload-success',response.data);
                    this.$Message.success(this.$t('analysisFileSuccess'));
                } else {
                    if (response.code === 'S003') {
                        this.$Message.error( this.$t('uploadCardError') );
                    } else {
                        this.$Message.error( this.$t('analysisFileFail') );
                    }
                }
                this.$store.commit('changePromisings','del');
            },
            /**
             * 上传失败
             * @param err
             * @param file
             * @param fileList
             */
            uploadFail (err, file, fileList) {
                this.$Message.error( this.$t('analysisFileFail') );
                this.$emit('upload-success',{
                    dataSize : 0,
                    errorSize : 0,
                    dataList : [],
                    errorList : [],
                });
                this.$store.commit('changePromisings','del');
            },
            /**
             * 上传文件之前
             */
            beforeUpload () {
                this.$store.commit('changePromisings','add');
            }
        }
    };
</script>
<style lang='scss'>
</style>
