# Node-review


## 1. node 使用方式


### 1-1. Node 第一次使用講解（在 code-module/01.js ）

創建一個 JS 檔案, 創建一個變量 foo 為文字, `console.log(foo)`

開啟終端機到此 JS 檔案的目錄, 然後使用 `node 空格 + 此檔案名`

** 這裏要注意檔案名稱不可為 `node.js` 否則無法執行 **

代碼如下：

```js

// 在 js 文件中 var foo = "我是範例文字內容"

console.log(foo)

// 開啟終端機 到該文件的目錄中

// 假設文件名為 a.js 則在終端機中

// 輸入 node 空格文件名,按 enter 及執行裡面代碼,如下：

node a.js

```


### 1-2. Node 中專門用來測試的方法

在瀏覽器中 可使用右鍵 檢查 裡面的 `Consloe` 測試代碼

在 Node 中也有類似於 `Consloe` 的測試環境

使用方式為 打開任意目錄的終端機 輸入 `node` 按下 `enter` 鍵

即可在終端機中 不需 `require` 的任意測試各種核心模塊

若要離開測試環境則連續按下兩次 `control＋C` 即可




## 2. node 文件操作


### 2-1.讀取文件（在 code-module/02.js ）

創建一個 JS 檔案, 使用 `require` 加載一個文件系統模塊 `fs`,

使用 `fs.readfile` 方法, 參數1為讀取的檔案路徑, 參數2為回調函數,

回調函數中的參數1為 `err` 錯誤對象,參數2為 `data` 數據

** 這裡的 `data` 要 `toString` 是因為 node 讀取出來的是二進制文字 **

代碼如下：

```js

var fs = require('fs')

fs.readFile('./test.txt',function(err,data){
    console.log(data.toString())
})
```


### 2-2.創建文件（在 code-module/03.js ）

創建一個 JS 檔案, 使用 `require` 加載一個文件系統模塊 `fs`,

使用 `fs.writefile` 方法, 參數1為讀取的檔案路徑, 參數2為寫入文件內容 參數3為回調函數, 

此回調函數中的參數只需一個, 為 `err` 錯誤對象

假設沒有 `err` 對象,則 `console.log` 回報一句成功即可

代碼如下：

```js

var fs = require('fs')

fs.writeFile('./test.txt', "範例文字", function (err) {
    console.log('success')
})

```


### 2-3.關於 errow

因為 node 本身不會報錯, 所以需要有 `errow` 對象

當 `errow` 為空時表示成功, 假設失敗 `console.log(data)` 則會顯示為 `undefined` , 

此 `errow` 為一個數組對象

測試代碼如下：

```js

var fs = require('fs')

fs.readFile('./test.txt',function(err,data){
    console.log(data.toString())
})
// 假設沒有處理 err 則 console.log 會顯示 undefined

```




## 3. node 創建 http 服務器

服務器是用來提供對數據的服務（數據可能是一個網頁代碼或視頻圖片等等）

服務器的執行順序為： a.發送請求➡️ b.接收請求➡️ c.處理請求➡️ d.回饋響應

若要關閉 node 服務器 在終端機按下 `control+C` 即可


### 3-1.接收請求（在 code-module/04.js ）

創建一個 JS 檔案, 使用 `require` 加載一個核心模塊 `http`,

然後創建 http 服務器, 方法為 定義一個變量 `server` 為 `http.createServer()`

使用 `server.on()` 方法註冊請求事件, 參數1為 `reuqest` , 參數2為回調函數

** 補充說明：`server.on()` 是執行當客戶端對我們發送請求時 我們觸發請求事件接收請求的過程 **

最後使用 `server.listen()` 方法創建端口號, 參數1為端口號號碼, 參數2為回調函數

* 這裡的端口號號碼其實沒有特殊意義 僅是用來賦予我們自己創建的服務器一個聯網的號碼 

* 且其實每個需要聯網的應用程序都有自己的端口號 此端口號不會重複也不能重複

* 例如端口號 80 默認是給網路上的 http 服務器使用的 這個東西不需要記得 讓電腦服務器自己找就好

* 假設我們把自己創建的端口號讓其他電腦訪問 他們的電腦即會自動開啟一個和我們電腦連接的端口號

