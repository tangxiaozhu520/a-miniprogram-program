// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting,showModal,showToast} from "../../utils/util";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    cart:[],
    address:{},
    totalPrice:0,
    totalNum:0,
    allChecked: true

  },
  onShow: function () {
    let address=wx.getStorageSync('address');
    let cart=wx.getStorageSync('cart');
    this.setData({
      address,
    });
    this.setCart(cart);
  },
  async handleAddAddress(){
    let res=await getSetting();
    let res2=res.authSetting["scope.address"];
    if(!res2){
      await openSetting();
    }
    let address=await chooseAddress();
    address.finalAddress=address.provinceName + address.cityName + address.countyName + address.detailInfo;
    wx.setStorageSync('address',address);
  },
  setCart(cart){
    let totalPrice=0;
    let totalNum=0;
    let allChecked=true;
    cart.forEach( v =>{
      if(v.goodsChecked){
        totalNum+=v.goodsNum;
        totalPrice+=v.goodsNum * v.goods_price;

      }else{
        allChecked=false;
      }

    })
    allChecked= cart.length !=0 ? allChecked :false;
    this.setData({
      totalNum,
      totalPrice,
      allChecked,
      cart
    })
    wx.setStorageSync('cart', cart);
  },
  handleChange(e){
    let id=e.currentTarget.dataset.id;
    let cart=this.data.cart;
    cart.forEach( v =>{
      if(v.goods_id===id){
        v.goodsChecked=!v.goodsChecked;
      }
    });
    this.setCart(cart);
  },
  async handleNum(e){
    let id=e.currentTarget.dataset.id;
    let value=e.currentTarget.dataset.value;
    let cart=this.data.cart;
    let index=cart.findIndex(v => v.goods_id===id);
    if(cart[index].goodsNum===1 && value===-1){
      let res=await showModal("确定要删除吗?");
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      cart[index].goodsNum+=value;
      this.setCart(cart);  
    }
  },
  handleAll(){
    let cart=this.data.cart;
    let allChecked=this.data.allChecked;
    allChecked=!allChecked;
    cart.forEach(v => v.goodsChecked = allChecked);
    this.setCart(cart);
  },
 async handlePayment(){
    let address=wx.getStorageSync('address');
    if(!address.userName){
      await showToast("请先获取收货地址");
      return;
    }
    if(this.data.totalNum===0){
      await showToast("您还没有选购商品");
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })

  }

})