<template>
    <div id="app">

         
         <Page3></Page3>
         
        <div class="underNav">
        </div>
        
        <v-card style="margin: 30px 5% 30px 5%">
        <div>
            <br>
            <h1 style="text-align: center;">ALL PROJECTS</h1>  
            <hr>
            <div>
          <b-tabs pills content-class="mt-3" align="center">
            <div>
              <ejs-grid ref='grid'  allowPaging="true" :dataSource='students' :load='load' allowFiltering='true' :filterSettings='filterOptions' :pageSettings='pageSettings' >
              <e-columns>
              <e-column
                field="FullName"
                headerText="Studnet Name"
                :customAttributes="customAttributes"
                width=250
              ></e-column>
              <e-column
                field="GroupId"
                headerText="Studnet Name"
                :customAttributes="customAttributes"
                width=250
              ></e-column>
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
                 width=200
              ></e-column>
              <e-column
                field="Status"
                headerText="Status"
                :customAttributes="customAttributes"
                 width=200
              ></e-column>
              <e-column
                field="FullName"
                headerText="Faculty"
                :customAttributes="customAttributes"
                 width=200
              ></e-column>
              <e-column
                field="Company_Name"
                headerText="Company"
                :customAttributes="customAttributes"
                 width=250
              ></e-column>
            </e-columns>
              </ejs-grid>
          </div>
        </b-tabs>
        </div>
        </div>
        </v-card>
        
        
    </div>
</template>

<script>
/*eslint-disable*/
import axios from 'axios';
import Vue from "vue";
import  {Filter,Page}  from "@syncfusion/ej2-vue-grids";import Page3 from './page3'
Vue.prototype.$eventHub = new Vue();

export default {
   components: {
    Page3
  },
  data: ()=> {
    return {
        id:0,
        students: [],
          pageSettings: { pageSize:5 },
           formatOptions: {type:'date', format:'dd/MM/yyyy'},
         customAttributes : {class: 'customcss'},
        filterOptions: { 
        ignoreAccent: true, // Uncomment this code to filter diacritic values
        type:'Menu', 
      },
    }; 
 
  },
  provide: {
    grid: [Filter,Page]
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
   },
  mounted(){
  this.getdata()
  },
  methods:{
       load() {
      let rowHeight = this.$refs.grid.ej2Instances.getRowHeight(); //height of the each row
      let gridHeight = this.$refs.grid.height; //grid height
      let pageSize = this.$refs.grid.pageSettings.pageSize; //initial page size
      let pageResize = (gridHeight - pageSize * rowHeight) / rowHeight; //new page size is obtained here
      this.$refs.grid.pageSettings = { pageSize: pageSize + Math.round(pageResize) };
    },
    getdata(){
        axios.get(`http://localhost:8080/api/hodstudnets/${this.currentUser.college}/${this.currentUser.department}`).then(
          result => {
            console.log(result.data)
            this.students = result.data
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
      if(this.currentUser.roles!="ROLE_HOD")
       {
         this.logOut()
       }
    },
  }
};
</script>
<style>
@import "../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
  @import url("https://cdn.syncfusion.com/ej2/material.css");
  .e-grid *{
     font-size: 25px;
     text-align: left;
    
}
.e-grid .e-rowcell.customcss{
    font-size: 18px;
    padding-block: 18px;
    font-weight:300;
    
}
.e-grid .e-headercell.customcss {
    color: black;
    font-weight: bolder ;
    padding-block:15px ;
    background-color: rgb(245, 245, 245);
    
}
.e-grid .e-pager .e-currentitem,
.e-pager .e-currentitem:hover {
  background-color:lightblue;
  color:black ;
  font-weight: 500;
}

 #box{
  padding-top: 5%;
  padding-right:2% ;
  padding-left: 2%;
 
}
</style>