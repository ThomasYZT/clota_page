<template>
    <el-upload
        class="upload-demo"
        :on-error="uploadFail"
        :before-upload="beforeUpload"
        :on-success="uploadSuc"
        :headers="headers"
        :action="action"
        :show-file-list="false">
        <span>选择实体卡文件上传</span>
    </el-upload>
</template>
<script>
    import config from '@/config/index';
    import apiList from '@/api/apiList';
    import ajaxConfig from '@/api/index.js';

    export default {
        data() {
            return {}
        },
        computed : {
            /**
             * 上传文件的headers
             */
            headers () {
                return {
                    token : ajaxConfig.getToken()
                }
            },
            /**
             * 上传附件地址
             */
            action () {
                return config.HOST + apiList.resolverEntityCard;
            },
        },
        methods : {
            /**
             * 文件上传成功
             * @param response
             * @param file
             * @param fileList
             */
            uploadSuc (response, file, fileList) {
                if(response.success){
                    this.$emit('upload-success',response.data);
                    this.$Message.success('解析成功');
                }else{
                    this.$Message.error( response.data.message || '解析失败' );
                }
                this.$store.commit('changePromisings','del');
            },
            /**
             * 上传失败
             * @param err
             * @param file
             * @param fileList
             */
            uploadFail(err, file, fileList) {
                this.$message.error('解析失败');
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
    }
</script>
<style lang='scss'>
</style>
