<template>
  <div id="app">
    <div>
      <Page2></Page2>
    </div>
    <div class="underNav"></div>
    <div id="box">
      <div class="container">
        <div class="row">
          <div class="col-1"></div>
          <div v-for="(item, index) in stds" v-bind:key="index" margin="10px">
            <v-card style="margin-left: 20px; margin-right: 20px; margin-top: 3%">
              <div class="card bg-light" style="padding: 10px">
                <div>
                  <h3 style="color: Orange">{{ item.gti }}</h3>
                  <h4 class="card-title">ProjectID: {{ item.gna }}</h4>

                  <hr />
                  <p><strong>Status: </strong>{{ item.gst }}</p>
                  <p><strong>Tasks alloted this week:</strong>{{ item.week }}</p>
                  <p><strong>Tasks completed and approved:</strong> {{ item.done }}</p>
                  <p><strong>Submission requests pending:</strong> {{ item.waiting }}</p>

                  <p class="float-right" style="padding-right: 10px">
                    <b-button class="mt-2" variant="outline-primary">
                      <router-link
                        :to="{ name: 'Guide HomePage', params: { id: item.gid } }"
                        >Go To Project</router-link
                      ></b-button
                    >
                  </p>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Page2 from "./page2";
import axios from "axios";

export default {
  data() {
    return {
      std: [],
      stds: [],
    };
  },
  components: {
    Page2,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    this.loggedin();
    this.gethome();
  },
  methods: {
    gethome() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/home/${this.currentUser.grno_EmpCode}`).then(
        (result) => {
          console.log("home");
          console.log(result.data);
          var td = result.data;
          var tg = [];
          for (let i = 0; i < td.length; i++) {
            tg[i] = td[i][0];
          }
          this.std = tg;
          this.std.forEach((element) => {
            element["week"];
            element["waiting"];
            element["done"];
          });
          this.getweek();
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getweek() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/noweek/${this.currentUser.grno_EmpCode}`).then(
        (result) => {
          console.log(result.data);
          var datas = result.data;
          var i = 0;
          this.std.forEach((element) => {
            element["week"] = datas[i][0].week;
            element["waiting"] = datas[i][0].waiting;
            element["done"] = datas[i][0].done;
            i++;
          });
          this.stds = this.std;
          console.log("std");
          console.log(this.stds);
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
      if (this.currentUser.roles != "ROLE_GUIDE") {
        this.logOut();
      }
    },
  },
};
</script>
<style scoped>
#box {
  padding-top: 5%;
  padding-right: 1%;
  padding-left: 1%;
}
.underNav {
  margin-top: 50px;
}
</style>
