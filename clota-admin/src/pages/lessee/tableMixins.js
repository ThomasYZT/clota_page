
import {configVariable} from '../../assets/js/constVariable';
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
      //每页大小
      pageSize : configVariable.pageDefaultSize,
      //当前页码
      pageNo : 1,
      //查询关键字
      keyWord : ''
    }
  },
  methods :{
    /**
     * 注册监听页面缩放事件
     */
    registerWindowResize () {
      window.addEventListener('resize',this.setTableHeight);
    },
    /**
     * 解除监听页面缩放事件
     */
    unregisterWindowResize () {
      window.removeEventListener('resize',this.setTableHeight);
    },
    /**
     * 设置表格高度
     */
    setTableHeight () {
      let content = this.$el;
      if(content){
        let height = this.tableData.length * 48 + 48;
        if(height > content.offsetHeight - 119){
          this.tableHeight = content.offsetHeight - 119 + 'px';
        }else{
          this.tableHeight = height + 'px';
        }
      }else{
        this.tableHeight = 48 + 'px';
      }
    },
  },
  mounted () {
    this.registerWindowResize();
    this.setTableHeight();
  },
  beforeDestroy (){
    this.unregisterWindowResize();
  }
}
