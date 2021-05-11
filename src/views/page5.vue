<template>
  <div>
    <b-navbar fixed="top" class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent></a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <b-button v-b-toggle.sidebar-variant>
            <font-awesome-icon icon="bars"
          /></b-button>
        </li>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.FullName }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </b-navbar>
    <b-sidebar
      id="sidebar-variant"
      title="VIERP"
      bg-variant="dark"
      text-variant="light"
      shadow
      width="280px"
    >
      <div class="px-3 py-2">
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item><router-link to="/management/home">Home</router-link></b-nav-item>
            <b-nav-item><router-link to="/management/allprojects">All Projects</router-link></b-nav-item>
            <b-nav-item><router-link to="/management/addcompany">Add Company</router-link></b-nav-item>
           <!--  <b-nav-item
              ><router-link to="/management/allstudnet"
                >All Student</router-link
              ></b-nav-item
            > -->
          </b-nav>
        </nav>
      </div>
    </b-sidebar>

    <div class="box3">
      <v-card>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: "home",
    activeSidebar: false,
  }),
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    showStudentBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_STUDENT");
      }
      return false;
    },
    showGuideBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_GUIDE");
      }
      return false;
    },
    showHodBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_HOD");
      }
      return false;
    },
    showDirectorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_DIRECTOR");
      }
      return false;
    },
    showManagementBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MANAGEMENT");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.box3 {
  margin-top: 40px;
}
.vs-sidebar {
  border-right: 2px solid lightsteelblue;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
#app {
  background-color: lightsteelblue;
  height: 105%;
}
</style>
