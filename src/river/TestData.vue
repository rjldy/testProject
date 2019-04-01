<template>
  <div class="container">
    <!-- <div class="form-box"> -->
    <el-card class="box-card" shadow="hover" body-style="padding:5px;">
      <el-form ref="form" :model="form" class="form1" label-width="85px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名:" prop="name">
              <el-input size="mini" v-model="searchName" clearable placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄:" prop="age">
              <el-input size="mini" v-model="searchAge" clearable placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位名称:" prop="company">
              <el-input size="mini" clearable placeholder="请输入单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="success" size="mini" @click="addFormVisible= true">添加</el-button>
              <el-button type="primary" size="mini" @click="printClick()">打印</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- </div> -->
    <!-- <div> -->
    <el-card class="box-card table" shadow="hover" body-style="padding:5px;">
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
    </el-card>

    <!-- </div> -->
    <!-- <div> -->
    <!--新增界面 ldy测试提交-->
    <el-dialog title="新增" v-dialogDrag :visible.sync="addFormVisible" center="true">
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
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        <el-button @click.native="addFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" center="true">
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
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        <el-button @click.native="editFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- </div> -->
</template>
<script>
import util from "../common/js/until";
// import Vue from "vue";
// import Print from "../components/common/print";
// Vue.use(Print);
import $ from "jquery";
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
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();

      document.body.innerHTML = oldContent;
      window.location.reload();
      return false;

      // this.$Print(this.$refs.table_print) // 使用
    },
    tableHeaderColor({ row, rowIndex }) {
      return "background-color: #e1edf8;color:black;text-align:center";
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
          this.tableData = res.data;
          this.loading = false;
          // this.total = 12;
          // console.log(this.total);
        });
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
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            para.birthday =
              !para.birthday || para.birthday == ""
                ? ""
                : util.formatDate.format(new Date(para.birthday), "yyyy-MM-dd");
            para.id = this.tableData.length + 1;
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
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let para = { id: row.id };
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
          alert("删除失败！");
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
<style snoped>
.form1 {
  margin-top: 15px;
}
.container {
  padding: 10px;
}
.table {
  margin-top: 8px;
}
/* .from-box {
  width: 100%;
} */
</style>


