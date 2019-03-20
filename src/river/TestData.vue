<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="form" :inline="true">
        <el-form-item label="姓名:" prop="name">
          <el-input size="mini" v-model="searchName" clearable placeholder="请输入姓名"></el-input>
          <!-- <el-row :gutter="2">
            <el-col :span="7">
              <el-input size="mini" v-model="searchName" placeholder="请输入姓名"></el-input>
            </el-col>
            <el-col :span="5">年龄:
              <el-input size="mini" v-model="searchAge" placeholder="请输入年龄"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" v-on:click="getGridData()" size="mini">查询</el-button>
              <el-button type="primary" size="mini">重置</el-button>
              <el-button type="success" size="mini">添加</el-button>
            </el-col>
          </el-row>-->
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input size="mini" v-model="searchAge" clearable placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" size="mini">重置</el-button> -->
          <el-button type="success" size="mini" @click="addFormVisible= true">添加</el-button>
          <el-button type="primary" size="mini" @click="printClick()">打印</el-button>
          <!-- <el-button type="primary" size="mini" v-print="'#table_print'">打印</el-button> -->
          <!-- <el-button type="primary" size="mini" @click="exprot()">导出(exel)</el-button> -->
        </el-form-item>
        <!-- <el-form-item>
        </el-form-item>-->
      </el-form>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <!-- <el-col :span="24"> -->
            <!-- <el-card class="box-card" body-style="padding:10px;" shadow="hover"> -->
            <div ref="table_print" style="height:100%">
              <el-table
                :data="tables"
                tooltip-effect="dark"
                style="width: 100%"
                height="470"
                size="mini"
                border
                v-loading="loading"
                :header-cell-style="tableHeaderColor"
              >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="name" label="姓名" sortable v-if="show"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="birthday" label="出生日期"></el-table-column>
                <el-table-column prop="job" label="工作"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="操作" width="160">
                  <template scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      @click="handleDel(scope.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- </el-card> -->
            <!-- </el-col> -->
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              small="true"
              pager-count="5"
              :total="total"
              style="float:right;"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <div> -->
    <!--新增界面-->
    <el-dialog title="新增" v-dialogDrag :visible.sync="addFormVisible">
      <el-form :model="addForm" label-width="80px" ref="addForm" :rules="addFormRules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthday"></el-date-picker>
        </el-form-item>
        <el-form-item label="工作">
          <el-input v-model="addForm.job"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="editForm" label-width="80px" ref="editForm" :rules="editFormRules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="150"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthday"></el-date-picker>
        </el-form-item>
        <el-form-item label="工作">
          <el-input v-model="editForm.job"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- </div> -->
