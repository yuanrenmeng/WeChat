// search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputVal:"",
  },
  bindKeyInput:function(e){
    console.log(e.detail.value);
    this.setData({inputVal:e.detail.value})
  },
  search:function(){
    var that = this;
    if(that.data.inputVal.trim()==""){
      wx.showModal({
        title: '小提示',
        content: '请输入查询关键字 ',
        showCancel: false,//是否显示取消按钮 默认true
        fail: function () {
          that.setData({
            inputVal: "请输入查询关键字！",
          });
        }
      })
     return; 
    }
    wx.showToast({
      "title": "玩命加载中",
      "icon": "loading",
      "duration": 　10000
    })
    // /v2/movie/search?q={text} 豆瓣电影搜索格式 
    var url = "https://api.douban.com/v2/movie/search?q=" + that.data.inputVal;
    console.log(url);
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function (res) {
        var subjects = res.data.subjects;
        if (subjects.length < 1) {
          that.setData({
            inputVal: "暂无相关内容！",
            movie: []
          });
          wx.hideToast();
          return;
        }
        that.setData({
          movie: subjects
        });
        console.log(res);
        wx.hideToast();
      }
    })
  
  },
  /**
  * 点击获取点击电影的id  然后跳转到详情页中并把id传过去
  */
  detail: function (e) {
    console.log(e);
    console.log(e.currentTarget.id);
    wx.setStorageSync("movieId", e.currentTarget.id);
    wx.navigateTo({
      url: "../detail/detail?id=" + e.currentTarget.id
    })
  }
})