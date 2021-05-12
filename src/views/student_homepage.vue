<template>
  <div id="app">
    <div>
      <Page1></Page1>
    </div>
    <div class="underNav"></div>
    <div style="text-align: center; padding-top: 5%">
      <b-alert show variant="primary"
        ><a class="alert-link"
          ><strong><i class="fa fa-warning"></i> Notification</strong>
          <marquee
            ><p>{{ message }}</p></marquee
          ></a
        ></b-alert
      >
    </div>
    <div id="box">
      <v-card>
        <div class="float-right" style="margin-left: 10px">
          <b-button
            variant="info"
            v-if="visible"
            :disabled="submited"
            @click="showModal5"
            v-b-tooltip.hover.bottom="
              'When the project committee enables FTR the FTR form opens up here '
            "
            >Fill FTR</b-button
          >
        </div>
        <div class="float-right" style="margin: 10px 3px 5px 0px">
          <b-button
            variant="primary"
            id="show-btn"
            @click="showModal"
            v-b-tooltip.hover.topleft="'Click here to add new task '"
            >Add New Task</b-button
          >
        </div>
        <b-tabs pills content-class="" align="left">
          <b-tab title="Tasks" active>
            <b-card-text>
              <div>
                <form v-on:submit.prevent="addNewTask">
                  <b-modal ref="my-modal" centered hide-footer title="Add New Task">
                    <div class="col-xs-6">
                      <label for="ex3">Task:</label>
                      <b-form-textarea
                        id="textarea-small"
                        v-model="taskname"
                        margin="2"
                        size="sm"
                        required
                      ></b-form-textarea>
                    </div>
                    <div>
                      <label for="allotedToinput">Allot To :</label>
                      <b-form-input disabled v-model="FullName"></b-form-input>
                    </div>
                    <div>
                      <label for="example-datepicker">Due Date</label>
                      <b-form-datepicker
                        id="example-datepicker"
                        v-model="valueDate"
                        :min="mins"
                        :max="maxs"
                        class="mb-1"
                      ></b-form-datepicker>
                    </div>
                    <b-button
                      type="submit"
                      class="mt-2"
                      variant="outline-success"
                      block
                      @click="newtask"
                      >Submit</b-button
                    >
                    <b-button
                      class="mt-3"
                      variant="outline-danger"
                      block
                      @click="hideModal"
                      >Cancel</b-button
                    >
                  </b-modal>
                </form>
              </div>

              <div>
                <b-modal
                  id="modal-center5"
                  ref="my-modal5"
                  hide-footer
                  centered
                  title="FTR Form"
                >
                  <div class="col-lg-12">
                    <label>Date:{{ current_date | formatDate }}</label>
                  </div>
                  <div class="col-lg-12">
                    <label for="ex3">Project ID:{{ group_id }} </label>
                  </div>
                  <div class="col-lg-12">
                    <label for="ex3"
                      >Project Title :
                      <router-link
                        :to="{
                          name: 'Project Details',
                          params: { id: group_id },
                        }"
                        >{{ groupname }}</router-link
                      ></label
                    >
                  </div>
                  <div>
                    <table class="table2">
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr v-for="(ftr, index) in ftrs" v-bind:key="ftr.question_id">
                        <td>{{ ++index }}.{{ ftr.question_text }}</td>
                        <td>
                          <select
                            name="category_id"
                            v-model="ftr.Answer"
                            style="width: 70px"
                            class="form-control"
                          >
                            <option v-for="s in sel" v-bind:key="s.id">
                              {{ s }}
                            </option>
                          </select>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <label>Remarks:</label>
                  <b-form-textarea
                    id="textarea-small"
                    disabled
                    margin="2"
                    size="sm"
                  ></b-form-textarea>
                  <div class="col-lg-12">
                    <label>Name of Guide:{{ GuideName }}</label>
                  </div>
                  <div class="col-lg-12">
                    <label>Date: {{ dates | formatDate }}</label>
                  </div>
                  <div class="float-right">
                    <b-button
                      type="submit"
                      style="margin-right: 10px"
                      variant="primary"
                      @click="submitFTR(ftrs)"
                      >Submit</b-button
                    >
                    <b-button
                      style="margin-right: 10px"
                      variant="danger"
                      @click="hideModal5"
                      >Cancel</b-button
                    >
                  </div>
                </b-modal>
              </div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Task</th>
                    <th>Alloted To</th>
                    <th>Due Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(todo, index) in todos" v-bind:key="todo.Task_id">
                    <td>{{ ++index }}</td>
                    <td>{{ todo.Task_Name }}</td>
                    <td>{{ todo.FullName }}</td>
                    <td>{{ todo.Due_Date | formatDate }}</td>
                    <td>
                      <button
                        class="btn btn-danger"
                        v-b-tooltip.hover.topleft="'Click here to take up this task '"
                        @click="deleteTask(todo.Task_id)"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card-text></b-tab
          >
          <b-tab title="Ongoing Tasks"
            ><b-card-text>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Task</th>
                    <th>Alloted To</th>
                    <th>Start Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <b-modal ref="my-modal2" hide-footer title="Add Details">
                  <div class="col-xs-6">
                    <label for="ex3">Description:</label>
                    <b-form-textarea
                      name="des"
                      id="txt11"
                      size="sm"
                      v-model="description"
                      placeholder="How did u do? What approach?"
                    >
                    </b-form-textarea>
                  </div>

                  <b-button class="mt-2" variant="outline-success" block @click="addtask"
                    >Submit</b-button
                  >

                  <b-button
                    class="mt-3"
                    variant="outline-danger"
                    block
                    @click="hideModal1"
                    >Cancel</b-button
                  >
                </b-modal>
                <tbody>
                  <tr v-for="(doing, index) in doings" v-bind:key="doing.Task_id">
                    <td>{{ ++index }}</td>
                    <td>{{ doing.Task_Name }}</td>
                    <td>{{ doing.FullName }}</td>
                    <td>{{ doing.Start_date | formatDate }}</td>
                    <td>{{ doing.Due_Date | formatDate }}</td>
                    <td>{{ doing.Status }}</td>
                    <td>
                      <b-button
                        id="show-btn"
                        variant="info"
                        v-b-tooltip.hover.top="'Click here to add details of the task'"
                        @click="showModal1(doing.Task_id)"
                        >Add Details</b-button
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card-text></b-tab
          >

          <b-tab title="Rejected Tasks"
            ><b-card-text>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Task</th>
                    <th>Alloted To</th>
                    <th>Start Date</th>
                    <th>New Due Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <div>
                  <b-modal ref="my-modal1" hide-footer title="Add Details">
                    <div class="col-xs-6">
                      <label for="ex3">Description:</label>
                      <b-form-textarea
                        name="des"
                        id="txt11"
                        size="sm"
                        v-model="description"
                        placeholder="How did u do? What approach?"
                      >
                      </b-form-textarea>
                    </div>
                    <b-form-checkbox
                      v-model="checked"
                      id="chek"
                      size="md"
                      value="true"
                      unchecked-value="false"
                      >Difficulties faced?</b-form-checkbox
                    >
                    <div class="col-xs-6">
                      <input
                        v-if="checked"
                        class="form-control"
                        id="ex3"
                        name="dif"
                        type="text"
                        v-model="difficulties"
                        placeholder="Mention difficulties faced"
                      />
                    </div>

                    <b-button
                      class="mt-2"
                      variant="outline-success"
                      block
                      @click="addtask"
                      >Submit</b-button
                    >

                    <b-button
                      class="mt-3"
                      variant="outline-danger"
                      block
                      @click="hideModal1"
                      >Cancel</b-button
                    >
                  </b-modal>
                </div>
                <tbody>
                  <tr v-for="(reject, index) in rejects" v-bind:key="reject.Task_id">
                    <td>{{ ++index }}</td>
                    <td>{{ reject.Task_Name }}</td>
                    <td>{{ reject.FullName }}</td>
                    <td>{{ reject.Start_date | formatDate }}</td>
                    <td>{{ reject.Due_Date | formatDate }}</td>
                    <td>{{ reject.Reason }}</td>
                    <td>{{ reject.Status }}</td>
                    <td>
                      <b-button
                        id="show-btn"
                        v-b-tooltip.hover.topleft="
                          'Click here to add details of the task redone '
                        "
                        @click="showModal1(reject.Task_id)"
                        >Add Details</b-button
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card-text></b-tab
          >

          <b-tab title="Completed Tasks"
            ><b-card-text>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Task</th>
                    <th>Start Date</th>
                    <th>Approve Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(done, index) in dones" v-bind:key="done.Task_id">
                    <td>{{ ++index }}</td>
                    <td>{{ done.Task_Name }}</td>
                    <td>{{ done.Start_date | formatDate }}</td>
                    <td>{{ done.Approved_Date | formatDate }}</td>
                    <td>{{ done.Status }}</td>
                  </tr>
                </tbody>
              </table>
            </b-card-text></b-tab
          >
        </b-tabs>
      </v-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import moment, { max } from "moment";
