<template>
  <!-- ADD ITEM FORM -->
  <div class="manage-item">
    <!-- <div class="d-flex bg-info text-white px-4 py-2">
      <h5 class="h5">
        Add Item
      </h5>
    </div> -->
    <el-form
      ref="addItemForm"
      @keyup.enter.native.prevent="$refs.addItemForm.validate( v =>  v ? handleItemAdd() : undefined)"
      :model="addItemForm"
      :rules="addItemRules">
      <div class="row">
        <div class="col-sm-3">
          <el-form-item label="Name" prop="name">
            <el-input v-model="addItemForm.name" placeholder="English name"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-5">
          <el-form-item class="pb-0 mb-0" label="Description" prop="description">
            <el-input v-model="addItemForm.description" placeholder="English description"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-2">
          <el-form-item label="Price (EGP)" prop="price">
            <el-input-number v-model="addItemForm.price" :min="1"></el-input-number>
          </el-form-item>
        </div>
        <div class="col-sm-2 d-flex justify-content-end align-items-end">
          <el-form-item>
            <el-button type="primary" @click.native.prevent="$refs.addItemForm.validate( v =>  v ? handleItemAdd() : undefined)">Add Item</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addItemForm: {
        name: ``,
        description: ``,
        price: 0
      },
      addItemRules: {
        name: [
          { required: true, message: 'Please enter item name', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Please enter item description', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'Please enter item price', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleItemAdd () {
      this.$parent.loadingAction = true
      let categoryData = this.categoryData
      let itemData = this.addItemForm
      this.$store.dispatch('addItemInCategory', {
        categoryData,
        itemData
      })
        .then(res => {
          this.$message.success(`Added item successfully`)
          // this.$refs.addItemForm.resetFields()
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
    categoryData: {
      type: Object
    }
  }
}
</script>
