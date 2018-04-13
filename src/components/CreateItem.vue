<template>
  <!-- ADD ITEM FORM -->
  <el-form
    inline
    ref="addItemForm"
    @keyup.enter.native.prevent="$refs.addItemForm.validate( v =>  v ? handleItemAdd(categoryId) : undefined)"
    :model="addItemForm"
    :rules="addItemRules">
      <el-form-item label="Name" prop="name">
        <el-input v-model="addItemForm.name" placeholder="English name"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="addItemForm.description" placeholder="English description"></el-input>
      </el-form-item>
      <el-form-item label="Price" prop="description">
        <el-input v-model="addItemForm.price" placeholder="English description"></el-input>
      </el-form-item>
      <el-form-item label="Image URL" prop="description">
        <el-input v-model="addItemForm.imageUrl" placeholder="English description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="$refs.addItemForm.validate( v =>  v ? handleItemAdd(categoryData.id) : undefined)">Add Item</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      addItemForm: {
        name: ``,
        description: ``,
        price: 0,
        imageUrl: ``,
        date: new Date()
      },
      addItemRules: {
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
    handleItemAdd (categoryId) {
      this.$parent.loadingAction = true
      this.$store.dispatch('addItemInCategory', {
        categoryId,
        itemData: this.addItemForm
      })
        .then(res => {
          this.$message.success(`Added item successfully`)
          this.$refs.addItemForm.resetFields()
        })
        .catch(err => {
          this.$message.error(`Error: ${err} `)
        })
        .finally(() => {
          this.$parent.loadingAction = false
        })
    }
  },
  props: {
    categoryId: {
      type: String
    }
  }
}
</script>
