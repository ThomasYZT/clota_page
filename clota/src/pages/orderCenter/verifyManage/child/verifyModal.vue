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
                <!--本次核销{field}条串码-->
                <i class="iconfont icon-warn"></i><span>{{$t('verifiedQtyOfSN', {field: verify.list.length})}}</span>
            </div>
            <ul class="sn-box">
                <li v-for="(item, index) in verify.list" :key="index">{{item.serialNo}}</li>
            </ul>
            <!--备注-->
            <div style="position: relative;">
                <span :style="{position: 'absolute', left: lang=='zh-CN'?'-20px':'-40px', color: '#585858'}">{{$t('remark')}}：</span>
                <div style="margin-left: 25px; position: relative">
                    <Input v-model.trim="remark"
                           type="textarea"
                           :rows="3"
                           :placeholder="$t('inputPlaceholder')" />
                    <p class="error-tip" v-show="remark.length>500">{{$t('errorMaxLength', {field: this.$t('remark'), length: 500})}}</p>
                </div>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="handleVerify">{{$t("continue")}}</Button><!--继续-->
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        components : {},
        props : {},
        data () {
            return {
                visible : false,
                title : 'remind', // 提醒
                //核销列表数据
                verify : {
                    list : [],
                    type : ''
                },
                //核销备注
                remark : '',
            };
        },
        computed : {
            ...mapGetters({
                lang : 'lang'
            }),
        },
        created () {
        },
        mounted () {
        },
        watch : {},
        methods : {
            show ( data ) {
                if (data) {
                    this.verify = data;
                }

                this.visible = true;
            },
            //关闭模态框
            hide () {
                this.verify.type = '';
                this.verify.list = [];
                this.visible = false;
            },
            /**
             * 核销
             */
            handleVerify () {
                let apiUrlKey = '';
                if (this.verify.type == 'ticket') {
                    apiUrlKey = 'checkByPickSerialNo';
                } else if (this.verify.type == 'verify') {
                    apiUrlKey = 'checkByCheckSerialNo';
                }

                if (this.remark.length > 500) {
                    return;
                }

                ajax.post(apiUrlKey, {
                    serialNoList : this.verify.list.map(item => item.serialNo),
                    remark : this.remark
                }, {
                    headers : { "Content-Type" : "application/json;charset-UTF-8" }
                }).then(res => {
                    if (res.success) {
                        this.hide();
                        this.$router.push({ name : 'verifySuccess' });
                    } else {
                        this.$Message.error(this.$t('verifyFailure')); // 核销失败
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

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

        .error-tip {
            position: absolute;
            bottom: -18px;
            left: 0;
            font-size: 12px;
            color: $color_red;
        }
    }

    .modal-footer {
        /deep/ .ivu-btn {
            width: 88px;
        }
    }
</style>
