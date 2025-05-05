<template>
  <div>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <router-link to="/dashboard" class="brand-link">
        <img src="/admin/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">Admin</span>
      </router-link>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item menu-open">
              <router-link to="/dashboard" class="nav-link active">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                </p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/task" class="nav-link">
                <i class="nav-icon fas fa-th"></i>
                <p>
                  Task
                </p>
              </router-link>
            </li>

            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent="adminLogout">
                <i class="nav-icon fas fa-th"></i>
                <p>
                  Logout
                </p>
              </a>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  methods:{
    adminLogout(){
      this.$store.dispatch("LOGOUT")
          .then((res) => {
            console.log(res.data)
            this.$router.push({ path: '/' });
          }).catch(() => {

      });
    }
  }
}
</script>
<style scoped>

</style>