* 要讓其他電腦訪問自己創建的服務器 需要用我們自己電腦的 ip 地址加上我們設定的端口號

* 而此時在他們對我的服務器發送請求時 我們獲取到的他們的端口號則不會再是我們設定的端口號

* 而是他們電腦主動為了與我們這個服務器連接 所創建的端口號碼

代碼如下：

```js 

var http = require('http')

var server = http.createServer()

server.on('request',function(){
    console.log("我收到請求了")
})

server.listen(3000,function(){
    console.log("此服務器已啟動，
    請使用 http://127.0.0.1:3000/ 訪問此服務器")
})

```


### 3-2.發送響應（在 code-module/05.js ）

接收請求與發送響應都在 `server.on()` 事件中的回調函數裡執行,

在此事件的回調函數中, 參數1為 `request`, 參數2為 `response`,

在 `response` 中 有兩種常用方法為 `write` 和 `end`,

`write` 即為在響應中寫入數據, `end` 則是結束響應,

若只寫入數據沒有結束響應 則請求會一直處於等待中（網站一直轉圈圈不動）

代碼如下：

```js

var http = require('http')

var server = http.createServer()

server.on('request',function(request,reponse){
    reponse.write("hahaha I'm reponse.write")
    reponse.end()
})

server.listen(3000,function(){
    console.log("此服務器已啟動，
    請使用 http://127.0.0.1:3000 訪問此服務器")
})

```


### 3-3.關於請求地址（在 code-module/06.js ）

在剛才上面兩個服務器的案例中 不管你的請求地址是什麼 只要發送請求他就給你響應

若是要控制每個請求地址對應不同的請求響應則需要利用 `request.url` 獲取端口號後面的路徑名稱

網址默認的 `url` 地址結尾為 `/` , 即當你在請求地址中輸入 `http://127.0.0.1:3000`

其實是他會默認加上 `/` ,假設你將那段網址複製貼上就會發現它其實是 `http://127.0.0.1:3000/`

舉例我們請求 `/` 時顯示 首頁, 請求 `/login` 時顯示 登入, 請求其他時顯示 `404 errow`

代碼如下：

```js 

server.on('request', function (request, reponse) {
    if (request.url === '/') { //請求 / 時執行
        reponse.write('home!') //響應回一個文字 home!
        reponse.end() //結束響應
    } else if (request.url === '/login') { //請求 /login 時執行
        reponse.write('login!') //響應回一個文字 login!
        reponse.end() //結束響應
    } else { //請求路徑不符合以上兩種時執行
        reponse.write('errow!') //響應回一個文字 errow!
        reponse.end() //結束響應
    }
})

```


### 3-4.關於傳送響應的一些補充（在 code-module/07.js 和 code-module/08.js）

`reponse.write` 可以多次使用, 默認會直接將所有響應內容連在一起 但結束響應只能一次 因為一個請求對應一個響應

假設你的代碼為 `reponse.write('123')` `reponse.write(' 456')`則顯示 `123 456`

若覺得代碼太冗長 可在結束響應時同時發送數據內容, 方法為 `reponse.end('123 456')`

* `reponse.write` 無法直接傳送中文字到網頁頁面, 會變成亂碼

* 因為瀏覽器沒有收到你響應內容的類型設定 默認會依照你的電腦操作系統編碼 中文操作系統編碼是 `gbk`

* 但世界通用編碼是 `utf8` 所以我們需要自行設定響應頭為 `utf8` 編碼 才不會解析錯誤

  * 此時可設定響應頭 `response.setHeader()` 參數1為內容類型 參數2為普通文本類型編碼 `utf8`

    * 假設你的響應體是 `html` 類型且含有中文字則需改成 `text/html; charset=utf-8`

  * `response.write` 支持二進制數據 所以可以直接使用 `fs` 讀取文件傳送響應而不用再 `data.toString`

    * 假設你傳送的響應為整個網頁代碼 則因網頁中含有 `meta` 標籤 已設定編碼為 `utf8` 所以也不需另外設定響應頭

代碼如下：

```js

server.on('request',function(req,res){
    res.setHeader('Content-Type','text/plain; charset=utf-8')
    res.end('我是中文文本內容')
})

```

* 響應內容只能是二進制數據或字符串 如非這兩種數據則要記得使用 `toString()` 方法轉為字符串

