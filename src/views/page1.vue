<template>
  <div id="app">
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
          <router-link to="/profile" class="nav-link">
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
      width="260px"
    >
      <div class="px-3 py-2">
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item><router-link to="/student/home">Home</router-link></b-nav-item>
            <b-nav-item
              ><router-link to="/student/alltask">All Tasks</router-link></b-nav-item
            >
            <b-nav-item
              ><router-link :to="{ name: 'Project Details', params: { id: groupid } }"
                >Project Details</router-link
              ></b-nav-item
            >
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
import axios from "axios";
export default {
  data: () => ({
    groupid: "",
    active: "home",
    activeSidebar: false,
  }),
  mounted() {
    this.loggedin();
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    showStudentBoard() {
      if (this.currentUser && this.currentUser.roles) {
        if (this.currentUser.roles === "ROLE_LEADER") {
          return this.currentUser.roles.includes("ROLE_LEADER");
        } else if (this.currentUser.roles === "ROLE_MEMBER") {
          return this.currentUser.roles.includes("ROLE_MEMBER");
        }
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
    loggedin() {
      this.getform(this.currentUser.Person_Id);
      if (
        this.currentUser.roles == "ROLE_HOD" ||
        this.currentUser.roles == "ROLE_GUIDE" ||
        this.currentUser.roles == "ROLE_MANAGEMENT" ||
        this.currentUser.roles == "ROLE_DIRECTOR"
      ) {
        this.logOut();
      }
    },
    getform(gi) {
      axios.get(`http://localhost:8080/api/getstartdate/${gi}`).then(
        (result) => {
          console.log(result.data);
          var tod = result.data;
          this.groupid = tod[0].Group_id;
          if (!tod[0].startDate) {
            if (this.currentUser.roles == "ROLE_MEMBER") {
              this.$router.push("/startingmember");
            } else if (this.currentUser.roles == "ROLE_LEADER") {
              this.$router.push("/starting");
            }
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
};
</script>

<style>
.vs-sidebar {
  border-right: 2px solid lightsteelblue;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
