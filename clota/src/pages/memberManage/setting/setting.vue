<template>
    <!--会员管理--基础设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">会员卡是否开启积分、储值功能</div>
                <div class="main">
                    <div><i-switch v-model="openInteg"></i-switch><span class="text">开启积分功能</span></div>
                    <div><i-switch v-model="openFunds"></i-switch><span class="text">开启储值功能</span></div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">会员积分生效设置</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>付款成功后立即生效</span>
                        </Radio>
                        <Radio label="two">
                            <span>消费、核销成功后立即生效</span>
                        </Radio>
                        <Radio label="three">
                            <span>消费、核销成功后 <Input value="100" type="text" placeholder="请输入" style="width: 100px;" /> 时后生效</span>
                        </Radio>
                    </RadioGroup>
                 </div>
            </div>

            <div class="content-item">
                <div class="title">会员生日积分多倍积分</div>
                <div class="main">
                    <i-switch v-model="openInteg"></i-switch>
                    <span class="text">会员生日当天消费可获得 <Input value="2" type="text" placeholder="请输入" style="width: 100px;" /> 倍积分</span>
                </div>
            </div>

            <div class="content-item">
                <div class="title">会员积分有效期设置</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>永久有效</span>
                        </Radio>
                        <Radio label="three">
                            <span>获得积分 <Input value="100" type="text" placeholder="请输入" style="width: 100px;" /> 个月后失效，清除</span>
                        </Radio>
                    </RadioGroup>
                    <div>
                        <Checkbox v-model="check"></Checkbox>清除积分前
                                <Input value="60" type="text" placeholder="请输入" style="width: 100px;" />天短信提醒，<span class="blue-color">短信设置</span>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">会员卡有效期设置</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>永久有效</span>
                        </Radio>
                        <Radio label="two">
                            <span>最后一次消费 <Input value="365" type="text" placeholder="请输入" style="width: 100px;" /> 天后如未使用，冻结该会员卡</span>
                        </Radio>
                        <Radio label="three">
                            <span>开卡 <Input value="365" type="text" placeholder="请输入" style="width: 100px;" /> 天后冻结该会员卡</span>
                        </Radio>
                        <Radio label="four">
                            <span>会员卡使用 <Input value="10" type="text" placeholder="请输入" style="width: 100px;" /> 天后冻结该会员卡</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">卡券过期提醒设置</div>
                <div class="main">
                    <i-switch v-model="openInteg"></i-switch>
                    <span class="text">卡券过期前
                        <Input value="2" type="text" placeholder="请输入" style="width: 100px;" /> 天短信提醒，
                        <span class="blue-color">短信设置</span>
                    </span>
                </div>
            </div>

            <div class="content-item">
                <div class="title">用户退款时积分是否退还用户</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>用户退款时积分不退</span>
                        </Radio>
                        <Radio label="two">
                            <span>用户退款时积分退回用户积分账户中</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">用户退款时卡券是否退还用户</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>用户退款时卡券不退</span>
                        </Radio>
                        <Radio label="two">
                            <span>用户退款时卡券退回用户会员卡中</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="content-item">
                <div class="title">是否允许下级单位设置积分率</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>允许</span>
                        </Radio>
                        <Radio label="two">
                            <span>禁止下级设置积分率</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <Form ref="formDynamic" :model="formDynamic" :label-width="20" style="width: 600px">

                <div class="content-item">
                    <div class="title">修改会员储值、积分、虚拟账户余额设置</div>
                    <div class="main">
                        <RadioGroup v-model="effect" vertical>
                            <Radio label="one">
                                <span>不允许修改会员的储值、积分、虚拟账户</span>
                            </Radio>
                            <Radio label="two">
                                <span>允许修改会员的储值、积分、虚拟账户,如允许修改，请设置修改原因  <span class="blue-color" @click="handleAdd">+ 新增修改原因</span></span>
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
                                <span class="red-color" v-if="item.disabled && index > 0" @click="handleRemove(index)">删除</span>
                                <span class="blue-color" v-if="!item.disabled" @click="handleSubmit('formDynamic')">保存</span>
                                <span class="grey-color" v-if="!item.disabled" @click="handleReset('formDynamic',index)">取消</span>
                            </FormItem>
                        </div>

                    </div>
                </div>

                <div class="content-item">
                    <div class="title">证件类型设置   <span class="blue-color" @click="handleAdd">+ 新增证件类型</span></div>
                    <div class="main">

                        <div class="ivu-form-item-wrap">
                            <FormItem
                                v-for="(item, index) in formDynamic.items"
                                v-if="item.status"
                                :key="index"
                                label=""
                                :prop="'items.' + index + '.value'"
                                :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                                <Input type="text" :disabled="item.disabled" v-model="item.value" placeholder="请输入"/>
                                <span class="red-color" v-if="item.disabled && index > 0" @click="handleRemove(index)">删除</span>
                                <span class="blue-color" v-if="!item.disabled" @click="handleSubmit('formDynamic')">保存</span>
                                <span class="grey-color" v-if="!item.disabled" @click="handleReset('formDynamic',index)">取消</span>
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
                //会员卡是否开启积分、储值功能
                IsScoreValidRule: {
                    isIntegral: true,//是否积分
                    isStore: true,//是否积分

                },
                routerName: 'memberSetting',
                openInteg: true,
                openFunds: true,
                effect: 'one',
                check: true,
                index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '新建的修改原因',
                            index: 1,
                            status: 1,
                            disabled: true,
                        }
                    ]
                }
            }
        },
        created() {
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
                }

                /deep/ .ivu-form-item-content{
                    width: 100%;
                }

                /deep/ .ivu-input-wrapper{
                    width: 80%;
                }

                .ivu-form-item{
                    width: 480px;
                    margin: 0 auto 20px;
                    text-align: left;

                    .ivu-input{
                        font-size: 14px;
                    }

                    .ivu-select-item{
                        font-size: 14px !important;
                    }
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
                }
            }

            .blue-color{
                color: $color_blue;
                cursor: pointer;
            }
            .red-color{
                color: $color_red;
                cursor: pointer;
            }
            .grey-color{
                color: $color-3F3F3F;
                cursor: pointer;
            }

        }

        .btn-wrap{
            height: 56px;
            width: 100%;
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;
            box-shadow: 0 -5px 3px 0 rgba(0,0,0,0.03);
        }

    }
</style>
