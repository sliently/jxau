//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    name:{},
    isShow:false,
    img:null
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
  onLoad: function () {
    this.getUserInfo()
    wx.showLoading({
      title: '加载中',
    })
  },
  sign:function(){
    wx.removeStorageSync('Xh')
    wx.removeStorageSync("password")
    wx.removeStorageSync('token')
    wx.redirectTo({
      url: '../login/index'
    })
  },
  person:function(){
    wx.navigateTo({
      url: '../person/index'
    })
  },
  about:function(){
    wx.navigateTo({
      url: '../about/index'
    })
  },
  // back:function(){
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['original'], 
  //     sourceType: ['album', 'camera'],
  //     success:  (res)=> {
  //       var tempFilePaths = res.tempFilePaths
  //       this.setData({
  //         img: tempFilePaths
  //       })
  //     }
  //   })
  // },
  getUserInfo:function(){
    // 登录
    wx.request({
      url: 'https://haiping313.cn/login',
      method: 'post',
      data: {
        username: wx.getStorageSync('Xh'),
        password: wx.getStorageSync('password')
      },
      success: (res) => {
        wx.setStorageSync("token", res.data.cookie)
        // 获取教务处个人所有信息
        wx.request({
          url: 'https://haiping313.cn/GetUserInfo',
          method: 'post',
          data: {
            'msg': wx.getStorageSync('token'),
            'Xh': wx.getStorageSync('Xh')
          },
          success: res => {
            var data = res.data
            app.globalData.userInfo = {
              ...app.globalData.userInfo,
              ...data
            }
            this.setData({
              userInfo: { ...app.globalData.userInfo, ...data },
              isShow:true
            })
            wx.hideLoading()
          }
        })
      }
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo
    //   })
    // }
  },
  onUnload:function(){
    wx.hideLoading()
  }
})