</template>
<script>
import util from "../components/common/until";
import LoDop from "../components/common/LodopFuncs";
export default {
  name: "sjjzcsym",
  data() {
    return {
      show: true,
      searchName: "",
      searchAge: "",
      fullscreen: true,
      editFormVisible: false,
      tableData: [],
      total: 20,
      loading: false,
      addFormVisible: false,
      addLoading: false,
      editLoading: false,
      //新增界面数据
      addForm: {
        name: "",
        age: 0,
        birthday: "",
        job: "",
        address: ""
      },
      //编辑界面数据
      editForm: {
        name: "",
        age: 0,
        birthday: "",
        job: "",
        address: ""
      },
      //验证规则
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  //计算属性
  computed: {
    tables: function() {
      var search = this.searchName;
      var age = this.searchAge;
      if (search || age) {
        return this.tableData.filter(function(dataNews) {
          console.log(dataNews);
          return Object.keys(dataNews).some(function(key) {
            // console.log(key);
            // if (key == "name" || key == "age") {
            //不加if判断就是全数据判断
            // console.log(
            //   String(dataNews[key])
            //     .toLowerCase()
            //     .indexOf(search)
            // );
            let a = String(dataNews[key])
              // .toLowerCase()
              .indexOf(search);
            let b = String(dataNews[key])
              // .toLowerCase()
              .indexOf(age);
            // console.log(a);
            // console.log(b);
            if (
              a > -1 &&
              b > -1
              // (a > -1 || b == 0) ||
              // (a == 0 || b > -1)
            ) {
              return true;
            }
            // return (
            //   (String(dataNews[key])
            //     .toLowerCase()
            //     .indexOf(search) &&
            //     String(dataNews[key])
            //       .toLowerCase()
            //       .indexOf(age)) > -1
            // );
            // }
            // if (key == "age") {
            //   return (
            //     String(dataNews[key])
            //       .toLowerCase()
            //       .indexOf(age) > -1
            //   );
            // }
          });
        });
      }
      return this.tableData;
    }
  },
  //钩子函数
  mounted() {
    this.getGridData();
    // let test = this.$refs.print;
    // console.log(test);
  },
  methods: {
    //打印按钮
    printClick() {
      let subOutputRankPrint = this.$refs.table_print;
      // console.log(subOutputRankPrint);
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();

      document.body.innerHTML = oldContent;
      window.location.reload();
      return false;

      // var htmlPath = ".." + res.data.pathHtml; //返回HTML页面路径
      // let LODOP = LoDop.getLodop();
      // console.log(LODOP);
      // // LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_按网址打印");
      // LODOP.ADD_PRINT_URL(30, 0, 746, "95%", oldContent); //746
      // LODOP.SET_PRINT_STYLEA(0, "HOrient", 3);
      // LODOP.SET_PRINT_STYLEA(0, "VOrient", 3); //		LODOP.SET_SHOW_MODE("MESSAGE_GETING_URL",""); //该语句隐藏进度条或修改提示信息 //		LODOP.SET_SHOW_MODE("MESSAGE_PARSING_URL","");//该语句隐藏进度条或修改提示信息
      // LODOP.PREVIEW();
    },
    //导出到exel
    exprot() {
      let et = XLSX.utils.table_to_book(document.getElementById("table_print")); //此处传入table的DOM节点
      // let et = XLSX.utils.table_to_book(this.$refs.print);
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([etout], {
            type: "application/octet-stream"
          }),
          "trade-publish.xlsx"
        ); //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },
    getLodop(oOBJECT, oEMBED) {
      /**************************
  本函数根据浏览器类型决定采用哪个页面元素作为Lodop对象：
  IE系列、IE内核系列的浏览器采用oOBJECT，
  其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
  如果页面没有相关对象元素，则新建一个或使用上次那个,避免重复生成。
  64位浏览器指向64位的安装程序install_lodop64.exe。
**************************/
      var strHtmInstall =
        "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
      var strHtmUpdate =
        "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
      var strHtm64_Install =
        "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
      var strHtm64_Update =
        "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
      var strHtmFireFox =
        "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
      var strHtmChrome =
        "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
      var LODOP;
      try {
        //=====判断浏览器类型:===============
        var isIE =
          navigator.userAgent.indexOf("MSIE") >= 0 ||
          navigator.userAgent.indexOf("Trident") >= 0;
        var is64IE = isIE && navigator.userAgent.indexOf("x64") >= 0;
        //=====如果页面有Lodop就直接使用，没有则新建:==========
        if (oOBJECT != undefined || oEMBED != undefined) {
          if (isIE) LODOP = oOBJECT;
          else LODOP = oEMBED;
        } else {
          if (CreatedOKLodop7766 == null) {
            LODOP = document.createElement("object");
            LODOP.setAttribute("width", 0);
            LODOP.setAttribute("height", 0);
            LODOP.setAttribute(
              "style",
              "position:absolute;left:0px;top:-100px;width:0px;height:0px;"
            );
            if (isIE)
              LODOP.setAttribute(
                "classid",
                "clsid:2105C259-1E0C-4534-8141-A753534CB4CA"
              );
            else LODOP.setAttribute("type", "application/x-print-lodop");
            document.documentElement.appendChild(LODOP);
            CreatedOKLodop7766 = LODOP;
          } else LODOP = CreatedOKLodop7766;
        }
        //=====判断Lodop插件是否安装过，没有安装或版本过低就提示下载安装:==========
        if (LODOP == null || typeof LODOP.VERSION == "undefined") {
          if (navigator.userAgent.indexOf("Chrome") >= 0)
            document.documentElement.innerHTML =
              strHtmChrome + document.documentElement.innerHTML;
          if (navigator.userAgent.indexOf("Firefox") >= 0)
            document.documentElement.innerHTML =
              strHtmFireFox + document.documentElement.innerHTML;
          if (is64IE) document.write(strHtm64_Install);
          else if (isIE) document.write(strHtmInstall);
          else
            document.documentElement.innerHTML =
              strHtmInstall + document.documentElement.innerHTML;
          return LODOP;
        } else if (LODOP.VERSION < "6.1.9.8") {
          if (is64IE) document.write(strHtm64_Update);
          else if (isIE) document.write(strHtmUpdate);
          else
            document.documentElement.innerHTML =
              strHtmUpdate + document.documentElement.innerHTML;
          return LODOP;
        }
        //=====如下空白位置适合调用统一功能(如注册码、语言选择等):====

        //============================================================
        return LODOP;
      } catch (err) {
        if (is64IE)
          document.documentElement.innerHTML =
            "Error:" + strHtm64_Install + document.documentElement.innerHTML;
        else
          document.documentElement.innerHTML =
            "Error:" + strHtmInstall + document.documentElement.innerHTML;
        return LODOP;
      }
    },
    tableHeaderColor({ row, rowIndex }) {
      return "background-color: #eee;color:black;text-align:center";
    },
    getGridData() {
      this.loading = true;
      let reqData = {
        name: this.searchName,
        age: this.searchAge
      };
      this.$http
        .get(
          "http://localhost:3001/ldy02?name_like=" +
            reqData.name +
            "&age_like=" +
            reqData.age,
          {
            //   page: this.cur_page
          }
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data;
          this.loading = false;
          // this.total = 12;
          // console.log(this.total);
          console.log(res.data);
        });
      console.log(reqData);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        age: 0,
        birthday: "",
        job: "",
        address: ""
      };
    },
    //新增
    addSubmit: function() {
      // this.addLoading = true;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            // console.log(
            //   util.formatDate.format(new Date(para.birthday), "yyyy-MM-dd")
            // );
            para.birthday =
              !para.birthday || para.birthday == ""
                ? ""
                : util.formatDate.format(new Date(para.birthday), "yyyy-MM-dd");
            // console.log(para);
            // para.id = "10";
            // console.log(this.tableData);
            console.log(this.tableData.length);
            para.id = this.tableData.length + 1;
            console.log(this.tableData.length + 1);
            this.$http.post("http://localhost:3001/ldy02", para).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.addLoading = false;
              this.addFormVisible = false;
              this.getGridData();
            });
          });
        }
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            para.birthday =
              !para.birthday || para.birthday == ""
                ? ""
                : util.formatDate.format(new Date(para.birthday), "yyyy-MM-dd");
            this.$http
              .put("http://localhost:3001/ldy02/" + para.id, para)
              .then(res => {
                this.editLoading = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.editFormVisible = false;
                this.getGridData();
              });
          });
        }
      });
    },
    //删除
    handleDel: function(index, row) {
      console.log(index);
      console.log(row);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let para = { id: row.id };
          console.log(para.id);
          this.$http
            .delete("http://localhost:3001/ldy02/" + para.id)
            .then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getGridData();
            });
        })
        .catch(() => {
          alert("删除失败！！！！");
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