* 如若你要傳送的數據是數組 則可使用 `JSON.stringify(數組)` 把數組對象轉為字符串


### 3-5. 試做用 html 服務器開啟瀏覽資料夾（在 readdir-replace 目錄）

創建一個 `readdir` 資料夾 用 `node` 中的 `http` 服務器試做 『 瀏覽器網頁開啟資料夾 』

結合 `fs` 核心模塊中的 `readdir` 方法 使用 `replace` 方法 ＋ `forEach` 方法 渲染頁面

* `readdir` 跟 `readfile` 使用方式相同 差別在於一個是讀取目錄一個是讀取文件

* `replace` 方法用來替換字符串 參數1是要刪除的字 參數2是補上的內容

* `forEach` 方法是 `ES6` 中的 且不支援低版本瀏覽器(如IE8)

  * 補充 ES6 中的 ` 符號使用方式：
  
  *  ` 跟單雙引號的差別為支持換行, 且可藉由 ${} 來拼接字符串中的變量

代碼如下：

```js

fs.readdir(dirUrl, function (err, files) {
    if (err) {
        return res.end('404 can not find dir')
    }
    var content = '' //替換的內容
    files.forEach(function(item){
        content = content + `
        我是範例文字
        我是範例文字 ${item} 我是範例文字
        我是範例文字
        `
})
    data = data.toString() // 將二進制數據轉成字符串
    data = data.replace('要被替換的內容', content)
    res.end(data)
})

```




## 4. node 中的三種模塊

node 中的 js 支持 `EcmaScript6` ,而 node 跟 js 唯一的差別只是 node 中沒有 DOM 和 BOM


### 4-1.核心模塊

在 node 中它提供了許多很厲害的 API 這些 API 都被包裝成特定名稱的核心模塊

常用的比如：文件操作有 `fs` 核心模塊, 服務器則有 `http` 核心模塊 ....等等

要使用這些核心模塊只需要通過 `require` 引用至你的 js 文件中即可

因為這些核心模塊都被包含在 `node` 這個應用程式裡面了


### 4-2.模塊系統

在 node 中一次只能於終端機開啟一個 `js` 文件

當你要一次執行多個 `js` 文件時 則一直在 `js` 文件中 `require` 加載其他 `js` 文件

在這裡稱你所加載的其他 `js` 文件為 用戶『 自定義模塊 』

* 注意這裡的 `require` 若省略後綴名, 默認會由 `.js` ➡️ `.json` ➡️ `.node` 依序查找

代碼如下：

```js

//在 a.js 中 console.log('a start')
require('./b') //文件路徑後綴名 .js 建議省略

console.log('a end')

//這裏執行 node 後會出現
a start ➡️ bbb ➡️ a end

```


### 4-3. 第三方模塊

在 node 中可以使用第三方模塊 使用方式為 1.安裝 2.加載第三方模塊 3.使用

安裝方式為 到你想使用的文件目錄下打開終端機 `npm i` 安裝第三方包

加載方式為 到 `js` 文件中 以 `require` 加載第三方模塊 加載的模塊名稱即為安裝包的名稱

* 在 node 中 安裝的第三方包都會在 `node_modules` 資料夾中

* 此 `node_modules` 資料夾是 node 自動創建的 不可改名 改了就無法使用

這裡以 `art-template` 模板引擎為範例 代碼如下：

```js 

// 安裝：到終端機 輸入
npm i art-template

// 加載：到 js 中輸入
var template = require('art-template')

// 使用：
template.render('創建的模板',{ 雙花括號的替換內容 })

```




## 5. art-template 第三方模塊


### 5-1. 用第三方模塊 art-template 試做瀏覽器開資料夾頁面（在 readdir-template 目錄）

安裝並加載第三方模塊 `atr-template` , 使用 `fs.readdir` 方法獲取資料夾

此方法獲取到的會直接是一個 `files` 數組,

所以可以使用 `art-template` 模板中的 `each` 方法將資料夾直接渲染

* `each` 方法為在模板中寫入 `{{each 數組名}}{{ $value }}{{/each}}`

代碼如下：

