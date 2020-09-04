var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')
var app = express()

// 公開靜態資源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

// 模板引擎
app.engine('html', require('express-art-template'))

// body-parser 配置
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

app.listen(3000, function () {
    console.log('server is running ....')
})