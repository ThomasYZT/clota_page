<!--公司详情-->

<template>
    <div class="company-detail">
        <Form ref="formValidate"
              :model="formDataCopy"
              :rules="ruleValidate"
              :class="{'form-edit' : type === 'edit','form-watch' : type === 'watch'}"
              :label-position="type === 'edit' ? 'top' : 'left'"
              inline>
        <div class="com-name">
            <template v-if="type === 'edit'">
                <i-row>
                    <i-col span="9" style="width : 240px">
                        <FormItem prop="orgName" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.orgName" style="width : 220px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="5" style="width: 73px;">
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
                     v-w-title="companyDetail.orgName">
                    {{companyDetail.orgName}}
                </span>
                <span class="edit"
                  @click="edit">
                    <span class="iconfont icon-modify"></span>
                    {{$t('edit')}}
                </span>
                <span :class="{'started' :companyDetail.status === 'open' ,'not-started' : companyDetail.status === 'close'}">
                    {{$t(companyDetail.status === 'open' ? 'hasStart' : 'hasNotStart')}}
                </span>
            </template>

        </div>
        <div :class="{'form-area' : type === 'edit'}">
            <i-row>
                <i-col span="12">
                    <FormItem label="公司ID：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="companyDetail.id"
                               disabled
                               v-if="type === 'edit'"/>
                        <span class="info-val"
                              v-else
                              v-w-title="companyDetail.id">
                            {{companyDetail.id | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="公司编码：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="companyDetail.nodeCode"
                               disabled
                               v-if="type === 'edit'"/>
                        <span class="info-val"
                              v-else
                              v-w-title="companyDetail.nodeCode">
                            {{companyDetail.nodeCode | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem prop="checkinCode" label="企业编码(线下核销)：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="formDataCopy.checkinCode"  v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="companyDetail.checkinCode">
                    {{companyDetail.checkinCode | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="全民分销邀请码："
                              :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="companyDetail.saleCode"
                               disabled
                               v-if="type === 'edit'"/>
                        <span class="info-val"
                              v-else
                              v-w-title="companyDetail.saleCode">
                            {{companyDetail.saleCode | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem label="短信供应商：" :label-width="type === 'edit' ? 0 : 150">
                        <Select v-model.trim="formDataCopy.smsProvider" v-if="type === 'edit'">
                            <Option v-for="item in smsSuppilerList"
                                    :value="item.desc"
                                    :key="item.desc">
                                {{ item.desc }}
                            </Option>
                        </Select>
                        <span class="info-val" v-else v-w-title="companyDetail.smsProvider">
                     {{companyDetail.smsProvider | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="管理账号：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="companyDetail.manager"
                               disabled
                               v-if="type === 'edit'"/>
                        <span class="info-val"
                              v-else
                              v-w-title="companyDetail.manager">
                             {{companyDetail.manager | contentFilter}}
                            <span class="reset-pass"
                                  v-if="activeNode && activeNode.level !== 1"
                                  @click="resetPass">重置密码</span>
                        </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem prop="email" label="电子邮箱：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="formDataCopy.email" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="formDataCopy.email">
                     {{companyDetail.email | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem prop="linkName" label="联系人：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="formDataCopy.linkName" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="companyDetail.linkName">
                     {{companyDetail.linkName | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem label="所在地：" :label-width="type === 'edit' ? 0 : 150">
                        <city-plugin @select="changeCity"
                                     v-if="defaultAddress && type === 'edit'"
                                     :defaultValue="defaultAddress">
                        </city-plugin>
                        <span class="info-val" v-else v-w-title="companyPlace">
                     {{companyPlace | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem prop="address" label="详细地址：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model="formDataCopy.address" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="companyDetail.address">
                     {{companyDetail.address | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem prop="telephone" label="电话：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="formDataCopy.telephone" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="companyDetail.telephone">
                     {{companyDetail.telephone | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem prop="tex" label="传真：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="formDataCopy.tex" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="companyDetail.tex">
                     {{companyDetail.tex | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem :prop="(activeNode && activeNode.level !== 1) ? 'parentManageId' : ''"
                              label="管理上级："
                              :label-width="type === 'edit' ? 0 : 150">
                        <Select v-model.trim="formDataCopy.parentManageId" v-if="type === 'edit' && activeNode && activeNode.level !== 1">
                            <Option v-for="item in superiorList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.orgName }}
                            </Option>
                        </Select>
                        <span class="info-val" v-else v-w-title="companyDetail.parentManage">
                    {{companyDetail.parentManage ? companyDetail.parentManage.orgName : '' | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem :prop="(activeNode && activeNode.level !== 1) ? 'parentEconomicId' : ''"
                              label="财务上级："
                              :label-width="type === 'edit' ? 0 : 150">
                        <Select v-model.trim="formDataCopy.parentEconomicId" v-if="type === 'edit' && activeNode && activeNode.level !== 1">
                            <Option v-for="item in fianceSuperiorList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.orgName }}
                            </Option>
                        </Select>
                        <span class="info-val" v-else v-w-title="companyDetail.parentEconomic">
                    {{companyDetail.parentEconomic ? companyDetail.parentEconomic.orgName : '' | contentFilter}}
                </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem prop="orgName" label="短信余量/累计购买：" :label-width="type === 'edit' ? 0 : 150">
                        <Input :value="companyDetail.smsCount + '/' + companyDetail.totalSmsCount"
                               disabled
                               v-if="type === 'edit'"/>
                        <span class="info-val" v-else>
                            {{companyDetail.smsCount | contentFilter}} / {{companyDetail.totalSmsCount | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem prop="orgName" label="受理客服：" :label-width="type === 'edit' ? 0 : 150">
                        <Input v-model.trim="companyDetail.customerService"
                               disabled
                               v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="companyDetail.customerService">
                             {{companyDetail.customerService | contentFilter}}
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


        <!--已开通服务-->
        <opened-service
            :isDefaultPackUp="true"
            :search-params="{id : activeNode.id}">
        </opened-service>
        <!--下属公司-->
        <sub-company
            :search-params="{id : activeNode.id}">
        </sub-company>
        <!--下属景区-->
        <sub-scene
            :search-params="{id : activeNode.id}">
        </sub-scene>
        <!--下属部门-->
        <sub-department
            :search-params="{id : activeNode.id}"
            @org-change="freshOrg">
        </sub-department>
        <!--员工-->
        <employee-table
            :isDefaultPackUp="false"
            :search-params="{id : activeNode.id}">
        </employee-table>
        <!--重置密码模态框-->
        <edit-modal ref="editModal">
        </edit-modal>
    </div>
</template>

<script>
    import tableCom from '../../organization/tableCom';
    import employeeTable from './components/employeeTable';
    import openedService from './components/openedService';
    import subCompany from './components/subCompany';
    import subScene from './components/subScene';
    import subDepartment from './components/subDepartment';
    import defaultsDeep from 'lodash/defaultsDeep';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import editModal from '@/components/editModal/index.vue';
    import ajax from '@/api/index.js';
    import {validator} from 'klwk-ui';

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
        components: {
            tableCom,
            employeeTable,
            openedService,
            subCompany,
            subScene,
            subDepartment,
            cityPlugin,
            editModal
        },
        data() {
            //校验邮箱
            const validateEmail = (rule,value,callback) => {
                if(value){
                    if(validator.isEmail(value)){
                        callback();
                    }else{
                        callback(this.$t('formalError',{field : this.$t('email')}));
                    }
                }else{
                    callback(this.$t('inputField',{field : this.$t('email')}));
                }
            };
            //校验手机号
            const validatePhone = (rule,value,callback) => {
                if(value){
                    if(validator.isTelephone(value)){
                        callback();
                    }else{
                        callback(this.$t('formalError',{field : this.$t('phone')}));
                    }
                }else{
                    callback();
                }
            };
            return {
                //复制的表单数据
                formDataCopy : {},
                //当前状态
                type : 'watch',
                //短信供应商列表
                smsSuppilerList : [],
                //管理上级列表
                superiorList : [],
                //财务上级列表
                fianceSuperiorList : [],
                //公司详细信息
                companyDetail : {},
                ruleValidate : {
                    orgName : [
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('companyBgName'),length : 100}),trigger : 'blur'},
                        {required : true,message : this.$t('inputField',{field : this.$t('companyBgName')}),trigger : 'blur'}
                    ],
                    checkinCode : [
                        {min : 2,max : 8,message : this.$t('rangeBitError',{field : this.$t('enterpriseCode'),length : 8,min : 1,max :10}),trigger : 'blur'},
                    ],
                    smsProvider : [
                        {required : true,message : this.$t('selectField',{msg : this.$t('smsProvider')}),trigger : 'blur'}
                    ],
                    email : [
                        {required : true,message : this.$t('inputField',{field : this.$t('email')}),trigger : 'blur'},
                        {validator : validateEmail,trigger : 'blur'}
                    ],
                    linkName : [
                        {required : true,message : this.$t('inputField',{field : this.$t('person')}),trigger : 'blur'},
                        {max : 10,message : this.$t('errorMaxLength',{field : this.$t('person'),length : 10}),trigger : 'blur'},
                    ],
                    address : [
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('address'),length : 100}),trigger : 'blur'},
                    ],
                    telephone : [
                        {max : 20,message : this.$t('errorMaxLength',{field : this.$t('phone'),length : 20}),trigger : 'blur'},
                        {validator : validatePhone ,trigger : 'blur'}
                    ],
                    tex : [
                        {max : 20,message : this.$t('errorMaxLength',{field : this.$t('fax'),length : 20}),trigger : 'blur'},
                    ],
                    parentManageId : [
                        {required : true,message : this.$t('selectField',{msg : this.$t('superior')}),trigger : 'blur'},
                    ],
                    parentEconomicId : [
                        {required : true,message : this.$t('selectField',{msg : this.$t('fianceSuperior')}),trigger : 'blur'},
                    ]
                }
            }
        },
        methods: {
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
                    if(valid){
                        this.type = 'watch';
                        ajax.post('updateOrgInfo',{
                            id : this.formDataCopy.id,
                            status : this.formDataCopy.isStart ? 'open' : 'close',
                            orgName : this.formDataCopy.orgName,
                            checkinCode : this.formDataCopy.checkinCode,
                            smsProvider : this.formDataCopy.smsProvider,
                            email : this.formDataCopy.email,
                            province : this.formDataCopy.sysProvinces ? this.formDataCopy.sysProvinces.provinceid : '',
                            city : this.formDataCopy.sysCities ? this.formDataCopy.sysCities.cityid : '',
                            district : this.formDataCopy.sysAreas ? this.formDataCopy.sysAreas.areaid : '',
                            linkName : this.formDataCopy.linkName,
                            address : this.formDataCopy.address,
                            telephone : this.formDataCopy.telephone,
                            tex : this.formDataCopy.tex,
                            businessAccountId : this.formDataCopy.businessAccount1.id,
                            parentManageId : this.formDataCopy.parentManageId,
                            parentEconomicId : this.formDataCopy.parentEconomicId,
                        }).then(res => {
                            if(res.status === 200){
                                this.$Message.success('修改成功');
                                this.getCompanyDetail();
                                //修改了节点的名字，需要刷新左侧的组织树
                                if(this.formDataCopy.orgName !== this.companyDetail.orgName){
                                    this.freshOrg();
                                }
                            }else{
                                this.$Message.error('修改失败');
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
                    isStart : this.companyDetail.status === 'open',
                    businessAccount1 : this.companyDetail.businessAccount1 ? this.companyDetail.businessAccount1 : {},
                    parentManageId : this.companyDetail.parentManage ? this.companyDetail.parentManage.id : '',
                    parentEconomicId : this.companyDetail.parentEconomic ? this.companyDetail.parentEconomic.id : '',
                    email : this.companyDetail.managerAccount ? this.companyDetail.managerAccount.email : '',
                }  , this.companyDetail);

                this.type = 'edit';
            },
            /**
             * 重置密码
             */
            resetPass () {
                this.$refs.editModal.show({
                    title : this.$t('resetPass'),
                    confirmCallback : (pass) => {
                        this.confimChangePass(pass);
                    }
                });
            },
            /**
             * 确认重置密码
             * @param pass
             */
            confimChangePass (pass){
                ajax.post('resetPassword',{
                    id : this.activeNode.id,
                    password : pass
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('重置成功');
                    }else{
                        this.$Message.error(res.message || '重置失败');
                    }
                }).finally(() => {
                    this.$refs.editModal.hide();
                });
            },
            /**
             * 获取公司详情
             */
            getCompanyDetail () {
                ajax.post('getOrgInfo',{
                    orgId : this.activeNode.id,
                }).then(res => {
                    if(res.success){
                        this.companyDetail = res.data ? res.data.basicInfo : {};
                    }else{
                        this.companyDetail = {};
                    }
                });
            },
            /**
             * 查询所有短息供应商
             */
            querySmsProviderList () {
                ajax.post('getSmsProviderList').then(res => {
                    if(res.status === 200){
                        this.smsSuppilerList = res.data ? res.data : [];
                    }else{
                        this.smsSuppilerList = [];
                    }
                }).catch(() => {
                    this.smsSuppilerList = [];
                });
            },
            /**
             * 更新左侧的组织树
             */
            freshOrg () {
                this.$emit('fresh-org',this.activeNode);
            },
            /**
             * 改变城市
             * @param data
             */
            changeCity (data) {
                if(this.formDataCopy.sysProvinces){
                    this.formDataCopy.sysProvinces.provinceid = data.province ? data.province.provinceid : '';
                }else{
                    this.formDataCopy.sysProvinces = {
                        provinceid : data.province ? data.province.provinceid : ''
                    };
                }
                if(this.formDataCopy.sysCities){
                    this.formDataCopy.sysCities.cityid = data.city ? data.city.cityid : '';
                }else{
                    this.formDataCopy.sysCities = {
                        cityid : data.city ? data.city.cityid : ''
                    };
                }
                if(this.formDataCopy.sysAreas){
                    this.formDataCopy.sysAreas.areaid = data.area ? data.area.areaid : '';
                }else{
                    this.formDataCopy.sysAreas = {
                        areaid : data.area ? data.area.areaid : ''
                    };
                }
            },
            /**
             * 获取经营上级
             */
            getParentManages () {
                ajax.post('getOrgsByManageType',{
                    orgId : this.activeNode.id,
                    manageType : 'manage'
                }).then(res => {
                    if(res.success){
                        this.superiorList = res.data ? res.data.filter(item => item.id !== this.activeNode.id) : [];
                    }else{
                        this.superiorList = [];
                    }
                });
            },
            /**
             * 获取财务上级
             */
            getParentEconomic () {
                ajax.post('getOrgsByManageType',{
                    orgId : this.activeNode.id,
                    manageType : 'economic'
                }).then(res => {
                    if(res.success){
                        this.fianceSuperiorList = res.data ? res.data.filter(item => item.id !== this.activeNode.id) : [];
                    }else{
                        this.fianceSuperiorList = [];
                    }
                });
            },
        },
        created () {
            this.querySmsProviderList();
            this.getParentManages();
            this.getParentEconomic();
        },
        computed  : {
            //公司详细地址
            companyPlace () {
                let place = '';
                if(this.companyDetail && this.companyDetail.sysProvinces){
                    place += this.companyDetail.sysProvinces.province;
                }
                if(this.companyDetail && this.companyDetail.sysCities){
                    place += this.companyDetail.sysCities.city;
                }
                if(this.companyDetail && this.companyDetail.sysAreas){
                    place += this.companyDetail.sysAreas.area;
                }
                return place;
            },
            //默认选中的所在地信息
            defaultAddress () {
                if(this.companyDetail && Object.keys(this.companyDetail).length > 0){
                    return {
                        province : this.companyDetail.sysProvinces,
                        city : this.companyDetail.sysCities,
                        area : this.companyDetail.sysAreas,
                    }
                }else{
                    return false;
                }
            }
        },
        watch : {
            //节点更换，重新请求节点数据
            activeNode : {
                handler (newVal,oldVal) {
                    this.getCompanyDetail();
                },
                deep : true,
                immediate : true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .company-detail {
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 20px;
        float: right;
        overflow: auto;

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
            padding: 3px 0 10px 0;
        }

        /deep/ .ivu-form-item-content{
            font-size: 14px;
            color: #333333;
        }


        .com-name {
            @include overflow_tip(100%, 65px);
            padding: 14px 0 0 0;

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
            }

            .started,
            .not-started,
            .edit {
                @include block_outline(60px);
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
