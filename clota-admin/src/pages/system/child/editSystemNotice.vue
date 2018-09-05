<!--新增/编辑/查看公告-->

<template>
    <div class="add-account">
        <bread-crumb-head
            :locale-router="$t(type === 'add' ? 'addSystemNotice' : 'editSystemNotice')"
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
                            <Upload
                                class="upload-wrap"
                                action="//jsonplaceholder.typicode.com/posts/">
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
            <div class="footer" v-if="type !== 'view'">
                <Button type="primary"
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t(type === 'add' ? 'addNew' : 'confirmEdit')}}
                </Button>
                <Button type="primary"
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t(type === 'add' ? 'addNew' : 'confirmEdit')}}
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
                    images: [],
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
                        { required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('noticeContent')}), trigger: 'change' },
                    ],
                },
                //是否正在添加中
                addLoading: false,
                //账号操作类型
                type : ''
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
                            file: this.formData.images,
                        };
                        if (this.type === 'add') {
//                            this.addNotice(this.formData);
                        }else {
                            params.id = this.formData.id;
//                            this.updateNotice(params);
                        }
                        console.log(params)
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
             * 取消新增
             */
            cancel() {
                this.$router.push({
                    name: 'account'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.type) {
                    this.type = params.type;
                    this.formData = params.info ? params.info : { title: '',content: '',images: [] };
                }else{
                    this.$router.push({
                        name : 'systemNotice'
                    });
                }
            }
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
