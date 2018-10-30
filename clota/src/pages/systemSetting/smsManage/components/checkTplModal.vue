<template>
    <!--查看短信模板-->
    <Modal
        v-model="visible"
        :title="$t('TicketTypeMessageTemplateInformation')"
        class-name="add-account-modal vertical-center-modal"
        width="600"
        :mask-closable="false"
        :footer-hide="true"
        @on-cancel="hide">

        <div class="modal-body">

            <ul>
                <li>
                    <span>{{$t('templateName')}}：</span>
                    <div class="field-desc">{{'TicketTypeMessageTemplate'}}</div>
                </li>
                <li>
                    <span>{{$t('templateType')}}：</span>
                    <div class="field-desc">{{'TicketType'}}</div>
                </li>
                <li>
                    <span>{{$t('templateContent')}}：</span>
                    <div class="field-desc">{{'【银科环企智慧旅游平台】尊敬的$name(先生/女士),你已成功支付$proname（$num张）,请凭此信息在$sdate至$edate检票入园，串码【$code】本信息为有效入园凭证，请勿删除。祝您游玩愉快！点击链接获取二维码http://qrcode.galasystrip.com/?ID=$code。'}}</div>
                </li>
            </ul>

        </div>

    </Modal>
</template>

<script>
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props: [],
        components: {},
        data () {
            return {
                visible: false,
                // 模板信息数据
                infoData: {
                    'templateName': '',
                    'templateType': '',
                    'templateContent': '',
                }
            }
        },
        watch: {

        },
        methods: {

            show ( data ) {
                if( data ){
                    this.infoData = defaultsDeep({}, data.item, this.infoData);
                }
                this.visible = true;
            },

            hide () {
                this.visible = true;
                this.infoData = {
                    'templateName': '',
                    'templateType': '',
                    'templateContent': ''
                }
            },


        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-account-modal{

        .modal-body{
            padding: 4px 14px 54px 14px;

            ul li {
                margin-bottom: 20px;
                font-size: $font_size_14px;
                color: $color_666;

                > span {
                    float: left;
                }

                .field-desc {
                    margin-left: 6em;
                    color: $color_303133;
                }
            }
        }

    }
</style>
