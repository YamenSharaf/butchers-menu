<template>
  <footer class="footer">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-5 text-info">
         {{currentYear}} All rights reserved to somebody I guess
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear () {
      let date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
</style>
