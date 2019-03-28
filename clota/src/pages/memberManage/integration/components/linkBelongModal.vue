<template>
    <!--会员管理--会员积分--特殊会员权益管理--会员信息关联分类-->
    <Modal
        v-model="visible"
        :title="$t('linkSpecialMemClassify')"
        class-name="link-belong-modal vertical-center-modal"
        width="520"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="form-item-wrap">
                <label>{{$t('userName')}}</label>
                <span class="name" v-w-title="memberInfo.custName">{{memberInfo.custName}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t('mobilePhone')}}</label>
                <span class="name" v-w-title="memberInfo.phoneNum">{{memberInfo.phoneNum}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t('memberNum')}}</label>
                <span class="name" v-w-title="memberInfo.id">{{memberInfo.id}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t('credentialsCode')}}</label>
                <span class="name" v-w-title="memberInfo.idCardNumber">{{memberInfo.idCardNumber}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t('linkCategory')}}</label>
                <Select v-model="staffTypeId">
                    <Option :value="item.id"
                            v-for="(item,i) in specialMemberData"
                            :key="i">
                        {{item.staffDesc}}
                    </Option>
                </Select>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary"
                    :disabled="staffTypeId ? false : true"
                    @click="save">{{$t("save")}}</Button>
            <Button type="ghost" @click="hide">{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        props : {
            //会员信息
            'member-info' : {
                type : Object,
                default () {
                    return {};
                }
            },
        },
        components : {},
        data () {
            return {
                //模态框是否显示
                visible : false,
                //员工分类
                specialMemberData : [],
                //员工分类id
                staffTypeId : ''
            };
        },
        methods : {

            /**
             * 显示模态框
             */
            show () {
                this.visible = true;
            },

            /**
             * 保存
             */
            save () {
                ajax.post('editMemberInfo',{
                    memberCard : JSON.stringify({
                        id : this.memberInfo.cardId,
                        staffTypeId : this.staffTypeId,
                    })
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('link') }));
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('link') }));
                    }
                }).finally(() => {
                    this.hide();
                });
            },

            //关闭模态框
            hide () {
                this.visible = false;
            },
            /**
             * 查询所有特殊会员类别
             */
            memberStaffTypeList () {
                ajax.post('memberStaffTypeList',{
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success) {
                        this.specialMemberData = res.data.data ? res.data.data : [];
                    } else {
                        this.specialMemberData = [];
                    }
                }).catch(err => {
                    this.specialMemberData = [];
                });
            },
        },
        created () {
            this.memberStaffTypeList();
        },
        watch : {
            'memberInfo' : {
                handler (newVal,oldVal) {
                    if (newVal && Object.keys(newVal).length > 0) {
                        this.staffTypeId = newVal.memberCardVos[0].staffTypeId;
                    }
                },
                deep : true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .link-belong-modal{

        .modal-body{
            padding: 20px;
            height: 200px;

            .form-item-wrap{
                width: 100%;
                float: left;
                margin-right: 10px;
                height: 30px;
                line-height: 30px;
                font-size: $font_size_14px;
                color: $color-666;
                display: flex;
                >label{
                    display: inline-block;
                    width: 140px;
                    text-align: right;
                    margin-right: 10px;
                    color: $color-333;
                }
                .name{
                    flex: 1;
                    @include overflow_tip();
                }
                /deep/ .ivu-select{
                    width: 280px;
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

