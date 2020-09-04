var fs = require('fs')

exports.find = function(callback){
    fs.readFile('./db.json',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

exports.findById = function(id,callback){
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        id = parseInt(id)
        var stu = students.find(function (item) {
            return item.id === id
        })
        // console.log(stu)
        callback(null, stu)
    })
}

exports.save = function(student,callback){
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return callback(err)
        }
        // 把 data 轉 json 數據格式
        var students = JSON.parse(data)
        // 獲取數據對象的長度
        var len = Object.keys(students.students).length
        // 幫新添加的數據建立 id
        student.id = students.students[len - 1].id + 1
        // 把數據添加到 json 數據裡面
        students.students.push(student)
        // 把數據從 json 轉成字符串
        var newData = JSON.stringify(students)
        // 把數據寫入 json 文件中
        fs.writeFile('./db.json', newData, function (err) {
            if (err) {
                return callback(err)
            }
        })
        callback(null)
    })
}

exports.updateById = function(student,callback){
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return callback(err)
        }  
        var students = JSON.parse(data).students
        student.id = parseInt(student.id)
        var stu = students.find(function(item){
            return item.id === student.id
        })

        for(var key in student){
            stu[key] = student[key]
        }

        var newData = JSON.stringify({students:students})
        // 把數據寫入 json 文件中
        fs.writeFile('./db.json', newData, function (err) {
            if (err) {
                return callback(err)
            }
        })
        callback(null)
    })
}

exports.deleteById = function (id, callback) {
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        id = parseInt(id)
        var stu = students.findIndex(function (item) {
            return item.id === id
        })
        students.splice(stu,1)
        var newData = JSON.stringify({ students: students })
        // 把數據寫入 json 文件中
        fs.writeFile('./db.json', newData, function (err) {
            if (err) {
                return callback(err)
            }
        })
        callback(null)
    })
}
