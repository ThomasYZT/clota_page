<!--组织架构树-->

<template>
    <div class="structure-tree">
        <ul class="head">
            <li class="tree-title"
                :class="{'active' : activeTap === 'fiance'}"
                @click="switchTap('fiance')">
              <span class="iconfont icon-help"></span>
              财务管理
            </li>
            <li class="tree-title"
                :class="{'active' : activeTap === 'management'}"
                @click="switchTap('management')">
              <span class="iconfont icon-help"></span>
              经营管理
            </li>
        </ul>
        <div class="search-input">
            <Input
              v-model.trim="keyWord"
              placeholder="请输入查找内容"
              icon="ios-search"
              style="width: 360px"></Input>
        </div>
        <div class="tree-plugin">
          <Tree :data="treeData"
                :render="renderContent">
          </Tree>
        </div>
      <!--删除节点模态框-->
      <del-modal v-model="delModalShow"
                 :node-detail="currentNode">
      </del-modal>
      <!--新增节点模态框-->
      <add-modal v-model="addModalShow"
                 :node-detail="currentNode"
                 @add-com-modal-show="addCompanyShow">
      </add-modal>
      <!--新增公司模态框-->
      <add-company v-model="addCompanyModalShow"
                   :chosed-node-detail="currentNode"
                   :added-node-detail="addNodeDetail"
                   @fresh-structure-data="getStructureData">
      </add-company>
    </div>
</template>

<script>
    import delModal from './child/delModal';
    import addModal from './child/addNode';
    import addCompany from './child/addCompany';
    export default {
        props : {
          //组织结构数据
          'tree-data' :{
            type : Array,
            default () {
              return [];
            }
          }
        },
        components : {
          delModal,
          addModal,
          addCompany
        },
        data() {
            return {
              //搜索关键字
              keyWord : '',
              //当前记过菜单
              activeTap : 'fiance',
              //删除节点模态框是否显示
              delModalShow : false,
              //添加节点模态框是否显示
              addModalShow : false,
              //当前操作的节点
              currentNode : {},
              //是否显示添加公司的模态框
              addCompanyModalShow : false,
              //新增的节点信息
              addNodeDetail : {}
            }
        },
        methods: {
          /**
           * 组织树render函数
           */
          renderContent (h, { root, node, data }) {
            return h('div',{
              style : {
                display : 'inline-block',
                width : 'calc(100% - 20px)'
              },
              class : {
                'title-wrap' : true
              }
            },[
              h('span',{
                class : {
                  'title-class' : true
                }
              },data.title),
              h('span',{
                class : {
                  iconfont : 'true',
                  'icon-person' : true
                },
                on : {
                  click : () =>  {
                    this.currentNode = data;
                    this.delModalShow = true;
                  }
                }
              }),
              h('span',{
                class : {
                  iconfont : 'true',
                  'icon-person' : true
                },
                on : {
                  click : () =>  {
                    this.currentNode = data;
                    this.addModalShow = true;
                  }
                }
              })
            ])
          },
          /**
           * 选择切换tap
           * @param tap
           */
          switchTap (tap) {
            this.activeTap = tap;
          },
          /**
           * 打开填写新增公司的信息
           * @param data
           */
          addCompanyShow (data) {
            this.addNodeDetail =  data;
            this.addCompanyModalShow = true;
          },
          /**
           * 获取组织结构数据
           */
          getStructureData () {

          }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .structure-tree{
    @include block_outline();
    padding: 0 20px;

    .head{
        @include block_outline($height : 68px);
        border-bottom: 1px solid $color_E1E1E1;
        padding: 23px 0 20px 0;

        .tree-title{
            float: left;
            @include block_outline($width : 50%,$height : 25px);
            font-size: $font_size_16px;
            color: $color_666;
            text-align: center;
            cursor: pointer;

            &.active{
                color: $color_blue;

                .iconfont{
                  color: $color_blue;
                }
            }

            &:nth-of-type(1){
              border-right: 1px solid $color_E1E1E1;
            }

            .iconfont{
                color: $color_666;
                font-size: $font_size_14px;
                margin-right: 10px;
            }
        }
    }

    .search-input{
        @include block_outline($height : 78px);
        padding-top: 20px;

        /deep/ .ivu-input{
            height: 32px;
        }
    }

    .tree-plugin{
      @include block_outline($height : unquote('calc(100% - 146px)'));
      overflow-x: hidden;

      /deep/ .ivu-tree-arrow{
        width: 20px;
        display: inline-block;
        font-size: $font_size_16px;
        color: $color_A8ACB4;
        position: relative;
        z-index: 5;
        vertical-align: middle;
        padding-left: 7px;
      }

      /deep/ .ivu-tree ul li{
        margin: 0;
        /*position: relative;*/
      }

      /deep/ .title-wrap{
        @include absolute_pos(relative,0,0,0,-20px);
        padding-left: 20px;
        cursor: pointer;

        &:hover{
          background: $color_fafa;

          .title-class{
            color: $color_blue;
          }

          .iconfont{
            display: inline-block;
          }
        }

        .title-class{
          @include overflow_tip(unquote('calc(100% - 40px)'),36px);
          display : inline-block;
          padding : 7px 0;
          line-height : 22px;
          font-size : 16px;
          color : #333333;
          vertical-align: middle;
        }

        .iconfont{
          display: none;
          color: $color_blue;
          font-size: 14px;
          float: right;
          margin-top: 8px;
          cursor: pointer;

          &:nth-last-of-type(2){
            margin-left : 9px;
          }
        }
      }
    }
  }
</style>
