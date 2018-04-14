<template>
  <div v-loading="loadingMenu" class="row border-primary border-bottom pb-3 mb-5 the-menu">
    <div class="col-md-4">
      <div class="d-flex flex-center text-center bg-primary text-white p-4 h5">
        Categories
      </div>
      <div class="category-section nice-scrollbar">
        <div
          v-for="category in menu"
          :key=category.id
          v-loading="loadingMenu"
          @click="updateSelected(category.id, category.items)"
          :class="{ 'user-category--selected': category.id === selectedCategory }"
          class="user-category d-flex justify-content-between align-items-center p-2">
          <img class="img-fluid" width="100" height="100" src="//unsplash.it/100/100?random&gravity=center" alt="">
          <div class="category-details mx-auto d-flex flex-column justify-content-between text-center px-2">
            <div class="h3 user-category__name">
              {{category.name}}
            </div>
            <div class="user-category__description">
              {{category.description}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="d-flex flex-center text-center bg-primary text-white p-4 h5">
        Items
      </div>
      <div class="category-section nice-scrollbar row no-gutters">
        <div
          class="d-flex flex-center w-100 animated-text display-4 text-center text-secondary"
          v-if="!selectedCategoryItems" >
          <i class="fa fa-caret-left mr-3" aria-hidden="true"></i>
          Select category
        </div>
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
  data () {
    return {
      loadingMenu: false,
      selectedCategoryItems: []
    }
  },
  computed: {
    menu () {
      return this.$store.getters.getCategories.filter(cat => cat.items.length > 0)
    },
    selectedCategory: {
      get () {
        return this.$store.getters.getSelectedCategory
      },
      set (selectedId) {
        this.$store.commit('SET_SELECTED_CATEGORY', selectedId)
      }
    }
  },
  methods: {
    updateSelected (id, items) {
      this.selectedCategory = id
      this.selectedCategoryItems = items
    },
    syncCategories () {
      this.$store.dispatch('monitorCategories')
    }
  },
  mounted () {
    this.loadingMenu = true
    this.syncCategories()
    bus.$on('synced categories', () => {
      this.loadingMenu = false
      this.updateSelected()
    })
  }
}
</script>

<style lang="scss">
@import '~vars';

  .the-menu {
    min-height: 80vh;
  }
  .user-category {
    transition: all 0.3s ease-in-out;
    color: $color-primary;
    min-height: 116px;
    &:hover {
      cursor: pointer;
      background-color: lighten($color-primary, 20%);
      color: $color-white;
    }
    &--selected {
      background-color: lighten($color-primary, 20%);
      color: $color-white;
    }

  }
.category-section {
  min-height: 80vh;
  max-height: 80vh;
  overflow-y: auto;
}

  .animated-text {
    animation: swingToLeft;
    animation-fill-mode: both;
    animation-duration: 2.2s;
    animation-iteration-count: infinite;
    top: 30%;
  }

  @keyframes swingToLeft {
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(-30px);
    }
    100% {
        transform: translateX(0);
    }

  }
</style>
