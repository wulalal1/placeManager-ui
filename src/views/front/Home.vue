<template>
  <div class="main-content">
    <div style="position: absolute; font-size: 40px; font-weight: bold; color: white; font-style: italic; top: 200px; left: 200px">快和小伙伴一起打羽毛球.</div>
    <div>
      <img src="@/assets/imgs/carousel.jpg" style="width: 100%; height: 300px; border-bottom-left-radius: 40%; border-bottom-right-radius: 40%" alt="">
    </div>
    <div style="width: 60%; margin: 30px auto; text-align: center">
      <div style="text-align: center; font-size: 25px; font-weight: bold">场地服务升级</div>
      <div style="display: flex; margin-top: 30px">
        <div style="flex: 1">
          <img src="@/assets/imgs/la.png" style="width: 50px; height: 50px" alt="">
          <div style="font-size: 14px; margin-top: 10px; color: #455873FF">场地充足，选择多多</div>
        </div>
        <div style="flex: 1;">
          <img src="@/assets/imgs/bg.jpg" style="width: 50px; height: 50px" alt="">
          <div style="font-size: 14px; margin-top: 10px; color: #455873FF">专业服务，放心进入</div>
        </div>
        <div style="flex: 1">
          <img src="@/assets/imgs/bg1.jpg" style="width: 50px; height: 50px" alt="">
          <div style="font-size: 14px; margin-top: 10px; color: #455873FF">服务保障，用心健身</div>
        </div>
      </div>
    </div>

    <div style="width: 60%; margin: 50px auto; text-align: left">
      <div style="text-align: center; font-size: 25px; font-weight: bold">平台优质场地</div>
      <div style="margin-top: 30px">
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in placeData">
            <img :src="item.placeAvatar" style="width: 100%; height: 175px; border-radius: 10px" alt="" @click="navToDetail(item.id)">
            <div style="font-size: 16px; font-weight: bold; margin-top: 10px; color: #455873FF">{{item.placeName}}</div>
          </el-col>
        </el-row>
      </div>
  </div>
  </div>
</template>
<script>
import Place from "@/views/manager/Place.vue";

export default {

  data() {
    let placeId = this.$route.query.id
    return {
      placeData: [],
      typeData: [],
      placeId:placeId
    }
  },
  mounted() {
    this.loadPlaces()
  },
  // methods：本页面所有的点击事件或者其他函数定义区
  methods: {
    navToDetail(id) {
      location.href = '/front/place?id=' + id
    },
    loadPlaces() {
      this.$request.get('/place/selectAll').then(res => {
        if (res.code === '200') {
          this.placeData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
