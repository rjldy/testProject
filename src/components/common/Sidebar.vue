<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-lx-home",
          index: "dashboard",
          title: "系统首页"
        },
        {
          icon: "el-icon-lx-cascades",
          index: "table",
          title: "基础表格"
        },
        {
          icon: "el-icon-lx-copy",
          index: "tabs",
          title: "tab选项卡"
        },
        {
          icon: "el-icon-lx-calendar",
          index: "3",
          title: "表单相关",
          subs: [
            {
              index: "form",
              title: "基本表单"
            },
            {
              index: "3-1",
              title: "三级菜单",
              subs: [
                {
                  index: "editor",
                  title: "富文本编辑器"
                },
                {
                  index: "markdown",
                  title: "markdown编辑器"
                }
              ]
            },
            {
              index: "upload",
              title: "文件上传"
            }
          ]
        },
        {
          icon: "el-icon-lx-emoji",
          index: "icon",
          title: "自定义图标"
        },
        {
          icon: "el-icon-lx-favor",
          index: "charts",
          title: "schart图表"
        },
        {
          icon: "el-icon-rank",
          index: "6",
          title: "拖拽组件",
          subs: [
            {
              index: "drag",
              title: "拖拽列表"
            },
            {
              index: "dialog",
              title: "拖拽弹框"
            }
          ]
        },
        {
          icon: "el-icon-lx-warn",
          index: "7",
          title: "错误处理",
          subs: [
            {
              index: "permission",
              title: "权限测试"
            },
            {
              index: "404",
              title: "404页面"
            }
          ]
        },
        {
          icon: "el-icon-tickets",
          index: "8",
          title: "巡河管理",
          subs: [
            {
              index: "xhjltz",
              title: "巡河记录台账"
            },
            {
              index: "wthzfx",
              title: "问题汇总分析"
            },
            {
              index: "sjjzcsym",
              title: "数据加载测试页面"
            },
            {
              index: "dtym",
              title: "地图页面"
            },
            {
              index: "sjcd",
              title: "巡河管理三级菜单",
              subs: [
                {
                  index: "sjcsyi",
                  title: "测试一"
                }
              ]
            }
          ]
        },
        {
          icon: "el-icon-document",
          index: "rzdbgl",
          title: "日志、督办管理",
          subs: [
            {
              index: "hzrz",
              title: "河长日志"
            },
            {
              index: "yddc",
              title: "月度督查"
            },
            {
              index: "nddc",
              title: "年度督查"
            }
          ]
        },
        {
          icon: "el-icon-tickets",
          index: "lhzf",
          title: "联合执法",
          subs: [
            {
              index: "lhzfjltz",
              title: "联合执法记录台账"
            },
            {
              index: "lhzfwtdb",
              title: "联合执法问题督办"
            }
          ]
        },
        {
          icon: "el-icon-tickets",
          index: "shjd",
          title: "社会监督",
          subs: [
            {
              index: "shjdwttz",
              title: "社会监督问题台账"
            },
            {
              index: "shjdwtsx",
              title: "社会监督问题筛选"
            },
            {
              index: "shjdwtdb",
              title: "社会监督问题督办"
            },
            {
              index: "shjdycxx",
              title: "社会监督异常信息"
            },
            {
              index: "shjdwtfx",
              title: "社会监督问题分析"
            }
          ]
        },
        {
          icon: "el-icon-document",
          index: "wtkgl",
          title: "问题库管理",
          subs: [
            {
              index: "wtzgdb",
              title: "问题整改督办"
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
