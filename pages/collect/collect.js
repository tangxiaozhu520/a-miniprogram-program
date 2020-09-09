// pages/collect/collect.js
Page({

  data: {
    titles:[
      {
        id:0,
        name:"商品收藏"
      },
      {
        id:0,
        name:"品牌收藏"
      },
      {
        id:0,
        name:"店铺收藏"
      },
      {
        id:0,
        name:"浏览足迹"
      }
    ],
    collectList:[]
  },

  onShow: function () {
    let collectList=wx.getStorageSync('collect') || [];
    this.setData({
      collectList
    })
  }
})