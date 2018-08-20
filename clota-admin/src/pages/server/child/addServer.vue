<!--新增服务器-->

<template>
    <div class="add-server">
        <!--面包屑导航-->
        <bread-crumb-head
            :locale-router="$t('addServer')"
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
                                   style="width: 280px"
                                   :maxlength="50"/>
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
                                   style="width: 280px"
                                   :maxlength="50"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--系统-->
                        <FormItem :label="$t('system')" prop="system">
                            <Input v-model="formData.system"
                                   style="width: 280px"
                                   :maxlength="50"/>
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
                                    {{item.value + $t(item.label)}}
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
    import {validator} from 'klwk-ui';
    import {listenRateEnum, systemTypeList} from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    import {isIpv4,isIpv6} from '../../../assets/js/constVariable';

    export default {
        components: {
            breadCrumbHead
        },
        data() {
            //校验ip地址是否正确
            const validateIp = (rule,value,callback) => {
                if(value){
                    if(isIpv4(value) || isIpv6(value)){
                        callback();
                    }else{
                        callback(this.$t('validateError.formatError', {field: this.$t('ipAddress')}));
                    }
                }else{
                    callback(this.$t('validateError.pleaseInput', {msg: this.$t('serverName')}));
                }
            };
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('serverList'),
                        router: {
                            name: 'server'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //服务器名称
                    serverName: '',
                    //ip地址
                    IPname: '',
                    //应用服务
                    usingService: '',
                    //系统
                    system: '',
                    //系统类型
                    systemType: '',
                    //监控频率
                    listenRate: '',
                    //系统描述
                    systemDesc: '',
                },
                //表单校验规则
                ruleValidate: {
                    serverName: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseInput', {msg: this.$t('serverName')}),
                            trigger: 'blur'
                        },
                    ],
                    IPname: [
                        {
                            required: true,
                            validator : validateIp,
                            trigger: 'blur'
                        },
                    ],
                    usingService : [
                        {required : true,message :this.$t('validateError.pleaseInput', {msg: this.$t('usingService')}),trigger : 'blur' }
                    ],
                    system : [
                        {required : true,message :this.$t('validateError.pleaseInput', {msg: this.$t('system')}),trigger : 'blur' }
                    ],
                    systemType : [
                        {required : true,message :this.$t('validateError.pleaseSelect', {msg: this.$t('systemType')}),trigger : 'change' }
                    ],
                    listenRate : [
                        {required : true,message :this.$t('validateError.pleaseSelect', {msg: this.$t('listenRate')}),trigger : 'change' }
                    ]
                },
                //系统类型列表
                systemTypeList: systemTypeList,
                //监控频率
                listenRateEnum: listenRateEnum,
                //是否正在添加中
                addLoading: false
            }
        },
        methods: {
            /**
             * 保存新增租户数据
             */
            save() {
                this.addLoading = true;
                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        this.addServerse();
                    }else{
                        this.addLoading = false;
                    }
                });
            },
            /**
             * 取消新增
             */
            cancel() {
                this.$router.push({
                    name: 'server'
                });
            },
            /**
             * 新增服务
             */
            addServerse () {
                ajax.post('addServerse',{
                    serverName : this.formData.serverName,
                    ip : this.formData.IPname,
                    serviceName : this.formData.usingService,
                    systmeBit : this.formData.systemType,
                    monitoringFrequencc : this.formData.listenRate,
                    description : this.formData.systemDesc,
                    opSystme : this.formData.system,
                }).then(res => {
                   if(res.status === 200) {
                        this.$Message.success(this.$t('addSuccess'));
                        this.$router.push({
                            name : 'server'
                        });
                   }else{
                        this.$Message.error(res.message || this.$t('interfaceError'));
                   }
                }).finally(() =>{
                    this.addLoading = false;
                });
            }
        }
    }
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
