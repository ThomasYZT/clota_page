<!--新增账号-->

<template>
    <div class="add-account">
        <bread-crumb-head
            :locale-router="$t(type === 'add' ? 'addAccount' : 'editAccount')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-account-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('account')" prop="account">
                        <Input v-model="formData.account" style="width: 280px"/>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('name')" prop="name">
                        <Input v-model="formData.name" style="width: 280px"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('mobile')" prop="mobile">
                        <Input v-model="formData.mobile" style="width: 280px"/>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('mail')" prop="mail">
                        <Input v-model="formData.mail" style="width: 280px"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('role')">
                        <Select v-model="formData.role" style="width:280px">
                            <Option v-for="item in roleList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
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
            //校验联系电话
            const validateMobile = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value) || validator.isTelephone(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.phoneError2'));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', {'msg': this.$t('phone')}));
                }
            };
            //校验电子邮箱
            const validatmail = (rule, value, callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.emailError2'));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', {'msg': this.$t('email')}))
                }
            };
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('accountName'),
                        router: {
                            name: 'account'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //账号
                    account: '',
                    //名字
                    name: '',
                    //联系电话
                    mobile: '',
                    //邮箱
                    mail: '',
                    //角色
                    role: '',
                },
                //表单校验规则
                ruleValidate: {
                    account : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('account')}), trigger: 'blur'},
                    ],
                    name : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('name')}), trigger: 'blur'},
                    ],
                    mail: [
                        {required: false, validator: validatmail, trigger: 'blur'},
                    ],
                    mobile : [
                        {required: true, validator: validateMobile, trigger: 'blur'},
                    ]
                },
                //角色列表
                roleList: [
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
             * 保存新增账户数据
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
                    name: 'account'
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
                        name : 'account'
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

    .add-account {
        @include block_outline();
        background: $color_f4f6f9;

        .add-account-info {
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
