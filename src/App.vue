<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    syncUserStatus () {
      this.$store.dispatch('monitorUserStatus')
    }
  },
  mounted () {
    this.syncUserStatus()
  }
}
</script>

<style>

</style>
