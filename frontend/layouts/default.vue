<template>
  <div>
    <nav-bar />
    <div class="w3-main" style="margin-top: 70px">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: { NavBar, Sidebar },
}
</script>
<style>
.w3-sidebar a {
  font-family: 'Roboto', sans-serif;
}
body,
h1,
h2,
h3,
h4,
h5,
h6,
.w3-wide {
  font-family: 'Montserrat', sans-serif;
}
</style>