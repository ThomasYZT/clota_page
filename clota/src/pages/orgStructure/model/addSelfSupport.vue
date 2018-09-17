<template>
    <Modal
        v-model="visible"
        class="addChannel"
        class-name="vertical-center-modal"
        :mask-closable="false"
        :width="560"
        :title="type=='add' ? $t('新增自营渠道') : $t('修改自营渠道')"
        @on-cancel="hide">

        <!--内容区域-->
        <Form ref="formValidate" :model="addChannel" :rules="ruleValidate" :label-width="120">
            <!--自营渠道名称-->
            <Form-item label="自营渠道名称" prop="channelName">
                <Input v-model="addChannel.channelName" :placeholder="$t('inputField', {field: ''})" />
            </Form-item>
            <!--自营渠道类型-->
            <Form-item label="自营渠道类型" prop="type">
                <RadioGroup v-model="addChannel.type">
                    <Radio label="online"><span>线上</span></Radio>
                    <Radio label="offline" style="margin-right: 0;"><span>线下</span></Radio>
                    <Tooltip placement="top">
                        <i class="iconfont icon-note"></i>
                        <div slot="content">
                            <div class="tip-trade">{{$t('创建线下自营渠道（款台）请至组织结构内新增款台节点')}}</div>
                        </div>
                    </Tooltip>
                </RadioGroup>
            </Form-item>
            <!--URL-->
            <Form-item label="URL">
                <Input v-model="addChannel.serverUrl" :placeholder="$t('inputField', {field: ''})" />
            </Form-item>
            <!--APP ID-->
            <Form-item label="APP ID" prop="appId">
                <Input v-model="addChannel.appId" :placeholder="$t('inputField', {field: ''})" />
            </Form-item>
            <!--APP Secret-->
            <Form-item label="APP Secret" prop="appSecret">
                <Input v-model="addChannel.appSecret" :placeholder="$t('inputField', {field: ''})" />
            </Form-item>

        </Form>
        <!--自定义页脚-->
        <div slot="footer">
            <template>
                <i-button type="primary" @click="submit()">{{$t('save')}}</i-button>
                <i-button type="ghost" @click="hide">{{$t('cancel')}}</i-button>
            </template>
        </div>

    </Modal>

</template>

<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import pick from 'lodash/pick';

    export default {
        components: {},
        props: [],
        data() {
            return {
                visible: false, //显示模态框变量
                // 表单变量
                addChannel: {
//                    id: '',
                    channelName: '',
                    type: 'online',
                    serverUrl: '',
                    appId: '',
                    appSecret: '',
                    status: 'valid'
                },
                // 新增or修改
                type: 'add',
                emptyParams: '',

                // 校验规则
                ruleValidate: {
                    channelName: [
                        {required: true, message: '请输入自营渠道名称', trigger: 'blur'},
                        { max: 100, message: this.$t('errorMaxLength', {field: this.$t('自营渠道名称'), length: 100}), trigger: 'blur' },  // 自营渠道名称不能超过100字符
                    ],
                },

            }
        },
        computed: {},
        created() {
            this.emptyParams = JSON.stringify(this.addChannel);
        },
        watch: {},
        methods: {

            /**
             * 显示模态框
             * @param data {data有值表示查看，反之新增}
             */
            show(data) {
                if( data.item ){
                    this.addChannel = defaultsDeep({}, pick(data.item, [...Object.keys(this.addChannel), 'id']), this.addChannel);
                }
                this.type = data.type;

                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide() {
                this.visible = false;
                this.addChannel = JSON.parse(this.emptyParams);
            },
            /**
             * 创建自定义指标表单校验
             */
            submit() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.confirmAdd();
                    }
                });
            },
            // 确定新增自营渠道
            confirmAdd() {
                let partnerObj = {};
                if (this.type=='add') {
                    partnerObj.successTip = '您已成功新增自营渠道';
                    partnerObj.failTip = '新增自营渠道失败';
                } else if (this.type=='modify') {
                    partnerObj.successTip = '您已成功修改自营渠道';
                    partnerObj.failTip = '修改自营渠道失败';
                }

                ajax.post('addOrUpdateSelfChannel', this.addChannel).then(res => {
                    if (res.success) {
                        this.hide();

                        this.$Message.success(partnerObj.successTip + '：' + this.addChannel.channelName);
                        this.$emit('on-add-success');
                    } else {
                        this.$Message.error(res.message ? res.message : partnerObj.failTip);
                    }
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    @import '../commonFile/common';

    .addChannel {
        /deep/ .ivu-modal-body {
            padding: 42px 90px 40px 66px;
        }

        /deep/ .ivu-btn {
            width: 88px;
        }

        /deep/ .ivu-radio-group {
            .ivu-radio-wrapper:last-child {
                margin-right: 0;
            }
        }
    }
</style>
