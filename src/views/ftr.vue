<template>
  <div>
       
  
       <div class="underNav">
        </div>
        
         <v-card>
        <div class="container-fluid">
          <b-tabs pills content-class="" align="left">
   <b-button id="show-btn" @click="showModal1">Schedule FTR</b-button>
    <b-button id="show-btn" @click="showModal">Enable FTR</b-button>
    <b-modal scrollable ref="my-modal1" hide-footer title="Schedule FTR">
          <label>FTR Number</label>
            <b-form-input type="number" v-model="ftrn[0]" placeholder="Enter FTR Number"></b-form-input>
            <label>FTR Name</label>
            <b-form-input v-model="ftrn[1]" placeholder="Enter FTR Name"></b-form-input>
            <label>Academic Year </label>
            <b-form-input v-model="ftrn[2]" placeholder="For Example 2019-2020"></b-form-input>
            <label>No of Questions </label>
            <b-form-input type="number" v-model="ftrn[3]" placeholder="For Example 1 2 5 10"></b-form-input>
             <label>Semester  </label>
           <select name="category_id" @change="onChange1($event)" class="form-control">
               <option>--- Select Semester ---</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
           </select>
            <label>College </label>
            <b-form-input disabled v-model="college"></b-form-input>
         <label>Department </label>
         <b-form-input disabled v-model="department"></b-form-input>
        
      <b-button class="mt-2" variant="outline-success" block @click="EnableFTR">Enable FTR</b-button>
    
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal1">Cancel</b-button>
    </b-modal> 

  
        
         <b-modal scrollable ref="my-modal" hide-footer title="Schedule FTR">
  <v-card>
    <select name="category_id" @change="onChange12($event)" class="form-control">
     <option>--- Select FTR ---</option>
     <option v-for="(item , index) in ftrmst" v-bind:key="index" :value="item.ftr_master_id">
            {{item.ftr_name}}
       </option>
  </select>
  </v-card>
  <br>
  <v-card>
            <label>FTR Number : </label>
            <label>{{ftrnum}}</label> 
          </v-card>  
          <br>
          <v-card>
            <label>Academic Year  : </label>
           <label>{{ay}}</label>
           </v-card>
           <br>
<v-card>
             <label>Semester  :</label>
              <label>{{semester}}</label> 
              </v-card>
              <label for="">Questions: </label>
           <div v-for="(ftr,index) in ques" v-bind:key="ftr.id">
                {{++index}}.
                <v-card>
                <b-form-textarea  class="col-lg-12" id="ex3"  placeholder="Yes/No Type Questions " v-model="ftr.question"></b-form-textarea>
                </v-card>
              </div> 
                <label for="example-datepicker">Due Date of FTR</label>
      <v-card><b-form-datepicker id="example-datepicker" :min="min" :max="max" v-model="values" class="mb-1"></b-form-datepicker>   </v-card>
      <b-button class="mt-2" variant="outline-success" block @click="postFTRques">Enable FTR</b-button> 
    
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>
    </b-modal> 
          </b-tabs>
  </div>
      

</v-card>
  </div>
</template>

<script>
import axios from 'axios'
//import Page1 from './student/page1'
export default{
    components: {
    
  },
    data(){
      const mindate =new Date()
      const maxdata=new Date()
      mindate.setDate(mindate.getDate()+3)
      maxdata.setDate(maxdata.getDate()+15)
       return{
            
            ftrs:[],
            ftrn:[],
            ques:[],
            ftr:"",
            min:mindate,
            max:maxdata,
            values:'',
            ftrname:'',
            sem:'',
            college:'',
            ftrmast:'',
            semester:'',
            ay:'',
            ftrnum:'',
            nqus:"",
            department:'',
            ftrmst:[]

       }
    },
    mounted(){
         this.GetFTR()
         this.loggedin()
         this.getcolleges()
         this.getdepartments()
    },
    computed:{
      currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
    },
        methods:{
          onChange(event) {
              this.ftr=event.target.value;
          },
          onChange1(event) {
              this.sem=event.target.value; 
          },
          onChange12(event) {
              this.semester='',
              this.ay='',
              this.ftrnum='',
              this.ques=[] 
              this.ftrname=event.target.value;
              this.semester=this.ftrmast[this.ftrname-1].sem;
              this.ay=this.ftrmast[this.ftrname-1].ay;
              this.ftrnum=this.ftrmast[this.ftrname-1].ftr_number; 
              this .nqus=this.ftrmast[this.ftrname-1].No_of_Questions;
              this.GetFTR()
          },
          showModal() {
        this.$refs['my-modal'].show()
      },
      showModal1() {
        this.$refs['my-modal1'].show()
      },
       hideModal()
      {
              this.semester='',
              this.ay='',
              this.ftrnum='',
              this.ques=[],
              this.values='', 
        this.$refs['my-modal'].hide()
      },
       hideModal1()
      {
        this.ftrn=[]
        this.clg=""
        this.sem=""
        this.$refs['my-modal1'].hide()
      },
      
     GetFTR()
     {
         axios.get(`http://localhost:8080/api/ftrmaster/${this.currentUser.college}/${this.currentUser.department}`).then(
          result => {
            console.log(result.data)
            this.ftrmast = result.data
            for(let i=0,j=0;i<this.ftrmast.length ;i++)
            {
              if(!this.ftrmast[i].Due_date){
              this.ftrmst[j]=this.ftrmast[i];
               j++;
             }
            }
          },
          error => {
            console.error(error)
          }
        )
          
           for(let i=0;i<this.nqus;i++)
          {
           
             var feed = {"question":''};
            this.ques.push(feed); 
          } 
     },

     EnableFTR(){
         axios.post(`http://localhost:8080/api/ftrmaster`,{
         FTRS:this.ftrn,
         college:this.currentUser.college,
         semester:this.sem,
         department:this.currentUser.department,
        }).then(
          result => {
            console.log(result.data)
            this.ftrs = result.data
          },
          error => {
            console.error(error)
          }
        )
           this.hideModal1()
           this.GetFTR()
          
     },
     putFTR(){
      
         axios.put(`http://localhost:8080/api/ftrmaster`,{
         date:this.values,
         ft:this.ftrname,
        }).then(
          result => {
            console.log(result.data)
            this.ftrs = result.data
          },
          error => {
            console.error(error)
          }
        )
           this.hideModal1()
           this.GetFTR()
     },

     postFTRques(){
       var count=Object.keys(this.ques).length
       axios.post(`http://localhost:8080/api/ftrquestions`,{
         Ques:this.ques,
         ftno:this.ftrname,
         cout:count
        }).then(
          result => {
            console.log(result.data)
            this.ftrs = result.data
          },
          error => {
            console.error(error)
          }
        )
          this.putFTR()
          this.hideModal()
          
     },
      getcolleges() {
        axios.get(`http://localhost:8080/api/college`).then(
          result => {
            console.log(result.data)
             var colleges = result.data
              colleges.forEach(element => {
                if(element.College_id==this.currentUser.college)
                {
                  this.college=element.College_Name;
                }
                   
              });
          },

          error => {
            console.error(error)
          }
        )
    },
      getdepartments() {
        axios.get(`http://localhost:8080/api/department/${this.currentUser.college}`).then(
          result => {
            console.log(result.data)
            var departments = result.data
             departments.forEach(element => {
                if(element.Department_id==this.currentUser.department)
                {
                  this.department=element.Department_Name;
                }
                   
              });
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

      if(this.currentUser.roles!="ROLE_HOD" )
       {
         this.logOut()
       }
    },
       
        }
      }
</script>

<style>

</style>

  