<!--
    产品标签
    作者：杨泽涛
-->
<template>
    <div class="product-tag">
        <Tag type="border"
             :closable="closable"
             :checkable="checkable"
             color="blue"
             :name="name"
             :checked="chosed"
             @on-change="toggleChecked"
             @on-close="closeTag">{{name}}</Tag>
    </div>
</template>

<script>

    export default {
        props : {
            //标签名称
            name : {
               type : String,
               default : '',
            },
            //是否有关闭按钮
            closable : {
                type : Boolean,
                default : false,
            },
            //是否可选
            checkable : {
                type : Boolean,
                default : false,
            },
            //是否被选中
            chosed : {
                type : Boolean,
                default : false,
            }
        },
        data () {
            return {};
        },
        methods : {
            /**
             *  删除标签
             *  @param event
             *  @param name
             */
            closeTag (event, name) {
                this.$emit('closeTag', name);
            },
            /**
             * 转换选中状态
             * @param type 标签选中状态
             * @param name 标签名称
             */
            toggleChecked (type, name) {
                this.$emit('toggleChecked', {
                    type : type,
                    name : name,
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .product-tag {
        display: inline-block;

        /deep/ .ivu-tag-checked {
            background-color: $color_blue !important;
            span {
                color: #fff !important;
            }
            .ivu-icon-ios-close-empty {
                color: #fff !important;
            }
            &:before {
                background-color: #fff !important;
            }
        }
        /*/deep/ .ivu-tag {*/
            /*height: 26px;*/
            /*padding: 0 15px;*/
            /*.ivu-tag-text {*/
                /*font-size: 14px;*/
            /*}*/
            /*.ivu-icon {*/

            /*}*/
            /*&:after {*/
                /*right: 33px;*/
            /*}*/
        /*}*/

    }
</style>
