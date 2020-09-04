const http = require('http');
const fs = require('fs');

var server = http.createServer()

server.on('request',function(req,res){
    var dirUrl = '/Users/wangyaxuan/Desktop/school'
    fs.readFile('./index.html', function (err, data) {
        if (err) {
            return res.end('<h1>404 not found.</h1>')
        }
        fs.readdir(dirUrl, function (err, files) {
            if (err) {
                return res.end('404 can not find dir')
            }
            var content = ''
            files.forEach(function(item){
                content = content + `
                <tr>
                    <td data-value="金流網站/"><a class="icon dir" href="/Users/wangyaxuan/Desktop/school/%E9%87%91%E6%B5%81%E7%B6%B2%E7%AB%99/">${item}</a></td>
                    <td class="detailsColumn" data-value="0"></td>
                    <td class="detailsColumn" data-value="1562267356">2019/7/5 上午3:09:16</td>
                </tr>
                `
            })
            data = data.toString()
            data = data.replace('^(00)^', content)
            res.end(data)
        })
    })
})

server.listen(3000,function(){
    console.log('running')
})