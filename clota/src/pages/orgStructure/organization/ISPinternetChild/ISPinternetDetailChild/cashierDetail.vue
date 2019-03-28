
<!--款台信息-->

<template>
    <div class="cashier-detail">
        <Form ref="formValidate"
              :model="formDataCopy"
              :rules="ruleValidate"
              :class="{'form-edit' : type === 'edit','form-watch' : type === 'watch'}"
              :label-position="type === 'edit' ? 'top' : 'left'"
              inline>
            <div class="com-name">
                    <span class="name"
                          v-w-title="cashierDetail.channelName">
                        {{cashierDetail.channelName | contentFilter}}
                    </span>
                <template v-if="type === 'watch'">
                    <span class="edit"
                          v-if=" 'modifyNode' in permissionInfo"
                          @click="edit">
                        <span class="iconfont icon-edit"></span>
                        {{$t('modify')}}
                    </span>
                    <span :class="{'started' :cashierDetail.status === 'open' ,'not-started' : cashierDetail.status !== 'open'}">
                    {{$t(cashierDetail.status === 'open' ? 'hasStart' : 'hasNotStart')}}
                    </span>
                </template>
                <template v-else>
                    <i-row>
                        <i-col span="5" style="margin-left:20px;width: 73px;" v-if="activeNode.level !== 1">
                            <FormItem>
                                <i-switch v-model="formDataCopy.isStart"></i-switch>
                                <span :class="{'started' :formDataCopy.isStart ,'not-started' : !formDataCopy.isStart}">
                                {{$t(formDataCopy.isStart ? 'hasStart' : 'hasNotStart')}}
                            </span>
                            </FormItem>
                        </i-col>
                    </i-row>
                </template>
            </div>

            <div :class="{'form-area' : type === 'edit'}" style="clear: both">
                <i-row>
                    <i-col span="12">
                        <FormItem :label="$t('checkoutName')+'：'"
                                  v-if="type === 'edit'"
                                  :required="true"
                                  prop="channelName"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.channelName"/>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('checkoutName')}}：</span>
                            <span class="info-val"
                                  v-w-title="cashierDetail.channelName">
                                {{cashierDetail.channelName}}
                            </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem :label="$t('checkoutID')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.partnerId"
                                   disabled/>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('checkoutID')}}：</span>
                            <span class="info-val"
                                  v-w-title="cashierDetail.partnerId">
                                {{cashierDetail.partnerId}}
                            </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="serverUrl"
                                  v-if="type === 'edit'"
                                  :required="true"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.serverUrl"/>
                            <template slot="label">
                                <span>{{$t('serverName')}}：</span>
                                <Tooltip placement="bottom" transfer>
                                    <div slot="content" class="tips-content">
                                        {{$t('serverNameTips')}}
                                    </div>
                                    <span class="iconfont icon-note" style="color: #9e9e9e;"></span>
                                </Tooltip>
                            </template>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">
                                {{$t('serverName')}}：
                                 <Tooltip placement="bottom" transfer>
                                    <div slot="content" class="tips-content">
                                        {{$t('serverNameTips')}}
                                    </div>
                                     <span class="iconfont icon-note"></span>
                                </Tooltip>
                            </span>
                            <span class="info-val"
                                  v-w-title="cashierDetail.serverUrl">
                                {{cashierDetail.serverUrl}}
                            </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem :label="$t('cashierType')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Select v-model="formDataCopy.checkerType"
                                    disabled>
                                <Option v-for="item in cashierType"
                                        :value="item.value"
                                        :key="item.value"
                                        class="overflow-tip">
                                    {{ $t(item.label) }}
                                </Option>
                            </Select>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('cashierType')}}：</span>
                            <span class="info-val"
                                  v-w-title="$t(checkerType)">
                                 {{$t(checkerType) | contentFilter}}
                            </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem :label="$t('cashierTypeGroup')+'：'"
                                  v-if="type === 'edit' && (formDataCopy.checkerType === 'check' || formDataCopy.checkerType === 'combine')"
                                  prop="checkGroupId"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Select v-model="formDataCopy.checkGroupId"
                                    :clearable="true"
                                    :disabled="formDataCopy.checkerType === 'sale'">
                                <Option v-for="item in verifyCashierTypeGroupList"
                                        :value="item.id"
                                        class="overflow-tip"
                                        v-w-title="item.groupName"
                                        :key="item.id">
                                    {{ $t(item.groupName) }}
                                </Option>
                            </Select>
                        </FormItem>
                        <div class="node-info" v-if="type !== 'edit' && (cashierDetail.checkerType === 'check' || cashierDetail.checkerType === 'combine')">
                            <span class="info-key">{{$t('cashierTypeGroup')}}：</span>
                            <span class="info-val"
                                  v-w-title="cashierDetail.checkGroupName">
                                {{cashierDetail.checkGroupName ? cashierDetail.checkGroupName : $t('noGroup')}}
                            </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem :label="$t('saleTypeGroup')+'：'"
                                  v-if="type === 'edit' && (formDataCopy.checkerType === 'sale' || formDataCopy.checkerType === 'combine')"
                                  prop="saleGroupId"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Select v-model="formDataCopy.saleGroupId"
                                    :clearable="true"
                                    :disabled="formDataCopy.checkerType === 'check'">
                                <Option v-for="item in verifySaleTypeGroupList"
                                        :value="item.id"
                                        class="overflow-tip"
                                        v-w-title="item.groupName"
                                        :key="item.id">
                                    {{ item.groupName }}
                                </Option>
                            </Select>
                        </FormItem>
                        <div class="node-info"
                             v-if="type !== 'edit' && (cashierDetail.checkerType === 'sale' || cashierDetail.checkerType === 'combine')">
                            <span class="info-key">{{$t('saleTypeGroup')}}：</span>
                            <span class="info-val"
                                  v-w-title="cashierDetail.saleGroupName">
                                {{cashierDetail.saleGroupName ? cashierDetail.saleGroupName : $t('noGroup')}}
                            </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row v-if="type === 'edit'" style="margin-top: 10px;">
                    <i-col span="24" style="text-align: center">
                        <Button type="primary"
                                class="ivu-btn-90px"
                                @click="saveEdit"
                                style="margin-right: 5px;">{{$t('save')}}</Button>
                        <Button type="ghost"
                                class="ivu-btn-90px"
                                @click="cancel">{{$t('cancel')}}</Button>
                    </i-col>
                </i-row>
            </div>
        </Form>
    </div>
