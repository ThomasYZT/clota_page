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
                <span>{{$t('marketingPolicy')}}</span>
                <span class="blue-span" @click="showDetailModal">{{$t('viewDetail')}}</span>
            </div>

            <!--表单信息-->
            <Form ref="formValidate"
                  :model="detail">

                <!--基本信息-->
                <title-temp title="basicInfo"></title-temp>
                <div class="form-content">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('productName')+'：'"><!--产品名称-->
                                <div v-w-title="detail.productName">{{detail.productName | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('scenePrice')+'：'"><!--景区成本价-->
                                <div>{{detail.standardPrice | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('thirdProductNo')+'：'"><!--第三方产品编码-->
                                <div v-w-title="detail.thirdCode">{{detail.thirdCode | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('productDesc')+'：'"><!--产品描述-->
                                <div v-w-title="detail.productDes">{{detail.productDes | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

            </Form>

        </div>

        <div class="footer">
            <template v-if="detail.auditStatus === 'auditing'">
                <Button type="primary"
                        @click="submit">{{$t('commitCheck')}}</Button><!--提交审核-->
                <Button type="ghost"
                        @click="modify">{{$t('modify')}}</Button><!--修  改-->
            </template>
            <Button type="primary">{{$t('disabled')}}</Button><!--禁用-->
            <Button type="ghost">{{$t('checkPass')}}</Button><!--审核通过-->
            <Button type="ghost">{{$t('reject')}}</Button><!--驳回-->
            <Button type="ghost">{{$t('revocation')}}</Button><!--撤回-->
            <Button type="ghost">{{$t('back')}}</Button><!--返回-->
        </div>

    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import {parkColumn} from './parkConfig';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            titleTemp,
            tableCom,
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
                    "auditStatus": "auditing",
                    "code": "1039754625290473472",
                    "companyId": null,
                    "createdTime": "2018-09-12 13:56:35",
                    "productId": "1039754623965073408",
                    "inNum": "3",
                    "isGroup": "true",
                    "orgId": "1037976274619994113",
                    "printName": "打印名称-李瑜测试产品1",
                    "printPrice": "120",
                    "printRemark": "打印说明",
                    "printTpl": "",
                    "productDes": "李瑜测试产品1描述",
                    "productName": "李瑜测试产品1",
                    "productType": "ticket",
                    "standardPrice": "100",
                    "thirdCode": "123456789",
                    "ticketRemark": "票面说明",
                    "acceptIdType": "identity",
                    "createUser": "1",
                    "saleRuleId": "1039754623965073409",
                    "idLimit": "{\"day\":\"5\",\"quantity\":\"5\"}",
                    "maxNum": "100",
                    "minNum": "10",
                    "mobileLimit": "{\"day\":\"5\",\"quantity\":\"5\"}",
                    "needAllId": "",
                    "needId": "noRequired",
                    "stockNum": "10000",
                    "stockType": "is_no_limit",
                    "updateUser": null,
                    "productEffSet": "since_the_play",
                    "updatedTime": "2018-09-12 13:56:35",
                    "productPlayRuleVo": [
                        {
                            "checkPoint": [
                                {
                                    "checkId": "1037982966690746369",
                                    "checkType": "garden",
                                    "createUser": "1",
                                    "createdTime": "2018-09-12 13:56:35",
                                    "dayTimes": "2",
                                    "id": "1039754624908791808",
                                    "isDeleted": "false",
                                    "orgId": "1037976274619994113",
                                    "parkId": "1037976274619994113",
                                    "playRuleId": "1039754623965073410",
                                    "playType": "required",
                                    "productId": "1039754623965073408",
                                    "sumTimes": "7",
                                    "updateUser": null,
                                    "updatedTime": "2018-09-12 13:56:35"
                                }
                            ],
                            "checkPoints": null,
                            "createUser": "1",
                            "createdTime": "2018-09-12 13:56:35",
                            "effDay": 1,
                            "effTimes": 1,
                            "fingerCheck": "true",
                            "id": "1039754623965073410",
                            "itemCheckTimes": "10",
                            "orgId": "1037976274619994113",
                            "parkId": "1037976274619994113",
                            "parkName": "魔法花园",
                            "productId": "1039754623965073408",
                            "saleType": "one_ticket",
                            "updateUser": null,
                            "updatedTime": "2018-09-12 13:56:35"
                        }
                    ],
                },
                //日志列表
                logList: [
                    { name : '张三', time: '2018/07/01  12:00', desc: '提交了审核' },
                    { name : '李四', time: '2018/07/01  12:00', desc: '审核通过，启用产品' },
                ],
                //可游玩园区表头
                columnData: parkColumn,
                //可游玩园区表格数据
                tableData: [{}],
            }
        },
        methods: {


            /**
             * 查看可游玩园区详情
             */
            viewParkDetail ( data ) {
                console.log(data)
//                this.$refs.viewPark.show({
//                    data: data,
//                    title : this.$t('check')+this.$t(data.saleType),
//                    type: 'check',
//                    confirmCallback : () => {
//                        //push to tableData
//                        debugger
//                        console.log(true)
//                    }
//                });
            },

            //提交审核
            submit () {

            },

            //查看详情
            showDetailModal () {
                this.$router.push({
                    name: 'addTicket',
                    params: {
                        type: 'modify',
                        info: this.detail,
                    }
                })
            },

            /**
             * 获取路由信息
             */
            getParams(params) {
                if(params && Object.keys(params).length > 0){
//                    this.detail = params.info;
                    //根据产品Id查明细

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
                width: 85%;
                margin: 0 auto;

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
