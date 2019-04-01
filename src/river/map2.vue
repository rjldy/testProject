// export default {
//   data() {
//     return {
//       count: 1,
//       // slotStyle: {
//       //   padding: "2px 8px",
//       //   background: "#eee",
//       //   color: "#333",
//       //   border: "1px solid #aaa"
//       // },
//       zoom: 12,
//       center: [[118.795917, 32.027057], [118.915536, 32.03269]],
//       markers: [
//         {
//           // position: [118.74881,31.952822],
//           events: {
//             click: () => {
//               alert("click marker");
//             },
//             dragend: e => {
//               console.log("---event---: dragend");
//               // this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
//             }
//           },
//           visible: true,
//           draggable: true,
//           template: "<span>1</span>"
//         }
//       ],
//       groundimages: [
//         {
//           url: "//faas.elemecdn.com/desktop/media/img/appqc.95e532.png",
//           bounds: [[118.823262, 31.99595], [118.843959, 31.949881]],
//           events: {
//             click() {
//               alert("click groundimage");
//             }
//           }
//         }
//       ],
//       windows: [
//         {
//           position: [118.709141, 31.976839],
//           content: "Hi! I am here!",
//           visible: true,
//           events: {
//             close() {
//               console.log("close infowindow1");
//             }
//           }
//         },
//         {
//           position: [118.747373, 32.010892],
//           content: "Hi! I am here too!",
//           visible: true,
//           events: {
//             close() {
//               console.log("close infowindow2");
//             }
//           }
//         }
//       ],
//       slotWindow: {
//         position: [118.747373, 32.010892]
//       },
//       currentWindow: {
//         position: [0, 0],
//         content: "",
//         events: {},
//         visible: false
//       },
//       // renderMarker: {
//       //   position: [118.74881, 31.952822],
//       //   contentRender: (h, instance) => {
//       //     // if use jsx you can write in this
//       //     // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
//       //     return h(
//       //       "div",
//       //       {
//       //         style: {
//       //           background: "#80cbc4",
//       //           whiteSpace: "nowrap",
//       //           border: "solid #ddd 1px",
//       //           color: "#f00"
//       //         },
//       //         on: {
//       //           click: () => {
//       //             const position = this.renderMarker.position;
//       //             this.renderMarker.position = [
//       //               position[0] + 0.002,
//       //               position[1] - 0.002
//       //             ];
//       //           }
//       //         }
//       //       },
//       //       ["marker inner text"]
//       //     );
//       //   }
//       // },
//       componentMarker: {
//         position: [118.74881, 31.952822],
//         contentRender: (h, instance) =>
//           h(
//             exampleComponents,
//             {
//               style: { backgroundColor: "#fff" },
//               props: { text: "father is here" }
//             },
//             ["xxxxxxx"]
//           )
//       },
//       slotMarker: {
//         position: [118.74881, 31.952822]
//       }
//     };
//   },
//   methods: {
//     switchWindow(tab) {
//       this.currentWindow.visible = false;
//       this.$nextTick(() => {
//         this.currentWindow = this.windows[tab];
//         this.currentWindow.visible = true;
//       });
//     },
//     onClick() {
//       this.count += 1;
//     },
//     changePosition() {
//       let position = this.markers[0].position;
//       this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
//     },
//     chnageDraggle() {
//       let draggable = this.markers[0].draggable;
//       this.markers[0].draggable = !draggable;
//     },
//     toggleVisible() {
//       let visableVar = this.markers[0].visible;
//       this.markers[0].visible = !visableVar;
//     },
//     addMarker() {
//       let marker = {
//         position: [
//           121.5273285 + (Math.random() - 0.5) * 0.02,
//           31.21515044 + (Math.random() - 0.5) * 0.02
//         ]
//       };
//       this.markers.push(marker);
//     },
//     removeMarker() {
//       if (!this.markers.length) return;
//       this.markers.splice(this.markers.length - 1, 1);
//     }
//   }
// };

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
    <el-amap-marker
      v-for="(marker, index) in markers"
      :position="marker.position"
      :events="marker.events"
      :visible="marker.visible"
      :draggable="marker.draggable"
    ></el-amap-marker>
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
      markers: [
        {
          position: [118.838749, 32.022404],
          events: {
            click: () => {
              // alert(this.windows[0].template);
              this.window = this.window[0];
              this.$nextTick(() => {
                console.log(this.window.visible);
                this.window.visible = true;
                console.log("123");
              });
            }
          },
          draggable: false,
          template: "<span>1</span>"
        }
      ],
      window: [
        {
          position: [118.838749, 32.022404],
          visible: false,
          template: `<button @click="handler('hello')">{{ source }}</button>`,
          content: `<div class="prompt"><span>123</span></div>`,
          events: {
            close() {
              console.log("close infowindow1");
            }
          }
        }
      ],
      mounted() {
        windows.push({
          position: [118.838749, 32.022404],
          content: `<div class="prompt"><span>123</span></div>`,
          visible: false
        });
      },
      // windows: [
      //   {
      //     position: [118.838749, 32.022404],
      //     content: `<div class="prompt"><span>123</span></div>`
      //   }
      // ],
      events: {
        init: o => {
          console.log(o.getCenter());
          console.log(this.$refs.map.$$getInstance());
          o.getCity(result => {
            console.log(result);
          });
        },
        // moveend: () => {},
        zoomchange: () => {},
        click: e => {
          // alert("map clicked");
          console.log("单击");
        },
        dblclick: e => {
          console.log("双击");
        },
        //平移结束触发
        moveend() {
          // alert("移动结束");
        }
      },
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        }
      ]
    };
    this.markers = markers;
    this.windows = windows;
  },
  methods: {
    getMap() {
      // amap vue component
      console.log(amapManager._componentMap);
      // gaode map instance
      console.log(amapManager._map);
    }
  }
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


