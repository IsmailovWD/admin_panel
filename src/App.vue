<script setup>
  import {useRoute , useRouter} from 'vue-router'
  import { useLoadingBar } from 'naive-ui'
  const route = useRoute()
  const router = useRouter()
  const loading = useLoadingBar()
  const TITLE = 'Admin Panel'
  router.beforeEach(()=>{
    loading.start()
  })
  router.afterEach(()=>{
    loading.finish()
    document.title = route.name + ' - Panel' || TITLE
  })
  router.onError(()=>{
    loading.error()
  })
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
