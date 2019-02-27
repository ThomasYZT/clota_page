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
                <div class="right-button">
                    <span v-if="detail.auditStatus !== 'auditing' && detail.auditStatus !== 'enabled' && role !== 'other_org'"
                          class="blue-span" @click="modify">
                        <i class="iconfont icon-edit"></i>{{$t('modify')}}
                    </span>
                    <span v-if="role !== 'other_org'"
                          class="blue-span" @click="copyProduct">
                        <i class="iconfont icon-trade-channel"></i>{{$t('copy')}}
                    </span>
                </div>
            </div>

            <!--表单信息-->
            <Form ref="formValidate"
                  class="form"
                  :label-width="250"
                  label-position="right"
                  :model="detail">

                <!--基本信息-->
                <title-temp title="basicInfo"></title-temp>
                <div class="form-content">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('productName')+'：'"><!--产品名称-->
                                <div class="form-item-content" v-w-title="detail.productName">{{detail.productName | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12" v-if="$store.state.manageOrgs.nodeType !== 'partner' && role !== 'other_org'">
                            <Form-item :label="$t('standardPrice')+'：'"><!--景区成本价-->
                                <div class="form-item-content">{{detail.standardPrice | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('thirdCode')+'：'"><!--第三方产品编码-->
                                <div class="form-item-content" v-w-title="detail.thirdCode">{{detail.thirdCode | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('productType')+'：'"><!--产品类别-->
                                <div class="form-item-content" v-w-title="detail.typeName">{{detail.typeName | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('productLabel')+'：'"><!--产品标签-->
                                <div class="form-item-content">
                                    <productTag v-for="item in detail.tags"
                                                :checkable="false"
                                                :closable="false"
                                                :key="item.id"
                                                :name="item.name"
                                                :chosed="true"></productTag>
                                </div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('productCover')+'：'"><!--产品封面-->
                                <div class="form-item-content" v-viewer>
                                    <img style="cursor: pointer;" class="image-thumb" :src="detail.pictureUrl">
                                </div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('productDes')+'：'"><!--产品描述-->
                                <div class="form-item-content" v-w-title="detail.productDes">{{detail.productDes | contentFilter}}</div>
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
                            <Form-item :label="$t('printPrice') + $t('bracketSetting', { content : $t('originalPrice') }) +'：'"><!--票面价格-->
                                <div>{{detail.printPrice | moneyFilter | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('ticketRemark')+'：'"><!--票面说明-->
                                <div class="form-item-content" v-w-title="detail.ticketRemark">{{detail.ticketRemark | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="24">
                            <Form-item :label="$t('printRemark')+'：'"><!--打印说明-->
                                <div class="form-item-content" v-w-title="detail.printRemark">{{detail.printRemark | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <template v-if="manageOrgs.nodeType !== 'partner'">
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
                                    <div v-w-title="$t(detail.needId)">{{$t(detail.needId === 'one' ? 'product.needId.one' : detail.needId === 'more' ? 'product.needId.more' : 'noRequired')}}</div>
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
                        <!--<i-row>-->
                        <!--<i-col span="12">-->
                        <!--<Form-item :label="$t('stockType')+'：'">&lt;!&ndash;限制库存&ndash;&gt;-->
                        <!--<div v-w-title="$t(detail.stockType)">{{ $t(detail.stockType) | contentFilter}}</div>-->
                        <!--</Form-item>-->
                        <!--</i-col>-->
                        <!--<i-col span="12">-->
                        <!--<Form-item :label="$t('stockNum')+'：'">&lt;!&ndash;库存数量&ndash;&gt;-->
                        <!--<div>{{ detail.stockNum | contentFilter}}</div>-->
                        <!--</Form-item>-->
                        <!--</i-col>-->
                        <!--</i-row>-->
                    </div>
                </template>

                <template v-if="manageOrgs.nodeType !== 'partner'">
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
                </template>

                <!--游玩规则-->
                <title-temp title="playRule"></title-temp>
                <div class="form-content">
                    <br/>
                    <Form-item :label="$t('colonSetting', { key : $t('admissionTimes') })">
                        <span>{{detail.admissionTimes | contentFilter}}</span>
                    </Form-item>
                    <Form-item :label="$t('playPark')+'：'"><!--可游玩园区-->
                        <div>
                            <table-com
                                auto-height
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
                                    slot="column2"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li v-if="manageOrgs.nodeType !== 'partner'" class="normal"
                                                @click="viewParkDetail(scope.row)">{{$t('check')}}</li><!--查看-->
                                            <li v-else class="normal"
                                                @click="viewAdmissionInstructions(scope.row)">{{$t('noticeInPark')}}</li><!--查看-->
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </div>
                    </Form-item>
                </div>

                <!--产品日志-->
                <template v-if="recordsVos && recordsVos.length > 0 && $store.state.manageOrgs.nodeType !== 'partner' && role !== 'other_org'">
                    <title-temp title="productLog"></title-temp>
                    <div class="form-content">
                        <Timeline>
                            <TimelineItem v-for="(item,index) in recordsVos" :key="index" color="#DFDFDF">
                                <p class="time">{{item.createdTime}}</p>
                                <p class="content">
                                    <span class="name">{{item.orgName | contentFilter}}/{{item.createUserName | contentFilter}}</span>
                                    <span>{{$t(item.operationStatus === 'auditing' ? 'PRODUCT_APPLY' : item.operationStatus)}}</span>
                                    <span v-if="item.contents">{{$t('remark')}}：{{item.contents | contentFilter}}</span>
                                </p>
                            </TimelineItem>
                        </Timeline>
                    </div>
                </template>

            </Form>

        </div>

        <div class="footer" v-if="role !== 'other_org'">
            <!--已驳回-->
            <template v-if="(detail.auditStatus === 'rejected' || detail.auditStatus === 'not_enabled') && canApplyAuditProduct">
                <Button type="error"
                        @click="deleteConfirm">{{$t('delete')}}</Button>
                <Button type="primary"
                        @click="auditProduct('PRODUCT_APPLY')">{{$t('commitCheck')}}</Button><!--提交审核-->
                <Button type="ghost"
                        @click="modify">{{$t('modify')}}</Button><!--修  改-->
            </template>
            <!--已启用-->
            <template v-else-if="detail.auditStatus === 'enabled' && manageOrgs.nodeType !== 'partner'">
                <Button v-if="canDisabledProduct"
                        type="primary"
                        @click="auditProduct('PRODUCT_DISABLE')">{{$t('disabled')}}</Button><!--禁用-->
            </template>
            <!--待审核-->
            <template v-else-if="detail.auditStatus === 'auditing'">
                <Button v-if="canAuditProduct"
                        type="primary"
                        @click="auditProduct('PRODUCT_AUDIT_PASS')">{{$t('checkPass')}}</Button><!--审核通过-->
                <Button v-if="canRecalProduct"
                        type="error"
                        @click="auditProduct('PRODUCT_REVOCATION')">{{$t('revocation')}}</Button><!--撤回-->
                <Button v-if="canAuditProduct"
                        type="ghost"
                        class="active-btn"
                        @click="auditProduct('PRODUCT_AUDIT_REJECT')">{{$t('reject')}}</Button><!--驳回-->
            </template>
            <Button type="ghost" @click="goBack">{{$t('back')}}</Button><!--返回-->
            <!--待审核--填写备注-->
            <template v-if="detail.auditStatus === 'auditing' && canAuditProduct">
                <span class="blue" @click="showRemarkModal">{{$t('fillNote')}}</span>
            </template>
        </div>

        <!--查看园区-->
        <edit-park-modal ref="viewPark" :park-list="parkList" :data="detail"></edit-park-modal>

        <!--新增备注弹窗-->
        <add-remark-modal ref="addRemarkModal"></add-remark-modal>

        <!-- 禁用提示模态框 -->
        <disableModal ref="disableModal"></disableModal>

        <!--删除模态框-->
        <del-modal ref="delModal" class="del-min-width">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>
                <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>{{$t('sureToDel')}}</span>
            </span>
        </del-modal>

        <admissionInstructionsModal ref="admissionInstructionsModal"></admissionInstructionsModal>
    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import titleTemp from '../../components/titleTemp.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import editParkModal from './components/editParkModal.vue';
    import addRemarkModal from '../../components/addRemarkModal.vue';
    import admissionInstructionsModal from './components/admissionInstructionsModal';
    import delModal from '@/components/delModal/index.vue';
    import productTag from './components/productTag';
    import disableModal from './components/disableModal';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { parkColumn } from './editTicket/child/parkConfig';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            titleTemp,
            tableCom,
            editParkModal,
            addRemarkModal,
            disableModal,
            delModal,
            productTag,
            admissionInstructionsModal
        },
        data () {
            return {
                //面包屑上级路由信息
                beforeRouterList : [
                    {
                        name : 'ticketType', // 产品列表--票类列表
                        router : {
                            name : 'ticketType'
                        },
                    }
                ],
                //详情数据
                detail : {},
                //产品园区列表数据
                productPlayRuleVo : [],
                //产品日志数据
                recordsVos : [],
                //可游玩园区列表数据
                parkList : [],
                //备注
                remark : '',
                //可接受证件类型
                acceptIdType : [],
                //查看产品详情的角色
                role : '',
            };
        },
        computed : {
            ...mapGetters([
                'manageOrgs',
                'permissionInfo',
            ]),
            //是否可以审核和驳回产品
            canAuditProduct () {
                return this.permissionInfo && 'auditProduct' in this.permissionInfo;
            },
            //是否可以撤回产品审核
            canRecalProduct () {
                return this.permissionInfo && 'addProduct' in this.permissionInfo;
            },
            //是否可以禁用产品
            canDisabledProduct () {
                return this.permissionInfo && 'pauseProduct' in this.permissionInfo;
            },
            //是否可以在驳回后提交审核和修改
            canApplyAuditProduct () {
                return this.permissionInfo && 'addProduct' in this.permissionInfo;
            },
            //可游玩园区表头
            columnData () {
                return parkColumn;
            }
        },
        methods : {

            /**
             * 查看可游玩园区详情
             */
            viewParkDetail ( data ) {
                this.$refs.viewPark.show({
                    data : data,
                    title : this.$t('check') + this.$t(data.saleType),
                    type : 'check',
                });
            },
            /**
             *  查看入园须知
             *  @param data
             */
            viewAdmissionInstructions ( data ) {
                let info = {
                    admissionInstructions : data.admissionInstructions,
                    parkName : data.parkName,
                }
                this.$refs.admissionInstructionsModal.show(info);
            },
            /**
             *  修改
             */
            modify () {
                if (!this.canApplyAuditProduct) return;
                this.$router.push({
                    name : 'addTicket',
                    params : {
                        type : 'modify',
                        info : this.detail,
                        productPlayRuleVo : this.productPlayRuleVo,
                    }
                });
            },
            /**
             *  复制产品
             */
            copyProduct () {
                if (!this.canApplyAuditProduct) return;
                this.$router.push({
                    name : 'addTicket',
                    params : {
                        type : 'copy',
                        info : this.detail,
                        productPlayRuleVo : this.productPlayRuleVo,
                    }
                });
            },
            /**
             *  根据产品Id查明细
             */
            findProductById ( data ) {
                ajax.post('findProductById', {
                    productId : data.id
                }).then(res => {
                    if (res.success) {
                        this.detail = res.data.productSaleVo || {};
                        this.detail.tags = res.data.tagVos || {};
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
            /**
             *  查询权限下的园区
             */
            queryScenicOrgByAccountRole () {
                ajax.post('queryScenicOrgByAccountRole', {
                    privCode : '"addProduct"',
                }).then(res => {
                    if (res.success) {
                        this.parkList = res.data || [];
                    } else {
                        this.parkList = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             *  审核操作
             */
            auditProduct ( status ) {
                //当禁用时
                if (status === 'PRODUCT_DISABLE') {
                    this.$refs.disableModal.toggle({
                        type : 'disable',
                        productId : this.detail.id,
                        confirmCallback : () => {
                            this.auditApi( status );
                        }
                    });
                } else {
                    this.auditApi( status );
                }
            },
            /**
             *  审核接口
             */
            auditApi (status) {
                ajax.post('auditProduct', {
                    productId : this.detail.id,
                    operType : status,
                    remark : this.remark,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('operate') + this.$t('success'));
                        //根据产品Id查明细
                        this.findProductById(this.detail);
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             *  显示备注弹窗
             */
            showRemarkModal () {
                this.$refs.addRemarkModal.show({
                    data : { remark : this.remark },
                    confirmCallback : ( data ) => {
                        this.remark = data;
                    }
                });
            },
            /**
             *  返回
             */
            goBack () {
                this.$router.back();
            },
            /**
             *  删除产品二次确认
             */
            deleteConfirm () {
                this.$refs.delModal.show({
                    title : this.$t('delete'),
                    confirmCallback : () => {
                        this.deleteTicket(this.detail.id);
                    }
                });
            },
            /**
             *  删除产品
             */
            deleteTicket (data) {
                ajax.post('deleteProduct',{
                    productIds : data
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('success') + this.$t('delete'));
                        this.$router.push({
                            name : 'ticketType'
                        });
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            /**
             * 获取路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    if (params.info) {
                        //根据产品Id查明细
                        this.findProductById(params.info);
                        if (this.$store.state.manageOrgs.nodeType !== 'partner') {
                            //查询权限下的园区
                            this.queryScenicOrgByAccountRole();
                        }
                    }
                    if (params.role) {
                        this.role = params.role;
                    }
                } else {
                    this.$router.push({
                        name : 'ticketType'
                    });
                }
            }

        }
    };
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
                padding: 25px 35px 0px;
                color: $color_000_085;

                .right-button {
                    float: right;

                    .blue-span{
                        margin-right: 10px;
                        font-size: $font_size_14px;
                        color: $color_blue;
                        cursor: pointer;
                        .iconfont{
                            margin-right: 5px;
                            font-size: $font_size_14px;
                        }
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

            .form {
                .title-wrap {
                    padding: 10px 35px 10px 35px;
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

                    .image-thumb {
                        height: 100px;
                        border: 1px dashed $color_gray;
                        border-radius: 5px;
                    }
                }

                /deep/ .ivu-form-item-label{
                    width: auto;
                    white-space: nowrap;
                }

                /deep/ .table-com {
                    line-height: 22px;
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
            .form-item-content {
                word-break: break-all;
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

    /deep/ .content-text {
        @include center_center()
    }
</style>
