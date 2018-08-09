<!--合作渠道详情-->

<template>
    <div class="coopera-channel-detail">
        <bread-crumb-head
            :locale-router="$t('lesseeDetail')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="lessee-per-detail">
            <div class="less-content">
                <div class="less-name">
                    <span class="name">{{cooperaDetail.name}}</span>
                    <span class="status">待审核</span>
                </div>
                <div class="audit-area">
                    <Button type="primary" @click="auditPass">审核通过</Button>
                    <Button type="ghost" class="ivu-btn-90px" @click="reject">驳回</Button>
                </div>
            </div>
            <ul class="cooper-detail">
                <li class="list">
                    <div class="info-list1">
                        <span class="info-key">身份证号：</span>
                        <span class="info-val">王老板</span>
                    </div>
                    <div class="info-list2">
                        <span class="info-key">联系方式：</span>
                        <span class="info-val">15867868623</span>
                    </div>
                    <div class="info-list3">
                        <span class="info-key">管理账号：</span>
                        <span class="info-val">Ashkjhk22</span>
                    </div>
                </li>
                <li class="list">
                    <div class="info-list1">
                        <span class="info-key">电子邮箱：</span>
                        <span class="info-val">00291389323</span>
                    </div>
                    <div class="info-list2">
                        <span class="info-key">所在地：</span>
                        <span class="info-val">云南省 曲靖市 马龙县</span>
                    </div>
                    <div class="info-list3">
                        <span class="info-key">详细地址：</span>
                        <span class="info-val">广东省 广州市 某某区 时代峰峻可视对讲路108号</span>
                    </div>
                </li>
                <li class="list">
                    <div class="info-list1">
                        <span class="info-key">上次修改时间：</span>
                        <span class="info-val">176786699@163.com</span>
                    </div>
                    <div class="info-list2">
                        <span class="info-key">注册审核时间：</span>
                        <span class="info-val">云南省 曲靖市 马龙县</span>
                    </div>
                    <div class="info-list3">
                        <span class="info-key">上次修改人：</span>
                        <span class="info-val">广东省 广州市 某某区 时代峰峻可视对讲路108号</span>
                    </div>
                </li>
                <li class="list">
                    <div class="info-list1">
                        <span class="info-key">受理客服：</span>
                        <span class="info-val">云南省 曲靖市 马龙县</span>
                    </div>
                    <div class="info-list2">
                        <span class="info-key">账号申请时间：</span>
                        <span class="info-val">广东省 广州市 某某区 时代峰峻可视对讲路108号</span>
                    </div>
                    <div class="info-list3">
                        <span class="info-key">身份证：</span>
                        <span class="info-val">
                            <img src="../../../../assets/images/icon-no-data.png" alt="">
                        </span>
                    </div>
                </li>
                <li class="list">
                    <div class="info-list4">
                        <span class="info-key">个人说明：</span>
                        <span class="info-val">个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明个人说明</span>
                    </div>
                </li>
            </ul>
            <div class="partner-area">
                <div class="partner-name">合作伙伴</div>
                <div class="count">合作伙伴数：3</div>
                <table-com
                    :is-pack-up="true"
                    :table-data="tableData"
                    :column-data="columnData"
                    :show-page="true"
                    :total="totalCount"
                    @get-new-data="getPartnerData">
                </table-com>
            </div>
        </div>
        <!--驳回注册申请模态框-->
        <edit-modal ref="rejectModal">
            <Form :model="formData"
                  key="rejectForm"
                  ref="rejectForm"
                  :rules="ruleValidate"
                  :label-width="0">
                <FormItem :label="channelType === 'per' ? $t('cooperaChannelPer') : $t('cooperaChannelOrg') + '：'">
                    <span>张大发</span>
                </FormItem>
                <FormItem label="驳回原因：" prop="passReason">
                    <Input v-model="formData.passReason"
                           placeholder="请填写驳回原因，不超过20个字符"
                           :maxlength="20"
                           type="textarea"
                           style="width: 280px"/>
                </FormItem>
            </Form>
        </edit-modal>
        <!--审核通过模态框-->
        <edit-modal ref="passModal">
            <Form :model="formData"
                  key="passForm"
                  ref="passForm"
                  :rules="ruleValidate"
                  :label-width="0">
                <FormItem :label="channelType === 'per' ? $t('cooperaChannelPer') : $t('cooperaChannelOrg') + '：'">
                    <span>张大发</span>
                </FormItem>
                <FormItem label="登录密码将发送至：" prop="email">
                    <Input v-model="formData.email" style="width: 280px"/>
                </FormItem>
            </Form>
        </edit-modal>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import tableCom from '../organization/tableCom';
    import editModal from '@/components/editModal/index.vue';
    export default {
        components : {
            breadCrumbHead,
            tableCom,
            editModal
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [],
                //表格数据
                tableData : [
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                ],
                //表头配置
                columnData : [
                    {
                        title: '序号',
                        minWidth: 120,
                        field: 'realName',
                        ableClick: true
                    },
                    {
                        title: '合作伙伴名称',
                        minWidth: 150,
                        field: 'examName'
                    },
                ],
                //表单校验规则
                ruleValidate : {
                    passReason : [
                        {required : true,message : '请输入驳回原因',trigger : 'blur'}
                    ],
                    email : [
                        {required : true,message : '请输入邮件地址',trigger : 'blur'}
                    ]
                },
                //表单数据
                formData : {
                    //通过原因
                    passReason : '',
                    //邮件地址
                    email : ''
                },
                //合作伙伴总数
                totalCount : 10,
                //渠道类型
                channelType : '',
                //租户详情信息
                cooperaDetail : {
                    name :'租户：广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社广州小星星旅行社'
                }
            }
        },
        methods: {
            /**
             * 审核通过
             */
            auditPass () {
                this.$refs.passModal.show({
                    title : '注册申请审核通过',
                    confirmCallback : () => {
                        this.$refs.passForm.validate(valid => {
                            if(valid){
                                this.$refs.passModal.hide();
                            }
                        });
                    },
                    cancelCallback : () => {
                        this.$refs.passForm.resetFields();
                    }
                });
            },
            /**
             * 驳回申请
             */
            reject () {
                this.$refs.rejectModal.show({
                    title : '驳回注册申请',
                    confirmCallback : (pass) => {
                        this.$refs.rejectForm.validate(valid => {
                            if(valid){
                                this.$refs.rejectModal.hide();
                            }
                        });
                    },
                    cancelCallback : () => {
                        this.$refs.rejectForm.resetFields();
                    }
                });
            },
            /**
             * 获取合作伙伴数据
             */
            getPartnerData () {

            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.type){
                    if(params.type === 'per'){
                        this.channelType = 'per';
                        this.beforeRouterList = [
                            {
                                name: this.$t('cooperaChannelPer'),
                                router: {
                                    name: 'cooperaChannelPer'
                                }
                            }
                        ]
                    }else if(params.type === 'org'){
                        this.channelType = 'org';
                        this.beforeRouterList = [
                            {
                                name: this.$t('cooperaChannelOrg'),
                                router: {
                                    name: 'cooperaChannelOrg'
                                }
                            }
                        ]
                    }
                }else{
                    if(params.type === 'per'){
                        this.channelType = 'per';
                        this.beforeRouterList = [
                            {
                                name: this.$t('cooperaChannelPer'),
                                router: {
                                    name: 'cooperaChannelPer'
                                }
                            }
                        ]
                    }
                }
                this.getPartnerData();
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .coopera-channel-detail{
        @include block_outline();
        overflow: auto;

        .lessee-per-detail{
            min-height: calc(100% - 74px);
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 12px 40px;

            .less-content{
                padding: 10px 0;
                overflow: hidden;
                @include block_outline($height : 52px);

                .less-name{
                    @include block_outline(unquote('calc(100% - 226px)'));
                    font-size: $font_size_20px;
                    color: rgba($color_000,0.85);
                    float: left;
                    line-height: 32px;

                    .status{
                        display: inline-block;
                        @include block_outline(50px);
                        font-size: $font_size_14px;
                        vertical-align: top;
                        color:$color_yellow
                    }

                    .name{
                        display: inline-block;
                        max-width: calc(100% - 60px);
                        @include overflow_tip();
                    }
                }

                .audit-area{
                    float: left;
                    @include block_outline(226px);

                    .ivu-btn-primary{
                        margin-right: 5px;
                    }
                }
            }

            .cooper-detail {
                @include block_outline($height: auto);
                padding-bottom: 21px;
                border-bottom: 1px dashed $color_E1E1E1;

                .list {
                    /*display: flex;*/
                    /*align-items: center;*/
                    @include block_outline(auto);
                    min-height: 37px;
                    overflow: auto;
                    padding: 7.5px 0;
                    line-height: 22px;

                    .info-list1,
                    .info-list3,
                    .info-list4,
                    .info-list2 {
                        display: flex;
                        flex-direction: row;
                        float: left;
                        font-size: $font_size_14px;
                        /*align-items: center;*/

                        .info-key {
                            @include block_outline(auto, 100%,false);
                            color: $color_333;

                            &.fix-key{
                                width: 120px;
                                text-align: left;
                            }
                        }

                        .info-val {
                            flex: 1;
                            @include overflow_tip(auto, auto);
                            color: $color_666;

                            .reset-pass{
                                color: $color_blue;
                                font-size: $font_size_12px;
                                margin-left: 10px;
                                display: inline-block;
                                cursor: pointer;
                            }
                        }
                    }



                    .info-list1 {
                        @include block_outline(30%, auto);
                    }

                    .info-list2 {
                        @include block_outline(30%, auto);
                        padding-left: 15px;
                    }

                    .info-list3 {
                        @include block_outline(40%, auto);
                        padding-left: 15px;
                    }

                    .info-list4{
                        @include block_outline(100%, auto);

                        .info-val{
                            overflow: auto;
                            white-space: normal;
                        }
                    }
                }
            }

            .partner-area{
                margin-top: 20px;
                @include block_outline(400px,auto);

                .partner-name{
                    @include block_outline($height : 34px);
                    font-size: 16px;
                    color: $color_333;
                    padding: 5px 0;
                }

                .count{
                    @include block_outline($height : 29px);
                    padding: 5px 0;
                    font-size: $font_size_14px;
                    color: $color_666;
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
