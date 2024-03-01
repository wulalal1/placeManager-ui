<template>
  <div class="main-content" style="width: 50%">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人资料" name="个人资料">
        <person-page/>
      </el-tab-pane>
      <el-tab-pane label="我发表的博客" name="我发表的博客">
        <div class="card" style="padding: 5px">
          <el-button type="primary" @click="addBlog">发表新博客</el-button>
        </div>
        <div style="margin-top: 10px">
          <blog-list type="user" :show-opt="true"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的点赞" name="我的点赞">
        <div class="card" style="padding: 5px;display: flex">
          <div class="category-a" :class="{ 'active': likesCurrent === '博客' }" @click="likesCurrent === '博客'">博客</div>
        </div>
        <div style="margin-top: 10px">
          <BlogList v-if="likesCurrent === '博客'" type="like"></BlogList>
        </div>
      </el-tab-pane>

      <el-tab-pane label="我的收藏" name="我的收藏">
        <div class="card" style="padding: 5px;display: flex">
          <div class="category-a" :class="{ 'active': collectCurrent === '博客' }">博客</div>
        </div>
        <div style="margin-top: 10px">
          <BlogList v-if="likesCurrent === '博客'" type="collect"></BlogList>
        </div>
      </el-tab-pane>

      <el-tab-pane label="我的评论" name="我的评论">
        <div class="card" style="padding: 5px;display: flex">
          <div class="category-a" :class="{ 'active': commentCurrent === '博客' }">博客</div>
        </div>
        <div style="margin-top: 10px">
          <BlogList v-if="likesCurrent === '博客'" type="comment"></BlogList>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的预约" name="我的预约">
        <div class="card">
          <el-table :data="tableData" border style="width: 100% ">
            <el-table-column type="index" label="序号" width="50" align="center" sortable></el-table-column>
            <el-table-column prop="id" label="id" v-if="false"></el-table-column>
            <el-table-column prop="placeCode" label="预约（场地编号）" width="150"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="startTime" width="100" label="开始时间" align="center"
                             :formatter="formatDate"></el-table-column>
            <el-table-column prop="endTime" width="100" label="结束时间" align="center"
                             :formatter="formatDate"></el-table-column>
            <el-table-column prop="reservationName" width="100" label="预约名称" align="center"></el-table-column>
            <el-table-column prop="reservationPName" width="100" label="预约人姓名" align="center"></el-table-column>
            <el-table-column prop="reservationPPhone" width="100" label="预约人电话" align="center"></el-table-column>
            <el-table-column prop="reservationStatus" width="100" label="预约状态" align="center"
                             :formatter="statusFormat"></el-table-column>
            <el-table-column prop="reservationReason" width="100" label="预约原因" align="center"></el-table-column>
            <el-table-column prop="reservationType" width="100" label="预约类型" align="center"
                             :formatter="natureFormat"></el-table-column>
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

      </el-tab-pane>

      <el-tab-pane label="历史预约" name="历史预约">
        <div class="card">
          <el-table :data="tableData" border style="width: 100% ">
            <el-table-column type="index" label="序号" width="50" align="center" sortable></el-table-column>
            <el-table-column prop="id" label="id" v-if="false"></el-table-column>
            <el-table-column prop="placeCode" label="预约（场地编号）" width="150"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="startTime" width="100" label="开始时间" align="center"
                             :formatter="formatDate"></el-table-column>
            <el-table-column prop="endTime" width="100" label="结束时间" align="center"
                             :formatter="formatDate"></el-table-column>
            <el-table-column prop="reservationName" width="100" label="预约名称" align="center"></el-table-column>
            <el-table-column prop="reservationPName" width="100" label="预约人姓名" align="center"></el-table-column>
            <el-table-column prop="reservationPPhone" width="100" label="预约人电话" align="center"></el-table-column>
            <el-table-column prop="reservationStatus" width="100" label="预约状态" align="center"
                             :formatter="statusFormat"></el-table-column>
            <el-table-column prop="reservationReason" width="100" label="预约原因" align="center"></el-table-column>
            <el-table-column prop="reservationType" width="100" label="预约类型" align="center"
                             :formatter="natureFormat"></el-table-column>
          </el-table>

          <div class="pagination" style="margin: 10px">
            <el-pagination
                background
                @current-change="handleCurrentHChange"
                :current-page="pageNum"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
          </div>
        </div>

      </el-tab-pane>


      <el-tab-pane label="审核状态" name="审核状态">
        <div class="card">

          <el-result :icon="icon" :title="title"  style="width: 100%;margin: 0 auto">
            <template slot="extra" >
              <el-button type="primary" size="medium" @click="openPage()">返回</el-button>
            </template>
          </el-result>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import PersonPage from "@/components/PersonPage";
