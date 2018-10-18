<!--
    查看分销政策弹窗
    作者：杨泽涛
-->
<template>
    <Modal v-model="show"
           :title="$t('checkMySalePolicy')"
           width="740">
        <!-- 我的分销单价 -->
        <div class="divider-header">
            <span>{{$t('mySalePrice')}}</span>
        </div>

        <!-- 表格区域 -->
        <div class="table-wrapper">
            <div class="button-group">
                <!-- 修改 -->
                <Button class="modify-button" type="primary">{{$t('modify')}}</Button>
                <!-- 删除此分销单价 -->
                <Button type="error">{{$t('deleteSalePrice')}}</Button>
            </div>
        </div>

        <!-- 设置我的销售渠道 -->
        <div class="divider-header">
            <span>{{$t('setMySaleChannels')}}</span>
        </div>

        <!-- 表格区域 -->
        <div class="table-wrapper" >
            <div class="button-group">
                <!-- 修改 -->
                <Button class="modify-button" type="primary">{{$t('modify')}}</Button>
            </div>

            <tabCom>

            </tabCom>
        </div>

        <!-- modal footer -->
        <div slot="footer" class="modal-footer">
            <Button type="ghost" @click="toggle" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '../../../../api/index'
    import tabCom from '@/components/tableCom/tableCom.vue'
    export default {
        components: {
            tabCom
        },
        data() {
            return {
                //  是否显示modal
                show: false,
                //  列表项数据
                listItemData: null
            }
        },
        methods: {
            /**
             * 弹窗显示/隐藏
             */
            toggle( data ) {
                this.listItemData = data;
                this.getData();
                this.show = !this.show;
            },
            /**
             * 获取分享详情数据
             */
             async getData() {
                //获取分销详情
                await ajax.post('getPolicyAllocationInfo',{
                    allocationId: this.listItemData.allocationId
                }).then((res) => {
                    console.log(res);
                });

                await ajax.post('getSaleChannelPage', {
                    groupId: '-1',
                    orgId: this.$store.state.manageOrgs.id
                }).then((res) => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    /**
        分割线样式
     */
    .divider-header {
        display: table;
        position: relative;
        text-align: center;
        width: 100%;

        span {
            white-space: nowrap;
            margin: 0 6px;
            color: #333333;
            font-size: 14px;
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

    /**
        按钮样式
     */
    .table-wrapper {
        .button-group {
            .modify-button {
                padding-left: 30px;
                padding-right: 30px;
            }
        }
    }

    .modal-footer{
        /deep/ .ivu-btn{
            padding: 5px 30px;
        }
    }


    /deep/ .ivu-modal-content {
        border-radius: 0px;
    }
</style>
