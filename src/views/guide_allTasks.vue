<template>
  <div id="app">
    <div>
      <Page2></Page2>
    </div>

    <div id="box">
      <v-card>
        <div>
          <div style="padding-left: 5px">
            <h1 style="text-align: center">All Tasks</h1>
            <b-dropdown
              v-if="grop"
              variant="info"
              id="dropdown-offset"
              offset="25"
              text="Select Project"
              class="m-2"
              v-b-tooltip.hover.top="'Click here to switch project'"
            >
              <b-dropdown-item v-for="(item, index) in person" v-bind:key="index">
                <router-link
                  :to="{
                    name: 'Guide allTask',
                    params: { id: item.Group_id },
                  }"
                  >{{ item.Group_Name }}</router-link
                ></b-dropdown-item
              >
            </b-dropdown>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <ejs-grid
              ref="grid"
              :dataSource="datas"
              allowPaging="true"
              allowFiltering="true"
              :pageSettings="pageSettings"
              :filterSettings="filterOptions"
              :load="load"
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
                  headerText="Approved date"
                  textAlign="auto"
                  :customAttributes="customAttributes"
                  :format="formatOptions"
                  type="date"
                ></e-column>
                <e-column
                  field="Status_Name"
                  headerText="Status"
                  textAlign="auto"
                  :customAttributes="customAttributes"
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
import { GridPlugin, Filter, Page } from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
import axios from "axios";
import Page2 from "./page2";

Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
Vue.prototype.$eventHub = new Vue();

export default {
  components: {
    Page2,
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.gi = this.$route.params.id;
        location.reload();
      },
    },
  },

  data: () => {
    return {
      datas: [],
      person: [],
      grop: false,
      pageSettings: { pageSize: 5 },
      formatOptions: { type: "date", format: "dd/MM/yyyy" },
      customAttributes: { class: "customcss" },
      filterOptions: {
        ignoreAccent: true,
        type: "Menu",
      },
    };
  },
  provide: {
    grid: [Filter, Page],
  },
  mounted() {
    this.loggedin();
    this.getdata();
    this.getperson();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.gi = this.$route.params.id;
  },
  methods: {
    getdata() {
      console.log(this.gi);
      axios.get(`http://localhost:8080/api/tasks/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.datas = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    load() {
      let rowHeight = this.$refs.grid.ej2Instances.getRowHeight(); //height of the each row
      let gridHeight = this.$refs.grid.height; //grid height
      let pageSize = this.$refs.grid.pageSettings.pageSize; //initial page size
      let pageResize = (gridHeight - pageSize * rowHeight) / rowHeight; //new page size is obtained here
      this.$refs.grid.pageSettings = { pageSize: pageSize + Math.round(pageResize) };
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
    getperson() {
      axios.get(`http://localhost:8080/api/person/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log("person");
          console.log(result.data);
          this.person = result.data;
          if (this.person.length > 1) {
            this.grop = true;
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
.e-grid .e-pager .e-currentitem,
.e-pager .e-currentitem:hover {
  background-color: lightblue;
  color: black;
  font-weight: 500;
}
#box {
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
