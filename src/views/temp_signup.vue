<template>
<div id="app">  
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href class="navbar-brand" @click.prevent></a>
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
            <router-link to="/home" class="nav-link">
                <font-awesome-icon icon="home" />Home
            </router-link>
            </li>
        </div>

        <div v-if="!loggedIn" class="navbar-nav ml-auto">
            <li class="nav-item">
            <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" />Sign Up
            </router-link>
            </li>
            <li class="nav-item">
            <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" />Login
            </router-link>
            </li>
        </div>
    </nav>
    <br>
    <h1 style=" text-align:center "> GROUP DETAILS</h1>
    <div class="col-md-12" v-if="!addmemshow" >
        <div id="add-4" class="card card-container">
            <v-btn v-on:click=  "addmem(0)" v-if="(userarray[0] == '' )" >ADD LEADER</v-btn>
            <h3 v-else> Leader : {{ this.userarray[0]}} </h3>
            <br>
            <v-btn  v-on:click=  "addmem(1)" v-if="(userarray[1] == '' )" >ADD MEMBER 1</v-btn>
            <h3 v-else> Member : {{ this.userarray[1]}} </h3>
            <br>
            <v-btn  v-on:click=  "addmem(2)" v-if="(userarray[2] == '' )" >ADD MEMBER 2</v-btn>
            <h3 v-else> Member : {{ this.userarray[2]}} </h3>
            <br>
            <v-btn  v-on:click=  "addmem(3)" v-if="(userarray[3] == '' )" >ADD MEMBER 3</v-btn>
            <h3 v-else> Member : {{ this.userarray[3]}} </h3>
            <br> <br>
        </div>
        <div id='grpdet' class="card card-container">
          <!-- <div class="form-group">
              <label for="GRPTIT">PROJECT NAME</label>
          </div>
            <input v-model="groupname" type="text" class="form-control" /> -->
          <div class="form-group">
              <label for="college">College</label>
            </div>
            <select name="category_id" @change="onChange12($event)" v-model="collegeId" class="form-control">
              <option>--- Select College ---</option>
                <option v-for="(item , index) in colleges" v-bind:key="index" :value="item.College_id" >
                  {{item.College_Name}}
              </option>
          </select>

        <div class="form-group">
              <label for="department">Department</label>
            </div>
            <select name="category_id" @change="getdomains()"  v-model="departmentId" class="form-control">
              <option>--- Select Department ---</option>
                <option v-for="(item , index) in departments" v-bind:key="index" :value="item.Department_id" >
                  {{item.Department_Name}}
              </option>
            </select>
        
        <div class="form-group">
              <label for="guide">Guide</label>
            </div>
            <select name="guideid"  v-model="guide" class="form-control">
              <option>--- Select Guide---</option>
                <option v-for="(item , index) in allguides" v-bind:key="index" :value="item.Instructor_id" >
                  {{item.name}}
              </option>
            </select>
           <div class="form-group">
              <label for="projectType">TYPE OF PROJECT</label>
            </div>
            <select name="projecttypesel"  @change="onChange22($event)" v-model="protypes1" class="form-control">
              <option>--- Select Type---</option>
                <option v-for="(item , index) in protypes" v-bind:key="index" :value="index" >
                  {{item.actualtype}}
              </option>
            </select>
          <div v-if= 'issame' >
            <div class="form-group">
              <label for="companyName">Name of the Company</label>
        </div>
        <select name="company_id" @change="postCandC()"   v-model="companyId" class="form-control">
              <option>--- Select Company ---</option>
                <option v-for="(item , index) in allcompanies" v-bind:key="index" :value="item.Company_id" >
                  {{item.Company_name}}
              </option>
            </select>
        
            <div class="form-group">
              <label for="guideIndus">Industry Guide</label>
            </div>
            <select name="guideidIndus"  v-model="indusGuide" class="form-control">
              <option>--- Select Guide---</option>
                <option v-for="(item , index) in allguides" v-bind:key="index" :value="item.Instructor_id" >
                  {{item.name}}
              </option>
            </select>
          </div>
           
         
          <div class="form-group">
              <label for="finalDomain">Domain of project</label>
            </div>
            <select name="projectdomain" @change="getindus()" v-model="domain" class="form-control">
              <option>--- Select Type---</option>
                <option v-for="(item , index) in domains" v-bind:key="index" :value="item.id" >
                  {{item.name}}
              </option>
            </select>
            
          <v-btn v-on:click= "submitgroupdetail()" >SUBMIT</v-btn>
        </div>
    </div>

    <div id = "ADD_MEMBER " v-show="addmemshow" >
    <div class="col-md-12">
        <div class="card card-container">
        <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
        />
        <form name="form" @submit.prevent="handleRegister">
            <div>
            <div class="form-group">
                <label for="username">Username</label>
                <input
                v-model="user.username"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="username"
                />
                <div
                v-if="submitted && errors.has('username')"
                class="alert-danger"
                >{{errors.first('username')}}</div>
            </div>

            <div class="form-group">
                <label for="fullName">FullName</label>
                <input
                v-model="user.FullName"
                v-validate="'required|min:3|max:40'"
                type="text"
                class="form-control"
                name="fullName"
                />
                <div
                v-if="submitted && errors.has('fullName')"
                class="alert-danger"
                >{{errors.first('fullName')}}</div>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input
                v-model="user.email"
                v-validate="'required|email|max:50'"
                type="email"
                class="form-control"
                name="email"
                />
                <div
                v-if="submitted && errors.has('email')"
                class="alert-danger"
                >{{errors.first('email')}}</div>
            </div>
            <div class="form-group">
                <label for="grno_EmpCode">Grno_EmpCode</label>
                <input
                id = "GRNUMBER"
                v-model="user.grno_EmpCode"
                v-validate="'required|min:3|max:20'"
                type="string"
                class="form-control"
                name="grno_EmpCode"
                />
                <div
                v-if="submitted && errors.has('grno_EmpCode')"
                class="alert-danger"
                >{{errors.first('grno_EmpCode')}}</div>
            </div>
            <div class="form-group">
                <label for="mobile">Mobile</label>
                <input
                v-model="user.Mobile"
                v-validate="'required|min:3|max:20'"
                type="string"
                class="form-control"
                name="mobile"
                />
                <div
                v-if="submitted && errors.has('mobile')"
                class="alert-danger"
                >{{errors.first('mobile')}}</div>
            </div>

            <div class="form-group">
                <label for="college">College</label>
            </div>
            <select name="category_id" @change="onChange12($event)" v-model="user.college" class="form-control">
                <option>--- Select College ---</option>
                <option v-for="(item , index) in colleges" v-bind:key="index" :value="item.College_id" >
                    {{item.College_Name}}
                </option>
            </select>

        <div class="form-group">
                <label for="department">Department</label>
            </div>
            <select name="category_id"  v-model="user.department" class="form-control">
                <option>--- Select College ---</option>
                <option v-for="(item , index) in departments" v-bind:key="index" :value="item.Department_id" >
                    {{item.Department_Name}}
                </option>
            </select>

            <div class="form-group">
                <label for="password">Password</label>
                <input
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"
                />
                <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
                >{{errors.first('password')}}</div>
            </div>
            <div class="form-group">
                <label for="CNF-password">Confirm Password</label>
                <input
                v-model="cnfpassword"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="cnfpassword"
                />
                <div
                v-if="submitted && (this.user.password != this.cnfpassword) "
                class="alert-danger"
                >PASSWORD'S DOESN'T MATCH</div>
            </div>


            <div class="form-group">
                <button class="btn btn-primary btn-block">Sign Up</button>
            </div>
            </div>
        </form>

        <!-- <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
        >{{message}}</div> -->
        </div>
    </div>
    </div>
