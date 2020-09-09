import {request} from "../../request/request.js"
Page({
 
  data: {
    cateLeftList:[],
    cateRightList:[],
    currentIndex:0,
    scroll_top:0

  },
  cates:[],
  onLoad: function () {
    let cates=wx.getStorageSync('cates').data;
    if(!cates){
      request({
        url:"/public/v1/categories"
      }).then((res)=>{
        console.log(res);
        this.cates=res.data.message;
        wx.setStorageSync('cates', {time:Date.now(),data:this.cates});
       let list=res.data.message;
       let cateLeftList=list.map(v=>v.cat_name);
       let cateRightList=list[0].children;
       this.setData({
         cateLeftList,
         cateRightList
       })
       
      })
    }else{
      if(Date.now()-cates.time>1000*60*30){
        request({
          url:"/public/v1/categories"
        }).then((res)=>{
          
          this.cates=res.data.message;
          wx.setStorageSync('cates', {time:Date.now(),data:this.cates});
         let list=res.data.message;
         let cateLeftList=list.map(v=>v.cat_name);
         let cateRightList=list[0].children;
         this.setData({
           cateLeftList,
           cateRightList
         })
        
        })
      }else{
        this.cates=cates;
        let cateLeftList=this.cates.map(v=>v.cat_name);
         let cateRightList=this.cates[0].children;
         this.setData({
           cateLeftList,
           cateRightList
         })
         
      }
    }
  },
  handleLeftItem(e){
    let index=e.currentTarget.dataset.index;
    
    this.setData({
      currentIndex:index,
      cateRightList:this.cates[index].children,
      scroll_top:0
    })
  }
})