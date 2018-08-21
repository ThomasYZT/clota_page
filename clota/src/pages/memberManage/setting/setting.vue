<template>
    <!--会员管理--基础设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">会员积分生效设置</div>
                <div class="main">
                    <RadioGroup v-model="scoreEffectiveMode.isIntegralType" vertical>
                        <Radio label="immediately">
                            <span>付款成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout">
                            <span>消费、核销成功后立即生效</span>
                        </Radio>
                        <Radio label="checkout_after">
                            <span>消费、核销成功后
                                <Input v-model="scoreEffectiveMode.isNoIntegralTime"
                                       type="text"
                                       placeholder="请输入"
                                       class="single-input"/>
                                时后生效</span>
                        </Radio>
                    </RadioGroup>
                 </div>
            </div>

            <div class="content-item">
                <div class="title">会员生日积分多倍积分</div>
                <div class="main">
                    <i-switch v-model="scoreMultipleOnBirthday.hasMultiple"></i-switch>
                    <span class="text">会员生日当天消费可获得
                        <Input v-model="scoreMultipleOnBirthday.isTime"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/>
                        倍积分</span>
                </div>
            </div>

            <div class="content-item">
                <div class="title">会员积分有效期设置</div>
                <div class="main">
                    <RadioGroup v-model="scoreValidityPeriod.validityType" vertical>
                        <Radio label="perpetual ">
                            <span>永久有效</span>
                        </Radio>
                        <Radio label="months_effective ">
                            <span>获得积分
                                <Input v-model="scoreValidityPeriod.validityTime"
                                       type="text"
                                       class="single-input"
                                       placeholder="请输入"/>
                                个月后失效，清除</span>
                        </Radio>
                    </RadioGroup>
                    <div class="check-group-wrap">
                        <Checkbox v-model="scoreValidityPeriod.checked"></Checkbox>清除积分前
                        <Input v-model="scoreValidityPeriod.remind"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/>
                        天短信提醒，
                        <span class="blue-color">短信设置</span>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">会员卡有效期设置</div>
                <div class="main margin-radio-group">
                    <RadioGroup v-model="memberValidPeriod.Type" vertical>
                        <Radio label="perpetual">
                            <span>永久有效</span>
                        </Radio>
                        <Radio label="vipValidityTime">
                            <span>最后一次消费
                             <Input v-model="memberValidPeriod.vipValidityTime"
                                    type="text"
                                    class="single-input"
                                    placeholder="请输入"/>
                                天后如未使用，冻结该会员卡</span>
                        </Radio>
                        <Radio label="vipValidity">
                            <span>开卡
                             <Input v-model="memberValidPeriod.vipValidityType"
                                    type="text"
                                    class="single-input"
                                    placeholder="请输入"/>
                                天后冻结该会员卡</span>
                        </Radio>
                        <Radio label="vipNumber">
                            <span>会员卡使用
                             <Input v-model="memberValidPeriod.vipNumber"
                                    type="text"
                                    class="single-input"
                                    placeholder="请输入"/>
                                天后冻结该会员卡</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">卡券过期提醒设置</div>
                <div class="main">
                    <i-switch v-model="notificationBeforeCouponExpire.isSwitch"></i-switch>
                    <span class="text">卡券过期前
                        <Input v-model="notificationBeforeCouponExpire.expireTime"
                               type="text"
                               class="single-input"
                               placeholder="请输入"/> 天短信提醒，
                        <span class="blue-color">短信设置</span>
                    </span>
                </div>
            </div>

            <div class="content-item">
                <div class="title">用户退款时积分是否退还用户</div>
                <div class="main">
                    <RadioGroup v-model="handingWithScoreGrowthWhileRefund.score" vertical>
                        <Radio label="true">
                            <span>用户退款时积分不退</span>
                        </Radio>
                        <Radio label="false">
                            <span>用户退款时积分退回用户积分账户中</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">用户退款时卡券是否退还用户</div>
                <div class="main">
                    <RadioGroup v-model="handingWithScoreGrowthWhileRefund.coupon" vertical>
                        <Radio label="true">
                            <span>用户退款时卡券不退</span>
                        </Radio>
                        <Radio label="false">
                            <span>用户退款时卡券退回用户会员卡中</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <Form ref="formDynamic" :model="formDynamic" :label-width="50" style="width: 600px">

                <div class="content-item">
                    <div class="title">修改会员储值、积分、虚拟账户余额设置</div>
                    <div class="main">
                        <RadioGroup v-model="effect" vertical>
                            <Radio label="one">
                                <span>不允许修改会员的储值、积分、虚拟账户</span>
                            </Radio>
                            <Radio label="two">
                                <span>允许修改会员的储值、积分、虚拟账户,如允许修改，请设置修改原因  <span class="add-span blue-color" @click="handleAdd">+ 新增修改原因</span></span>
                            </Radio>
                        </RadioGroup>

                        <div class="ivu-form-item-wrap">
                            <FormItem
                                v-for="(item, index) in formDynamic.items"
                                v-if="item.status"
                                :key="index"
                                label=""
                                :prop="'items.' + index + '.value'"
                                :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                                <Input type="text" :disabled="item.disabled" v-model="item.value" placeholder="请输入"/>
                                <span class="span-bottom red-color" v-if="item.disabled && index > 0" @click="handleRemove(index)">删除</span>
                                <span class="span-bottom blue-color" v-if="!item.disabled" @click="handleSubmit('formDynamic')">保存</span>
                                <span class="span-bottom grey-color" v-if="!item.disabled" @click="handleReset('formDynamic',index)">取消</span>
                            </FormItem>
                        </div>

                    </div>
                </div>

                <div class="content-item">
                    <div class="title">证件类型设置   <span class="blue-color add-span" @click="handleAddIdType">+ 新增证件类型</span></div>
                    <div class="main">

                        <div class="ivu-form-item-wrap short-wrap">
                            <FormItem
                                v-for="(item, index) in formDynamic.idType"
                                v-if="item.status"
                                :key="index"
                                label=""
                                :prop="'items.' + index + '.value'"
                                :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                                <Input type="text" :disabled="item.disabled" v-model="item.value" placeholder="请输入"/>
                                <span class="span-bottom red-color" v-if="item.disabled && index > 0" @click="handleRemove(index)">删除</span>
                                <span class="span-bottom blue-color" v-if="!item.disabled" @click="handleSubmit('formDynamic')">保存</span>
                                <span class="span-bottom grey-color" v-if="!item.disabled" @click="handleReset('formDynamic',index)">取消</span>
                            </FormItem>
                        </div>

                    </div>
                </div>

            </Form>

        </div>

        <div class="btn-wrap">
            <Button type="primary">保存</Button>
            <Button type="ghost">取消</Button>
        </div>

    </div>
