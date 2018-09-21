<template>
    <!--会员卡包-->
    <div class="member-info-card">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :before-router-list="breadRouterList"
                :locale-router="$t('memberCard')">
            </bread-crumb-head>
        </div>

        <div class="card-content">

            <!--<div class="content-info">
                <div class="title">{{$t('couponInfo')}}</div>
                <div class="tabs-wrap">
                    <ButtonGroup>
                        <Button type="primary">{{$t('toBeUsed')}}</Button>
                        <Button type="ghost">{{$t('used')}}</Button>
                    </ButtonGroup>
                </div>
                <div class="table-wrap">
                    <el-table
                        :data="tableData"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="id"
                            :label="$t('SN')"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            :label="$t('productName')"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            :label="$t('amount')"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            :label="$t('useCondition')">
                        </el-table-column>
                        <el-table-column
                            prop="range"
                            :label="$t('validityPeriod')"
                            width="330">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            :label="$t('ticketBuyingDate')"
                            width="180">
                        </el-table-column>
                    </el-table>
                </div>
            </div>-->

            <div class="content-info" v-for="annualCard in cardInfo.annual" :key="annualCard.id">
                <div class="title">{{$t('yearCardInfo')}}</div>
                <div class="form-wrap">
                    <div class="form-item-wrap"><label>{{$t('yearCardId')}}</label><span>{{annualCard.vipCardNo}}</span></div><!--年卡编号-->
                    <div class="form-item-wrap"><label>{{$t('yearCardName')}}</label><span>{{annualCard.vipCardName}}</span></div><!--年卡名称-->
                    <div class="form-item-wrap"><label>物理卡号：</label><span>{{annualCard.physicalCardNo | contentFilter}}</span></div><!--物理卡号-->
                    <div class="form-item-wrap"><label>是否指纹注册：</label><span>{{annualCard.isFingerPrint=='true' ? '是' : '否'}}</span></div><!--是否指纹注册-->
                    <div class="form-item-wrap"><label>有效开始日期：</label><span>{{annualCard.validFrom}}</span></div><!--有效开始日期-->
                    <div class="form-item-wrap"><label>有效开结束日期：</label><span>{{annualCard.validTo}}</span></div><!--有效开结束日期-->
                    <div class="form-item-wrap"><label>销售日期：</label><span>{{annualCard.saleDate}}</span></div><!--销售日期-->
                    <div class="form-item-wrap"><label>开卡单位：</label><span>{{annualCard.issuser | contentFilter}}</span></div><!--开卡单位-->
                    <div class="form-item-wrap"><label>年卡状态：</label><span>{{annualCard.status | contentFilter}}</span></div><!--年卡状态-->
                    <div class="form-item-wrap"><label>年卡备注：</label><span>{{annualCard.note | contentFilter}}</span></div><!--年卡备注-->
                </div>
                <div class="label"></div>
                <div class="table-wrap">
                    <!--<el-table
                        :data="JSON.parse(annualCard.availPersons) || []"
                        :border="false"
                        style="width: 100%">
                        <el-table-column
                            prop="no"
                            label="成员序号">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="idno"
                            label="身份证号">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="gender"
                            label="性别">
                        </el-table-column>
                    </el-table>-->
                    <table-com
                        :ofsetHeight="170"
                        :column-data="cardOwnerHead"
                        :table-data="JSON.parse(annualCard.availPersons) || []"
                        :border="true">
                        <el-table-column
                            slot="column4"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            fixed="right"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">{{$t(scope.row.gender)}}</template>
                        </el-table-column>
                    </table-com>
                </div>
                <!--可使用范围-->
                <div class="label range"></div>
                <ul class="range-list">
                    <li v-for="(range,index) in JSON.parse(annualCard.availOrgs)" :key="index">{{range.orgName}}</li>
                </ul>
                <!--使用说明-->
                <div class="label instruction"></div>
                <div class="range-list">{{annualCard.instructions | contentFilter}}</div>
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

            <div class="content-info" v-for="timesCard in cardInfo.times" :key="timesCard.id">
                <div class="title">次卡信息</div>
                <div class="form-wrap">
                    <div class="form-item-wrap"><label>次卡编号：</label><span>{{timesCard.vipCardNo}}</span></div><!--次卡编号-->
                    <div class="form-item-wrap"><label>次卡名称：</label><span>{{timesCard.vipCardName}}</span></div><!--次卡名称-->
                    <div class="form-item-wrap"><label>物理卡号：</label><span>{{timesCard.physicalCardNo | contentFilter}}</span></div><!--物理卡号-->
                    <div class="form-item-wrap"><label>是否指纹注册：</label><span>{{timesCard.isFingerPrint=='true' ? '是' : '否'}}</span></div><!--是否指纹注册-->
                    <div class="form-item-wrap"><label>有效开始日期：</label><span>{{timesCard.validFrom}}</span></div><!--有效开始日期-->
                    <div class="form-item-wrap"><label>有效开结束日期：</label><span>{{timesCard.validTo}}</span></div><!--有效开结束日期-->
                    <div class="form-item-wrap"><label>销售日期：</label><span>{{timesCard.saleDate}}</span></div><!--销售日期-->
                    <div class="form-item-wrap"><label>开卡单位：</label><span>{{timesCard.totalTimes | issuser}}</span></div><!--开卡单位-->
                    <div class="form-item-wrap"><label>次卡状态：</label><span>{{timesCard.totalTimes | status}}</span></div><!--次卡状态-->
                    <div class="form-item-wrap"><label>次卡备注：</label><span>{{timesCard.totalTimes | note}}</span></div><!--次卡备注-->
                    <div class="form-item-wrap"><label>总次数：</label><span>{{timesCard.totalTimes | contentFilter}}</span></div><!--总次数-->
                    <div class="form-item-wrap"><label>现在可用次数：</label><span>{{timesCard.leftTime | contentFilter}}</span></div><!--现在可用次数-->
                </div>
                <div class="label"></div>
                <div class="table-wrap">
                    <!--<el-table
                        :data="JSON.parse(timesCard.availPersons) || []"
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
                    </el-table>-->

                    <table-com
                        :ofsetHeight="170"
                        :column-data="cardOwnerHead"
                        :table-data="JSON.parse(timesCard.availPersons) || []"
                        :border="true">
                        <el-table-column
                            slot="column4"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            fixed="right"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">{{$t(scope.row.gender)}}</template>
                        </el-table-column>
                    </table-com>

                </div>
                <!--可使用范围-->
                <div class="label range"></div>
                <ul class="range-list">
                    <li v-for="(range,index) in JSON.parse(timesCard.availOrgs)" :key="index">{{range.orgName}}</li>
                </ul>
                <!--使用说明-->
                <div class="label instruction"></div>
                <div class="range-list">{{timesCard.instructions | contentFilter}}</div>
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
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import ajax from '@/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import {cardOwnerHead} from '../infoListConfig';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        components: {breadCrumbHead, tableCom},
        mixins : [lifeCycleMixins],
        data () {
            return {
                // 面包屑路由列表
                breadRouterList: [{name: '会员信息', router: 'info'}, {name: '会员详情', router: 'detail'}],
                /*// 表格数据
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
                ],*/

                // 年卡、次卡信息数据
                cardInfo: {
                    annual: [],
                    times: []
                },
                // 年卡、次卡可使用人表头
                cardOwnerHead: cardOwnerHead,
            }
        },
        created() {
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    this.getCardPackage(params.cardPkg ? params.cardPkg.cardId : '');
                }else{
                    this.$router.push({
                        name : 'infoDetail'
                    });
                }
            },
            /**
             * 获取卡包信息
             */
            getCardPackage(cardId) {
                ajax.post('getCardPackage', {
                    cardId: cardId
                }).then(res => {
                    if (res.success) {
                        if (res.data) {
                            // 年卡数据
                            this.cardInfo.annual = res.data.filter((item,i) => {
                                return item.vipType == 'annual';
                            }) || [];
                            // 次卡数据
                            this.cardInfo.times = res.data.filter((item,i) => {
                                return item.vipType == 'times';
                            }) || [];
                        }
                    } else {
                        this.$Message.error(res.message || '');
                    }

                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-info-card{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
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
                    /deep/ .ivu-btn-group{
                        .ivu-btn{
                            width: 124px;
                            padding: 3px 15px
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
                    &.instruction{
                        margin-top: 0px;
                        &::before{
                            content: '使用说明';
                        }
                    }
                }

                .range-list {
                    margin-bottom: 15px;
                    > li {
                        line-height: 20px;
                    }
                }

            }
        }

    }
</style>
