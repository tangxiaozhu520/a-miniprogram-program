// pages/auth/auth.js
import { request } from "../../request/request";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {login} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

async handleUserInfo(e){
    let encryptedData=e.detail.encryptedData;
    let rawData=e.detail.rawData;
    let iv=e.detail.iv;
    let signature=e.detail.signature;
    let res=await login();
    let code=res.code;
    let params={
      encryptedData,
      rawData,
      iv,
      signature,
      code
    };
    // let res2=await request({
    //   url:"/public/v1/users/wxlogin",
    //   method: "post",
    //   data:params
    // });
    // 企业的才有支付功能
    let token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });  
  }

})