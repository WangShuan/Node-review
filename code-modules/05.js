var http = require('http')

var server = http.createServer()

server.on('request', function (request, reponse) {
    reponse.write("hahaha I'm reponse.write")
    reponse.end()
    console.log("我收到請求了")
})

server.listen(3000, function () {
    console.log("此服務器已啟動，請使用 http://127.0.0.1:3000/ 訪問此服務器")
})