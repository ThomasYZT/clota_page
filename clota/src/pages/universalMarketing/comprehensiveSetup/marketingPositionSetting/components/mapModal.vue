<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <Modal v-model="isMapShow"
           :title="$t('chooseLongitudeAndLatitude')"
           class-name="vertical-center-modal map-modal"
           width="600"
           :mask-closable="false">

        <div class="map-wrapper">
            <div v-if="isMapShow" id="map-container" style="width:100%; height:300px"></div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button class="ivu-btn-90px"
                    type="primary"
                    @click="save" >{{$t('save')}}</Button>
            <Button class="ivu-btn-90px"
                    type="ghost"
                    @click="hide()" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import { mapActions } from 'vuex';
    import qqMap from 'qqMap';
    export default {
        components : {},
        data () {
            return {
                isMapShow : false,
                position : {
                    lat : '',
                    lng : '',
                },
            };
        },
        methods : {
            ...mapActions([
                'getLocation'
            ]),
            /**
             * 显示模态框
             */
            show () {
                this.isMapShow = true;
                this.initMap();
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.isMapShow = false;
            },
            /**
             * 保存位置信息
             */
            save () {
                this.isMapShow = false;
                this.$emit("setPosition", this.position);
            },
            initMap () {
                let map, marker;
                this.getLocation().then((info) => {
                    //获取当前地理位置
                    this.position = new qqMap.maps.LatLng(info.lat, info.lng);
                    //初始化map
                    map = new qqMap.maps.Map(document.getElementById("map-container"), {
                        zoom : 13,
                        //启用缩放控件
                        zoomControl : true,
                        // 地图的中心地理坐标。
                        center : this.position,
                        //禁用地图控件
                        mapTypeControl : false,
                        //禁用比理尺
                        scaleControl : false,
                        //禁用平移控件
                        panControl : false,
                    });
                    //该地图类型显示普通的街道地图
                    map.setMapTypeId(qqMap.maps.MapTypeId.ROADMAP);
                    //创建marker
                    marker = new qqMap.maps.Marker({
                        position : this.position,
                        map : map,
                        animation : qqMap.maps.MarkerAnimation.BOUNCE
                    });
                    //监听中心坐标点移动
                    qqMap.maps.event.addListener(map, 'center_changed', () => {
                        this.position.lat = map.getCenter().lat.toString().substring(0, 8);
                        this.position.lng = map.getCenter().lng.toString().substring(0, 8);
                        marker.setPosition(map.getCenter());
                    });
                });
                //去除地图logo
                this.$nextTick(() => {
                    document.querySelector("#map-container").addEventListener("DOMNodeInserted",() => {
                        if (document.querySelector(".smnoprint")) {
                            document.querySelector("#map-container div").childNodes.forEach((item, index) => {
                                if (index == 1 ) {
                                    document.querySelector("#map-container div").removeChild(item);
                                }
                            });
                        }

                    });
                })
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .map-container {


    }
</style>
