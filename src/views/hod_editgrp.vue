<template>

<div id="app">

  <div>
      <Page3></Page3>
  </div>
   <v-dialog  v-model="dialog2"  max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">UPDATE GROUP DETAILS</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.Group_Name" filled outlined disabled label="Group ID :" ></v-text-field>
                    </v-row>
                    <v-row cols="12" sm="6" md="4">
                        <v-autocomplete label="Domain" :items="domain" item-text="Domain_Name" item-value="Domain_id" v-model="editedItem.final_domain"></v-autocomplete>
                      </v-row>
                         <v-row cols="12" sm="6" md="4">                          
                        <v-autocomplete v-model="editedItem.instructor1" label="Faculty :"  :items="allguides" item-text="name" item-value="Instructor_id">  </v-autocomplete>  
                      </v-row>
                      <v-row cols="12" sm="6" md="4">                          
                        <v-autocomplete v-model="editedItem.instructor2" label="Industry Guide (if any) :"  :items="allguides" item-text="name" item-value="Instructor_id">  </v-autocomplete>  
                      </v-row> 
                      
                      
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn   color="blue darken-1"  text  @click="close">  Cancel  </v-btn>
                  <v-btn  color="blue darken-1"   text  @click="updateItem" >  Save  </v-btn>   
                </v-card-actions>
              </v-card>
            </v-dialog>










    <!-- GROUP TABLE  -->
    <h1 style="text-align:center" >GROUPS </h1>
    <!-- <h1>{{content}}</h1> -->
    <v-simple-table class="table table-dark" id="table" >
      <thead class="thead">
        <tr>
          <th>ID</th>
          <th>TITLE</th>
          <th>BRANCH</th>
          <th>GUIDE</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          :key="item.ID"
        >
          <td>{{ item.Group_Name }}</td>
          <td>{{ item.Group_title }}</td>
          <td>{{ item.Department_Name }}</td>
          <td>{{ item.FullName }}</td>
          <td><v-btn color="primary" :disabled='visible' v-on:click = "editVisible(item)"> <v-icon >mdi-account-edit</v-icon>  </v-btn></td>
          <td><v-btn color="primary" :disabled='visible' v-on:click = "deleteEntry(item)"> <v-icon >mdi-delete</v-icon> </v-btn></td>
        </tr>
      </tbody>  
  </v-simple-table>
  
  <br><br><br>


</div>
</template>



<script>
import axios from 'axios';
import Page3 from "./page3";
/* import { mdiAccountEdit  } from '@mdi/js'; */
//import Vue from "vue";
export default {
  components: {
    Page3,
    },
    data: ()=> {
        return{
            data: [],
            dialog2:false,
            domain:"",
            editedIndex: -1,
            editedItem: {
              Group_Name:null,
              final_domain:null,
              instructor1:null, 
              instructor2:null,
              grno_EmpCode:null
            },

        };
        

    },
    mounted(){
      this.loggedin()
      this.getdata()
        
    },
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    },
    methods:{
        getdata(){
            //${this.currentUser.college}/${this.currentUser.department}
            axios.get(`https://project-monitoring-backend.herokuapp.com/api/hodg/${this.currentUser.college}/${this.currentUser.department}`).then(
                result => {
                    console.log(result.data)
                    this.data = result.data
                    },
                error => {
                    console.error(error)
                }
            )
            axios.get(`https://project-monitoring-backend.herokuapp.com/api/domain/${this.currentUser.department}`).then(
              result =>{
                this.domain = result.data
              },
              error =>{
                console.log(error);
              }

            )
            axios.get('https://project-monitoring-backend.herokuapp.com/api/guide').then(
              response => {
                this.allguides = response.data;
              },
              error => {
                this.allguides =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              }
          );

        },
        deleteEntry(grpdata){
          var id = grpdata.Group_id;
          console.log(id);
          axios.post(`https://project-monitoring-backend.herokuapp.com/api/hod/delete/${id}`);
          location.reload()
          //alert(grpdata.Group_Name)
        },
        editVisible(grpdata){
          var id = grpdata.Group_id;
          this.editedItem.Group_Name =  grpdata.Group_Name;
          this.editedItem.final_domain = grpdata.final_domain;
          this.editedItem.instructor1 = grpdata.Instructor_id1;
          this.editedItem.instructor2 = grpdata.Instructor_id2;

          this.dialog2 = true
          console.log(id);

        },
        updateItem(){
          //console.log(this.editedItem.final_domain+this.editedItem.instructor1+this.editedItem.instructor2)
          axios.put('https://project-monitoring-backend.herokuapp.com/api/updategrp',this.editedItem)
          alert("SUCCESSFUL")
          this.dialog2 = false
          location.reload()
          
          

        },
        close(){
          this.dialog2 = false
          this.dialog = false
        },
        loggedin() {
        if (this.currentUser.roles != "ROLE_HOD") {
          console.log("OKAYS");
          this.logOut();
      }
      
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
        
    }



}
</script>

