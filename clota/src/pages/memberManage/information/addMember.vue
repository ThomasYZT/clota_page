<template>
    <!--新增/修改员工信息-->
    <div class="add-member">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/memberInfo">会员信息</BreadcrumbItem>
                <BreadcrumbItem>{{ type === 'add' ? '新增会员' : '修改会员信息'}}</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="add-member-content">

            <!--基本信息-->
            <div class="form-container">
                <Form ref="formValidate" :model="member" :rules="ruleValidate" :label-width="115">
                    <div class="ivu-form-item-wrap">
                        <Form-item label="姓名" prop="name">
                            <Input v-model.trim="member.name" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="手机号" prop="mobile">
                            <Input v-model.trim="member.mobile" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="E-mall" prop="emall">
                            <Input v-model.trim="member.emall" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="生日" prop="birthday">
                            <Date-picker
                                type="date"
                                v-model="member.birthday"
                                :options="dateOption"
                                placeholder="请选择"
                                @on-change="customValid($event, 'birthday')">
                            </Date-picker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label=" 性别" prop="sex">
                            <Select v-model="member.sex" placeholder="请选择">
                                <Option value="male">男</Option>
                                <Option value="female">女</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="QQ" prop="qq">
                            <Input v-model.trim="member.qq" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="微信" prop="wechat">
                            <Input v-model.trim="member.wechat" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="支付宝" prop="alipay">
                            <Input v-model.trim="member.alipay" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="会员级别" prop="level">
                            <Select v-model="member.level" placeholder="请选择会员初始级别">
                                <Option v-for="item in enumData.level" :key="item.name" :value="item.name">{{item.desc}}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="会员渠道" prop="channel">
                            <Select v-model="member.channel" placeholder="请选择会员来源渠道">
                                <Option v-for="item in enumData.channel" :key="item.name" :value="item.name">{{item.desc}}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="国家代码" prop="nation">
                            <Input v-model.trim="member.nation" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="城市代码" prop="city">
                            <Input v-model.trim="member.city" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="第三方卡号" prop="card">
                            <Input v-model.trim="member.card" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="第三方卡面号" prop="cardNum">
                            <Input v-model.trim="member.cardNum" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="会员类型" prop="type">
                            <Select v-model="member.type" placeholder="请选择会员类型">
                                <Option v-for="item in enumData.type" :key="item.name" :value="item.name">{{item.desc}}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="身份证号" prop="idNum">
                            <Input v-model.trim="member.idNum" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="个人兴趣" prop="hobby">
                            <Input v-model.trim="member.hobby" placeholder="请输入"></Input>
                        </Form-item>
                    </div>
                    <!--空字段站位用-->
                    <div class="ivu-form-item-wrap"></div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="地址" prop="address">
                            <Input v-model.trim="member.address" placeholder="请输入家庭地址"></Input>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap"></div>

                </Form>
            </div>

            <div class="content-footer">
                <i-button type="primary" :loading="loading" @click="formValidateFunc">确定新增</i-button>
                <router-link :to="{name: 'staffList'}">
                    <i-button type="ghost">取消</i-button>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        components: { },
        data () {
            return {
                loading: false,
            }
        },
        data() {

            var validateMethod = {

                mobile :  (rule, value, callback) => {
                    /*if (!validator.isMobile(value)) {
                     callback(new Error('请输入正确的手机号码'));
                     } else {
                     callback();
                     }*/
                },

                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                // 表单数据
                formData: [{
                    date: '2016-05-03',
                }],
                //新增/修改
                type: 'add',
                loading: false,
                dateOption: {
                    disabledDate: function( value ){
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
                enumData: {
                    level: [
                        {
                            desc: '全部会员等级',
                            name: '全部会员等级',
                        }
                    ],
                    channel: [
                        {
                            desc: '全部会员渠道',
                            name: '全部会员渠道',
                        }
                    ],
                    type: [
                        {
                            desc: '全部会员类型',
                            name: '全部会员类型',
                        }
                    ],
                    status: [
                        {
                            desc: '全部会员状态',
                            name: '全部会员状态',
                        }
                    ],
                },
                member: {
                    name: '',
                    mobile: '',
                    emall: '',
                    birthday: '',
                    sex: '',
                    qq: '',
                    wechat: '',
                    alipay: '',
                    level: '',
                    channel: '',
                    nation: '',
                    city: '',
                    card: '',
                    cardNum: '',
                    type: '',
                    idNum: '',
                    hobby: '',
                    address: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '姓名不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                        { validator: validateMethod.mobile, trigger: 'blur'}
                    ],
                    sex: [
                        { required: true, message: '性别不能为空', trigger: 'change' },
                    ],
                }
            }
        },
        computed: {},
        created() {
            this.init();
        },

        methods: {

            init() {
                if (this.$route.query && this.$route.query.type) {
                    this.type = this.$route.query.type;
                }
            },

            // 手动校验，解决datePicker手动输入触发校验时获取到的值有延时导致校验错误问题
            customValid(data, field){
                this.$nextTick(()=>{
                    this.$refs.formValidate.validateField( field );
                })
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.saveMember( param );
                    }
                })
            },

            //新增会员接口
            saveMember( param ){

            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-member {
        @include block_outline();
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .add-member-content{

            .form-container{
                width: 100%;
                height: 100%;
                background-color: #FFFFFF;
                border-radius: 4px;
                overflow: auto;
                .ivu-input-icon{
                    z-index: 2;
                }

                .ivu-form{
                    padding-top: 5%;
                    padding-bottom: 5%;
                    text-align: center;
                }

                .ivu-form-item-wrap{
                    position: relative;
                    display: inline-block;
                    min-width: 495px;
                    padding-right: 55px;
                    width: 40%;
                    text-align: center;
                    vertical-align: middle;

                    .btn-add-dept,
                    .btn-add-position{
                        position: absolute;
                        left: calc(50% + 185px);
                        top: 5px;
                        font-size: 12px;
                        color: #1875F0;
                        letter-spacing: 0.75px;
                        cursor: pointer;
                    }
                }

                .ivu-form-item{
                    width: 395px;
                    margin: 0 auto 20px;
                    text-align: left;

                    .ivu-date-picker {
                        display: block;
                    }

                    .ivu-select-selected-value,
                    .ivu-input{
                        font-size: 14px;
                    }

                    .ivu-select-item{
                        font-size: 14px !important;
                    }
                }

                .register-info-footer{
                    padding: 30px 20px;
                    text-align: center;

                    .ivu-btn{
                        width: 90px;
                        height: 30px;
                        padding: 4px 12px 3px;
                        font-size: 12px;
                        letter-spacing: 1.33px;
                    }

                    &.edit-footer .ivu-btn{
                        width: 90px;
                    }

                    .ivu-btn-ghost{
                        margin-left: 20px;
                        color: #666666;
                    }
                }
            }

            .content-footer{
                text-align: center;
            }

        }

    }
</style>


