//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    Ch: {},
    one:{}
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
  onReady:function(){
    this.Chenji = this.selectComponent("#Chenji");
  },
  //事件处理函数
  onLoad: function () {
    this.getAchieve()
  },
  getAchieve:function(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://haiping313.cn/achievement',
      method: 'post',
      data: {
        'msg': wx.getStorageSync('token'),
      },
      success: (res) => {
        var msg = res.data.Data
        msg = msg.reverse()
        var arr =[]
        msg.forEach((item,index)=>{
          var isTrue=true
          arr.forEach((x,i)=>{
            if (x.title===item.Xq) {
              arr[i].body.push(item)
              isTrue=false
            }
          })
          if(isTrue){
            arr.push({
              title: item.Xq,
              body: [item]
            })
          }
        })
        this.setData({
          Ch:arr
        })
        wx.hideLoading()
      }
    })
  },
  getOne:function(e){
    var value = e.currentTarget.dataset.value
    this.setData({
      one: value
    })
    this.Chenji.showDialog()
  }
})