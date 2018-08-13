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
                <Row>
                    <Col span="11">
                        <FormItem :label="$t('packageName')" prop="packageName">
                            <Input v-model="formData.packageName" style="width: 280px"/>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem :label="$t('smsProvider')" prop="smsProvider">
                            <Select v-model="formData.smsProvider" style="width:280px">
                                <Option v-for="item in smsProviderList"
                                        :value="item.value"
                                        :key="item.value">
                                    {{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <FormItem :label="$t('price')" prop="price">
                            <Input v-model="formData.price" style="width: 280px"/>
                            <span class="unit">{{$t('yuan')}}</span>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem :label="$t('number')" prop="number">
                            <Input v-model="formData.number" style="width: 280px"/>
                            <span class="unit">{{$t('strip')}}</span>
                        </FormItem>
                    </Col>
                </Row>
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

    export default {
        components: {
            breadCrumbHead,
            cityPlugin
        },
        data() {
            //校验数量
            const validateNumber = (rule, value, callback) => {
                if (value) {
                    if (validator.isNumber(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.formatError',{field : this.$t('number')}));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', {'msg': this.$t('number')}))
                }
            };
            //校验价格
            const validatePrice = (rule, value, callback) => {
                if (value) {
                    if (validator.isNumber(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.formatError',{field : this.$t('price')}));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', {'msg': this.$t('price')}))
                }
            };
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('notePackage'),
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
                    number : 0
                },
                //表单校验规则
                ruleValidate: {
                    packageName : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('packageName')}), trigger: 'blur'},
                    ],
                    smsProvider : [
                        {required: true, message : this.$t('validateError.pleaseSelect', {'msg': this.$t('smsProvider')}), trigger: 'blur'},
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
                type : ''
            }
        },
        methods: {
            /**
             * 保存新增套餐数据
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
                }else{
                    this.$router.push({
                        name : 'notePackageInfo'
                    });
                }
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
