<template>
    <Modal
        v-model="visible"
        class="addChannel"
        class-name="vertical-center-modal"
        :mask-closable="false"
        :width="lang === 'zh-CN' ? 560 : 650"
        :title="type=='add' ? $t('addSelfChannel') : $t('editSelfChannel')"
        @on-cancel="hide">

        <!--内容区域-->
        <Form ref="formValidate" :model="addChannel" :rules="ruleValidate" :label-width="lang === 'zh-CN' ? 120 : 200">
            <!--自营渠道名称-->
            <Form-item :label="$t('selfSaleChannelName')" prop="channelName">
                <Input v-model="addChannel.channelName" :placeholder="$t('inputField', {field: ''})" />
            </Form-item>
            <!--自营渠道类型-->
            <Form-item :label="$t('selfSaleChannelType')" prop="type">
                <RadioGroup v-model="addChannel.type" >
                    <Radio label="online" :disabled="addChannel.type === 'offline'"><span>{{$t('online')}}</span></Radio>
                    <!--<Radio label="offline" style="margin-right: 0;"><span>{{$t('offline')}}</span></Radio>-->
                </RadioGroup>
                <!--<Tooltip placement="top" transfer>-->
                    <!--<i class="iconfont icon-note"></i>-->
                    <!--<div slot="content">-->
                        <!--<div class="tip-trade">{{$t('createChannelNotice')}}</div>-->
                    <!--</div>-->
                <!--</Tooltip>-->
            </Form-item>
            <!--URL-->
            <Form-item label="URL">
                <Input v-model="addChannel.serverUrl"
                       :placeholder="$t('inputField', {field: ''})"
                       @on-blur="createQrcode"/>
            </Form-item>
            <!--二维码-->
            <Form-item :label="$t('二维码')">
                <img v-if="qrCodeSrc"
                     class="qrcode-img"
                     :src="qrCodeSrc"
                     @click="previewImage">
                <div class="qrcode-img" v-else></div>
                <span v-if="qrCodeSrc" class="download-qrcode" @click="downLoadQrcode">{{$t('下载二维码')}}</span>
            </Form-item>
            <!--APP ID-->
            <Form-item label="APP ID" prop="appId">
                <Input v-model="addChannel.appId"
                       :disabled="true"
                       :placeholder="$t('inputField', {field: ''})" />
            </Form-item>
            <!--APP Secret-->
            <Form-item label="APP Secret" prop="appSecret">
                <Input v-model="addChannel.appSecret"
                       :disabled="true"
                       :placeholder="$t('inputField', {field: ''})" />
            </Form-item>
            <!--备注-->
            <Form-item :label="$t('remark') + '：'" prop="description">
                <Input v-model="addChannel.description" type="textarea" :rows="4" :placeholder="$t('inputField', {field: ''})"/>
            </Form-item>

        </Form>
        <!--自定义页脚-->
        <div slot="footer">
            <template>
                <i-button type="primary" @click="submit()">{{$t('save')}}</i-button>
                <i-button type="ghost" @click="hide">{{$t('cancel')}}</i-button>
            </template>
        </div>
        <!--二维码预览-->
        <image-preview ref="imagePreview"
                       :images="[qrCodeSrc]">
            <img class="qrcode-img" :src="qrCodeSrc">
        </image-preview>

    </Modal>

</template>

