<!--
    图片上传组件
    作者：杨泽涛
-->
<template>
    <div>
        <el-upload
            :action="action"
            list-type="picture-card"
            :show-file-list="true"
            :before-upload="beforeUpload"
            :on-error="uploadFail"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="uploadSuc">
            <i class="el-icon-plus" ></i>
        </el-upload>
        <Modal :title="$t('图片预览')" v-model="dialogVisible">
            <img :src="dialogImageUrl" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    import config from '@/config/index';
    import api from '@/api/apiList';
    import ajaxConfig from '@/api/index.js';

    export default {
        props: {
            quantityLimit: {
                type: Number,
                default: 5
            }
        },
        components: {},
        data() {
            return {
                uploadList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                limit: false
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
            uploadSuc (res, file, fileList) {
                if(res.success){
                    this.uploadList.push(res.data);
                    this.$emit('upload-success',this.uploadList);
                    this.$Message.success(this.$t('上传成功'));
                }else{
                    if(res.code === 'S003'){
                        this.$Message.error( this.$t('上传失败'));
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
                if(this.limit) {
                    this.limit = false;
                } else {
                    this.uploadList.splice(fileList.indexOf(file), 1);
                    this.$emit('remove-img',this.uploadList);
                }
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
                this.$message.error('图片上传失败');
                this.$store.commit('changePromisings','del');
            },
            /**
             * 上传文件之前
             */
            beforeUpload () {
                const check = this.uploadList.length < this.quantityLimit;
                if (!check) {
                    this.$Message.error(this.$t(`最多上传${this.quantityLimit}`));
                    this.limit = true;
                }else {
                    this.$store.commit('changePromisings','add');
                }
                return check;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
