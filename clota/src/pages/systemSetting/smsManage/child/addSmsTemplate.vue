<!--
内容：新增/编辑 短信模板
作者：djc
日期：
-->

<template>
    <div class="add-sms-template">

        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="localeRouter">
        </bread-crumb-head>

        <div class="add-member-content">

            <!--基本信息-->
            <div class="form-container">
                <Form ref="formValidate"
                      :model="smsForm"
                      :rules="ruleValidate"
                      label-position="top">

                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('templateName')" prop="templateName"><!--模板名称-->
                            <Input v-model.trim="smsForm.templetName"
                                   :placeholder="$t('inputField', {field: 'templateName'})"/>
                        </Form-item>
                    </div>

                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('templateType')" prop="templateType"><!-- 模版类型-->
                            <Select v-model="smsForm.templetType" :placeholder="$t('selectField', {msg: $t('type')})">
                                <!--<Option v-for="(item,index) in enumData.genderEnum"
                                        :key="index"
                                        :value="item.name">
                                    {{$t(item.desc)}}
                                </Option>-->
                                <Option value="1">{{$t('custom')}}</Option>
                            </Select>
                        </Form-item>
                    </div>

                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('templateContent')" prop="templateContent"><!-- 模版内容-->
                            <Input v-model.trim="smsForm.templetContent"
                                   type="textarea"
                                   :rows="5"
                                   :placeholder="$t('inputField', {feild: $t('templateContent')})"/>
                        </Form-item>
                        <p class="edit-tip" @click="$refs.exampleTplModal.show()">{{ $t('howToEditSmsTemplateContent') }}?</p>
                    </div>
                </Form>
            </div>

            <div class="content-footer">
                <template v-if="type === 'add'">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc">
                        {{$t('confirmAdd')}}
                    </Button>
                </template>
                <template v-if="type === 'modify'">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc">
                        {{$t('confirm')}}
                    </Button>
                </template>
                <Button type="ghost"
                        @click="goBack">
                    {{$t("cancel")}}
                </Button>
            </div>

        </div>
        <!--短信模板示例 - 弹窗-->
        <example-tpl-modal ref="exampleTplModal"></example-tpl-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import exampleTplModal from '../components/exampleTplModal.vue';
    import ajax from '@/api/index';

    export default {
        components: {
            breadCrumbHead,
            exampleTplModal
        },
        props: {},
        mixins : [lifeCycleMixins],
        data() {
            const validateMethod = {

                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                }

            };

            return {
                // 面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: '短信模板',   // 短信模板
                        router: {
                            name : 'smsTemplate'
                        },
                    }
                ],
                // 新增/修改
                type: 'add',
                loading: false,
                // 表单数据绑定
                smsForm: {
                    templetName: '',
                    templetType: '',
                    templetContent: '',
                },
                // 校验规则
                ruleValidate: {
                    templetName: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('templateName')}), trigger: 'blur'},     // 模板名称不能为空
                        {
                            type: 'string',
                            max: 15,
                            message: this.$t('errorMaxLength', {field: this.$t('templateName'), length: 15}),
                            trigger: 'blur'
                        },      // 模板名称不能超过15个字符
                        {validator: validateMethod.emoji, trigger: 'blur'}
                    ],
                    templetType: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('templateType')}), trigger: 'change'},     // 模板类型不能为空
                    ],
                    templetContent: [
                        {required: true, message: this.$t('errorEmpty', {msg: this.$t('templateContent')}), trigger: 'blur'},     // 模板内容不能为空
                        {
                            type: 'string',
                            max: 15,
                            message: this.$t('errorMaxLength', {field: this.$t('name'), length: 320}),
                            trigger: 'blur'
                        },      // 模板名称不能超过320个字符
                        {validator: validateMethod.emoji, trigger: 'blur'}
                    ],
                }
            }
        },
        computed: {
            localeRouter () {
                return this.type === 'add' ? this.$t('add') : this.$t('edit');      // 新增 ： 修改
            },
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {

                        //区分新增与修改
                        if( this.type === 'modify' ){

                            this.saveAndEditMember(this.smsForm);
                        }else {
                            //新增需求暂时不做
                        }
                    }
                })
            },

            /**
             * 获取路由信息
             */
            getParams(params) {
                console.log(params)
                if(this.$route.query.type === 'modify'){
                    if(params && Object.keys(params).length > 0){
                        this.type = this.$route.query.type;
                        this.initData(params);
                    }
                }
            },
            /**
             * 初始化编辑模版页面数据
             */
            initData(params) {
                this.smsForm = params
            },
            //返回
            goBack() {
                //区分新增与修改
                if( this.type === 'add' ){
                    this.$router.push({ name: 'smsTemplate'});
                }
                if( this.type === 'modify' ){
                    this.$router.back();
                }
            },
            //编辑并保存模版
            saveAndEditMember(params) {
                ajax.post('updateSmsTemplet',{
                    id: params.id,
                    templetName: params.templetName,
                    templetContent: params.templetContent
                }).then((res) => {
                    console.log(res)
                    if(res.success){
                        this.$Message.success(this.$t('successTip',{'tip' : this.$t('add')}));
                        this.$router.push({ name: 'smsTemplate'});
                    }else {
                        this.$Message.error(res.message || this.$t('failureTip',{'tip' : this.$t('add')}));
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

    .add-member-content{

        .form-container{
            width: 1000px;
            margin: 0 auto;
            height: 100%;
            background-color: #FFFFFF;
            border-radius: 4px;
            overflow: auto;
            .ivu-input-icon{
                z-index: 2;
            }

            /deep/ .ivu-form-item-label{
                padding-left: 0;
            }

            .ivu-form{
                padding: 30px  0;
                text-align: center;
            }

            .ivu-form-item-wrap{
                position: relative;
                min-width: 495px;
                /*width: 49%;*/
                text-align: left;
                vertical-align: middle;

                .ivu-form-item{
                    width: 600px;
                    margin: 0 auto 18px;
                    text-align: left;

                    .ivu-date-picker {
                        display: block;
                    }

                    .ivu-select-selected-value,
                    .ivu-input{
                        font-size: 14px;
                    }

                    .ivu-select-item{
                        font-size: 14px !important;
                    }
                }

                .edit-tip {
                    width: 600px;
                    margin: 0 auto;
                    color: $color_blue;
                    font-size: $font_size_12px;
                    cursor: pointer;
                }

            }

        }

        .content-footer{
            text-align: center;

            /deep/ .ivu-btn{
                width: 108px;
                &:nth-child(1){
                    margin-right: 20px;
                }
            }

        }

    }
</style>
