<template>
  <div id="app">
    <Page1></Page1>

    <div class="underNav"></div>
    <div id="box">
      <v-card>
        <div>
          <h1 style="text-align: center">ALL TASKS</h1>
          <hr />
          <div>
            <div>
              <ejs-grid
                ref="grid"
                :allowPaging="true"
                :dataSource="datas"
                :load="load"
                allowFiltering="true"
                :filterSettings="filterOptions"
                :pageSettings="pageSettings"
              >
                <e-columns>
                  <e-column
                    field="Task_Name"
                    headerText="Taskname"
                    textAlign="auto"
                    :customAttributes="customAttributes"
                  ></e-column>
                  <e-column
                    field="FullName"
                    headerText="AllotedTo"
                    textAlign="auto"
                    :customAttributes="customAttributes"
                  ></e-column>
                  <e-column
                    field="Due_Date"
                    headerText="Due Date"
                    textAlign="auto"
                    :customAttributes="customAttributes"
                    :format="formatOptions"
                    type="date"
                  ></e-column>
                  <e-column
                    field="Start_date"
                    headerText="Start date"
                    textAlign="auto"
                    :customAttributes="customAttributes"
                    :format="formatOptions"
                    type="date"
                  ></e-column>
                  <e-column
                    field="Approved_Date"
                    headerText="End date"
                    textAlign="auto"
                    :customAttributes="customAttributes"
                    :format="formatOptions"
                    type="date"
                  ></e-column>
                  <e-column
                    field="Status"
                    headerText="Status"
                    textAlign="auto"
                    :customAttributes="customAttributes"
                  ></e-column>
                </e-columns>
              </ejs-grid>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import { Filter, Page } from "@syncfusion/ej2-vue-grids";
import Page1 from "./page1";

export default {
  components: {
    Page1,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data: () => {
    return {
      datas: [],
      groupid: "",
      pageSettings: { pageSizes: true, pageSize: 5 },
      formatOptions: { type: "date", format: "dd/MM/yyyy" },
      customAttributes: { class: "customcss" },
      filterOptions: {
        type: "Menu",
        operators: {
          stringOperator: [{ value: "startsWith", text: "starts with" }],
        },
      },
    };
  },

  mounted() {
    this.getgroup();
    this.loggedin();
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
      axios.get(`http://localhost:8080/api/tasks/${this.groupid}`).then(
        (result) => {
          console.log(result.data);
          this.datas = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getgroup() {
      axios
        .get(`http://localhost:8080/api/getstartdate/${this.currentUser.Person_Id}`)
        .then(
          (result) => {
            console.log(result.data);
            var tod = result.data;
            this.groupid = tod[0].Group_id;
            console.log(this.groupid);
            this.getdata();
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
      if (
        this.currentUser.roles == "ROLE_HOD" ||
        this.currentUser.roles == "ROLE_GUIDE" ||
        this.currentUser.roles == "ROLE_MANAGEMENT" ||
        this.currentUser.roles == "ROLE_DIRECTOR"
      ) {
        this.logOut();
      }
    },
  },
  provide: {
    grid: [Filter, Page],
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
