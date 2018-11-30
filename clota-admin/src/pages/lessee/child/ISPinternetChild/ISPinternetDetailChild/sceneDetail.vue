<!--景区详情-->

<template>
    <div class="scene-detail">
        <Form ref="formValidate"
              :model="formDataCopy"
              :rules="ruleValidate"
              :class="{'form-edit' : type === 'edit','form-watch' : type === 'watch'}"
              label-position="right"
              inline>
            <div class="com-name">
                <template v-if="type === 'edit'">
                    <i-row>
                        <i-col span="8">
                            <FormItem prop="orgName" >
                                <Input v-model.trim="formDataCopy.orgName" style="width : 280px"/>
                            </FormItem>
                        </i-col>
                        <i-col span="2">
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
                          v-w-title="sceneDetail.orgName">
                        {{sceneDetail.orgName}}
                    </span>
                    <span class="edit"
                          @click="edit">
                        <span class="iconfont icon-modify"></span>
                        {{$t('edit')}}
                    </span>
                    <span :class="{'started'
                        :formDataCopy.isStart ,'not-started' : !formDataCopy.isStart}">
                        {{$t(formDataCopy.isStart ? 'hasStart' : 'hasNotStart')}}
                    </span>
                </template>

            </div>
            <i-row>
                <i-col span="12">
                    <FormItem label="公司ID：" :label-width="150">
                        <span class="info-val" v-w-title="sceneDetail.id">{{sceneDetail.id | contentFilter}}</span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="公司编码：" :label-width="150">
                        <span class="info-val" v-w-title="sceneDetail.nodeCode">{{sceneDetail.nodeCode | contentFilter}}</span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem prop="checkinCode" label="企业编码(线下核销)：" :label-width="150">
                        <Input v-model.trim="formDataCopy.checkinCode"  v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="sceneDetail.checkinCode">
                        {{sceneDetail.checkinCode | contentFilter}}
                    </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="全民分销邀请码：" :label-width="150">
                        <span class="info-val" v-w-title="sceneDetail.saleCode">{{sceneDetail.saleCode | contentFilter}}</span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem label="管理账号：" :label-width="150">
                        <span class="info-val">
                            <span class="account-name" v-w-title="sceneDetail.adminAccountName">
                             {{sceneDetail.adminAccountName | contentFilter}}
                            </span>
                            <span class="reset-pass" @click="resetPass">重置密码</span>
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem prop="email" label="电子邮箱：" :label-width="150">
                        <Input v-model="formDataCopy.email" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="sceneDetail.email">
                            {{sceneDetail.email  | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem label="所在地：" :label-width="150">
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
                    <FormItem prop="address" label="详细地址：" :label-width="150">
                        <Input v-model="formDataCopy.address" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="sceneDetail.address">
                            {{sceneDetail.address | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem prop="telephone" label="电话：" :label-width="150">
                        <Input v-model="formDataCopy.telephone" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="sceneDetail.telephone">
                            {{sceneDetail.telephone | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem prop="tex" label="传真：" :label-width="150">
                        <Input v-model="formDataCopy.tex" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="sceneDetail.tex">
                            {{sceneDetail.tex | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem prop="linkName" label="联系人：" :label-width="150">
                        <Input v-model="formDataCopy.linkName" v-if="type === 'edit'"/>
                        <span class="info-val" v-else v-w-title="sceneDetail.linkName">
                            {{sceneDetail.linkName | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem prop="parentManageId" label="管理上级：" :label-width="150">
                        <!--<Select v-model="formDataCopy.parentManageId" v-if="type === 'edit' && activeNode && activeNode.pid">-->
                            <!--<Option v-for="item in superiorList"-->
                                    <!--:value="item.id"-->
                                    <!--:key="item.id">-->
                                <!--{{ item.orgName }}-->
                            <!--</Option>-->
                        <!--</Select>-->
                        <select-tree v-if="type === 'edit' && activeNode && activeNode.pid"
                                     v-model="formDataCopy.parentManageId"
                                     :disabled-node-ids="[activeNode.id]"
                                     :disabled="activeNode && activeNode.level === 1"
                                     :tree="superiorList"
                                     style="width: 100%;">
                        </select-tree>
                        <span class="info-val" v-else v-w-title="sceneDetail.parentManageName">
                            {{sceneDetail.parentManageName | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem prop="parentEconomicId" label="财务上级：" :label-width="150">
                        <!--<Select v-model="formDataCopy.parentEconomicId" v-if="type === 'edit' && activeNode && activeNode.pid">-->
                            <!--<Option v-for="item in fianceSuperiorList"-->
                                    <!--:value="item.id"-->
                                    <!--:key="item.id">-->
                                <!--{{ item.orgName }}-->
                            <!--</Option>-->
                        <!--</Select>-->

                        <select-tree v-if="type === 'edit' && activeNode && activeNode.pid"
                                     v-model="formDataCopy.parentEconomicId"
                                     :disabled-node-ids="[activeNode.id]"
                                     :disabled="activeNode && activeNode.level === 1"
                                     :tree="fianceSuperiorList"
                                     style="width: 100%;">
                        </select-tree>
                        <span class="info-val" v-else v-w-title="sceneDetail.parentEconomicName">
                            {{sceneDetail.parentEconomicName | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="受理客服：" :label-width="150">
                        <Select v-model="formDataCopy.businessId" v-if="type === 'edit' && activeNode && activeNode.pid">
                                <Option v-for="item in serviceStaffList"
                                    :value="item.id"
                                    :key="item.id">
                                    {{ item.loginName }}
                                </Option>
                        </Select>
                        <span class="info-val" v-else v-w-title="sceneDetail.businessName">
                             {{sceneDetail.businessName | contentFilter}}
                        </span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem  label="创建时间：" :label-width="150">
                        <span class="info-val" v-w-title="sceneDetail.createdTime">{{sceneDetail.createdTime | contentFilter}}</span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="创建人：" :label-width="150">
                        <span class="info-val" v-w-title="sceneDetail.createUser">{{sceneDetail.createUser | contentFilter}}</span>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="12">
                    <FormItem label="上次修改时间：" :label-width="150">
                        <span class="info-val" v-w-title="sceneDetail.updatedTime">{{sceneDetail.updatedTime | contentFilter}}</span>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="上次修改人：" :label-width="150">
                        <span class="info-val" v-w-title="sceneDetail.updateUser">{{sceneDetail.updateUser | contentFilter}}</span>
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
        </Form>
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
        <!--已开通服务-->
        <opened-service
            :isDefaultPackUp="false"
            type="scene"
            :scene-detail="sceneDetail"
            :search-params="{id : activeNode.id}">
        </opened-service>
        <!--合作伙伴-->
        <partner
            :search-params="{id : activeNode.id}">
        </partner>
        <!--重置密码模态框-->
        <edit-modal ref="editModal">
            <div class="edit-modal-tip-word">
                您正在重置管理员{{sceneDetail.adminAccountName}}的登录密码，
                我们将以邮件形式将新密码发送到以下邮箱，请注意查收：{{sceneDetail.email}}
            </div>
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
    import { validator } from 'klwk-ui';

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
        components : {
            tableCom,
            employeeTable,
            openedService,
            subScene,
            subDepartment,
            partner,
            cityPlugin,
            editModal
        },
        data () {
            //校验邮箱
            const validateEmail = (rule,value,callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('formalError',{ field : this.$t('email') }));
                    }
                } else {
                    callback(this.$t('inputField',{ field : this.$t('email') }));
                }
            };
            //校验手机号
            const validatePhone = (rule,value,callback) => {
                if (value) {
                    if (validator.isMobile(value)) {
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
                //管理上级列表
                superiorList : [],
                //财务上级列表
                fianceSuperiorList : [],
                //受理客服列表
                serviceStaffList : [],
                type : 'watch',
                //景区详情
                sceneDetail : {},
                //校验规则
                ruleValidate : {
                    orgName : [
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('scenicName'),length : 100 }),trigger : 'blur' },
                        { required : true,message : this.$t('inputField',{ field : this.$t('scenicName') }),trigger : 'blur' }
                    ],
                    checkinCode : [
                        { min : 2,max : 8,message : this.$t('scopeLimit'),trigger : 'blur' },
                    ],
                    email : [
                        { required : true,message : this.$t('inputField',{ field : this.$t('email') }),trigger : 'blur' },
                        { validator : validateEmail,trigger : 'blur' }
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
                    linkName : [
                        { required : true,message : this.$t('inputField',{ field : this.$t('person') }),trigger : 'blur' },
                        { max : 10,message : this.$t('errorMaxLength',{ field : this.$t('person'),length : 10 }),trigger : 'blur' },
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
                        ajax.post('updateOrgInfo',{
                            id : this.formDataCopy.id,
                            status : this.formDataCopy.isStart ? 'open' : 'close',
                            orgName : this.formDataCopy.orgName,
                            checkinCode : this.formDataCopy.checkinCode,
                            email : this.formDataCopy.email,
                            province : this.formDataCopy.provinceId,
                            city : this.formDataCopy.cityId,
                            district : this.formDataCopy.areaId,
                            telephone : this.formDataCopy.telephone,
                            tex : this.formDataCopy.tex,
                            linkName : this.formDataCopy.linkName,
                            parentManageId : this.formDataCopy.parentManageId,
                            parentEconomicId : this.formDataCopy.parentEconomicId,
                            address : this.formDataCopy.address,
                            businessAccountId : this.formDataCopy.businessId,
                        }).then(res => {
                            if (res.status === 200) {
                                this.$Message.success('修改成功');
                                this.getSceneDetail();
                                //修改了景区名称，需要刷新左侧组织树
                                if (this.formDataCopy.orgName !== this.sceneDetail.orgName) {
                                    this.freshOrg();
                                }
                                //修改了管理上级，需要刷新左侧的组织树
                                if (this.formDataCopy.parentManageId !== this.sceneDetail.parentManageId) {
                                    this.freshOrg();
                                }
                                //修改了财务上级，需要刷新左侧的组织树
                                if (this.formDataCopy.parentEconomicId !== this.sceneDetail.parentEconomicId) {
                                    this.freshOrg();
                                }
                            } else {
                                this.$Message.error(res.message | '修改失败');
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
                    isStart : this.sceneDetail.status === 'open',
                } , this.sceneDetail);
                this.type = 'edit';
            },
            /**
             * 确认重置密码
             */
            confimChangePass () {
                ajax.post('resetPwd',{
                    id : this.sceneDetail.adminAccountId,
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('重置成功');
                    } else {
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
                    if (res.status === 200) {
                        this.sceneDetail = res.data ? res.data : {};
                    } else {
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
                    if (res.status === 200) {
                        this.fianceSuperiorList = res.data ? [res.data.parentEconomics] : [];
                        this.superiorList = res.data ? [res.data.parentManages] : [];
                    } else {
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
                    if (res.status === 200) {
                        this.serviceStaffList = res.data ? res.data : [];
                    } else {
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
                this.formDataCopy.provinceId = data.province ? data.province.provinceid : '';
                this.formDataCopy.cityId = data.city ? data.city.cityid : '';
                this.formDataCopy.areaId = data.area ? data.area.areaid : '';
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
                if (this.sceneDetail && this.sceneDetail.provinceName) {
                    place += this.sceneDetail.provinceName;
                }
                if (this.sceneDetail && this.sceneDetail.cityName) {
                    place += this.sceneDetail.cityName;
                }
                if (this.sceneDetail && this.sceneDetail.areaName) {
                    place += this.sceneDetail.areaName;
                }
                return place;
            },
            //默认选中的所在地信息
            defaultAddress () {
                if (this.sceneDetail && Object.keys(this.sceneDetail).length > 0) {
                    return {
                        province : {
                            provinceid : this.sceneDetail.provinceId,
                            province : this.sceneDetail.provinceName,
                        },
                        city : {
                            cityid : this.sceneDetail.cityId,
                            city : this.sceneDetail.cityName
                        },
                        area : {
                            areaid : this.sceneDetail.areaId,
                            area : this.sceneDetail.areaName
                        },
                    };
                } else {
                    return false;
                }
            }
        },
        created () {
            this.querySysAccoutList();
            this.getParentManages();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .scene-detail {
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
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
        }

        /deep/ .ivu-form-item-content{
            font-size: 14px;
            color: #333333;
        }

        .com-name {
            height: 70px;
            @include overflow_tip(100%);
            padding: 14px 0 0 0;

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

        .reset-pass{
            color: $color_blue;
            font-size: $font_size_12px;
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

        .info-val{
            @include overflow_tip();
            display: inline-block;
            width: 100%;
            color: $color_666;

            .account-name{
                max-width: calc(100% - 140px);
                @include overflow_tip();
                vertical-align: middle;
                margin-right: 10px;
            }
        }

        /deep/ .ivu-form-item{
            width: 100%;
        }

        .employee-account {
            @include block_outline($height: 30px);
            line-height: 20px;
            padding-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_606266;
        }
    }
    .edit-modal-tip-word{
        @include block_outline(100%,auto);
        padding: 20px;
        word-break: break-all;
    }
</style>
