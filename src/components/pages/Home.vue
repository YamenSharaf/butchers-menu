<template>
  <div class="home-page">
    <div class="page-wrapper position-relative">
      <div class="page-wrapper skewed-bg w-100 h-100 position-absolute"></div>
        <div class="container-fluid text-white h-100 page-wrapper">
          <div class="row page-wrapper justify-center">
            <div class="d-none d-md-block col-md-7 col-lg-8 page-wrapper">
              <div class="row pt-5 h-100 flex-row justify-content-around align-center">
                <div class="col-12 p-5">
                  <h1 class="pl-5 display-1 text-bold text-uppercase">
                    <i class="fa fa-cutlery text-primary" aria-hidden="true"></i>
                    Butcher's Burger
                  </h1>
                </div>
              </div>
            </div>
            <div class="d-none d-md-block col-md-5 col-lg-4 position-relative">
              <h1 class="display-4 position-absolute animated-text text-center">
                Check out our menu
                <span class="d-block">
                  <i class="fa fa-arrow-down" aria-hidden="true"></i>
                </span>
              </h1>
            </div>
            <div class="col-11 col-md-5 col-lg-4">
              <div class="d-md-none row pt-5 flex-row justify-content-around align-center">
                <div class="col-12 p-5">
                  <div class="pl-5 display-4 text-bold text-uppercase">
                    <i class="fa fa-cutlery text-primary" aria-hidden="true"></i>
                    Butcher's Burger
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="container mb-5 py-5">
      <div class="row my-5">
        <div class="col-12 mt-5">
          <h2 class="display-2 text-center text-primary">
            The menu
          </h2>
        </div>
      </div>
      <the-menu/>
    </div>
  </div>
</template>

<script>
import TheMenu from 'components/user/TheMenu'
export default {
  components: {
    'the-menu': TheMenu
  }
}
</script>
<style scoped lang="scss">
@import '~vars';

.home-page {
  .skewed-bg {
    background-color: $color-secondary;
    color: $color-primary;
    clip-path: polygon(100% 0, 100% 73%, 24% 100%, 0 100%, 0 0);
    @include media-breakpoint-down(md) {
      clip-path: polygon(100% 0, 100% 73%, 24% 100%, 0 100%, 0 0);
    }
  }
  .animated-text {
    animation: fadeInDown;
    animation-fill-mode: both;
    animation-duration: 3s;
    top: 30%;
  }
}

@keyframes fadeInDown {
  0% {
      opacity: 1;
      transform: translateY(0);
  }
  25% {
      opacity: 0.5;
  }
  50% {
      opacity: 1;
      transform: translateY(-30px);
  }
  75% {
      opacity: 0.5;
  }
  100% {
      opacity: 0;
      transform: translateY(150px);
  }
}
</style>
