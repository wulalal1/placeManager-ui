<template>
  <div>
    <div class="search" style="margin: 10px">
      <el-input placeholder="请输入账号查询" style="width: 200px" v-model="username"></el-input>
      <el-button type="info" plain style="margin-left: 10px" @click="load(1)">查询</el-button>
      <el-button type="warning" plain style="margin-left: 10px" @click="reset">重置</el-button>
    </div>

    <div class="operation" style="margin: 10px">
      <el-button type="success " icon="el-icon-edit" @click="handleAdd">新增</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="delBatch">批量删除</el-button>
    </div>

    <div>
      <el-table  :data="tableData" strip @selection-change="handleSelectionChange" style="height: 600px">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="100" align="center" sortable></el-table-column>
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <el-table-column prop="placeCode" label="场地编号" width="200"></el-table-column>
        <el-table-column prop="placeName" label="场地名称"></el-table-column>
        <el-table-column label="场地图片">
          <template v-slot="scope">
            <div style="display: flex; align-items: center">
              <el-image style="width: 40px; height: 40px; border-radius: 50%" v-if="scope.row.placeAvatar"
                        :src="scope.row.placeAvatar" :preview-src-list="[scope.row.placeAvatar]"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="placeLong" label="场地长度"></el-table-column>
        <el-table-column prop="placeWide" label="场地宽度"></el-table-column>
        <el-table-column prop="placeNature" label="场地性质" :formatter="natureFormat"></el-table-column>
        <el-table-column prop="placeCharge" label="场地费用"></el-table-column>
<!--        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>-->
        <el-table-column prop="placeSatus" label="场地状态" :formatter="statusFormat"></el-table-column>
        <el-table-column prop="placeOwner" label="场地所有者"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
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


    <el-dialog title="场地" :visible.sync="fromVisible" width="40%" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="form" label-width="100px" style="padding-right: 50px" :rules="rules" ref="formRef">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="场地编号" prop="placeCode">
              <el-input v-model="form.placeCode" placeholder="场地编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="场地名称" prop="placeName">
              <el-input v-model="form.placeName" placeholder="场地名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="场地长(米)" prop="placeLong">
              <el-input v-model="form.placeLong" placeholder="场地长度"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="场地宽(米)" prop="placeWide">
              <el-input v-model="form.placeWide" placeholder="场地宽度"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="场地性质" prop="placeNature">
              <el-select v-model="form.placeNature" clearable placeholder="场地性质">
                <el-option
                    v-for="item in placeNatureDict"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="场地费用" prop="placeCharge">
              <el-input v-model="form.placeCharge" placeholder="场地费用"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

<!--
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
-->

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="场地所有者" prop="placeOwner">
              <el-input v-model="form.placeOwner" placeholder="场地所有者"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="场地状态" prop="placeSatus">
              <el-select v-model="form.placeSatus" clearable placeholder="场地状态">
                <el-option
                    v-for="item in placeStatusDict"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="form.remarks" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="图片" prop="placeAvatar">
          <el-upload
              class="avatar-uploader"
              :action="$baseUrl + '/files/upload'"
              :headers="{ token: user.token }"
              list-type="picture"
              :on-success="handleAvatarSuccess"
          >
            <el-button type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="fromVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import SnowflakeId from "snowflake-id";
const snowflake = new SnowflakeId({
  mid: 42,
  offset: (2019 - 1970) * 31536000 * 1000
});
import getDictData from "../../utils/dict";
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
      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),
      rules: {
        placeCode: [{required: true, message: '请输入', trigger: 'blur'}],
        placeName: [{required: true, message: '请输入', trigger: 'blur'}],
        placeWide: [{required: true, message: '请输入', trigger: 'blur'}],
        placeLong: [{required: true, message: '请输入', trigger: 'blur'}],
        placeSatus: [{required: true, message: '请输入', trigger: 'blur'}],
      },
      ids: [],
      placeNatureDict: getDictData("nature"),
      placeStatusDict: getDictData("status"),
    }
  },
  created() {
    this.load(1)
  },
  methods: {
    natureFormat(row, column) {
      return this.placeNatureDict.map((item) => {
        if (row.placeNature === item.value) {
          return item.label;
        }
      });
    },
    statusFormat(row, column) {
      return this.placeStatusDict.map((item) => {
        if (row.placeSatus === item.value) {
          return item.label;
        }
      });
    },
    handleAdd() {   // 新增数据
      this.form = {}
      this.form.placeCode = 'CDBH'+snowflake.generate();
      this.fromVisible = true   // 打开弹窗
    },
    handleEdit(row) {   // 编辑数据
      this.form = JSON.parse(JSON.stringify(row))  // 给form对象赋值  注意要深拷贝数据
      this.fromVisible = true   // 打开弹窗
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request({
            url: '/place/insertAndUpdate',
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
        this.$request.delete('/place/delete/' + id).then(res => {
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
        this.$request.delete('/place/delete/batch', {data: this.ids}).then(res => {
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
      this.$request.get('/place/pageList', {
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