</div>
</template>

<script>
import User from '../models/user';
import axios from 'axios';
export default {
  name: 'Register',
  data() {
    return {
     user: new User('', '', ''),
     submitted: false,
     colleges:[],
     departments:[],
     typesproj:[],
     addmemshow: false ,
     userarray:['','','',''],
     leaderusername : "",
     member1username : "",
     member2username : "",
     member3username : "",
     currentuserid : "",
     groupname : "",
     typeProject:"",
     allguides:"",
     collegeId:"",
     departmentId:"",
     issame:false,
     clg:"",
     dep:"",
     guide:"",
     indusGuide:"2",
     domain:"",
     protypes1:"",
     protypes:"",
     proid:"",
     allcompanies:"",
     finalindusid:"",
     cnfpassword:"",
     companyId:'1',
     


successful: false,
      message: '',
      collges:''
      
    };
  },
  computed: {
  loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    
  },
  mounted() {
    this.getcolleges()
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
    axios.get('http://localhost:8080/api/guide').then(
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
    axios.get('http://localhost:8080/api/companies').then(
      response => {
        this.allcompanies = response.data;
      },
      error => {
        this.allcompanies =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );


  
  },
  methods: {
    getindus(){
      axios.get('http://localhost:8080/api/getindusid').then(
      response => {
        this.finalindusid = response.data[0].industry_project_id;
      },
      error => {
        this.allcompanies =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );





    },
    postCandC(){
      axios.post(`http://localhost:8080/api/postC&C/${this.companyId}/${this.collegeId}`);
    },
    submitgroupdetail(){
      axios.post(`http://localhost:8080/api/submitgrp`, {
          projectname: this.groupname,
          instructerid2: 2,
          instructerid1: this.guide,
          Instructor_id_industry:this.indusGuide,
          Department_id:this.departmentId,
          College_id:this.collegeId,
          final_domain:this.domain,
          Domain_Pref_1:9,
          Domain_Pref_2:10,
          Domain_Pref_3:11,
          Status_id:2,
          Project_Type_id:this.proid,
          Companyid : this.companyId,
          finalindusid:this.finalindusid,
          userarray : this.userarray
        }).then(
          this.userarray = ['','','',''], 
          this.groupname =this.guide = this.indusGuide = this.departmentId = this.collegeId =this.domain =this.protypes1 = this.companyId = "",
          alert("SUCESSFULLY ADDED")

        );
    },
    addmem(CID){
          this.addmemshow = true ;
          this.currentuserid = CID;
    },
    handleRegister() {
      this.user.roles = 1;
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid && (this.user.password == this.cnfpassword ) ) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.addmemshow = false ;
              this.userarray[this.currentuserid]= this.user.grno_EmpCode;
              this.submitted = false;

              this.user = new User('', '', '');
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });

    },
   onChange12(event) {
              this.department=[];
              this.typeProject = [];
              this.clg=event.target.value;
              this.getdepartments(this.clg);
              this.gettypes(this.clg)
          },
    onChange22(event){
      this.issame = (this.protypes[event.target.value].actualtype == "Industrial");
      this.proid =  this.protypes[this.protypes1].id;
    },
    getcolleges() {
        axios.get(`http://localhost:8080/api/college`).then(
          result => {
            console.log(result.data)
            this.colleges = result.data
            
          },
          error => {
            console.error(error)
          }
        )
    },
      getdepartments(cl) {
        axios.get(`http://localhost:8080/api/department/${cl}`).then(
          result => {
            console.log(result.data)
            this.departments = result.data
          },
          error => {
            console.error(error)
          }
        )
    },
      gettypes(cl){
        axios.get(`http://localhost:8080/api/types/${cl}`).then(
          result => {
            console.log(result.data)
            this.protypes = result.data
          },
          error => {
            console.error(error)
          }
        )

      },
      getdomains(){
        axios.get(`http://localhost:8080/api/getDomains/${this.collegeId}/${this.departmentId}`).then(
          result => {
            console.log(result.data)
            this.domains = result.data
          },
          error => {
            console.error(error)
          }
        ) 


      },
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 500px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 10px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

#app{
  width: 100%;
}
</style>