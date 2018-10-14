// pages/exam/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:[],
    one:null
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
    this.getExam()
  },
  getExam:function(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://haiping313.cn/getExam',
      method: 'post',
      data: {
        'msg': wx.getStorageSync('token'),
        'Xq': app.globalData.userInfo.DqXq
      },
      success: (res) => {
        wx.hideLoading()
          this.setData({
            msg:res.data.Data
          })
      }
    })
  },
  showMsg:function(e){
    var value = e.currentTarget.dataset.value
    this.setData({
      one: value
    })
    this.exam.showDialog()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.exam = this.selectComponent("#exam");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  }
})