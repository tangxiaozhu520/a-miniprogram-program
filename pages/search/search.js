// pages/search/search.js
import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    isshow:false,
    goods:[],
    value:""
  },
  timer:null,
  handleSearch(e){
    let inputValue=e.detail.value;
    if(inputValue.trim().length>0){
      
      this.setData({
        isshow: true,
        value: inputValue
      });
      clearTimeout(this.timer);
      this.timer=setTimeout(()=>{
        this.getGoods(inputValue);
      },500)
    }
  },
async getGoods(query){
  let res=await request({
    url:"/public/v1/goods/qsearch",
    data:{
      query
    }
  });
  this.setData({
    goods: res.data.message
  })
},
handleCancel(){
  this.setData({
    isshow:false,
    goods:[],
    value:""
  })
}
  
})