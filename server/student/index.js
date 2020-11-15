const fs = require('fs')
const uuid = require('node-uuid')
const dataPath = './studensData.json'

// 查找所有符合条件的
function find(filter) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(err)
      } else {
        const result = JSON.parse(data).filter(item => isSame(filter, item))
        resolve(result)
      }
    })
  })
}

function findOne(filter) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(err)
      } else {
        const result = JSON.parse(data)
        const index = result.findIndex(item => isSame(filter, item))
        if (index !== -1) {
          resolve(result[index])
        } else {
          reject('没有找到符合条件的学生')
        }
      }
    })
  })
}

// 新增一位
function saveOne(student) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, (err1, data1) => {
      if (err1) {
        reject(err1)
      } else {
        const result = JSON.parse(data1)
        const newStudent = { ...student, id: uuid.v1() }
        result.unshift(newStudent)
        fs.writeFile(dataPath, JSON.stringify(result), err2 => {
          if (err2) {
            reject(err2)
          } else {
            resolve(newStudent)
          }
        })
      }
    })
  })
}

// 删除符合条件的第一位
function deleteOne(filter) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, (err1, data) => {
      if (err1) {
        reject(err1)
      } else {
        const result = JSON.parse(data)
        const index = result.findIndex(item => isSame(filter, item))
        if (index === -1) {
          reject('没有找到符合条件的学生')
        } else {
          const student = result.splice(index, 1)
          fs.writeFile(dataPath, JSON.stringify(result), err2 => {
            if (err2) {
              reject(err2)
            } else {
              resolve(student)
            }
          })
        }
      }
    })
  })
}

// 修改一位
function findOneAndUpdate(filter, obj) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, (err1, data) => {
      if (err1) {
        reject(err1)
      } else {
        const result = JSON.parse(data)
        const index = result.findIndex(item => isSame(filter, item))
        if (index === -1) {
          reject('没有找到符合条件的学生')
        } else {
          const student = Object.assign(result[index], obj)
          fs.writeFile(dataPath, JSON.stringify(result), err2 => {
            if (err2) {
              reject(err2)
            } else {
              resolve(student)
            }
          })
        }
      }
    })
  })
}

function isSame(obj1, obj2) {
  for (let key in obj1) {
    if (obj2[key] && obj2[key] !== obj1[key]) {
      return false
    }
  }
  return true
}

module.exports = { find, findOne, saveOne, deleteOne, findOneAndUpdate }
