import { request } from "../../request/request";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    tabs: [
      {
        id: 0,
        name: "综合",
        
      },
      {
        id: 1,
        name: "销量",
        
      },
      {
        id: 2,
        name: "价格",
       
      }
    ],
    goodslist:[]
  },
  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getGoodsList();
  },
  // 获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"/public/v1/goods/search",data:this.QueryParams});
    
    // 获取 总条数
    const total=res.data.message.total;
    // const total=res.total
    // 计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
   
    this.setData({
      // 拼接了数组
      goodslist:[...this.data.goodslist,...res.data.message.goods]
     
    });
    wx.stopPullDownRefresh();

  },
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      
      wx.showToast({ title: '没有下一页数据' });
        
    }else{
     
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodslist:[]
    });
    this.totalPages=1;
    this.getGoodsList();
  }
  
})
