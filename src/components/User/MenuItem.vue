<template>
<div class="col-md-6 p-3">
  <transition name="zoom" duration="500" appear="">
    <el-card class="p-2">
      <div class="d-flex flex-center flex-column">
        <img src="//unsplash.it/300/200?random&gravity=center" class="img-fluid">
        <div class="d-flex py-2 justify-content-between w-100">
          <div class="card-text">
            <h1 class="h8 text-primary"> {{item.name}} </h1>
            <el-tooltip effect="dark" :content="item.description" placement="bottom">
                <span class="text-muted">{{ item.description | truncateLong}}</span>
            </el-tooltip>
          </div>
            <h1 class="h1 text-secondary">
              &#163; {{ item.price }}
            </h1>
        </div>

      </div>
    </el-card>
  </transition>

</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>
