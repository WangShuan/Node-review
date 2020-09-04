var http = require('http')
var fs = require('fs')
var artTemplate = require('art-template')
var url = require('url')

var comments = ''

fs.readFile('./public/json/comments.json', function (err, data) {
    if (err) {
        return res.end('<h1>oop! 404 not found.</h1>')
    }
    comments = JSON.parse(data).comments
})

http
    .createServer(function (req, res) {
        var parseObj = url.parse(req.url,true)
        var pathname = parseObj.pathname
        var read404 = function () {
            fs.readFile('./views/404.html', function (err, data) {
                if (err) {
                    return res.end('<h1>oop! 404 not found.</h1>')
                }
                res.end(data)
            })
        }

        if (pathname === '/') {
            fs.readFile('./views/index.html', function (err, data) {
                if (err) {
                    return read404()
                }
                var ret = artTemplate.render(data.toString(), { comments: comments })
                res.end(ret)
            })
        } else if (pathname.indexOf('/public/') === 0) {
            fs.readFile('.' + pathname, function (err, data) {
                if (err) {
                    return read404()
                }
                res.end(data)
            })
        } else if (pathname === '/post') {
            fs.readFile('./views/post.html', function (err, data) {
                if (err) {
                    return read404()
                }
                res.end(data)
            })
        } else if ( pathname === '/pinglun') {
            var comment = JSON.parse(JSON.stringify(parseObj.query)) 
            comment.dateTime = '2020-02-22'
            comments.push(comment)
            res.statusCode = 301
            res.setHeader('Location','/')
            res.end()
        } else {
            read404()
        }
    })

    .listen(3000, function () {
        console.log('Running.......')
    })
