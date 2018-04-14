<template>
  <el-card v-loading="loadingCategories" class="mt-4">
    <div slot="header" class="clearfix">
      <span class="h2 text-secondary">
        <i class="fa fa-sliders mr-2" aria-hidden="true"></i>
        Manage categories
      </span>
    </div>
    <manage-category v-for="category in categories" :key="category.id" :category-data="category"/>
  </el-card>
</template>

<script>
import bus from '@/bus'
import ManageCategory from './ManageCategory'
export default {
  components: {
    'manage-category': ManageCategory
  },
  data () {
    return {
      loadingCategories: false
    }
  },
  computed: {
    categories () {
      return this.$store.getters.getCategories
    }
  },
  methods: {
    syncCategories () {
      this.$store.dispatch('monitorCategories')
    }
  },
  mounted () {
    this.loadingCategories = true
    this.syncCategories()
    bus.$on('synced categories', () => {
      this.loadingCategories = false
    })
  }
}
</script>
