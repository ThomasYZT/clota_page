<!--景区详情-->

<template>
    <div class="scene-detail">
        <div class="com-name">
            <template v-if="type === 'edit'">
                <Input v-model="formDataCopy.orgName" style="width : 280px"/>
                <i-switch v-model="formDataCopy.isStart"></i-switch>
            </template>
            <template v-if="type === 'watch'">
                <span class="name"
                      v-if="type === 'watch'"
                      v-w-title="sceneDetail.orgName">
                    {{sceneDetail.orgName}}
                </span>
                <span class="edit"
                      @click="edit">
                    <span class="iconfont icon-modify"></span>
                    {{$t('edit')}}
                </span>
            </template>
            <span :class="{'started'
                :formDataCopy.isStart ,'not-started' : !formDataCopy.isStart}">
                {{$t(formDataCopy.isStart ? 'hasStart' : 'hasNotStart')}}
            </span>

        </div>
        <ul class="company-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">公司ID：</span>
                    <span class="info-val" v-w-title="sceneDetail.id">{{sceneDetail.id | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">公司编码：</span>
                    <span class="info-val" v-w-title="sceneDetail.nodeCode">{{sceneDetail.nodeCode | contentFilter}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">企业编码(线下核销)：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.checkinCode" />
                    </span>
                    <span class="info-val" v-else v-w-title="sceneDetail.checkinCode">
                        {{sceneDetail.checkinCode | contentFilter}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">全民分销邀请码：</span>
                    <span class="info-val" v-w-title="sceneDetail.saleCode">{{sceneDetail .saleCode | contentFilter}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">管理账号：</span>
                    <span class="info-val" v-w-title="sceneDetail.managerAccount ? sceneDetail.managerAccount.loginName : ''">
                        {{sceneDetail.managerAccount ? sceneDetail.managerAccount.loginName : ''}}
                        <span class="reset-pass" @click="resetPass">重置密码</span>
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">电子邮箱：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.managerAccount.email" />
                    </span>
                    <span class="info-val" v-else v-w-title="sceneDetail.managerAccount ? sceneDetail.managerAccount.email : ''">
                        {{sceneDetail.managerAccount ? sceneDetail.managerAccount.email : ''  | contentFilter}}
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
                    <span class="info-val" v-else v-w-title="sceneDetail.address">
                        {{sceneDetail.address | contentFilter}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">电话：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.telephone"/>
                    </span>
                    <span class="info-val" v-else v-w-title="sceneDetail.telephone">
                        {{sceneDetail.telephone | contentFilter}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">传真：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.tex"/>
                    </span>
                    <span class="info-val" v-else v-w-title="sceneDetail.tex">
                        {{sceneDetail.tex | contentFilter}}
                    </span>
                </div>
            </li>

            <li class="list">
                <div class="info-list1">
                    <span class="info-key">联系人：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.linkName"/>
                    </span>
                    <span class="info-val" v-else v-w-title="sceneDetail.linkName">
                        {{sceneDetail.linkName | contentFilter}}
                    </span>
                </div>

                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">管理上级：</span>
                    <span class="info-val" v-if="type === 'edit'">
                          <Select v-model="formDataCopy.parentManage.id" >
                            <Option v-for="item in superiorList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.orgName }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else v-w-title="sceneDetail.parentManage">
                        {{sceneDetail.parentManage ? sceneDetail.parentManage.orgName : '' | contentFilter}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
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
                    <span class="info-val" v-else v-w-title="sceneDetail.parentEconomic">
                        {{sceneDetail.parentEconomic ? sceneDetail.parentEconomic.orgName : '' | contentFilter}}
                    </span>
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
                    <span class="info-val" v-else v-w-title="sceneDetail.businessAccount1 ? sceneDetail.businessAccount1.loginName : ''">
                         {{sceneDetail.businessAccount1 ? sceneDetail.businessAccount1.loginName : '' | contentFilter}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">创建时间：</span>
                    <span class="info-val" v-w-title="sceneDetail.createdTime">{{sceneDetail.createdTime | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">创建人：</span>
                    <span class="info-val" v-w-title="sceneDetail.createUser">{{sceneDetail.createUser | contentFilter}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">上次修改时间：</span>
                    <span class="info-val" v-w-title="sceneDetail.updatedTime">{{sceneDetail.updatedTime | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">上次修改人：</span>
                    <span class="info-val" v-w-title="sceneDetail.updateUser">{{sceneDetail.updateUser | contentFilter}}</span>
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
        <!--已开通服务-->
        <opened-service
            type="scene"
            :search-params="{id : activeNode.id}">
        </opened-service>
        <!--合作伙伴-->
        <partner
            :search-params="{id : activeNode.id}">
        </partner>
        <!--重置密码模态框-->
        <edit-modal ref="editModal">
        </edit-modal>
    </div>
</template>

<script>
    import tableCom from '../../organization/tableCom';
    import employeeTable from './components/employeeTable';
    import openedService from './components/openedService';
    import subScene from './components/subScene';
    import subDepartment from './components/subDepartment';
    import partner from './components/partner';
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
            openedService,
            subScene,
            subDepartment,
            partner,
            cityPlugin,
            editModal
        },
        data() {
            return {
                //复制的表单数据
                formDataCopy : {},
                //管理上级列表
                superiorList : [],
                //财务上级列表
                fianceSuperiorList : [],
                //受理客服列表
                serviceStaffList : [],
                type : 'watch',
                //景区详情
                sceneDetail : {}
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
                    email : this.formDataCopy.managerAccount.email,
                    province : this.formDataCopy.sysProvinces ? this.formDataCopy.sysProvinces.provinceid : '',
                    city : this.formDataCopy.sysCities ? this.formDataCopy.sysCities.cityid : '',
                    district : this.formDataCopy.sysAreas ? this.formDataCopy.sysAreas.areaid : '',
                    telephone : this.formDataCopy.telephone,
                    tex : this.formDataCopy.tex,
                    linkName : this.formDataCopy.linkName,
                    parentManageId : this.formDataCopy.parentManage.id,
                    parentEconomicId : this.formDataCopy.parentEconomic.id,
                    address : this.formDataCopy.address,
                    businessAccountId : this.formDataCopy.businessAccount1.id,
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success('修改成功');
                        this.getSceneDetail();
                    }else{
                        this.$Message.error(res.message | '修改失败');
                    }
                });
            },
            /**
             * 开始编辑
             */
            edit () {
                this.type = 'edit';
                this.formDataCopy = defaultsDeep({
                    isStart : this.sceneDetail.status === 'open',
                    businessAccount1 : this.sceneDetail.businessAccount1 ? this.sceneDetail.businessAccount1 : {},
                    parentManage : this.sceneDetail.parentManage ? this.sceneDetail.parentManage : {
                        id : ''
                    },
                    parentEconomic : this.sceneDetail.parentEconomic ? this.sceneDetail.parentEconomic : {
                        id : ''
                    },
                    managerAccount : this.sceneDetail.managerAccount ? this.sceneDetail.managerAccount : {
                        email : ''
                    }
                }  , this.sceneDetail);
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
             * 更新左侧的组织树
             */
            freshOrg () {
                this.$emit('fresh-org',this.activeNode);
            },
            /**
             * 获取景区详情
             */
            getSceneDetail () {
                ajax.post('getServiceProvider',{
                    id : this.activeNode.id,
                }).then(res => {
                    console.log(res);
                    if(res.status === 200){
                        this.sceneDetail = res.data ? res.data : {};
                    }else{
                        this.sceneDetail = {};
                    }
                });
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
        },
        watch : {
            //节点更换，重新请求节点数据
            activeNode : {
                handler (newVal,oldVal) {
                    this.getSceneDetail();
                },
                deep : true,
                immediate : true
            }
        },
        computed : {
            //公司详细地址
            companyPlace () {
                let place = '';
                if(this.sceneDetail && this.sceneDetail.sysProvinces){
                    place += this.sceneDetail.sysProvinces.province;
                }
                if(this.sceneDetail && this.sceneDetail.sysCities){
                    place += this.sceneDetail.sysCities.city;
                }
                if(this.sceneDetail && this.sceneDetail.sysAreas){
                    place += this.sceneDetail.sysAreas.area;
                }
                return place;
            },
            //默认选中的所在地信息
            defaultAddress () {
                if(this.sceneDetail && Object.keys(this.sceneDetail).length > 0){
                    return {
                        province : this.sceneDetail.sysProvinces,
                        city : this.sceneDetail.sysCities,
                        area : this.sceneDetail.sysAreas,
                    }
                }else{
                    return false;
                }
            }
        },
        created () {
            this.querySysAccoutList();
            this.getParentManages();
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .scene-detail {
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

            .started,
            .not-started,
            .edit {
                @include block_outline(60px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
            }

            .not-started{
                padding-left: 10px;
                color: $color_yellow;
            }

            .started {
                padding-left: 10px;
                color: $color_22BB5F;
            }

            .edit {
                float: right;
                color: $color_blue;
                text-align: right;
                cursor: pointer;
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
                @include block_outline($height: auto);
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
                        @include block_outline(auto, 100%);
                        color: $color_333;

                        &.fix-key{
                            width: 137px;
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