<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import pick from 'lodash/pick';
    import { mapGetters } from 'vuex';
    import imagePreview from '@/components/imagePreview/index.vue';
    import apiList from '@/api/apiList';
    import ajaxConfig from '@/config/index.js';

    export default {
        components : {
            imagePreview
        },
        props : [],
        data () {
            return {
                visible : false, //显示模态框变量
                // 表单变量
                addChannel : {
//                    id: '',
                    channelName : '',
                    type : 'online',
                    serverUrl : '',
                    appId : '',
                    appSecret : '',
                    status : 'valid',
                    description : ''
                },
                // 新增or修改
                type : 'add',

                // 校验规则
                ruleValidate : {
                    channelName : [
                        { required : true, message : this.$t('inputField', { field : this.$t('selfSaleChannelName') }), trigger : 'blur' },
                        { max : 100, message : this.$t('errorMaxLength', { field : this.$t('selfSaleChannelName'), length : 100 }), trigger : 'blur' }, // 自营渠道名称不能超过100字符
                    ],
                    description : [
                        { max : 100, message : this.$t('errorMaxLength', { field : this.$t('remark'), length : 100 }), trigger : 'blur' }, // 备注不能超过100字符
                    ]
                },
                //二维码图片对应的链接
                qrCodeSrc : '',
                //后台生成的图片链接地址
                imgUrl : ''
            };
        },
        methods : {

            /**
             * 显示模态框
             * @param data {data有值表示查看，反之新增}
             */
            show (data) {
                if ( data.item ) {
                    this.addChannel = defaultsDeep({}, pick(data.item, [...Object.keys(this.addChannel), 'id']), this.addChannel);
                } else {
                    if ('id' in this.addChannel) {
                        delete this.addChannel.id;
                    }
                }
                this.type = data.type;
                if (data.type === 'add') {
                    //新增的时候获取appid和appSecret
                    this.generateChannelAccount();
                }
                this.createQrcode();
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.addChannel.serverUrl = '';
            },
            /**
             * 创建自定义指标表单校验
             */
            submit () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.confirmAdd();
                    }
                });
            },
            // 确定新增自营渠道
            confirmAdd () {
                let self = this;
                let partnerObj = {};
                if (this.type == 'add') {
                    partnerObj.successTip = this.$t('addChannelSuccess');
                    partnerObj.failTip = this.$t('addChannelFail');
                } else if (this.type == 'modify') {
                    partnerObj.successTip = this.$t('modifyChannelSuccess');
                    partnerObj.failTip = this.$t('modifyChannelFail');
                }

                ajax.post('addOrUpdateSelfChannel', this.addChannel).then(res => {
                    if (res.success) {
                        self.$Message.success(partnerObj.successTip + '：' + self.addChannel.channelName);
                        self.$emit('on-add-success');
                        self.hide();
                    } else {
                        this.$Message.error(res.message ? res.message : partnerObj.failTip);
                    }
                });
            },
            /**
             * 生成appid和appSecret
             */
            generateChannelAccount () {
                ajax.post('generateChannelAccount').then(res => {
                    if (res.success) {
                        this.addChannel.appId = res.data ? res.data.appId : '';
                        this.addChannel.appSecret = res.data ? res.data.appSecret : '';
                    } else {
                        this.addChannel.appId = '';
                        this.addChannel.appSecret = '';
                    }
                });
            },
            /**
             * 生成链接对应的二维码信息
             */
            createQrcode () {
                this.qrCodeSrc = '';
                if (this.addChannel.serverUrl) {
                    this.$QRcode.toDataURL(this.addChannel.serverUrl, {
                        errorCorrectionLevel : 'H',
                        type : 'image/jpeg',
                        rendererOpts : {
                            quality : 0.5
                        },
                        width : 500
                    }).then(res => {
                        this.qrCodeSrc = res;
                    });
                }
            },
            /**
             * 预览二维码
             */
            previewImage () {
                this.$refs.imagePreview.show();
            },
            /**
             * 下载二维码
             */
            downLoadQrcode () {
                ajax.post('base64Str2Img',{
                    base64Str : this.qrCodeSrc,
                    name : 'qrCode.jpeg',
                }).then(res => {
                    this.imgUrl = res.data;
                    this.$nextTick(() => {
                        let alink = document.createElement('a');
                        let event = new MouseEvent('click');
                        alink.href = this.downloadUrl;
                        alink.dispatchEvent(event);
                    });
                });
            }
        },
        computed : {
            ...mapGetters([
                'lang'
            ]),
            //下载模板路径
            downloadUrl () {
                return ajaxConfig['HOST'] + apiList['downloadImage'] +
                    '?token=' + ajax.getToken().toString() +
                    '&url=' + this.imgUrl +
                    '&name=' + this.$t('QRCode.jpeg');
            },
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .addChannel {
        /deep/ .ivu-modal-body {
            padding: 42px 90px 20px 66px;
        }

        /deep/ .ivu-btn {
            width: 88px;
        }

        /deep/ .ivu-radio-group {
            .ivu-radio-wrapper:last-child {
                margin-right: 0;
            }
        }

        .qrcode-img{
            display: block;
            width: 130px;
            height: 130px;
            cursor: pointer;
        }

        .download-qrcode{
            cursor: pointer;
            font-size: 14px;
            color: #2f70df;
        }
    }
</style>
