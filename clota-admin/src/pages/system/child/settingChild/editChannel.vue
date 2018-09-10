<!--新增/编辑渠道-->

<template>
    <div class="add-type">
        <bread-crumb-head
            :locale-router="$t(type === 'add' ? 'addChannel' : 'editChannel')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-type-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <i-row>
                    <i-col span="11">
                        <FormItem :label="$t('channelName')" prop="channelName">
                            <Input v-model.trim="formData.channelName"
                                   :placeholder="$t('validateError.pleaseInput', {msg: $t('channelName')})"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem :label="$t('channelCode')" prop="channelNo">
                            <Input v-model.trim="formData.channelNo"
                                   :placeholder="$t('validateError.pleaseInput', {msg: $t('channelCode')})"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <FormItem :label="$t('isUsing')">
                            <Checkbox v-model="formData.status">{{$t('startUsing')}}</Checkbox>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
            <div class="footer">
                <Button type="primary"
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t(type === 'add' ? 'addNew' : 'confirmEdit')}}
                </Button>
                <Button @click="cancel"
                        class="ivu-btn-min">
                    {{$t('cancel')}}
                </Button>
            </div>
        </div>
    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import {validator} from 'klwk-ui';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index';

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

            //校验数字
            const validateNumber = (rule, value, callback) => {
                if (value && !validator.isNumber(value)) {
                    callback(new Error( this.$t('numError', {field: this.$t('channelCode')}) ));
                } else {
                    callback();
                }
            };

            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('channelInfo'),
                        router: {
                            name: 'channel'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //渠道名称
                    channelName: '',
                    //渠道编号
                    channelNo: '',
                    //渠道是否启用
                    status: '',
                },
                //表单校验规则
                ruleValidate: {
                    channelName : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('channelName')}), trigger: 'blur'},
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { type: 'string', max: 20, message: this.$t('errorMaxLength', {field: this.$t('channelName'), length: 20}), trigger: 'blur' },
                    ],
                    channelNo : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('channelCode')}), trigger: 'blur'},
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' },
                        { type: 'string', max: 8, message: this.$t('errorMaxLength', {field: this.$t('channelCode'), length: 8}), trigger: 'blur' },
                    ]
                },
                //是否正在添加中
                addLoading: false,
                //操作类型
                type : ''
            }
        },
        methods: {
            /**
             * 保存渠道数据
             */
            save() {
                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        this.addLoading = true;
                        let params = {
                            channelName: this.formData.channelName,
                            channelNo: this.formData.channelNo,
                            status: this.formData.status ? 'normal' : 'invalid',
                        };
                        if (this.type === 'add') {
                            this.addChannel(params);
                        }else {
                            params.id = this.formData.id;
                            this.updateChannel(params);
                        }
                    }
                });
            },
            /**
             * 新增渠道
             */
            addChannel( params ) {
                ajax.post('addChannel', params).then(res => {
                    this.addLoading = false;
                    if(res.status === 200){
                        this.$Message.success(this.$t('addSuccess'));
                        this.$router.push({ name: 'channel'});
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 修改渠道
             * @param params
             */
            updateChannel( params ) {
                ajax.post('updateChannel', params).then(res => {
                    this.addLoading = false;
                    if(res.status === 200){
                        this.$Message.success(this.$t('edit') + this.$t('success'));
                        this.$router.push({ name: 'channel'});
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
                    name: 'channel'
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
                        this.formData.id = params.info.id;
                        this.formData.channelName = params.info.channelName;
                        this.formData.channelNo =  params.info.channelNo;
                        this.formData.status = params.info.status === 'normal' ? true : false;
                    }
                }else{
                    this.$router.push({
                        name : 'channel'
                    });
                }
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-type {
        @include block_outline();
        background: $color_f4f6f9;

        .add-type-info {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline(924px, auto);
                margin: 0 auto;

                /deep/ .ivu-input-wrapper{
                    width: 280px;
                }

                textarea.ivu-input{
                    height: 70px;
                }
            }
        }

        .footer {
            text-align: center;
            margin-top: 40px;

            /deep/ .ivu-btn-primary {
                margin-right: 18px;
            }
        }
    }
</style>
