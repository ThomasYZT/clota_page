<!--
    图片上传组件
    作者：杨泽涛
-->
<template>
    <div>
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :show-file-list="true"
            :before-upload="beforeUpload"
            :on-error="uploadFail"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import config from '@/config/index';
    import api from '@/api/apiList';
    import ajaxConfig from '@/api/index.js';

    export default {
        components: {},
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        computed: {
            /**
             *  返回上传接口地址
             */
            action() {
                return config.HOST + api.imgUpload;
            },
            /**
             * 上传文件的headers
             */
            headers () {
                return {
                    token : ajaxConfig.getToken()
                }
            },
        },
        methods: {
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
                    if(response.code === 'S003'){
                        this.$Message.error( this.$t('uploadCardError'));
                    }else{
                        this.$Message.error( '解析失败' );
                    }
                }
                this.$store.commit('changePromisings','del');
            },
            /**
             * 删除图片
             * @param file
             * @param fileList
             */
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            /**
             * 点击预览图片
             * @param file
             */
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>