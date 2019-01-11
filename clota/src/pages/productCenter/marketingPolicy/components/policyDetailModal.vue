<!--
    销售政策详情弹窗 用于分销详情页面
    作者：杨泽涛
-->
<template>
    <Modal :title="$t('marketingPolicyDetail')"
           width="900"
           class="modal"
           :mask-closable="false"
           v-model="show">
        <div class="content">
            <Form ref="formValidate"
                  :model="detail"
                  label-position="right"
                  :label-width="150"
                  v-if="detail && detail.productPolicy">
                <template v-if="callFrom && callFrom === 'marketing'">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('salePolicyName')+':'"><!--销售政策名称-->
                                <div v-w-title="detail.productPolicy.name">{{detail.productPolicy.name | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('desc')+':'"><!--描述-->
                                <div class="item-content" v-w-title="detail.productPolicy.policyDesc">{{detail.productPolicy.policyDesc | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </template>
                <template v-else>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('salePolicyName')+':'"><!--销售政策名称-->
                                <div v-w-title="detail.productPolicy.name">{{detail.productPolicy.name | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('scenePlace')+':'"><!--所属景区-->
                                <div v-w-title="detail.scenicName">{{detail.scenicName | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('desc')+':'"><!--描述-->
                                <div v-w-title="detail.policyDesc">{{detail.policyDesc | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </template>

                <!-- 售卖游玩政策 -->
                <div class="divider-header">
                    <span>{{$t('saleAndPlayPolicy')}}</span>
                </div>

                <div>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('policyValidity')+':'"><!--政策可售期-->
                                <div v-w-title="$t(detail.productPolicy.saleRuleModel.type)">{{$t(detail.productPolicy.saleRuleModel.type) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <!--政策可售期 = 游玩日期前M天可售-->
                        <i-col span="12" v-if="detail.productPolicy.saleRuleModel.type === 'playBeforeSold'">
                            <Form-item :label="$t('aheadDays')+':'"><!--提前天数（M）-->
                                <div>
                                    {{detail.productPolicy.saleRuleModel.beforeDay | contentFilter}} {{$t('To')}} {{detail.productPolicy.saleRuleModel.afterDay | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                        <!--政策可售期 = 指定期间可售-->
                        <i-col span="12" v-if="detail.productPolicy.saleRuleModel.type === 'specifiedPeriodSold'">
                            <Form-item :label="$t('specifiedTime')+':'"><!--指定起止日期-->
                                <!--<div>{{detail.saleRuleModel.specifiedTime ? JSON.parse(detail.saleRuleModel.specifiedTime).join('~') : '-' | contentFilter}}</div>-->
                                <div>{{detail.productPolicy.saleRuleModel.startTime}}~{{detail.productPolicy.saleRuleModel.endTime}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <!--政策可售期 = 指定期间可售-->
                    <i-row v-if="detail.productPolicy.saleRuleModel.type === 'specifiedPeriodSold'">
                        <i-col span="24">
                            <Form-item :label="$t('weekSold')+':'"><!--每周可玩日期-->
                                <div>
                                    {{showWeek(detail.productPolicy.saleRuleModel.weekSold) | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <!--政策可售期 = 指定日期可售-->
                    <i-row v-if="detail.productPolicy.saleRuleModel.type === 'specifiedDateSold'">
                        <i-col span="24">
                            <Form-item :label="$t('specifiedDateSold')+':'"><!--指定日期-->
                                <div>
                                    {{(detail.productPolicy.saleRuleModel.specifiedTime.split(',')).join('、') | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('saleDayTime')+':'"><!--每日可售时间-->
                                <div>
                                    {{detail.productPolicy.saleStartTime | contentFilter}}~{{detail.productPolicy.saleEndTime | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                        <i-col span="12" v-if="detail.productPolicy.saleRuleModel.beforeDay == 0 || detail.productPolicy.saleRuleModel.afterDay == 0">
                            <Form-item :label="$t('saleTodayTime')+':'"><!--当日票可售时间-->
                                <div>
                                    {{detail.productPolicy.todaySaleStartTime | contentFilter}}~{{detail.productPolicy.todaySaleEndTime | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <div>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('playDeadline')+':'"><!--游玩期限-->
                                <div v-w-title="`${detail.productPolicy.playRuleModel.startTime}~${detail.productPolicy.playRuleModel.endTime}`">
                                    {{detail.productPolicy.playRuleModel.startTime}}~{{detail.productPolicy.playRuleModel.endTime}}
                                </div>
                            </Form-item>
                        </i-col>
                        <!--游玩期限 = 指定期间可售-->
                        <i-col span="12">
                            <Form-item :label="$t('weekPlay')+':'"><!--每周可玩日期-->
                                <div>
                                    {{showWeek(detail.productPolicy.playRuleModel.weekSold) | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <!--游玩期限 = 指定日期可售-->
                    <i-row v-if="detail.productPolicy.playRuleModel.type === 'specifiedDateSold'">
                        <i-col span="12">
                            <Form-item :label="$t('specifiedDateSold')+':'"><!--指定日期-->
                                <div>
                                    {{(detail.productPolicy.playRuleModel.specifiedTime.split(',')).join('、') | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('checkinTime')+':'"><!--入园时间控制-->
                                <div>{{detail.productPolicy.checkinTime | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('delayValidTime')+':'"><!--下单后延迟生效-->
                                <div>{{detail.productPolicy.delayValidTime | contentFilter}} <span class="split">{{$t('minute')}}</span></div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>

                    </i-row>
                </div>

                <!-- 产品列表 -->
                <div class="divider-header">
                    <span>{{$t('productList')}}</span>
                </div>

                <table-com
                    v-if="detail && detail.policyItems"
                    auto-height
                    :table-com-min-height="260"
                    :column-data="productColumn"
                    :table-data="detail.policyItems"
                    :border="false">
                    <el-table-column
                        slot="column1"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip>
                        <template v-if="manageOrgs.nodeType !== 'partner'" slot-scope="scope">
                            <span>{{scope.row.standardPrice | moneyFilter | contentFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column2"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.settlePrice | moneyFilter | contentFilter}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column3"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.stockNum | contentFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column4"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <template v-if="scope.row.isDeleted === 'false'">
                                <span v-if="scope.row.productStatus === 'enabled'" class="status-recharge pass">{{$t('startingUse')}}</span><!--已启用-->
                                <span v-else-if="scope.row.productStatus === 'auditing'" class="status-recharge reject">{{$t('checking')}}</span><!--审核中-->
                                <span v-else-if="scope.row.productStatus === 'rejected'" class="status-recharge pending">{{$t('rejected')}}</span><!--已驳回-->
                                <span v-else-if="scope.row.productStatus === 'not_enabled'" class="status-recharge pending">{{$t('unStarting')}}</span><!--未启用-->
                                <span v-else>-</span>
                            </template>
                            <span v-if="scope.row.isDeleted === 'true'">{{$t('deletedField', { field : '' })}}</span>
                        </template>
                    </el-table-column>
                </table-com>

                <!-- 退改规则 -->
                <div class="divider-header">
                    <span>{{$t('returnAndAlterRule')}}</span>
                </div>

                <h3 class="table-title"><span>{{$t('returnAndAlterRule')}}:</span> {{$t(detail.productPolicy.returnRuleModel.type,{msg: $t('return')}) | contentFilter}}</h3>
                <table-com
                    v-if="detail.productPolicy.returnRuleModel.type !== 'notAllow'"
                    auto-height
                    :table-com-min-height="260"
                    :column-data="refundColumn"
                    :table-data="detail.productPolicy.returnRuleModel.rules"
                    :border="false">
                    <el-table-column
                        slot="column0"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{$t('playDate')}}{{scope.row.befPlayStart == '0' ? $t('when') : $t('before')+scope.row.befPlayStart}}{{$t('day')}}
                            <span> ~ </span>
                            {{$t('playDate')}}{{scope.row.befPlayEnd == '0' ? $t('when') : $t('before')+scope.row.befPlayEnd}}{{$t('day')}}
                        </template>
                    </el-table-column>
                </table-com>
                <p class="remark">{{$t('productCenter.refundTip1')}}</p>
                <p class="remark">{{$t('productCenter.refundTip2')}}</p>
                <p class="remark">{{$t('productCenter.refundTip3')}}</p>

                <!--改签规则-->
                <br/>
                <div class="line" v-if="detail.productPolicy && detail.productPolicy.alterRuleModel">
                   <Form label-position="right">
                       <i-row>
                           <i-col span="12">
                               <Form-item :label="$t('alterRule')+':'"><!--改签规则-->
                                   <div v-w-title="$t(detail.productPolicy.alterRuleModel.type,{msg: $t('alter')})">{{$t(detail.productPolicy.alterRuleModel.type,{msg: $t('alter')}) | contentFilter}}</div>
                               </Form-item>
                           </i-col>
                           <i-col span="12">
                               <Form-item v-if="detail.productPolicy.alterRuleModel.type !== 'notAllow'" :label="$t('lastAlterDate')+'：'"><!--最晚改签日期-->
                                   <div>{{$t('lastAlterDateDesc',{ times: detail.productPolicy.alterRuleModel.alterNum, day: detail.productPolicy.alterRuleModel.befPlayLatestDays}) | contentFilter}}</div>
                               </Form-item>
                           </i-col>
                       </i-row>
                       <i-row>
                           <i-col span="24">
                               <Form-item :label="$t('buyTicketNotes')+':'"><!--购票须知-->
                                   <div v-w-title="detail.productPolicy.buyTicketNotes">{{detail.productPolicy.buyTicketNotes | contentFilter}}</div>
                               </Form-item>
                           </i-col>
                       </i-row>
                   </Form>
                </div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom';
    import { productColumn, refundColumn } from '../child/detailConfig';
    import { mapGetters } from 'vuex';
    export default {
        components : {
            tableCom
        },
        data () {
            return {
                show : false,
                //week
                weekList : ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                //退改规则列表表头
                refundColumn : refundColumn,
                //分销详情数据
                detail : {},
                //模态框调用来源
                callFrom : '',
            };
        },
        computed : {
            ...mapGetters([
                'manageOrgs'
            ]),
            //产品列表表头
            productColumn () {
                if (this.manageOrgs.nodeType === 'partner') {
                    return productColumn.map((item) => {
                        if (item.field !== 'standardPrice') {
                            return item;
                        } else {
                            return {
                                title : '', // 景区成本价
                                minWidth : 20,
                                field : '',
                                isShow : 'false'
                            };
                        }
                    });
                } else {
                    return productColumn;
                }
            },
        },
        methods : {
            /**
             *  获取销售政策详情
             */
            getPolicyDetailData () {
                ajax.post('getPolicyInfo', {
                    allocationId : this.listItem.allocationId
                }).then((res) => {
                    if (res.success) {
                        this.detail = res.data ? res.data : {};
                    } else {
                        this.detail = {};
                    }
                    this.detail.scenicName = this.listItem.scenicName;
                    this.detail.policyDesc = this.listItem.policyDesc;
                });
            },
            /**
             * 控制弹窗显示/隐藏
             */
            toggle (data, callFrom) {
                if (data) {
                    this.listItem = data;
                    if (callFrom && callFrom === 'marketing') {
                        this.callFrom = callFrom;
                    }
                    this.getPolicyDetailData();
                } else {
                    this.callFrom = '';
                    this.listItem = {};
                }
                this.show = !this.show;
            },
            //显示星期
            showWeek ( val ) {
                if (val) {
                    let list = val.split(',');
                    return list.map(item => {
                        return this.$t(this.weekList[Number(item)]);
                    }).join('、');
                } else {
                    return '-';
                }
            },
            //关闭模态框
            hide () {
                this.toggle();
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .modal {
        /deep/ .ivu-modal-body {
            height: 500px;
            overflow: auto;
        }
    }
    .content {
        padding: 0 50px;
        margin: 0 auto;

        .form-content {
            margin: 0 auto;

            .ivu-form-item{
                margin: 0 auto;
                text-align: left;
                width: 100%;
                float: left;
                height: 30px;
                line-height: 30px;
                font-size: $font_size_14px;
                display: flex;
            }

            /deep/ .ivu-form-item-label{
                padding-left: 0;
                padding-right: 0;
                min-width: 180px;
                width: auto;
                word-wrap: break-word;

            }

            /deep/ .ivu-form-item-content{
                color: $color-666;
                /*flex: 1;*/
                display: inline-block;
                >div{
                    width: calc(100% - 180px);
                    vertical-align: middle;
                    @include overflow_tip();
                }
            }
        }
        /**
            分割线样式
        */
        .divider-header {
            margin: 29px 0 15px;
            display: table;
            position: relative;
            text-align: center;
            width: 100%;

            span {
                white-space: nowrap;
                margin: 0 6px;
                color: #333333;
                font-size: 14px;
                font-weight: bold;
            }
            &:before {
                display: table-cell;
                position: relative;
                content: "";
                border-top: 1px dashed #E1E1E1;
                width: 50%;
                transform: translateY(50%);
            }
            &:after {
                display: table-cell;
                position: relative;
                content: "";
                border-top: 1px dashed #E1E1E1;
                width: 50%;
                transform: translateY(50%);
            }
        }

        .table-title {
            padding: 5px 12px;
            line-height: 22px;
            span {
                display: inline-block;
                width: auto;
                font-weight: bold;
            }
        }

        .form-content{
            border-top: 1px dashed $color_979797_020;
            width: 85%;
            margin: 0 auto;
            padding: 20px 0;

            &:first-child{
                border-top: none;
            }

            &.line{
                border-top: none;
                padding-top: 0px;
            }

            .ivu-input-icon{
                z-index: 2;
            }

            .ivu-form-item{
                margin: 0 auto;
                text-align: left;
                width: auto;
                float: left;
                margin-right: 10px;
                height: 30px;
                line-height: 30px;
                font-size: $font_size_14px;
                display: flex;
            }

            /deep/ .ivu-form-item-label{
                padding-left: 0;
                padding-right: 0;
                width: 220px;
            }

            /deep/ .ivu-form-item-content{
                color: $color-666;
                /*flex: 1;*/
                display: inline-block;
                width: calc(100% - 220px);
                >div{
                    vertical-align: middle;
                    @include overflow_tip();
                }
            }

            /deep/ .ivu-checkbox-wrapper{
                margin-right: 24px;
                &:last-child{
                    margin-right: 0;
                }
            }

            /deep/ .ivu-checkbox{
                margin-right: 5px;
            }

            .label{
                margin-right: 5px;
            }

            /deep/ .ivu-timeline{
                text-align: left;
                padding-left: 12%;
                color: $color_666;

                .time{
                    color: $color_999;
                }
                .name{
                    color: $color_3F3F3F;
                    margin-right: 5px;
                }
            }

            /deep/ .ivu-timeline-item-head{
                background-color: $color_DFDFDF;
                width: 10px;
                height: 10px;
            }

            /deep/ .ivu-timeline-item-tail{
                left: 5px;
            }

        }
        .item-content {
            word-wrap: break-word
        }

        .line {
            margin-top: 20px;
        }

        .status-recharge {
            position: relative;
            padding-left: 14px;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 6px;
                height: 6px;
                border-radius: 50px;
            }
        }
        .pass:after {
            background: $color_green;
        }
        .pending:after {
            background: $color_BBC5D5;
        }
        .reject:after {
            background: $color_red;
        }
    }


    .modal-footer{
        /deep/ .ivu-btn{
            padding: 5px 30px;
        }
    }

    .remark {
        margin-top: 5px;
        color: $color_yellow;
        &:last-child {
            margin-bottom: 20px;
        }
    }
</style>
