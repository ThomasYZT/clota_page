<!--
    工具栏组件
    作者：杨泽涛
-->
<template>
    <div class="tool-box">
        <Form ref="formInline">
            <template>
                <i-row v-for="(row,index) in Math.ceil(toolNum/4)"
                       :key="index">
                    <i-col span="8" v-for="i in generateArray(row)"  :key="i">
                        <slot :name="'tool'+i">

                        </slot>
                    </i-col>
                </i-row>
            </template>
        </Form>
    </div>
</template>

<script>
    export default {
        props : {
            //工具数量
            toolNum : {
                type : Number,
                required : true
            }
        },
        components : {},
        data () {
            return {
            };
        },
        methods : {
            generateArray (row) {
                let len = Math.ceil(this.toolNum / 3) === row && this.toolNum % 3 > 0 ? this.toolNum % 3 : 3;
                let _arr = [];
                for (let i = 0; i < len; i++) {
                    _arr[i] = ((row - 1) * 3) + i;
                }
                return _arr;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .tool-box {
        margin-top: 14px;
        padding: 0 30px
    }
</style>
