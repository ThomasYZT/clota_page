<!--会员信息列表-->

<template>
    <div class="member-info-list">
        <div class="filter-head">
            <i-row>
                <i-col style="width: auto;display:inline-block;">
                    <Input v-model.trim="formData.keyWord"
                           :placeholder="$t('memberSearchKeyWord')"
                           @on-enter="queryList"
                           :style="{ 'width' : lang === 'zh-CN' ? '280px' : '360px' }"
                           style="width: 280px"/>
                </i-col>
                <i-col style="width: auto;display:inline-block;margin-left: 10px">
                    <Button type="primary" @click="queryList">{{$t('searching')}}</Button>
                </i-col>
                <i-col  style="width: auto;display:inline-block;margin-left: 10px">
                    <slot></slot>
                </i-col>
            </i-row>
        </div>
        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :page-no-d.sync="pageNo"
            :page-size-d.sync="pageSize"
            :row-click-able="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="190"
            @row-click="rowClick"
            @query-data="queryList">
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './memberInfoConfig';
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';

	export default {
	    components : {
            tableCom
        },
		data () {
			return {
			    //表单数据
				formData : {
					keyWord : ''
                },
                //表头配置
                columnData : columnData,
                //表格数据
                tableData : [],
                pageNo : 1,
                pageSize : 10,
                totalCount : 0
            };
		},
		methods : {
            /**
             * 查询会员数据
             */
            queryList () {
                if (this.formData.keyWord) {
                    ajax.post('listMemberCards',{
                        keyword : this.formData.keyWord,
                        pageNo : this.pageNo,
                        pageSize : this.pageSize,
                    }).then(res => {
                        if (res.success) {
                            this.tableData = res.data ? res.data.data : [];
                            this.totalCount = res.data ? res.data.totalRow : 0;
                        } else {
                            this.tableData = [];
                            this.totalCount = 0;
                        }
                    });
                } else {
                    this.tableData = [];
                    this.totalCount = 0;
                }
            },
            /**
             * 点击行事件
             * @param{Object} rowData 行数据
             */
            rowClick (rowData) {
                this.$emit('click-row-todo',rowData);
            }
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-info-list{
        @include block_outline();

        .filter-head{
            @include block_outline($height : 60px);
            padding: 14px 40px 0;
        }
    }
</style>
