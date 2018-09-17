<!--
内容：产品列表 - 票类列表 - 票类详情
作者：
日期：
-->

<template>
    <div class="ticket-detail">

        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="$t('ticketDetail')">
        </bread-crumb-head>

        <div class="container">

            <div class="title-wrap">
                <span>{{$t('ticketDetail')}}</span>
                <span class="yellow-span">{{$t('待审核')}}</span>
                <span class="green-span">{{$t('已启用')}}</span>
                <span class="red-span">{{$t('已驳回')}}</span>
                <span class="blue-span" @click="modify"><i class="iconfont icon-edit"></i>{{$t('modify')}}</span>
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
                            <Form-item :label="$t('standardPrice')+'：'"><!--景区成本价-->
                                <div>{{detail.standardPrice | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('thirdCode')+'：'"><!--第三方产品编码-->
                                <div v-w-title="detail.thirdCode">{{detail.thirdCode | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('productDes')+'：'"><!--产品描述-->
                                <div v-w-title="detail.productDes">{{detail.productDes | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <!--票面信息-->
                <title-temp title="ticketInfo"></title-temp>
                <div class="form-content">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('printName')+'：'"><!--打印名称-->
                                <div v-w-title="detail.printName">{{detail.printName | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('printPrice')+'：'"><!--票面价格-->
                                <div>{{detail.printPrice | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('ticketRemark')+'：'"><!--票面说明-->
                                <div v-w-title="detail.ticketRemark">{{detail.ticketRemark | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('printRemark')+'：'"><!--打印说明-->
                                <div v-w-title="detail.printRemark">{{detail.printRemark | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <!--购买限制-->
                <title-temp title="buyLimit"></title-temp>
                <div class="form-content">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('isGroup')+'：'"><!--是否团队产品-->
                                <div>{{detail.isGroup === 'true' ? $t('yes') : $t('no') }}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('inNum')+'：'"><!--可入园人数-->
                                <div>{{detail.inNum | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('minOrderNum')+'：'"><!--每订单最小起订数-->
                                <div>{{detail.minNum | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('maxOrderNum')+'：'"><!--每订单最大限订数-->
                                <div>{{detail.maxNum | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('needId')+'：'"><!--预定时提交身份信息-->
                                <div v-w-title="$t(detail.needId)">{{$t(detail.needId)}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row v-if="detail.needId !== 'noRequired'">
                        <i-col span="24">
                            <Form-item :label="$t('idType')+'：'"><!--可接受证件类型-->
                                <template v-if="detail.acceptIdType">
                                    <CheckboxGroup v-model="detail.acceptIdType.split(',')">
                                        <Checkbox v-for="(item,index) in detail.acceptIdType.split(',')"
                                                  disabled :key="index" :label="item">
                                            {{$t(item)}}
                                        </Checkbox>
                                    </CheckboxGroup>
                                </template>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('limitById')+'：'"><!--身份证购票限制-->
                                <div>
                                    <span class="label">{{detail.idLimit ? JSON.parse(detail.idLimit).day : '-'}}</span>
                                    <span class="label">{{$t('maxBuy')}}</span>
                                    <span class="label">{{detail.idLimit ? JSON.parse(detail.idLimit).quantity : '-'}}</span>
                                    <span>{{$t('paper')}}</span>
                                </div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('limitByMobile')+'：'"><!--手机号购票限制-->
                                <div>
                                    <span class="label">{{detail.mobileLimit ? JSON.parse(detail.mobileLimit).day : '-'}}</span>
                                    <span class="label">{{$t('maxBuy')}}</span>
                                    <span class="label">{{detail.mobileLimit ? JSON.parse(detail.mobileLimit).quantity : '-'}}</span>
                                    <span>{{$t('paper')}}</span>
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('stockType')+'：'"><!--限制库存-->
                                <div v-w-title="$t(detail.stockType)">{{ $t(detail.stockType) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('stockNum')+'：'"><!--库存数量-->
                                <div>{{ detail.stockNum | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <!--产品有效性-->
                <title-temp title="productEffect"></title-temp>
                <div class="form-content">
                    <i-row>
                        <i-col span="11">
                            <Form-item :label="$t('productEffSet')+'：'"><!--产品有效性设置-->
                                <div v-w-title="$t(detail.productEffSet)">{{$t(detail.productEffSet) | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <!--游玩规则-->
                <title-temp title="playRule"></title-temp>
                <div class="form-content" :style="{height: productPlayRuleVo.length > 0 ? (productPlayRuleVo.length + 1) * 50 + 20+'px' : '240px'}">
                    <br/>
                    <Form-item :label="$t('playPark')+'：'"><!--可游玩园区-->
                        <div>
                            <table-com
                                :ofsetHeight="755"
                                :table-com-min-height="260"
                                :column-data="columnData"
                                :table-data="productPlayRuleVo"
                                :border="false">
                                <el-table-column
                                    slot="column3"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="normal" @click="viewParkDetail(scope.row)">{{$t('check')}}</li><!--查看-->
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </div>
                    </Form-item>
                </div>

                <!--产品日志-->
                <title-temp title="productLog"></title-temp>
                <div class="form-content">
                    <Timeline>
                        <TimelineItem v-for="(item,index) in logList" :key="index" color="#DFDFDF">
                            <p class="time">{{item.time}}</p>
                            <p class="content"><span class="name">{{item.name}}</span>{{item.desc}}</p>
                        </TimelineItem>
                    </Timeline>
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

        <!--查看园区-->
        <edit-park-modal ref="viewPark"></edit-park-modal>

    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editParkModal from './editParkModal.vue'
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import {parkColumn} from './parkConfig';
    import ajax from '@/api/index';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            titleTemp,
            tableCom,
            editParkModal,
        },
        data () {
            return {
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'ticketType',   // 产品列表--票类列表
                        router: 'ticketType',
                    }
                ],
                //详情数据
                detail: {},
                //产品园区列表数据
                productPlayRuleVo: [
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
                this.$refs.viewPark.show({
                    data: data,
                    title : this.$t('check')+this.$t(data.saleType),
                    type: 'check',
                    confirmCallback : () => {
                        //push to tableData
                        debugger
                        console.log(true)
                    }
                });
            },

            //提交审核
            submit () {

            },

            //修改
            modify () {
                this.$router.push({
                    name: 'addTicket',
                    params: {
                        type: 'modify',
                        info: this.detail,
                    }
                })
            },

            // 根据产品Id查明细
            findProductById( data ) {
                ajax.post('findProductById', {
                    productId: data.id
                }).then(res => {
                    if(res.success){
                        this.detail = res.data.productSaleVo || {};
                        this.productPlayRuleVo = res.data.productPlayRuleVo || [];
                    } else {
                        this.detail = {};
                        this.productPlayRuleVo = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            /**
             * 获取路由信息
             */
            getParams(params) {
                if(params && Object.keys(params).length > 0){
                    if(params.info){
                        //根据产品Id查明细
                        this.findProductById(params.info)
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

                .yellow-span{
                    background: $color_F7981C_010;
                    border-radius: 28px;
                    font-size: $font_size_14px;
                    color: $color_yellow;
                    padding: 4px 15px;
                }

                .green-span{
                    background: $color_22BB5F_010;
                    border-radius: 28px;
                    font-size: $font_size_14px;
                    color: $color_green;
                    padding: 4px 15px;
                }

                .red-span{
                    background: $color_EB6751_010;
                    border-radius: 28px;
                    font-size: $font_size_14px;
                    color: $color_red;
                    padding: 4px 15px;
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
