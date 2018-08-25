<template>
    <!--会员详情-->
    <div class="member-info-detail">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :before-router-list="[{name: '会员信息', router: 'info'}]"
                :locale-router="'会员详情'">
            </bread-crumb-head>
        </div>

        <div class="info-detail">

            <div class="content-wrap">

                <div class="content-info">
                    <div class="title">会员个人信息<span class="edit" @click="modifyInfo"><i class="iconfont icon-edit"></i>修改</span></div>
                    <div class="basic-wrap">
                        <div class="person-left">
                            <template v-if="detail.portrait">
                                <img :src="detail.portrait" alt=""/>
                            </template>
                            <template v-else>
                                <img src="@/assets/images/square-avatar.svg" alt=""/>
                            </template>
                        </div>
                        <div class="person-right">
                            <div>
                                <span class="name">{{detail.custName || '-'}}</span>
                                <span>{{ getEnumFieldShow('genderEnum', detail.gender) }}</span>
                                <span>{{ detail.age ? detail.age+'岁' : '-' }}</span>
                            </div>
                            <div class="form-show">
                                <span class="form-item-wrap"><label>手机号：</label>{{detail.phoneNum || '-'}}</span>
                                <span class="form-item-wrap"><label>生日：</label>
                                    {{detail.birthDay ? new Date(detail.birthDay).format('yyyy-MM-dd') : '-'}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-wrap">
                        <div class="form-item-wrap"><label>微信号：</label><span>{{detail.wechatAcct || '-'}}</span></div>
                        <div class="form-item-wrap"><label>支付宝账号：</label><span>{{detail.alipayAcct || '-'}}</span></div>
                        <div class="form-item-wrap"><label>E-mail：</label><span>{{detail.emailAddr || '-'}}</span></div>
                        <div class="form-item-wrap"><label>国家代码：</label><span>{{detail.stateCode || '-'}}</span></div>
                        <div class="form-item-wrap"><label>城市代码：</label><span>{{detail.cityCode || '-'}}</span></div>
                        <div class="form-item-wrap"><label>QQ号：</label><span>{{detail.qq || '-'}}</span></div>
                        <div class="form-item-wrap"><label>证件类型：</label><span>{{detail.certificationType || '-'}}</span></div>
                        <div class="form-item-wrap"><label>身份证号：</label><span>{{detail.idCardNumber || '-'}}</span></div>
                        <div class="form-item-wrap"><label>个人兴趣：</label><span>{{detail.hobby || '-'}}</span></div>
                        <div class="form-item-wrap"><label>家庭住址：</label><span>{{detail.homeAddr || '-'}}</span></div>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">
                        <span>会员卡归属选择 </span>
                        <span class="edit" @click="modifyInfo"><i class="iconfont icon-edit"></i>修改</span>
                    </div>
                    <div class="form-wrap" v-if="detail.memberCardVos && detail.memberCardVos[0]">
                        <div class="form-item-wrap"><label>会员编号：</label><span>
                            {{detail.memberCardVos[0].cardCode || '-'}}</span></div>
                        <div class="form-item-wrap"><label>发卡单位：</label><span>
                            {{detail.memberCardVos[0].orgId || '-'}}</span></div>
                        <div class="form-item-wrap"><label>注册渠道：</label><span>
                            {{detail.memberCardVos[0].phoneNum || '-'}}</span></div>
                        <div class="form-item-wrap"><label>会员类别：</label><span>
                            {{detail.memberCardVos[0].phoneNum || '-'}}</span></div>
                        <div class="form-item-wrap"><label>会员级别：</label><span>
                            {{detail.memberCardVos[0].levelDesc || '-'}}</span></div>
                        <div class="form-item-wrap"><label>密码：</label><span>
                            {{detail.memberCardVos[0].passwd || '********'}}</span></div>
                        <div class="form-item-wrap"><label>第三方卡面号：</label><span>
                            {{detail.memberCardVos[0].tpCardNo || '-'}}</span></div>
                        <div class="form-item-wrap"><label>第三方卡号：</label><span>
                            {{detail.memberCardVos[0].tpNo || '-'}}</span></div>
                    </div>
                </div>

                <div class="content-info" v-for="(item, index) in accountData">
                    <div class="title">
                        {{item.defaultAccount === 'true' ? '默认储值账户' : item.accountName }}信息
                        <span v-if="item.accountType === 'charging'" class="add" @click="addAccount">+ 新增账户</span>
                    </div>
                    <div class="content">
                        <div class="header-wrap" v-if="item.accountType === 'charging'">
                            {{item.defaultAccount === 'true' ? '默认储值账户' : item.accountName }}信息
                        </div>
                        <div class="header-wrap" v-if="item.accountType === 'score'">积分</div>
                        <div class="body-wrap">
                            <div class="coast">
                                <span>
                                    <template v-if="item.accountType === 'charging'">
                                        <span>本金：</span>
                                        <span class="num">{{item.corpusBalance.toCurrency()}}</span>
                                        <span>{{item.unit || ''}}</span>
                                    </template>
                                    <template v-if="item.accountType === 'score'">
                                        <span>可用积分：</span>
                                        <span class="num">{{item.accountBalance}}</span>
                                    </template>
                                </span>
                                <span v-if="item.accountType === 'charging'">
                                    赠送金额：
                                    <span class="num">{{item.donateBalance.toCurrency()}}</span>
                                    <span v-if="item.accountType === 'charging'">{{item.unit || ''}}</span>
                                </span>
                            </div>
                            <div class="operate-right">
                                <template v-if="item.accountType === 'charging'">
                                    <span @click="viewDeal(item)">交易明细</span>
                                    <span class="split-line"></span>
                                    <span @click="showAddSaveModal(item)">新增储值</span>
                                    <span class="split-line"></span>
                                    <span @click="showRangeModal(item)">应用范围</span>
                                    <template v-if="item.exchangeToCash === 'true'">
                                        <span class="split-line"></span>
                                        <span @click="showCashModal(item)">兑现</span>
                                    </template>
                                </template>
                                <template v-if="item.accountType === 'score'">
                                    <span @click="viewIntegration(item)">积分明细</span>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">优惠券信息</div>
                    <more-card type="view"
                               :status="status"
                               :table-data="couponData"
                               @view-more="showCouponModal"
                               @change-status="changeStatus"></more-card>
                </div>

                <div class="content-info">
                    <div class="title">卡包信息</div>
                    <div class="operate" @click="viewCardDetail"><span class="pointer">查看卡包信息</span></div>
                </div>

                <div class="content-info">
                    <div class="title">享受积分、折扣率信息</div>
                    <div class="operate" @click="viewCardRateDetail"><span class="pointer">查看享受积分、折扣率信息</span></div>
                </div>

                <div class="content-info card-temp">
                    <div class="title">子母卡信息</div>
                    <div class="card-wrap" v-if="childOrMotherCard.isMotherCard === 'true'">
                        <el-table
                            :data="motherCard"
                            :border="true"
                            :span-method="objectSpanMethod"
                            style="width: 100%">
                            <el-table-column
                                prop=""
                                label="当前会员卡身份"
                                width="160">
                                <template slot-scope="scope">母卡</template>
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="母卡信息"
                                width="260">
                                <template slot-scope="scope">
                                    {{ scope.row.custName ? scope.row.custName+','+scope.row.idCardNumber : '-' }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div class="card-wrap" v-if="childOrMotherCard.isMotherCard === 'false'">
                        <el-table
                            :data="sonCard"
                            :border="true"
                            style="width: 100%">
                            <el-table-column
                                prop=""
                                label="当前会员卡身份"
                                width="160">
                                <template slot-scope="scope">子卡</template>
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="子卡信息"
                                width="260">
                                <template slot-scope="scope">
                                    {{scope.row.custName ? scope.row.custName+','+scope.row.idCardNumber : '-'}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">安全设置</div>
                    <div class="switch-wrap">
                        <i-switch :value="detail.cardStatus ==='active' ? true : false"
                                  @on-change="changeCardStatus"></i-switch>
                        <span class="text">冻结该会员卡</span>
                    </div>
                </div>

                <div class="content-info">
                    <div class="title">修改储值、积分数值</div>
                    <div class="operate">
                        <div><span @click="showAssetModal">修改该会员储值账户余额</span></div>
                        <div><span @click="showScoreModal">修改该会员积分账户余额</span></div>
                    </div>

                </div>

            </div>

            <!--<div class="btn-wrap">-->
                <!--<Button type="primary">保存</Button>-->
                <!--<Button type="ghost">取消</Button>-->
            <!--</div>-->

        </div>

        <!--新增账户modal-->
        <add-account-modal ref="addAccount"
                           :store="defineAccount"
                           :detail="detail"
                           @add-success="listCardAccountInfo(detail)">
        </add-account-modal>

        <!--新增储值modal-->
        <add-fund-modal ref="addFund"
                        :payment-list="paymentData"
                        :detail="detail"
                        @add-success="listCardAccountInfo(detail)">
        </add-fund-modal>

        <!--兑现modal-->
        <to-cash-modal ref="toCash"
                       :store="defineAccount"
                       @add-success="listCardAccountInfo(detail)"></to-cash-modal>

        <!--应用范围modal-->
        <use-range-modal ref="useRange"></use-range-modal>

        <!--优惠券信息--查看更多modal-->
        <view-more-coupon-modal :status="status"
                                :table-data="couponData"
                                ref="viewMoreCoupon">
        </view-more-coupon-modal>

        <!--会员储值账户余额修改modal-->
        <modify-balance-modal ref="modifyBalance"
                              :store="charTableData"
                              :reason="reasonData"
                              :detail="detail"
                              @add-success="listCardAccountInfo(detail)">
        </modify-balance-modal>

        <!--会员积分账户修改modal-->
        <modify-score-modal ref="modifyScore"
                            :account="scoreData"
                            :reason="reasonData"
                            :detail="detail"
                            @add-success="listCardAccountInfo(detail)">
        </modify-score-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import addAccountModal from '../components/addAccountModal.vue';
    import addFundModal  from '../../components/addFundModal.vue';
    import toCashModal  from '../components/taCashModal.vue';
    import modifyBalanceModal  from '../components/modifyBalanceModal.vue';
    import modifyScoreModal  from '../components/modifyScoreModal.vue';
    import useRangeModal  from '../components/useRangeModal.vue';
    import viewMoreCouponModal  from '../components/viewMoreCouponModal.vue';
    import moreCard  from '../components/moreCard.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { genderEnum } from '@/assets/js/constVariable';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            addAccountModal,
            addFundModal,
            toCashModal,
            modifyBalanceModal,
            modifyScoreModal,
            useRangeModal,
            viewMoreCouponModal,
            moreCard,
        },
        data () {
            return {
                //会员获取会员信息和会员卡信息
                detail: {},
                //枚举数据
                enumData: {
                    //性别
                    genderEnum: genderEnum,
                },
                //账户信息列表（本金/积分）
                accountData: [],
                //收款方式数据
                paymentData: [],
                //自定义账户--用于新增账户
                defineAccount: [],
                //优惠券状态 已使用-used 未过期-noOverdue 已过期-overdue
                status: 'used',
                //优惠券信息列表,包括分页信息
                couponData: [],
                //子母卡信息
                childOrMotherCard: {},
                //子母卡表格数据
                motherCard: [],
                sonCard: [],
                //修改原因
                reasonData: [],
                //储值账户信息--用于修改储值余额修改
                charTableData: [],
                //积分账户信息--用于修改积分余额修改
                scoreData: {},
            }
        },
        created() {
            //查询自定义账户--用于新增账户
            this.queryDefineAccountType();
            //查询收款方式--用于新增储值
            this.queryPaymentType();
            //查询修改原因--用于会员储值账户余额修改
            this.listAdjustReason();
        },
        methods: {

            //查询自定义账户
            queryDefineAccountType () {
                ajax.post('queryDefineAccountType', {}).then(res => {
                    if(res.success){
                        this.defineAccount = res.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'queryDefineAccountType 失败！');
                    }
                });
            },

            //查询收款方式
            queryPaymentType () {
                ajax.post('queryPaymentType',{
                    isDeleted: 'false',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if(res.success){
                        this.paymentData = res.data || [];
                    }
                })
            },

            //查询修改原因
            listAdjustReason () {
                ajax.post('listAdjustReason',{}).then(res => {
                    if(res.success){
                        this.reasonData = res.data || [];
                    }
                })
            },

            /**
             * 获取枚举数据展示字段
             * @param name String 枚举字段名
             * @param val String 值
             */
            getEnumFieldShow ( name, val ) {
                var obj = this.enumData[name].find((item) => val === item.name);
                return obj ? obj.desc : '-'
            },

            //显示新增账号弹窗
            addAccount () {
                this.$refs.addAccount.show();
            },
            //根据会员卡获取账户信息
            listCardAccountInfo ( params ) {
                ajax.post('listCardAccountInfo', {
                    cardId: params.cardId,
                    memberId: params.id,
                }).then(res => {
                    if(res.success){
                        this.accountData = res.data || [];
                        this.charTableData = [];
                        this.scoreData = [];
                        //区分账户类型数据
                        res.data.forEach( item => {
                            if(item.accountType === 'charging'){
                                this.charTableData.push(item);
                            }
                            if(item.accountType === 'score'){
                                this.scoreData = item;
                            }
                        })
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'listCardAccountInfo 失败！');
                    }
                });
            },
            //点击账号信息，显示该账号信息的应用范围（店铺）
            showRangeModal ( data ) {
                this.$refs.useRange.show( data );
            },

            //获取更多优惠券
            listCouponsByStatus ( params ) {
                ajax.post('listCouponsByStatus', {
                    cardId: params.cardId,
                    memberId: params.id,
                    couponType: '',
                    status: this.status,
                    pageNo: 1,
                    pageSize: 10,
                }).then(res => {
                    if(res.success){
                        this.couponData = res.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message ||'listCouponsByStatus 失败！');
                    }
                });
            },
            //切换优惠券状态查询
            changeStatus ( val ) {
                if(val){
                    this.status = val;
                    this.listCouponsByStatus( this.detail );
                }
            },
            //点击查看更多显示卡劵所有列表弹窗
            showCouponModal () {
                if(this.$refs.viewMoreCoupon){
                    this.$refs.viewMoreCoupon.show();
                }
            },

            //点击新增储值，显示新增储值弹窗
            showAddSaveModal ( data ) {
                this.$refs.addFund.show(data);
            },

            //监听开关组件改变
            changeCardStatus ( bool ){
                if (bool) {
                    this.detail.cardStatus = 'active';
                } else {
                    this.detail.cardStatus = 'frozen';
                }
                this.updateMemberCard();
            },
            //更新会员卡信息
            updateMemberCard (  ) {
                ajax.post('updateMemberCard', {
                    id: this.detail.cardId,
                    status: this.detail.cardStatus,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('更新会员卡信息成功！');
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'updateMemberCard 失败！');
                    }
                });
            },

            //获取子母卡
            queryChildOrMotherCard ( data ) {
                ajax.post('queryChildOrMotherCard', {
                    cardId: data.cardId,
                }).then(res => {
                    if(res.success){
                        this.childOrMotherCard = res.data || {};
                        //区分子母卡
                        if(res.data.isMotherCard === 'true'){
                            if(res.data.childCard.length > 0){
                                this.motherCard = res.data.childCard;
                            } else {
                                this.motherCard = [{ id: ''}];
                            }
                        } else {
                            this.sonCard = res.motherCard || [{ id: ''}];
                        }
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'queryChildOrMotherCard 失败！');
                    }
                });
            },
            // 子母卡列合并
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

            //兑现
            showCashModal ( data ) {
                this.$refs.toCash.show( data );
            },

            // 修改该会员储值账户余额
            showAssetModal () {
                this.$refs.modifyBalance.show();
            },
            //修改该会员积分账户余额
            showScoreModal () {
                this.$refs.modifyScore.show();
            },



            //修改会员信息
            modifyInfo () {
                this.$router.push({ name: 'addMember', query: { type: 'modify', info: this.detail }});
            },

            viewDeal (dealData) {
                this.$router.push({ name: 'infoFund', params: {fundDetail: dealData} });
            },



            showCashModal () {
                console.log('cash');
                this.$refs.toCash.show();
            },

            viewIntegration  (integraData) {
                this.$router.push({ name: 'infoInteg', params: {integraDetail: integraData} });
            },

            viewCardDetail () {
                this.$router.push({ name: 'infoCard' });
                console.log('Card')
            },



            //查看享受积分、折扣率信息
            viewCardRateDetail () {
                this.$router.push({ name: 'infoRate' , params: { detail: this.detail} });
            },

            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    for(let item in params){
                        this[item] = params[item];
                    }
                    //根据会员卡获取账户信息
                    this.listCardAccountInfo(params.detail);
                    //获取更多优惠券
                    this.listCouponsByStatus(params.detail);
                    //字母卡列合并
                    this.queryChildOrMotherCard(params.detail);
                }else{
                    this.$router.push({
                        name : 'memberInfo'
                    });
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-info-detail{
        @include block_outline();
        position: relative;
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

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
                            transform: scale(0);
                            .iconfont{
                                margin-right: 5px;
                            }
                        }
                    }

                    &:hover{
                        .edit{
                            transform: scale(1);
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
                        margin-bottom: 0;

                        .card-wrap{
                            margin-top: 15px;
                            display: inline-block;
                        }
                    }

                    .operate{
                        margin-top: 10px;
                        font-size: $font_size_14px;
                        color: $color-blue;
                        span{
                            cursor: pointer;
                        }
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

        .pointer{
            cursor: pointer;
        }

    }
</style>