```js

fs.readfile('./index.html',function(err,data){
    if(err){
        return res.end('404')
    }
    fs.readdir(dirUrl, function (err, files) {
        if (err) {
            return res.end('oop! 404 not found!')
        }
// 因為要響應的結果是套用過模板引擎後的內容
// 所以要聲明一個變量 ret ,用 res.end(ret) 傳回響應
        var ret = artTemplate.render(data.toString(), { files: files })
        res.end(ret)
    })
})

```


### 5-2. 補充 art-temple 瀏覽器中用法

`art-template` 初期是專為服務器打造的 後來才延伸使用到瀏覽器中

瀏覽器的使用方式為 `script` 標籤引入 ➡️ 創建模板 最後再將模板渲染到網頁內容中

`art-template` 的方法是 `template(模板的 id ,{ 替換的內容 })`

* 一定要記得把標籤類型改為非 `js` 並賦予一個 `id` 否則模板將會被當 `js` 解析

代碼如下：

```js

//這裏是創建模板
＜script type = "text/art-template" id = "tp"＞
my name is {{ name }} , my age is {{ age }} years old .
I like {{each thing}}{{ $value }}{{/each}}
＜/script＞

//這裏是渲染
＜script＞
var ret = template('tp',{
name: 'john',
age: 35,
thing: ['apple', 'iphone', 'monster'] })
＜/script＞

```




## 6. node 中的作用域與 exports 對象

在 node 中沒有全局作用域 只有模塊作用域(即文件作用域)

比如你在 `a.js` 文件中創建一個函數, 在 `a.js` 引入 `b.js`

`b.js` 文件裡面無法使用 `a.js` 創建的函數或變量

函數與變量僅有在創建該函數變量的文件中才有使用效果

假設你想獲得其他 `js` 文件裡的作用域 則可使用 `require` 獲取導出的對象

因為在 node 的模塊作用域中 每個文件裡默認都有一個 `exports` 對象

它即是專門用來獲取其他 `js` 腳本文件的變量或函數等數據對象的

此 `exports` 對象默認為空對象 `console.log()` 會得到 `{}` 空對象

假設想在 `a.js` 獲取 `b.js` 的某函數時 即在 `b.js` 裡將函數導出即可

代碼如下：

```js

//在 b.js 中
var foo = 'bbb'
exports.foo = foo

//在 a.js 中
var bExports = require('./b')
console.log(bExports.foo)
//則得到 bbb

```




## 7. 用上述所學做一個留言本案例（在 feedback 目錄）

創建一個 `feedback` 資料夾, 加入首頁跟留言的 `html` 檔案, 創建一個 `app.js` 文件

為了讓目錄結構更清晰 把服務器撰寫在 `app.js` 文件中, `html` 檔案則放入新建的 `views` 資料夾中

另外為了處理靜態資源(`css` `js` `img` 等)則把靜態資源統一放在新建的 `public` 資料夾中


### 7-1. 這裡補充 server.on() / server.listen() 的其他寫法

取消創建 `server` 變量 直接使用 `http.createServer()` 然後接著 `.listen()`

代碼如下：

```js 

var http = require('http')

http
    .createServer(function(req,res){
    // 這裏同 server.on('request',function(req,res{})) 使用方式
    })
    .listen(3000,function(){})

```


### 7-2. 動態資源讀取方式

為了讓 `html` 檔案遇到 `img` `css` `js` 等引入式標籤可以獲取到這些動態資源

我們把這些資源統一放入 `public` 資料夾 統一讀取此資料夾中的資源

這裏用 `indexOf()` 方法 判斷 `url` 中是否含有 `/public/`

代碼如下：

```js

if (url.indexOf('/public/') === 0) {
    fs.readFile('.' + url, function (err, data) {
        if (err) {return res.end('oop! 404 not found.')}
    res.end(data)})
}

```


### 7-3. 使用 JSON 處理數據內容

創建一個 `JSON` 目錄存放在 `public` 目錄裡面, 在 `JSON` 目錄下新增一個 `comments.json` 文件

把留言的數據存放到此文件中, 再到 `app.js` 裡讀取 `comments.json` 文件

方法為在 `app.js` 中創建一個變量 `comments` 利用 `fs.readFile` 方法獲取留言數據

最後使用 `art-template` 模板引擎將留言內容渲染到頁面上,

* 這裏注意 `JSON` 數據要使用 `JSON.parse()` 方法轉成 `json` 對象才可在模板引擎中使用

代碼如下：