import BlogList from "@/components/BlogList";
import formatDate from "../../utils/utils";
import getDictData from "@/utils/dict";

export default {
  components: {
    BlogList,
    PersonPage
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.user.newPassword) {
        callback(new Error('确认密码错误'))
      } else {
        callback()
      }
    }
    return {
      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),
      dialogVisible: false,
      rules: {
        password: [
          {required: true, message: '请输入原始密码', trigger: 'blur'},
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
        ],
        confirmPassword: [
          {validator: validatePassword, required: true, trigger: 'blur'},
        ],
      },
      activeName: '个人资料',
      likesCurrent: '博客',
      collectCurrent: '博客',
      commentCurrent: '博客',
      tableData: [],// 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 10,  // 每页显示的个数
      total: 0,
      placeNatureDict: getDictData("nature"),
      YXstatusDict: getDictData("YXstatus"),
      iconStatusDict: getDictData("iconStatus"),
      title: "",
      icon: ""
    }
  },
  created() {
    this.initData();
  },
  methods: {
    handleClick() {
      switch (this.activeName) {
        case "我的预约":
          this.loadMyOrder(1)
          break;
        case "历史预约":
          this.loadHisOrder(1)
          break;
        default:
          break;
      }
    },
    formatDate(row, column) {
      return formatDate(row, column);
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
    addBlog() {
      window.open('/front/newBlog')
    },
    openPage() {
      this.$router.go(-1); // 返回上一页
    },
    loadMyOrder(pageNum) {  // 分页查询(我的预约)
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/reservation/myPageList', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      }).then(res => {
        this.tableData = res.data?.list
        this.total = res.data?.total
      })
    },
    loadHisOrder(pageNum) {  // 分页查询(历史预约)
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/reservation/hisPageList', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      }).then(res => {
        this.tableData = res.data?.list
        this.total = res.data?.total
      })
    },

    async initData() {
      const {data} = await this.$request.get('/reservation/myPageList')
      if (data) {
        this.tableData = data.list
        this.YXstatusDict.map((item) => {
          if (this.tableData[0].reservationStatus === item.value) {
            this.title =  item.label;
          }
        });
        this.iconStatusDict.map((item) => {
          if (this.tableData[0].reservationStatus === item.value) {
            this.icon =  item.label;
          }
        });
      }
    },
    update() {
      // 保存当前的用户信息到数据库
      this.$request.put('/user/update', this.user).then(res => {
        if (res.code === '200') {
          // 成功更新
          this.$message.success('保存成功')
          // 更新浏览器缓存里的用户信息
          localStorage.setItem('xm-user', JSON.stringify(this.user))

          // 触发父级的数据更新
          this.$emit('update:user')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCurrentChange(pageNum) {
      this.loadMyOrder(pageNum)
    },
    handleCurrentHChange(pageNum) {
      this.loadHisOrder(pageNum)
    },
    handleAvatarSuccess(response, file, fileList) {
      // 把user的头像属性换成上传的图片的链接
      this.$set(this.user, 'avatar', response.data)
    },
    // 修改密码
    updatePassword() {
      this.dialogVisible = true
    },
    save() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request.put('/updatePassword', this.user).then(res => {
            if (res.code === '200') {
              // 成功更新
              this.$message.success('修改密码成功')
              this.$router.push('/login')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
/deep/ .el-form-item__label {
  font-weight: bold;
}

/deep/ .el-upload {
  border-radius: 50%;
}

/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border-radius: 50%;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 50%;
}

.category-a {
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.active {
  background-color: #2A60C9;
  color: white !important;

}

.centered-result {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
}
</style>
