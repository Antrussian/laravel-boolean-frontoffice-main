<script>
import AppHeader from './components/AppHeader.vue'; 


export default {
  components: {
    AppHeader, // Shorthand for AppHeader: AppHeader

  }
}
</script>

<template>
  <div>
    <AppHeader />
    <router-view>

    </router-view>
 
  </div>
</template>

<style lang="scss">
@use './style/general.scss' as *;
</style>
