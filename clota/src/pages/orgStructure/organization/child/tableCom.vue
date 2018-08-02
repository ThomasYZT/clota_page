<!--公用table组件-->

<template>
  <div class="table-com">
    <div class="table-name">
      <span class="label">{{title}}</span>
      <span class="back-up"
            @click="isPackUpLoad = !isPackUpLoad">
        {{$t(isPackUpLoad ? 'backUp' : 'upLoad')}}
      </span>
    </div>
    <transition name="fade">
      <div v-if="isPackUpLoad">
        <div class="table-bar"></div>
        <slot></slot>
        <el-table :data="tableData"
                  style="width: 100%"
                  @row-click="classDetailLink">
          <el-table-column
            v-if="columnCheck"
            type="selection"
            width="55">
          </el-table-column>
          <template
            v-for="(item,index) in columnData">
            <slot :name="'column' + index">
              <el-table-column
                v-if="item.ableClick"
                :label="item.title"
                :prop="item.field"
                :key="index"
                :width="item.width"
                :min-width="item.minWidth">
                <template slot-scope="scoped">
                    <span
                      class="borderNone iconfont"
                      :class="{'icon-male' : scoped.row['sex'] === 'm' ,'icon-female' : scoped.row['sex'] === 'f'}"></span>
                  <span
                    class="detail-hover"
                    v-w-title="scoped.row[item.field]">{{scoped.row[item.field] | contentFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-else-if="item.fixed"
                :label="item.title"
                :prop="item.field"
                :key="index"
                :width="item.width"
                :min-width="item.minWidth">
                <template slot-scope="scoped">
                    <span
                      class="operate-info"
                      v-for="list in item.operateList"
                      @click="list['click']">{{list['name']}}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-else
                :label="item.title"
                :prop="item.field"
                :key="index"
                :width="item.width"
                :min-width="item.minWidth">
                <template slot-scope="scoped">
                        <span
                          v-w-title="scoped.row[item.field]" v-if="item.type === 'time'">
                            {{scoped.row[item.field] | timeFormat('yyyy-MM-dd HH:mm')   | contentFilter}}
                        </span>
                  <span
                    v-w-title="scoped.row[item.field]" v-else>{{scoped.row[item.field]  | contentFilter}}</span>
                </template>
              </el-table-column>
            </slot>
          </template>
          <slot></slot>
        </el-table>
      </div>
    </transition>
  </div>
</template>

<script>
    export default {
        props : {
          //表格数据
          'table-data' : {
            type : Array,
            default () {
              return [];
            }
          },
          'column-data' : {
            type : [Object,Array],
            default () {
              return {};
            }
          },
          //表头信息
          'title' : {
            type : String,
            default : ''
          },
          //是否开启选择
          'column-check' : {
            type : Boolean,
            default : false
          },
          //是否展开默认值
          'is-pack-up' : {
            type : Boolean,
            default : false
          }
        },
        data() {
            return {
              //是否展开
              isPackUpLoad : this.isPackUp
            }
        },
        methods: {
          /**
           * 行点击事件
           * @param data
           */
          classDetailLink (data) {
            this.$emit('row-click',data);
          }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
  .table-com{
    .table-name{
      @include block_outline($height : 49px);
      padding: 25px 0 0 0;

      .label{
        display: inline-block;
        font-size: $font_size_16px;
        color: $color_333;
        line-height: 24px;
        vertical-align: middle;
      }

      .back-up{
        font-size: $font_size_14px;
        color: $color_blue;
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        cursor: pointer;
      }
    }
    /deep/ .el-table th:first-child .cell,
    /deep/ .el-table td:first-child .cell{
      padding-left: 16px!important;
    }

    .table-bar{
      margin-top: 16px;
    }
  }
</style>
