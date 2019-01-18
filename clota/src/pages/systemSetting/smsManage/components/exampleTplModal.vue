<template>
    <!--购买短信套餐-->
    <Modal
        v-model="visible"
        :title="$t('smsTemplateExample')"
        class-name="add-account-modal vertical-center-modal"
        width="660"
        :mask-closable="false"
        :footer-hide="true"
        @on-cancel="hide">

        <div class="modal-body">

            <div class="eg-content">
                <h4>{{$t('ticketSmsTemplate')}}</h4>
                <p>
                    {{$t('ticketSmsTemplateExample')}}
                    <span class="copy">{{ $t('copy') }}</span>
                </p>
            </div>
            <div>
                <p class="list-title">{{$t('argumentInfoList')}}</p>
                <table-com
                    :ofsetHeight="170"
                    :show-pagination="false"
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="true">
                </table-com>
            </div>

        </div>

    </Modal>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        props : ['row-data'],
        components : { tableCom },
        data () {
            return {
                visible : false,

                columnData : [
                    {
                        title : 'templateType',
                        width : 150,
                        field : 'type'
                    },
                    {
                        title : 'templateMustArgs',
                        minWidth : 200,
                        field : 'content'
                    },
                    {
                        title : 'templateArgsDescribe',
                        minWidth : 200,
                        field : 'describe'
                    },
                ],

                tableData : [
                    {
                        'type' : this.$t('ticket1'),
                        'content' : '$name1',
                        'describe' : this.$t('tourist1'),
                    },{
                        'type' : this.$t('ticket2'),
                        'content' : '$name2',
                        'describe' : this.$t('tourist2'),
                    },{
                        'type' : this.$t('ticket3'),
                        'content' : '$name3',
                        'describe' : this.$t('tourist3'),
                    },
                ]
            };
        },
        watch : {

        },
        methods : {

            show ( data ) {
                this.visible = true;
            },

            hide () {
                this.visible = true;
            },


        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 14px 30px;

            .eg-content {
                background: #FAFBFE;
                border-radius: 2px;
                padding: 20px 15px;
                font-size: $font_size_14px;
                color: $color_303133;

                >h4 {
                    margin-bottom: 10px;
                    font-weight: 600;
                }

                >p {
                    line-height: 20px;
                }

                .copy {
                    margin-left: 15px;
                    color: $color_blue;
                    cursor: pointer;
                }
            }

            .list-title {
                margin: 20px 0 10px 0;
                color: $color_303133;
            }

            /deep/ .el-table--border {
                border-left: 1px solid #ebeef5;
            }
            /deep/ .el-table--border::after {
                width: 1px;
            }
        }

    }
</style>
