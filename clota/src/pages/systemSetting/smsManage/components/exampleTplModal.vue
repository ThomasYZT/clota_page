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
                <h4>票类业态短信模板 示例：</h4>
                <p>
                    【银科环企智慧旅游平台】尊敬的$name(先生/女士),你已成功支付$proname（$num张）,请凭此信息在$sdate至$edate检票入园，串码【$code】本信息为有效入园凭证，请勿删除。祝您游玩愉快！点击链接获取二维码http://qrcode.galasystrip.com/?ID=$code
                    <span class="copy">{{ $t('复制') }}</span>
                </p>
            </div>
            <div>
                <p class="list-title">参数信息列表</p>
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
        props: ['row-data'],
        components: {tableCom},
        data () {
            return {
                visible: false,

                columnData: [
                    {
                        title: '模板类型',
                        width: 150,
                        field: 'type'
                    },
                    {
                        title: '模板内容必填参数',
                        minWidth: 200,
                        field: 'content'
                    },
                    {
                        title: '模板内容参数描述',
                        minWidth: 200,
                        field: 'describe'
                    },
                ],

                tableData: [
                    {
                        'type': '票类1',
                        'content': '$name1',
                        'describe': '游客姓名1',
                    },{
                        'type': '票类2',
                        'content': '$name2',
                        'describe': '游客姓名2',
                    },{
                        'type': '票类3',
                        'content': '$name3',
                        'describe': '游客姓名3',
                    },
                ]
            }
        },
        watch: {

        },
        methods: {

            show ( data ) {
                this.visible = true;
            },

            hide () {
                this.visible = true;
            },


        },
    }
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
