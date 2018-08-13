<template>
    <!--会员详情-->
    <div class="member-info-detail">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/memberInfo">会员信息</BreadcrumbItem>
                <BreadcrumbItem>会员详情</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="info-detail">

            <div class="content-wrap">

                <div class="content-info">
                    <div class="title">会员个人信息<span class="edit" @click="modifyInfo"><i class="iconfont icon-edit"></i>修改</span></div>
                    <div class="basic-wrap">
                        <div class="person-left">
                            <img src="@/assets/images/icon-avator.png" alt="">
                        </div>
                        <div class="person-right">
                            <div>
                                <span class="name">刘木子</span>
                                <span>男</span>
                                <span>23岁</span>
                            </div>
                            <div class="form-show">
                                <span class="form-item-wrap"><label>手机号：</label>1862866882</span>
                                <span class="form-item-wrap"><label>生日：</label>1995.09.07</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-wrap">
                        <div class="form-item-wrap"><label>微信号：</label><span>22866882</span></div>
                        <div class="form-item-wrap"><label>支付宝账号：</label><span>--</span></div>
                        <div class="form-item-wrap"><label>E-mail：</label><span>--</span></div>
                        <div class="form-item-wrap"><label>国家代码：</label><span>--</span></div>
                        <div class="form-item-wrap"><label>城市代码：</label><span>--</span></div>
                        <div class="form-item-wrap"><label>QQ号：</label><span>--</span></div>
                        <div class="form-item-wrap"><label>证件类型：</label><span>身份证</span></div>
                        <div class="form-item-wrap"><label>身份证号：</label><span>-</span></div>
                        <div class="form-item-wrap"><label>个人兴趣：</label><span>-</span></div>
                        <div class="form-item-wrap"><label>家庭住址：</label><span>湖南省长沙市雨花区核能与花公关</span></div>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">
                        <span>会员卡归属选择 </span>
                        <Select v-model="scene" style="width:180px;margin-left: 20px;">
                            <Option value="''">全部交易类型</Option>
                        </Select>
                        <span class="edit" @click="modifyInfo"><i class="iconfont icon-edit"></i>修改</span>
                    </div>
                    <div class="form-wrap">
                        <div class="form-item-wrap"><label>会员编号：</label><span>22866882</span></div>
                        <div class="form-item-wrap"><label>发卡单位：</label><span>深圳方特世界乐园</span></div>
                        <div class="form-item-wrap"><label>注册渠道：</label><span>官网</span></div>
                        <div class="form-item-wrap"><label>会员类别：</label><span>正式会员</span></div>
                        <div class="form-item-wrap"><label>会员级别：</label><span>黄金会员</span></div>
                        <div class="form-item-wrap"><label>密码：</label><span>********</span></div>
                        <div class="form-item-wrap"><label>第三方卡面号：</label><span>--</span></div>
                        <div class="form-item-wrap"><label>第三方卡号：</label><span>0279327092</span></div>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">默认储值账户信息 <span class="add" @click="addAccount">+ 新增账户</span></div>
                    <div class="content">
                        <div class="header-wrap">默认储值账户信息</div>
                        <div class="body-wrap">
                            <div class="coast"><span>本金：<span class="num">3728.28</span>元</span><span>赠送金额：<span class="num">128.28</span>元</span></div>
                            <div class="operate-right">
                                <span @click="viewDeal">交易明细</span>
                                <span class="split-line"></span>
                                <span @click="showAddSaveModal">新增储值</span>
                                <span class="split-line"></span>
                                <span @click="showRangeModal">应用范围</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">虚拟账户信息</div>
                    <div class="content">
                        <div class="header-wrap">默认储值账户信息</div>
                        <div class="body-wrap">
                            <div class="coast"><span>本金：<span class="num">3728.28</span>金币</span><span>赠送金额：<span class="num">128.28</span>金币</span></div>
                            <div class="operate-right">
                                <span @click="viewDeal">交易明细</span>
                                <span class="split-line"></span>
                                <span @click="showAddSaveModal">新增储值</span>
                                <span class="split-line"></span>
                                <span @click="showRangeModal">应用范围</span>
                                <span class="split-line"></span>
                                <span @click="showCashModal">兑现</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">积分账户信息</div>
                    <div class="content">
                        <div class="header-wrap">积分</div>
                        <div class="body-wrap">
                            <div class="coast"><span>可用积分：<span class="num">3728.28</span></span></div>
                            <div class="operate-right">
                                <span @click="viewIntegration">积分明细</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">优惠券信息</div>
                    <div class="tabs-wrap">
                        <ButtonGroup>
                            <Button type="primary">未过期</Button>
                            <Button type="ghost">已使用</Button>
                            <Button type="ghost">已过期</Button>
                        </ButtonGroup>
                        <span class="more" @click="showCouponModal">查看更多</span>
                    </div>
                    <div class="table-wrap">
                        <el-table
                            :data="tableData"
                            :border="false"
                            style="width: 100%">
                            <el-table-column
                                prop="id"
                                label="会员编码"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="卡券名称"
                                width="220">
                            </el-table-column>
                            <el-table-column
                                prop="content"
                                label="使用条件">
                            </el-table-column>
                            <el-table-column
                                prop="type"
                                label="类别"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="time"
                                label="有效期"
                                width="200">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">卡包信息</div>
                    <div class="operate" @click="viewCardDetail">查看卡包信息</div>
                </div>

                <div class="content-info">
                    <div class="title">享受积分、折扣率信息</div>
                    <div class="operate" @click="viewCardRateDetail">查看享受积分、折扣率信息</div>
                </div>

                <div class="content-info card-temp">
                    <div class="title">子母卡信息</div>
                    <div class="son-card card-wrap">
                        <el-table
                            :data="motherCard"
                            :border="true"
                            :span-method="objectSpanMethod"
                            style="width: 100%">
                            <el-table-column
                                prop=""
                                label="当前会员卡身份"
                                width="180">
                                <template slot-scope="scope">母卡</template>
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="母卡信息"
                                width="280">
                                <template slot-scope="scope">张三，27838383939</template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="mother-card card-wrap">
                        <el-table
                            :data="sonCard"
                            :border="true"
                            style="width: 100%">
                            <el-table-column
                                prop=""
                                label="当前会员卡身份"
                                width="180">
                                <template slot-scope="scope">子卡</template>
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="子卡信息"
                                width="280">
                                <template slot-scope="scope">张三，27838383939</template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">安全设置</div>
                    <div class="switch-wrap">
                        <i-switch v-model="open"></i-switch><span class="text">冻结该会员账户</span>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">修改储值、积分数值</div>
                    <div class="operate">
                        <div @click="showAssetModal">修改该会员储值账户余额</div>
                        <div @click="showIntegModal">修改该会员积分账户余额</div>
                    </div>

                </div>

            </div>

            <div class="btn-wrap">
                <Button type="primary">保存</Button>
                <Button type="ghost">取消</Button>
            </div>

        </div>

        <!--新增账户modal-->
        <add-account-modal ref="addAccount"></add-account-modal>

        <!--新增储值modal-->
        <add-fund-modal ref="addFund"></add-fund-modal>

        <!--兑现modal-->
        <to-cash-modal ref="toCash"></to-cash-modal>

        <!--会员储值账户余额修改/会员积分账户修改modal-->
        <modify-balance-modal ref="modifyBalance"></modify-balance-modal>

        <!--应用范围modal-->
        <use-range-modal ref="useRange"></use-range-modal>

        <!--优惠券信息--查看更多modal-->
        <view-more-coupon-modal ref="viewMoreCoupon"></view-more-coupon-modal>

    </div>
