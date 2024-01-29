<template>
  <div class="main-content">
    <div style="width: 60%; margin: 20px auto; display: flex">
      <div style="flex: 1">
        <img :src="placeData.avatar" alt="" style="width: 100%; height: 250px; border-radius: 10px">
      </div>
      <div style="flex: 1; margin-left: 30px">
        <div style="font-size: 18px; font-weight: bold; color: #0F294DFF">{{placeData.name}}</div>
        <div style="color: #0F294DFF; margin-top: 10px">场地官网：<a :href="placeData.url" target="_blank">{{placeData.url}}</a></div>
        <div style="color: #0F294DFF; margin-top: 10px">场地电话：{{placeData.phone}}</div>
        <div style="color: #0F294DFF; margin-top: 10px">场地邮箱：{{placeData.email}}</div>
        <div style="color: #0F294DFF; margin-top: 10px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;">场地介绍：{{placeData.description}}</div>
      </div>
      <div style="flex: 1"></div>
    </div>
    <div style="width: 60%; margin: 0 auto">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in typeData">
          <img :src="item.img" style="width: 100%; height: 200px; border-radius: 10px" alt="" @click="navToDetail(item.id)">
          <div style="font-size: 16px; margin-top: 10px; color: #455873FF">
            <span style="font-weight: bold;">{{item.name}}</span>
            <span style="font-size: 14px; color: #455873FF; margin-left: 20px"><i class="el-icon-s-home"></i> 剩余 {{item.num}} </span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
    import place from "@/views/manager/Place.vue";

    export default {
      computed: {
        place() {
          return place
        }
      },
    
    data() {
    let placeId = this.$route.query.id
    return {
    placeData: {},
    typeData: [],
    placeId: placeId,
    }
    },
    mounted() {
    this.loadHotels()
    this.loadTypes()
    },
    // methods：本页面所有的点击事件或者其他函数定义区
    methods: {
      navToDetail(id) {
        location.href = '/front/place?id=' + id
      },
    loadHotels() {
    this.$request.get('/place/selectById?id=' + this.placeId).then(res => {
    if (res.code === '200') {
    this.placeData = res.data
    } else {
    this.$message.error(res.msg)
    }
    })
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
    }
    }
</script>