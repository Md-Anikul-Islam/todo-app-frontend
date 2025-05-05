<template>
  <div class="wrapper">
    <!-- Navbar -->
    <NavBar v-if="loggedInStatus"></NavBar>
    <!-- Main Sidebar -->
    <SideBar v-if="loggedInStatus"></SideBar>

    <!-- Content page -->
    <router-view></router-view>




  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
export default {
  name: 'App',
  components: {
    SideBar,
    NavBar
  },
  computed:{
    loggedInStatus(){
      return this.$store.getters.GET_AUTH_STATUS;
    }
  }
}
</script>

