<template>
<div>
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
// import getDictData from "../../utils/dict";
// import formatDate from "../../utils/utils";

export default {
  name: "ReservationModal",
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
        if (row.reservationStatus === item.value) {
          return item.label;
        }
      });
    },
    handleAdd() {   // 新增数据
      this.form = {}
      this.fromVisible = true   // 打开弹窗
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
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
