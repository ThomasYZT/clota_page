<template>
    <!--积分修改信息/储值账户修改信息-->
    <Modal
        v-model="visible"
        :title="type === 'fund' ? $t('storageBalanceModification') : $t('integralAccModification')"
        class-name="view-modify-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide"><!--'储值账户余额修改' : '积分账户修改'-->

        <div class="modal-body">
            <div class="form-item-wrap">
                <label v-if="type === 'fund'">{{$t('ModifyAmountThisTime')}}：</label><!--本次修改金额-->
                <label v-else-if="type === 'integration'">{{$t('ModifyIntegerThisTime')}}：</label><!--本次修改积分-->
                <span class="green" v-if="manualData.amount > -1">
                    +{{manualData.amount | moneyFilter | contentFilter}}
                    {{(manualData.accountTypeId === '1' || manualData.accountTypeId === '4') ? $t('yuan') : $t(manualData.unit)}}
                </span>
                <span class="red" v-if="manualData.amount < 0">{{manualData.amount}}</span>
            </div>
            <div class="form-item-wrap">
                <template v-if="type === 'fund'">
                    <label>{{$t('accBalanceAfterModification')}}：</label><!--修改后账户余额为-->
                    <span>{{manualData.endingBalance | moneyFilter | contentFilter}}</span> {{(manualData.accountTypeId === '1' || manualData.accountTypeId === '4') ? $t('yuan') : $t(manualData.unit)}}
                </template>
                <template v-else-if="type === 'integration'">
                    <label>{{$t('IntegerAfterModification')}}：</label><!--修改后积分余额-->
                    <span>{{manualData.endingBalance | contentFilter}}</span>
                </template>
            </div>
            <!--操作人-->
            <div class="form-item-wrap"><label>{{$t('operator')}}：</label><span>{{manualData.operName | contentFilter}}</span></div>
            <!--修改时间-->
            <div class="form-item-wrap"><label>{{$t('modifiedTime')}}：</label><span>{{manualData.createdTime}}</span></div>
            <div class="form-item-wrap"><label>{{$t('remark') + '：'}}</label><span>{{manualData.remark | contentFilter}}</span></div>
            <!--修改原因-->
            <div class="form-item-wrap"><label>{{$t('modifyReason')}}：</label><span>{{manualData.reason | contentFilter}}</span></div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="hide" >{{$t('back')}}</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        components : {},
        props : {
            manualData : Object,
        },
        data () {
            return {
                // 储值/积分 fund/integration
                type : 'fund',
                visible : false,
            };
        },
        methods : {

            show ( type ) {
                this.type = type || 'fund';
                this.visible = true;
            },


            //关闭模态框
            hide () {
                this.visible = false;
            },

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .view-modify-modal{

        .modal-body{
            padding: 20px 0 50px 100px;
            min-height: 225px;

            .form-item-wrap{
                width: 100%;
                float: left;
                margin-right: 10px;
                height: 30px;
                line-height: 30px;
                font-size: $font_size_14px;
                color: $color-666;
                >label{
                    color: $color-333;
                }
                .red{
                    color: $color_red;
                }
                .green{
                    color: $color_green;
                }
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>
