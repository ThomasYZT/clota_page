<!--组织管理-->

<template>
  <div class="organization">
      <div class="structure">
          <structure-head>
          </structure-head>
          <div class="tree-plugin">
            <Tree :data="treeData"
                  :render="renderContent">
            </Tree>
          </div>
      </div>
      <company-detail>
      </company-detail>
  </div>
</template>

<script>
  import structureHead from './child/structureHead';
  import companyDetail from './child/companyDetail';
  export default {
    components : {
      structureHead,
      companyDetail
    },
    data () {
      return {
        //组织结构数据
        treeData: [
          {
            title: '长隆旅游集团长隆旅游集团长隆旅游集团长隆旅游集团长隆旅游集团',
            expand: true,
            children: [
              {
                title: '长隆旅游集团',
                expand: true,
                children: [
                  {
                    title: '长隆旅游集团'
                  },
                  {
                    title: '长隆旅游集团'
                  }
                ]
              },
              {
                title: '长隆旅游集团',
                expand: true,
                children: [
                  {
                    title: '长隆旅游集团'
                  },
                  {
                    title: '长隆旅游集团'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
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
    }
  }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .organization{
      @include block_outline();

      .structure{
        float: left;
        @include block_outline(400px);
        border-right: 1px solid $color_E1E1E1;

        .tree-plugin{
          padding: 0 20px 10px 20px;
          @include block_outline($height : unquote('calc(100% - 140px)'));
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
    }
</style>
