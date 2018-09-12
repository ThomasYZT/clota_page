
<!--款台信息-->

<template>
    <div class="cashier-detail">
        <Form ref="formValidate"
              :model="formDataCopy"
              :rules="ruleValidate"
              :class="{'form-edit' : type === 'edit','form-watch' : type === 'watch'}"
              label-position="left"
              :label-position="type === 'edit' ? 'top' : 'left'"
              inline>
            <div class="com-name">
                <span class="name"
                      v-w-title="cashierDetail.channelName">
                    {{cashierDetail.channelName | contentFilter}}
                </span>
                <span class="edit"
                      v-if="type === 'watch'"
                      @click="edit">
                    <span class="iconfont icon-edit"></span>
                    {{$t('edit')}}
                </span>
            </div>

            <div :class="{'form-area' : type === 'edit'}">
                <i-row>
                    <i-col span="12">
                        <FormItem label="款台名称："
                                  prop="channelName"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.channelName"
                                   v-if="type === 'edit'"/>
                            <span class="info-val"
                                  v-else
                                  v-w-title="cashierDetail.channelName">
                                {{cashierDetail.channelName | contentFilter}}
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="款台ID：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.partnerId"
                                   disabled
                                   v-if="type === 'edit'"/>
                            <span class="info-val"
                                  v-else
                                  v-w-title="cashierDetail.partnerId">
                                {{cashierDetail.partnerId | contentFilter}}
                            </span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="serverUrl" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.serverUrl"
                                   v-if="type === 'edit'"/>
                            <span class="info-val"
                                 v-else
                                 v-w-title="cashierDetail.serverUrl">
                            {{cashierDetail.serverUrl | contentFilter}}
                            </span>
                            <template slot="label">
                                <span>服务器名称：</span>
                                <Tooltip placement="bottom">
                                    <div slot="content" class="tips-content">
                                        {{$t('serverNameTips')}}
                                    </div>
                                    <Icon type="information-circled"></Icon>
                                </Tooltip>
                            </template>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="款台类型：" :label-width="type === 'edit' ? 0 : 150">
                            <Select v-model="formDataCopy.checkerType"
                                    disabled
                                    v-if="type === 'edit'">
                                <Option v-for="item in cashierType"
                                        :value="item.value"
                                        :key="item.value">
                                    {{ $t(item.label) }}
                                </Option>
                            </Select>
                            <span class="info-val"
                                  v-else
                                  v-w-title="$t(checkerType)">
                                {{$t(checkerType) | contentFilter}}
                            </span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem label="所属核销设备分组：" :label-width="type === 'edit' ? 0 : 150">
                            <Select v-model="formDataCopy.checkGroupId"
                                    v-if="type === 'edit'">
                                <Option v-for="item in verifyCashierTypeGroupList"
                                        :value="item.id"
                                        :key="item.id">
                                    {{ $t(item.groupName) }}
                                </Option>
                            </Select>
                            <span class="info-val"
                                  v-else
                                  v-w-title="cashierDetail.checkGroupName">
                                {{cashierDetail.checkGroupName | contentFilter}}
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="所属销售渠道分组：" :label-width="type === 'edit' ? 0 : 150">
                            <Select v-model="formDataCopy.saleGroupId" v-if="type === 'edit'">
                                <Option v-for="item in verifySaleTypeGroupList"
                                        :value="item.id"
                                        :key="item.id">
                                    {{ item.groupName }}
                                </Option>
                            </Select>
                            <span class="info-val"
                                  v-else
                                  v-w-title="cashierDetail.saleGroupName">
                                {{cashierDetail.saleGroupName | contentFilter}}
                            </span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row v-if="type === 'edit'">
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
    import {cashierType} from '@/assets/js/constVariable.js';
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
        data() {
            return {
                //表单数据
                formDataCopy : {},
                //表单数据
                formData : {
                    //款台名称
                    cashierName : '款台名称',
                    //是否启用
                    isStart : false,
                    //服务器名称
                    serverName : '服务器名称',
                    //核销设备分组
                    verifyCashierTypeGroup : '1',
                    //所属销售渠道分组
                    verifySaleTypeGroup : '1',
                },
                type : 'watch',
                //核销设备分组列表
                verifyCashierTypeGroupList : [],
                //所属销售渠道分组
                verifySaleTypeGroupList : [],
                //款台详情
                cashierDetail :{},
                //款台类型列表
                cashierType : cashierType,
                //校验规则
                ruleValidate : {
                    channelName : [
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('checkoutName'),length : 100}),trigger : 'blur'},
                        {required : true,message : this.$t('inputField',{field : this.$t('checkoutName')}),trigger : 'blur'}
                    ],
                    serverUrl : [
                        {max : 50,message : this.$t('errorMaxLength',{field : this.$t('serverName'),length : 50}),trigger : 'blur'},
                        {required : true,message : this.$t('inputField',{field : this.$t('serverName')}),trigger : 'blur'}
                    ]
                }
            }
        },
        methods: {
            /**
             * 开始编辑
             */
            edit () {
                this.formDataCopy = defaultsDeep({}  , this.cashierDetail);
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
                    if(valid){
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
                    if(res.success){
                        this.cashierDetail = res.data ? res.data.orgSelfChannel : {};
                    }else{
                        this.cashierDetail = {};
                    }
                });
            },
            /**
             * 获取核销设备分组
             */
            getCheckItemPage () {
                ajax.post('getOrgGroupList',{
                    groupType : 'check'
                }).then(res => {
                    if(res.success){
                        this.verifyCashierTypeGroupList = res.data ? res.data : [];
                    } else{
                        this.verifyCashierTypeGroupList = [];
                    }
                });
            },
            /**
             * 获取销售设备分组
             */
            getSaleItemPage () {
                ajax.post('getOrgGroupList',{
                    groupType : 'sale'
                }).then(res => {
                    if(res.success){
                        this.verifySaleTypeGroupList = res.data ? res.data : [];
                    } else{
                        this.verifySaleTypeGroupList = [];
                    }
                });
            },
            /**
             * 编辑款台信息
             */
            modifyTable () {
                ajax.post('modifyTable',{
                    id :this.formDataCopy.id,
                    partnerId : this.formDataCopy.partnerId,
                    channelName : this.formDataCopy.channelName,
                    serverUrl : this.formDataCopy.serverUrl,
                    checkGroupId : this.formDataCopy.checkGroupId,
                    saleGroupId : this.formDataCopy.saleGroupId,
                }).then(res => {
                   if(res.success){
                       this.$Message.success('修改成功');
                       this.getCashierDetail();
                       this.$emit('fresh-org',this.activeNode);
                   }else{
                       this.$Message.error('修改失败');
                   }
                });
            }
        },
        watch : {
            //节点更换，重新请求节点数据
            activeNode : {
                handler (newVal,oldVal) {
                    this.getCashierDetail();
                },
                deep : true,
                immediate : true
            }
        },
        computed : {
            //款台类型
            checkerType () {
                for(let i = 0,j = this.cashierType.length;i < j;i++){
                    if(this.cashierDetail.checkerType === this.cashierType[i].value){
                        return this.cashierType[i].label;
                    }
                }
                return '';
            }
        },
        created () {
            this.getCheckItemPage();
            this.getSaleItemPage();
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .cashier-detail{
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .ivu-tooltip-inner{
            white-space: normal;
        }

        /deep/ .ivu-icon-information-circled{
            margin-left: 0!important;
        }

        .form-area{
            background:  rgba(#F5F7FA,0.3);
            padding: 20px 0 20px 20px;
            border-radius: 4px;
            max-width: 1000px;
            margin: 0 auto;
        }

        .com-name {
            @include overflow_tip(100%, 56px);
            padding: 14px 0;

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
                max-width: calc(100% - 127px);
            }

            .edit {
                @include block_outline(60px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
            }

            .edit {
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
                padding-top: 0
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
