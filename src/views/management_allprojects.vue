<template>
  <div id="app">
    <div>
      <Page5></Page5>
      <!-- <page4></page4> -->
    </div>

    <div id="box">
      <v-card>
          <br>
        <div>
          <div style="padding-left: 5px">
            <h1 style="text-align: center">ALL PROJECTS</h1>
          </div>
        </div>
        <hr>
        <div>
          <div>
            <ejs-grid
              ref="grid"
              :allowPaging="true"
              :dataSource="data1"
              :load="load"
              allowFiltering="true"
              :filterSettings="filterOptions"
              :pageSettings="pageSettings"
              :allowReordering="true"
            >
              <e-columns>
                <e-column
                  field="Group_Name"
                  headerText="GroupId"
                  :customAttributes="customAttributes"
                  :lockColumn="true"
                  width="250"
                >
                </e-column>
                <e-column
                  field="Group_title"
                  headerText="ProjectTitle"
                  :customAttributes="customAttributes"
                  width="500"
                ></e-column>
                <e-column
                  field="Type"
                  headerText="Type"
                  :customAttributes="customAttributes"
                  width="160"
                ></e-column>
                <e-column
                  field="Status"
                  headerText="	Status"
                  :customAttributes="customAttributes"
                  width="160"
                ></e-column>
                <e-column
                  field="dom1"
                  headerText="Domain"
                  :customAttributes="customAttributes"
                  width="270"
                ></e-column>
                <e-column
                  field="FullName"
                  headerText="Faculty"
                  :customAttributes="customAttributes"
                  width="200"
                ></e-column>
                <e-column
                  field="company"
                  headerText="Company"
                  :customAttributes="customAttributes"
                  width="200"
                ></e-column>
                <e-column
                  field="Department_Name"
                  headerText="Department"
                  :customAttributes="customAttributes"
                  width="350"
                ></e-column>
                <e-column
                  field="clg"
                  headerText="College"
                  :customAttributes="customAttributes"
                  width="170"
                ></e-column>
              </e-columns>
            </ejs-grid>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { GridPlugin, Filter, Page, Reorder } from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import axios from "axios";
import page5 from "./page5";

Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
Vue.prototype.$eventHub = new Vue();
export default {
  components: {
    page5,
  },


  data: () => {
    return {
      data: [],
      person: [],
      data1:[],
      stat:"",
      pageSettings: { pageSizes: true, pageSize: 10 },
      formatOptions: { type: "date", format: "dd/MM/yyyy" },
      customAttributes: { class: "customcss" },
      filterOptions: {
        ignoreAccent: true,
        type: "Menu",
      },
    };
  },
  watch: {
    "$route.params.stat": {
      handler() {
        location.reload();
        this.stat = this.$route.params.stat;
      },
    },
  },
  created() {
    this.stat = this.$route.params.stat;
  },
  provide: {
    grid: [Filter, Page, Reorder],
  },
  mounted() {
    // this.loggedin();
    this.getdata();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    load() {
      let rowHeight = this.$refs.grid.ej2Instances.getRowHeight(); //height of the each row
      let gridHeight = this.$refs.grid.height; //grid height
      let pageSize = this.$refs.grid.pageSettings.pageSize; //initial page size
      let pageResize = (gridHeight - pageSize * rowHeight) / rowHeight; //new page size is obtained here
      this.$refs.grid.pageSettings = {
        pageSize: pageSize + Math.round(pageResize),
      };
    },
    getdata() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/tablemanagement`).then(
        (result) => {
          console.log(result.data);
          this.data = result.data;
          if(this.stat == 1){
              for(this.k=0;this.k<this.data.length;this.k++){
                if(this.data[this.k].Status_id == 1){
                  this.data1.push(this.data[this.k])
                  console.log(this.data1)
                }
              }
            }
            else if(this.stat == 2){
              for(this.k=0;this.k<this.data.length;this.k++){
                if(this.data[this.k].Status_id == 2){
                  this.data1.push(this.data[this.k])
                  console.log(this.data1)
                }
              }
            }
            else if(this.stat == 3){
              for(this.k=0;this.k<this.data.length;this.k++){
                if(this.data[this.k].Status_id == 3){
                  this.data1.push(this.data[this.k])
                  console.log(this.data1)
                }
              }
            }
            else{
              this.data1 = this.data
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
    loggedin() {
      if (this.currentUser.roles == "ROLE_MANAGEMENT") {
        this.logOut();
      }
    },
  },
};
</script>
<style scoped></style>
>
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
/*
.e-grid .e-pager,
.e-grid .e-pager .e-pagercontainer,
.e-grid .e-pager .e-pagercontainer * {
  background-color: lightblue;
}*/

.e-grid .e-pager .e-currentitem,
.e-pager .e-currentitem:hover {
  background-color:lightblue;
  color:black ;
  font-weight: 500;
}
#box {
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
}
#app {
  background-color: lightsteelblue;
}
</style>
