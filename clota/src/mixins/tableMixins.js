import { configVariable } from '@/assets/js/constVariable';

/**
 * 表格混合
 */
export default {
    data () {
        return {
            //表格高度
            tableHeight : '0px',
            //是否在加载中
            isLoading : false,
            //每页大小配置
            pageSizeConfig : configVariable.pageSizeConfig,
            //每页大小
            pageSize : configVariable.pageDefaultSize,
            //当前页码
            pageNo : 1,
            //查询关键字
            keyWord : '',
            //容器去除不包含表格的高度
            spaceOffset : 119,
            //不需要分页的最大每页条数
            maxPageSize : 9999
        };
    },
    methods : {
        /**
         * 注册监听页面缩放事件
         */
        registerWindowResize () {
            window.addEventListener('resize', this.setTableHeight);
        },
        /**
         * 解除监听页面缩放事件
         */
        unregisterWindowResize () {
            window.removeEventListener('resize', this.setTableHeight);
        },
        /**
         * 设置表格高度
         */
        setTableHeight () {
            let content = this.$el;
            if (content) {
                let height = this.tableData.length * 48 + 49;
                if (height > content.offsetHeight - this.spaceOffset) {
                    this.tableHeight = content.offsetHeight - this.spaceOffset + 'px';
                } else {
                    this.tableHeight = height + 'px';

                }
            } else {
                this.tableHeight = 49 + 'px';
            }
        },

        handleSizeChange (val) {
            this.pageSize = val;
            this.$emit('update:pageSizeD',val);
            this.queryList();
        },
        handleCurrentChange (val) {
            this.pageNo = val;
            this.$emit('update:pageNoD',val);
            this.queryList();
        }
    },
    mounted () {
        this.registerWindowResize();
        this.setTableHeight();
    },
    beforeDestroy () {
        this.unregisterWindowResize();
    }
};