</template>

<script>

    import addAccountModal from '../components/addAccount.vue'
    import addFundModal  from '../components/addFund.vue'
    import toCashModal  from '../components/taCash.vue'
    import modifyBalanceModal  from '../components/modifyBalance.vue'
    import useRangeModal  from '../components/useRange.vue'
    import viewMoreCouponModal  from '../components/viewMoreCoupon.vue'

    export default {
        components: {
            addAccountModal,
            addFundModal,
            toCashModal,
            modifyBalanceModal,
            useRangeModal,
            viewMoreCouponModal,
        },
        data () {
            return {
                detail: {},
                // 表格数据
                tableData: [
                    {
                        id: '309287482',
                        name: '张三',
                        content: '店内总价不超过100元订单结算时使用',
                        type: '折扣券',
                        time: '20180.09.09-2020.02.09',
                    },
                    {
                        id: '309287482',
                        name: '张三',
                        content: '店内总价不超过100元订单结算时使用',
                        type: '折扣券',
                        time: '20180.09.09-2020.02.09',
                    },
                ],
                // 字母卡表格数据
                motherCard: [
                    { id: '309287481' },
                    { id: '309287482' }
                ],
                sonCard: [
                    { id: '309287480' },
                ],
                // 冻结该会员账户
                open: false,
                scene: '',
            }
        },
        methods: {

            addAccount () {
                console.log('add');
                this.$refs.addAccount.show();
            },

            modifyInfo () {
                this.$router.push({ name: 'addMember', query: { type: 'modify'} });
            },

            viewDeal () {
                console.log('deal');
                this.$router.push({ name: 'infoFund' });
            },

            showAddSaveModal () {
                console.log('save');
                this.$refs.addFund.show();
            },

            showRangeModal () {
                console.log('range');
                this.$refs.useRange.show();
            },

            showCashModal () {
                console.log('cash');
                this.$refs.toCash.show();
            },

            showCouponModal () {
                console.log('Coupon');
                this.$refs.viewMoreCoupon.show();
            },

            viewIntegration  () {
                this.$router.push({ name: 'infoInteg' });
                console.log('Integration')
            },

            viewCardDetail () {
                this.$router.push({ name: 'infoCard' });
                console.log('Card')
            },

            viewCardRateDetail () {
                this.$router.push({ name: 'infoRate' });
                console.log('cardRate')
            },

            // 字母卡列合并
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },

            // 修改该会员储值账户余额
            showAssetModal () {
                console.log('asset');
                this.$refs.modifyBalance.show('fund');
            },

            // 修改该会员积分账户余额
            showIntegModal () {
                console.log('积分');
                this.$refs.modifyBalance.show('integration');
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-info-detail{
        @include block_outline();
        overflow: auto;
//        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .info-detail{

            .content-wrap{
                padding: 30px 50px;

                .content-info{
                    margin-bottom: 30px;

                    .title{
                        font-size: $font_size_16px;
                        color: $color-333;
                        line-height: 24px;
                        @include clearfix();

                        .add{
                            margin-left: 10px;
                            font-size: $font_size_14px;
                            color: $color-blue;
                            cursor: pointer;
                        }

                        .edit{
                            font-size: $font_size_14px;
                            float: right;
                            color: $color-blue;
                            cursor: pointer;
                            display: none;
                        }
                    }

                    &:hover{
                        .edit{
                            display: inline-block;
                        }
                    }

                    .tabs-wrap{
                        margin-top: 15px;
                        margin-bottom: 10px;
                        @include clearfix();

                        .more{
                            font-size: $font_size_14px;
                            float: right;
                            color: $color-blue;
                            cursor: pointer;
                        }
                    }

                    .basic-wrap{
                        width: 100%;
                        height: 70px;
                        margin-top: 15px;
                        @include clearfix();

                        .person-left{
                            float: left;
                            width: 70px;
                            display: inline-block;
                            img{
                                width: 100%;
                                background: #F2F2F2;
                                border-radius: 2px;
                            }
                        }

                        .person-right{
                            float: left;
                            width: calc(100% - 72px);
                            height: 70px;
                            padding: 10px 0 10px 30px;
                            display: inline-block;
                            >div{
                                color: $color_666;
                                span{
                                    font-size: $font_size_16px;
                                    margin-right: 10px;
                                    &.name{
                                        font-size: $font_size_18px;
                                        color: $color_333;
                                        margin-right: 20px;
                                    }
                                }

                                &.form-show{
                                    font-size: $font_size_14px;
                                    span{
                                        margin-right: 40px;
                                    }
                                    label{
                                        color: $color_333;
                                    }
                                }

                            }

                        }
                    }

                    .form-wrap{
                        width: 100%;
                        margin-top: 10px;
                        @include clearfix();

                        .form-item-wrap{
                            width: 30%;
                            float: left;
                            margin-right: 10px;
                            height: 30px;
                            line-height: 30px;
                            font-size: $font_size_14px;
                            color: $color-666;
                            >label{
                                color: $color-333;
                            }
                        }
                    }

                    &.card-temp{
                        height: 185px;
                        @include clearfix();
                        .card-wrap{
                            margin-top: 15px;
                            display: inline-block;
                            float: left;
                            &.son-card{
                                margin-right: 70px;
                            }
                        }
                    }

                    .operate{
                        margin-top: 10px;
                        font-size: $font_size_14px;
                        color: $color-blue;
                        cursor: pointer;
                    }

                    .switch-wrap{
                        margin-top: 15px;
                        .text{
                            margin-left: 10px;
                            font-size: $font_size_14px;
                            color: $color-333;
                        }
                    }

                    .content{
                        border: 1px solid $color_E9E9E9;
                        border-radius: 4px 4px 0 0;
                        font-size: $font_size_14px;
                        margin-top: 15px;

                        .header-wrap{
                            background: $color_F5F7FA_050;
                            border-bottom: 1px solid $color_E9E9E9;
                            border-radius: 3px 3px 0 0;
                            height: 40px;
                            line-height: 38px;
                            padding: 0 20px;
                            color: $color_000_085;
                        }

                        .body-wrap{
                            padding: 0 40px 0 60px;
                            height: 60px;
                            line-height: 60px;
                            @include clearfix();

                            .coast{
                                display: inline-block;
                                >span{
                                    margin-right: 30px;
                                }
                            }

                            .num{
                                font-size: $font_size_18px;
                                color: $color-666;
                            }

                            .operate-right{
                                float: right;
                                color: $color-blue;
                                >span{
                                    cursor: pointer;
                                }
                                .split-line{
                                    display: inline-block;
                                    width: 1px;
                                    height: 14px;
                                    background-color: $color-E1E1E1;
                                    margin: 0 10px;
                                    vertical-align: middle;
                                }
                            }

                        }
                    }

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
    }
</style>
