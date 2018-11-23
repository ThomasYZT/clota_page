<!--短信详情-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="node-detail"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title">{{$t('noteSendDetail')}}</span>
        </div>
        <ul class="company-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">订单号：</span>
                    <span class="info-val" v-w-title="noteDetail.orderNo">{{noteDetail.orderNo | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">公司/景区名称：</span>
                    <span class="info-val" v-w-title="noteDetail.orgName">{{noteDetail.orgName | contentFilter}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">手机号：</span>
                    <span class="info-val" v-w-title="noteDetail.target">{{noteDetail.target | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">条数：</span>
                    <span class="info-val" v-w-title="noteDetail.amount">{{noteDetail.amount | contentFilter}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">短信服务商：</span>
                    <span class="info-val" v-w-title="noteDetail.provider">{{noteDetail.provider | contentFilter}}</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">发送时间：</span>
                    <span class="info-val" v-w-title="noteDetail.createdTime">{{noteDetail.createdTime | contentFilter}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">发送状态：</span>
                    <span class="info-val">{{$t(noteDetail.status === 'success' ? 'success' : 'fail')}}</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list3">
                    <span class="info-key">短信内容：</span>
                    <span class="info-val">{{noteDetail.content | contentFilter}}</span>
                </div>
            </li>
        </ul>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="close">{{$t('close')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
            },
            //短信id
            'note-id' : {
                type : String,
                default : ''
            }
        },
        data () {
            return {
                //短信详情
                noteDetail : {}
            };
        },
        methods : {
            /**
             * 模态框状态改变
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange (type) {
                if (type === true) {
                    this.getNodeDetail();
                } else {
                    this.noteDetail = {};
                }
            },
            /**
             * 关闭模态框
             */
            close () {
                this.$emit('input', false);
            },
            /**
             * 获取短信详情
             */
            getNodeDetail () {
                ajax.post('getSmsConsumeRecordDetails',{
                    id : this.noteId
                }).then(res => {
                    if (res.status === 200) {
                        this.noteDetail = res.data ? res.data : {};
                    } else {
                        this.noteDetail = {};
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .node-detail{

        & /deep/ .ivu-modal {
            width: 560px !important;
            min-height: 350px;
        }

        .company-info {
            @include block_outline($height: auto);

            .list {
                @include block_outline($height: auto);
                min-height: 35px;
                padding: 4px 0;
                line-height: 22px;
                overflow: auto;

                .info-list1,
                .info-list3,
                .info-list2 {
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;

                    .info-key {
                        @include block_outline(auto, 100%);
                        color: $color_333;
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;
                    }
                }

                .info-list1 {
                    @include block_outline(50%, auto);
                }

                .info-list2 {
                    @include block_outline(50%, auto);

                    &:nth-last-of-type(1) {
                        padding-left: 15px;
                    }
                }

                .info-list3{
                    @include block_outline(100%,auto);

                    .info-val {
                        white-space: normal;
                        overflow: auto;
                        text-overflow: initial;
                    }
                }
            }
        }
        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                width: 100%;
                display: inline-block;
                @include overflow_tip();
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 17px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 13px;
        }

        & /deep/ .ivu-modal-body {
            padding: 20px 30px;
        }


        & /deep/ .ivu-modal-footer {
            text-align: center;
        }
    }
</style>
