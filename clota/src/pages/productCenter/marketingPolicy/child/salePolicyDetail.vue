<!--
内容：产品列表 - 销售政策列表 - 销售政策详情
作者：
日期：
-->

<template>
    <div class="sale-policy-detail">

        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="$t('marketingPolicyDetail')">
        </bread-crumb-head>

        <div class="container">

            <div class="title-wrap">
                <span>{{$t('marketingPolicyDetail')}}</span>
            </div>

            <!--表单信息-->
            <Form ref="formValidate"
                  :model="detail">

                <div class="form-content">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('salePolicyName')+'：'"><!--销售政策名称-->
                                <div v-w-title="detail.productPolicy.name">{{detail.productPolicy.name | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('desc')+'：'"><!--描述-->
                                <div v-w-title="detail.productPolicy.policyDesc">{{detail.productPolicy.policyDesc | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('policyValidity')+'：'"><!--政策可售期-->
                                <div v-w-title="$t(detail.productPolicy.saleRuleModel.type)">{{$t(detail.productPolicy.saleRuleModel.type) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('aheadDays')+'：'"><!--提前天数（M）-->
                                <div>
                                    {{detail.productPolicy.saleRuleModel.beforeDay | contentFilter}} {{$t('To')}} {{detail.productPolicy.saleRuleModel.afterDay | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('saleDayTime')+'：'"><!--每日可售时间-->
                                <div>
                                    {{detail.productPolicy.saleStartTime | contentFilter}} ~ {{detail.productPolicy.saleEndTime | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('saleTodayTime')+'：'"><!--当日票可售时间-->
                                <div>
                                    {{detail.productPolicy.todaySaleStartTime | contentFilter}} ~ {{detail.productPolicy.todaySaleEndTime | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <div class="form-content">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('playDeadline')+'：'"><!--游玩期限-->
                                <div v-w-title="$t(detail.productPolicy.playRuleModel.type)">{{$t(detail.productPolicy.playRuleModel.type) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('specifiedTime')+'：'"><!--指定起止日期-->
                                <div>{{detail.productPolicy.playRuleModel.specifiedTime | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('weekSold')+'：'"><!--每周可玩日期-->
                                <div v-w-title="detail.productPolicy.playRuleModel.weekSold">
                                    {{showWeek(detail.productPolicy.playRuleModel.weekSold) | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('checkinTime')+'：'"><!--入园时间控制-->
                                <div>{{detail.productPolicy.checkinTime | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('delayValidTime')+'：'"><!--下单后延迟生效-->
                                <div>{{detail.productPolicy.delayValidTime | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('saleTodayTime')+'：'"><!--当日票可售时间-->
                                <div>
                                    {{detail.productPolicy.todaySaleStartTime | contentFilter}} ~ {{detail.productPolicy.todaySaleEndTime | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <!--产品列表-->
                <div class="form-content" :style="{height: detail.policyItems.length > 0 ? (detail.policyItems.length + 1) * 50 + 80+'px' : '280px'}">
                    <Form-item :label="$t('productList')+'：'"><!--产品列表-->
                        <div>
                            <table-com
                                :table-com-min-height="260"
                                :column-data="productColumn"
                                :table-data="detail.policyItems"
                                :border="false">
                                <el-table-column
                                    slot="column3"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{$t(scope.row.stockType)+scope.row.stockNum | contentFilter}}
                                    </template>
                                </el-table-column>
                            </table-com>
                        </div>
                    </Form-item>
                </div>

                <!--销售渠道-->
                <div class="form-content line" :style="{height: (detail.policyChannels.length + 1) * 50 + 60+'px'}">
                    <Form-item :label="$t('saleChannels')+'：'"><!--销售渠道-->
                        <div>
                            <table-com
                                :table-com-min-height="260"
                                :column-data="saleChannelColumn"
                                :table-data="detail.policyChannels"
                                :border="false">
                            </table-com>
                        </div>
                    </Form-item>
                </div>

                <!--全民营销 暂时隐藏-->
                <!--<div class="form-content line" :style="{height: (detail.productList.length + 1) * 50 + 80+'px'}">
                    <Form-item :label="$t('allPeopleMarket')+'：'">&lt;!&ndash;全民营销&ndash;&gt;
                        <div>
                            <table-com
                                :ofsetHeight="755"
                                :show-pagination="true"
                                :table-com-min-height="260"
                                :column-data="marketingColumn"
                                :table-data="detail.productList"
                                :border="false">
                            </table-com>
                        </div>
                    </Form-item>
                </div>-->

                <!--退改规则-->
                <div class="form-content" :style="{height: (detail.productPolicy.returnRuleModel.rules.length + 1) * 50 + 50+'px'}">
                    <Form-item :label="$t('returnAndAlterRule')+'：'"><!--退改规则-->
                        <div>
                            <span>{{$t(detail.productPolicy.returnRuleModel.type,{msg: $t('return')}) | contentFilter}}</span>
                            <table-com
                                :ofsetHeight="755"
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
                        </div>
                    </Form-item>
                </div>

                <br/>
                <div class="form-content line">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('alterRule')+'：'"><!--改签规则-->
                                <div v-w-title="$t(detail.productPolicy.alterRuleModel.type,{msg: $t('alter')})">{{$t(detail.productPolicy.alterRuleModel.type,{msg: $t('alter')}) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('lastAlterDate')+'：'"><!--最晚改签日期-->
                                <div>{{$t('lastAlterDateDesc',{ times: detail.productPolicy.alterRuleModel.alterNum, day: detail.productPolicy.alterRuleModel.befPlayLatestDays}) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('购票须知')+'：'"><!--购票须知-->
                                <div v-w-title="detail.productPolicy.buyTicketNotes">{{detail.productPolicy.buyTicketNotes | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

            </Form>

        </div>

        <div class="footer">
            <!--已驳回-->
            <template v-if="detail.productPolicy.auditStatus === 'rejected' || detail.productPolicy.auditStatus === 'not_enabled'">
                <Button type="primary"
                        @click="auditProduct('enabled')">{{$t('commitCheck')}}</Button><!--提交审核-->
                <Button type="ghost"
                        @click="modify">{{$t('modify')}}</Button><!--修  改-->
            </template>
            <!--已启用-->
            <template v-if="detail.productPolicy.auditStatus === 'enabled'">
                <Button type="primary" @click="auditProduct('not_enabled')">{{$t('disabled')}}</Button><!--禁用-->
            </template>
            <!--待审核-->
            <template v-if="detail.productPolicy.auditStatus === 'auditing'">
                <Button type="primary" @click="auditProduct('enabled')">{{$t('checkPass')}}</Button><!--审核通过-->
            </template>
            <Button type="ghost" @click="goBack">{{$t('back')}}</Button><!--返回-->
            <!--待审核--填写备注-->
            <!--<template v-if="detail.productPolicy.auditStatus === 'auditing'">-->
                <!--<span class="blue" @click="showRemarkModal">{{$t('填写备注')}}</span>-->
            <!--</template>-->
        </div>

        <!--新增备注弹窗-->
        <add-remark-modal ref="addRemarkModal"></add-remark-modal>

    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import addRemarkModal from '../../components/addRemarkModal.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import {productColumn, saleChannelColumn, marketingColumn, refundColumn} from './detailConfig';
    import ajax from '@/api/index';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            titleTemp,
            tableCom,
            addRemarkModal,
        },
        data () {
            return {
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'marketingPolicy',   // 产品列表--票类列表
                        router: 'marketingPolicy',
                    }
                ],
                //week
                weekList: ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                //详情数据
                detail: {},
                //产品列表表头
                productColumn: productColumn,
                //销售渠道表头
                saleChannelColumn: saleChannelColumn,
                //全民营销表头
                marketingColumn: marketingColumn,
                //退票表头
                refundColumn: refundColumn,
                //备注
                remark: '',
            }
        },
        methods: {

            //显示星期
            showWeek ( val ) {
                if(val){
                    let list = val.split(',');
                    return list.map(item => {
                        return this.$t(this.weekList[Number(item)])
                    }).join('、');
                }else{
                    return '-'
                }
            },

            //修改
            modify () {
                this.$router.push({
                    name: 'editSalePolicy',
                    params: {
                        type: 'modify',
                        info: this.detail,
                    }
                })
            },

            //审核操作
            auditProduct ( status ) {
                ajax.post('modifyPolicyStatus',{
                    policyIds: ids,
                    status: status,
                    remark: this.remark,
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('updateStatus') + this.$t('success'));
                        //获取销售政策详情（包含销售组、产品）
                        this.findProductById(this.detail.productPolicy);
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            //获取销售政策详情（包含销售组、产品）
            getPolicyInfo ( data ) {
                ajax.post('getPolicyInfo', {
                    allocationId: data.allocationId
                }).then(res => {
                    if(res.success){
                        this.detail = res.data || {};
                    } else {
                        this.detail = {};
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            //显示备注弹窗
            showRemarkModal () {
                this.$refs.addRemarkModal.show({
                    data: {remark: this.remark},
                    confirmCallback : ( msg ) => {
                        console.log(msg);
                        this.remark = msg;
                    }
                });
            },

            //返回
            goBack() {
                this.$router.back();
            },

            /**
             * 获取路由信息
             */
            getParams(params) {
                if(params && Object.keys(params).length > 0){
                    //获取销售政策详情（包含销售组、产品）
                    if( params.info ){
                        this.getPolicyInfo( params.info );
                    }
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .sale-policy-detail{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .container{

            .title-wrap{
                padding: 15px 35px 0px;
                font-size: $font_size_20px;
                color: $color_000_085;

                .blue-span{
                    float: right;
                    font-size: $font_size_14px;
                    color: $color_blue;
                    cursor: pointer;
                    .iconfont{
                        margin-right: 5px;
                        font-size: $font_size_14px;
                    }
                }

            }

            .ivu-form{
                padding: 0 0 50px;
                text-align: center;
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
                    width: 100%;
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
                    flex: 1;
                    display: inline-block;
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

        }

        .footer{
            @include block_outline($height: 60px);
            @include absolute_pos($position: absolute, $bottom: 0);
            text-align: center;
            box-shadow: 0 -1px 10px 0 rgba(0,0,0,0.10);
            line-height: 58px;
            background-color: $color_fff;
            z-index: 1;

            /deep/ .ivu-btn {
                min-width: 108px;
                margin-right: 15px;
            }
        }
    }
</style>
