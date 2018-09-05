<!--新增租户-->

<template>
    <div class="add-less">
        <bread-crumb-head
            :locale-router="$t('addLess')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-less-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('lesseeName')" prop="companyName">
                        <Input v-model="formData.companyName" style="width: 280px"/>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('person')" prop="person">
                        <Input v-model="formData.person" style="width: 280px"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('phone')" prop="phone">
                        <Input v-model="formData.phone" style="width: 280px"/>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('group')">
                        <Select v-model="formData.group" style="width:280px">
                            <Option v-for="item in groupList"
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
                    <FormItem :label="$t('superior')">
                        <Select v-model="formData.superior" style="width:280px">
                            <Option v-for="item in superiorList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('fianceSuperior')">
                        <Select v-model="formData.fianceSuperior" style="width:280px">
                            <Option v-for="item in superiorList"
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
                    <FormItem :label="$t('controlAccount')" prop="controlAccount">
                        <Input v-model="formData.controlAccount" style="width: 280px"/>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('email')" prop="mail">
                        <Input v-model="formData.mail" style="width: 280px"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
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
                    <Col span="11">
                    <FormItem :label="$t('place')">
                        <city-plugin @select="formData.place = $event" style="width: 280px;">
                        </city-plugin>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('address')">
                        <Input v-model="formData.address" style="width: 280px"/>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('service')">
                        <Select v-model="formData.service" style="width:280px" placement="top">
                            <Option v-for="item in serviceList"
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
                <Button type="primary" @click="save" class="ivu-btn-min" :loading="addLoading">{{$t('addNew')}}</Button>
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

    export default {
        components: {
            breadCrumbHead,
            cityPlugin
        },
        data() {
            //校验联系电话
            const validatePhone = (rule, value, callback) => {
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
            //校验管理账号
            const validateControlAccount = (rule, value, callback) => {
                if (value === '' || value === null || value === undefined) {
                    callback(this.$t('validateError.pleaseInput', {'msg': this.$t('controlAccount')}));
                } else {
                    callback();
                }
            };
            //校验电子邮箱
            const validateMail = (rule, value, callback) => {
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
                        name: this.$t('less'),
                        router: {
                            name: 'ISPinternet'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //*租户公司名称
                    companyName: '',
                    //联系人
                    person: '',
                    //联系电话
                    phone: '',
                    //所属集团
                    group: '',
                    //管理上级
                    superior: '',
                    //财务上级
                    fianceSuperior: '',
                    //管理账号
                    controlAccount: '',
                    //电子邮箱
                    mail: '',
                    //短信供应商
                    smsProvider: '',
                    //详细地址
                    address: '',
                    //客服专员
                    service: '',
                    //地点
                    place: '',
                },
                //表单校验规则
                ruleValidate: {
                    companyName: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseInput', {'msg': this.$t('lesseeName')}),
                            trigger: 'blur'
                        },
                    ],
                    person: [
                        {
                            required: true,
                            message: this.$t('validateError.pleaseInput', {'msg': this.$t('person')}),
                            trigger: 'blur'
                        },
                    ],
                    phone: [
                        {required: true, validator: validatePhone, trigger: 'blur'},
                    ],
                    controlAccount: [
                        {required: true, validator: validateControlAccount, trigger: 'blur'},
                    ],
                    mail: [
                        {required: true, validator: validateMail, trigger: 'blur'},
                    ]
                },
                //集团列表
                groupList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                ],
                //管理人员列表
                superiorList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                ],
                //短信供应商列表
                smsProviderList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                ],
                //受理客服
                serviceList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                ],
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
                    console.log(valid)
                    this.addLoading = false;
                });
            },
            /**
             * 取消新增
             */
            cancel() {
                this.$router.push({
                    name: 'ISPinternet'
                });
            },
            /**
             * 查询所有的受理客服信息
             */
            querySysAccoutList () {
                ajax.post('querySysAccoutList').then(res => {

                    console.log(res)
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-less {
        @include block_outline();

        .add-less-info {
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
