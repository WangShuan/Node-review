var express = require('express')
var app = express()
var fs = require('fs')

app.engine('html', require('express-art-template'))

app.get('/', function (req, res) {
    var dirUrl = '/Users/wangyaxuan/Desktop/school'
        fs.readdir(dirUrl, function (err, files) {
            if (err) {
                return res.end('oop! 404 not found!')
            }

            res.render('index.html', {
                files: files
            })
        })
})

app.listen(3000,function(){
    console.log('running...')
})