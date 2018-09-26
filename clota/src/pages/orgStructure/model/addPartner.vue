<template>
    <Modal
        v-model="visible"
        class="addPartner"
        class-name="vertical-center-modal"
        :mask-closable="false"
        :width="560"
        @on-cancel="hide">
        <!--自定义页头-->
        <div slot="header" class="ivu-modal-header-inner">
            <span>{{type=='add' ? $t('新增合作伙伴') : $t('修改合作伙伴')}}</span>
        </div>
        <!--内容区域-->
        <Form ref="formValidate" :model="addPartner" :rules="ruleValidate" :label-width="120">
            <Form-item label="合作伙伴名称" prop="partnerId">
                <Select v-model="addPartner.partnerId"
                        :disabled="type=='modify'"
                        @on-change="handlePartnerChanged">
                    <Option v-for="item in partners" :value="item.id" :key="item.id">{{ item.orgName }}</Option>
                </Select>
            </Form-item>

            <Form-item label="协议起止日期" prop="startDate">
                <DatePicker v-model="protoDate"
                            type="daterange"
                            placement="bottom-end"
                            :placeholder="$t('selectField', {msg: ''})"
                            style="width: 100%"
                            format="yyyy-MM-dd"
                            @on-change="changeDateRange">
                </DatePicker>
            </Form-item>

            <Form-item label="销售渠道分组" prop="saleGroupId">
                <Select v-model="addPartner.saleGroupId">
                    <Option v-for="item in saleChannels" :value="item.id" :key="item.id">{{ item.groupName }}</Option>
                </Select>
            </Form-item>

            <Form-item :label="$t('remark') + '：'" prop="description"><!--备注-->
                <Input v-model="addPartner.description" type="textarea" :rows="4" :placeholder="$t('inputField', {field: ''})"/>
            </Form-item>

            <Form-item label="是否启用协议" prop="status">
                <RadioGroup v-model="addPartner.status">
                    <Radio label="valid"><span>启用</span></Radio>
                    <Radio label="invalid"><span>暂不启用</span></Radio>
                </RadioGroup>
            </Form-item>

        </Form>
        <!--自定义页脚-->
        <div slot="footer">
            <template>
                <i-button type="primary" @click="submit()">{{$t('save')}}</i-button>
                <i-button type="ghost" @click="hide">{{$t('cancel')}}</i-button>
            </template>
        </div>

    </Modal>

</template>

<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import pick from 'lodash/pick';

    export default {
        components: {},
        props: [],
        data() {
            return {
                visible: false,
                readonly: false,
                loading: false,
                addPartner: {
                    partnerId: '',
                    startDate: '',
                    endDate: '',
                    saleGroupId: '',
                    channelName: '',
                    description: '',
                    status: 'valid',
                },

                // 表单校验
                ruleValidate: {
                    partnerId: [
                        {required: true, message: '请选择合作伙伴', trigger: 'change'},
                    ],
                    startDate: [
                        {required: true, message: '请选择协议起止日期', trigger: 'change'},
                    ],
                    endDate: [
                        {required: true, message: '请选择协议起止日期', trigger: 'change'},
                    ],
                    description: [
                        { max: 100, message: this.$t('errorMaxLength', {field: this.$t('remark'), length: 100}), trigger: 'blur' },     // 备注不能超过100字符
                    ]
                },
                // 所有合作伙伴列表
                partners: [],
                // 销售渠道分组列表
                saleChannels: [],
                // 协议起止日期
                protoDate: [],
                // 新增or修改
                type: 'add',
            }
        },
        computed: {},
        created() {
            this.getSaleGroup();
            this.getAllPartnerList();
        },
        watch: {},
        methods: {

            /**
             * 显示模态框
             * @param data {data有值表示查看，反之新增}
             */
            show(data) {
                if( data.item ){
                    this.addPartner = defaultsDeep({}, pick(data.item, [...Object.keys(this.addPartner), 'id']), this.addPartner);
                    this.protoDate = [data.item.startDate, data.item.endDate];
                }
                this.type = data.type;

                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide() {
                this.visible = false;
                this.$refs.formValidate.resetFields();
                this.protoDate = [];
            },
            /**
             * 创建自定义指标表单校验
             */
            submit() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.confirmAddPartner();
                    }
                });
            },
            // 获取销售渠道分组列表
            getSaleGroup() {
                ajax.post('getOrgGroupList', {
                    groupType: 'sale'
                }).then(res => {
                    if (res.success) {
                        this.saleChannels = res.data || [];
                    }
                });
            },
            // 获取所有合作伙伴
            getAllPartnerList() {
                ajax.post('queryAllPartnerList').then(res => {
                    if (res.success) {
                        this.partners = res.data || [];
                    }
                });
            },
            // 协议日期改变的处理
            changeDateRange(date) {
                this.addPartner.startDate = date[0];
                this.addPartner.endDate = date[1];
            },
            // 确定新增/修改合作伙伴
            confirmAddPartner() {
                let partnerObj = {};
                if (this.type=='add') {
                    partnerObj.apiKey = 'addPartner';
                    partnerObj.successTip = '您已成功新增合作伙伴';
                    partnerObj.failTip = '新增合作伙伴失败';
                } else if (this.type=='modify') {
                    partnerObj.apiKey = 'updatePartner';
                    partnerObj.successTip = '您已成功修改合作伙伴';
                    partnerObj.failTip = '修改合作伙伴失败';
                }
                this.addPartner.startDate = new Date(this.addPartner.startDate).format('yyyy-MM-dd');
                this.addPartner.endDate = new Date(this.addPartner.endDate).format('yyyy-MM-dd');

                ajax.post(partnerObj.apiKey, this.addPartner).then(res => {
                    if (res.success) {
                        // 新增成功后，根据partnerId 找到匹配的合作伙伴数据，并将合作伙伴名称显示在提示信息内容中
                        let partnerName = this.partners.find((item, i) => {
                            return item.id === this.addPartner.partnerId;
                        });
                        this.$Message.success( partnerObj.successTip + '：' + (partnerName ? partnerName.orgName : '') );
                        this.$emit('on-add-success');
                        this.hide();
                    } else {
                        this.$Message.error(res.message ? res.message : partnerObj.failTip);
                    }
                });
            },
            // 改变合作伙伴选择的处理
            handlePartnerChanged(selected) {
                if (selected) {
                    this.addPartner.channelName = this.partners.find((item, i) => {
                        return item.id === selected;
                    }).orgName;
                }
            },

        }
    }
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    @import '../commonFile/common';

    .addPartner {
        /deep/ .ivu-modal-body {
            padding: 42px 90px 40px 66px;
        }
        /deep/ .ivu-btn {
            width: 88px;
        }
    }
</style>
