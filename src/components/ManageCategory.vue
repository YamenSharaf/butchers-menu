<template>
  <div role="tablist" v-loading="loadingAction">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" v-b-toggle="`cat-${categoryData.id}`" class="p-3 text-capitalize cursor-pointer d-flex align-center justify-content-between" role="tab">
        <h3 class="h3 mb-0 text-primary px-3">
          <i class="fa fa-bars px-1" aria-hidden="true"></i>
          {{ categoryData.name }}
        </h3>
        <div class="text-muted">
          {{categoryData.date.toUTCString()}}
        </div>
      </b-card-header>
      <b-collapse :id="`cat-${categoryData.id}`" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div v-if="editMode" class="category-card__header d-flex justify-content-between align-items-center">
            <el-form
              inline
              ref="editCategoryForm"
              @keyup.enter.native.prevent="validateForm('editCategoryForm')"
              :model="editForm"
              :rules="rules">
                <el-form-item label="Name" prop="name">
                  <el-input v-model="editForm.name" placeholder="English name"></el-input>
                </el-form-item>
                <el-form-item label="Description" prop="description">
                  <el-input v-model="editForm.description" placeholder="English description"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click.native.prevent="validateForm('editCategoryForm')">Edit</el-button>
                  <el-button type="danger" @click="editMode = false">Cancel</el-button>
                </el-form-item>
            </el-form>
          </div>
          <div v-else class="category-card__header d-flex justify-content-between align-items-center">
            <p class="card-text text-muted mb-0">
              {{ categoryData.description }}
            </p>
            <div class="category-card__actions">
              <el-button @click="initEditMode">
                Edit
              </el-button>
              <el-button @click="handleCategoryDelete(categoryData.id)">
                Delete
              </el-button>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import formActions from 'Mixins/formActions'

export default {
  mixins: [formActions],
  data () {
    return {
      loadingAction: false,
      editMode: false,
      editForm: {
        name: ``,
        description: ``,
        date: Date.now()
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
      this.loadingAction = true
      this.$store.dispatch('editCategory', {
        id: this.categoryData.id,
        form: this.editForm
      })
        .then(res => {
          this.$message.success(`Edited successfully`)
        })
        .catch(err => {
          this.$message.error(`Error updating category: ${err} `)
        })
        .finally(() => {
          this.loadingAction = false
          this.editMode = false
        })
    },
    initEditMode () {
      this.editMode = true
      this.editForm = this.categoryData
    },
    handleCategoryDelete (id) {
      this.$confirm(`Are you sure you want to delete this category (This will delete all items inside)`, `Delete category (${this.categoryData.name})`, {
        type: `error`,
        confirmButtonText: `Delete`
      })
        .then(() => {
          this.loadingAction = true
          this.$store.dispatch('deleteCategory', id)
            .then(res => {
              this.$message.success(`Category deleted successfully`)
            })
            .catch(err => {
              this.$message.error(`Error: ${err} `)
            })
            .finally(() => {
              this.loadingAction = false
            })
        })
        .catch(() => {
          return undefined
        })
    }
  },
  props: {
    categoryData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
