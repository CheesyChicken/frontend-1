import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return axios.post(API_URL + 'signup', {
      Person_Id:user.Person_Id,
      username: user.username,
      FullName: user.FullName,
      email: user.email,
      grno_EmpCode:user.grno_EmpCode,
      Mobile:user.Mobile,
      password: user.password,
      roles:user.roles,
      college:user.college,
      department:user.department
    });
  }
  /* temp_signup(user) {
    return axios.post(API_URL + 'signup', {
      Person_Id:user.Person_Id,
      username: user.username,
      FullName: user.FullName,
      email: user.email,
      grno_EmpCode:user.grno_EmpCode,
      Mobile:user.Mobile,
      password: user.password,
      roles:user.roles,
      college:user.college,
      department:user.department
    });
  } */
}

export default new AuthService();