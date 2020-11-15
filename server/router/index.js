const fs = require('fs')
const express = require('express')
const jwt = require('jsonwebtoken')
const student = require('../student')
const router = express.Router()

// 登录
router.post('/login', (req, res) => {
  const { user, password } = req.body
  fs.readFile('./admin.json', (err, data) => {
    if (!err) {
      const result = JSON.parse(data)
      for (let item of result) {
        if (user === item.user && password === item.password) {
          res.status(200).json({
            code: 200,
            message: 'success',
            user: user,
            token: jwt.sign(
              {
                user,
                password
              },
              'student'
            )
          })
          return
        }
      }
      res.status(200).json({
        code: 200,
        message: '用户名或密码不正确'
      })
    }
  })
})

// 获取省份学院
router.get('/group', async (req, res) => {
  const students = await student.find({})
  const college = [...new Set(students.map(item => item.college))]
  const province = [...new Set(students.map(item => item.province))]
  res.status(200).json({
    code: 200,
    college,
    province
  })
})

// 图表数据
router.get('/students/statistics', async (req, res) => {
  const students = await student.find({})
  const collegeData = []
  const provinceData = []
  students.forEach(item => {
    const collegeIndex = collegeData.findIndex(v => v.name === item.college)
    const provinceIndex = provinceData.findIndex(v => v.name === item.province)
    if (collegeIndex !== -1) {
      collegeData[collegeIndex].value++
    } else {
      collegeData.push({
        name: item.college,
        value: 1
      })
    }
    if (provinceIndex !== -1) {
      provinceData[provinceIndex].value++
    } else {
      provinceData.push({
        name: item.province,
        value: 1
      })
    }
  })
  res.status(200).json({
    code: 200,
    collegeCount: collegeData.length,
    studentCount: students.length,
    collegeData,
    provinceData
  })
})

// 获取所有学生
router.get('/students', (req, res) => {
  const params = req.query
  const { pagenum, pagesize } = params
  student
    .find(params)
    .then(data => {
      res.status(200).json({
        code: 200,
        students: data.slice((pagenum - 1) * pagesize, pagenum * pagesize),
        total: data.length
      })
    })
    .catch(err => {
      res.status(500).json({ code: 500 })
    })
})

// 更新一名学生
router.post('/update', (req, res) => {
  const { id, data } = req.body
  student
    .findOneAndUpdate({ id }, data)
    .then(student => {
      res.status(200).json({
        code: 200,
        student
      })
    })
    .catch(err => {
      res.status(500).json({
        code: 500,
        err
      })
    })
})

// 删除一名学生
router.post('/delete', (req, res) => {
  const { id } = req.body
  student
    .deleteOne({ id })
    .then(() => {
      res.status(200).json({
        code: 200
      })
    })
    .catch(err => {
      res.status(500).json({
        code: 500,
        err
      })
    })
})

// 新建一名学生
router.post('/create', (req, res) => {
  const { data } = req.body
  student
    .saveOne(data)
    .then(() => {
      res.status(200).json({
        code: 200
      })
    })
    .catch(err => {
      res.status(500).json({
        code: 500,
        err
      })
    })
})

module.exports = router
