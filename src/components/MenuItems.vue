<template>
  <div>
    <el-collapse-item name="1">
      <template slot="title">
        <div class="h5 text-primary mt-1">
          <i class="fa fa-cutlery mr-2 text-secondary" aria-hidden="true"></i>
          {{itemData.name}}
        </div>
      </template>
      <!-- Edit form -->
      <el-form
      ref="editItemForm"
      @keyup.enter.native.prevent="$refs.editItemForm.validate( v =>  v ? handleItemEdit() : undefined)"
      :model="editItemForm"
      :rules="editItemRules">
      <div class="row">
        <div class="col-sm-3">
          <el-form-item label="Name" prop="name">
            <el-input v-model="editItemForm.name" placeholder="English name"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-4">
          <el-form-item class="pb-0 mb-0" label="Description" prop="description">
            <el-input v-model="editItemForm.description" placeholder="English description"></el-input>
          </el-form-item>
        </div>
        <div class="col-sm-2">
          <el-form-item label="Price (EGP)" prop="price">
            <el-input-number v-model="editItemForm.price" :min="1"></el-input-number>
          </el-form-item>
        </div>
        <div class="col-sm-2 d-flex justify-content-center align-items-end">
          <el-form-item>
            <el-button type="primary" @click.native.prevent="$refs.editItemForm.validate( v =>  v ? handleItemEdit() : undefined)">Update</el-button>
          </el-form-item>
        </div>
        <div class="col-sm-1 d-flex justify-content-center align-items-end">
          <el-form-item>
            <el-button type="danger" @click.native.prevent="handleItemDelete()" icon="el-icon-delete" circle></el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    </el-collapse-item>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editItemForm: {
        id: ``,
        name: ``,
        description: ``,
        price: 0
      },
      editItemRules: {
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
    handleItemEdit () {
      this.$emit('edited', this.editItemForm)
    },
    handleItemDelete () {
      this.$confirm(`Are you sure you want to delete this item?`, `Delete item?`, {
        confirmButtonText: 'Delete'
      })
        .then(res => {
          this.$emit('deleted', this.editItemForm.id)
        })
    }
  },
  props: {
    itemData: {
      type: Object
    }
  },
  mounted () {
    this.editItemForm = this.itemData
  }
}
</script>
