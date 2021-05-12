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
          <router-link to="/guideprofile" class="nav-link">
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
            <b-nav-item
              ><router-link
                :to="{
                  name: 'Guide Home',
                }"
                >Home</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link
                :to="{
                  name: 'Guide allTask',
                  params: { id: gi },
                }"
                >All Tasks</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link
                :to="{
                  name: 'Guide Project Details',
                  params: { id: gi },
                }"
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
    gi: "",
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
  mounted() {
    this.loggedin();
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      this.getperson();
      if (this.currentUser.roles != "ROLE_GUIDE") {
        this.logOut();
      }
    },
    getform(gi) {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/groups/${gi}`).then(
        (result) => {
          console.log(result.data);
          var group = result.data;
          this.todos = group[0];
          if (!this.todos[0].startDate) {
            this.$router.push("/Startingerror");
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getperson() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/person/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log("person");
          console.log(result.data);
          this.person = result.data;
          for (let i = 0; i < this.person.length; i++) {
            this.getform(this.person[i].Group_id);
            this.gi = this.person[i].Group_id;
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
.box3 {
  margin-top: 20px;
}
.vs-sidebar {
  border-right: 2px solid lightsteelblue;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>
