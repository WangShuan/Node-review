var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function (req, res) {
    // plain 為普通文本, css 為樣式類型, html 為 html code 類型
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    // res.end('test 哈哈哈哈哈')
    if(req.url ==='/'){
        fs.readFile('./index.html',function(err,data){
            if(err){
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end('數據有問題請重試')
            }else{
                res.end(data)
            }
        })
    }
})

server.listen(3000, function () {
    console.log('server is running')
})