```js

fs.readFile('./public/json/comments.json', function (err, data) {
    if (err) {
        return res.end('oop! 404 not found.')
    }
    comments = JSON.parse(data).comments
})

```


### 7-4. 補充說明 form 表單 GET 請求

在 `html` 中的 `form` 表單 配合 `input:submit` 使用可以提交內容

使用方式為給表單添加 `action` 屬性設置一個地址 然後添加 `method` 屬性設置提交方式

表單 `method` 若選擇 `get` 提交方式 則表單提交的內容會顯示在 `url` 中

提交內容會以 `action?name=value` 的方式顯示在問號後方

這裡的 `name` 是 `html` 中 `input` 的 `name` 屬性 `value` 則是該 `input` 中的內容

如下：

```js

＜form action="/pinglun" method="get"＞
// 提交後 url 地址會變成
// 127.0.0.1:3000/pinglun?name1=value1&name2=value2

```


### 7-5.node 核心模塊 url 的使用方式

在 `node` 中有專門用來處理 `url` 地址的核心模塊 就叫 `url`

一樣是先加載後使用, 在此模塊中有一個 `url.parse(url地址)` 方法專門用於獲取 `url` 地址的各種屬性

在 `url.parse(url地址)` 方法獲取的屬性中有一個叫 `query` 的屬性

`query` 屬性是專門用來獲取表單提交數據在 `?` 後面的 `name=value` 部分 此部分默認是二進制數據

假設你在 `url.parse()` 方法中傳入第二個參數為 `true` 則可將 `name=value` 的部分轉為字符串對象

此對象會顯示為 `[Object: null prototype]{name: 'value'}`

所以當你要操作此對象時 可以用 `JSON.parse(JSON.stringify(parseObj.query))`

即可將對象前面的 `[Object: null prototype]` 去除

代碼如下：

```js

var parseObj = url.parse( url地址 ,true)
var obj = JSON.parse(JSON.stringify(parseObj.query))

```

* 補充 parsename 屬性：

`url.parse( url 地址).parsename` 可獲取不包含查詢字符串部分的內容


### 7-6. 網頁重定向方法

表單傳送後 網址會變成 `/xxx?name1=value1`

這時候因為我們已經處理好頁面渲染 畫面會回到首頁 但網址沒有改變

所以需要重定向(頁面跳轉的意思)到首頁

方法為 1. 設置狀態碼為 302 (臨時重定向) 2. 設置響應頭中的 `Location`

代碼如下：

```js

res.statusCode = 302
res.setHeader('Location','/')

```

* 補充 301 302 重定向的狀態碼差別：

  * 301 是永久重定向 當你每次訪問該 `url` 地址他就會馬上跳轉到設置的 `url` 地址

  * 302 則是臨時重定向 每次訪問時都會重新跳轉頁面




## 8. 加載規則


### 8-1. require 優先從緩存加載

node 中的 `require` 會優先從緩存加載 假設你有兩個文件同時加載引用了某文件

該文件只會被加載一次 不會重複加載兩次 但可以獲取兩次該文件導出的對象

這是 node 為了提高效率所定的加載規則 主要是避免他重複加載兩次


### 8-2. 第三方模塊加載規則

第三方模塊的加載方式為 在加載第三方模塊的文件所處目錄找到 `node_modules` 資料夾

在 `node_modules` 中找到該第三方模塊名稱的目錄 找到 `package.json` 文件

在 `package.json` 文件中找到 main 屬性 加載該屬性對應的 js 文件

最終你引用加載的第三方模塊其實就是該 js 文件

假設沒有 `package.json` 文件 或 找不到 `main` 屬性

則會直接加載該第三方模塊名稱的目錄下的 `index.js` 文件

再假設以上所有條件都不成立(比如該目錄沒有 `node_modules` ) 則進入上一級目錄中按此規則尋找

假設上一級目錄也沒有符合 就會一直往上一級找 直到根目錄也沒有才會報錯

由於以上規則 我們建議把第三方模塊安裝在項目根目錄中 避免每個項目裡面都有相同的 `node_modules` 目錄


### 8-3. 導出方式

前面提到過 node 中的所有文件都是文件作用域 若要訪問其他文件中的成員須透過 `exports` 對象導出成員

即在 node 的每個文件中其實都默認有一個對象叫 module (我們看不到但他存在)

