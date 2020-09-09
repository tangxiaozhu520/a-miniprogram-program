// components/tabControl/tabControl.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  currentIndex:0
  },

  methods: {
    handleTab(e){
      let index=e.currentTarget.dataset.index;
      
      this.setData({
        currentIndex: index
      });
      this.triggerEvent("tabsItemChange",{index});

    }
  }
})
