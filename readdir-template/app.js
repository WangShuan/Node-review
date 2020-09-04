const http = require('http');
const fs = require('fs');
const artTemplate = require('art-template');

var server = http.createServer()

server.on('request', function (req, res) {
    var dirUrl = '/Users/wangyaxuan/Desktop/school'
    fs.readFile('./index.html', function (err, data) {
        if (err) {
            return res.end('<h1>404 not found.</h1>')
        }

        fs.readdir(dirUrl, function (err, files) {
            if (err) {
                return res.end('oop! 404 not found!')
            }

            var ret = artTemplate.render(data.toString(), { files: files })

            res.end(ret)
        })
    })
})

server.listen(3000, function () {
    console.log('running')
})