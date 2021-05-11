<template>
  <div id="app">
    <Page2></Page2>
    <div id="box">
      <div class="row">
        <div class="col-xl-0 col-lg-1 col-md-1"></div>
        <div class="col-xl-4 col-lg-3 col-md-2">
          <b-card>
            <div>
              <div class="author" align="center">
                <img
                  class="rounded-circle"
                  src="@/assets/prof.png"
                  alt="..."
                  height="100px"
                  margin-left="50px"
                />
                <h4 class="title">
                  {{ currentUser.FullName }}
                  <br />
                  <a href="#">
                    <small>{{ currentUser.username }}</small>
                  </a>
                </h4>
              </div>
            </div>
            <!-- <div class="text-center">
              <div class="row">
                <div class="col-4">
                  Tasks
                  <br />
                  {{ Total }}
                </div>
                <div class="col-4">
                  Completed
                  <br />
                  {{ Completed }}
                </div>
                <div class="col-4">
                  Remaining
                  <br />
                  {{ Incompleted }}
                </div>
              </div>
            </div>-->
          </b-card>
          <b-card>
            <div>
              <div class="author" align="center">Rejected Tasks: {{ rejected }}</div>
            </div>
          </b-card>
        </div>
        <div class="col-xl-8 col-lg-7 col-md-8" style="padding-top: 1%">
          <b-card>
            <h4>Profile</h4>

            <div class="row">
              <div class="col-6">
                <b-form-group class="mb-0" label="College" label-for="input-formatter">
                  <b-form-input disabled v-model="College"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-6">
                <b-form-group class="mb-0" label="Department" label-for="input-formatter">
                  <b-form-input disabled v-model="Department"></b-form-input>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col-5">
                <b-form-group class="mb-0" label="Full Name" label-for="input-formatter">
                  <b-form-input disabled v-model="FullName"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-3">
                <b-form-group class="mb-0" label="Mobile" label-for="input-formatter">
                  <b-form-input disabled v-model="Mobile"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-4">
                <b-form-group class="mb-0" label="Email" label-for="input-formatter">
                  <b-form-input disabled v-model="Email"></b-form-input>
                </b-form-group>
              </div>
            </div>
          </b-card>
          <!-- ------------------------------------------------------------------------------------ -->

          <b-card
            class="mt-1"
            v-for="(item, index) in profile"
            v-bind:key="item.Group_id"
          >
            <h4>Project {{ ++index }}</h4>
            <div class="row">
              <div class="col-12">
                <b-form-group
                  class="mb-0"
                  label="Project Title"
                  label-for="input-formatter"
                >
                  <b-form-input disabled v-model="item.gti"></b-form-input>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col-4">
                <b-form-group class="mb-0" label="Project Id" label-for="input-formatter">
                  <b-form-input disabled v-model="item.gna"></b-form-input>
                </b-form-group>
              </div>

              <div class="col-4">
                <b-form-group
                  class="mb-0"
                  label="Project Type"
                  label-for="input-formatter"
                >
                  <b-form-input disabled v-model="item.typname"></b-form-input>
                </b-form-group>
              </div>

              <b-list-group
                v-for="(item, index) in std"
                v-bind:key="index"
                style="max-width: 300px"
              >
                <b-list-group-item variant="light" class="d-flex align-items-center">
                  <span class="mr-auto"
                    ><h6>{{ item.FullName }}</h6>
                    <small class="float-left">{{ item.username }}</small>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </b-card>

          <!-- ------------------------------------------------------------------------------------------------------- -->
        </div>

        <div class="col-xl-0 col-lg-1 col-md-1"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Page2 from "./page2";

export default {
  components: {
    Page2,
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  data: () => {
    return {
      datas: [],
      tod: [],
      FullName: "",
      Mobile: "",
      Email: "",
      College: "",
      Department: "",
      profile: [],
      allstudent: [],
      std: [],
      rejected: 0,
    };
  },
  mounted() {
    this.addDate();
    this.getprofile();
    this.getgroups();
    this.getrejectedtasks();
  },
  methods: {
    addDate() {
      this.FullName = this.currentUser.FullName;
      this.Mobile = this.currentUser.Mobile;
      this.Email = this.currentUser.email;
    },

    getprofile() {
      axios
        .get(`http://localhost:8080/api/guideprofile/${this.currentUser.Person_Id}`)
        .then(
          (result) => {
            console.log(result.data);
            var profile = result.data;
            this.Department = profile[0].Department_Name;
            this.College = profile[0].College_Name;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    getgroups() {
      let i = 0;
      axios
        .get(`http://localhost:8080/api/guidegroupsprofile/${this.currentUser.Person_Id}`)
        .then(
          (result) => {
            console.log(result.data);
            var dt = result.data;
            var pro = [];
            for (i = 0; i < dt.length; i++) {
              pro[i] = dt[i][0];
            }
            while (Number(i) == Number(dt.length)) {
              this.profile = pro;
              console.log("JINeehssdsd-----------------");
              console.log(this.profile);
              return;
            }
          },
          (error) => {
            console.error(error);
          }
        );
    },
    getform() {
      axios.get(`http://localhost:8080/api/person/${this.currentUser.Person_Id}`).then(
        (result) => {
          //console.log(result.data);
          this.tod = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getrejectedtasks() {
      let i = 0;
      axios
        .get(`http://localhost:8080/api/rejectedtask/${this.currentUser.Person_Id}`)
        .then(
          (result) => {
            console.log("result");
            console.log(result.data);
            var rejs = result.data;
            var tr = 0;
            for (let j = 0; j < rejs.length; j++) {
              var ty = rejs[i][0].id;
              tr = Number(ty) + Number(tr);
              i++;
            }
            while (Number(i) == Number(rejs.length)) {
              this.rejected = tr;
              return;
            }
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
  },
};
</script>
<style scoped>
#box {
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
>
<style></style>
