<!--新增服务器-->

<template>
    <div class="add-server">
        <!--面包屑导航-->
        <bread-crumb-head
            :locale-router="localeRouter"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-server-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <i-row>
                    <i-col span="11">
                        <!--服务器名称-->
                        <FormItem :label="$t('serverName')" prop="serverName">
                            <Input v-model="formData.serverName"
                                   style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--ip地址-->
                        <FormItem :label="$t('ipAddress')" prop="IPname">
                            <Input v-model="formData.IPname" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--应用服务-->
                        <FormItem :label="$t('usingService')" prop="usingService">
                            <Input v-model="formData.usingService"
                                   style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--系统-->
                        <FormItem :label="$t('system')" prop="system">
                            <Input v-model="formData.system"
                                   style="width: 280px"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <Row>
                    <i-col span="11">
                    <!--系统类型-->
                        <FormItem :label="$t('systemType')" prop="systemType">
                            <Select v-model="formData.systemType" style="width:280px">
                                <Option v-for="item in systemTypeList"
                                        :value="item.value"
                                        :key="item.value">
                                    {{ $t(item.label,{bit : item.value}) }}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--监控频率-->
                        <FormItem :label="$t('listenRate')" prop="listenRate">
                            <Select v-model="formData.listenRate" style="width:280px">
                                <Option v-for="item in listenRateEnum"
                                        :value="item.value"
                                        :key="item.value">
                                    {{ $t(item.label,{minute : item.value})}}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <FormItem :label="$t('systemDesc')">
                    <!--系统描述-->
                    <Input v-model="formData.systemDesc"
                           type="textarea"
                           style="width: 704px"
                           :maxlength="500"/>
                </FormItem>
            </Form>
            <div class="footer">
                <Button type="primary"
                        v-if="isModify"
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t('confirmEdit')}}
                </Button>
                <Button type="primary"
                        v-else
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t('addNew')}}
                </Button>
                <Button @click="cancel"
                        class="ivu-btn-min">
                    {{$t('cancel')}}
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import { validator } from 'klwk-ui';
    import { listenRateEnum, systemTypeList } from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    import { isIpv4,isIpv6 } from '../../../assets/js/constVariable';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead
        },
        data () {
            //校验ip地址是否正确
            const validateIp = (rule,value,callback) => {
                if (value) {
                    if (this.isModify) {
                        if (this.originalFormData.IPname === value) {
                            callback();
                            return;
                        }
                    }
                    if (isIpv4(value) || isIpv6(value)) {
                        ajax.post('queryServerByIp',{
                            ip : value
                        }).then(res => {
                            if (res.status === 200) {
                                if (!res.data) {
                                    callback();
                                } else {
                                    callback(this.$t('fieldExist',{ field : this.$t('ipAddress') }));
                                }
                            } else {
                                callback(this.$t('checkFail',{ field : this.$t('ipAddress') }) );
                            }
                        });
                    } else {
                        callback(this.$t('validateError.formatError', { field : this.$t('ipAddress') }));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', { msg : this.$t('serverName') }));
                }
            };
            //校验服务器名称是否重复
            const validateServerName = (rule,value,callback) => {
                if (value) {
                    if (this.isModify) {
                        if (this.originalFormData.serverName === value) {
                            callback();
                            return;
                        }
                    }
                    ajax.post('queryServerByServerName',{
                        serverName : value
                    }).then(res => {
                        if (res.status === 200) {
                            if (!res.data) {
                                callback();
                            } else {
                                callback(this.$t('fieldExist',{ field : this.$t('serverName') }));
                            }
                        } else {
                            callback(this.$t('checkFail',{ field : this.$t('serverName') }) );
                        }
                    });
                } else {
                    callback(this.$t('validateError.pleaseInput', { msg : this.$t('serverName') }));
                }
            };
            return {
                //存储原始表单数据，用于判断服务器信息是否改变过
                originalFormData : {},
                //表单数据
                formData : {
                    id : '',
                    //服务器名称
                    serverName : '',
                    //ip地址
                    IPname : '',
                    //应用服务
                    usingService : '',
                    //系统
                    system : '',
                    //系统类型
                    systemType : '',
                    //监控频率
                    listenRate : '',
                    //系统描述
                    systemDesc : '',
                },
                //表单校验规则
                ruleValidate : {
                    serverName : [
                        {
                            required : true,
                            validator : validateServerName,
                            trigger : 'blur'
                        },
                        {
                            max : 50,
                            message : this.$t('errorMaxLength',{ field : this.$t('serverName'),length : 50 }),
                            trigger : 'blur'
                        }
                    ],
                    IPname : [
                        {
                            required : true,
                            validator : validateIp,
                            trigger : 'blur'
                        },
                    ],
                    usingService : [
                        { required : true,message : this.$t('validateError.pleaseInput', { msg : this.$t('usingService') }),trigger : 'blur' },
                        {
                            max : 50,
                            message : this.$t('errorMaxLength',{ field : this.$t('usingService'),length : 50 }),
                            trigger : 'blur'
                        }
                    ],
                    system : [
                        { required : true,message : this.$t('validateError.pleaseInput', { msg : this.$t('system') }),trigger : 'blur' },
                        {
                            max : 50,
                            message : this.$t('errorMaxLength',{ field : this.$t('system'),length : 50 }),
                            trigger : 'blur'
                        }
                    ],
                    systemType : [
                        { required : true,message : this.$t('validateError.pleaseSelect', { msg : this.$t('systemType') }),trigger : 'change' }
                    ],
                    listenRate : [
                        { required : true,message : this.$t('validateError.pleaseSelect', { msg : this.$t('listenRate') }),trigger : 'change' }
                    ]
                },
                //系统类型列表
                systemTypeList : systemTypeList,
                //监控频率
                listenRateEnum : listenRateEnum,
                //是否正在添加中
                addLoading : false
            };
        },
        methods : {
            /**
             * 保存新增租户数据
             */
            save () {
                this.addLoading = true;
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        if (this.isModify) {
                            this.modifyServer();
                        } else {
                            this.addServerse();
                        }
                    } else {
                        this.addLoading = false;
                    }
                });
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$router.push({
                    name : 'server'
                });
            },
            /**
             * 新增服务
             */
            addServerse () {
                ajax.post('addServerse',{
                    id : this.isModify ? this.formData.id : '',
                    serverName : this.formData.serverName,
                    ip : this.formData.IPname,
                    serviceName : this.formData.usingService,
                    systmeBit : this.formData.systemType,
                    monitoringFrequencc : this.formData.listenRate,
                    description : this.formData.systemDesc,
                    opSystme : this.formData.system,
                }).then(res => {
                   if (res.status === 200) {
                       this.$Message.success(this.$t('addSuccess'));
                        this.$router.push({
                            name : 'server'
                        });
                   } else {
                       this.$Message.error(res.message || this.$t('failureTip',{ tip : this.$t('add') }));
                   }
                }).finally(() =>{
                    this.addLoading = false;
                });
            },
            /**
             * 获取路由信息
             * @param{Object} params
             */
            getParams (params) {
                if (this.$route.name === 'modifyServer') {
                    if (params && params.serverDetail && Object.keys(params.serverDetail).length > 0) {
                        this.formData.id =  params.serverDetail.id;
                        this.formData.serverName =  params.serverDetail.serverName;
                        this.formData.IPname =  params.serverDetail.ip;
                        this.formData.usingService =  params.serverDetail.serviceName;
                        this.formData.system =  params.serverDetail.opSystme;
                        this.formData.systemType =  params.serverDetail.systmeBit;
                        this.formData.listenRate =  String(params.serverDetail.monitoringFrequencc);
                        this.formData.systemDesc =  params.serverDetail.description;
                        this.originalFormData = JSON.parse(JSON.stringify(this.formData));
                    } else {
                        this.$router.push({
                            name : 'serverDetail'
                        });
                    }
                } else {
                    this.originalFormData = {};
                }
            },
            /**
             * 修改服务器信息
             */
            modifyServer () {
                ajax.post('updateServerse',{
                    id : this.formData.id,
                    serverName : this.formData.serverName,
                    ip : this.formData.IPname,
                    serviceName : this.formData.usingService,
                    systmeBit : this.formData.systemType,
                    monitoringFrequencc : this.formData.listenRate,
                    description : this.formData.systemDesc,
                    opSystme : this.formData.system,
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('edit') }));
                        this.$router.push({
                            name : 'serverDetail'
                        });
                    } else {
                        this.$Message.error(res.message || this.$t('failureTip',{ tip : this.$t('edit') }));
                    }
                }).finally(() =>{
                    this.addLoading = false;
                });
            }
        },
        computed : {
            // 上级路由列表
            beforeRouterList () {
                if (this.$route.name === 'modifyServer') { //编辑服务器
                    return [
                        {
                            name : this.$t('serverList'),
                            router : {
                                name : 'server'
                            }
                        },
                        {
                            name : this.$t('服务器详情'),
                            router : {
                                name : 'serverDetail'
                            }
                        }
                    ];
                } else if (this.$route.name === 'addServer') { //新增服务器
                    return [
                        {
                            name : this.$t('serverList'),
                            router : {
                                name : 'server'
                            }
                        }
                    ];
                }
                return [];
            },
            //当前路由名称
            localeRouter () {
                if (this.$route.name === 'modifyServer') { //编辑服务器
                    return '编辑服务器';
                } else if (this.$route.name === 'addServer') { //新增服务器
                    return 'addServer';
                }
            },
            //是否在修改页面
            isModify () {
                return this.$route.name === 'modifyServer';
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-server {
        @include block_outline();

        .add-server-info {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline(924px, auto);
                margin: 0 auto;

                textarea.ivu-input {
                    height: 100px;
                }
            }
        }

        .footer {
            text-align: center;
            margin-top: 40px;

            /deep/ .ivu-btn-primary {
                margin-right: 18px;
            }
        }
    }
</style>
