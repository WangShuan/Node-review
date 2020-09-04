var http = require('http');

var server = http.createServer()

server.on('request',function(req,res){
    //plain 為普通文本, css 為樣式類型, html 為 html code 類型
    res.setHeader('Content-Type','text/plain; charset=utf-8')
    res.end('test 哈哈哈哈哈')
})

server.listen(3000,function(){
    console.log('server is running')
})