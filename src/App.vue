<template>
  <div class="position-relative page-wrapper h-100">
    <header-view/>
    <router-view/>
    <footer-view/>
  </div>
</template>

<script>
import HeaderView from 'partials/HeaderView'
import FooterView from 'partials/FooterView'

export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView
  },
  methods: {
    syncUserStatus () {
      this.$store.dispatch('monitorUserStatus')
    },
    syncMenu () {
      this.$store.dispatch('monitorCategories')
    }
  },
  mounted () {
    this.syncUserStatus()
    this.syncMenu()
  }
}
</script>

<style>

</style>
