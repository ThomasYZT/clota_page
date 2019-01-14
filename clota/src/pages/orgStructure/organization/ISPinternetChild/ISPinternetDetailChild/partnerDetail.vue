<!--合作伙伴详情-->

<template>
    <div class="company-detail">
        <Form ref="formValidate"
              :model="formDataCopy"
              :rules="ruleValidate"
              :class="{'form-edit' : type === 'edit','form-watch' : type === 'watch'}"
              :label-position="type === 'edit' ? 'top' : 'left'"
              inline>
            <div class="com-name" :class="{'com-min-width' : type === 'edit'}">
                <template v-if="type === 'edit'">
                    <i-row>
                        <i-col span="9" style="width : 240px">
                            <FormItem prop="orgName" :label-width="type === 'edit' ? 0 : 150">
                                <Input v-model.trim="formDataCopy.orgName" style="width : 220px"/>
                            </FormItem>
                        </i-col>
                        <i-col span="5" style="width: 73px;" v-if="activeNode.level !== 1">
                            <FormItem>
                                <i-switch v-model="formDataCopy.isStart"></i-switch>
                                <span :class="{'started' :formDataCopy.isStart ,'not-started' : !formDataCopy.isStart}">
                                {{$t(formDataCopy.isStart ? 'hasStart' : 'hasNotStart')}}
                            </span>
                            </FormItem>
                        </i-col>
                    </i-row>
                </template>
                <template v-if="type === 'watch'">
                    <span class="name"
                          v-if="type === 'watch'"
                          v-w-title="partnerDetail.orgName">
                        {{partnerDetail.orgName}}
                    </span>
                        <span class="edit"
                              v-if="canModifyNode"
                              @click="edit">
                        <span class="iconfont icon-edit"></span>
                        {{$t('modify')}}
                    </span>
                        <span v-if="partnerDetail.status"
                              :class="{'started' :partnerDetail.status === 'open' ,'not-started' : partnerDetail.status !== 'open'}">
                        {{$t(partnerDetail.status === 'open' ? 'hasStart' : 'hasNotStart')}}
                    </span>
                </template>
            </div>
            <div :class="{'form-area' : type === 'edit'}">
                <i-row>
                    <!--id-->
                    <i-col span="12">
                        <FormItem :label="$t('id')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="partnerDetail.id"
                                   disabled/>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('id')}}：</span>
                            <span class="info-val"
                                  v-w-title="partnerDetail.id">
                            {{partnerDetail.id | contentFilter}}
                        </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem :label="$t('companyCode')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="partnerDetail.nodeCode"
                                   disabled/>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('companyCode')}}：</span>
                            <span class="info-val"
                                  v-w-title="partnerDetail.nodeCode">
                            {{partnerDetail.nodeCode | contentFilter}}
                        </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="checkinCode"
                                  v-if="type === 'edit'"
                                  :label="$t('enterpriseCode')+'('+$t('offlineVerify')+')：'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.checkinCode"  />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('enterpriseCode')+'('+$t('offlineVerify') + ')'}}：</span>
                            <span class="info-val"
                                  v-w-title="partnerDetail.checkinCode">
                            {{partnerDetail.checkinCode | contentFilter}}
                        </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem :label="$t('distributionCode')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="partnerDetail.saleCode"
                                   disabled/>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('distributionCode')}}：</span>
                            <span class="info-val"
                                  v-w-title="partnerDetail.saleCode">
                            {{partnerDetail.saleCode | contentFilter}}
                        </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="email"
                                  :label="$t('email')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.email" />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('email')}}：</span>
                            <span class="info-val" v-w-title="formDataCopy.email">
                             {{partnerDetail.email | contentFilter}}
                        </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem prop="linkName"
                                  :label="$t('person')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.linkName" />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('person')}}：</span>
                            <span class="info-val" v-w-title="formDataCopy.linkName">
                             {{partnerDetail.linkName | contentFilter}}
                        </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem :label="$t('location')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <span class="info-key">{{$t('location')}}：</span>
                            <span class="info-val" v-w-title="companyPlace">
                             {{companyPlace | contentFilter}}
                            </span>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('location')}}：</span>
                            <span class="info-val" v-w-title="companyPlace">
                             {{companyPlace | contentFilter}}
                        </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem prop="address"
                                  :label="$t('detailAddr')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model="formDataCopy.address" />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('detailAddr')}}：</span>
                            <span class="info-val" v-w-title="partnerDetail.address">
                             {{partnerDetail.address | contentFilter}}
                        </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="telephone"
                                  :label="$t('telephone')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.telephone" />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('telephone')}}：</span>
                            <span class="info-val" v-w-title="partnerDetail.telephone">
                             {{partnerDetail.telephone | contentFilter}}
                        </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem prop="tex"
                                  :label="$t('fax')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.tex" />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('fax')}}：</span>
                            <span class="info-val" v-w-title="partnerDetail.tex">
                             {{partnerDetail.tex | contentFilter}}
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
        <!--下属部门-->
        <sub-department
            :activeTap="activeTap"
            :search-params="{id : activeNode.id}"
            @org-change="freshOrg">
        </sub-department>
        <!--员工-->
        <employee-table
            :isDefaultPackUp="false"
            :search-params="{id : activeNode.id}">
        </employee-table>
    </div>