</template>

<script>

    import ajax from '@/api/index'
    import headerTabs from './components/headerTabs.vue'

    export default {
        components: {
            headerTabs,
        },
        data () {
            return {
                //当前页面路由名称
                routerName: 'memberSetting',
                //积分生效设置
                scoreEffectiveMode: {
                    isIntegralType: 'checkout',
                    isNoIntegralTime: '24'
                },
                //会员生日积分多倍积分 --
                scoreMultipleOnBirthday: {
                    hasMultiple: true,
                    isTime: '2',
                },
                //会员积分有效期设置 --
                scoreValidityPeriod: {
                    validityType: 'months_effective',
                    validityTime: '24',
                    checked: true,
                    remind: '60',
                },
                //会员卡有效期设置
                memberValidPeriod: {
                    Type: 'vipValidityTime',//类型
                    perpetual: '',//是否永久
                    vipValidityType: '365',
                    vipValidityTime: '365',
                    vipNumber: '365',
                },
                //卡券过期提醒设置 --
                notificationBeforeCouponExpire: {
                    isSwitch: true,
                    expireTime: '60',
                },
                //用户退款时积分是否退还用户
                handingWithScoreGrowthWhileRefund: {
                    score: 'false',
                    coupon: 'false',
                },

                openInteg: true,
                openFunds: true,
                effect: 'one',
                check: true,
                index: 1,
                idTypeIndex: 1,
                formDynamic: {
                    items: [
                        {
                            value: '系统更新时，用户进行消费，消费信息未同步',
                            index: 1,
                            status: 1,
                            disabled: true,
                        },
                    ],
                    idType: [
                        {
                            value: '身份证',
                            index: 1,
                            status: 1,
                            disabled: true,
                        },
                    ],
                }
            }
        },
        created() {
            //查询会员基础设置
            this.findBasicSet();
        },
        methods: {

            /**
             * 查询会员基础设置
             */
            findBasicSet () {
                ajax.post('findBasicSet',{}).then(res => {

                }).catch(err => {

                }).finally(() =>{

                });
            },

            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name,index) {
                this.$refs[name].resetFields();
                this.formDynamic.items[index].status = 0;
            },
            handleAddIdType() {
                this.idTypeIndex++;
                this.formDynamic.idType.push({
                    value: '',
                    index: this.idTypeIndex,
                    status: 1,
                    disabled: false,
                });
            },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1,
                    disabled: false,
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .setting{
        @include block_outline();
        min-width: $content_min_width;
        overflow: hidden;
        background: $color-fff;
        border-radius: 4px;

        .content{
            padding: 30px 60px;
            height: calc(100% - 124px);
            overflow: auto;

            .content-item{
                margin-bottom: 30px;

                /deep/ .ivu-form-item-wrap{
                    position: relative;
                    display: inline-block;
                    min-width: 495px;
                    padding-right: 55px;
                    width: 40%;
                    text-align: center;
                    vertical-align: middle;

                    .ivu-form-item{
                        width: 520px;
                        text-align: left;
                    }

                    &.short-wrap{
                        min-width: 360px;
                        .ivu-form-item{
                            width: 360px;
                        }
                    }
                }

                /deep/ .ivu-form-item-content{
                    width: 100%;
                }

                /deep/ .ivu-input-wrapper{
                    margin-bottom: 0px !important;
                    margin-right: 5px;
                    width: 80%;
                }

                .title{
                    font-size: $font_size_16px;
                    color: $color_333;
                    line-height: 24px;
                    margin-bottom: 15px;
                }
                .main{
                    div{
                        margin-bottom: 10px;
                    }
                    &.margin-radio-group{
                        /deep/ .ivu-radio-wrapper{
                           margin-bottom: 10px;
                        }
                    }
                }
            }

            .add-span{
                font-size: $font_size_14px;
                margin-left: 20px;
            }

            .blue-color{
                font-size: $font_size_14px;
                color: $color_blue;
                cursor: pointer;
            }
            .red-color{
                font-size: $font_size_14px;
                color: $color_red;
                cursor: pointer;
            }
            .grey-color{
                font-size: $font_size_14px;
                color: $color-3F3F3F;
                cursor: pointer;
            }
            .span-bottom{
                vertical-align: bottom;
            }

        }

        /deep/ .ivu-input-wrapper{
            vertical-align: sub;

            &.single-input{
                margin: 0 10px;
                width: 100px !important;
            }
        }

        .check-group-wrap{
            padding-left: 50px;
        }

        .btn-wrap{
            height: 56px;
            width: 100%;
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;
            box-shadow: 0 -5px 3px 0 rgba(0,0,0,0.03);

            /deep/ .ivu-btn{
                width: 108px;
                padding: 5px 30px;
            }
            .ivu-btn + .ivu-btn{
                margin-left: 20px;
            }
        }

    }
</style>
