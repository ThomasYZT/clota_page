<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div>
        <!--审核通过模态框-->
        <Modal ref="passModal"
               v-model="visible"
               :title="$t('注册申请审核通过')"
               class-name="add-account-modal vertical-center-modal"
               width="600"
               :mask-closable="false"
               @on-cancel="hide">

            <Form :model="formData"
                  class="form-wrap"
                  key="passForm"
                  ref="passForm"
                  :rules="ruleValidate"
                  label-position="right"
                  :label-width="150">
                <FormItem :label="(channelType === 'per' ? $t('cooperaChannelPer') : $t('cooperaChannelOrg')) + '：'">
                    <span>{{cooperaPerDetail.name}}</span>
                </FormItem>
                <FormItem v-if="channelType !== 'per'"
                          :label="$t('partnerChannelType') + '：'"
                          prop="partnerChannelType">
                    <RadioGroup v-model="formData.partnerChannelType" @on-change="chengePartnerChannelType">
                        <Radio v-for="(item, index) in channelsGroupList"
                               :key="index"
                               :label="item.value">
                            {{$t(item.label)}}
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <template v-if="formData.partnerChannelType === 'ota'">
                    <FormItem label="OTA参数配置集：" prop="otaType">
                        <Select v-model="formData.otaType" style="width:200px">
                            <Option v-for="(item, index) in otaTypeList"
                                    :value="item.value"
                                    :key="index">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <p style="width: 150px; text-align: right;padding: 10px 12px 10px 0;">本OTA所包含的参数：</p>
                    <FormItem label="AppID：" prop="appID">
                        <Input v-model.trim="formData.appID" style="width: 200px"/>
                    </FormItem>
                    <FormItem label="Secret：" prop="secret">
                        <Input v-model.trim="formData.secret" style="width: 200px"/>
                    </FormItem>
                    <FormItem label="公钥：" prop="publicKey">
                        <Input v-model.trim="formData.publicKey" style="width: 200px"/>
                    </FormItem>
                </template>
            </Form>

            <div slot="footer" class="modal-footer">
                <Button type="primary" @click="pass()">{{$t("passed")}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { channelsGroupList, otaTypeList } from '@/assets/js/constVariable';
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    export default {
        components : {},
        data () {
            return {
                //g控制是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    //合作伙伴渠道类型
                    partnerChannelType : '',
                    //ota类型
                    otaType : '',
                    //appID
                    appID : '',
                    //secret
                    secret : '',
                    //公钥
                    publicKey : '',
                },
                //合作伙伴渠道列表
                channelsGroupList : channelsGroupList,
                //ota参数配置集
                otaTypeList : otaTypeList,
                //合作渠道id
                channelId : '',
                //渠道类型
                channelType : '',
                //个人渠道详情信息
                cooperaPerDetail : {},
                //表单校验规则
                ruleValidate : {
                    partnerChannelType : [
                        { required : true,message : this.$t('selectField',{ msg : this.$t('partnerChannelType') }),trigger : 'blur' },
                    ],
                    otaType : [
                        { required : true,message : this.$t('selectField',{ msg : 'OTA参数配置集' }),trigger : 'blur' },
                    ],
                    appID : [
                        { required : true,message : this.$t('selectField',{ msg : 'AppID' }),trigger : 'blur' },
                    ],
                    secret : [
                        { required : true,message : this.$t('selectField',{ msg : 'Secret' }),trigger : 'blur' },
                    ],
                    publicKey : [
                        { required : true,message : this.$t('selectField',{ msg : '公钥'}),trigger : 'blur' },
                    ],
                },
            };
        },
        methods : {
            /**
             * 显示模态框
             */
            show (channelId, channelType, cooperaPerDetail) {
                this.channelId = channelId;
                this.channelType = channelType;
                this.cooperaPerDetail = cooperaPerDetail;
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.$refs.passForm.resetFields();
                this.channelId = '';
                this.channelType = '';
                this.cooperaPerDetail = {};
                this.visible = false;
            },
            /**
             * 通过审核
             */
            pass () {
                if (this.channelType === 'per') {
                    this.auditPartner({
                        auditStatus : 'success'
                    });
                } else {
                    this.$refs.passForm.validate(valid => {
                        if (valid) {
                            this.auditPartner({
                                auditStatus : 'success',
                            });
                        }
                    });
                }
            },
            /**
             * 审核渠道
             * @param params
             */
            auditPartner (params) {
                let formData = this.formData.partnerChannelType !== 'ota' ? {
                        id : this.channelId,
                        partnerChannelType : this.channelType === 'per' ? '' : this.formData.partnerChannelType,
                    } : defaultsDeep({
                        id : this.channelId,
                        partnerChannelType : this.channelType === 'per' ? '' : this.formData.partnerChannelType,
                    }, this.formData);
                ajax.post('auditPartner',Object.assign(formData, params)).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('审核成功');
                        this.$emit('updateInfo');
                        this.hide();
                    } else {
                        this.$Message.error('审核失败');
                    }
                });
            },
            /**
             *  切换合作渠道类型
             */
            chengePartnerChannelType (val) {
                if (val === 'tour') {
                    this.formData.otaType = '';
                    this.formData.appID = '';
                    this.formData.secret = '';
                    this.formData.publicKey = '';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>
