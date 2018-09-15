const axios = require("axios")
// const http = require('http')
const express = require('express')
const app = express()
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
axios.defaults.baseURL = 'http://jwgl.jxau.edu.cn'
axios.defaults.headers.common['Host'] = "jwgl.jxau.edu.cn"
app.get('/', function(req, res, next) {
	res.send("DSds")
})
app.post("/login", async function(req, res, next) {
	var data = await axios({
		method: 'post',
		url: '/User/UserLoginForCline',
		params: {
			"username": req.body.username,
			"password": req.body.password
		}
	}).catch((err) => {
		console.log(err)
	})
	if (!data.data.success) {
		res.send(data.data);
		return
	}
	cookie = data.headers['set-cookie'][0].split(";")[0]
	res.send({
		...data['data'],
		cookie
	});
})
// 获取个人信息
app.post("/GetUserInfo", async function(req, res, next) {
	var msg = req.body.msg
	// 这里是获取个人信息
	var data1 = await axios({
		method: 'post',
		url: `/XueJiManage/XueJiManage/GetUserInfo/${msg.split('=')[0]}`,
		headers: {
			"Cookie": msg
		},
		params: {
			"Xh": req.body.Xh
		}
	}).catch((err) => {
		console.log(err)
	})
	// 获取学校信息
	var data2 = await axios({
		method: 'post',
		url: `/SystemService/GetSystemXueqi/`,
		headers: {
			"Cookie": msg
		}
	})
	// var data = data1.data.Data[0]
	var obj = {
		Xh: data1.data.Data[0].Xh,
		Xm: data1.data.Data[0].Xm,
		Bjmc: data1.data.Data[0].Bjmc,
		Yxmc: data1.data.Data[0].Yxmc,
		Zymc: data1.data.Data[0].Zymc,
		XxName: data2.data.Data[0].XxName,
		DqXqqc: data2.data.Data[0].DqXqqc,
		DqXq: data2.data.Data[0].DqXq,
		SkZhou: data2.data.Data[0].SkZhou,
		DqXq: data2.data.Data[0].DqXq
	}
	res.send(obj)
})
// 获取课表信息
app.post("/Timetable", async function(req, res, next) {
	var msg = req.body.msg
	var xq = req.body.Xq
	var data = await axios({
		method: 'post',
		url: `/PaikeManage/KebiaoInfo/GetStudentKebiaoByXq/${msg.split('=')[0]}`,
		headers: {
			"Cookie": msg
		},
		params: {
			"xq": xq
		}
	})
	res.send(data.data)
})
// 获取成绩
app.post("/achievement", async function(req, res, next) {
	var msg = req.body.msg
	var achievement = await axios({
		method: 'post',
		url: `/CJManage/GetXsCjByXh/${msg.split('=')[0]}`,
		headers: {
			"Cookie": msg
		}
	})
	res.send(achievement.data)
})
// 获取考试信息
app.post("/getExam", async function(req, res, next) {
	var msg = req.body.msg
	var xq = req.body.Xq
	var exam = await axios({
		method: 'post',
		url: `/KaoShiAnPaiChaXunManage/GetKaoShiInfo_Student/${msg.split('=')[0]}`,
		headers: {
			"Cookie": msg
		},
		params: {
			"xq": xq,
			"start": 0,
			"limit": 1000
		}
	})
	res.send(exam.data)
})
var server = app.listen(3000, 'localhost', function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});