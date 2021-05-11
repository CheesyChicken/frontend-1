<template>
  <div id="app">
    <div>
      <page4></page4>
    </div>

    <div id="box">
      <v-card>
        <div>
            <br>
          <div style="padding-left: 5px">
            <h1 style="text-align: center">ALL PROJECTS</h1>
          </div>
        </div>
        <hr />
        <div>
          <div>
           <ejs-grid ref='grid'  :allowPaging="true" :dataSource='data' :load='load' allowFiltering='true' :filterSettings='filterOptions' :pageSettings='pageSettings' >
              <e-columns>
              <e-column
                field="Group_Name"
                headerText="GroupId"
                :customAttributes="customAttributes"
                width=250
              ><!--<a rel='nofollow' href="/director/PD">{{ data.group_id }}</a> -->
                <template > 
                <div> 
                    <router-link
                  :to="{
                    name: 'Director Project Details',
                    params: { id: data.Group_id },
                  }"
                  ></router-link
                > 
                </div> 
                </template> 
              </e-column>
              <!-- :template='cTemplate'-->
              <e-column
                field="Group_title"
                headerText="ProjectTitle"
                :customAttributes="customAttributes"
                width=500
              ></e-column>
              <e-column
                field="TpOfProject"
                headerText="Type"
                :customAttributes="customAttributes"
                width=220
              ></e-column>
              <e-column
                field="Status"
                headerText="Status"
                :customAttributes="customAttributes"
                width=220
              ></e-column>
              <e-column
                field="dom1"
                headerText="Domain"
                :customAttributes="customAttributes"
                width=250
              ></e-column>
              <e-column
                field="FullName"
                headerText="Faculty"
                :customAttributes="customAttributes"
                width=250
              ></e-column>
              <e-column
                field="Company_name"
                headerText="Company"
                :customAttributes="customAttributes"
                width=200
              ></e-column>
              <e-column
                field="Department_Name"
                headerText="Department"
                :customAttributes="customAttributes"
                width=300
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
import page4 from "./page4";

Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
Vue.prototype.$eventHub = new Vue();
export default {
  components: {
    page4,
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
      data: [],
      person: [],
      pageSettings: { pageSize: 10 },
      formatOptions: { type: "date", format: "dd/MM/yyyy" },
      customAttributes: { class: "customcss" },
      filterOptions: {
        ignoreAccent: true,
        type: "Menu",
      },
      /*cTemplate: function () { 
          return { template : Vue.component("demo",{
     template:`<router-link :to='{name: 'Guide HomePage',params: { id: ${this.data.group_id} }}></router-link>`,
      data: function() {
                    return {
                        data: {}
                    }
                },
                computed: {
                    image: function() {
                        return './' + this.data.EmployeeID + '.png';
                    },
                    altImage: function() {
                        return this.data.EmployeeID;
                    }
                }
 })} 
      } */
    };
  },
  provide: {
    grid: [Filter, Page],
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
    
    load() {
      let rowHeight = this.$refs.grid.ej2Instances.getRowHeight(); //height of the each row
      let gridHeight = this.$refs.grid.height; //grid height
      let pageSize = this.$refs.grid.pageSettings.pageSize; //initial page size
      let pageResize = (gridHeight - pageSize * rowHeight) / rowHeight; //new page size is obtained here
      this.$refs.grid.pageSettings = { pageSize: pageSize + Math.round(pageResize) };
    },
    getdata(){
        axios.get(`http://localhost:8080/api/tabledir/${this.currentUser.college}`).then(
          result => {
            console.log(result.data)
            this.data = result.data
          },
          error => {
            console.error(error)
          }
        )
  },
  logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    loggedin(){
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
  background-color:lightblue;
  color:black ;
  font-weight: 500;
}
#box {
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
