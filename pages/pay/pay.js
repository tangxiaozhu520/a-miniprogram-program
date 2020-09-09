// pages/pay/pay.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/request";
import {showToast, requestPayment} from "../../utils/util"
Page({

  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow: function () {
    let address=wx.getStorageSync('address');
    let cart=wx.getStorageSync('cart');
    let totalPrice=0;
    let totalNum=0;
    let newcart=cart.filter(v =>v.goodsChecked);
    newcart.forEach(v => {
      totalPrice+=v.goodsNum * v.goods_price;
      totalNum+=v.goodsNum;
    })
    this.setData({
      address,
      cart:newcart,
      totalPrice,
      totalNum
    })
  },
 async handlePay(){
   try{
    let token=wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return;
    }
    let goods=[];
    let cart=this.data.cart;
    cart.forEach(v =>{
      goods.push({
        goods_id:v.goods_id,
        goods_number:v.goodsNum,
        goods_price: v.goods_price
      })
    });
    let res=await request({
      url:"/public/v1/my/orders/create",
      header:{
        "Authorization":token
      },
      method:"POST",
      data:{
        order_price:this.data.totalPrice,
        consignee_addr: this.data.address.finalAddress,
        goods:goods
      }
    });
  
   let order_number=res.data.message.order_number;
   let res2=await request({
     url:"/public/v1/my/orders/req_unifiedorder",
     method: "post",
     header:{
       "Authorization":token
     },
     data:{
      order_number
     }
   });
   console.log(res2);
   let pay=res2.data.message.pay;
   await requestPayment(pay)
   await requestPayment(pay);
   
   const result = await request({ url: "/public/v1/my/orders/chkOrder", method: "POST", data: { order_number } });
   await showToast( "支付成功" );
  
   let newCart1=wx.getStorageSync("cart");
   newCart1=newCart.filter(v=>!v.checked);
   wx.setStorageSync("cart", newCart1);
   wx.navigateTo({
     url: '/pages/order/order'
   });

   }catch(err){
    await showToast(  "支付失败" )
    console.log(err);
   }
  }

})