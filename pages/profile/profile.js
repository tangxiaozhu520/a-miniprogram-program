// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    user:{},
    collectNums:0

  },
  onShow: function () {
    let user=wx.getStorageSync('user');
    let collect=wx.getStorageSync('collect') || [];
    if(user.nickName){
      this.setData({
        isShow: false,
        user,
        collectNums: collect.length
      })
    }

  },
  handleLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})