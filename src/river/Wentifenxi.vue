<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="form" :inline="true" class="demo-form-inline" :model="form" label-width>
        <!-- <el-form-item label="包括下级数据:">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>-->
        <el-form-item label="河道/湖库名称:">
          <el-row :gutter="6">
            <el-col :span="8">
              <el-input readonly size="mini" placeholder="请点击选择">
                <!-- <el-button icon="el-icon-circle-plus">选择</el-button> -->
              </el-input>
            </el-col>
            <el-col :span="16">
              <el-button
                icon="el-icon-circle-plus"
                size="mini"
                @click="dialogTableVisible = true"
              >选择</el-button>
              <el-button type="primary" size="mini">查询</el-button>
              <el-button type="primary" size="mini">重置</el-button>
              <el-button type="success" size="mini">添加</el-button>
              <el-button type="success" size="mini" @click="printClick">打印</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div ref="print">
      <el-row :gutter="5">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <!-- <div class="schart-box"> -->
            <el-col :span="24">
              <el-card class="box-card" body-style="padding:10px;" shadow="hover">
                <div id="echart1" style="height:262px;width:600px;"></div>
              </el-card>
            </el-col>
            <!-- </div> -->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-col :span="24">
              <el-card class="box-card" body-style="padding:10px;" shadow="hover">
                <el-table
                  ref="multipleTable"
                  :data="tableRightData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  height="262"
                  size="mini"
                  border
                  :header-cell-style="tableHeaderColor"
                >
                  <el-table-column type="selection" width="40"></el-table-column>
                  <el-table-column type="index" width="30"></el-table-column>
                  <el-table-column prop="quetype" label="问题类型" width="165"></el-table-column>
                  <el-table-column prop="number1" label="问题总量" width="90"></el-table-column>
                  <el-table-column prop="number2" label="整改已完成" width="110"></el-table-column>
                  <el-table-column prop="number3" label="问题未处理" width="110"></el-table-column>
                  <el-table-column prop="number4" label="问题处理中" width="110"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top:10px;">
          <div class="grid-content bg-purple">
            <el-col :span="24">
              <el-card class="box-card" shadow="hover" body-style="padding:10px;">
                <el-table
                  ref="multipleTable"
                  :data="tableLeftData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  height="262"
                  size="mini"
                  border
                  :header-cell-style="tableHeaderColor"
                >
                  <el-table-column type="index" width="30"></el-table-column>
                  <el-table-column prop="river" label="河湖段/名称" width="150"></el-table-column>
                  <el-table-column prop="number1" label="问题总量" width="90"></el-table-column>
                  <el-table-column prop="number2" label="整改已完成" width="110"></el-table-column>
                  <el-table-column prop="number3" label="问题未处理" width="110"></el-table-column>
                  <el-table-column prop="number4" label="问题处理中" width="110"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </div>
        </el-col>
        <el-col :span="12" style="margin-top:10px;">
          <div class="grid-content bg-purple">
            <div class="schart-box">
              <!-- <div class="content-title">饼状图</div>
              <schart class="schart" canvasId="pie" :data="data2" type="pie" :options="options3"></schart>-->
              <el-col :span="24">
                <el-card class="box-card" shadow="hover" body-style="padding:10px;">
                  <div id="echart2" style="height:262px;width:600px;"></div>
                </el-card>
              </el-col>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog customClass="customWidth" title="河湖选择" :visible.sync="dialogTableVisible">
      <el-row :gutter="5">
        <el-col :span="6">
          <el-card class="box-card" shadow="hover" body-style="padding:5px;">
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-card>
        </el-col>
        <el-col :span="18">
          <!-- <el-row> -->
          <el-col :span="10">
            <el-input size="mini" placeholder="请点击选择" type="text"></el-input>
          </el-col>
          <el-col :span="14">
            <el-button type="primary" size="mini">查询</el-button>
            <el-button type="primary" size="mini">重置</el-button>
          </el-col>
          <el-col :span="24" style="margin-top:5px;">
            <el-card class="box-card" shadow="hover" body-style="padding:5px;">
              <el-table
                :data="dialogGridData"
                border
                height="200"
                :header-cell-style="tableHeaderColor"
              >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="dialog1" label="河道/湖库名称"></el-table-column>
                <el-table-column prop="dialog2" label="类型"></el-table-column>
                <el-table-column prop="dialog3" label="河湖/段级别"></el-table-column>
                <el-table-column prop="dialog4" label="河湖/段层级"></el-table-column>
              </el-table>
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                small="true"
                pager-count="5"
                :total="70"
              ></el-pagination>
            </el-card>
            <!-- <span slot="footer" class="dialog-footer">
              <el-button >取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>-->
          </el-col>
          <!-- </el-row> -->
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import Print from "../components/common/print";
// import echarts from "echarts";
// Vue.prototype.$echarts = echarts //将echarts存到Vue原型中
export default {
  name: "wthzfx",
  // components: {
  //   echarts
  // },
  mounted() {
    this.drawEchart1();
    this.drawEchart2();
    this.getRightGridData();
    this.getLeftGridData();
  },
  data() {
    return {
      tableRightData: [],
      tableLeftData: [],
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      dialogGridData: [
        {
          dialog1: "4",
          dialog2: "0",
          dialog3: "3",
          dialog4: "1"
        },
        {
          dialog1: "4",
          dialog2: "0",
          dialog3: "3",
          dialog4: "1"
        },
        {
          dialog1: "4",
          dialog2: "0",
          dialog3: "3",
          dialog4: "1"
        },
        {
          dialog1: "14",
          dialog2: "30",
          dialog3: "3",
          dialog4: "1"
        },
        {
          dialog1: "4",
          dialog2: "0",
          dialog3: "3",
          dialog4: "1"
        }
      ],
      ruleForm: {
        delivery: false
      },
      dialogTableVisible: false
    };
  },
  methods: {
    printClick() {
      // let subOutputRankPrint = this.$refs.print;
      // let newContent = subOutputRankPrint.innerHTML;
      // let oldContent = document.body.innerHTML;
      // document.body.innerHTML = newContent;
      // window.print();

      // document.body.innerHTML = oldContent;
      // window.location.reload();
      // return false;
      // Print("#wrap");
      // this.$print(this.$refs.print);
      this.$print(this.$refs.print);
    },
    tableHeaderColor({ row, rowIndex }) {
      return "background-color: #eee;color:black";
    },
    drawEchart1: function() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("echart1"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "各类情况占比情况对比\n",
          // subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: "vertical",
          textStyle: { "margin-top": "120px;" },
          left: "left",
          // x: '-1%',
          y: "15%",
          data: [
            "非法采砂",
            "侵占河湖水域岸线",
            "生活污水排放",
            "渔业资源保护",
            "非法设置入河湖排污口"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["45%", "70%"],
            data: [
              { value: 335, name: "非法采砂" },
              { value: 234, name: "侵占河湖水域岸线" },
              { value: 135, name: "生活污水排放" },
              { value: 154, name: "渔业资源保护" },
              { value: 310, name: "非法设置入河湖排污口" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawEchart2: function() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("echart2"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "问题类型解决情况分析",
          // subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: "vertical",
          textStyle: { "margin-top": "120px;" },
          left: "left",
          y: "15%",
          data: ["整改已完成", "问题处理中", "问题未处理"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "70%"],
            data: [
              { value: 335, name: "整改已完成" },
              { value: 310, name: "问题处理中" },
              { value: 234, name: "问题未处理" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //获取右上角列表数据
    getRightGridData() {
      this.$http
        .get("http://localhost:3001/ldy01", {
          page: this.cur_page
        })
        .then(res => {
          console.log(res);
          this.tableRightData = res.data;
          // this.total = 12;
          // console.log(this.total);
          console.log(res.data);
        });
    },
    getLeftGridData() {
      this.$http
        .get("http://localhost:3001/ldy02", {
          page: this.cur_page
        })
        .then(res => {
          console.log(res);
          this.tableLeftData = res.data;
          // this.total = 12;
          // console.log(this.total);
          console.log(res.data);
        });
    }
  }
};
</script>
<style scoped>
.customWidth {
  width: 80%;
  /* height: 50%; */
}
</style>