而我們可把要導出的數據都掛載到 `module.exports` 這個對象中

但因為這樣代碼點來點去很多很雜 所以 node 又默默創立了一個變量 `exports`

即在我們看不到的地方其實還有一句 `var exports = module.exports`

所以假設你只想導出某文件的一個成員 則可使用 `module.exports = 該成員`

但不能直接使用 `exports = 該成員` 因為原本的 `exports` 已被賦值為 `module.exports`

即每個文件中有一段隱藏的代碼如下：

```js

var module = {
    exports: {
        導出的對象
    }
}
var exports = module.exports
return module.exports

```


### 8-4. `package.josn` 說明

當你在安裝第三方模塊時如果在模塊名稱後面加上 --save

node 就會在你安裝第三方模塊的目錄中新建一個 package.json 文件

此文件中會記錄你下載的包有哪些 萬一你哪天不小心把整個 node_modules 目錄刪除了

可以靠此 `package.json` 文件找回安裝的第三方模塊

你也可以在剛要開始做 node 項目時 直接在目錄中打開終端機 輸入命令 `npm init`

然後跟著嚮導指示操作 創建一個完整的 `package.json` 文件

代碼如下：

```js
npm init // 輸入此命令開始執行創建嚮導

package name: (test) // 項目目錄名稱
version: (1.0.0) // 版本
description: 測試 // 項目描述
entry point: (index.js) app.js // 項目入口文件
test command:
git repository:
keywords:
author: wangyaxuan // 作者
license: (ISC)
About to write to /Users/wangyaxuan/Desktop/test/package.json:

{
  "name": "test",
  "version": "1.0.0",
  "description": "測試",
  "main": "app.js",
  "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
  "author": "wangyaxuan",
  "license": "ISC"
}


Is this OK? (yes) yes // 輸入 yes 創建 package.json

```

創建完成後 當你安裝第三方模塊 在 `package.json` 中就會多出一個 dependencies 屬性

dependencies 屬性裡面的就是你所安裝的第三方模塊名稱和該第三方模塊的版本號

假設哪天你不小心刪了 node_modules 可以直接通過命令行輸入 `npm install` 一次性把所有包安裝回來

* 補充：可以使用 `npm init -y` 跳過嚮導快速創建 `package.json` 文件


### 8-5. `package-lock.json` 文件說明

在 npm 版本 5.0 以上 安裝任何包時不需再加上 `--save` 就會自動生成或更新 `package-lock.json` 文件

此 `package-lock.json` 文件有兩個很重要很重要的作用：

1. 它會鎖定你所有模塊的版本

以 bootstrap 為例 假設你安裝的是 bootstrap3

但當你把 node_modules 刪除後 若只看 `package.json` 文件 是會自動安裝該項目最新版本的

這樣可能會導致你的畫面有點問題 所以我們需要鎖定版本下載

假設你有 `package-lock.json` 文件 你則可以直接安裝該指定版本號而不需手動指定版本下載

即在 `package-lock.json` 中存儲的版本是 `3.0`

而在 `package.json` 中存儲的版本則是 `^3.0` 這裡的 `^` 意思是`以上` 即它會自動下載最新版本

2. dependencies 屬性增加了

當你打開 `package-lock.json` 文件會發現 裡面的 dependencies 屬性 有很多很多

且它不僅只有寫版本 還多了比如你原先下載的包的所有依賴項、項目下載地址、項目文件額外加載的第三方包等

這些信息能讓我們在誤刪 node_modules 目錄後 更快速地去 `npm install`




## 9. Express ( Web 開發框架 )

express 是一個框架裡面封裝了很多 http 核心模塊的使用方法

在 http 模塊中創建服務器的方法很底層 這個框架能讓我們更方便快速地去創建 http 服務器


### 9-1. 最基本的使用方式（在 express-demo 目錄）

使用方式第一步 在終端機中 `npm i express` 安裝 express 第三方模塊

然後開啟你的 js 文件 require 這個模塊, 創建變量 `app = express()` ➡️ 這等同於 http 中的 `http.createServer()`

使用 `app.get()` 方法處理請求事件 使用 `app.listen()` 方法創建端口號即可

* 若要處理其他請求地址則再寫一個 `app.get()` 方法

