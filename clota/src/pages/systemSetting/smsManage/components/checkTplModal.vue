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
                    <div class="field-desc">{{'ticketSmsTemplateExample'}}</div>
                </li>
            </ul>

        </div>

    </Modal>
</template>

<script>
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props : [],
        components : {},
        data () {
            return {
                visible : false,
                // 模板信息数据
                infoData : {
                    'templateName' : '',
                    'templateType' : '',
                    'templateContent' : '',
                }
            };
        },
        watch : {

        },
        methods : {

            show ( data ) {
                if ( data ) {
                    this.infoData = defaultsDeep({}, data.item, this.infoData);
                }
                this.visible = true;
            },

            hide () {
                this.visible = true;
                this.infoData = {
                    'templateName' : '',
                    'templateType' : '',
                    'templateContent' : ''
                };
            },


        },
    };
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
