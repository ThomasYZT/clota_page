<!--景区详情-->

<template>
    <div class="scene-detail">
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
                            <FormItem prop="orgName" >
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
                          v-w-title="sceneDetail.orgName">
                        {{sceneDetail.orgName}}
                    </span>
                    <span class="edit"
                          v-if="'modifyNode' in permissionInfo"
                          @click="edit">
                        <span class="iconfont icon-edit"></span>
                        {{$t('modify')}}
                    </span>
                    <span :class="{'started' :sceneDetail.status === 'open' ,'not-started' : sceneDetail.status === 'close'}">
                        {{$t(sceneDetail.status === 'open' ? 'hasStart' : 'hasNotStart')}}
                    </span>
                </template>

            </div>

            <div :class="{'form-area' : type === 'edit'}">
                <i-row>
                    <i-col span="12">
                        <FormItem :label="$t('companyId')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.id"
                                   disabled/>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('companyId')}}：</span>
                            <span class="info-val" v-w-title="sceneDetail.id">
                                {{sceneDetail.id | contentFilter}}
                            </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem :label="$t('companyCode')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.nodeCode"
                                   disabled/>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('companyCode')}}：</span>
                            <span class="info-val" v-w-title="sceneDetail.nodeCode">
                                {{sceneDetail.nodeCode | contentFilter}}
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
                            <span class="info-key">{{$t('enterpriseCode')+'('+$t('offlineVerify')}}：</span>
                            <span class="info-val" v-w-title="sceneDetail.checkinCode">
                                {{sceneDetail.checkinCode | contentFilter}}
                            </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem :label="$t('distributionCode')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.saleCode"
                                   disabled/>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('distributionCode')}}：</span>
                            <span class="info-val"
                                  v-w-title="sceneDetail.saleCode">
                                {{sceneDetail.saleCode | contentFilter}}
                            </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem :label="$t('controlAccount')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.manager"
                                   disabled/>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('controlAccount')}}：</span>
                            <span class="info-val">
                            <span class="account-con"
                                  v-w-title="sceneDetail.manager">{{sceneDetail.manager | contentFilter}}</span>
                                <span class="reset-pass"
                                      v-if="activeNode && activeNode.level !== 1  && 'resetNodePassword' in permissionInfo"
                                      @click="resetPass">{{$t('resetPsw')}}</span>
                            </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem prop="email"
                                  :label="$t('email')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model="formDataCopy.email" />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('email')}}：</span>
                            <span class="info-val" v-w-title="sceneDetail.email">
                                {{sceneDetail.email  | contentFilter}}
                            </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem :label="$t('location')+'：'"
                                  v-if="defaultAddress && type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <city-plugin @select="changeCity"
                                         :defaultValue="defaultAddress">
                            </city-plugin>
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
                            <span class="info-val" v-w-title="sceneDetail.address">
                                {{sceneDetail.address | contentFilter}}
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
                            <Input v-model="formDataCopy.telephone" />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('telephone')}}：</span>
                            <span class="info-val" v-w-title="sceneDetail.telephone">
                                {{sceneDetail.telephone | contentFilter}}
                            </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem prop="tex"
                                  :label="$t('fax')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model="formDataCopy.tex" />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('fax')}}：</span>
                            <span class="info-val" v-w-title="sceneDetail.tex">
                                {{sceneDetail.tex | contentFilter}}
                            </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="linkName"
                                  :label="$t('person')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model="formDataCopy.linkName" />
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('person')}}：</span>
                            <span class="info-val" v-w-title="sceneDetail.linkName">
                                {{sceneDetail.linkName | contentFilter}}
                            </span>
                        </div>
                    </i-col>
                    <i-col span="12">
                        <FormItem prop="parentManageId"
                                  :label="$t('superior')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <select-tree v-model="formDataCopy.parentManageId"
                                         :disabled-node-ids="[activeNode.id]"
                                         :disabled="activeNode && activeNode.level === 1"
                                         :tree="superiorList"
                                         style="width: 100%;">
                            </select-tree>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('superior')}}：</span>
                            <span class="info-val" v-w-title="sceneDetail.parentManager">
                                <template v-if="activeNode.level !== 1">
                                    {{sceneDetail.parentManager | contentFilter}}
                                </template>
                                <template v-else>-</template>
                            </span>
                        </div>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="parentEconomicId"
                                  :label="$t('fianceSuperior')+'：'"
                                  v-if="type === 'edit'"
                                  :label-width="type === 'edit' ? 0 : 150">
                            <select-tree v-model="formDataCopy.parentEconomicId"
                                         :disabled-node-ids="[activeNode.id]"
                                         :disabled="activeNode && activeNode.level === 1"
                                         :tree="fianceSuperiorList"
                                         style="width: 100%;">
                            </select-tree>
                        </FormItem>
                        <div class="node-info" v-else>
                            <span class="info-key">{{$t('fianceSuperior')}}：</span>
                            <span class="info-val" v-w-title="sceneDetail.parentEconomic">
                                <template v-if="activeNode.level !== 1">
                                    {{sceneDetail.parentEconomic | contentFilter}}
                                </template>
                                <template v-else>-</template>
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
        <!--下属景区-->
        <sub-scene
            :activeTap="activeTap"
            :search-params="{id : activeNode.id}">
        </sub-scene>
        <!--下属部门-->
        <sub-department
            :activeTap="activeTap"
            :search-params="{id : activeNode.id}"
            @org-change="freshOrg">
        </sub-department>
        <!--合作伙伴-->
        <partner
            :search-params="{id : activeNode.id}">
        </partner>
        <!--已开通服务-->
        <opened-service
            :isDefaultPackUp="false"
            type="scene"
            :scene-detail="sceneDetail"
            :search-params="{id : activeNode.id}">
        </opened-service>
        <!--重置密码模态框-->
        <edit-modal ref="editModal">
            <div style="padding: 0 20px;word-break: break-all;width: 100%;">
                {{$t('pswNotice', {msg: sceneDetail.manager})}}{{sceneDetail.email}}
            </div>
        </edit-modal>
    </div>
