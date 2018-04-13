<template>
  <div class="row border-primary border-bottom pb-3 mb-5">
    <div class="col-md-4">
      <div class="d-flex flex-center text-center bg-primary text-white p-4 h5">
        Categories
      </div>
      <div class="category-section nice-scrollbar">
        <menu-category ref="menuCategory" v-for="category in menu" :key="category.id" :category="category" />
      </div>
    </div>
    <div class="col-md-8">
      <div class="d-flex flex-center text-center bg-primary text-white p-4 h5">
        Items
      </div>
      <div class="category-section nice-scrollbar row no-gutters">
        <menu-item v-for="item in selectedCategoryItems" :key="item.id" :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/bus'
import MenuCategory from './MenuCategory'
import MenuItem from './MenuItem'

export default {
  components: {
    'menu-category': MenuCategory,
    'menu-item': MenuItem
  },
  computed: {
    menu () {
      return this.$store.getters.getCategories
    },
    selectedCategory: {
      get () {
        return this.$store.getters.getSelectedCategory
      },
      set (selectedId) {
        this.$store.commit('SET_SELECTED_CATEGORY', selectedId)
      }
    },
    selectedCategoryItems () {
      return this.menu.filter(category => category.id === this.selectedCategory)[0].items
    }
  },
  mounted () {
    bus.$on('synced categories', () => {
      this.selectedCategory = this.menu[0].id
    })
  }
}
</script>

<style lang="scss" scoped>
.category-section {
  min-height: 80vh;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
