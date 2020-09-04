const express = require('express');

const app = express()

app.get('/',function(req,res){
    res.send('home')
})

app.get('/about', function (req, res) {
    res.send('關於我')
})

app.get('/node', function (req, res) {
    res.send('hello node.js')
})

app.listen(3000,function(){
    console.log('running')
})