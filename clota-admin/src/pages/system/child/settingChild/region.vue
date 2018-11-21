<!--地区信息-->

<template>
    <div class="list-info">

        <div class="content-area">

            <div class="area-item province-wrap">
                <div class="title">{{$t('provinceTitle')}}</div>
                <div class="btn-area">
                    <Button type="primary"
                            class="ivu-btn-90px"
                            @click="addProvince">+ {{$t('addProvince')}}</Button>
                </div>
                <div class="list-wrap">
                    <ul>
                        <li v-for="(item,index) in provinceData"
                            :class="{'active': operateData.provinceid === item.provinceid }"
                            @click="chooseProvince($event,item)">
                            <span class="name" v-w-title="item.province">{{item.province}}</span>
                            <span class="iconfont icon-edit" @click="editProvince($event,item)"></span>
                            <span class="iconfont icon-delete" @click="confirmDelProvince($event,item)"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="area-item city-wrap">
                <div class="title">{{$t('cityTitle')}}</div>
                <div class="btn-area">
                    <Button type="primary"
                            class="ivu-btn-90px"
                            @click="addCity">+ {{$t('addCity')}}</Button>
                </div>
                <div class="list-wrap">
                    <ul>
                        <li v-for="(item,index) in cityData"
                            :class="{'active': operateData.cityid === item.cityid }"
                            @click="chooseCity($event,item)">
                            <span class="name" v-w-title="item.city">{{item.city}}</span>
                            <span class="iconfont icon-edit" @click="editCity($event,item)"></span>
                            <span class="iconfont icon-delete" @click="confirmDelCity($event,item)"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="area-wrap">
                <div class="title">{{$t('areaTitle')}}</div>
                <div class="btn-area">
                    <Input v-model.trim="areaListParams.area"
                           :placeholder="$t('validateError.pleaseInput', {msg: $t('areaName')})"/>
                    <Button type="primary"
                            class="ivu-btn-90px"
                            @click="queryList">{{$t('query')}}</Button>
                    <Button type="primary"
                            class="ivu-btn-90px"
                            @click="addArea">+ {{$t('addArea')}}</Button>
                </div>
                <div class="list-wrap">
                    <table-com
                        v-if="areaListParams.cityid ? true : false"
                        :ofsetHeight="118"
                        :show-pagination="true"
                        :column-data="regionHead"
                        :table-data="tableData"
                        :total-count="total"
                        :page-no-d.sync="areaListParams.page"
                        :page-size-d.sync="areaListParams.pageSize"
                        :border="false"
                        @query-data="queryList">
                        <el-table-column
                            slot="columnoperate"
                            :label="row.title"
                            :prop="row.field"
                            :key="row.index"
                            :width="row.width"
                            :min-width="row.minWidth"
                            show-overflow-tooltip
                            slot-scope="row">
                            <template slot-scope="scoped">
                                <ul class="operate-info">
                                    <li class="normal" @click="editArea(scoped.row)">{{$t('edit')}}</li>
                                    <li class="red-label" @click="confirmDelArea(scoped.row)">{{$t('delete')}}</li>
                                </ul>
                            </template>
                        </el-table-column>
                    </table-com>
                </div>
            </div>

        </div>

        <!--删除模态框-->
        <del-modal ref="delModal">
            <span class="content-text">{{$t('isDoing')}}{{$t('delete')}}<span class="yellow-label"> {{delUnits[type]}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>

        <!--编辑省份模态框-->
        <edit-province ref="addProModal"></edit-province>

        <!--编辑城市模态框-->
        <edit-city ref="addCityModal" :operate-data="operateData"></edit-city>

        <!--编辑城市模态框-->
        <edit-area ref="addAreaModal" :operate-data="operateData"></edit-area>

    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import delModal from '@/components/delModal/index.vue';
    import { regionHead } from './regionConfig';
    import ajax from '@/api/index';
    import editProvince from './editProvince.vue';
    import editCity from './editCity.vue';
    import editArea from './editArea.vue';

    export default {
        components : {
            tableCom,
            delModal,
            editProvince,
            editCity,
            editArea,
        },
        data () {
            return {
                //表头配置
                regionHead : regionHead,
                //区县列表的请求参数
                areaListParams : {
                    //搜索的关键字
                    area : '',
                    cityid : '',
                    page : 1,
                    pageSize : 10
                },
                //区县列表数据
                tableData : [],
                //区县列表数据总数
                total : 0,
                //省份数据
                provinceData : [],
                //城市数据
                cityData : [],
                //删除的信息
                delUnits : {},
                //当前操作数据(修改/停用/启用/删除)
                operateData : {
                    provinceid : '',
                    cityid : '',
                    areaid : '',
                    province : '',
                    city : '',
                    area : '',
                    id : '',
                    remarks : '',
                },
                //type (province/city/area)
                type : 'province',
            };
        },
        created () {
            //查询省份列表
            this.queryProvinceList();
        },
        methods : {
            /**
             * 查询省份列表
             */
            queryProvinceList () {
                ajax.post('provinceList', {}).then(res => {
                    if (res.status === 200) {
                        this.provinceData = res.data || [];
                        this.operateData.province = res.data[0].province;
                        this.operateData.provinceid = res.data[0].provinceid;
                        this.queryCityList(res.data[0]);
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 查询城市列表
             */
            queryCityList ( data, flag ) {
                ajax.post('cityList', {
                    provinceid : data.provinceid
                }).then(res => {
                    if (res.status === 200) {
                        this.cityData = res.data || [];
                        this.operateData.city = res.data[0].city;
                        this.operateData.cityid = res.data[0].cityid;
                        this.areaListParams.cityid = res.data[0].cityid;
                        if (flag) {
                            this.queryList();
                        }
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 查询区县列表
             */
            queryList () {
                ajax.post('areaList', this.areaListParams).then(res => {
                    if (res.status === 200) {
                        this.tableData = res.data.list || [];
                        this.total = res.data.totalRecord ? parseInt(res.data.totalRecord) : 0;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

            //省市选择，数据联动
            chooseProvince (event, data) {
                event.stopPropagation();
                this.operateData.province = data.province;
                this.operateData.provinceid = data.provinceid;
                this.queryCityList(data, true);
            },
            chooseCity (event, data) {
                event.stopPropagation();
                this.operateData.city = data.city;
                this.operateData.cityid = data.cityid;
                this.areaListParams.cityid = data.cityid;
                this.queryList();
            },


            /**
             * 新增省份
             */
            addProvince () {
                this.type = 'province';
                this.$refs.addProModal.show({
                    title : '新增省份',
                    confirmCallback : ( data ) => {
                        if (data) {
                            ajax.post('addProvince', {
                                name : data.name
                            }).then(res => {
                                if (res.status === 200) {
                                    this.$Message.success(this.$t('success') + this.$t('add'));
                                    //查询省份列表
                                    this.queryProvinceList();
                                } else {
                                    this.$Message.error(res.message || this.$t('fail'));
                                }
                            });
                        }
                    }
                });
            },
            /**
             * 修改省份
             * @param data
             */
            editProvince (event, data) {
                event.stopPropagation();
                data.name = data.province;
                this.type = 'province';
                this.$refs.addProModal.show({
                    data : data,
                    title : '修改省份',
                    confirmCallback : ( params ) => {
                        if (params) {
                            ajax.post('updateProvince', {
                                provinceId : params.provinceid,
                                name : params.name
                            }).then(res => {
                                if (res.status === 200) {
                                    this.$Message.success(this.$t('success') + this.$t('edit'));
                                    //查询省份列表
                                    this.queryProvinceList();
                                } else {
                                    this.$Message.error(res.message || this.$t('fail'));
                                }
                            });
                        }
                    }
                });
            },
            /**
             * 删除省份
             * @param data
             */
            confirmDelProvince (event,data) {
                event.stopPropagation();
                this.type = 'province';
                this.delUnits = data;
                this.$refs.delModal.show({
                    title : '删除省份',
                    confirmCallback : () => {
                        this.deleteProvince(data);
                    }
                });
            },
            deleteProvince ( data ) {
                ajax.post('deleteProvince', {
                    provinceId : data.provinceid
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('success') + this.$t('delete'));
                        //查询省份列表
                        this.queryProvinceList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },


            /**
             * 新增城市
             */
            addCity () {
                this.type = 'city';
                this.$refs.addCityModal.show({
                    title : '新增城市',
                    confirmCallback : ( data ) => {
                        if (data) {
                            ajax.post('addCity', {
                                provinceId : this.operateData.provinceid,
                                name : data.name
                            }).then(res => {
                                if (res.status === 200) {
                                    this.$Message.success(this.$t('success') + this.$t('add'));
                                    this.queryCityList(this.operateData, true);
                                } else {
                                    this.$Message.error(res.message || this.$t('fail'));
                                }
                            });
                        }
                    }
                });
            },
            /**
             * 修改城市
             * @param data
             */
            editCity (event,data) {
                event.stopPropagation();
                this.type = 'city';
                data.name = data.city;
                this.$refs.addCityModal.show({
                    data : data,
                    title : '修改城市',
                    confirmCallback : ( params ) => {
                        if (params) {
                            ajax.post('updateCity', {
                                provinceId : params.provinceid,
                                cityId : params.cityid,
                                name : params.name
                            }).then(res => {
                                if (res.status === 200) {
                                    this.$Message.success(this.$t('success') + this.$t('edit'));
                                    this.queryCityList(this.operateData, true);
                                } else {
                                    this.$Message.error(res.message || this.$t('fail'));
                                }
                            });
                        }
                    }
                });
            },
            /**
             * 删除城市
             * @param data
             */
            confirmDelCity (event,data) {
                event.stopPropagation();
                this.type = 'city';
                this.delUnits = data;
                this.$refs.delModal.show({
                    title : '删除城市',
                    confirmCallback : () => {
                        this.deleteCity(data);
                    }
                });
            },
            deleteCity ( data ) {
                ajax.post('deleteCity', {
                    cityId : data.cityid
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('success') + this.$t('delete'));
                        this.queryCityList(this.operateData, true);
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },


            /**
             * 新增区县
             */
            addArea () {
                this.type = 'area';
                this.$refs.addAreaModal.show({
                    title : '新增区县',
                    confirmCallback : ( data ) => {
                        if (data) {
                            ajax.post('addArea', {
                                cityId : this.operateData.cityid,
                                id : data.id,
                                remarks : data.remarks,
                                name : data.name
                            }).then(res => {
                                if (res.status === 200) {
                                    this.$Message.success(this.$t('success') + this.$t('add'));
                                    this.queryList();
                                } else {
                                    this.$Message.error(res.message || this.$t('fail'));
                                }
                            });
                        }
                    }
                });
            },
            /**
             * 修改区县
             * @param data
             */
            editArea (data) {
                this.type = 'area';
                data.name = data.area;
                this.$refs.addAreaModal.show({
                    data : data,
                    title : '修改区县',
                    confirmCallback : ( params ) => {
                        if (params) {
                            ajax.post('updateArea', {
                                areaId : params.areaid,
                                cityId : params.cityid,
                                id : params.id,
                                remarks : params.remarks,
                                name : params.name
                            }).then(res => {
                                if (res.status === 200) {
                                    this.$Message.success(this.$t('success') + this.$t('edit'));
                                    this.queryList();
                                } else {
                                    this.$Message.error(res.message || this.$t('fail'));
                                }
                            });
                        }
                    }
                });
            },
            /**
             * 删除区县
             * @param data
             */
            confirmDelArea (data) {
                this.type = 'area';
                this.delUnits = data;
                this.$refs.delModal.show({
                    title : '删除区县',
                    confirmCallback : () => {
                        this.deleteArea(data);
                    }
                });
            },
            deleteArea ( data ) {
                ajax.post('deleteArea', {
                    areaId : data.areaid,
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('success') + this.$t('delete'));
                        this.queryList();
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .list-info{
        padding: 0 30px 0 30px;
        @include block_outline();

        .icon-delete{
            color: $color_red;
        }

        .icon-edit{
            color: $color_blue;
        }

        .content-area{
            @include block_outline();
            @include clearfix();

            .btn-area{
                @include block_outline($height : 50px);


                .ivu-btn-90px{
                    margin-right: 10px;
                }

                /deep/ .ivu-input-wrapper{
                    width: 260px;
                    margin-right: 10px;
                }
            }

            .area-item{
                display: inline-block;
                float: left;
                @include block_outline($width : 25%);
            }

            .area-wrap{
                width: 50%;
                display: inline-block;
            }

            .title{
                font-size: $font_size_16px;
                line-height: 50px;
            }

            .list-wrap{
                @include block_outline($height : calc(100% - 120px));

                >ul {
                    @include block_outline($width: calc(100% - 10px));
                    overflow: auto;
                    >li{
                        line-height: 30px;
                        padding: 0 5px;

                        .iconfont{
                            display: inline-block;
                            transform: scale(0);
                        }

                        &.active{
                            background-color: $color_E6F7FF;
                        }

                        &:hover{
                            background-color: $color_E6F7FF;
                            border-radius: 4px;
                            cursor: pointer;
                            .iconfont{
                                transform: scale(1);
                            }
                        }

                        .name{
                            display: inline-block;
                            width: calc(100% - 50px);
                            vertical-align: middle;
                            @include overflow_tip();
                        }

                    }
                }
            }

        }

    }

    .ivu-form  {
        @include block_outline();
        margin-top: 40px;
        background: $color_fff;
        @include padding_place();
        padding: 0px 60px;
        overflow: auto;

        /deep/ .ivu-form {
            @include block_outline(924px, auto);
            margin: 0 auto;

            textarea.ivu-input{
                height: 70px;
            }
        }
    }

    .yellow-label{
        color: $color_yellow;
    }

    .red-label {
        color: $color_err;
    }

</style>
