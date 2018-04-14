<template>
  <div class="dashboard-page page-wrapper bg-gray py-5">
    <div class="container pb-5">
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
import store from '@/store'
import CreateCategory from 'components/admin/CreateCategory'
import ManageCategories from 'components/admin/ManageCategories'

export default {
  components: {
    'create-category': CreateCategory,
    'manage-categories': ManageCategories
  },
  data () {
    return {
      msg: `Dashboard`
    }
  },
  beforeRouteEnter (to, from, next) {
    if (store.state.userStatus.loggedIn) {
      next()
    } else {
      next('/')
    }
  }
}
</script>