</template>

<script>
    import tableCom from '../../organization/tableCom';
    import openedService from './components/openedService';
    import subScene from './components/subScene';
    import subDepartment from './components/subDepartment';
    import partner from './components/partner';
    import defaultsDeep from 'lodash/defaultsDeep';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import editModal from '@/components/editModal/index.vue';
    import ajax from '@/api/index.js';
    import {validator} from 'klwk-ui';
    import selectTree from '@/components/selectTree/index.vue';
    import {mapGetters} from 'vuex';

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
        components: {
            tableCom,
            openedService,
            subScene,
            subDepartment,
            partner,
            cityPlugin,
            editModal,
            selectTree
        },
        data() {
            //校验邮箱
            const validateEmail = (rule,value,callback) => {
                if(value){
                    if(validator.isEmail(value)){
                        callback();
                    }else{
                        callback(this.$t('errorFormat',{field : this.$t('email')}));
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
                        callback(this.$t('errorFormat',{field : this.$t('phone')}));
                    }
                }else{
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
                type : 'watch',
                //景区详情
                sceneDetail : {},
                //校验规则
                ruleValidate : {
                    orgName : [
                        {max : 100,message : this.$t('errorMaxLength',{field : this.$t('scenicName'),length : 100}),trigger : 'blur'},
                        {required : true,message : this.$t('inputField',{field : this.$t('scenicName')}),trigger : 'blur'}
                    ],
                    checkinCode : [
                        {min : 2,max : 8,message : this.$t('rangeBitError',{field : this.$t('enterpriseCode'),length : 8,min : 1,max :8}),trigger : 'blur'},
                    ],
                    email : [
                        {required : true,message : this.$t('inputField',{field : this.$t('email')}),trigger : 'blur'},
                        {validator : validateEmail,trigger : 'blur'}
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
                    linkName : [
                        {required : true,message : this.$t('inputField',{field : this.$t('person')}),trigger : 'blur'},
                        {max : 10,message : this.$t('errorMaxLength',{field : this.$t('person'),length : 10}),trigger : 'blur'},
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
                        ajax.post('modifyOrgInfo',{
                            id : this.formDataCopy.id,
                            status : this.formDataCopy.isStart ? 'open' : 'close',
                            orgName : this.formDataCopy.orgName,
                            checkinCode : this.formDataCopy.checkinCode,
                            email : this.formDataCopy.email,
                            province : this.formDataCopy.provinceCode,
                            city : this.formDataCopy.cityCode,
                            district : this.formDataCopy.districtCode,
                            telephone : this.formDataCopy.telephone,
                            tex : this.formDataCopy.tex,
                            linkName : this.formDataCopy.linkName,
                            parentManageId : this.formDataCopy.parentManageId,
                            parentEconomicId : this.formDataCopy.parentEconomicId,
                            address : this.formDataCopy.address,
                            managerId : this.formDataCopy.managerId,
                            nodeType : this.formDataCopy.nodeType,
                        }).then(res => {
                            if(res.success){
                                this.$Message.success(this.$t('successTip', {tip: this.$t('modify')}));
                                if(this.formDataCopy.orgName !== this.sceneDetail.orgName){
                                    this.freshOrg();
                                }else if(this.formDataCopy.parentManageId !== this.sceneDetail.parentManageId){
                                    this.freshOrg();
                                }else if(this.formDataCopy.parentEconomicId !== this.sceneDetail.parentEconomicId){
                                    this.freshOrg();
                                }else{
                                    this.getSceneDetail();
                                }
                                this.$store.dispatch('freshOrgs');
                            }else{
                                this.$Message.error(res.message | this.$t('failureTip', {tip: this.$t('modify')}));
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
                }  , this.sceneDetail);
                this.type = 'edit';
            },
            /**
             * 确认重置密码
             */
            confimChangePass (){
                ajax.post('resetManagerPassword',{
                    orgId : this.activeNode.id,
                    managerId : this.sceneDetail.managerId,
                    email : this.sceneDetail.email,
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('resetPswSuccess',{msg: this.sceneDetail.manager}));
                    }else{
                        this.$Message.error(res.message || this.$t('resetPswFail',{msg: this.companyDetail.manager}));
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
                    title : this.$t('resetPsw'),
                    confirmCallback : () => {
                        this.confimChangePass();
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
                ajax.post('getOrgInfo',{
                    orgId : this.activeNode.id,
                }).then(res => {
                    if(res.success){
                        this.sceneDetail = res.data ? res.data.basicInfo : {};
                    }else{
                        this.sceneDetail = {};
                    }
                });
            },
            /**
             * 获取经营上级
             */
            getParentManages () {
                ajax.post('getOrgsByManageType',{
                    orgId : this.activeNode.id,
                    manageType : 'manage',
                    nodeType : this.activeNode.type,
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
                    manageType : 'economic',
                    nodeType : this.activeNode.type,
                }).then(res => {
                    if(res.success){
                        this.fianceSuperiorList = res.data ? res.data.filter(item => item.id !== this.activeNode.id) : [];
                    }else{
                        this.fianceSuperiorList = [];
                    }
                });
            },
            /**
             * 改变城市
             * @param data
             */
            changeCity (data) {
                if(data.province && Object.keys(data.province).length > 0){
                    this.formDataCopy.provinceCode = data.province.provinceid;
                    this.formDataCopy.province = data.province.province;
                }else{
                    this.formDataCopy.provinceCode = '000000';
                    this.formDataCopy.province = '';
                }
                if(data.city && Object.keys(data.city).length > 0){
                    this.formDataCopy.cityCode = data.city.cityid;
                    this.formDataCopy.city = data.city.city;
                }else{
                    this.formDataCopy.cityCode = '000000';
                    this.formDataCopy.city = '';
                }
                if(data.area && Object.keys(data.area).length > 0){
                    this.formDataCopy.districtCode = data.area.areaid;
                    this.formDataCopy.district = data.area.area;
                }else{
                    this.formDataCopy.districtCode = '000000';
                    this.formDataCopy.district = '';
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
                if(this.sceneDetail && this.sceneDetail.province){
                    place += this.sceneDetail.province;
                }
                if(this.sceneDetail && this.sceneDetail.city){
                    place += this.sceneDetail.city;
                }
                if(this.sceneDetail && this.sceneDetail.district){
                    place += this.sceneDetail.district;
                }
                return place;
            },
            //默认选中的所在地信息
            defaultAddress () {
                if(this.sceneDetail && Object.keys(this.sceneDetail).length > 0){
                    return {
                        province : {
                            provinceid : this.sceneDetail.provinceCode,
                            province : this.sceneDetail.province
                        },
                        city : {
                            cityid : this.sceneDetail.cityCode,
                            city : this.sceneDetail.city,
                        },
                        area : {
                            areaid : this.sceneDetail.districtCode,
                            area : this.sceneDetail.district,
                        },
                    }
                }else{
                    return false;
                }
            },
            ...mapGetters({
                permissionInfo : 'permissionInfo'
            })
        },
        created () {
            this.getParentManages();
            this.getParentEconomic();
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
                    max-width: calc(100% - 60px);
                    float: left;
                    @include overflow_tip();
                }
            }
            .info-key{
                display: inline-block;
                float: left;
                color: $color_333;
            }
        }

        .form-watch{
            padding-bottom: 20px;
            border-bottom: 1px dashed #E1E1E1;

            /deep/ .ivu-form-item{
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
                margin-bottom: 16px;
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

        .form-area{
            background:  rgba(#F5F7FA,0.3);
            padding: 20px 0 20px 20px;
            border-radius: 4px;
            max-width: 1000px;
            margin: 0 auto;
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
