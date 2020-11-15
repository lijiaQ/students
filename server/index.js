const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 允许跨域
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Requested-With,Authorization')
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options') {
    res.send(200)
  } else {
    next()
  }
})

app.use(router)

app.listen(4004, function () {
  console.log('running 4004...')
})
