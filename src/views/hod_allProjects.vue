<template>
    <div id="app">

         
         <Page3></Page3>
         
        <div class="underNav">
        </div>
        
        <v-card style="margin: 30px 5% 30px 5%">
        <div>
            <br>
            <h1 style="text-align: center;"> PROJECTS {{this.dep}} </h1>  
            <hr>
            <div>
          <b-tabs pills content-class="mt-3" align="center">
            <div>
              <ejs-grid ref='grid'  allowPaging="true" :dataSource='data1' :load='load' allowFiltering='true' :filterSettings='filterOptions' :pageSettings='pageSettings' >
              <e-columns>
              <e-column
                field="Group_Name"
                headerText="GroupId"
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
                field="Company_name"
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
        data: [],
        data1:[],
        clg:'2',
        dep:'',
        stat:"",
        k : 0,
        pageSettings: { pageSize:5 },
        formatOptions: {type:'date', format:'dd/MM/yyyy'},
        customAttributes : {class: 'customcss'},
        filterOptions: { 
        ignoreAccent: true, // Uncomment this code to filter diacritic values
        type:'Menu', 
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
    "$route.params.depa": {
      handler() {
        location.reload();
        this.dep = this.$route.params.depa;
      },
    },
  },
  created() {
    this.stat = this.$route.params.stat;
    this.dep = this.$route.params.depa;
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
  this.loggedin()
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

      console.log(this.currentUser.college)
      console.log(this.currentUser.department);
        axios.get(`https://project-monitoring-backend.herokuapp.com/api/hodg/${this.currentUser.college}/${this.dep}`).then(
          result => {
            console.log(result.data)
            this.data = result.data
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
      if(this.currentUser.roles =="ROLE_HOD")
       {
        this.dep = this.currentUser.department;
         console.log(this.currentUser.department)
         
       }
       else if (this.currentUser.roles == "ROLE_DIRECTOR" ) {
        console.log("director");
      }
      else if( this.currentUser.roles == "ROLE_MANAGEMENT" ){
        console.log("management");
      }
      else{
        this.logOut();
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
.e-grid .e-pager .e-currentitem,
.e-pager .e-currentitem:hover {
  background-color:lightblue;
  color:black ;
  font-weight: 500;
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