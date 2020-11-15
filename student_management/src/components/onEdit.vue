<template>
  <el-form :model="editData" ref="editData" :rules="rules" label-width="100px" class="on-edit">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="editData.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="editData.gender" size="medium">
        <el-radio border :label="1">男</el-radio>
        <el-radio border :label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="生日" prop="brith">
        <el-date-picker class="input-date" value-format="yyyy" v-model="editData.brith" type="year" placeholder="选择年"> </el-date-picker>
      </el-form-item>
    <el-form-item label="籍贯" prop="province">
      <el-select v-model="editData.province" placeholder="籍贯">
        <el-option v-for="item in $store.state.province" :key="item" :label="item" :value="item"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="学院" prop="college">
      <el-select v-model="editData.college" placeholder="学院">
        <el-option v-for="item in $store.state.college" :key="item" :label="item" :value="item"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="爱好">
      <el-tag
        :key="tag"
        v-for="(tag, index) in editData.hobbys"
        closable
        :disable-transitions="false"
        @close="handleClose(index)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
    </el-form-item>
    <el-form-item>
      <el-button size="small" @click="closeDrawer">取消</el-button>
      <el-button size="small" @click="saveData('editData')" type="primary">保存</el-button>
      <el-button size="small" @click="reset" type="danger">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    onEdit: {
      type: Object
    }
  },
  data() {
    return {
      editData: JSON.parse(JSON.stringify(this.onEdit)),
      inputVisible: false,
      inputValue: '',
      rules: {
        name: {
          required: true,
          message: '姓名不能为空',
          trigger: 'change'
        },
        gender: {
          required: true,
          message: '请选择性别',
          trigger: 'change'
        },
        brith: {
          required: true,
          message: '请选择生日',
          trigger: 'change'
        },
        province: {
          required: true,
          message: '请选择籍贯',
          trigger: 'change'
        },
        college: {
          required: true,
          message: '请选择学院',
          trigger: 'change'
        }
      }
    }
  },
  methods: {
    closeDrawer() {
      this.$emit('closeDrawer')
    },
    saveData() {
      this.$refs.editData.validate(valid => {
        if (valid) {
          this.$emit('saveData', this.editData)
        }
      })
    },
    handleClose(idx) {
      this.editData.hobbys.splice(idx, 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.editData.hobbys.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    reset() {
      this.editData = { hobbys: [] }
    }
  },
  watch: {
    onEdit() {
      this.editData = JSON.parse(JSON.stringify(this.onEdit))
    }
  }
}
</script>

<style>
.on-edit .el-form-item {
  width: 320px;
}

.on-edit .el-tag {
  margin-right: 10px;
}
</style>
