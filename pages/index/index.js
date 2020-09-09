// pages/index/index.js
import {request} from "../../request/request.js"
Page({
  data: {
    swiperDatas:[],
    navList:[],
    floorList:[]
  },
  onLoad: function (options) {
    this.getSwiperDatas();
    this.getNavList();
    this.getFloorList();
  },
  getSwiperDatas(){
    request({
      url:"/public/v1/home/swiperdata"
    }).then((res)=>{
      this.setData({
        swiperDatas: res.data.message
      })
    })
  },
  getNavList(){
    request({
      url:"/public/v1/home/catitems"
    }).then((res)=>{
      this.setData({
        navList: res.data.message
      })
    })
  },
  getFloorList(){
    request({
      url:"/public/v1/home/floordata"
    }).then((res)=>{
      this.setData({
        floorList: res.data.message
      })
    })
  }

  
})