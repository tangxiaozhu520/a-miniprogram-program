let ajaxTimes=0;
export const request=(options)=>{
  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask:true,

  })
  const baseUrl="https://api-hmugo-web.itheima.net/api";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...options,
      url:baseUrl+options.url,
      success:(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes===0){
          wx.hideLoading();
        }
        
      }

    })
  })

}