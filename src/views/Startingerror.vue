<template>
  <div id="app">
    <!--  
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div v-for="(item, index) in persongroup" v-bind:key="index">
          <h3>
            Please Tell to Fill The Group Detail Form to Group Leader of
            {{ item.Group_name }}
          </h3>
          <h5>
            We Can't Start Project Monitoring Till The Your Project's Planning
            is Completed
          </h5>
        </div>
      </div>
    </div>-->

    <div id="box">
      <b-card>
        <b-navbar fixed="top" class="navbar navbar-expand navbar-dark bg-dark">
          <a href class="navbar-brand" @click.prevent></a>
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

        <h3>The "About Project" form has not been filled by the following groups.</h3>
        <div class="row">
          <div v-for="(item, index) in persongroup" v-bind:key="index" margin="10px">
            <div class="col-1"></div>
            <div class="col-12">
              <v-card>
                <div class="card bg-info" style="padding: 30px; color: white">
                  <div>
                    <h4 class="card-title">ProjectID:{{ item.Group_Name }}</h4>
                    <hr class="new1" />
                    <p><strong>Group Leader:</strong>{{ item.leadername }}</p>
                    <p><strong>Mobile:</strong>{{ item.leadermobile }}</p>
                    <p><strong>Email:</strong>{{ item.leaderemail }}</p>
                  </div>
                </div>
              </v-card>
            </div>
          </div>
        </div>

        <p>
          <strong>Please Note:</strong> Project Moitoring for a faculty can only be
          started after all the projects assigned to that faculty have filled up the
          <strong>"About Project"</strong> form. <br />The details of groups along with
          contact details of the <strong> Group Leader</strong> are displayed above.
        </p>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data: () => {
    return {
      datas: [],
      persongroup: [],
      persons: [],
      leader: [],
    };
  },

  mounted() {
    this.getperson();
    this.loggedin();
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (this.currentUser.roles != "ROLE_GUIDE") {
        this.logOut();
      }
    },
    getperson() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/person/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          this.persons = result.data;
          this.getform();
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getform() {
      var i = 0;
      var j = 0;
      var todos = [];
      var todo = [];
      var person = [];
      // var leaders = [];
      this.persons.forEach((element) => {
        axios.get(`https://project-monitoring-backend.herokuapp.com/api/groups/${element.Group_id}`).then(
          (result) => {
            j = j + 1;
            console.log("getform");
            console.log(result.data);
            var group = result.data;
            todos = group[0];
            todo = group[1];
            console.log("leader");
            console.log(group[1]);
            if (!todos[0].startDate) {
              person[i] = todos[0];
              person[i].leadername = todo[0].leadername;
              person[i].leaderemail = todo[0].leaderemail;
              person[i].leadermobile = todo[0].leadermobile;
              i++;
            }
            while (Number(j) == Number(this.persons.length)) {
              console.log(person);
              console.log("personsgroup");
              this.persongroup = person;
              console.log(this.persongroup);
              /*   this.leader = leaders;
              console.log(this.leader);*/
              if (Number(this.persongroup.length) == 0) {
                this.$router.push("/guide");
              }
              return;
            }
          },
          (error) => {
            console.error(error);
          }
        );
      });
    },
  },
};
</script>
<style scoped>
#app {
  padding-top: 5%;
  padding-left: 3%;
  padding-right: 3%;
  align-items: center;
}
hr.new1 {
  border-top: 2px solid black;
}
</style>
>
