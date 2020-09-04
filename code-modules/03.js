//try to creat a file
var fs = require('fs')

fs.writeFile('./bbb.txt', "為何我打不進去！！！", function (err) {
    console.log('success')
})