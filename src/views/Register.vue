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
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
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
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form> 

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div> 
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
  
  },
  methods: {
    handleRegister() {
      this.user.roles = 1;
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
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
              var clg=event.target.value;
              this.getdepartments(clg)

              
          },
    getcolleges() {
        axios.get(`https://project-monitoring-backend.herokuapp.com/api/college`).then(
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
        axios.get(`https://project-monitoring-backend.herokuapp.com/api/department/${cl}`).then(
          result => {
            console.log(result.data)
            this.departments = result.data
          },
          error => {
            console.error(error)
          }
        )
    }
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
  margin-top: 50px;
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