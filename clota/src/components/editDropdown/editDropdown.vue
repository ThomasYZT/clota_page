<template>
  <div class="editDropdown">
    <div class="header" @click="showList">
      <span>全部分组</span>
      <span class="icon"></span>
    </div>
    <ul >
      <li v-show='showListValue' v-for="(item,index) in dataList">
        <div class="editInput" v-if="item.showInputValue">
          <div class="input">
            <Input v-model="keywards" size="small"/>
          </div>
          <span class="cancel" @click="cancel(item)">取消</span>
          <span class="save" @click="save">保存</span>
        </div>
        <div class="edutText" v-if="!item.showInputValue">
          <span class="text">{{item.name}}</span>
          <span class="delete" @click="deleteList">d</span>
          <span class="edit" @click="editList(item)">{{item.showInputValue}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>



<script>
  import ajax from '@/api/ajaxList'
  export default {
    props:['dataList'],
    components: {
    },
    data() {
      return {
        keywards:'',
        showListValue:false,

      }
    },
    methods: {
      showList(){
        this.showListValue = !this.showListValue;
        if(!this.showListValue){
          this.dataList.map(item => {return item.showInputValue=false});
        }
      },
      save(){
        this.$emit('saveList',this.keywards);
      },
      cancel(item){
        item.showInputValue = false;
        for(let i=0;i<this.dataList.length;i++){
          if(item.id = this.dataList[i].id){
            this.dataList.splice(i,1,this.dataList[i])
          }
        }
      },
      deleteList(){
        this.$emit('deleteList')
      },
      editList(item){
        item.showInputValue = true;
        for(let i=0;i<this.dataList.length;i++){
          if(item.id = this.dataList[i].id){
            this.dataList.splice(i,1,this.dataList[i])
          }
        }
      },
      init(){
        if(this.dataList&&this.dataList.length>0){
          this.dataList.map(item => {return item.showInputValue=false});
        }
      }
    },
    computed: {
    },
    created () {
      this.init();
    },
  }
</script>

<style lang="scss"  scoped>
  @import '~@/assets/scss/base';
  .editDropdown{
    position: relative;
    .header{
      background: #FFFFFF;
      border: 1px solid #E0E0E0;
      border-radius: 4px;
      width: 280px;
      height: 32px;
      line-height: 30px;
      font-size: 14px;
      color: #333333;
      padding: 0 13.5px;
      clear: both;
      overflow: hidden;
    }
    ul{
      position: absolute;
      top: 35px;
      left: 0;
      z-index: 300;
      background: #FFFFFF;
      border: 1px solid #DFE3E9;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);
      li{
        width: 280px;
        .editInput{
          clear: both;
          overflow: hidden;
          .input{
            width: 191px;
            float: left;
            margin-top: 4px;
            margin-left: 10px;
          }
          .save{
            font-size: 12px;
            color: #2F70DF;
            float: right;
            line-height: 32px;
            margin-right: 5px;
            cursor: pointer;
          }
          .cancel{
            font-size: 12px;
            color: #999999;
            float: right;
            line-height: 32px;
            margin-right: 10px;
            cursor: pointer;
          }
        }
        .edutText{
          font-size: 14px;
          color: #333333;
          padding: 0 19px;
          line-height: 32px;
          height: 32px;
          .text{
            width: 100%;
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            line-height: 32px;
            font-size: 14px;
            color: #333333;
            float: left;
          }
          .edit{
            display: none;
            width: 24px;
            height: 100%;
            float: right;
            cursor: pointer;
            margin-right: 5px;
            text-align: center;
            background:#2F70DF;
          }
          .delete{
            display: none;
            width: 24px;
            height: 100%;
            float: right;
            cursor: pointer;
            text-align: center;
            background:#EB6751;
          }
          &:hover{
            padding: 0 10px 0 19px;
            background: #EFF1F3;
            .text{
              width: 191px;
            }
            .delete{
              display: block;
            }
            .edit{
              display: block;
            }
          }
        }
      }
    }
  }
</style>
