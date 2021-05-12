<template>
  <div id="app">
    <div>
      <Page3></Page3>
    </div>
    <div class="underNav"></div>
    <div>
      <b-alert variant="success" v-if="visible">{{ ftrs }}</b-alert>
      <div class="underNav"></div>

      <b-modal scrollable ref="my-modal1" hide-footer title="Schedule FTR">
        <label>FTR Number</label>
        <b-form-input
          disabled
          type="number"
          v-model="ftrn[0]"
          placeholder="Enter FTR Number"
        ></b-form-input>
        <label>FTR Name</label>
        <b-form-input v-model="ftrn[1]" placeholder="Enter FTR Name"></b-form-input>
        <label>Academic Year </label>
        <b-form-input
          v-model="ay"
          disabled
          placeholder="For Example 2019-2020"
        ></b-form-input>
        <label>No of Questions </label>
        <b-form-input
          type="number"
          v-model="ftrn[3]"
          placeholder="For Example 1 2 5 10"
        ></b-form-input>
        <label>Semester </label>
        <select name="category_id" @change="onChange1($event)" class="form-control">
          <option>--- Select Semester ---</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>

        <b-button class="mt-2" variant="outline-success" block @click="EnableFTR"
          >Schedule FTR</b-button
        >

        <b-button class="mt-3" variant="outline-danger" block @click="hideModal1"
          >Cancel</b-button
        >
      </b-modal>

      <b-modal scrollable ref="my-modal" hide-footer title="Enable FTR">
        <v-card>
          <select name="category_id" @change="onChange122($event)" class="form-control">
            <option>--- Select FTR ---</option>
            <option
              v-for="(item, index) in ftrmst"
              v-bind:key="index"
              :value="item.ftr_master_id"
            >
              {{ item.ftr_name }}
            </option>
          </select>
        </v-card>
        <br />
        <v-card>
          <label>FTR Number : </label>
          <label>{{ ftrnum }}</label>
        </v-card>
        <br />
        <v-card>
          <label>Academic Year : </label>
          <label>{{ ay }}</label>
        </v-card>
        <br />
        <v-card>
          <label>Semester :</label>
          <label>{{ semester }}</label>
        </v-card>
        <label for="">Questions: </label>
        <div v-for="(ftr, index) in ques" v-bind:key="ftr.id">
          {{ ++index }}.
          <v-card>
            <b-form-textarea
              class="col-lg-12"
              id="ex3"
              placeholder="Yes/No Type Questions "
              v-model="ftr.question"
            ></b-form-textarea>
          </v-card>
        </div>
        <label for="example-datepicker">Due Date of FTR</label>
        <v-card
          ><b-form-datepicker
            id="example-datepicker"
            :min="min"
            :max="max"
            v-model="enabledate"
            class="mb-1"
          ></b-form-datepicker>
        </v-card>
        <b-button class="mt-2" variant="outline-success" block @click="postFTRques"
          >Enable FTR</b-button
        >

        <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
          >Cancel</b-button
        >
      </b-modal>
    </div>
    <div style="padding-left: 50px">
      <b-button variant="primary" id="show-btn" @click="showModal1"
        >Schedule FTR</b-button
      >
      <b-button style="margin: 10px" variant="primary" id="show-btn" @click="showModal"
        >Enable FTR</b-button
      >
    </div>
    <v-card style="margin-left: 3%; margin-right: 3%">
      <div class="container">
        <div class="row">
          <div class="float-left">
            <select name="category_id" @change="onChange12($event)" class="form-control">
              <option>--- Select FTR ---</option>
              <option
                v-for="(item, index) in ftrmast"
                v-bind:key="index"
                :value="item.ftr_master_id"
              >
                FTR {{ item.ftr_number }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-3"></div>
        <div class="col-md-3 col-sm-6 py-2">
          <div class="card bg-success text-white h-100">
            <div class="card-body bg-success">
              <div class="rotate">
                <i class="fa fa-user fa-4x"></i>
              </div>
              <h5 class="text-uppercase">Submited FTR</h5>
              <h1 class="display-4">{{ ftrm1 }}</h1>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 py-2">
          <div class="card text-white bg-danger h-100">
            <div class="card-body bg-danger">
              <div class="rotate">
                <i class="fa fa-list fa-4x"></i>
              </div>
              <h5 class="text-uppercase">Remaining FTR</h5>
              <h1 class="display-4">{{ ftrm2 }}</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="center">
            <ejs-grid
              v-if="enable"
              ref="grid"
              allowPaging="true"
              :pageSettings="pageSettings"
              :load="load"
              :dataSource="datas"
              allowFiltering="true"
              :filterSettings="filterOptions"
            >
              <e-columns>
                <e-column
                  field="Group_name"
                  headerText="Group Id"
                  textAlign="auto"
                  :customAttributes="customAttributes"
                  v-on:click="goto(event)"
                >
                </e-column>
                <e-column
                  field="FullName"
                  headerText="Guide Name"
                  textAlign="auto"
                  :customAttributes="customAttributes"
                ></e-column>
                <e-column
                  field="review"
                  headerText="Review"
                  textAlign="auto"
                  :customAttributes="customAttributes"
                  width="300"
                ></e-column>
                <e-column
                  field="Submit_Date"
                  headerText="Submit Date"
                  textAlign="auto"
                  :customAttributes="customAttributes"
                  :format="formatOptions"
                  type="date"
                ></e-column>
                <e-column
                  field="Aproved_date"
                  headerText="Approved date"
                  textAlign="auto"
                  :customAttributes="customAttributes"
                  :format="formatOptions"
                  type="date"
                ></e-column>
              </e-columns>
            </ejs-grid>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import Vue from "vue";
import { GridPlugin, Filter, Page } from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import Page3 from "./page3";
import axios from "axios";

Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
Vue.prototype.$eventHub = new Vue();
export default {
  components: {
    Page3,
  },
  data() {
    const mindate = new Date();
    const maxdata = new Date();
    mindate.setDate(mindate.getDate() + 3);
    maxdata.setDate(maxdata.getDate() + 15);
    return {
      ftrmast: [],
      ftrmaster: "",
      ftr_master: "",
      enabledate: "",
      ftrm1: "",
      ftrm2: "",
      datas: [],
      ftrs: [],
      ftrn: [],
      ques: [],
      min: mindate,
      max: maxdata,
      values: "",
      ftrname: "",
      sem: "",
      college: "",
      semester: "",
      ay: "2020-2021",
      ftrnum: "",
      nqus: "",
      department: "",
      ftrmst: [],
      visible: false,
      enable: false,
      pageSettings: { pageSizes: true, pageSize: 5 },
      formatOptions: { type: "date", format: "dd/MM/yyyy" },
      customAttributes: { class: "customcss" },
      filterOptions: {
        ignoreAccent: true,
        type: "Menu",
      },
    };
  },
  created() {
    this.$eventHub.$on("detail", (e) => {
      alert("passed value: " + e);
    });
  },
  mounted() {
    this.GetFTR();
    this.loggedin();
    this.GetFTR1();
    this.getcolleges();
    this.getdepartments();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    GetFTR() {
      axios
        .get(
          `https://project-monitoring-backend.herokuapp.com/api/ftrmaster/${this.currentUser.college}/${this.currentUser.department}`
        )
        .then(
          (result) => {
            console.log(result.data);
            this.ftrmast = result.data;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    Getproject() {
      axios
        .get(
          `https://project-monitoring-backend.herokuapp.com/api/ftrproject/${this.currentUser.college}/${this.currentUser.department}/${this.ftr_master}`
        )
        .then(
          (result) => {
            console.log(result.data);
            var ftrm = result.data;
            this.ftrm1 = ftrm[0][1];
            this.ftrm2 = ftrm[0][2];
            if (ftrm[1].Aproved_date) {
              this.enable = true;
              this.datas = ftrm[1];
            } else {
              this.enable = true;
            }
          },
          (error) => {
            console.error(error);
          }
        );
    },
    onChange12(event) {
      this.datas = [];
      this.ftrm1 = "";
      this.ftrm2 = "";
      this.ftr_master = event.target.value;
      console.log(this.ftr_master);
      this.Getproject();
    },
    load() {
      let rowHeight = this.$refs.grid.ej2Instances.getRowHeight(); //height of the each row
      let gridHeight = this.$refs.grid.height; //grid height
      let pageSize = this.$refs.grid.pageSettings.pageSize; //initial page size
      let pageResize = (gridHeight - pageSize * rowHeight) / rowHeight; //new page size is obtained here
      this.$refs.grid.pageSettings = {
        pageSize: pageSize + Math.round(pageResize),
      };
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (this.currentUser.roles != "ROLE_HOD") {
        this.logOut();
      }
    },
    onChange1(event) {
      this.sem = event.target.value;
    },
    onChange122(event) {
      (this.semester = ""), (this.ay = ""), (this.ftrnum = ""), (this.ques = []);
      this.ftrname = event.target.value;
      this.semester = this.ftrmast[this.ftrname - 1].sem;
      this.ay = this.ftrmast[this.ftrname - 1].ay;
      this.ftrnum = this.ftrmast[this.ftrname - 1].ftr_number;
      this.nqus = this.ftrmast[this.ftrname - 1].No_of_Questions;
      this.GetFTR1();
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    showModal1() {
      this.$refs["my-modal1"].show();
    },
    hideModal() {
      (this.semester = ""),
        (this.ay = ""),
        (this.ftrnum = ""),
        (this.ques = []),
        //(this.values = ""),
        this.$refs["my-modal"].hide();
    },
    hideModal1() {
      this.ftrn = [];
      this.clg = "";
      this.sem = "";
      this.$refs["my-modal1"].hide();
    },

    GetFTR1() {
      axios
        .get(
          `https://project-monitoring-backend.herokuapp.com/api/ftrmaster/${this.currentUser.college}/${this.currentUser.department}`
        )
        .then(
          (result) => {
            console.log(result.data);
            this.ftrmast = result.data;
            this.ftrn[0] = this.ftrmast.length + 1;
            for (let i = 0, j = 0; i < this.ftrmast.length; i++) {
              if (!this.ftrmast[i].Due_date) {
                this.ftrmst[j] = this.ftrmast[i];
                j++;
              }
            }
          },
          (error) => {
            console.error(error);
          }
        );

      for (let i = 0; i < this.nqus; i++) {
        var feed = { question: "" };
        this.ques.push(feed);
      }
    },

    EnableFTR() {
      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/ftrmaster`, {
          FTRS: this.ftrn,
          ay: this.ay,
          college: this.currentUser.college,
          semester: this.sem,
          department: this.currentUser.department,
        })
        .then(
          (result) => {
            console.log(result.data);
            this.ftrs = result.data;
            this.toast("Success", "FTR Schedule Successfully", true);
          },
          (error) => {
            console.error(error);
            this.toast("Failed", error, true);
          }
        );

      this.hideModal1();
      this.GetFTR();
      this.GetFTR1();
    },

    toast(type, toaster, append = false) {
      console.log("Toast Called");
      this.$bvToast.toast(`${toaster}`, {
        title: `${type}`,
        toaster: "b-toaster-bottom-center",
        solid: true,
        appendToast: append,
      });
    },
    putFTR() {
      console.log(this.enabledate);
      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/ftrmasters`, {
          date: this.enabledate,
          ft: this.ftrname,
        })
        .then(
          (result) => {
            console.log(result.data);
            this.ftrs = result.data;
            this.visible = true;
          },
          (error) => {
            console.error(error);
          }
        );
      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/ftremail`, {
          dep: this.currentUser.Department_id,
        })
        .then(
          (result) => {
            console.log(result.data);
          },
          (error) => {
            console.error(error);
          }
        );
      this.hideModal1();
      this.GetFTR();
      this.GetFTR1();
    },

    postFTRques() {
      var count = Object.keys(this.ques).length;
      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/ftrquestions`, {
          Ques: this.ques,
          ftno: this.ftrname,
          cout: count,
        })
        .then(
          (result) => {
            console.log(result.data);
            this.ftrs = result.data;
            this.toast("Success", "FTR Enabled Successfully", true);
          },
          (error) => {
            console.error(error);
          }
        );
      this.putFTR();
      this.hideModal();
    },
    getcolleges() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/college`).then(
        (result) => {
          console.log(result.data);
          var colleges = result.data;
          colleges.forEach((element) => {
            if (element.College_id == this.currentUser.college) {
              this.college = element.College_Name;
            }
          });
        },

        (error) => {
          console.error(error);
        }
      );
    },
    getdepartments() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/department/${this.currentUser.college}`).then(
        (result) => {
          console.log(result.data);
          var departments = result.data;
          departments.forEach((element) => {
            if (element.Department_id == this.currentUser.department) {
              this.department = element.Department_Name;
            }
          });
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },

  provide: {
    grid: [Filter, Page],
  },
};
</script>
<style scoped>
.underNav {
  margin-top: 50px;
}
</style>
<style>
@import "../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
@import url("https://cdn.syncfusion.com/ej2/material.css");
.e-grid * {
  font-size: 25px;
  text-align: left;
}
.e-grid .e-rowcell.customcss {
  font-size: 18px;
  padding-block: 18px;
  font-weight: 300;
}
.e-grid .e-headercell.customcss {
  color: black;
  font-weight: bolder;
  padding-block: 15px;
  background-color: rgb(245, 245, 245);
}
</style>
