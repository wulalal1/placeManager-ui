<template>
  <div class="main-content">
    <div style="width: 60%; margin: 0 auto">
      <el-row :gutter="20">
        <!--        <el-col :span="6" v-for="item in placeData">-->
        <!--          <img :src="item.img" style="width: 100%; height: 200px; border-radius: 10px" alt="" @click="navToDetail(item.id)">-->
        <div style="font-size: 18px; margin-top: 10px; color: #455873FF">
          <span style="font-weight: bold;">{{ placeData.placeName }}</span>
          <span style="font-weight: bold; color: #455873FF; margin-left: 20px"><i
              class="el-icon-coin"></i> 价格: {{ placeData.placeCharge }} </span>
          <span style="font-weight: bold;margin-left: 20px">场地情况: {{ placeSatus }}</span>
        </div>
      </el-row>
    </div>
    <div style="width: 60%; margin: 20px auto; display: flex">
      <div style="flex: 1">
        <img :src="placeData.placeAvatar" alt="" style="width: 100%; height: 250px; border-radius: 10px">
      </div>
      <div style="flex: 1; margin-left: 30px">
        <div style="font-size: 18px; font-weight: bold; color: #0F294DFF">{{ placeData.name }}</div>
        <div style="color: #0F294DFF; margin-top: 10px ;font-size: 14px"><i class="el-icon-s-promotion"></i>场地官网： <a v-bind:href="link">{{ text }}</a>
        </div>
        <div style="color: #0F294DFF; margin-top: 10px ;font-size: 14px"><i class="el-icon-phone"></i>场地电话：{{ "010644922185" }}</div>
        <div style="color: #0F294DFF; margin-top: 10px ;font-size: 14px" class=""><i class="el-icon-time"></i>营业时间：{{ "9:00-22:00" }}</div>
        <div style="color: #0F294DFF; margin-top: 10px ;font-size: 14px" class=""><i class="el-icon-location-outline"></i>场馆地址：{{ "北京市朝阳区双桥中路北影传奇科创园A6栋0" }}</div>
        <div style="color: #0F294DFF; margin-top: 10px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;font-size: 14px">
          场地介绍：{{"羽毛球场为一长方形场地，长度为" + placeData.placeLong + "米，场地宽为" + placeData.placeLong + "米。属于" + typeData[0]?.description + "。" }}
        </div>
        <div style="margin-top: 20px">
          <el-row>
            <el-button type="warning" size="medium" style="width: 117px;height: 36px" icon="el-icon-thumb" @click="preOrder">点击预定</el-button>
            <el-button type="primary" size="medium" style="width: 117px;height: 36px" icon="el-icon-back" @click="openPage()">返回</el-button>
          </el-row>
        </div>
      </div>
<!--      <div style="flex: 1"></div>-->
    </div>
    <el-dialog title="预约信息" :visible.sync="fromVisible" width="40%" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="form" label-width="100px" style="padding-right: 50px" :rules="rules" ref="formRef">
        <el-row>
          <el-form-item label="场地编号" prop="placeCode">
            <el-input v-model="form.placeCode" disabled></el-input>
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
                  popper-class="popperClass"
                  size="small"
                  type="datetime"
                  placeholder="开始时间"
                  :picker-options="{
                          disabledDate: (time) =>
                            time.getTime() <
                            new Date(new Date().setHours(0, 0, 0, 0))
                        }">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                  v-model="form.endTime"
                  popper-class="popperClass"
                  size="small"
                  type="datetime"
                  placeholder="结束时间"
                  :picker-options="{
                          disabledDate: (time) =>
                            time.getTime() <
                            new Date(new Date().setHours(0, 0, 0, 0))
                        }">
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
import place from "@/views/manager/Place.vue";
import ReservationModal from "@/components/ReservationModal";
import getDictData from "@/utils/dict";
import formatDate from "@/utils/utils";

export default {
  computed: {
    place() {
      return place
    }
  },
  components: {
    ReservationModal
  },
  data() {
    let placeId = this.$route.query.id
    return {
      tableData: [],  // 所有的数据
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
      placestatusDict: getDictData("status"),
      placeData: {},
      typeData: [],
      placeId: placeId,
      placeCode: "",
      placeSatus: "",
      link: 'http://www.yulinjue.com/venues/6816.html', // 设置超链接地址
      text: '点击这里', // 显示文本内容
    }
  },
  mounted() {
    this.loadHotels()
    this.loadTypes()
  },
  created() {
    // this.load(1);
    this.initData();
  },
  // methods：本页面所有的点击事件或者其他函数定义区
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
    navToDetail(id) {
      location.href = '/front/place?id=' + id
    },
    loadHotels() {
      this.$request.get('/place/load?id=' + this.placeId).then(res => {
        if (res.code === '200') {
          this.placeData = res.data
          this.placestatusDict.map((item) => {
            if (this.placeData.placeSatus === item.value) {
              this.placeSatus = item.label;
            }
          });
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    radioChange(row) {
      this.form.placeCode = row.placeCode
    },
    clear() {
      this.$refs.selectTable.clear();
    },
    loadTypes() {
      this.$request.get('/type/selectByPlaceId?id=' + this.placeId).then(res => {
        if (res.code === '200') {
          this.typeData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    preOrder() {   // 新增数据
      this.form = {}
      this.fromVisible = true   // 打开弹窗
      this.form.placeCode = this.placeData.placeCode  //固定场地编号
    },
    openPage() {
      this.$router.go(-1); // 返回上一页
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
            url: '/reservation/insertPreOrder',
            method: 'POST',
            data: this.form
          }).then(res => {
            if (res.code === '200') {  // 表示成功保存
              this.$message.success('保存成功')
              // this.load(1)
              this.fromVisible = false
            } else {
              this.$message.error(res.msg)  // 弹出错误的信息
            }
          })
        }
      })
    },

  }
}
</script>

<style lang="scss" scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: auto;
}
</style>
