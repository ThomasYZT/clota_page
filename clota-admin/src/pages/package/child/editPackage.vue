<!--新增/编辑套餐-->

<template>
    <div class="add-package">
        <bread-crumb-head
            :locale-router="localeRouteName"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-package-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <i-row>
                    <i-col span="22">
                        <!--套餐名称-->
                        <FormItem :label="$t('packageName')"
                                  prop="packageName"
                                  v-if="type === 'add' || type === 'edit'">
                            <Input v-model.trim="formData.packageName" />
                        </FormItem>
                        <FormItem :label="$t('packageName')"
                                  prop="packageName"
                                  v-else>
                            {{formData.packageName}}
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="22">
                        <!--服务列表-->
                        <FormItem :label="$t('choseService')"
                                  prop="services"
                                  v-if="type === 'add' || type === 'edit'">
                            <CheckboxGroup v-model="formData.services">
                                <Checkbox :label="item.serviceCode"
                                          v-for="(item) in serviceList"
                                          :vlaue="item.id"
                                          :key="item.id">
                                    <span>{{item.serviceName}}</span>
                                </Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem :label="$t('servicesChosed')"
                                  prop="services"
                                  v-else>
                            <CheckboxGroup v-model="formData.services" >
                                <Checkbox :label="item.serviceCode"
                                          :disabled="true"
                                          v-for="(item) in serviceList"
                                          :vlaue="item.id"
                                          :key="item.id">
                                    <span>{{item.serviceName}}</span>
                                </Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
            <div class="footer" v-if="type === 'add' || type === 'edit'">
                <Button type="primary"
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t(type === 'add' ? 'addNew' : 'confirmEdit')}}
                </Button>
                <Button @click="cancel" class="ivu-btn-min">{{$t('cancel')}}</Button>
            </div>
            <!--<div class="footer" v-else="type === 'watch'">-->
                <!--<Button type="primary"-->
                        <!--@click="cancel"-->
                        <!--class="ivu-btn-min">-->
                    <!--{{$t('close')}}-->
                <!--</Button>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import { validator } from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import ajax from '@/api/index.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            cityPlugin
        },
        data () {
            //校验选择的服务
            const validateServices = (rule,value,callback) => {
              if (value && value.length > 0) {
                  callback();
              } else {
                  callback(this.$t('validateError.pleaseSelect',{ msg : this.$t('serve') }));
              }
            };
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : this.$t('serverPackage'),
                        router : {
                            name : 'packageList'
                        }
                    }
                ],
                //表单数据
                formData : {
                    //套餐名称
                    packageName : '',
                    //服务列表
                    services : [],
                },
                //表单校验规则
                ruleValidate : {
                    packageName : [
                        { required : true, message : this.$t('validateError.pleaseInput', { 'msg' : this.$t('packageName') }), trigger : 'blur' },
                        { max : 30, message : this.$t('errorMaxLength', { field : this.$t('packageName'),length : 30 }), trigger : 'blur' },
                    ],
                    services : [
                        { required : true, validator : validateServices, trigger : 'blur' }
                    ]
                },
                //是否正在添加中
                addLoading : false,
                //服务操作类型
                type : '',
                //服务列表
                serviceList : [],
                //套餐id
                packageId : '',
                //所有服务
                allServices : [],
            };
        },
        methods : {
            /**
             * 保存新增数据
             */
            save () {
                this.addLoading = true;
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        if (this.type === 'add') {
                            this.addPackage();
                        } else if (this.type === 'edit') {
                            this.updatePackage();
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
                    name : 'packageList'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params.type) {
                    this.type = params.type;
                    this.packageId = params.id;
                    if (this.type === 'watch' || this.type === 'edit') {
                        this.queryPackageInfoById();
                    }
                } else {
                    this.$router.push({
                        name : 'package'
                    });
                }
                this.queryServiceList();
            },

            /**
             * 查询所有服务列表
             */
            queryServiceList () {
                ajax.post('queryServiceList',{
                    serviceStatus : 'normal'
                }).then(res => {
                    if (res.status === 200) {
                        //this.serviceList = res.data ? res.data : [];
                        this.allServices = res.data ? res.data : [];
                        this.serviceList = res.data ? res.data.filter((item) => {
                            return item.isBase === 'false';
                        }) : [];
                    } else {
                        this.allServices = [];
                        this.serviceList = [];
                    }
                }).catch(err => {
                    this.allServices = [];
                    this.serviceList = [];
                });
            },
            /**
             * 添加套餐
             */
            addPackage () {
                ajax.post('addPackage',{
                    packageName : this.formData.packageName,
                    serviceids : this.allServices.filter((item) => {
                        return this.formData.services.includes(item.serviceCode)
                    }).map(item => item.id).join(','),
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('新增成功');
                        this.$router.push({
                            name : 'packageList'
                        });
                    } else {
                        this.$Message.error(res.message || '新增失败');
                    }
                }).finally(() => {
                    this.addLoading = false;
                });
            },
            /**
             * 编辑套餐
             */
            updatePackage () {
                ajax.post('updatePackage',{
                    id : this.packageId,
                    packageName : this.formData.packageName,
                    serviceids : this.allServices.filter((item) => {
                        return this.formData.services.includes(item.serviceCode)
                    }).map(item => item.id).join(','),
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success('编辑成功');
                        this.$router.push({
                            name : 'packageList'
                        });
                    } else {
                        this.$Message.error(res.message || '编辑失败');
                    }
                }).finally(() => {
                    this.addLoading = false;
                });
            },
            /**
             * 更具id获取单个套餐的详情
             */
            queryPackageInfoById () {
                ajax.post('queryPackageInfoById',{
                    id : this.packageId
                }).then(res => {
                    if (res.status === 200) {
                        this.formData.packageName = res.data.comboName;
                        this.formData.services = res.data.services ? Array.from(new Set(res.data.services.map(item => item.serviceCode))) : [];
                    } else {
                        this.formData.packageName = '';
                        this.formData.services = [];
                    }
                });
            },
            /**
             *  更改选择的服务
             *  @param {array} data
             */
            serviceChange (data) {
                let set = new Set(data);
                let _arr = Array.from(set);
                this.formData.server = _arr;
            }
        },
        computed : {
            //当前路由名称
            localeRouteName () {
                if (this.type === 'add') {
                    return this.$t('addPackakge');
                } else if (this.type === 'edit') {
                    return this.$t('editPackakge');
                } else if (this.type === 'watch') {
                    return this.$t('packageDetail');
                } else {
                    return '';
                }
            },
            //选择的服务格式化
            servicesChosed () {
                if (this.formData && this.formData.services && this.formData.services) {
                    return this.formData.services.join(',');
                } else {
                    return '';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-package {
        @include block_outline();
        background: $color_f4f6f9;

        .add-package-info {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline(924px, auto);
                margin: 0 auto;
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
