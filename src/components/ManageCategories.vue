<template>
  <el-card v-loading="loadingCategories" class="mt-4">
    <div slot="header" class="clearfix">
      <span class="h2 text-secondary">Manage categories</span>
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
    fetchCategories () {
      console.log('will fetchCategories')
      this.$store.dispatch('fetchCategories')
        .then(res => {
          console.log(`Fetched categories`, res)
        })
        .catch(err => {
          console.log(`Error fetching categories`, err)
        })
    },
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
