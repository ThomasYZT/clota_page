<!--
内容：核销模态框
作者：
日期：
-->

<template>
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-account-modal vertical-center-modal"
        width="420"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="sn-count">
                <i class="iconfont icon-warn"></i><span>{{$t('本次核销')}}{{verify.list.length}}{{$t('条串码')}}</span>
            </div>
            <ul class="sn-box">
                <li v-for="(item, index) in verify.list" :key="index">{{item.serialNo}}</li>
            </ul>
            <!--备注-->
            <div style="position: relative;">
                <span style="position: absolute; left: -20px; color: #585858;">{{$t('remark')}}：</span>
                <div style="margin-left: 28px">
                    <Input v-model.trim="remark"
                           type="textarea"
                           :maxlength="500"
                           :rows="3"
                           :placeholder="$t('请填写备注，不超过500个字符')" />
                </div>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="handleVerify">{{$t("继续")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index'

    export default {
        components: {},
        props: {},
        data() {
            return {
                visible: false,
                title: '提醒',
                //核销列表数据
                verify: {
                    list: [],
                    type: ''
                },
                //核销备注
                remark: '',
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            show ( data ) {
                if (data) {
                    this.verify = data;
                }

                this.visible = true;
            },
            //关闭模态框
            hide() {
                this.verify.type = '';
                this.verify.list = [];
                this.visible = false;
            },
            /**
             * 核销
             */
            handleVerify() {
                let apiUrlKey = '';
                if (this.verify.type == 'ticket') {
                    apiUrlKey = 'checkByPickSerialNo';
                } else if (this.verify.type == 'verify') {
                    apiUrlKey = 'checkByCheckSerialNo';
                }

                ajax.post(apiUrlKey, {
                    serialNoList: this.verify.list.map(item => item.serialNo),
                    remark: this.remark
                }, {
                    headers: {"Content-Type": "application/json;charset-UTF-8"}
                }).then(res => {
                    if(res.success){
                        this.hide();
                        this.$router.push({name: 'verifySuccess'});
                    }else{
                        this.$Message.error('核销失败');
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    .modal-body {
        padding: 14px 50px;
        font-size: 14px;
        color: #333;
        letter-spacing: 1px;

        .sn-count {
            line-height: 1;
            .icon-warn {
                margin-right: 10px;
                font-size: 14px;
                color: #F3B13F;
            }
        }
        .sn-box {
            max-height: 60px;
            overflow: auto;
            margin: 10px 0 20px 24px;
            >li {
                line-height: 24px;
            }
        }
    }

    .modal-footer {
        /deep/ .ivu-btn {
            width: 88px;
        }
    }
</style>
