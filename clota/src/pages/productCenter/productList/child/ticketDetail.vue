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
                <span class="green-span" v-if="detail.auditStatus === 'enabled'">{{$t('startingUse')}}</span><!--已启用-->
                <span class="yellow-span" v-else-if="detail.auditStatus === 'auditing'">{{$t('waitChecking')}}</span><!--待审核-->
                <span class="red-span" v-else-if="detail.auditStatus === 'rejected'">{{$t('rejected')}}</span><!--已驳回-->
                <span class="blue-span" @click="modify"><i class="iconfont icon-edit"></i>{{$t('modify')}}</span>
            </div>

            <!--表单信息-->
            <Form ref="formValidate"
                  :label-width="250"
                  label-position="right"
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
                        <i-col span="12" v-if="$store.state.manageOrgs.nodeType !== 'partner'">
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
                                    <CheckboxGroup v-model="acceptIdType">
                                        <Checkbox v-for="(item,index) in acceptIdType"
                                                  disabled :key="index" :label="item">
                                            {{$t(item)}}
                                        </Checkbox>
                                    </CheckboxGroup>
                                </template>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12" v-if="detail.needId === 'more'">
                            <Form-item :label="$t('limitByIdDay')+'：'"><!--身份证购票限制-->
                                <div>
                                    <span class="label">{{detail.idLimit ? JSON.parse(detail.idLimit).day : '-'}}</span>
                                    <span class="label">{{$t('maxBuy')}}</span>
                                    <span class="label">{{detail.idLimit ? JSON.parse(detail.idLimit).quantity : '-'}}</span>
                                    <span>{{$t('paper')}}</span>
                                </div>
                            </Form-item>
                        </i-col>
                        <i-col span="12" v-if="detail.needId === 'more'">
                            <Form-item :label="$t('limitByMobileDay')+'：'"><!--手机号购票限制-->
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
                                :table-com-min-height="260"
                                :column-data="columnData"
                                :table-data="productPlayRuleVo"
                                :border="false">
                                <el-table-column
                                    slot="column1"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{$t(scope.row.saleType) | contentFilter}}
                                    </template>
                                </el-table-column>
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
                <template v-if="recordsVos && recordsVos.length > 0 && $store.state.manageOrgs.nodeType !== 'partner'">
                    <title-temp title="productLog"></title-temp>
                    <div class="form-content">
                        <Timeline>
                            <TimelineItem v-for="(item,index) in recordsVos" :key="index" color="#DFDFDF">
                                <p class="time">{{item.createdTime}}</p>
                                <p class="content">
                                    <span class="name">{{item.createName}}/{{item.createAccount}}</span>
                                    <span>{{$t(item.operationStatus === 'auditing' ? 'PRODUCT_APPLY' : item.operationStatus)}}</span>
                                    <span v-if="item.contents">{{$t('remark')}}：{{item.contents}}</span>
                                </p>
                            </TimelineItem>
                        </Timeline>
                    </div>
                </template>

            </Form>

        </div>

        <div class="footer">
            <!--已驳回-->
            <template v-if="detail.auditStatus === 'rejected' || detail.auditStatus === 'not_enabled'">
                <Button type="primary"
                        @click="auditProduct('PRODUCT_APPLY')">{{$t('commitCheck')}}</Button><!--提交审核-->
                <Button type="ghost"
                        @click="modify">{{$t('modify')}}</Button><!--修  改-->
            </template>
            <!--已启用-->
            <template v-else-if="detail.auditStatus === 'enabled'">
                <Button type="primary" @click="auditProduct('PRODUCT_DISABLE')">{{$t('disabled')}}</Button><!--禁用-->
            </template>
            <!--待审核-->
            <template v-else-if="detail.auditStatus === 'auditing'">
                <Button type="primary" @click="auditProduct('PRODUCT_AUDIT_PASS')">{{$t('checkPass')}}</Button><!--审核通过-->
                <Button type="error" @click="auditProduct('PRODUCT_REVOCATION')">{{$t('revocation')}}</Button><!--撤回-->
                <Button type="ghost" class="active-btn" @click="auditProduct('PRODUCT_AUDIT_REJECT')">{{$t('reject')}}</Button><!--驳回-->
            </template>
            <Button type="ghost" @click="goBack">{{$t('back')}}</Button><!--返回-->
            <!--待审核--填写备注-->
            <template v-if="detail.auditStatus === 'auditing'">
                <span class="blue" @click="showRemarkModal">{{$t('填写备注')}}</span>
            </template>
        </div>

        <!--查看园区-->
        <edit-park-modal ref="viewPark" :park-list="parkList" :data="detail"></edit-park-modal>

        <!--新增备注弹窗-->
        <add-remark-modal ref="addRemarkModal"></add-remark-modal>

    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editParkModal from './editParkModal.vue';
    import addRemarkModal from '../../components/addRemarkModal.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { parkColumn } from './parkConfig';
    import ajax from '@/api/index';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            titleTemp,
            tableCom,
            editParkModal,
            addRemarkModal,
        },
        data () {
            return {
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'ticketType',   // 产品列表--票类列表
                        router: {
                            name : 'ticketType'
                        },
                    }
                ],
                //详情数据
                detail: {},
                //产品园区列表数据
                productPlayRuleVo: [],
                //产品日志数据
                recordsVos: [],
                //可游玩园区表头
                columnData: parkColumn,
                //可游玩园区列表数据
                parkList: [],
                //备注
                remark: '',
                //可接受证件类型
                acceptIdType: []
            }
        },
        methods: {

            /**
             * 查看可游玩园区详情
             */
            viewParkDetail ( data ) {
                this.$refs.viewPark.show({
                    data: data,
                    title : this.$t('check')+this.$t(data.saleType),
                    type: 'check',
                });
            },

            //修改
            modify () {
                this.$router.push({
                    name: 'addTicket',
                    params: {
                        type: 'modify',
                        info: this.detail,
                        productPlayRuleVo: this.productPlayRuleVo,
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
                        this.recordsVos = res.data.recordsVos || [];
                        this.remark = '';
                        this.acceptIdType = this.detail.acceptIdType.split(',');
                    } else {
                        this.detail = {};
                        this.productPlayRuleVo = [];
                        this.recordsVos = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            // 查询权限下的园区
            queryScenicOrgByAccountRole () {
                ajax.post('queryScenicOrgByAccountRole', {
                    privCode: 'addProduct',
                }).then(res => {
                    if(res.success){
                        this.parkList = res.data || [];
                    } else {
                        this.parkList = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                })
            },

            //审核操作
            auditProduct ( status ) {
                ajax.post('auditProduct', {
                    productId: this.detail.id,
                    operType: status,
                    remark: this.remark,
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('operate') + this.$t('success'));
                        //根据产品Id查明细
                        this.findProductById(this.detail);
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                })
            },

            //显示备注弹窗
            showRemarkModal () {
                this.$refs.addRemarkModal.show({
                    data: { remark: this.remark },
                    confirmCallback : ( data ) => {
                        this.remark = data;
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
                    if(params.info){
                        //根据产品Id查明细
                        this.findProductById(params.info);
                        if(this.$store.state.manageOrgs.nodeType !== 'partner') {
                            //查询权限下的园区
                            this.queryScenicOrgByAccountRole();
                        }
                    }
                }
            }

        }
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
                    line-height: 30px;
                    font-size: $font_size_14px;
                }

                /deep/ .ivu-form-item-label{
                    width: auto;
                    white-space: nowrap;
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

                &.active-btn{
                    border-color: $color_blue;
                    color: $color_blue;
                }
            }

            .blue{
                color: $color_blue;
                cursor: pointer;
            }
        }
    }
</style>
