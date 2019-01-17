//学长测试的文件--实现post请求接口并发送消息
var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var app = express();
var url = require('url');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/save', function (req, res, next) {
    // console.log(req);//打印出请求体的信息
    res.send('it is response for CORS request!');//发出响应信息，显示在浏览器上。
});

app.listen('8088', function () {
    console.log('服务器启动');
});