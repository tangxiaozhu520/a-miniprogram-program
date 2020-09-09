// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles:[
      {id:0,name:"体验问题"},
      {id:1,name:"商品、商家投诉"}
    ],
    imgList:[],
    textValue:""
  },
  handleChooseImage(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success :(res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths
        this.setData({
          imgList: [...this.data.imgList,...res.tempFilePaths]
        })
      }
    })
  },
  uploadImgList:[],
  removeImg(e){
    let index=e.currentTarget.dataset.index;
    let imgList=this.data.imgList;
    imgList.splice(index,1);
    this.setData({
      imgList
    })
  },
  handleInput(e){
    let textValue=e.detail.value;
    this.setData({
      textValue
    })
  },
  handleSubmit(){
    let textValue=this.data.textValue;
    let imgList=this.data.imgList;
    if(!textValue.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:"none"
      });
      return;
    }
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });
    if(imgList.length!=0){
      imgList.forEach((v,i)=>{
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/', 
          filePath: v,
          name: 'file',
          success :(res)=>{
            console.log(res);
            let url = JSON.parse(res.data).url;
            this.uploadImgList.push(url);
            if (i === chooseImgs.length - 1) {

              wx.hideLoading();


              console.log("把文本的内容和外网的图片数组 提交到后台中");
              //  提交都成功了
              // 重置页面
              this.setData({
                textValue:"",
                imgList:[]
              })
              // 返回上一个页面
              wx.navigateBack({
                delta: 1
              });

            }
          }
        })
        
      })
    }else{
      wx.hideLoading();
        
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
    }

  }

})