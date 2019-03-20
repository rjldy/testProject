<template>
  <!-- <div class="container">
    <div class="form-box">
  <h2>地图测试</h2>-->
  <!-- <div class="amap-wrapper"> -->
  <el-amap class="amap-box" :vid="amap-vue" :center="center" :zoom="zoom" :events="events">
    <el-amap-marker
      vid="component-marker"
      :position="componentMarker.position"
      :content-render="componentMarker.contentRender"
    ></el-amap-marker>
    <el-amap-marker
      :events="markers[0].events"
      :visible="markers[0].visible"
      :draggable="markers[0].draggable"
    ></el-amap-marker>
    <!-- <el-amap-ground-image
      
    ></el-amap-ground-image>-->
    <!-- <el-amap-info-window
      :position="currentWindow.position"
      :content="currentWindow.content"
      :visible="currentWindow.visible"
      :events="currentWindow.events"
    ></el-amap-info-window> -->
  </el-amap>
  <!-- <div class="toolbar">
    <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button>
    <button type="button" name="button" v-on:click="changePosition">change position</button>
    <button type="button" name="button" v-on:click="chnageDraggle">change draggle</button>
    <button type="button" name="button" v-on:click="addMarker">add marker</button>
    <button type="button" name="button" v-on:click="removeMarker">remove marker</button>
  </div>-->
  <!-- </div> -->
  <!-- </div>
  </div>-->
</template>
<script>
export default {
  data() {
    return {
      count: 1,
      // slotStyle: {
      //   padding: "2px 8px",
      //   background: "#eee",
      //   color: "#333",
      //   border: "1px solid #aaa"
      // },
      zoom: 12,
      center: [[118.795917, 32.027057], [118.915536, 32.03269]],
      markers: [
        {
          // position: [118.74881,31.952822],
          events: {
            click: () => {
              alert("click marker");
            },
            dragend: e => {
              console.log("---event---: dragend");
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            }
          },
          visible: true,
          draggable: true,
          template: "<span>1</span>"
        }
      ],
      groundimages: [
        {
          url: "//faas.elemecdn.com/desktop/media/img/appqc.95e532.png",
          bounds: [[118.823262, 31.99595], [118.843959, 31.949881]],
          events: {
            click() {
              alert("click groundimage");
            }
          }
        }
      ],
      windows: [
        {
          position: [118.709141, 31.976839],
          content: "Hi! I am here!",
          visible: true,
          events: {
            close() {
              console.log("close infowindow1");
            }
          }
        },
        {
          position: [118.747373, 32.010892],
          content: "Hi! I am here too!",
          visible: true,
          events: {
            close() {
              console.log("close infowindow2");
            }
          }
        }
      ],
      slotWindow: {
        position: [118.747373, 32.010892]
      },
      currentWindow: {
        position: [0, 0],
        content: "",
        events: {},
        visible: false
      },
      // renderMarker: {
      //   position: [118.74881, 31.952822],
      //   contentRender: (h, instance) => {
      //     // if use jsx you can write in this
      //     // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
      //     return h(
      //       "div",
      //       {
      //         style: {
      //           background: "#80cbc4",
      //           whiteSpace: "nowrap",
      //           border: "solid #ddd 1px",
      //           color: "#f00"
      //         },
      //         on: {
      //           click: () => {
      //             const position = this.renderMarker.position;
      //             this.renderMarker.position = [
      //               position[0] + 0.002,
      //               position[1] - 0.002
      //             ];
      //           }
      //         }
      //       },
      //       ["marker inner text"]
      //     );
      //   }
      // },
      componentMarker: {
        position: [118.74881, 31.952822],
        contentRender: (h, instance) =>
          h(
            exampleComponents,
            {
              style: { backgroundColor: "#fff" },
              props: { text: "father is here" }
            },
            ["xxxxxxx"]
          )
      },
      slotMarker: {
        position: [118.74881, 31.952822]
      }
    };
  },
  methods: {
    switchWindow(tab) {
      this.currentWindow.visible = false;
      this.$nextTick(() => {
        this.currentWindow = this.windows[tab];
        this.currentWindow.visible = true;
      });
    },
    onClick() {
      this.count += 1;
    },
    changePosition() {
      let position = this.markers[0].position;
      this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
    },
    chnageDraggle() {
      let draggable = this.markers[0].draggable;
      this.markers[0].draggable = !draggable;
    },
    toggleVisible() {
      let visableVar = this.markers[0].visible;
      this.markers[0].visible = !visableVar;
    },
    addMarker() {
      let marker = {
        position: [
          121.5273285 + (Math.random() - 0.5) * 0.02,
          31.21515044 + (Math.random() - 0.5) * 0.02
        ]
      };
      this.markers.push(marker);
    },
    removeMarker() {
      if (!this.markers.length) return;
      this.markers.splice(this.markers.length - 1, 1);
    }
  }
};
</script>
<style>
.amap-wrapper {
  width: 800px;
  height: 500px;
}
.content {
  padding: 0;
}
</style>


