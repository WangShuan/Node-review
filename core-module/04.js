//use node to creat http server
var http = require('http')

var server = http.createServer()

server.on('request',function(){
    console.log("I got you")
})

server.listen(3000,function(){
    console.log("is running")
})
