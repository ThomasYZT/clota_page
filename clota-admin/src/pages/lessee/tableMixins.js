import { configVariable } from '../../assets/js/constVariable';

/**
 * 表格混合
 */
export default {
    data () {
        return {
            //表格数据
            tableData : [],
            //表格高度
            tableHeight : '0px',
            //是否在加载中
            isLoading : false,
            //每页大小配置
            pageSizeConfig : configVariable.pageSizeConfig,
            //分页功能配置
            pageLayout : configVariable.pageLayout,
            //每页大小
            pageSize : configVariable.pageDefaultSize,
            //当前页码
            pageNo : 1,
            //查询关键字
            keyWord : '',
            //容器去除不包含表格的高度
            spaceOffset : 119,
            //总共条数
            totalCount : 0
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
                if (this.tableData.length === 0) {
                    this.tableHeight = content.offsetHeight - this.spaceOffset + 'px';
                } else {
                    let height = this.tableData.length * 49 + 49;
                    if (height > content.offsetHeight - this.spaceOffset) {
                        this.tableHeight = content.offsetHeight - this.spaceOffset + 'px';
                    } else {
                        this.tableHeight = height + 'px';
                    }
                }
            } else {
                this.tableHeight = 49 + 'px';
            }
        },
    },
    mounted () {
        this.registerWindowResize();
        this.setTableHeight();
    },
    beforeDestroy () {
        this.unregisterWindowResize();
    }
};
