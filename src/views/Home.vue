<template>
  <div id="app">
    <header class="jumbotron">
      <h3>  {{content}}  </h3>
          <router-link to="/login" class="nav-link">
            <font-awesome-icon left icon="sign-in-alt" />Login
          </router-link>
          <!-- <router-link to="/register" class="nav-link">
            <font-awesome-icon  icon="user-plus"  />Sign Up
          </router-link> -->
          <router-link to="/temp_signup" class="nav-link">
            <font-awesome-icon  icon="user-plus"  />GROUP Sign Up
          </router-link>
          <router-link to="/facultyregister" class="nav-link">
            <font-awesome-icon  icon="user-plus"  />Faculty Sign Up
          </router-link>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';
export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
<style scoped>
#app{
  padding-top: 5%;
  padding-right: 5%;
  padding-left: 5%;
  width: 100%;
}
</style>