</template>

<script>
    import tableCom from '../../organization/tableCom';
    import employeeTable from './components/employeeTable';
    import subDepartment from './components/subDepartment';
    import defaultsDeep from 'lodash/defaultsDeep';
    import ajax from '@/api/index.js';
    import { validator } from 'klwk-ui';
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
            //当前激活菜单
            'activeTap' : {
                type : String,
                default : ''
            }
        },
        components : {
            tableCom,
            employeeTable,
            subDepartment
        },
        data () {
            //校验邮箱
            const validateEmail = (rule,value,callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('errorFormat',{ field : this.$t('email') }));
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('email') }));
                }
            };
            //校验手机号
            const validatePhone = (rule,value,callback) => {
                if (value) {
                    if (validator.isTelephone(value)) {
                        callback();
                    } else {
                        callback(this.$t('formalError',{ field : this.$t('phone') }));
                    }
                } else {
                    callback();
                }
            };
            return {
                //复制的表单数据
                formDataCopy : {},
                //当前状态
                type : 'watch',
                //公司详细信息
                partnerDetail : {},
                ruleValidate : {
                    orgName : [
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('companyBgName'),length : 100 }),trigger : 'blur' },
                        { required : true,message : this.$t('inputField',{ field : this.$t('companyBgName') }),trigger : 'blur' }
                    ],
                    checkinCode : [
                        { min : 2,max : 8,message : this.$t('scopeLimit'),trigger : 'blur' },
                    ],
                    smsProvider : [
                        { required : true,message : this.$t('selectField',{ msg : this.$t('smsProvider') }),trigger : 'blur' }
                    ],
                    email : [
                        { required : true,message : this.$t('inputField',{ field : this.$t('email') }),trigger : 'blur' },
                        { validator : validateEmail,trigger : 'blur' }
                    ],
                    linkName : [
                        { required : true,message : this.$t('inputField',{ field : this.$t('person') }),trigger : 'blur' },
                        { max : 10,message : this.$t('errorMaxLength',{ field : this.$t('person'),length : 10 }),trigger : 'blur' },
                    ],
                    address : [
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('address'),length : 100 }),trigger : 'blur' },
                    ],
                    telephone : [
                        { max : 20,message : this.$t('errorMaxLength',{ field : this.$t('phone'),length : 20 }),trigger : 'blur' },
                        { validator : validatePhone ,trigger : 'blur' }
                    ],
                    tex : [
                        { max : 20,message : this.$t('errorMaxLength',{ field : this.$t('fax'),length : 20 }),trigger : 'blur' },
                    ],
                    parentManageId : [
                        { required : true,message : this.$t('selectField',{ msg : this.$t('superior') }),trigger : 'blur' },
                    ],
                    parentEconomicId : [
                        { required : true,message : this.$t('selectField',{ msg : this.$t('fianceSuperior') }),trigger : 'blur' },
                    ]
                }
            };
        },
        methods : {
            /**
             * 取消编辑
             */
            cancel () {
                this.$refs.formValidate.resetFields();
                this.type = 'watch';
            },
            /**
             * 保存编辑的信息
             */
            saveEdit () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.type = 'watch';
                        ajax.post('modifyOrgInfo',{
                            id : this.formDataCopy.id,
                            status : this.formDataCopy.isStart ? 'open' : 'close',
                            orgName : this.formDataCopy.orgName,
                            checkinCode : this.formDataCopy.checkinCode,
                            smsProvider : this.formDataCopy.smsProvider,
                            email : this.formDataCopy.email,
                            province : this.formDataCopy.provinceCode,
                            city : this.formDataCopy.cityCode,
                            district : this.formDataCopy.districtCode,
                            linkName : this.formDataCopy.linkName,
                            address : this.formDataCopy.address,
                            telephone : this.formDataCopy.telephone,
                            tex : this.formDataCopy.tex,
                            parentManageId : this.formDataCopy.parentManageId,
                            parentEconomicId : this.formDataCopy.parentEconomicId,
                            managerId : this.formDataCopy.managerId,
                            nodeType : this.formDataCopy.nodeType,
                        }).then(res => {
                            if (res.success) {
                                this.$Message.success(this.$t('successTip', { tip : this.$t('modify') }));
                                //修改了节点的名字,修改启用、未启用状态，修改管理上级或财务上级，需要刷新左侧的组织树
                                if (this.formDataCopy.orgName !== this.partnerDetail.orgName) {
                                    this.freshOrg();
                                } else if (this.formDataCopy.parentManageId !== this.partnerDetail.parentManageId) {
                                    this.freshOrg();
                                } else if (this.formDataCopy.parentEconomicId !== this.partnerDetail.parentEconomicId) {
                                    this.freshOrg();
                                } else {
                                    this.getpartnerDetail();
                                }
                                this.$store.dispatch('freshOrgs');
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('modify') }));
                            }
                        });
                    }
                });
            },
            /**
             * 开始编辑
             */
            edit () {
                this.formDataCopy = defaultsDeep({
                    isStart : this.partnerDetail.status === 'open',
                } , this.partnerDetail);

                this.type = 'edit';
            },
            /**
             * 获取合作伙伴详情
             */
            getpartnerDetail () {
                ajax.post('getOrgInfo',{
                    orgId : this.activeNode.id,
                }).then(res => {
                    if (res.success) {
                        this.partnerDetail = res.data ? res.data.basicInfo : {};
                    } else {
                        this.partnerDetail = {};
                    }
                });
            },
            /**
             * 更新左侧的组织树
             */
            freshOrg () {
                this.$emit('fresh-org',this.activeNode);
            },
        },
        computed : {
            //公司详细地址
            companyPlace () {
                let place = '';
                if (this.partnerDetail && this.partnerDetail.province) {
                    place += this.partnerDetail.province;
                }
                if (this.partnerDetail && this.partnerDetail.city) {
                    place += this.partnerDetail.city;
                }
                if (this.partnerDetail && this.partnerDetail.district) {
                    place += this.partnerDetail.district;
                }
                return place;
            },
            ...mapGetters({
                permissionInfo : 'permissionInfo',
            }),
            //是否可以编辑节点信息
            canModifyNode () {
                return this.permissionInfo && 'modifyNode' in this.permissionInfo;
            },
        },
        watch : {
            //节点更换，重新请求节点数据
            activeNode : {
                handler (newVal,oldVal) {
                    this.getpartnerDetail();
                },
                deep : true,
                immediate : true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .company-detail {
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .node-info{
            display: flex;
            flex-direction: row;
            height: 34px;
            line-height: 34px;
            @include overflow_tip();

            .info-val{
                flex: 1;
                display: inline-block;
                @include overflow_tip();
                float: left;
                color: $color_666;
                padding-right: 10px;

                .account-con{
                    display: inline-block;
                    max-width: calc(100% - 50px);
                    float: left;
                    @include overflow_tip();
                }
            }
            .info-key{
                color: $color_333;
                display: inline-block;
                float: left;
            }
        }

        .form-watch{
            padding-bottom: 20px;
            border-bottom: 1px dashed #E1E1E1;

            /deep/ .ivu-form-item{
                width: calc(100% - 25px);
                margin-bottom: 0;
            }
            /deep/ .ivu-form-item-required .ivu-form-item-label:before{
                display: none;
            }
        }

        .form-edit{
            padding-bottom: 20px;
            border-bottom: 1px dashed #E1E1E1;

            /deep/ .ivu-form-item{
                width: calc(100% - 25px);
                margin-bottom: 14px;
            }

            /deep/ .ivu-form-item-error-tip{
                font-size: $font_size_12px;
                padding-top: 2px;
            }
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

        /deep/ .ivu-form-item-content{
            font-size: 14px;
            color: #333333;
        }


        .com-name {
            @include overflow_tip(100%, 65px);
            padding: 14px 0 0 0;

            &.com-min-width{
                max-width: 1000px;
                margin: 0 auto;
            }

            /deep/ .ivu-switch{
                margin-left: 20px;
                width: 100%;
            }

            .name {
                line-height: 28px;
                font-size: $font_size_20px;
                color: $color_000_085;
                vertical-align: middle;
                display: inline-block;
                @include overflow_tip($width: auto, $height: 100%);
                max-width: calc(100% - 127px);
                float: left;
            }

            .started,
            .not-started,
            .edit {
                @include block_outline(65px);
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

            .edit {
                float: right;
                color: $color_0082D5;
                text-align: right;
                cursor: pointer;

                .iconfont{
                    vertical-align: middle;
                }
            }
        }

        .form-area{
            background:  rgba(#F5F7FA,0.3);
            padding: 20px 0 20px 20px;
            border-radius: 4px;
            max-width: 1000px;
            margin: 0 auto;
        }

        .btn-area{
            @include block_outline($height : 72px);
            text-align: center;
            padding: 20px 0;

            /deep/ .ivu-btn-primary{
                margin-right: 8px;
            }
        }

        .reset-pass{
            color: $color_0082D5;
            font-size: $font_size_12px;
            margin-left: 10px;
            display: inline-block;
            cursor: pointer;
        }

        .open-service {
            @include block_outline($height: 42px);
            padding-bottom: 10px;

            /deep/ .ivu-btn-primary {
                margin-right: 7px;
            }
        }

        .employee-account {
            @include block_outline($height: 30px);
            line-height: 20px;
            padding-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_606266;
        }
    }
</style>
