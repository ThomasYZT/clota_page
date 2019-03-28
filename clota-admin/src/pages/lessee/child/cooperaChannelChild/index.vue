<!--合作渠道详情-->

<template>
    <div class="coopera-channel-detail">
        <bread-crumb-head
            :locale-router="$t('lesseeDetail')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="lessee-per-detail">
            <div class="less-content">
                <div class="less-name">
                    <span class="name" v-w-title="cooperaPerDetail.name">{{cooperaPerDetail.name}}</span>
                    <span class="status pass-result" v-if="auditStatus === 'success'">审核通过</span>
                    <span class="status audit-wait" v-else-if="auditStatus === 'audit'">待审核</span>
                    <span class="status nopass-result" v-else-if="auditStatus === 'reject'">审核不通过</span>
                </div>
                <div class="audit-area" v-if="showAuditBtn">
                    <Button type="primary" @click="auditPass">审核通过</Button>
                    <Button type="error" class="ivu-btn-90px" @click="reject">驳回</Button>
                </div>
                <div class="audit-area" v-if="isAudiitSuccess">
                    <Button type="primary" class="ivu-btn-90px" @click="modify">{{$t('修改')}}</Button>
                </div>
            </div>
            <ul class="cooper-detail">
                <template v-for="(item,index) in cooperaPerDetail.info">
                    <li class="list" v-if="item.length === 3" :key="index">
                        <div class="info-list1">
                            <span class="info-key">{{item[0].label}}：</span>
                            <span class="info-val" v-w-title="item[0].value">{{item[0].value | contentFilter}}</span>
                        </div>
                        <div class="info-list2">
                            <span class="info-key">{{item[1].label}}：</span>
                            <span class="info-val" v-w-title="item[1].value">{{item[1].value | contentFilter}}</span>
                        </div>
                        <div class="info-list3" v-if="item[2].label">
                            <span class="info-key">{{item[2].label}}：</span>
                            <span class="info-val" v-w-title="item[2].value">
                                {{item[2].value | contentFilter}}
                                <span class="reset-pass"
                                      v-if="item[2].type === 'controlAccount' && isAudiitSuccess"
                                      @click="resetPass(item[2])">{{$t('重置密码')}}</span>
                            </span>
                        </div>
                    </li>
                    <li class="list" v-if="item.length === 2" :key="index">
                        <div class="info-list4">
                            <span class="info-key">{{item[0].label}}：</span>
                            <span class="info-val" v-w-title="item[0].value">{{item[0].value | contentFilter}}</span>
                        </div>
                        <div class="info-list5">
                            <span class="info-key">{{item[1].label}}：</span>
                            <span class="info-val">
                                <image-preview :images="item[1].value">
                                    <img v-for="(picture, imgIndex) in item[1].value"
                                         :key="imgIndex"
                                         class="classify-img"
                                         :src="picture" alt="">
                                </image-preview>
                            </span>
                        </div>
                    </li>
                </template>
            </ul>

            <!--在线收款账户-->
            <online-receipt v-if="isAudiitSuccess"
                            :show-pick-up="false"
                            :active-node="{ id : channelId }"
                            :receipt-account-info="lessDetail"
                            @fresh-org-data="getLesseeDetail">
            </online-receipt>

            <div class="partner-area" v-if="isAudiitSuccess">
                <div class="partner-name">合作伙伴</div>
                <div class="count">合作伙伴数：{{totalCount}}</div>
                <table-com
                    v-if="channelId"
                    :column-data="columnData"
                    :table-data="partnerTableData"
                    :border="true"
                    :table-com-min-height="300"
                    :auto-height="true"
                    @query-data="getChannelPartners">
                    <el-table-column
                        slot="columnindex"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{scope.$index+ 1}}
                        </template>
                    </el-table-column>
                </table-com>
            </div>

            <!--下属部门-->
            <sub-department
                v-if="isAudiitSuccess"
                :isDefaultPackUp="true"
                :is-partner="true"
                :search-params="{id : channelId}">
            </sub-department>
            <!--员工-->
            <employee-table
                v-if="isAudiitSuccess"
                :is-partner="true"
                :isDefaultPackUp="true"
                :search-params="{id : channelId}">
            </employee-table>
        </div>
        <!--驳回注册申请模态框-->
        <edit-modal ref="rejectModal">
            <Form :model="formData"
                  key="rejectForm"
                  ref="rejectForm"
                  :rules="ruleValidate"
                  :label-width="0">
                <FormItem :label="channelType === 'per' ? $t('cooperaChannelPer') : $t('cooperaChannelOrg') + '：'">
                    <span>{{cooperaPerDetail.name}}</span>
                </FormItem>
                <FormItem label="驳回原因：" prop="passReason">
                    <Input v-model.trim="formData.passReason"
                           placeholder="请填写驳回原因，不超过20个字符"
                           type="textarea"
                           style="width: 280px"/>
                </FormItem>
            </Form>
        </edit-modal>

        <auditModal ref="auditModal" @updateInfo="updateInfo"></auditModal>

        <!--重置密码模态框-->
        <edit-modal ref="resetModal">
            <div class="edit-modal-tip-word">
                您正在重置管理员{{currentData.accountName}}的登录密码，
                我们将以邮件形式将新密码发送到以下邮箱，请注意查收：{{currentData.email}}
            </div>
        </edit-modal>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editModal from '@/components/editModal/index.vue';
    import auditModal from './components/auditModal';
    import getFiledData from './channelConfig';
    import ajax from '@/api/index.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { channelsGroupList, otaTypeList } from '@/assets/js/constVariable';
    import onlineReceipt from '../ISPinternetChild/ISPinternetDetailChild/components/onlineReceipt';
    import subDepartment from '../ISPinternetChild/ISPinternetDetailChild/components/subDepartment';
    import employeeTable from '../ISPinternetChild/ISPinternetDetailChild/components/employeeTable';
    import imagePreview from '@/components/imagePreview/index.vue';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            tableCom,
            editModal,
            onlineReceipt,
            imagePreview,
            subDepartment,
            employeeTable,
            auditModal
        },
        data () {
            //校验邮箱地址是否正确
            // const validateEmail = (rule,value,callback) => {
            //     if (value) {
            //         if (validator.isEmail(value)) {
            //             callback();
            //         } else {
            //             callback(this.$t('formalError',{ field : this.$t('email') }));
            //         }
            //     } else {
            //         callback(this.$t('inputField',{ field : this.$t('email') }));
            //     }
            // };
            return {
                //上级路由列表
                beforeRouterList : [],
                //表格数据
                partnerTableData : [],
                //表头配置
                columnData : [
                    {
                        title : '序号',
                        minWidth : 120,
                        field : 'index'
                    },
                    {
                        title : '合作伙伴名称',
                        minWidth : 150,
                        field : 'name'
                    },
                ],
                //表单校验规则
                ruleValidate : {
                    passReason : [
                        { required : true,message : this.$t('inputField',{ field : this.$t('rejectReason') }),trigger : 'blur' },
                        { max : 20,message : this.$t('errorMaxLength',{ field : this.$t('rejectReason'),length : 20 }),trigger : 'blur' }
                    ],
                    // email : [
                    //     { required : true,message : this.$t('inputField',{ field : this.$t('email') }),trigger : 'blur' },
                    //     { validator : validateEmail ,trigger : 'blur' },
                    //     { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('email'),length : 100 }),trigger : 'blur' }
                    // ]
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
                //表单数据
                formData : {
                    //通过原因
                    passReason : '',
                    //邮件地址
                    //email : '',
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
                //合作伙伴总数
                totalCount : 0,
                //渠道类型
                channelType : '',
                //个人渠道详情信息
                cooperaPerDetail : {
                    name : '',
                    info : []
                },
                //合作渠道id
                channelId : '',
                //审核状态
                auditStatus : '',
                //合作渠道信息
                channelDetailInfo : {},
                //合作伙伴渠道列表
                channelsGroupList : channelsGroupList,
                //ota参数配置集
                otaTypeList : otaTypeList,
                //租户详情信息
                lessDetail : {},
                //当前操作的数据
                currentData : {},
            };
        },
        methods : {
            /**
             * 审核通过
             */
            auditPass () {
                this.$refs.auditModal.show(this.channelId, this.channelType, this.cooperaPerDetail);
            },
            /**
             * 驳回申请
             */
            reject () {
                this.$refs.rejectModal.show({
                    title : '驳回注册申请',
                    confirmBtn : '驳回',
                    confirmCallback : (pass) => {
                        this.$refs.rejectForm.validate(valid => {
                            if (valid) {
                                this.auditPartner({
                                    auditStatus : 'reject',
                                    reason : this.formData.passReason
                                });
                            }
                        });
                    },
                    cancelCallback : () => {
                        this.$nextTick(() => {
                            this.$refs.rejectForm.resetFields();
                        });
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params.type) {
                    this.channelId = params.id;
                    if (params.type === 'per') {
                        this.channelType = 'per';
                        this.beforeRouterList = [
                            {
                                name : this.$t('cooperaChannelPer'),
                                router : {
                                    name : 'cooperaChannelPer'
                                }
                            }
                        ];
                    } else if (params.type === 'org') {
                        this.channelType = 'org';
                        this.beforeRouterList = [
                            {
                                name : this.$t('cooperaChannelOrg'),
                                router : {
                                    name : 'cooperaChannelOrg'
                                }
                            }
                        ];
                    }
                    this.getPartnerDetail();
                } else {
                    this.$router.push({
                        name : 'ISPinternet'
                    });
                }
            },
            /**
             * 获取合作渠道详情
             */
            getPartnerDetail () {
                ajax.post('getPartnerDetail',{
                    id : this.channelId
                }).then(res => {
                    if (res.status === 200) {
                        this.cooperaPerDetail.name = res.data ? res.data.orgName : {};
                        this.channelDetailInfo = res.data ? res.data : {};
                        //个人渠道信息
                        if (this.channelType === 'per') {
                            this.cooperaPerDetail.info = getFiledData(
                                this.channelType,
                                res.data.certificateNumber,
                                res.data.telephone,
                                res.data.managerAccount,
                                res.data.email,
                                (res.data.province ? res.data.province : '') + ( res.data.city ? res.data.city : res.data.city + '') + (res.data.area ? res.data.area : ''),
                                res.data.address,
                                res.data.businessAccount,
                                res.data.createdTime,
                                res.data.updatedTime,
                                res.data.auditTime,
                                res.data.updateUser,
                                res.data.description,
                                res.data.attach);
                        } else {//机构渠道信息
                            this.cooperaPerDetail.info = getFiledData(
                                this.channelType,
                                res.data.linkName,
                                res.data.telephone,
                                res.data.managerAccount,
                                res.data.certificateNumber,
                                (res.data.province ? res.data.province : '') + ( res.data.city ? res.data.city : res.data.city + '') + (res.data.area ? res.data.area : ''),
                                res.data.address,
                                res.data.email,
                                res.data.createdTime,
                                res.data.businessAccount,
                                res.data.updatedTime,
                                res.data.auditTime,
                                res.data.updateUser,
                                res.data.description,
                                res.data.attach);
                        }
                        this.auditStatus = res.data.auditStatus;
                        //this.formData.email = res.data.email;
                        this.getLesseeDetail();
                    } else {
                        this.cooperaPerDetail.name = '';
                        this.auditStatus = '';
                        //this.formData.email = '';
                        this.channelDetailInfo = {};
                    }
                });
            },
            /**
             * 获取合作伙伴信息
             */
            getChannelPartners () {
                ajax.post('getChannelPartners',{
                    id : this.channelId
                }).then(res => {
                    if (res.status === 200) {
                        this.partnerTableData = res.data.channelParentListVos ? res.data.channelParentListVos : [];
                        this.totalCount = res.data.parentNumber ? res.data.parentNumber : 0;
                    } else {
                        this.partnerTableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 审核渠道
             * @param params
             */
            auditPartner (params) {
                ajax.post('auditPartner',Object.assign({
                    id : this.channelId,
                    partnerChannelType : this.channelType === 'per' ? '' : this.formData.partnerChannelType,
                    //email : this.formData.email,
                },params)).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('审核成功');
                        this.getPartnerDetail();
                        this.getChannelPartners();
                    } else {
                        this.$Message.error('审核失败');
                    }
                }).finally(() => {
                    this.$refs.passModal.hide();
                    this.$refs.rejectModal.hide();
                });
            },
            /**
             * 跳转到修改合作伙伴信息页面
             */
            modify () {
                this.$router.push({
                    name : this.channelType === 'per' ? 'cooperaChannelPerDetailModify' : 'cooperaChannelOrgDetailModify',
                    params : {
                        formData : this.channelDetailInfo
                    }
                });
            },
            /**
             * 获取租户详情
             */
            getLesseeDetail () {
                ajax.post('getServiceProvider',{
                    id : this.channelDetailInfo.id
                }).then(res => {
                    if (res.status === 200) {
                        this.lessDetail = res.data ? res.data : {};
                        this.lessDetail.auditStatus = this.auditStatus;
                    } else {
                        this.lessDetail = {};
                    }
                });
            },
            /**
             * 重置合作伙伴密码
             * @param partnerDetail
             */
            resetPass (partnerDetail) {
                this.currentData = {
                    accountName : partnerDetail.value,
                    email : partnerDetail.extraData.email,
                };
                this.$refs.resetModal.show({
                    title : this.$t('resetPass'),
                    confirmCallback : () => {
                        this.confimChangePass();
                    }
                });
            },
            /**
             * 确认重置密码
             */
            confimChangePass () {
                ajax.post('resetPwd',{
                    id : this.channelDetailInfo ? this.channelDetailInfo.managerAccountId : ''
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('重置成功');
                    } else {
                        this.$Message.error(res.message || '重置失败');
                    }
                }).finally(() => {
                    this.$refs.resetModal.hide();
                });
            },
            /**
             * 更新信息
             */
            updateInfo () {
                this.getPartnerDetail();
                this.getChannelPartners();
            }
        },
        computed : {
            //是否显示通过和驳回的按钮
            showAuditBtn () {
                return this.auditStatus === 'audit';
            },
            //是否审核通过
            isAudiitSuccess () {
                return this.auditStatus === 'success';
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .coopera-channel-detail{
        @include block_outline();
        overflow: auto;

        .lessee-per-detail{
            min-height: calc(100% - 74px);
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 12px 40px 0 40px;

            .less-content{
                padding: 10px 0;
                overflow: hidden;
                @include block_outline($height : 52px);

                .less-name{
                    @include block_outline(unquote('calc(100% - 226px)'));
                    font-size: $font_size_20px;
                    color: rgba($color_000,0.85);
                    float: left;
                    line-height: 32px;

                    .status{
                        display: inline-block;
                        font-size: $font_size_14px;
                        vertical-align: top;
                    }

                    .audit-wait{
                        color:$color_yellow
                    }

                    .pass-result{
                        color: $color_green;
                    }

                    .nopass-result{
                        color: $color_err;
                    }

                    .name{
                        display: inline-block;
                        max-width: calc(100% - 60px);
                        @include overflow_tip();
                    }
                }

                .audit-area{
                    float: left;
                    text-align: right;
                    @include block_outline(226px);

                    .ivu-btn-primary{
                        margin-right: 5px;
                    }
                }
            }

            .cooper-detail {
                @include block_outline($height: auto);
                padding-bottom: 21px;
                border-bottom: 1px dashed $color_E1E1E1;

                .list {
                    /*display: flex;*/
                    /*align-items: center;*/
                    @include block_outline(auto);
                    min-height: 37px;
                    overflow: auto;
                    padding: 7.5px 0;
                    line-height: 22px;

                    .classify-img{
                        @include block_outline(100px,100px);
                        display: block;
                        cursor: pointer;
                    }

                    .info-list1,
                    .info-list3,
                    .info-list4,
                    .info-list5,
                    .info-list2 {
                        display: flex;
                        flex-direction: row;
                        float: left;
                        font-size: $font_size_14px;
                        /*align-items: center;*/

                        .info-key {
                            @include block_outline(auto, 100%,false);
                            color: $color_333;

                            &.fix-key{
                                width: 120px;
                                text-align: left;
                            }
                        }

                        .info-val {
                            flex: 1;
                            @include overflow_tip(auto, auto);
                            color: $color_666;

                            .reset-pass{
                                color: $color_blue;
                                font-size: $font_size_12px;
                                margin-left: 10px;
                                display: inline-block;
                                cursor: pointer;
                            }
                        }
                    }


                    .info-list1 {
                        @include block_outline(30%, auto);
                    }

                    .info-list2 {
                        @include block_outline(30%, auto);
                        padding-left: 15px;
                    }

                    .info-list3,
                    .info-list5{
                        @include block_outline(40%, auto);
                        padding-left: 15px;
                    }

                    .info-list5 {
                        img {
                            float: left;
                            margin-right: 10px;
                            width: 200px;
                        }
                    }

                    .info-list4{
                        @include block_outline(60%, auto);

                        .info-val{
                            overflow: auto;
                            white-space: normal;
                        }
                    }

                }
            }

            .partner-area{
                margin-top: 20px;
                @include block_outline(400px,auto);

                .partner-name{
                    @include block_outline($height : 34px);
                    font-size: 16px;
                    color: $color_333;
                    padding: 5px 0;
                }

                .count{
                    @include block_outline($height : 29px);
                    padding: 5px 0;
                    font-size: $font_size_14px;
                    color: $color_666;
                    margin-bottom: 10px;
                }
            }
        }
    }
    /deep/ .form-wrap{
        width: 300px;
    }
    .edit-modal-tip-word{
        @include block_outline(100%,auto);
        padding: 20px;
        word-break: break-all;
    }
</style>
