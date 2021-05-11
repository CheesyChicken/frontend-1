import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getStudentBoard() {
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }
  

  getGuideBoard() {
    return axios.get(API_URL + 'guide', { headers: authHeader() });
  }

  getHodBoard() {
    return axios.get(API_URL + 'hod', { headers: authHeader() });
  }
  
  getDirectorBoard() {
    return axios.get(API_URL + 'director', { headers: authHeader() });
  }

  getManagementBoard() {
    return axios.get(API_URL + 'management', { headers: authHeader() });
  }

  getCoordinatorBoard() {
    return axios.get(API_URL + 'coordinator', { headers: authHeader() });
  }
}

export default new UserService();