* 在 express 中使用 `res.send()` 取代 `res.end()` 方法

代碼如下：

```js

var express = require('express')

var app = express()

app.get('/',function(req,res){
    res.send('我是首頁')
})

app.get('/about', function (req, res) {
    res.send('關於我')
})

app.listen(3000,function(){
    console.log('running')
})

```

### 9-2. 靜態資源公開方式

在 express 中提供一個快速處理靜態資源的服務, `app.use('/xxx/',express.static('./xxx/'))` 方法

`app.use()` 方法中若省略第一個參數 則可直接不加 `/public/` 訪問 `./public/` 目錄下的資源

假設第一個參數改成 `/abc/` 則可通過 `/abc/` 開頭的路徑請求 `./public/` 目錄下的文件 此時 `abc` 等同於 `public` 的別名

第一個參數只是一個代號 主要還是看 `express.static()` 中的是哪個目錄 則開放哪個目錄的資源

以訪問 `public` 目錄下的 `view` 目錄中的 `index.html` 文件為範例, 代碼如下：

```js

var express = require('express')
var app = express()

// url 寫 127.0.0.1:3000/public/view/index.html
app.use('/public/',express.static('./public/'))

// url 寫 127.0.0.1:3000/view/index.html
app.use(express.static('./public/'))

// url 寫 127.0.0.1:3000/abc/view/index.html
app.use('/abc/',express.static('./public/'))

```


### 9-3. express 中模板引擎使用方式（在 express-template 目錄）

在目錄中安裝 `express` `art-template` `express-art-template` 三個第三方模塊

然後創建變量 `app = express()` 使用 `app.engine()` 方法 參數1為渲染的檔案後綴名 參數2為加載 `express-art-template`

當 `app.get()` 方法請求 `/` 時 渲染 `index.html` 文件到頁面

渲染方式為 `res.render()` 方法 參數直接傳入該渲染文件

* 這裏規定把所有要渲染的頁面統一存放到一個 views 目錄下

* 假設你想修改默認視圖文件存放目錄 則可通過 `app.set('views',目錄路徑)` 修改默認 views 目錄名稱

* 在 express 中 提供了 `res.render()` 方法 但這僅在安裝加載使用模板引擎時才有作用 平時無法使用該方法

* 這裏安裝了 `art-template` 但沒有加載是因為 `express-art-template` 依賴了 `art-template`

代碼如下：

```js

var express = require('express')
var app = express()

app.engine('html',require('express-art-template'))

app.get('/', function (req, res) {
    res.render('index.html')
})

```


### 9-4. express 做 readdir 案例（在 readdir-express 目錄）

先在目錄中安裝 `express` 和 `art-template` 和 `express-art-template`

然後引入 `fs` 核心模塊以及 `express` 第三方模塊

創建變量 `app = express()` 用 `app.engine()` 方法加載使用 `express-art-template`

然後將要渲染的檔案存放到新建的 `views` 目錄下 最後使用 `res.render()` 方法渲染 `html` 頁面

`res.render()` 參數1為渲染文件 參數2為模板內容中的替換對象

代碼如下：

```js

var express = require('express')
var fs = require('fs')
var app = express()

app.engine('html', require('express-art-template'))

app.get('/', function (req, res) {
  var dirUrl = '/Users/wangyaxuan/Desktop/school'
  fs.readdir(dirUrl, function (err, files) {
    if (err) {
      return res.render('404.html')
    }

    res.render('index.html', {
      files: files
    })
  })
})

```


### 9-5. express 做留言本案例（在 express-feedback 目錄）

首先通過 `require` 加載核心模塊 `fs` , 然後安裝並加載 `express` 第三方模塊

然後再安裝 `express-art-template` 第三方模塊,

創建變量 `app = express()` 通過 `app.engine()` 方法加載 `express-art-template` 第三方模塊

使用 `app.use()` 方法公開靜態資源, 創建函數 `read404()` 處理所有錯誤畫面

然後讀取 `json` 檔案渲染首頁, 再使用 `res.render()` 方法處理表單數據重定向回首頁

這裏方法幾乎同 9-4 ,唯一要注意的代碼是如何使用 `res.render()` 方法重定向回首頁

在 `res.render()` 方法中第三個參數可傳入 `callback` 回調函數

