var http = require('http')

var server = http.createServer()

server.on('request', function (request, reponse) {
    if (request.url === '/') {
        reponse.write('home!')
        reponse.end()
    } else if (request.url === '/login') {
        reponse.write('login!')
        reponse.end()
    } else {
        reponse.write('errow!')
        reponse.end()
    }
})

server.listen(3000, function () {
    console.log("此服務器已啟動，請使用 http://127.0.0.1:3000/ 訪問此服務器")
})