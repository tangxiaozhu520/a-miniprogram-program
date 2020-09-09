import { request } from "../../request/request";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    details:{},
    isCollect:false
  },
  goodsInfo:{},
  onShow: function () {
    let pages=getCurrentPages();
    let currentPage=pages[pages.length-1];
    let goods_id=currentPage.options.goods_id;
    this.getDetail(goods_id);
    
    

  },
 async getDetail(goods_id){
    let res=await request({
      url:"/public/v1/goods/detail",
      data: {goods_id}
    });
    this.goodsInfo=res.data.message;
   
    let collect=wx.getStorageSync("collect") || [];
    let isCollect = collect.some( v => v.goods_id === this.goodsInfo.goods_id );
  
    this.setData({
      details:{
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        pics: res.data.message.pics,
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g,".jpg")
      },
      isCollect
    })
    

  },
 
  handleCollect(){
    let isCollect=false;
    let collect=wx.getStorageSync("collect") || [];
    let index=collect.findIndex(v => v.goods_id===this.goodsInfo.goods_id);
    if(index!==-1){
      isCollect=false;
      collect.splice(index,1);
      wx.showToast({
        title: '取消成功',
        icon: 'success'
      })
    }else{
      isCollect=true;
      collect.push(this.goodsInfo);
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      })
    }
    this.setData({
      isCollect
    })
    wx.setStorageSync('collect', collect);
  },
  handleAddCart(){
    let cart=wx.getStorageSync('cart') || [];
    let index=cart.findIndex( v=> v.goods_id===this.goodsInfo.goods_id);
    if(index!==-1){
      cart[index].goodsNum++;
    }else{
      this.goodsInfo.goodsNum=1;
      this.goodsInfo.goodsChecked=true;
      cart.push(this.goodsInfo);
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      maask: true
    })
  },
  handlePrevewImage(e){
    let current=e.currentTarget.dataset.url;
    let urls=this.goodsInfo.pics.map(v => v.pics_mid);
    wx.previewImage({
      current,
      urls
    });
  }

  
})