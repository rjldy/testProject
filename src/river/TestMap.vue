<template>
  <el-amap
    ref="map"
    vid="amapDemo"
    :amap-manager="amapManager"
    :center="center"
    :zoom="zoom"
    :events="events"
    class="amap-demo"
  >
    <!-- <el-amap-marker
      v-for="(marker, index) in markers"
      :position="marker.position"
      :events="marker.events"
      :visible="marker.visible"
      :draggable="marker.draggable"
    ></el-amap-marker>-->
    <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></el-amap-marker>
    <el-amap-info-window
      v-if="window"
      :position="window.position"
      :visible="window.visible"
      :content="window.content"
    ></el-amap-info-window>
  </el-amap>
</template>
<script>
// NPM 方式
import { amapManager } from "vue-amap";
// CDN 方式
// let amapManager = new VueAMap.AMapManager();
export default {
  data: function() {
    return {
      amapManager,
      zoom: 12,
      center: [118.795055, 32.027547],
      markers: [],
      windows: [],
      window: ""
    };
  },
  mounted() {
  // created() {
    let markers = [];
    let windows = [];
    let num = 1;
    let self = this;
    for (let i = 1; i < num; i++) {
      markers.push({
        position: [118.820639, 32.033424 + i * 0.001],
        events: {
          click() {
            // self.windows.forEach(window => {
            //   window.visible = false;
            // });
            self.window = self.windows[i];
            self.$nextTick(() => {
              self.window.visible = true;
            });
          }
        }
      });
      windows.push({
        position: [118.820639, 32.033424 + i * 0.001],
        content: `<div class="prompt">${i}</div>`,
        visible: false
      });
    }
    this.markers = markers;
    this.windows = windows;
  }
  // methods: {
  //   getMap() {
  //     // amap vue component
  //     console.log(amapManager._componentMap);
  //     // gaode map instance
  //     console.log(amapManager._map);
  //   }
  // }
};
</script>
<style>
.amap-wrapper {
  width: 800px;
  height: 500px;
}
.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}
.content {
  padding: 0;
}
</style>


