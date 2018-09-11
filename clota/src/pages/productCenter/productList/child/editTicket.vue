<!--
内容：产品列表 - 票类列表 - 编辑/新增
作者：
日期：
-->
<template>
    <div class="edit-ticket">

        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="localeRouter">
        </bread-crumb-head>

        <div class="container">

        </div>

</div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import pick from 'lodash/pick';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead
        },
        computed: {
            localeRouter () {
                return this.type === 'add' ? this.$t('addTicket') : this.$t('editDetail');      // 新增会员 ： 修改会员信息
            },
        },
        data () {
            return {
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'ticketType',   // 产品列表--票类列表
                        router: 'ticketType',
                    }
                ],
                //新增/修改
                type: 'add',
                loading: false,
                //表单数据
                formData: {},

            }
        },
        created() {

        },
        methods: {



            /**
             * 获取路由信息
             */
            getParams(params) {
                if(params && Object.keys(params).length > 0){
                    this.type = params.type;
                    this.formData = params.info;
                }
            },
            /**
             * 初始化数据
             * @param data
             */
            initData(data) {
                this.info = JSON.parse(JSON.stringify(data));
                let memberInfo = pick(data, ['custName', 'phoneNum','emailAddr','birthDay',
                    'gender','qq', 'wechatAcct','alipayAcct','cityCode','stateCode','hobby',
                    'certificationType','idCardNumber','homeAddr','status','tpNo','tpCardNo','levelId','channelId']);
                this.member = defaultsDeep({},memberInfo);
            }

        },
    }
</script>


<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-ticket {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        /deep/ .ivu-breadcrumb {
            padding-left: 30px;
        }

        .container{

        }

    }

</style>
