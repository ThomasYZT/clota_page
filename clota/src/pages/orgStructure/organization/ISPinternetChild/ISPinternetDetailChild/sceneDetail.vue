<!--景区详情-->

<template>
    <div class="scene-detail">
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
                          @click="edit">
                        <span class="iconfont icon-edit"></span>
                        {{$t('modify')}}
                    </span>
                    <span :class="{'started'
                        :formDataCopy.isStart ,'not-started' : !formDataCopy.isStart}">
                        {{$t(formDataCopy.isStart ? 'hasStart' : 'hasNotStart')}}
                    </span>
                </template>

            </div>

            <div :class="{'form-area' : type === 'edit'}">
                <i-row>
                    <i-col span="12">
                        <FormItem label="公司ID：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.id"
                                   disabled
                                   v-if="type === 'edit'"/>
                            <span class="info-val" v-else v-w-title="sceneDetail.id">
                                {{sceneDetail.id | contentFilter}}
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="公司编码：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.nodeCode"
                                   disabled
                                   v-if="type === 'edit'"/>
                            <span class="info-val" v-else v-w-title="sceneDetail.nodeCode">
                                {{sceneDetail.nodeCode | contentFilter}}
                            </span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="checkinCode" label="企业编码(线下核销)：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.checkinCode"  v-if="type === 'edit'"/>
                            <span class="info-val" v-else v-w-title="sceneDetail.checkinCode">
                                {{sceneDetail.checkinCode | contentFilter}}
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem label="全民分销邀请码：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.saleCode"
                                   disabled
                                   v-if="type === 'edit'"/>
                            <span class="info-val"
                                  v-else
                                  v-w-title="sceneDetail.saleCode">
                                {{sceneDetail.saleCode | contentFilter}}
                            </span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem label="管理账号：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model.trim="formDataCopy.manager"
                                   disabled
                                   v-if="type === 'edit'"/>
                            <span class="info-val"
                                  v-else
                                  v-w-title="sceneDetail.manager">
                                 {{sceneDetail.manager | contentFilter}}
                                <span class="reset-pass" @click="resetPass" v-if="type === 'edit'">重置密码</span>
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem prop="email" label="电子邮箱：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model="formDataCopy.email" v-if="type === 'edit'"/>
                            <span class="info-val" v-else v-w-title="sceneDetail.email">
                            {{sceneDetail.email  | contentFilter}}
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
                            <span class="info-val" v-else v-w-title="sceneDetail.address">
                            {{sceneDetail.address | contentFilter}}
                        </span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="telephone" label="电话：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model="formDataCopy.telephone" v-if="type === 'edit'"/>
                            <span class="info-val" v-else v-w-title="sceneDetail.telephone">
                            {{sceneDetail.telephone | contentFilter}}
                        </span>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem prop="tex" label="传真：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model="formDataCopy.tex" v-if="type === 'edit'"/>
                            <span class="info-val" v-else v-w-title="sceneDetail.tex">
                            {{sceneDetail.tex | contentFilter}}
                        </span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="linkName" label="联系人：" :label-width="type === 'edit' ? 0 : 150">
                            <Input v-model="formDataCopy.linkName" v-if="type === 'edit'"/>
                            <span class="info-val" v-else v-w-title="sceneDetail.linkName">
                            {{sceneDetail.linkName | contentFilter}}
                        </span>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem prop="parentManageId" label="管理上级：" :label-width="type === 'edit' ? 0 : 150">
                            <Select v-model="formDataCopy.parentManageId" v-if="type === 'edit' && activeNode && activeNode.level !== 1">
                                <Option v-for="item in superiorList"
                                        :value="item.id"
                                        :key="item.id">
                                    {{ item.orgName }}
                                </Option>
                            </Select>
                            <span class="info-val" v-else v-w-title="sceneDetail.parentManager">
                                <template v-if="activeNode.level !== 1">
                                    {{sceneDetail.parentManager | contentFilter}}
                                </template>
                                <template v-else>-</template>
                            </span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem prop="parentEconomicId" label="财务上级：" :label-width="type === 'edit' ? 0 : 150">
                            <Select v-model="formDataCopy.parentEconomicId" v-if="type === 'edit' && activeNode && activeNode.level !== 1">
                                <Option v-for="item in fianceSuperiorList"
                                        :value="item.id"
                                        :key="item.id">
                                    {{ item.orgName }}
                                </Option>
                            </Select>
                            <span class="info-val" v-else v-w-title="sceneDetail.parentEconomic">
                                <template v-if="activeNode.level !== 1">
                                    {{sceneDetail.parentEconomic | contentFilter}}
                                </template>
                                <template v-else>-</template>
                            </span>
                        </FormItem>
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
                            address : this.formDataCopy.address
                        }).then(res => {
                            if(res.success){
                                this.$Message.success('修改成功');
                                this.getSceneDetail();
                                if(this.formDataCopy.orgName !== this.sceneDetail.orgName){
                                    this.freshOrg();
                                }
                            }else{
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
                }  , this.sceneDetail);
                this.type = 'edit';
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
            /**
             * 改变城市
             * @param data
             */
            changeCity (data) {
                if(data.province && Object.keys(data.province).length > 0){
                    this.formDataCopy.provinceCode = data.province.provinceid;
                    this.formDataCopy.province = data.province.province;
                }
                if(data.city && Object.keys(data.city).length > 0){
                    this.formDataCopy.cityCode = data.city.cityid;
                    this.formDataCopy.city = data.city.city;
                }
                if(data.area && Object.keys(data.area).length > 0){
                    this.formDataCopy.districtCode = data.area.areaid;
                    this.formDataCopy.district = data.area.area;
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
            }
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
