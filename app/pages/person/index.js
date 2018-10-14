// pages/person/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoMsg:null
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '江农教务帮',
      path: 'pages/index/index'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      infoMsg: app.globalData.userInfo
    })
  }
})