<!--新增/编辑/查看公告-->

<template>
    <div class="add-account">
        <bread-crumb-head
            :locale-router="$t(type === 'add' ? 'addSystemNotice' : type === 'look' ? 'lookSystemNotice' : 'editSystemNotice')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-account-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <i-row>
                    <i-col span="22">
                        <FormItem :label="$t('noticeName')" prop="title">
                            <Input v-model.trim="formData.title"
                                   :placeholder="$t('inputPlaceholder')"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <FormItem :label="$t('noticeContent')" prop="images">
                            <template v-if="formData.images && formData.images.length > 0">
                                <img class="img-item" v-for="(item,index) in formData.images" :key="index" :src="item"/>
                            </template>
                            <Upload
                                v-if="type !== 'look'"
                                class="upload-wrap"
                                :action="uploadUrl"
                                :headers="uploadHeaders"
                                :show-upload-list="false"
                                :max-size="2048"
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
                    <i-col span="22">
                        <FormItem :label="$t('desc')" prop="content">
                            <Input v-model.trim="formData.content"
                                   type="textarea"
                                   :placeholder="$t('inputPlaceholder')"/>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
            <div class="footer" v-if="type !== 'look'">
                <Button type="primary"
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t(type === 'add' ? 'addNew' : 'confirmEdit')}}
                </Button>
                <Button v-if="formData.state && formData.state !== 'true'"
                        type="primary"
                        @click="openNotice"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t('startUsing')}}
                </Button>
                <Button @click="cancel" class="ivu-btn-min">{{$t('cancel')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import {validator} from 'klwk-ui';
    import ajax from '@/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
        },
        data() {

            const validateMethod = {

                // 输入内容不合规则
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));
                    } else {
                        callback();
                    }
                }

            };

            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('systemNotice'),
                        router: {
                            name: 'systemNotice'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //标题
                    title: '',
                    //内容
                    content: '',
                    //图片(可多张)
                    images: [
                        'https://clotam.oss-cn-beijing.aliyuncs.com/notice/20180907/7b983b6e123b4ab59697bddd2a9c3e67.jpg'
                    ],
                },
                //表单校验规则
                ruleValidate: {
                    title : [
                        { required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('noticeName')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { type: 'string', max: 30, message: this.$t('errorMaxLength', {field: this.$t('noticeName'), length: 30}), trigger: 'blur' },
                    ],
                    content : [
                        { required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('desc')}), trigger: 'blur'},
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { type: 'string', max: 1000, message: this.$t('errorMaxLength', {field: this.$t('desc'), length: 1000}), trigger: 'blur' },
                    ],
                    images: [
//                        { required: true, type: 'array', message : this.$t('validateError.pleaseSelect', {'msg': this.$t('noticeContent')}), trigger: 'change' },
                    ],
                },
                //是否正在添加中
                addLoading: false,
                //账号操作类型
                type : '',
                // 附件上传地址, 分上传关联附件和普通上传附件
                uploadUrl: ajax.getHost('uploadImage'),
                // 上传文件请求头
                uploadHeaders: {
                    "Accept": 'application/json',
                    "token": ajax.getToken(),
                }
            }
        },
        methods: {
            /**
             * 保存公告数据
             */
            save() {

                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        this.addLoading = true;
                        var params = {
                            title: this.formData.title,
                            content: this.formData.content,
                            images: this.formData.images.join(';'),
                            picturePath: this.formData.images.join(';'),
                        };
                        if (this.type === 'add') {
                            this.addNotice(this.formData);
                        }else {
                            params.id = this.formData.id;
                            this.updateNotice(params);
                        }
                    }
                });
            },
            /**
             * 添加系统公告
             * @param params
             */
            addNotice( params ) {
                ajax.post('addNotice', params).then(res => {
                    this.addLoading = false;
                    if(res.status === 200){
                        this.$Message.success(this.$t('addSuccess'));
                        this.$router.push({ name: 'systemNotice'});
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 修改系统公告
             * @param params
             */
            updateNotice( params ) {
                ajax.post('updateNotice', params).then(res => {
                    this.addLoading = false;
                    if(res.status === 200){
                        this.$Message.success(this.$t('edit') + this.$t('success'));
                        this.$router.push({ name: 'systemNotice'});
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 启用公告
             */
            openNotice () {
                ajax.post('switchNotice', {
                    id: this.formData.id,
                    state: 'true'
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success( this.$t('success')+this.$t('startUsing') + this.formData.title);
                        this.$router.push({ name: 'systemNotice'});
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 取消新增
             */
            cancel() {
                this.$router.push({
                    name: 'systemNotice'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.type) {
                    this.type = params.type;
                    if(params.info){
                        this.formData = {
                            id: params.info.id,
                            title: params.info.title,
                            content: params.info.content,
                            images: params.info.images && params.info.images.length > 0 ?
                                params.info.images : [],
                        };
                    }
                }else{
                    this.$router.push({
                        name : 'systemNotice'
                    });
                }
            },

            //附件超过大小限制提示
            handleExceededSize(file, fileList){
                this.$Message.warning({
                    content: file.name + '文件大小超2M限制，暂时不支持上传该文件',
                    duration: 3
                });
            },
            //附件类型限制提示
            handleFormatError(file, fileList){
                this.$Message.warning({
                    content: file.name + '文件格式不符合要求，请重新选择文件',
                    duration: 3
                });
            },
            //附件上传成功回调
            handleSuccess(response, file, fileList) {
                console.log(response)
                var avatar = response.paths && response.paths.length > 0 ? response.paths : [];
                if( avatar.length > 0 ){
                    avatar.forEach(url => {
                        this.formData.images.push(url);
                    })
                }else{
                    this.$Message.error({
                        content: file.name + '文件上传失败，请重新上传',
                        duration: 3
                    });
                }
            },
            //附件上传失败提示
            handleError(error, file, fileList){
                this.$Message.error({
                    content: file.name + '文件上传失败，请重新上传',
                    duration: 3
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-account {
        @include block_outline();
        background: $color_f4f6f9;

        .add-account-info {
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

            .img-item{
                width: 58px;
                height: 58px;
                display: inline-block;
                margin-right: 5px;
                vertical-align: top;
                border-radius: 4px;
                border: 1px dashed antiquewhite;
            }

            .upload-wrap{
                display: inline-block;
                width: 58px;
            }

        }

        .footer {
            text-align: center;
            margin-top: 40px;

            /deep/ .ivu-btn-primary {
                margin-right: 18px;
            }
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
