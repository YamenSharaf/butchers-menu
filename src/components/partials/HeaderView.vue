<template>
  <b-navbar toggleable="md" variant="secondary" type="dark" class="main-navbar p-4">
    <b-container>
      <b-navbar-brand
      v-if="$route.name !== 'Home'"
        :to="{ name: 'Home' }"
        class="h1 text-white mb-0">
        Home
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto d-inline-flex flex-center">
          <b-nav-item-dropdown v-if="userStatus.loggedIn" :text="userStatus.email.split('@')[0]" right>
            <b-dropdown-item :to="{ name: 'Dashboard' }"> Dashboard </b-dropdown-item>
            <b-dropdown-item @click="handleLogOut"> Log out </b-dropdown-item>
          </b-nav-item-dropdown>
          <el-button @click="$router.push({ name: 'Login' })" v-if="!userStatus.loggedIn" type="primary">
            Login
          </el-button>

        </b-navbar-nav>
      </b-collapse>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      lang: 'en'
    }
  },
  computed: {
    userStatus () {
      return this.$store.getters.getUserStatus
    }
  },
  methods: {
    handleLogOut () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
    }
  },
  mounted () {
    console.log('route', this.$route)
  }
}
</script>

<style lang="scss">

@import '~vars';

.router-link-active, .active {
  color: $color-primary !important;
}

#nav_collapse {
  display: inline-grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-navbar {
  .dropdown-menu {
    .active {
      color: $color-white !important;
    }

  }
  .el-radio-group {
    label {
      margin-bottom: 0;
    }
  }
}

</style>
