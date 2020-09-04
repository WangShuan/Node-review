var fs = require('fs')
var express = require('express')
var app = express()

app.use('/public/', express.static('./public/'))
app.engine('html', require('express-art-template'))

var comments = ''


app.get('/', function (req, res) {
    fs.readFile('./public/json/comments.json', function (err, data) {
        if (err) {
            return res.render('404.html')
        }
        comments = JSON.parse(data)

        res.render('index.html', {
            comments: comments.comments
        })
    })
})

app.get('/post', function (req, res) {
    res.render('post.html')
})

app.get('/form', function (req, res) {
    fs.readFile('./public/json/comments.json', function (err, data) {
        if (err) {
            return res.render('404.html')
        }
        comments = JSON.parse(data)

        var comment = req.query
        comment.dateTime = '2020-02-22'
        comments.comments.unshift(comment)
        
        fs.writeFile('./public/json/comments.json', JSON.stringify(comments), function (err, data) {
            if (err) {
                return res.render('404.html')
            }
            console.log('存儲完畢')
        })

        res.render('index.html', {
            comments: comments.comments
        },function(){
            res.redirect('/')
        })

    })
})

app.listen(3000, function () {
    console.log('Running.......')
})
