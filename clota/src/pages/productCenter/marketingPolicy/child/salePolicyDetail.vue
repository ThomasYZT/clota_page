<!--
内容：产品列表 - 销售政策列表 - 销售政策详情
作者：
日期：
-->

<template>
    <div class="ticket-detail">

        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="$t('marketingPolicyDetail')">
        </bread-crumb-head>

        <div class="container">

            <div class="title-wrap">
                <span>{{$t('销售政策详情')}}</span>
            </div>

            <!--表单信息-->
            <Form ref="formValidate"
                  :model="detail">

                <div class="form-content">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('销售政策名称')+'：'"><!--销售政策名称-->
                                <div v-w-title="detail.productPolicy.name">{{detail.productPolicy.name | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('描述')+'：'"><!--描述-->
                                <div v-w-title="detail.productPolicy.policyDesc">{{detail.productPolicy.policyDesc | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('政策可售期')+'：'"><!--政策可售期-->
                                <div v-w-title="$t(detail.productPolicy.saleRuleModel.type)">{{$t(detail.productPolicy.saleRuleModel.type) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('提前天数（M）')+'：'"><!--提前天数（M）-->
                                <div>
                                    {{detail.productPolicy.saleRuleModel.beforeDay | contentFilter}} {{$t('To')}} {{detail.productPolicy.saleRuleModel.afterDay | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('每日可售时间')+'：'"><!--每日可售时间-->
                                <div>
                                    {{detail.productPolicy.saleStartTime | contentFilter}} ~ {{detail.productPolicy.saleEndTime | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('当日票可售时间')+'：'"><!--当日票可售时间-->
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
                            <Form-item :label="$t('游玩期限')+'：'"><!--游玩期限-->
                                <div v-w-title="$t(detail.productPolicy.playRuleModel.type)">{{$t(detail.productPolicy.playRuleModel.type) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('指定起止日期')+'：'"><!--指定起止日期-->
                                <div>{{detail.productPolicy.playRuleModel.specifiedTime | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('每周可玩日期')+'：'"><!--每周可玩日期-->
                                <div v-w-title="detail.productPolicy.playRuleModel.weekSold">{{detail.productPolicy.playRuleModel.weekSold | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('入园时间控制')+'：'"><!--入园时间控制-->
                                <div>{{detail.productPolicy.checkinTime | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('下单后延迟生效')+'：'"><!--下单后延迟生效-->
                                <div>{{detail.productPolicy.delayValidTime | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('当日票可售时间')+'：'"><!--当日票可售时间-->
                                <div>
                                    {{detail.productPolicy.todaySaleStartTime | contentFilter}} ~ {{detail.productPolicy.todaySaleEndTime | contentFilter}}
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <!--产品列表-->
                <div class="form-content" :style="{height: detail.policyItems.length > 0 ? (detail.policyItems.length + 1) * 50 + 80+'px' : '280px'}">
                    <Form-item :label="$t('产品列表')+'：'"><!--产品列表-->
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
                    <Form-item :label="$t('销售渠道')+'：'"><!--销售渠道-->
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
                    <Form-item :label="$t('全民营销')+'：'">&lt;!&ndash;全民营销&ndash;&gt;
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
                    <Form-item :label="$t('退改规则')+'：'"><!--退改规则-->
                        <div>
                            <span>{{$t(detail.productPolicy.returnRuleModel.type) | contentFilter}}</span>
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
                                       {{$t('游玩日期')}}{{scope.row.befPlayStart == '0' ? '当' : '前'+scope.row.befPlayStart}}{{$t('天')}}
                                       <span> ~ </span>
                                       {{$t('游玩日期')}}{{scope.row.befPlayStart == '0' ? '当' : '前'+scope.row.befPlayEnd}}{{$t('天')}}
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
                            <Form-item :label="$t('改签规则')+'：'"><!--改签规则-->
                                <div v-w-title="$t(detail.productPolicy.alterRuleModel.type)">{{$t(detail.productPolicy.alterRuleModel.type) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('最晚改签日期')+'：'"><!--最晚改签日期-->
                                <div>{{$t('游玩日期前10天可改签次数1次',{ times: detail.productPolicy.alterRuleModel.alterNum, day: detail.productPolicy.alterRuleModel.befPlayLatestDays}) | contentFilter}}</div>
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
                //type add/modify
                type: 'add',
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'marketingPolicy',   // 产品列表--票类列表
                        router: 'marketingPolicy',
                    }
                ],
                //详情数据
                detail: {
                    //销售组列表
                    "policyChannels":[
                        {
                            "allocationId":"1040526354644340736",
                            "createUser":"1037976274619994112",
                            "createdTime":"2018-09-14 17:03:10",
                            "groupId":"1040477916850425856",
                            "groupName":"xt优质销售组1",
                            "groupchannels":"xt销售渠道1,xt销售渠道2,",
                            "id":"1040526354963107840",
                            "isDeleted":"false",
                            "policyId":"1040526353243443200",
                            "updateUser":"1037976274619994112",
                            "updatedTime":"2018-09-14 17:03:10"
                        },
                        {
                            "allocationId":"1040526354644340736",
                            "createUser":"1037976274619994112",
                            "createdTime":"2018-09-14 17:03:10",
                            "groupId":"1040478245901963264",
                            "groupName":"xt普通销售组2",
                            "groupchannels":"xt销售渠道3,xt销售渠道4,",
                            "id":"1040526355269292032",
                            "isDeleted":"false",
                            "policyId":"1040526353243443200",
                            "updateUser":"1037976274619994112",
                            "updatedTime":"2018-09-14 17:03:10"
                        }
                    ],
                    //产品列表
                    "policyItems":[
                        {
                            allocationId: "1040526354644340736",
                            createUser: "1037976274619994112",
                            createdTime: "2018-09-14 17:03:10",
                            id: "1040526355575476224",
                            isDeleted: "false",
                            itemRule: null,
                            policyId: "1040526353243443200",
                            printPrice: null,
                            productId: "1040508543163305984",
                            productName: "xt测试产品1",
                            settlePrice: 150,
                            standardPrice: "100.00",
                            stockNum: "10000",
                            stockType: "total",
                            updateUser: "1037976274619994112",
                            updatedTime: "2018-09-14 17:03:10",
                        },
                        {
                            allocationId: "1040526354644340736",
                            createUser: "1037976274619994112",
                            createdTime: "2018-09-14 17:03:10",
                            id: "1040526355885854720",
                            isDeleted: "false",
                            itemRule: null,
                            policyId: "1040526353243443200",
                            printPrice: null,
                            productId: "1040508701972238336",
                            productName: "xt测试产品2111111",
                            settlePrice: 180,
                            standardPrice: "101.00",
                            stockNum: "5000",
                            stockType: "total",
                            updateUser: "1037976274619994112",
                            updatedTime: "2018-09-14 17:03:10",
                        }
                    ],
                    //销售政策信息
                    "productPolicy":{
                        //改签规则
                        "alterRuleModel":{
                            "alterNum":"1",//最晚改签日期（游玩日期前N天）
                            "befPlayLatestDays":"2",//最晚改签日期（游玩日期前N天）
                            "type":"noAudit" //改签类型（不允许-notAllow,需要审核-needAudit,不审核-noAudit）
                        },
                        //游玩规则
                        "playRuleModel":{
                            "afterDay":null,
                            "beforeDay":null,
                            "endTime":"2018-10-31",
                            "specifiedTime":"2018-10-12,2018-10-18",//指定时间（例：2018-10-12,2018-10-18）
                            "startTime":"2018-10-01",
                            "type":"specifiedPeriodSold", //期限类型（指定期间-specifiedPeriodSold，指定日期-specifiedDateSold）
                            "validDates":null,
                            "weekSold":"1,2,3,4,5,6,7"//指定周数（例：1,2,3,4,5,6,7）
                        },
                        //退票规则
                        "returnRuleModel":{
                            "rules":[
                                {
                                    "befPlayStart": "0",//游玩日期前起始天（0代表当天）
                                    "befPlayEnd": "0",//游玩日期前截止天（0代表当天）
                                    "procedureRates": "2"//手续费率
                                },
                                {
                                    "befPlayEnd":"7",
                                    "befPlayStart":"1",
                                    "procedureRates":"0.1"
                                }
                            ],
                            "type":"noAudit" //退票类型（不允许-notAllow,需要审核-needAudit,不审核-noAudit ）
                        },
                        //销售规则
                        "saleRuleModel":{
                            "afterDay":null,
                            "beforeDay":null,
                            "endTime":"2018-09-30",
                            "specifiedTime":"",//指定时间（例：2018-10-12,2018-10-18）
                            "startTime":"2018-09-01",
                            "type":"specifiedPeriodSold", //期限类型（游玩日期前M天可售-playBeforeSold，指定期间-specifiedPeriodSold，指定日期-specifiedDateSold）
                            "validDates":null,
                            "weekSold":"1,2,3,4,5"//指定周数（例：1,2,3,4,5,6,7）
                        },
                        "auditStatus":"auditing",//审核状态 auditing-审核中，rejected-已驳回，not_enabled-未启用，enabled-已启用
                        "checkinTime":"09:00-18:00",//入园时间范围；格式：mm:ss-mm:ss
                        "delayValidTime":"5",//下单延迟生效时间（分钟）
                        "id":"1040526353243443200",//政策ID
                        "name":"xt销售政策1",//政策名称
                        "orgId":"1037976274619994113",//所属机构ID
                        "policyDesc":"xt销售政策1说明43454345",//描述
                        "productType":"ticket",//业态类型 ticket-票类，repast-餐饮，hotel-酒店，ticket_package-套票
                        "saleEndTime":"20:00",//每日可售结束时间；格式：mm:ss
                        "saleStartTime":"08:00",//每日可售开始时间；格式：mm:ss
                        "todaySaleEndTime":"18:00",//当日票可售结束时间；格式：mm:ss
                        "todaySaleStartTime":"09:00",//当日票可售开始时间；格式：mm:ss
                        "isDeleted":"false",
                        "buyTicketNotes": "购票须知",//购票须知
                        "createUser":"1037976274619994112",
                        "createdTime":"2018-09-14 17:03:09",
                        "productPolicyPlayRule":{
                            "afterDay":null,
                            "beforeDay":null,
                            "endTime":"2018-10-31",
                            "specifiedTime":"",
                            "startTime":"2018-10-01",
                            "type":"specifiedPeriodSold",
                            "validDates":null,
                            "weekSold":"1,2,3,4,5,6,7"
                        },
                        "productPolicySoldRule":{
                            "afterDay":null,
                            "beforeDay":null,
                            "endTime":"2018-09-30",
                            "specifiedTime":"",
                            "startTime":"2018-09-01",
                            "type":"specifiedPeriodSold",
                            "validDates":null,
                            "weekSold":"1,2,3,4,5"
                        },
                        "alterRule":"{\"type\":\"noAudit\",\"befPlayLatestDays\":\"2\",\"alterNum\":\"1\"}",
                        "playRule":"{\"type\":\"specifiedPeriodSold\",\"beforDay\":\"\",\"afterDay\":\"\",\"startTime\":\"2018-10-01\",\"endTime\":\"2018-10-31\",\"weekSold\":\"1,2,3,4,5,6,7\",\"specifiedTime\":\"\"}",
                        "returnRule":"{\"type\":\"noAudit\",\"rules\":[{\"befPlayStart\":\"0\",\"befPlayEnd\":\"0\",\"procedureRates\":\"0.2\"},{\"befPlayStart\":\"1\",\"befPlayEnd\":\"7\",\"procedureRates\":\"0.1\"}]}",
                        "saleRule":"{\"type\":\"specifiedPeriodSold\",\"beforDay\":\"\",\"afterDay\":\"\",\"startTime\":\"2018-09-01\",\"endTime\":\"2018-09-30\",\"weekSold\":\"1,2,3,4,5\",\"specifiedTime\":\"\"}",
                        "updateUser":"1037976274619994112",
                        "updatedTime":"2018-09-14 17:03:09"
                    },
                },

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

    .ticket-detail{
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
