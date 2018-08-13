<template>
    <!--会员卡包-->
    <div class="member-info-card">

        <div class="breadcrumb-box">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/memberManage/memberInfo">会员信息</BreadcrumbItem>
                <BreadcrumbItem to="/memberManage/infoDetail">会员详情</BreadcrumbItem>
                <BreadcrumbItem>会员卡包</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="card-content">

            <div class="content-info">
                <div class="title">优惠券信息</div>
                <div class="tabs-wrap">
                    <ButtonGroup>
                        <Button type="primary">待使用</Button>
                        <Button type="ghost">已使用</Button>
                    </ButtonGroup>
                </div>
                <div class="table-wrap">
                    <el-table
                        :data="tableData"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="id"
                            label="串码"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="产品名称"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            label="数量"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            label="使用条件">
                        </el-table-column>
                        <el-table-column
                            prop="range"
                            label="有效期"
                            width="330">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="购票日期"
                            width="180">
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <div class="content-info">
                <div class="title">年卡信息</div>
                <div class="form-wrap">
                    <div class="form-item-wrap"><label>年卡编号：</label><span>22866882</span></div>
                    <div class="form-item-wrap"><label>年卡名称：</label><span>欢乐谷年卡</span></div>
                    <div class="form-item-wrap"><label>物理卡号：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>是否指纹注册：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>有效开始日期：</label><span>2017-08-08 08:00:00</span></div>
                    <div class="form-item-wrap"><label>有效开结束日期：</label><span>2017-08-08 08:00:00</span></div>
                    <div class="form-item-wrap"><label>销售日期：</label><span>2017-03-03 08:00:00</span></div>
                    <div class="form-item-wrap"><label>开卡单位：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>年卡状态：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>年卡备注：</label><span>-</span></div>
                </div>
                <div class="label"></div>
                <div class="table-wrap">
                    <el-table
                        :data="cardData"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="id"
                            label="成员序号">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="idNum"
                            label="身份证号">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="label range"></div>
                <div class="table-wrap" style="width: 810px;">
                    <el-table
                        :width="810"
                        :data="cashData"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="money"
                            label="本金">
                        </el-table-column>
                        <el-table-column
                            prop="send"
                            label="赠送金额">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="content-info">
                <div class="title">年卡信息</div>
                <div class="form-wrap">
                    <div class="form-item-wrap"><label>年卡编号：</label><span>22866882</span></div>
                    <div class="form-item-wrap"><label>年卡名称：</label><span>欢乐谷年卡</span></div>
                    <div class="form-item-wrap"><label>物理卡号：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>是否指纹注册：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>有效开始日期：</label><span>2017-08-08 08:00:00</span></div>
                    <div class="form-item-wrap"><label>有效开结束日期：</label><span>2017-08-08 08:00:00</span></div>
                    <div class="form-item-wrap"><label>销售日期：</label><span>2017-03-03 08:00:00</span></div>
                    <div class="form-item-wrap"><label>开卡单位：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>年卡状态：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>年卡备注：</label><span>-</span></div>
                </div>
                <div class="label"></div>
                <div class="table-wrap">
                    <el-table
                        :data="cardData"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="id"
                            label="成员序号">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="idNum"
                            label="身份证号">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="label range"></div>
                <div class="table-wrap" style="width: 810px;">
                    <el-table
                        :width="810"
                        :data="cashData"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="money"
                            label="本金">
                        </el-table-column>
                        <el-table-column
                            prop="send"
                            label="赠送金额">
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <div class="content-info">
                <div class="title">次卡信息</div>
                <div class="form-wrap">
                    <div class="form-item-wrap"><label>年卡编号：</label><span>22866882</span></div>
                    <div class="form-item-wrap"><label>年卡名称：</label><span>欢乐谷年卡</span></div>
                    <div class="form-item-wrap"><label>物理卡号：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>是否指纹注册：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>有效开始日期：</label><span>2017-08-08 08:00:00</span></div>
                    <div class="form-item-wrap"><label>有效开结束日期：</label><span>2017-08-08 08:00:00</span></div>
                    <div class="form-item-wrap"><label>销售日期：</label><span>2017-03-03 08:00:00</span></div>
                    <div class="form-item-wrap"><label>开卡单位：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>年卡状态：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>年卡备注：</label><span>-</span></div>
                    <div class="form-item-wrap"><label>总次数：</label><span>323</span></div>
                    <div class="form-item-wrap"><label>现在可用次数：</label><span>10</span></div>
                </div>
                <div class="label"></div>
                <div class="table-wrap">
                    <el-table
                        :data="cardData"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="id"
                            label="成员序号">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="idNum"
                            label="身份证号">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="label range"></div>
                <div class="table-wrap" style="width: 810px;">
                    <el-table
                        :width="810"
                        :data="cashData"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="money"
                            label="本金">
                        </el-table-column>
                        <el-table-column
                            prop="send"
                            label="赠送金额">
                        </el-table-column>
                    </el-table>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        components: {},
        data () {
            return {
                // 表格数据
                tableData: [
                    {
                        id: '00032822',
                        name: '北京欢乐谷夜场门票',
                        content: '满300可用',
                        num: '1',
                        time: '20180.09.09 08:00:00',
                        range: '20180.09.09 08:00:00-2020.02.09 08:00:00',
                    },
                    {
                        id: '00032820',
                        name: '欢乐谷10元代金券',
                        content: '最低可使用金额100元，最高使用金额1000元',
                        num: '2',
                        time: '20180.09.09 08:00:00',
                        range: '20180.09.09 08:00:00-2020.02.09 08:00:00',
                    },
                ],
                cardData: [
                    {
                        id: 1,
                        name: '张三',
                        idNum: '56787667878989909',
                        mobile: '15322222222',
                        sex: '男',
                    },
                ],
                cashData: [
                    {
                        money: '温泉酒店',
                        send: '景区自营票购买',
                    },
                    {
                        money: '张记手擀面',
                        send: '温泉酒店',
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-info-card{
        @include block_outline();
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .card-content{
            padding: 20px 30px;

            .content-info{
                margin-bottom: 30px;

                .title{
                    font-size: $font_size_16px;
                    color: $color-333;
                    line-height: 24px;
                }

                .tabs-wrap{
                    margin-top: 15px;
                    margin-bottom: 10px;
                }

                .form-wrap{
                    width: 100%;
                    margin-top: 10px;
                    @include clearfix();

                    .form-item-wrap{
                        width: 30%;
                        float: left;
                        margin-right: 10px;
                        height: 35px;
                        line-height: 35px;
                        font-size: $font_size_14px;
                        color: $color-666;
                        >label{
                            color: $color-333;
                        }
                    }
                }

                .label{
                    border-bottom: 1px dashed $color_E1E1E1;
                    margin-bottom: 20px;
                    margin-top: -5px;
                    &::before{
                        content: '可使用人信息';
                        top: 10px;
                        position: relative;
                        background: #FFFFFF;
                        padding-right: 10px
                    }
                    &.range{
                        margin-top: 0px;
                        &::before{
                            content: '可用范围';
                        }
                    }
                }

            }
        }

    }
</style>