</template>

<script>
    import defaultsDeep from 'lodash/defaultsDeep';
    import ajax from '@/api/index.js';
    import { cashierType } from '@/assets/js/constVariable.js';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //节点信息
            'activeNode' : {
                type : Object,
                default () {
                    return {};
                }
            },
        },
        data () {
            //校验服务名的唯一性
            const validateServerUrl = (rule,value,callback) => {
                if (value) {
                    if (this.cashierDetail.serverUrl != value) {
                        this.checkServerUrlUnique(value).then(res => {
                            if (res.success) {
                                if (res.data) {
                                    callback();
                                } else {
                                    callback(this.$t('serverNameIsExit'));
                                }
                            } else {
                                callback(this.$t('serverNameValidFail'));
                            }
                        });
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('serverName') }));
                }
            };
            // //校验是否为空
            // const validateNotEmpty = (rule,value,callback) => {
            //     //款台类型为核销款台，所属核销设备分组不是必填项
            //     //款台类型为销售款台，所属销售设备分组不是必填项
            //     if(rule._field === 'cashierTypeGroup' && this.formDataCopy.checkerType === 'sale'){
            //         callback();
            //     }else if(rule._field === 'saleTypeGroup' && this.formDataCopy.checkerType === 'check'){
            //         callback();
            //     }else{
            //         if(common.isNotEmpty(value)){
            //             callback();
            //         }else{
            //             // callback();
            //             callback(this.$t('selectField',{msg : this.$t(rule._field)}));
            //         }
            //     }
            // };
            return {
                //表单数据
                formDataCopy : {},
                //表单数据
                formData : {
                    //款台名称
                    cashierName : '',
                    //是否启用
                    isStart : false,
                    //服务器名称
                    serverName : '',
                    //核销设备分组
                    verifyCashierTypeGroup : '',
                    //所属销售渠道分组
                    verifySaleTypeGroup : '',
                },
                type : 'watch',
                //核销设备分组列表
                verifyCashierTypeGroupList : [],
                //所属销售渠道分组
                verifySaleTypeGroupList : [],
                //款台详情
                cashierDetail : {},
                //款台类型列表
                cashierType : cashierType,
                //校验规则
                ruleValidate : {
                    channelName : [
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('checkoutName'),length : 100 }),trigger : 'blur' },
                        { required : true,message : this.$t('inputField',{ field : this.$t('checkoutName') }),trigger : 'blur' }
                    ],
                    serverUrl : [
                        { max : 50,message : this.$t('errorMaxLength',{ field : this.$t('serverName'),length : 50 }),trigger : 'blur' },
                        { required : true,message : this.$t('inputField',{ field : this.$t('serverName') }),trigger : 'blur' },
                        { validator : validateServerUrl,trigger : 'blur' }
                    ],
                    // checkGroupId : [
                    //     {validator : validateNotEmpty,trigger : 'change',_field : 'cashierTypeGroup'}
                    // ],
                    // saleGroupId : [
                    //     {validator : validateNotEmpty,trigger : 'change',_field : 'saleTypeGroup'}
                    // ]
                }
            };
        },
        methods : {
            /**
             * 开始编辑
             */
            edit () {
                this.formDataCopy = defaultsDeep({
                    isStart : this.cashierDetail.status === 'open',
                } , this.cashierDetail);
                this.type = 'edit';
            },
            /**
             * 取消编辑
             */
            cancel () {
                this.type = 'watch';
                this.$refs.formValidate.resetFields();
            },
            /**
             * 保存编辑的信息
             */
            saveEdit () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.modifyTable();
                        this.type = 'watch';
                    }
                });
            },
            /**
             * 获取款台详情
             */
            getCashierDetail () {
                ajax.post('getOrgInfo',{
                    orgId : this.activeNode.id,
                }).then(res => {
                    if (res.success) {
                        this.cashierDetail = res.data ? res.data.orgSelfChannel : {};
                        this.getCheckItemPage();
                        this.getSaleItemPage();
                    } else {
                        this.cashierDetail = {};
                    }
                });
            },
            /**
             * 获取核销设备分组
             */
            getCheckItemPage () {
                ajax.post('getOrgGroupList',{
                    groupType : 'check',
                    orgId : this.cashierDetail.orgId,
                }).then(res => {
                    if (res.success) {
                        this.verifyCashierTypeGroupList = res.data ? res.data : [];
                    } else {
                        this.verifyCashierTypeGroupList = [];
                    }
                });
            },
            /**
             * 获取销售设备分组
             */
            getSaleItemPage () {
                ajax.post('getOrgGroupList',{
                    groupType : 'sale',
                    orgId : this.cashierDetail.orgId,
                }).then(res => {
                    if (res.success) {
                        this.verifySaleTypeGroupList = res.data ? res.data : [];
                    } else {
                        this.verifySaleTypeGroupList = [];
                    }
                });
            },
            /**
             * 编辑款台信息
             */
            modifyTable () {
                ajax.post('modifyTable',{
                    id : this.formDataCopy.id,
                    partnerId : this.formDataCopy.partnerId,
                    channelName : this.formDataCopy.channelName,
                    serverUrl : this.formDataCopy.serverUrl,
                    checkGroupId : this.formDataCopy.checkGroupId ? this.formDataCopy.checkGroupId : 0,
                    saleGroupId : this.formDataCopy.saleGroupId ? this.formDataCopy.saleGroupId : 0,
                    nodeType : 'table',
                    status : this.formDataCopy.isStart ? 'open' : 'close',
                }).then(res => {
                   if (res.success) {
                       this.$Message.success(this.$t('successTip', { tip : this.$t('modify') }));
                       this.getCashierDetail();
                       this.$emit('fresh-org',this.activeNode);
                   } else {
                       this.$Message.error(this.$t('failureTip', { tip : this.$t('modify') }));
                   }
                });
            },
            /**
             * 校验服务器名称的唯一性
             * @param value
             */
            checkServerUrlUnique (value) {
                return ajax.post('checkServerUrlUnique',{
                    serverUrl : value
                });
            }
        },
        watch : {
            //节点更换，重新请求节点数据
            activeNode : {
                handler () {
                    this.getCashierDetail();
                },
                deep : true,
                immediate : true
            }
        },
        computed : {
            //款台类型
            checkerType () {
                for (let i = 0,j = this.cashierType.length; i < j; i++) {
                    if (this.cashierDetail.checkerType === this.cashierType[i].value) {
                        return this.cashierType[i].label;
                    }
                }
                return '';
            },
            ...mapGetters({
                permissionInfo : 'permissionInfo'
            })
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .cashier-detail{
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .overflow-tip{
            @include overflow_tip();
        }

        .node-info{
            display: flex;
            flex-direction: row;
            height: 34px;
            line-height: 34px;
            @include overflow_tip();

            .info-val{
                display: inline-block;
                @include overflow_tip();
                float: left;
                color: $color_666;
                padding-right: 10px;
            }
            .info-key{
                display: inline-block;
                float: left;
                color: $color_333;

                .icon-note{
                    color: #9e9e9e;
                    margin-right: 5px;
                }
            }
        }

        .ivu-tooltip-inner{
            white-space: normal;
        }

        /deep/ .ivu-icon-information-circled{
            margin-left: 0!important;
        }

        .form-edit /deep/ .ivu-form-item-label{
            font-size: $font_size_14px;
            color: $color_333;
            padding: 3px 0 10px 0;
        }

        .form-watch /deep/ .ivu-form-item-label{
            font-size: $font_size_14px;
            color: $color_333;
            padding: 10px 0 10px 0;
        }

        .form-area{
            background:  rgba(#F5F7FA,0.3);
            padding: 20px 0 20px 20px;
            border-radius: 4px;
            max-width: 1000px;
            margin: 0 auto;
        }

        .com-name {
            @include overflow_tip(100%, 65px);
            padding: 14px 0;
            float: left;

            .started,
            .not-started,
            .edit {
                @include block_outline(70px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
            }

            .started {
                padding-left: 10px;
                color: $color_22BB5F;
            }

            .not-started{
                padding-left: 10px;
                color: $color_yellow;
            }

            .iconfont{
                vertical-align: middle;
            }

            .name {
                line-height: 28px;
                font-size: $font_size_20px;
                color: $color_000_085;
                vertical-align: middle;
                display: inline-block;
                @include overflow_tip($width: auto, $height: 100%);
                max-width: calc(100% - 137px);
                float: left;
            }

            .edit {
                @include block_outline(70px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
                float: right;
                color: $color_blue;
                text-align: right;
                cursor: pointer;
            }
        }

        .form-watch{
            /deep/ .ivu-form-item{
                margin-bottom: 0;
            }
            /deep/ .ivu-form-item-required .ivu-form-item-label:before{
                display: none;
            }
        }

        .form-edit{
            /deep/ .ivu-form-item{
                width: calc(100% - 25px);
                margin-bottom: 14px;
            }

            /deep/ .ivu-form-item-error-tip{
                font-size: $font_size_12px;
                padding-top: 2px;
            }
        }

        /deep/ .ivu-form-item-label{
            font-size: $font_size_14px;
            color: $color_333;
        }

        /deep/ .ivu-form-item-content{
            font-size: 14px;
            color: #333333;
        }

        .ivu-icon-information-circled{
            font-size: $font_size_15px;
            margin-left: 5px;
            color: $color_gray;
            vertical-align: unset;
        }
    }
</style>