通過此回調函數我們使用 `res.redirect(302,'/')` 就可重定向回首頁了

* 另外補充：在 `express` 中處理了 `get` 的參數 所以不需要再引入核心模塊 `url`

* 可直接通過 `req.query` 獲取參數對象 不需要再用 `url` 慢慢轉換獲取

代碼如下：

```js

res.render('index.html', {
    comments: comments.comments
    },function(){
    res.redirect(302,'/')
})

```


### 9-6. express 做留言本案例 表單傳送用 post 方法（在 express-feedback-post 目錄）

前面關於 `express` 框架使用的都是 `GET` 請求,

這裏以留言本的發送表單數據為範例 說明 `POST` 請求的使用方式

前面所有過程同 9-5 相同 僅是把 `post.html` 檔案中的表單的提交路徑設為 `/post` 方法改成 `post` ,

然後到 `app.js` 文件中把 `app.get('/form')` 方法刪除 重新寫一個 `app.post('/post')` 方法

在 express 中沒有任何方法可快速獲取 post 請求體數據, 需要透過中間件去獲取 post 請求體數據

這個中間件的名稱叫 `body-parser` , 專門用來獲取 post 請求體數據的

使用方式為 安裝並加載第三方模塊 `body-parser` , 然後通過兩行代碼配置, 則在 `req` 中會多出一個 `body` 屬性 即為數據

這裏直接把原本 get 請求方法中的 `req.query` 改成 `req.body` 則完成案例

* 假設使用 post 請求 則可讓同一個路徑再次被使用

`body-parser` 配置代碼如下：

```js

app.use(bodyParser.json())

// 這裏如果是 flase ,鍵值對中的值就為'String'或'Array'形式
// 為true的時候 則可為任何資料型別
app.use(bodyParser.urlencoded({ extended: flase }))

```


### 9-7. express 增刪改查（在 express-crud 目錄）

先安裝 `express` `art-template` `express-art-template` `body-parser` 四個第三方模塊

然後創建 `app.js` 文件 加載 `express` `body-parser` 兩個模塊

配置 `body-parser` , 處理公開靜態資源 , 加載 `express-art-template` 模板引擎 , 創建服務器的端口號

然後新增一個 `db.json` 文件 用來放學生信息 , 再新增一個 `router.js` 文件放所有路由

在 `router.js` 文件中加載 express 模塊 , 創建變量 `router = express.Router()` 為路由容器

把原本的 `app.get()` 方法全部改成 `router.get()` 方法 最後用 `module.exports = router` 導出路由容器

回到 `app.js` 文件中 加載引入 `router.js` 文件 , 通過 `app.use(router)` 掛載路由到 app 服務器中

再來創建 `students.js` 文件 加載 `fs` 核心模塊 處理增刪改查學生信息數據文件

以上過程主要是把所有模塊的職責通通分清楚 ** 屬於 Node.js 的大重點 **

* a. `app.js` 負責創建服務器跟端口號、設置一些相關的配置(如 `body-parser` 靜態資源 模板引擎)

* b. `db.json` 負責用來放置學生信息的 json 數據

* c. `router.js` 負責放所有路由 專門處理請求響應事件

* d. `students.js` 負責處理 json 文件的增刪改查


### 9-8. ES6 中的 find 方法

此方法會遍歷所有對象並返回符合該條件的對象

以 `students.js` 文件的更新數據為例

代碼如下：

```js

// 獲取所有學生數據並轉為對象數組
var students = JSON.parse(data).students
// 把 id 轉為 number 類型
student.id = parseInt(student.id)

// 使用 find 方法
var stu = students.find(function(item){
    return item.id === student.id
})

// 使用 for...in 方法把 student 對象的屬性更新
for(var key in student){
    stu[key] = student[key]
}

```


### 9-9. ES6 中的 findIndex 方法

此方法會遍歷所有對象並返回符合該條件的對象的下標

以 `students.js` 文件中的刪除數據為例

代碼如下：

```js

// 獲取所有學生數據並轉為對象數組
var students = JSON.parse(data).students

// 把 id 轉為 number 類型
id = parseInt(id)

// 使用 findIndex 方法獲取下標
var stu = students.findIndex(function (item) {
    return item.id === id
})

// 使用 splice 方法刪除該下標
students.splice(stu,1)

```
