<!--
内容：
作者：
日期：
-->

<template>
    <div class="seriesCourse-filterDrop">
        <el-dropdown trigger="click" placement="bottom-start" @command="getCommand">
            <span class="el-dropdown-link">
                {{colParams.label}}<i class="iconfont icon-filter"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="filter-dropdown">
                <el-dropdown-item v-for="(item,index) in colFilter" :key="index"
                                  :class="[{'active-cls': selected === index}]"
                                  :command="Object.assign(item, {prop: colParams.property, $index: index})">
                    {{item.text}}
                </el-dropdown-item>
                <el-dropdown-item> aaa</el-dropdown-item>
                <el-dropdown-item> bbb</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components: {},
        props: {
            colParams: Object,
            filters: Object
        },
        data() {
            return {
                selected: null
            }
        },
        computed: {
            colFilter: function () {
                switch (this.colParams.property) {
                    case 'signTime' :
                        this.filters.stateFilter.forEach((item) => {
                            item.text = item.name;
                        });
                        return this.filters.stateFilter;
                    case 'warn' :
                        this.filters.alertFilter.forEach((item) => {
                            item.text = item.name;
                        });
                        return this.filters.alertFilter;
                }
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            getCommand(item) {
                this.selected = item.$index;
                if (item.state) {
                    this.$emit('state-filter', item.state);
                } else {
                    this.$emit('alert-filter', item.alert);
                }
            }
        }
    };
</script>

<style lang="scss">
    .seriesCourse-filterDrop {
        &, div {
            line-height: normal !important;
            display: inline !important;
            padding: 0 !important;
        }
        .el-dropdown {
            color: #333;
        }
        .icon-filter {
            margin-left: 8px;
            color: #999;
            cursor: pointer;
        }
    }

    .el-popper.filter-dropdown {

        margin-top: 8px;
    }
</style>
