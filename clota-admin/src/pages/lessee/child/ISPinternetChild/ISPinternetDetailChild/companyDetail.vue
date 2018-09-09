<!--公司详情-->

<template>
    <div class="company-detail">
        <div class="com-name">
            <template v-if="type === 'edit'">
                <Input v-model="formDataCopy.orgName" style="width : 280px"/>
                <i-switch v-model="formDataCopy.isStart"></i-switch>
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
            </template>
            <span :class="{'started' :companyDetail.status === 'open' ,'not-started' : companyDetail.status === 'close'}">
                {{$t(companyDetail.status === 'open' ? 'hasStart' : 'hasNotStart')}}
            </span>

        </div>
        <ul class="company-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">公司ID：</span>
                    <span class="info-val" v-w-title="companyDetail.id">{{companyDetail.id | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">公司编码：</span>
                    <span class="info-val" v-w-title="companyDetail.nodeCode">{{companyDetail.nodeCode | contentFilter}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">企业编码(线下核销)：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.checkinCode"/>
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.checkinCode">
                        {{companyDetail.checkinCode | contentFilter}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key">全民分销邀请码：</span>
                    <span class="info-val" v-w-title="companyDetail.saleCode">{{companyDetail.saleCode | contentFilter}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">短信供应商：</span>
                    <span class="info-val" v-if="type === 'edit'">
                          <Select v-model="formDataCopy.smsProvider" >
                            <Option v-for="item in smsSuppilerList"
                                    :value="item.provider"
                                    :key="item.provider">
                                {{ item.provider }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.smsProvider">
                         {{companyDetail.smsProvider | contentFilter}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key">管理账号：</span>
                    <span class="info-val" v-w-title="companyDetail.managerAccount ? companyDetail.managerAccount.loginName : ''">
                         {{companyDetail.managerAccount ? companyDetail.managerAccount.loginName : '' | contentFilter}}
                        <span class="reset-pass" @click="resetPass">重置密码</span>
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">电子邮箱：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.managerAccount.email" />
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.managerAccount ? companyDetail.managerAccount.email : ''">
                         {{companyDetail.managerAccount ? companyDetail.managerAccount.email : '' | contentFilter}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">联系人：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.linkName" />
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.linkName">
                         {{companyDetail.linkName | contentFilter}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">所在地：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <city-plugin @select="changeCity"
                                     v-if="defaultAddress"
                                     :defaultValue="defaultAddress">
                        </city-plugin>
                    </span>
                    <span class="info-val" v-else v-w-title="companyPlace">
                         {{companyPlace | contentFilter}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">详细地址：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.address" />
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.address">
                         {{companyDetail.address | contentFilter}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">电话：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.telephone" />
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.telephone">
                         {{companyDetail.telephone | contentFilter}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">传真：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.tex" />
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.tex">
                         {{companyDetail.tex | contentFilter}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">管理上级：</span>
                    <span class="info-val" v-if="type === 'edit' && activeNode && activeNode.pid">
                          <Select v-model="formDataCopy.parentManage.id" >
                            <Option v-for="item in superiorList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.orgName }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.parentManage">
                        {{companyDetail.parentManage ? companyDetail.parentManage.orgName : '' | contentFilter}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">财务上级：</span>
                    <span class="info-val" v-if="type === 'edit' && activeNode && activeNode.pid">
                          <Select v-model="formDataCopy.parentEconomic.id" >
                            <Option v-for="item in fianceSuperiorList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.orgName }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.parentEconomic">
                        {{companyDetail.parentEconomic ? companyDetail.parentEconomic.orgName : '' | contentFilter}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">短信余量/累计购买：</span>
                    <span class="info-val">{{companyDetail.smsDetails | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">受理客服：</span>
                    <span class="info-val" v-if="type === 'edit'">
                          <Select v-model="formDataCopy.businessAccount1.id" >
                            <Option v-for="item in serviceStaffList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.loginName }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else v-w-title="companyDetail.businessAccount1 ? companyDetail.businessAccount1.loginName : ''">
                         {{companyDetail.businessAccount1 ? companyDetail.businessAccount1.loginName : '' | contentFilter}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">创建时间：</span>
                    <span class="info-val" v-w-title="companyDetail.createdTime">{{companyDetail.createdTime | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">创建人：</span>
                    <span class="info-val" v-w-title="companyDetail.createUser">{{companyDetail.createUser | contentFilter}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">上次修改时间：</span>
                    <span class="info-val" v-w-title="companyDetail.updatedTime">{{companyDetail.updatedTime | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">上次修改人：</span>
                    <span class="info-val" v-w-title="companyDetail.updateUser">{{companyDetail.updateUser | contentFilter}}</span>
                </div>
            </li>
            <li class="btn-area" v-if="type === 'edit'">
                <Button type="primary"
                        class="ivu-btn-90px"
                        @click="saveEdit">{{$t('save')}}</Button>
                <Button type="ghost"
                        class="ivu-btn-90px"
                        @click="cancel">{{$t('cancel')}}</Button>
            </li>
        </ul>


        <!--已开通服务-->
        <opened-service
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
            :search-params="{id : activeNode.id}">
        </employee-table>
        <!--短信-->
        <note-table
            :search-params="{id : activeNode.id}">
        </note-table>
        <!--重置密码模态框-->
        <edit-modal ref="editModal">
        </edit-modal>
    </div>
</template>

<script>
    import tableCom from '../../organization/tableCom';
    import employeeTable from './components/employeeTable';
    import noteTable from './components/noteTable';
    import openedService from './components/openedService';
    import subCompany from './components/subCompany';
    import subScene from './components/subScene';
    import subDepartment from './components/subDepartment';
    import defaultsDeep from 'lodash/defaultsDeep';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import editModal from '@/components/editModal/index.vue';
    import ajax from '@/api/index.js';

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
            noteTable,
            openedService,
            subCompany,
            subScene,
            subDepartment,
            cityPlugin,
            editModal
        },
        data() {
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
                //受理客服列表
                serviceStaffList : [],
                //公司详细信息
                companyDetail : {}
            }
        },
        methods: {
            /**
             * 取消编辑
             */
            cancel () {
                this.type = 'watch';
            },
            /**
             * 保存编辑的信息
             */
            saveEdit () {
                this.type = 'watch';
                ajax.post('updateOrgInfo',{
                    id : this.formDataCopy.id,
                    status : this.formDataCopy.isStart ? 'open' : 'false',
                    orgName : this.formDataCopy.orgName,
                    checkinCode : this.formDataCopy.checkinCode,
                    smsProvider : this.formDataCopy.smsProvider,
                    email : this.formDataCopy.managerAccount.email,
                    province : this.formDataCopy.sysProvinces ? this.formDataCopy.sysProvinces.provinceid : '',
                    city : this.formDataCopy.sysCities ? this.formDataCopy.sysCities.cityid : '',
                    district : this.formDataCopy.sysAreas ? this.formDataCopy.sysAreas.areaid : '',
                    linkName : this.formDataCopy.linkName,
                    address : this.formDataCopy.address,
                    telephone : this.formDataCopy.telephone,
                    tex : this.formDataCopy.tex,
                    businessAccountId : this.formDataCopy.businessAccount1.id,
                    parentManageId : this.formDataCopy.parentManage.id,
                    parentEconomicId : this.formDataCopy.parentEconomic.id,
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('修改成功');
                        this.getCompanyDetail();
                    }else{
                        this.$Message.error('修改失败');
                    }
                });
            },
            /**
             * 开始编辑
             */
            edit () {
                this.type = 'edit';
                this.formDataCopy = defaultsDeep({
                    isStart : this.companyDetail.status === 'open',
                    businessAccount1 : this.companyDetail.businessAccount1 ? this.companyDetail.businessAccount1 : {},
                    parentManage : this.companyDetail.parentManage ? this.companyDetail.parentManage : {
                        id : ''
                    },
                    parentEconomic : this.companyDetail.parentEconomic ? this.companyDetail.parentEconomic : {
                        id : ''
                    },
                }  , this.companyDetail);
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
                ajax.post('getServiceProvider',{
                    id : this.activeNode.id,
                }).then(res => {
                    if(res.status === 200){
                        this.companyDetail = res.data ? res.data : {};
                    }else{
                        this.companyDetail = {};
                    }
                });
            },
            /**
             * 查询所有短息供应商
             */
            querySmsProviderList () {
                ajax.post('smsProviderList',{
                    page : 1,
                    pageSize : 9999
                }).then(res => {
                    if(res.status === 200){
                        this.smsSuppilerList = res.data.list ? res.data.list : [];
                    }else{
                        this.smsSuppilerList = [];
                    }
                }).catch(() => {
                    this.smsSuppilerList = [];
                });
            },
            /**
             * 查询所有的受理客服信息
             */
            querySysAccoutList () {
                ajax.post('querySysAccoutList').then(res => {
                    if(res.status === 200){
                        this.serviceStaffList = res.data ? res.data : [];
                    }else{
                        this.serviceStaffList = [];
                    }
                }).catch(err => {
                    this.serviceStaffList = [];
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
             * 获取财务上级和经营上级
             */
            getParentManages () {
                ajax.post('getParentManages',{
                    id : this.activeNode.id,
                }).then(res => {
                    if(res.status === 200){
                        this.superiorList = res.data.parentManages ? res.data.parentManages : [];
                        this.fianceSuperiorList = res.data.parentEconomics ? res.data.parentEconomics : [];
                    }else{
                        this.superiorList = [];
                        this.fianceSuperiorList = [];
                    }
                });
            },
        },
        created () {
            this.querySmsProviderList();
            this.querySysAccoutList();
            this.getParentManages();
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
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .com-name {
            @include overflow_tip(100%, 56px);
            padding: 14px 0;

            /deep/ .ivu-switch{
                margin-left: 20px;
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

        .btn-area{
            @include block_outline($height : 72px);
            text-align: center;
            padding: 20px 0;

            /deep/ .ivu-btn-primary{
                margin-right: 8px;
            }
        }

        .company-info {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .list {
                display: flex;
                align-items: center;
                @include block_outline(auto);
                min-height: 30px;
                overflow: auto;
                padding: 4px 0;
                line-height: 22px;

                .info-list1 {
                    @include block_outline(50%, auto);
                }

                .info-list2 {
                    @include block_outline(50%, auto);
                    padding-left: 15px;
                }

                .info-list1,
                .info-list2 {
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;
                    align-items: center;

                    .info-key {
                        @include block_outline(auto, 100%,false);
                        color: $color_333;

                        &.fix-key{
                            width: 140px;
                            text-align: left;
                        }
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;

                        .reset-pass{
                            color: $color_0082D5;
                            font-size: $font_size_12px;
                            margin-left: 10px;
                            display: inline-block;
                            cursor: pointer;
                        }
                    }
                }
            }
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
