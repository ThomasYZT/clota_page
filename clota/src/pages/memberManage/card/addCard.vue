<template>
    <!--新增/修改会员信息-->
    <div class="add-card">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/card">会员卡券</BreadcrumbItem>
                <BreadcrumbItem>{{ type === 'add' ? '新增卡券' : '修改卡券信息'}}</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="form-container">

            <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="115">
                <div class="ivu-form-item-wrap">
                    <Form-item label="卡券名称" prop="name">
                        <Input v-model.trim="data.name" placeholder="请输入"/>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="卡券类别" prop="type">
                        <Select v-model="data.type" placeholder="请选择">
                            <Option v-for="(item,index) in enumData.typeEnum" :key="index" :value="item.value">{{item.name}}</Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="data.type === '代金券' || data.type === '折扣券'">
                    <Form-item label="卡券面值" prop="num">
                        <Input v-model.trim="data.num" placeholder="请输入"></Input>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="data.type === '代金券'">
                    <Form-item label="消费满" prop="enough">
                        <Input v-model.trim="data.enough" placeholder="请输入" style="width: 240px;"></Input><span style="padding-left: 10px;">可用</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="data.type === '折扣券'">
                    <Form-item label="最低消费金额" prop="low">
                        <Input v-model.trim="data.low" placeholder="请输入" style="width: 240px;"></Input><span style="padding-left: 10px;">可用</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="data.type === '折扣券'">
                    <Form-item label="最高消费金额" prop="high">
                        <Input v-model.trim="data.high" placeholder="请输入" style="width: 240px;"></Input><span style="padding-left: 10px;">可用</span>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="有效开始日期" prop="beginTime">
                        <Date-picker
                            type="datetime"
                            v-model="data.beginTime"
                            placeholder="请选择">
                        </Date-picker>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="有效结束日期" prop="endTime">
                        <Date-picker
                            type="datetime"
                            v-model="data.endTime"
                            placeholder="请选择">
                        </Date-picker>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="data.type === '兑换券'">
                    <Form-item label="选择店铺" prop="store">
                        <Select v-model="data.store" placeholder="请选择">

                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="可兑换积分为" prop="integ">
                        <Input v-model.trim="data.integ" placeholder="请输入"></Input>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap">
                    <Form-item label="可用渠道" prop="channel">
                        <Select v-model="data.channel" placeholder="请选择">

                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="data.type === '代金券' || data.type === '折扣券'">
                    <Form-item label="可用店铺" prop="useStore">
                        <Select v-model="data.useStore" placeholder="请选择">

                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="data.type === '兑换券'">
                    <Form-item label="选择商品" prop="commodity">
                        <Select v-model="data.commodity" placeholder="请选择">

                        </Select>
                    </Form-item>
                </div>
                <div class="ivu-form-item-wrap" v-if="data.type === '代金券'"></div>

            </Form>

            <div class="content-footer">
                <i-button type="primary" :loading="loading" @click="formValidateFunc">确定</i-button>
                <router-link :to="{name: 'card'}">
                    <i-button type="ghost">取消</i-button>
                </router-link>
            </div>
        </div>



    </div>
</template>

<script>

    export default {
        components: { },
        data() {

            var validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                },
            };

            return {
                //新增/修改
                type: 'add',
                loading: false,
                enumData: {
                    typeEnum: [
                        { name: '代金券', value: '代金券' },
                        { name: '兑换券', value: '兑换券' },
                        { name: '折扣券', value: '折扣券' },
                    ],
                },
                // 表单数据
                data: {
                    name: '',
                    type: '代金券',
                    num: '',
                    low: '',
                    high: '',
                    enough: '',
                    beginTime: '',
                    endTime: '',
                    store: '',
                    integ: '',
                    channel: '',
                    chooseStore: '',
                    commodity: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '卡券名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '卡券名称不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '卡券类别不能为空', trigger: 'change' },
                    ],
                    num: [
                        { required: true, message: '卡券面值不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    low: [
                        { required: true, message: '最低消费金额不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    high: [
                        { required: true, message: '最高消费金额不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    enough: [
                        { required: true, message: '消费值不能为空', trigger: 'blur' },
                        { validator: validateMethod.mobile, trigger: 'blur'}
                    ],
                    beginTime: [
                        { required: true, message: '有效开始日期不能为空', trigger: 'change' },
                    ],
                    endTime: [
                        { required: true, message: '有效结束日期不能为空', trigger: 'change' },
                    ],
                    store: [
                        { required: true, message: '店铺不能为空', trigger: 'change' },
                    ],
                    integ: [
                        { required: true, message: '可兑换积分为不能为空', trigger: 'blur' },
                        { validator: validateMethod.mobile, trigger: 'blur'}
                    ],
                    channel: [
                        { required: true, message: '可用渠道不能为空', trigger: 'change' },
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
                       console.log(true)
                    }
                })
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-card {
        @include block_outline();
        min-width: $content_min_width;
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
        .form-container{
            width: 100%;
            height: calc(100% - 90px);
            background-color: #FFFFFF;
            border-radius: 4px;
            overflow: hidden;
            .ivu-input-icon{
                z-index: 2;
            }

            .ivu-form{
                padding: 40px 0;
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
</style>


