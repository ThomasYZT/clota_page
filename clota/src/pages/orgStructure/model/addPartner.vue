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
            <span>新增合作伙伴</span>
        </div>
        <!--内容区域-->
        <Form ref="formValidate" :model="addPartner" :rules="ruleValidate" :label-width="120">
            <Form-item label="合作伙伴名称" prop="name">
                <Select v-model="addPartner.name">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Form-item>

            <Form-item label="协议起止日期" prop="name">
                <DatePicker type="daterange" placement="bottom-end" placeholder="Select date"
                            style="width: 100%"></DatePicker>
            </Form-item>

            <Form-item label="销售渠道分组">
                <Select v-model="addPartner.name">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Form-item>

            <Form-item :label="$t('remark') + '：'"><!--备注-->
                <Input v-model="addPartner.name" type="textarea" :rows="4" placeholder="Enter something..."/>
            </Form-item>

            <Form-item label="是否启用协议">
                <RadioGroup v-model="addPartner.name">
                    <Radio label="ok"><span>启用</span></Radio>
                    <Radio label="no"><span>暂不启用</span></Radio>
                </RadioGroup>
            </Form-item>

        </Form>
        <!--自定义页脚-->
        <div slot="footer">
            <template>
                <i-button size="small" type="primary">确认</i-button>
                <i-button type="ghost" size="small" @click="hide">取消</i-button>
            </template>
        </div>

    </Modal>

</template>

<script type="text/ecmascript-6">
    export default {
        components: {},
        props: [],
        data() {
            return {
                visible: false,
                readonly: false,
                loading: false,
                addPartner: {
                    name: '',
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '请输入小组名称', trigger: 'blur'},
                    ],
                },
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                ],
            }
        },
        computed: {},
        created() {
        },
        watch: {},
        methods: {

            /**
             * 显示模态框
             * @param data {data有值表示查看，反之新增}
             */
            show(data) {
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide() {
                this.visible = false;
            },
            /**
             * 创建自定义指标表单校验
             */
            submit() {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {

                    } else {
                    }
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    @import '../commonFile/common';

    /deep/ .addPartner {
        .ivu-modal-body {
            padding: 42px 90px 40px 66px;
        }
    }
</style>
