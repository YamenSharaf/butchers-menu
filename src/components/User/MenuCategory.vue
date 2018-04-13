<template>
  <div
    @click="updateSelected(category.id)"
    :class="{ 'user-category--selected': category.id === selectedCategory }"
    class="user-category d-flex justify-content-between align-items-center p-2">
    <img class="img-fluid" width="100" height="100" src="http://unsplash.it/100/100?random&gravity=center" alt="">
    <div class="category-details mx-auto d-flex flex-column justify-content-between text-center px-2">
      <div class="h3 user-category__name">
        {{category.name}}
      </div>
      <div class="user-category__description">
        {{category.description}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // selectedCategory: ''
    }
  },
  computed: {
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
    updateSelected (id) {
      this.selectedCategory = id
      this.$emit('categorySelected', id)
    }
  },
  props: {
    category: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~vars';
  .user-category {
    color: $color-primary;
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
</style>
