<!--添加服务模态框-->

<template>
    <Modal
        title="Title"
        v-model="modalShow"
        :mask-closable="false"
        @on-visible-change="visibleChange"
        class="add-service"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >添加服务</span>
        </div>
        <div class="service-body">
            <div class="label-info">
                <span class="key">上级公司：</span>
                <span class="val">上级公司上级公司上级公</span>
            </div>
            <span class="tip">请先为上级公司开通服务后，景区才能添加相应服务。</span>
            <div class="label-info" style="margin-bottom: 10px">
                <span class="key">上级公司已开通服务：</span>
            </div>
            <table-com
                table-height="210px"
                :table-data="tableData"
                :column-data="columns"
                @selection-change="handleSelectionChange">
                <el-table-column
                    slot="column0"
                    type="selection"
                    width="55">
                </el-table-column>
            </table-com>
            <div class="page-area" v-if="tableData.length > 0">
                <el-pagination
                    :current-page="pageNo"
                    :page-sizes="pageSizeConfig"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <div slot="footer">
            <Button class="ivu-btn-90px"
                    @click="cancel">
                {{$t('cancel')}}
            </Button>
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">
                {{$t('save')}}
            </Button>
        </div>
    </Modal>
</template>

<script>
    import tableCom from '../../../../../index/child/tableCom';
    import tableMixins from '../../../../../lessee/tableMixins';
    import {openedServiceHead} from './openedServiceConfig';
    export default {
        mixins :[tableMixins],
        components: {
            tableCom
        },
        data() {
            return {
                //是否显示模态框
                modalShow : false,
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
                //表头配置
                columns : openedServiceHead.slice(0,-1),
                //服务总条数
                totalCount : 30,
                //当前选择的服务
                selectedService : []
            }
        },
        methods: {
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {

            },
            /**
             * 取消新增
             */
            cancel() {
                this.modalShow = false;
                if(this.cancelCallback){
                    this.cancelCallback();
                }
            },
            /**
             * 确认新增
             */
            confirm() {
                this.modalShow = false;
                if(this.confirmCallback){
                    this.confirmCallback(this.selectedService);
                }
            },
            /**
             * 显示 模态框
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({confirmCallback = null,cancelCallback}) {
                this.modalShow = true;
                if(confirmCallback && typeof confirmCallback == 'function'){
                    this.confirmCallback = confirmCallback;
                }
                if(cancelCallback && typeof cancelCallback == 'function'){
                    this.cancelCallback = cancelCallback;
                }
            },
            /**
             * 选择的服务数据改变
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedService = data;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-service {
        & /deep/ .ivu-modal {
            width: 650px !important;
            height: 480px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                display: inline-block;
                width: 100%;
                @include overflow_tip(100%);
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 12px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 7px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline($height: 364px);
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .service-body {
            font-size: $font_size_14px;
            color: $color_333;
            text-align: left;
            padding: 10px 20px;
            $key_width : 150px;

            .label-info{
                @include block_outline(100%,30px);
                line-height: 30px;

                .key{
                    float: left;
                    display: inline-block;
                    @include block_outline($key_width,30px);
                    text-align: right;
                    padding-right: 10px;
                    font-size: $font_size_14px;
                    color: $color_333;
                }

                .val{
                    float: left;
                    display: inline-block;
                    @include overflow_tip(unquote('calc(100% - #{$key_width})'),100%);
                    font-size: $font_size_14px;
                    color: $color_666;
                }

            }

            .tip{
                padding-left: $key_width;
                color: $color_999;
                @include block_outline($height : 20px);
            }
        }


        .page-area {
            @include block_outline($height: 57px);
            text-align: right;

            /deep/ .el-pagination {
                display: inline-block;
                padding-top: 15px;
            }
        }
    }
</style>
