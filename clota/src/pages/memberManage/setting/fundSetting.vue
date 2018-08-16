<template>
    <!--会员管理--储值设置-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="content-item">
                <div class="title">储值密码设置</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>消费时无需要密码验证，提供个人信息等</span>
                        </Radio>
                        <Radio label="two">
                            <span>消费时需要密码验证</span>
                            <span class="yellow-color">（刷二维码即可或其他短信发送随机密码）</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>


            <div class="content-item">
                <div class="title">储值积分、成长值比例设置</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>储值时不获得积分、成长值，消费时获取</span>
                        </Radio>
                        <Radio label="two">
                            <span>储值时获得积分、成长值，消费时不重复获得积分、成长值</span>
                        </Radio>
                    </RadioGroup>
                    <div>储值
                        <Input value="60" type="text" placeholder="请输入" style="width: 100px;"/> 元获取
                        <Input value="60" type="text" placeholder="请输入" style="width: 100px;"/>积分
                    </div>
                    <div>储值
                         <Input value="60" type="text" placeholder="请输入" style="width: 100px;"/> 元获取
                         <Input value="60" type="text" placeholder="请输入" style="width: 100px;"/>成长值
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="title">储值获得积分、成长值生效设置</div>
                <div class="main">
                    <RadioGroup v-model="effect" vertical>
                        <Radio label="one">
                            <span>值成功后立即生效</span>
                        </Radio>
                        <Radio label="two">
                            <span>储值成功后</span>
                            <Input value="60" type="text" placeholder="请输入" style="width: 100px;" />
                            <span>个小时后失效</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>

            <Form ref="formDynamic" :model="formDynamic" :label-width="20" style="width: 600px">

                <div class="content-item">
                    <div class="title">储值赠送金额比例设置 <span class="blue-color" @click="handleAdd">+ 新增</span></div>
                    <div class="main">
                        <div class="ivu-form-item-wrap">
                            <FormItem
                                v-for="(item, index) in formDynamic.items"
                                v-if="item.status"
                                :key="index"
                                label=""
                                :prop="'items.' + index + '.value'"
                                :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                                储值：
                                <Input type="text" v-model="item.value" placeholder="请输入" style="width: 100px;"/> —
                                <Input type="text" v-model="item.value" placeholder="请输入" style="width: 100px;"/> 赠送
                                <Input type="text" v-model="item.value" placeholder="请输入" style="width: 100px;"/> 元
                                <span class="red-color" v-if="item.disabled && index > 0" @click="handleRemove(index)">删除</span>
                                <span class="blue-color" v-if="!item.disabled" @click="handleSubmit('formDynamic')">应用范围</span>
                            </FormItem>
                        </div>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">转账手续费扣除比例设置</div>
                    <div class="main">
                        <Input value="60" type="text" placeholder="请输入" style="width: 100px;" />%
                    </div>
                </div>


                <div class="content-item">
                    <div class="title">收款方式设置   <span class="blue-color" @click="handleAdd">+ 新增收款方式</span></div>
                    <div class="main">
                        <div class="ivu-form-item-wrap">
                            <FormItem
                                v-for="(item, index) in formDynamic.items"
                                v-if="item.status"
                                :key="index"
                                label=""
                                :prop="'items.' + index + '.value'"
                                :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                                <Input type="text" :disabled="item.disabled" v-model="item.value" placeholder="请输入" style="width: 280px;"/>
                                <span class="red-color" v-if="item.disabled && index > 0" @click="handleRemove(index)">删除</span>
                                <span class="blue-color" v-if="!item.disabled" @click="handleSubmit('formDynamic')">保存</span>
                                <span class="grey-color" v-if="!item.disabled" @click="handleReset('formDynamic',index)">取消</span>
                            </FormItem>
                        </div>
                    </div>
                </div>

                <div class="content-item">
                    <div class="title">储值账户设置   <span class="blue-color" @click="showAddAccountModal">+ 新增账户</span></div>
                    <div class="main">
                        <div class="table-wrap">
                            <el-table
                                :data="tableData"
                                :border="false"
                                style="width: 100%">
                                <el-table-column
                                    prop="name"
                                    label="账户名称">
                                </el-table-column>
                                <el-table-column
                                    prop="mobile"
                                    label="本金">
                                    <template slot-scope="scope">
                                        <span class="blue-color" @click="showRangeModal(scope.row)">应用设置</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="idNum"
                                    label="赠送金额">
                                    <template slot-scope="scope">
                                        <span class="blue-color" @click="showRangeModal(scope.row)">应用设置</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="date"
                                    label="操作">
                                    <template slot-scope="scope">
                                        <span class="blue-color" @click="showModifyAcocuntModal(scope.row)">编辑账户</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>

            </Form>

        </div>

        <div class="btn-wrap">
            <Button type="primary">保存</Button>
            <Button type="ghost">取消</Button>
        </div>

        <!--新增账户modal-->
        <add-account-modal ref="addAccount"></add-account-modal>

        <!--编辑账户modal-->
        <modify-account-modal ref="modifyAccount"></modify-account-modal>

        <!--默认账户本金/赠送金额可使用范围设置modal-->
        <modify-range-modal ref="modifyRange"></modify-range-modal>

    </div>
</template>

<script>

    import headerTabs from './components/headerTabs.vue'
    import addAccountModal from './components/addAccountModal.vue'
    import modifyAccountModal from './components/modifyAccountModal.vue'
    import modifyRangeModal from './components/modifyRangeModal.vue'

    export default {
        components: {
            headerTabs,
            addAccountModal,
            modifyAccountModal,
            modifyRangeModal,
        },
        data () {
            return {
                routerName: 'fundSetting',
                openInteg: true,
                openFunds: true,
                effect: 'one',
                check: true,
                index: 1,
                // 表单数据
                formDynamic: {
                    items: [
                        {
                            value: '新建的修改原因',
                            index: 1,
                            status: 1,
                            disabled: true,
                        }
                    ]
                },
                // 表格数据
                tableData: [
                    {
                        name: '张三',
                        mobile: '16876868839',
                        idNum: '4307283898172933',
                        sex: '男',
                        belongTo: '北京欢乐谷',
                    }
                ],
            }
        },
        methods: {
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
            },

            showAddAccountModal(){
                this.$refs.addAccount.show();
            },

            showRangeModal () {
                this.$refs.modifyRange.show();
            },

            showModifyAcocuntModal () {
                this.$refs.modifyAccount.show();
            },

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
                    >div{
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

