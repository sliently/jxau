//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    week: null,
    Data: null,
    da: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    msg: [],
    one: null,
    current: new Date().getDate() + "日"
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
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    this.jieke = this.selectComponent("#jieke");
  },
  onLoad: function () {
    let time = new Date().getTime()
    this.setData({
      week: app.globalData.userInfo.SkZhou,
      days: this.time(time)
    })
    this.getWeek()
  },
  getWeek: function () {
    // 获取教务处个人所有信息
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://haiping313.cn/Timetable',
      method: 'post',
      data: {
        'msg': wx.getStorageSync('token'),
        'Xq': app.globalData.userInfo.DqXq
      },
      success: res => {
        // 分类
        var msg = res.data.Data
        this.data.msg = msg
        var arr = new Array(7)
        msg.forEach((item, index) => {
          var a = item.XingQi.split('.')[0]
          var isWeeks = isWeek(item.SkZhou, this.data.week)
          var top = position(item.Jieci)
          var colors = color()
          if (arr[a]) {
            arr[a].push({ ...item, isWeeks, top, colors })
          } else {
            arr[a] = []
            arr[a].push({ ...item, isWeeks, top, colors })
          }
        })
        this.setData({
          Data: arr
        })
        wx.hideLoading()
      }
    })
  },
  changeWeek: function (e) {
    var value = e.currentTarget.dataset.value
    let time = new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * (app.globalData.userInfo.SkZhou - value)
    this.setData({
      week: value,
      days: this.time(time)
    })
    var arr = new Array(7)
    this.data.msg.forEach((item, index) => {
      var a = item.XingQi.split('.')[0]
      var isWeeks = isWeek(item.SkZhou, this.data.week)
      var top = position(item.Jieci)
      var colors = color()
      if (arr[a]) {
        arr[a].push({ ...item, isWeeks, top, colors })
      } else {
        arr[a] = []
        arr[a].push({ ...item, isWeeks, top, colors })
      }
    })
    this.setData({
      Data: arr
    })
    this.dialog.hideDialog()
  },
  showWeek: function () {
    return this.dialog.showDialog()
  },
  classMsg: function (e) {
    var value = e.currentTarget.dataset.value
    this.setData({
      one: value
    })
    this.jieke.showDialog()
  },
  time: function (time) {
    var days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    var arr = []
    var a = new Date(time)
    var one = 1000 * 60 * 60 * 24
    var day = a.getDay()
    var first = +a.getTime() - one * day
    first = new Date(first)
    var month = first.getMonth()
    first = first.getTime()
    for (let i = 0; i < 7; i++) {
      let b = new Date(first + i * one)
      arr[i] = {
        title: days[i],
        days: (+b.getDate() === 1) ? b.getMonth() + 1 + "月" : b.getDate() + "日"
      }
    }
    return {
      month: month + 1 + "月",
      arr: arr
    }
  }
})
function isWeek(str, we) {
  let isWeek = we
  var week = str.split(',')
  let b = false
  week.forEach((item, index) => {
    let a = item.split('-')
    if (a.length == 1 && parseInt(a[0]) === isWeek) {
      b = true
      return
    }
    if (parseInt(a[0]) <= isWeek && parseInt(a[1]) >= isWeek) {
      b = true
      return
    }
  })
  return b
}
function position(str) {
  var rex = /([0-9]*)-([0-9]*)/g
  var arr = str.match(rex)[0].split('-')
  return {
    top: parseInt(arr[0]) - 1,
    len: parseInt(arr[1]) - parseInt(arr[0]) + 1
  }
}

const co = ['#AEEC35', '#AB90FF', '#FEC44F', '#59F0A4', '#FEA17D', '#86B0FE', '#FE9DD8', '#FF9393', '#D38DFA']
function color() {
  return co[Math.floor(Math.random() * 9)]
}