import Page1 from "./page1";
export default {
  components: {
    Page1,
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      checked: false,
      valueDate: "",
      selected2: null,
      taskname: "",
      todos: [],
      doings: [],
      dones: [],
      rejects: [],
      mins: "",
      maxs: "",
      imp: "",
      difficulties: "",
      description: "",
      def: "",
      gi: "",
      group_id: "",
      current_date: new Date(),
      Ftrno: "",
      dates: "",
      date1: "",
      message: "",
      ftr: [],
      ftr1: [],
      ftrs: [],
      date2: "",
      clg: 2,
      visible: false,
      sel: ["YES", "NO"],
      selr: [],
      submited: false,
      FullName: "",
      groupname: "",
      GuideName: "",
      checktask: false,
    };
  },
  mounted() {
    this.loggedin();
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      this.getform(this.currentUser.Person_Id);
      /* if (this.currentUser.roles != "ROLE_M") {
        this.logOut();
      }*/
    },
    toast(type, toaster, append = false) {
      console.log("Toast Called");
      this.$bvToast.toast(`${toaster}`, {
        title: `${type}`,
        toaster: "b-toaster-bottom-center",
        solid: true,
        appendToast: append,
      });
    },
    makeShow() {
      this.show = !this.show;
    },
    getFTR12(NO) {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/ftrquestions/${NO}`).then(
        (result) => {
          console.log(result.data);
          this.ftrs = result.data;
          this.ftrs.forEach((element) => {
            element["Answer"];
          });
          this.date12 = moment(this.dates).format("DD-MM-YYYY");
          this.message = `FTR ${this.Ftrno} is Enabled.Due Date of FTR is ${this.date12}.Please Fill FTR`;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    issubmitted(NO) {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/ftrproject/${NO}/${this.group_id}`).then(
        (result) => {
          console.log("submitted");
          console.log(result.data);
          var submited = result.data;
          var date = moment(submited[0].Submit_Date).format("DD-MM-YYYY");
          if (submited.length > 0) {
            if (submited[0].Submit_Date) {
              this.visible = false;
              this.message = `FTR ${this.Ftrno} is Submitted on ${date}.`;
            }
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },

    getFTR() {
      axios
        .get(
          `https://project-monitoring-backend.herokuapp.com/api/ftrmaster/${this.currentUser.college}/${this.currentUser.department}`
        )
        .then(
          (result) => {
            console.log("FTR");
            console.log(result.data);
            this.ftr1 = result.data;
            for (let i = 0; i < this.ftr1.length; i++) {
              if (this.ftr1[i].Due_date) {
                this.dates = this.ftr1[i].Due_date;
                this.Ftrno = this.ftr1[i].ftr_master_id;
                this.date1 = moment(this.dates).format("YYYYMMDD");
                this.date2 = moment(this.current_date).format("YYYYMMDD");
                if (Number(this.date1) >= Number(this.date2)) {
                  this.visible = true;
                  this.getFTR12(this.Ftrno);
                  this.issubmitted(this.Ftrno);
                } else {
                  this.message = "No Message";
                  this.visible = false;
                }
              }
            }
          },
          (error) => {
            console.error(error);
          }
        );
    },
    getTasks() {
      this.FullName = this.currentUser.FullName;
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/task/${this.group_id}`).then(
        (result) => {
          console.log(result.data);
          var toso = result.data;
          if (toso[0]) {
            this.showModal2();
          }
          this.todos = toso[1];
          this.mins = toso[2];
          this.maxs = toso[3];
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getform(gi) {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/getstartdate/${gi}`).then(
        (result) => {
          console.log(result.data);
          var tos = result.data;
          this.group_id = tos[0].Group_id;
          if (!tos[0].startDate) {
            this.$router.push("/Starting");
          }
          this.getTasks();
          this.getGroupData();
          this.getDoings();
          this.getRejects();
          this.getDones();
          this.getFTR();
          this.getTaskstatus();
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getTaskstatus() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/task_status`).then(
        (result) => {
          console.log(result.data);
          this.tod = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getDoings() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/doing/${this.group_id}`).then(
        (result) => {
          console.log(result.data);
          var dos = result.data;
          this.doings = dos[1];
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getGroupData() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/groups/${this.group_id}`).then(
        (result) => {
          console.log("groups");
          console.log(result.data);
          var groupid = result.data;
          var groupids = groupid[0];
          this.groupname = groupids[0].Group_Name;
          this.GuideName = groupids[0].Guidename;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getRejects() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/reject/${this.group_id}`).then(
        (result) => {
          console.log(result.data);
          var rej = result.data;
          this.rejects = rej[1];
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getDones() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/done/${this.group_id}`).then(
        (result) => {
          console.log(result.data);
          var dons = result.data;
          this.dones = dons[1];
        },
        (error) => {
          console.error(error);
        }
      );
    },
    newtask() {
      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/task/${this.group_id}`, {
          taskname: this.taskname,
          allotedTo: this.currentUser.Person_Id,
          DueDate: this.valueDate,
        })
        .then((res) => {
          this.taskname = "";
          this.selected2 = "";
          this.valueDate = "";
          this.getTasks();
          this.hideModal();
          console.log(res);
          this.toast("Success", "Task Added Successfully ", true);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/week/${this.group_id}`, {
          DueDate: this.valueDate,
        })
        .then(
          (result) => {
            console.log(result.data);
            this.week = result.data;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    setSelected(tab) {
      this.selected = tab;
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    showModal2() {
      this.$refs["my-modal2"].show();
    },
    showModal5() {
      this.$refs["my-modal5"].show();
    },
    showModal1(SN) {
      this.$refs["my-modal1"].show();
      this.imp = SN;
    },
    hideModal() {
      (this.taskname = ""),
        (this.valueDate = ""),
        (this.selected2 = ""),
        this.$refs["my-modal"].hide();
    },
    hideModal1() {
      this.$refs["my-modal1"].hide();
    },
    hideModal2() {
      this.$refs["my-modal2"].hide();
    },
    hideModal5() {
      this.$refs["my-modal5"].hide();
    },
    deleteTask(SN) {
      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/doing/${this.group_id}`, {
          SerialName: SN,
        })
        .then((res) => {
          this.getTasks();
          this.getDoings();
          this.hideModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitFTR(ftrs) {
      var count = Object.keys(ftrs).length;
      console.log(ftrs);
      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/ftranswer`, {
          groupid: this.group_id,
          ftr: this.ftrs,
          cout: count,
        })
        .then((res) => {
          this.getFTR();
        });
      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/ftrproject`, {
          groupid: this.group_id,
          ftrno: this.Ftrno,
        })
        .then((res) => {
          this.getFTR();
        });

      this.hideModal5();
    },
    addtask() {
      axios
        .post(`https://project-monitoring-backend.herokuapp.com/api/submit/${this.group_id}`, {
          SerialName: this.imp,
          TaskDetails: this.description,
          Challenges: this.difficulties,
        })
        .then((res) => {
          (this.description = ""), (this.difficulties = "");
          this.getDoings();
          this.getRejects();
          console.log(res);
          this.toast("Success", "Details Added Successfully", true);
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModal1();
    },
  },
};
</script>
<style scoped>
#box {
  padding-top: 2%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
