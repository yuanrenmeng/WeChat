// detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      "title": "玩命加载中",
      "icon": "loading",
      "duration": 　10000
    })
    var movieId = options.id;
    console.log(movieId+"++");
    var that = this;
    wx.request({
      url: "https://api.douban.com/v2/movie/subject/" + movieId,
      header:{
        'Content-type':"application/json,application/json"
      },
      success:function(res){
        var subject = res.data;
        console.log(subject);
        that.setData({
          movie: subject
        });
        wx.hideToast();
      }
    })
  }

})