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
                <Row>
                    <Col span="22">
                        <FormItem :label="$t('packageName')"
                                  prop="package"
                                  v-if="type === 'add' || type === 'edit'">
                            <Input v-model="formData.packageName" />
                        </FormItem>
                        <FormItem :label="$t('packageName')"
                                  prop="package"
                                  v-else>
                            {{formData.packageName}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                        <FormItem :label="$t('choseService')"
                                  prop="services"
                                  v-if="type === 'add' || type === 'edit'">
                            <CheckboxGroup v-model="formData.services" >
                                <Checkbox :label="item.label"
                                          v-for="(item,i) in serviceList"
                                          :key="i">
                                </Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem :label="$t('servicesChosed')"
                                  prop="services"
                                  v-else>
                            {{servicesChosed}}
                        </FormItem>
                    </Col>
                </Row>
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
            <div class="footer" v-else="type === 'watch'">
                <Button type="primary"
                        @click="cancel"
                        class="ivu-btn-min">
                    {{$t('close')}}
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import {validator} from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';

    export default {
        components: {
            breadCrumbHead,
            cityPlugin
        },
        data() {
            //校验选择的服务
            const validateServices = (rule,value,callback) => {
              if(value && value.length > 0){
                  callback();
              }else{
                  callback(this.$t('validateError.pleaseSelect',{msg : this.$t('serve')}));
              }
            };
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('serverPackage'),
                        router: {
                            name: 'packageList'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //套餐名称
                    packageName: '套餐名称',
                    //服务列表
                    services: ['服务1'],
                },
                //表单校验规则
                ruleValidate: {
                    package : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('packageName')}), trigger: 'blur'},
                    ],
                    services : [
                        {required: true, validator :validateServices, trigger: 'blur'}
                    ]
                },
                //是否正在添加中
                addLoading: false,
                //服务操作类型
                type : '',
                //服务列表
                serviceList : [
                    {
                        label : '服务1',
                        value : '服务1'
                    },
                    {
                        label : '服务2',
                        value : '服务2'
                    },
                ]
            }
        },
        methods: {
            /**
             * 保存新增数据
             */
            save() {
                this.addLoading = true;
                this.$refs.formValidate.validate(valid => {
                    this.addLoading = false;
                });
            },
            /**
             * 取消新增
             */
            cancel() {
                this.$router.push({
                    name: 'packageList'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.type) {
                    this.type = params.type;
                }else{
                    this.$router.push({
                        name : 'package'
                    });
                }
            }
        },
        beforeRouteEnter(to,fromm,next){
            next(vm => {
                vm.getParams(to.params);
            });
        },
        computed : {
            //当前路由名称
            localeRouteName () {
                if(this.type === 'add') {
                    return this.$t('addPackakge');
                }else if(this.type === 'edit'){
                    return this.$t('editPackakge');
                }else if(this.type === 'watch'){
                    return this.$t('packageDetail');
                }else{
                    return '';
                }
            },
            //选择的服务格式化
            servicesChosed () {
                if(this.formData && this.formData.services && this.formData.services){
                    return this.formData.services.join(',');
                }else{
                    return '';
                }
            }
        }
    }
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
