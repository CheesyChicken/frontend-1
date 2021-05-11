<template>
  <div id="app">
    <Page1></Page1>
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
            <div class="text-center">
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
            </div>
          </b-card>

          <br />
          <b-card class="text-center" title="Team Members">
            <div class="row">
              <div class="col-12">
                <b-list-group
                  v-for="(item, index) in std"
                  v-bind:key="index"
                  style="max-width: 300px"
                >
                  <b-list-group-item variant="light" class="d-flex align-items-center">
                    <b-avatar class="mr-3"></b-avatar>
                    <span class="mr-auto"
                      ><h6>{{ item.FullName }}</h6>
                      <small class="float-left">{{ item.username }}</small>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>
          </b-card>
        </div>
        <div class="col-xl-8 col-lg-7 col-md-8" style="padding-top: 5%">
          <b-card>
            <h4>Profile</h4>
            <br />
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

            <div class="row">
              <div class="col-12">
                <b-form-group
                  class="mb-0"
                  label="Project Title"
                  label-for="input-formatter"
                >
                  <b-form-input disabled v-model="ProjectTitle"></b-form-input>
                </b-form-group>
              </div>
            </div>

            <div class="row">
              <div class="col-4">
                <b-form-group class="mb-0" label="Project Id" label-for="input-formatter">
                  <b-form-input disabled v-model="ProjectName"></b-form-input>
                </b-form-group>
              </div>

              <div class="col-4">
                <b-form-group
                  class="mb-0"
                  label="Project Guide"
                  label-for="input-formatter"
                >
                  <b-form-input disabled v-model="ProjectGuide"></b-form-input>
                </b-form-group>
              </div>

              <div class="col-4">
                <b-form-group
                  class="mb-0"
                  label="Project Type"
                  label-for="input-formatter"
                >
                  <b-form-input disabled v-model="ProjectType"></b-form-input>
                </b-form-group>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col-12">
                <b-button display block variant="dark"></b-button>
              </div>
            </div>-->
          </b-card >
          <br >
          <b-card v-show= 'isIndus' >
            <h4>Company details</h4>
            <br >
            <div class="row">
              <div class="col-6">
                <b-form-group class="mb-0" label="Company Name" label-for="input-formatter">
                  <b-form-input disabled v-model="Company_name"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-6">
                <b-form-group class="mb-0" label="Company ID" label-for="input-formatter">
                  <b-form-input disabled v-model="Company_ID"></b-form-input>
                </b-form-group>
              </div>
            </div>
            
            <div class="row">
              <div class="col-5">
                <b-form-group class="mb-0" label="Industry Guide" label-for="input-formatter">
                  <b-form-input disabled v-model="Industry_Guide"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-3">
                <b-form-group class="mb-0" label="Mobile Number Guide" label-for="input-formatter">
                  <b-form-input disabled v-model="Industry_Guide_No"></b-form-input>
                </b-form-group>
              </div>
            </div>








          </b-card>
        </div>
        <div class="col-xl-0 col-lg-1 col-md-1"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Page1 from "./page1";

export default {
  components: {
    Page1,
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
      std: [],
      FullName: "",
      Mobile: "",
      Email: "",
      ProjectTitle: "",
      ProjectGuide: "",
      ProjectType: "",
      ProjectName: "",
      College: "",
      Department: "",
      Total: "",
      Incompleted: "",
      Completed: "",
      groupid: "",
      Industry_Guide:"",
      Industry_Guide_No:"",
      Company_name:"",
      Company_ID:"",
      isIndus: false ,
      
    };
  },
  mounted() {
    this.getform();
    this.addData();
    this.gettask();
  },
  methods: {
    addData() {
      this.FullName = this.currentUser.FullName;
      this.Mobile = this.currentUser.Mobile;
      this.Email = this.currentUser.email;
    },
    getstudent() {
      let j = 0;
      axios.get(`http://localhost:8080/api/std/${this.groupid}}`).then(
        (result) => {
          console.log(result.data);
          var temp = result.data;
          var temp1 = [];
          var temp2 = [];
          for (let i = 0; i < temp.length; i++) {
            temp1[i] = temp[i][0];
          }
          temp1.forEach((element) => {
            if (element.Person_id != this.currentUser.Person_Id) {
              temp2[j] = element;
              j++;
            }
          });
          while (Number(j) == Number(temp2.length)) {
            this.std = temp2;
            return;
          }
          console.log(this.std);
        },
        (error) => {
          console.error(error);
        }
      );
    },
    gettask() {
      axios
        .get(`http://localhost:8080/api/profiletask/${this.currentUser.Person_Id}`)
        .then(
          (result) => {
            console.log(result.data);
            var task = result.data;
            this.Total = task[0].total;
            this.Completed = task[0].Completed;
            this.Incompleted = task[0].Remaining;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    getprofile() {
      axios.get(`http://localhost:8080/api/profile/${this.groupid}`).then(
        (result) => {
          console.log(result.data);
          var profile = result.data;
          this.ProjectTitle = profile[0].Group_title;
          this.ProjectName = profile[0].Group_Name;
          this.ProjectType = profile[0].type;
          if(this.ProjectType == "Industrial"){
            this.isIndus = true;
          }
          this.ProjectGuide = profile[0].FaultyGuide;
          this.Department = profile[0].Department_Name;
          this.College = profile[0].College_Name;
          this.Industry_Guide = profile[0].IndustryFaultyGuide;
          this.Industry_Guide_No = profile[0].IndustryFaultyGuideMo;
          this.Company_name = profile[0].Company_name;
          this.Company_ID = profile[0].Company_id;
          
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getform() {
      axios
        .get(`http://localhost:8080/api/getstartdate/${this.currentUser.Person_Id}`)
        .then(
          (result) => {
            console.log(result.data);
            var tod = result.data;
            this.groupid = tod[0].Group_id;
            if (!tod[0].startDate) {
              this.$router.push("/Starting");
            }
            this.getstudent();
            this.getprofile();
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
