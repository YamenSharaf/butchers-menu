<template>
  <div class="dashboard-page page-wrapper bg-gray py-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-secondary text-center">
            <i class="fa fa-sliders text-primary" aria-hidden="true"></i>
            Dashboard
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <create-category/>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <manage-categories/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateCategory from 'components/CreateCategory'
import ManageCategories from 'components/ManageCategories'

export default {
  components: {
    'create-category': CreateCategory,
    'manage-categories': ManageCategories
  },
  data () {
    return {
      msg: `Dashboard`
    }
  }
}
</script>
