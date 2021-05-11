import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import temp_signup from './views/temp_signup.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/facultyregister',
      name: 'FacultyRegister',
      component: () => import('./views/FacultyRegister.vue')
    },
    {
      path : '/temp_signup',
      component: temp_signup
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('./views/page1.vue')
    },
    {
      path: '/student/home',
      name: 'Student Home',
      component: () => import('./views/student_homepage.vue')
    },
    {
      path: '/student/alltask',
      name: 'Student Task',
      component: () => import('./views/student_allTasks.vue')
    },
    {
      path: '/student/PD/:id',
      name: 'Project Details',
      component: () => import('./views/student_projectDetails.vue')
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('./views/page2.vue')
      
    },
    {
      path: '/guide/home',
      name: 'Guide Home',
      component: () => import('./views/guide_home.vue')
    },
    {
      path: '/guide/homepage/:id',
      name: 'Guide HomePage',
      component: () => import('./views/guide_homepage1.vue')
    },
    {
      path: '/guide/alltask/:id',
      name: 'Guide allTask',
      component: () => import('./views/guide_allTasks.vue')
    },
    {
      path: '/guide/PD/:id',
      name: 'Guide Project Details',
      component: () => import('./views/guide_projectDetails.vue')
    },
    {
      path: '/hod',
      name: 'hod',
      component: () => import('./views/page3.vue')
      
    },
    {
      path: '/hod/home',
      name: 'HOD Home',
      component: () => import('./views/hod_homepage.vue')
    },
    {
        
      path: '/hod/allproject/:stat/:depa',
      name: 'HOD allTask',
      component: () => import('./views/hod_allProjects.vue')
    },
    {
        path: '/hod/allstudents',
        name: 'HOD AllStudent',
        component: () => import('./views/hod_allStudents.vue')
      },
      {
        path: '/hod/hodedit',
        name: 'HOD EDIT',
        component: () => import('./views/hod_editgrp.vue')
      },
   /*  {
      path: '/hod/PD',
      name: 'HOD Project Details',
      component: () => import('./views/hod_projectDetails.vue')
    }, */
    {
      path: '/director',
      name: 'director',
      component: () => import('./views/page4.vue')
    },
    {
      path: '/director/home',
      name: 'Director Home',
      component: () => import('./views/director_homepage.vue')
    },
    {
      path: '/director/allProjects',
      name: 'Director allProjects',
      component: () => import('./views/director_allProjects.vue')
    },
     {
        path: '/directorPD/:id',
        name: 'Director Project Details',
        component: () => import('./views/director_projectDetails.vue')
      },
 
    {
      path: '/director/hods/:dep',
      name: 'Director HOD',
      component: () => import('./views/director_hod.vue')
    },
    {
        path: '/director/table/:sts',
        name: 'Director table',
        component: () => import('./views/table.vue')
      },
    {
        path: '/management',
        name: 'Management ',
        component: () => import('./views/page5.vue')
      },
      {
        path: '/management/allProjects/:stat',
        name: 'Management AllProjects ',
        component: () => import('./views/management_allprojects.vue')
      },
      {
        path: '/management/addcompany',
        name: 'Management addcompany ',
        component: () => import('./views/management_addcompany.vue')

      },
    {
        path: '/management/home',
        name: 'Management Home',
        component: () => import('./views/management_homepage.vue')
      },
      {
        path: '/management/director/:clg',
        name: 'Management Director',
        component: () => import('./views/managment_director.vue')
      },
      {
        path: '/management/hod/:dep',
        name: 'Management HOD',
        component: () => import('./views/managment_hod.vue')
      },
    {
      path: '/FTRHOME',
      name: 'FTRHOME',
      component: () => import('./views/ftrhome.vue')
    },
    {
        path: '/starting',
        name: 'Starting',
        component: () => import('./views/startingform.vue')
      },
      {
        path: '/startingerror',
        name: 'Starting Error',
        component: () => import('./views/Startingerror.vue')
      },
      {
        path: '/guideprofile',
        name: 'Guide Profile',
        component: () => import('./views/profile2.vue')
      },
      {
        path: '/startingmember',
        name: 'Starting',
        component: () => import('./views/StartingForm2.vue')
      },
      
  ]

});
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home','/temp_signup','/facultyregister'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });