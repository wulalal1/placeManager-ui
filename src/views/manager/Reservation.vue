<template>
  <div>
    <div class="search" style="margin: 10px">
      <el-input placeholder="请输入账号查询" style="width: 200px" v-model="username"></el-input>
      <el-button type="info" plain style="margin-left: 10px" @click="load(1)">查询</el-button>
      <el-button type="warning" plain style="margin-left: 10px" @click="reset">重置</el-button>
    </div>

    <div class="operation" style="margin: 10px">
      <el-button type="success" icon="el-icon-edit" @click="handleAdd">新增预约</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="approveYD">审批</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="delBatch">批量删除</el-button>
    </div>

    <div>
      <el-table :data="tableData" strip @selection-change="handleSelectionChange" style="height: 600px">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="100" align="center" sortable></el-table-column>
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <el-table-column prop="placeCode" label="预约（场地编号）" width="200"></el-table-column>
        <el-table-column prop="startTime" width="140" label="开始时间" :formatter="formatDate"></el-table-column>
        <el-table-column prop="endTime" width="140" label="结束时间" :formatter="formatDate"></el-table-column>
        <el-table-column prop="reservationName" label="预约名称"></el-table-column>
        <el-table-column prop="reservationPName" label="预约人姓名"></el-table-column>
        <el-table-column prop="reservationPPhone" label="预约人电话"></el-table-column>
        <el-table-column prop="reservationStatus" label="预约状态" :formatter="statusFormat"></el-table-column>
        <el-table-column prop="reservationReason" label="预约原因"></el-table-column>
        <el-table-column prop="reservationQxReason" label="取消预约原因"></el-table-column>
        <el-table-column prop="reservationType" label="预约类型" :formatter="natureFormat"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination" style="margin: 10px">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </div>


    <el-dialog title="预约信息" :visible.sync="fromVisible" width="40%" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="form" label-width="100px" style="padding-right: 50px" :rules="rules" ref="formRef">
        <el-row>
          <el-form-item label="场地编号" prop="placeCode">
            <t-select-table
                @radioChange="radioChange"
                v-model="form.placeCode"
                ref="selectTable"
                :table="table"
                :columns="table.columns"
                :max-height="540"
                :keywords="{ label: 'placeCode', value: 'placeCode' }"
                style="width: 450px;"
            />
            <el-button style="margin-left: 14px" type="primary" size="mini" @click="clear">清空选中</el-button>
          </el-form-item>

        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预约名称" prop="reservationName">
              <el-input v-model="form.reservationName" placeholder="预约名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约类型" prop="reservationType">
              <el-select v-model="form.reservationType" clearable placeholder="预约类型">
                <el-option
                    v-for="item in placeNatureDict"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预约人姓名" prop="reservationPName">
              <el-input v-model="form.reservationPName" placeholder="预约人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约人电话" prop="reservationPPhone">
              <el-input v-model="form.reservationPPhone" placeholder="预约人电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预约状态" prop="reservationStatus">
              <el-select v-model="form.reservationStatus" clearable disabled placeholder="预约状态">
                <el-option
                    v-for="item in YXstatusDict"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约原因" prop="reservationReason">
              <el-input v-model="form.reservationReason" placeholder="预约原因"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                  v-model="form.startTime"
                  type="datetime"
                  placeholder="开始时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="fromVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import getDictData from "../../utils/dict";
import formatDate from "../../utils/utils";

export default {
  name: "Place",
  data() {
    return {
      tableData: [],  // 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 10,  // 每页显示的个数
      total: 0,
      username: null,
      fromVisible: false,
      form: {},
      table: {
        data: [],
        columns: [
          {label: "场地编号", width: "100px", prop: "placeCode"},
          {label: "场地名称", width: "149px", prop: "placeName", noShowTip: true},
          {label: "场地长", width: "149px", prop: "placeLong"},
          {label: "场地宽", width: "110px", prop: "placeWide"},
        ],
      },
      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),
      rules: {
        placeCode: [{required: true, message: '请输入', trigger: 'blur'}],
        reservationName: [{required: true, message: '请输入', trigger: 'blur'}],
        reservationPName: [{required: true, message: '请输入', trigger: 'blur'}],
        reservationPPhone: [{required: true, message: '请输入', trigger: 'blur'}],
      },
      ids: [],
      placeNatureDict: getDictData("nature"),
      YXstatusDict: getDictData("YXstatus"),
    }
  },
  created() {
    this.load(1);
    this.initData();
  },
  methods: {
    compareTime(startTime, endTime) {
      let startTimes = new Date(startTime);
      let endTimes = new Date(endTime);
      return startTimes > endTimes
    },
    formatDate(row, column) {
      return formatDate(row, column);
    },
    async initData() {
      const {data} = await this.$request.get('/place/selectAll')
      if (data) {
        this.table.data = data
      }
    },
    radioChange(row) {
      this.form.placeCode = row.placeCode
    },
    clear() {
      this.$refs.selectTable.clear();
    },
    natureFormat(row, column) {
      return this.placeNatureDict.map((item) => {
        if (row.reservationType === item.value) {
          return item.label;
        }
      });
    },
    statusFormat(row, column) {
      return this.YXstatusDict.map((item) => {
        debugger;
        if (row.reservationStatus === item.value) {
          return item.label;
        }
      });
    },
    handleAdd() {   // 新增数据
      this.form = {}
      this.fromVisible = true   // 打开弹窗
    },
    approveYD() {   // 审批数据
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确定审批这些数据吗？', '审批通过', {type: "warning"}).then(response => {
        this.$request.delete('/reservation/approvalYD', {data: this.ids}).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    handleEdit(row) {   // 编辑数据
      this.form = JSON.parse(JSON.stringify(row))  // 给form对象赋值  注意要深拷贝数据
      this.fromVisible = true   // 打开弹窗
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          debugger;
          if (this.form.startTime >= this.form.endTime) {
            this.$message({
              showClose: true,
              message: '结束时间不能大于开始时间',
              type: 'error'
            });
            return
          }
          this.$request({
            url: '/reservation/insertAndUpdate',
            method: 'POST',
            data: this.form
          }).then(res => {
            if (res.code === '200') {  // 表示成功保存
              this.$message.success('保存成功')
              this.load(1)
              this.fromVisible = false
            } else {
              this.$message.error(res.msg)  // 弹出错误的信息
            }
          })
        }
      })
    },
    del(id) {   // 单个删除
      this.$confirm('您确定删除吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/reservation/delete/' + id).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.id)
    },
    delBatch() {   // 批量删除
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确定批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/reservation/delete/batch', {data: this.ids}).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    load(pageNum) {  // 分页查询
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/reservation/pageList', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      }).then(res => {
        this.tableData = res.data?.list
        this.total = res.data?.total
      })
    },
    reset() {
      this.username = null
      this.load(1)
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum)
    },
    handleAvatarSuccess(response, file, fileList) {
      // 把头像属性换成上传的图片的链接
      this.form.placeAvatar = response.data
    },
  }
}
</script>

<style scoped>

</style>
