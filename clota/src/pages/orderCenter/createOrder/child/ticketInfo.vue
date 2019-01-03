<!--购票须知-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        :width="374"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="ticket-info"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title">{{$t('buyTicketNotes')}}</span>
        </div>
        <div class="target-body">
            <div class="ticket-title" v-w-title="$t(`${orgName} ${$t('buyTicketNotes')}`)">{{$t(`${orgName} ${$t('buyTicketNotes')}`)}}</div>
            <div class="ticket-info-detail">
                {{policyText | contentFilter}}
            </div>
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
            //政策id
            'policy-id' : {
                type : String,
                default : ''
            },
            //景区名称
            'org-name' : {
                type : String,
                default : ''
            }
        },
        data () {
            return {
                //政策信息
                policyText : ''
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
                    ajax.post('getPolicyBase',{
                        policyId : this.policyId
                    }).then(res => {
                        if (res.success) {
                            this.policyText = res.data ? res.data.productPolicy ? res.data.productPolicy.buyTicketNotes : '' : '';
                        } else {
                            this.policyText = '';
                        }
                    });
                } else {
                    this.policyText = '';
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .ticket-info{

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: $font_size_12px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                width: 100%;
                display: inline-block;
                @include overflow_tip();
            }
        }

        /deep/ .ivu-modal-footer{
            display: none;
        }

        /deep/ .ivu-modal-header{
            padding: 8px 16px;
        }

        .target-body{
            max-height: 257px;

            .ticket-title{
                height: 60px;
                text-align: center;
                font-size: $font_size_14px;
                color: #FFB100;
                letter-spacing: 1px;
                line-height: 60px;
                border-bottom: 1px solid #EEEEEE;
                @include overflow_tip();
            }

            .ticket-info-detail{
                min-height: 70px;
                padding: 10px 0;
                font-size: $font_size_12px;
                color: #606266;
                letter-spacing: 0.86px;
                line-height: 26px;
                overflow: auto;
                word-break: break-all;
            }
        }

        /deep/ .ivu-modal-body{
            padding: 0 20px;
        }
    }
</style>
