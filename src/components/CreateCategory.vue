<template>
  <el-card v-loading="loading" class="mt-4">
    <div slot="header" class="clearfix">
      <span class="h2 text-secondary">Add Category</span>
    </div>
    <el-form
      ref="addCategoryForm"
      @keyup.enter.native.prevent="validateForm('addCategoryForm')"
      :model="form"
      :rules="rules">
      <div class="row">
        <div class="col-4">
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" placeholder="English name"></el-input>
          </el-form-item>
        </div>
        <div class="col-6">
          <el-form-item class="w-100" label="Description" prop="description">
            <el-input v-model="form.description" placeholder="English description"></el-input>
          </el-form-item>
        </div>
        <div class="col-2 d-flex justify-content-center align-items-end">
          <el-form-item>
            <el-button type="primary" @click.native.prevent="validateForm('addCategoryForm')">Create Category</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import formActions from 'Mixins/formActions'
export default {
  mixins: [formActions],
  data () {
    return {
      loading: false,
      form: {
        name: ``,
        description: ``
      },
      rules: {
        name: [
          { required: true, message: 'Please category name', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Please category description', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.loading = true
      this.$store.dispatch('addCategory', this.form)
        .then(res => {
          this.$message.success(`Done! ${res}`)
        })
        .catch(err => {
          this.$message.error(`Error: ${err} `)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
