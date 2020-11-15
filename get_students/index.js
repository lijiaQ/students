const fs = require('fs')
const uuid = require('node-uuid')
const { data, myRandom } = require('./data')

const students = []
for (let i = 0; i < 5396; i++) {
  const id = uuid.v1()
  const firstName = data.firstName.arr[myRandom(0, data.firstName.len - 1)]
  const province = data.province.arr[myRandom(0, data.province.len - 1)]
  const college = data.college.arr[myRandom(0, data.college.len - 1)]
  const brith = data.birth.arr[myRandom(0, data.birth.len - 1)]
  const gender = myRandom(0, 1)
  const hobbys = []
  const hobbyCount = myRandom(1, 4)
  let lastName
  if (gender) {
    lastName = data.boyName.arr[myRandom(0, data.boyName.len - 1)]
  } else {
    lastName = data.girlName.arr[myRandom(0, data.girlName.len - 1)]
  }
  const name = firstName + lastName
  for (let j = 0; j < hobbyCount; j++) {
    const hobby = data.hobby.arr[myRandom(0, data.hobby.len - 1)]
    hobbys.push(hobby)
  }
  students.push({ id, name, gender, province, college, brith, hobbys })
}

fs.writeFile('../studensData.json', JSON.stringify(students), err => {
  if (!err) {
    console.log('写入成功')
  } else {
    console.log(err)
  }
})
