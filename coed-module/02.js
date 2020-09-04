//try to read a file
var fs = require('fs')

fs.readFile('./aaa.txt',function(err,data){
    console.log(data.toString())
})