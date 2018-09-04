<!--新建短信套餐-->

<template>
    <div class="add-note-package">
        <bread-crumb-head
            :locale-router="$t(type === 'add' ? 'addNotePackage' : 'editNotePackage')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-note-package-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <i-row>
                    <i-col span="11">
                        <!--套餐名称-->
                        <FormItem :label="$t('packageName')" prop="packageName">
                            <Input v-model="formData.packageName" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--短信服务商-->
                        <FormItem :label="$t('smsProvider')" prop="smsProvider">
                            <Select v-model="formData.smsProvider" style="width:280px">
                                <Option v-for="item in smsProviderList"
                                        :value="item.value"
                                        :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--价格-->
                        <FormItem :label="$t('price')" prop="price">
                            <Input v-model="formData.price" style="width: 280px"/>
                            <span class="unit">{{$t('yuan')}}</span>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--数量-->
                        <FormItem :label="$t('number')" prop="number">
                            <Input v-model="formData.number" style="width: 280px"/>
                            <span class="unit">{{$t('strip')}}</span>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
            <div class="footer">
                <Button type="primary"
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t(type === 'add' ? 'addNew' : 'confirmEdit')}}
                </Button>
                <Button @click="cancel" class="ivu-btn-min">{{$t('cancel')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import {validator} from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import ajax from '@/api/index.js';
    import common from '@/assets/js/common.js';

    export default {
        components: {
            breadCrumbHead,
            cityPlugin
        },
        data() {
            //校验数量
            const validateNumber = (rule, value, callback) => {
                if (value) {
                    common.validateInteger(value).then(() => {
                        callback();
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            callback(this.$t(err,{field : this.$t('number'),length : 10}));
                        }else{
                            callback(this.$t(err,{field : this.$t('number')}));
                        }
                    });
                } else {
                    callback(this.$t('validateError.pleaseInput', {'msg': this.$t('number')}))
                }
            };
            //校验价格
            const validatePrice = (rule, value, callback) => {
                if (value) {
                    common.validateMoney(value,0,4).then(() => {
                        callback();
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            callback(this.$t('errorMaxLength',{field : this.$t('price'),length : 10}));
                        }else{
                            callback(this.$t(err,{field : this.$t('price')}));
                        }
                    });
                } else {
                    callback(this.$t('validateError.pleaseInput', {'msg': this.$t('price')}))
                }
            };
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: 'notePackage',
                        router: {
                            name: 'notePackageInfo'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //套餐名称
                    packageName: '',
                    //短信服务商
                    smsProvider: '',
                    //价格
                    price: '',
                    //数量
                    number : ''
                },
                //表单校验规则
                ruleValidate: {
                    packageName : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('packageName')}), trigger: 'blur'},
                        {max : 20, message : this.$t('errorMaxLength', {field : this.$t('packageName'),length : 20}), trigger: 'blur'},
                    ],
                    smsProvider : [
                        {required: true, message : this.$t('validateError.pleaseSelect', {'msg': this.$t('smsProvider')}), trigger: 'change'},
                    ],
                    price: [
                        {required: true, validator: validatePrice, trigger: 'blur'},
                    ],
                    number : [
                        {required: true, validator: validateNumber, trigger: 'blur'},
                    ]
                },
                //短信供应商列表
                smsProviderList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                ],
                //是否正在添加中
                addLoading: false,
                //账号操作类型
                type : '',
                //短信套餐id
                smsPackageId : ''
            }
        },
        methods: {
            /**
             * 保存新增套餐数据
             */
            save() {
                this.addLoading = true;
                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        this.addSmsPackage();
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
                    name: 'notePackageInfo'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.type) {
                    this.type = params.type;
                    this.smsPackageId = params.id;
                    if(this.type === 'edit'){
                        this.getSmsPackage();
                    }
                }else{
                    this.$router.push({
                        name : 'notePackageInfo'
                    });
                }
            },
            /**
             * 新增短信套餐
             */
            addSmsPackage () {
                ajax.post('addSmsPackage',{
                    id : this.type === 'edit' ? this.smsPackageId : '',
                    packageName : this.formData.packageName,
                    provider : this.formData.smsProvider,
                    price : this.formData.price,
                    smsCount : this.formData.number,
                }).then(res => {
                    if(res.status === 200){
                        if(this.type === 'add'){
                            this.$Message.success('新增成功');
                        }else{
                            this.$Message.success('编辑成功');
                        }
                        this.$router.push({
                            name : 'notePackageInfo'
                        });
                    }else{
                        if(this.type === 'add'){
                            this.$Message.error('新增失败');
                        }else{
                            this.$Message.error('编辑失败');
                        }
                    }
                }).finally(() => {
                    this.addLoading = false;
                });
            },
            /**
             * 根据id获取短信套餐详情
             */
            getSmsPackage () {
                ajax.post('getSmsPackage',{
                    id : this.smsPackageId
                }).then(res => {
                    if(res.status === 200){
                        this.formData.packageName = res.data.packageName;
                        this.formData.smsProvider = res.data.provider;
                        this.formData.price = res.data.price;
                        this.formData.number = res.data.smsCount;
                    }else{
                        this.formData.packageName = '';
                        this.formData.smsProvider = '';
                        this.formData.price = '';
                        this.formData.number = '';
                    }
                })
            }
        },
        beforeRouteEnter(to,fromm,next){
            next(vm => {
                vm.getParams(to.params);
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-note-package {
        @include block_outline();
        background: $color_f4f6f9;

        .add-note-package-info {
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

            .unit{
                vertical-align: middle;
                display: inline-block;
                margin-left: 5px;
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
