// pages/login/login.js
Page({
  data: {

  },
  handleLogin(e){
    
    wx.setStorageSync('user', e.detail.userInfo);
    wx.navigateBack({
      delta: 1
    })
    
  }

})