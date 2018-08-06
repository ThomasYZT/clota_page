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
    </div>
</template>

<script>
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
        data() {
            return {
              //搜索关键字
              keyWord : '',
              //当前记过菜单
              activeTap : 'fiance'
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
                }
              }),
              h('span',{
                class : {
                  iconfont : 'true',
                  'icon-person' : true
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
