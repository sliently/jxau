Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
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
  // 登录
  login:function(){
    wx.showLoading({
      title: '登录中...',
    })
    if (!this.data.username || !this.data.password){
      wx.hideLoading()
      wx.showModal({
        content: "信息错误！",
        showCancel: false
      })
      return
    }
    wx.request({
      url: 'https://haiping313.cn/login',
      method: 'post',
      data:{
        username: this.data.username,
        password:this.data.password
      },
      success: (res) => {
        wx.hideLoading()
        if(!res.data.success){
          wx.showModal({ 
              content: "信息错误！",
             showCancel:false
            })
          return
        }
        wx.setStorageSync("Xh", this.data.username)
        wx.setStorageSync("password", this.data.password)
        wx.setStorageSync("token", res.data.cookie)
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },
  // 绑定username表单
  bindUserInput:function(e){
    this.setData({
      username: e.detail.value
    })
  },
  bindPswInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  }
})