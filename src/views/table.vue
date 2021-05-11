<template>
  <div id="app">
    <div>
      <page4></page4>
    </div>

    <div id="box">
      <v-card>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Project Id</th>
              <th>Project Title</th>
              <th>Type</th>
              <th>Domain</th>
              <th>Faculty</th>
              <th>Company</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" v-bind:key="item.id">
              <td>
                <router-link
                  :to="{
                    name: 'Director Project Details',
                    params: { id: item.Group_id },
                  }"
                  >{{ item.Group_Name }}</router-link
                >
              </td>
              <td>{{ item.Group_title }}</td>
              <td>{{ item.TpOfProject }}</td>
              <td>{{ item.dom1 }}</td>
              <td>{{ item.FullName }}</td>
              <td>{{ item.Company_name }}</td>
              <td>{{ item.Department_Name }}</td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </div>
  </div>
</template>
<script>
//import Vue from "vue";
import axios from "axios";
import page4 from "./page4";

export default {
  components: {
    page4,
  },
  watch: {
    "$route.params.id": {
      handler() {
        location.reload();
        this.sts = this.$route.params.sts;
      },
    },
  },
  created() {
    this.sts = this.$route.params.sts;
  },
  data: () => {
    return {
      data: [],
      person: [],
      sts: "",
      search: "",
    };
  },
  mounted() {
    this.loggedin();
    this.getdata();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getdata() {
      axios
        .get(
          `http://localhost:8080/api/alltabledir/${this.currentUser.college}/${this.sts}`
        )
        .then(
          (result) => {
            console.log(result.data);
            this.data = result.data;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (this.currentUser.roles == "ROLE_DIRECTOR" ) {
        console.log("director");
      }
      else if( this.currentUser.roles == "ROLE_MANAGEMENT" ){
        console.log("management");
      }
      else{
        this.logOut();
      }
    },
  },
};
</script>
<style scoped></style>
>
<style>
#box {
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
