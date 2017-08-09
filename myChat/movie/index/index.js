// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      "../images/001.jpg",
      "../images/002.jpg",
      "../images/003.jpg",
    ],
    movie:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '成功',
      icon: 'loading',
      duration:5000
    })
    var that = this;
    wx.request({
      url: "https://api.douban.com/v2/movie/in_theaters",
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function (res) {
        var subjects = res.data.subjects;
        console.log(subjects);
        if (subjects.length < 1) {
          return;
        }
        that.setData({
          movie: subjects,
        });
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