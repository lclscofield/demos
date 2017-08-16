var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 80;

var server = http.createServer(function (request, response) {

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看
  if (path === '/') { // 如果用户请求的是 / 路径
    var string = fs.readFileSync('./index.html', 'utf8')
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end(string)
  } else if (path === '/qq') {
    var string = fs.readFileSync('./qq.html', 'utf8')
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end(string)
  }
  //jsonp
  else if (path === '/xxx.js') {
    var callback = query.callback
    var string = fs.readFileSync('./xxx.js', 'utf8')
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    setTimeout(function () {
      response.end(string.replace('{{callback}}', callback)) // 用 callback 值替代占位符
    }, Math.random() * 1000)
  }
  //
  else if (path === '/lcl') {
    var string = fs.readFileSync('lcl.html', 'utf8')
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end(string)
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end('找不到对应的路径，你需要自行修改 index.js')
  }

  // 代码结束，下面不要看
  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请打开 http://localhost:' + port)