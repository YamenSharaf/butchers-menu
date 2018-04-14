<template>
  <div role="tablist" v-loading="loadingAction">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" v-b-toggle="`cat-${categoryData.id}`" class="p-3 text-capitalize cursor-pointer d-flex align-center justify-content-between" role="tab">
        <h3 class="h3 mb-0 text-primary px-3">
          <i class="fa fa-bars px-1" aria-hidden="true"></i>
          {{ categoryData.name }}
        </h3>
        <div class="text-muted">
          Date created: {{categoryData.date.toUTCString()}}
        </div>
      </b-card-header>
      <b-collapse :id="`cat-${categoryData.id}`" visible accordion="my-accordion" role="tabpanel">
        <!-- VIEW CATEGORY INFO / EDIT CATEGORY -->
        <b-alert show variant="success">
          <div v-if="editMode" class="category-card__header d-flex justify-content-between align-items-center">
            <el-form
              inline
              ref="editCategoryForm"
              @keyup.enter.native.prevent="$refs.editCategoryForm.validate( v =>  v ? handleCategoryEdit() : undefined)"
              :model="editForm"
              :rules="editFormRules">
                <el-form-item label="Name" prop="name">
                  <el-input v-model="editForm.name" placeholder="English name"></el-input>
                </el-form-item>
                <el-form-item label="Description" prop="description">
                  <el-input v-model="editForm.description" placeholder="English description"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button icon="el-icon-edit" type="primary" @click.native.prevent="$refs.editCategoryForm.validate( v =>  v ? handleCategoryEdit() : undefined)">Edit</el-button>
                  <el-button type="danger" @click="editMode = false">Cancel</el-button>
                </el-form-item>
            </el-form>
          </div>
          <div v-else class="category-card__header d-flex justify-content-between align-items-center">
            <p class="card-text text-muted mb-0">
              <strong class="text-primary">Description:</strong> {{ categoryData.description }}
            </p>
            <div class="category-card__actions">
              <el-button icon="el-icon-edit" @click="initEditMode">
                Edit
              </el-button>
              <el-button icon="el-icon-delete" @click="handleCategoryDelete(categoryData.id)">
                Delete
              </el-button>
            </div>
          </div>
        </b-alert>
        <b-card-body>

          <!-- ADD ITEM FORM -->
          <create-item :category-data="categoryData" />

          <!-- Existing Items -->
          <el-collapse>
            <menu-items @deleted="handleItemDelete($event)" @edited="handleItemEdit($event)" v-for="item in categoryData.items" :key="item.id" :item-data="item" />
          </el-collapse>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import CreateItem from './CreateItem'
import MenuItems from './MenuItems'

export default {
  components: {
    'create-item': CreateItem,
    'menu-items': MenuItems
  },
  data () {
    return {
      loadingAction: false,
      editMode: false,
      items: [],
      editForm: {
        name: ``,
        description: ``,
        date: new Date()
      },
      editFormRules: {
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
    initEditMode () {
      this.editMode = true
      this.editForm = this.categoryData
    },
    handleCategoryEdit () {
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
    handleCategoryDelete (id) {
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
    },
    handleItemEdit (formData) {
      this.loadingAction = true
      this.$store.dispatch('updateItemInCategory', {
        categoryData: this.categoryData,
        itemData: formData
      })
        .then(res => {
          this.loadingAction = false
          this.$message.success(`Item edited successfully!`)
        })
    },
    handleItemDelete (itemId) {
      console.log('called', itemId)
      this.$store.dispatch('deleteItemInCategory', {
        categoryData: this.categoryData,
        itemId: itemId
      })
        .then(res => {
          this.$message.success(`Item deleted!`)
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
