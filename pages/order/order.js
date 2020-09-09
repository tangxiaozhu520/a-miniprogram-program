// pages/order/order.js
import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    titles:[
      {id:0,name:"全部"},
      {id:1,name:"待付款"},
      {id:2,name:"待发货"},
      {id:3,name:"退款/退货"}
    ],
    orders:[]
  },
  onShow: function () {
    let token=wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
      return;
    }
    let pages=getCurrentPages();
    let currentPage=pages[pages.length-1];
    let type=currentPage.options.type || 1;
    this.getOrders(type);
  },
 async getOrders(type){
   let token=wx.getStorageSync('token');
    let res=await request({
      url:"/public/v1/my/orders/all",
      header:{
        "Authorization":token
      },
      data:{
        type
      }
    })
  
    this.setData({
      orders: res.data.message.orders.map(v =>{ return {...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}})
    })
  },

  handleItemChange(e){
    let index=e.detail.index;
    let type=index+1;
    this.getOrders(type);
  }


})