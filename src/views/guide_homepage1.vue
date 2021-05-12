<template>
  <div id="app">
    <div>
      <Page2></Page2>
    </div>
    <div class="underNav"></div>
    <div style="text-align: center; padding-top: 3%">
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
        <div>
          <div class="col-1" style="padding-left: 5px">
            <b-dropdown
              v-if="grop"
              variant="info"
              id="dropdown-offset"
              offset="25"
              text="Select Project"
              class="m-2"
              v-b-tooltip.hover.top="'Click here to switch project'"
            >
              <b-dropdown-item v-for="(item, index) in person" v-bind:key="index">
                <router-link
                  :to="{
                    name: 'Guide HomePage',
                    params: { id: item.Group_id },
                  }"
                  >{{ item.Group_Name }}</router-link
                ></b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div></div>
          <div class="float-right">
            <b-button
              variant="primary"
              class="btn"
              @click="showModal"
              v-b-tooltip.hover.topleft="'Click here to add new task'"
              >Add New Task</b-button
            >
            <div class="float-right" style="margin-left: 10px">
              <b-button
                variant="danger"
                v-if="visible"
                @click="showModal5"
                v-b-tooltip.hover.topleft="
                  'When the project committee enables FTR the FTR form opens up here '
                "
                >Fill FTR</b-button
              >
            </div>
          </div>

          <div>
            <form v-on:submit.prevent="addNewTask">
              <b-modal ref="my-modal" centered hide-footer title="Add New Task">
                <div class="col-xs-6">
                  <label for="ex3">Task:</label>
                  <v-card>
                    <b-form-textarea
                      id="textarea-small"
                      v-model="taskname"
                      margin="2"
                      size="sm"
                    ></b-form-textarea>
                  </v-card>
                </div>

                <label for="allotedToinput">Allot To :</label>
                <v-card>
                  <select
                    name="category_id"
                    @change="onChange21($event)"
                    class="form-control"
                  >
                    <option>----Select Student----</option>
                    <option
                      v-for="(item, index) in std"
                      v-bind:key="index"
                      :value="item.Person_id"
                    >
                      {{ item.FullName }}
                    </option>
                  </select>
                </v-card>
                <div>
                  <label for="example-datepicker">Due Date</label>
                  <v-card>
                    <b-form-datepicker
                      id="example-datepicker"
                      v-model="valueDate"
                      :min="mins"
                      :max="maxs"
                      class="mb-1"
                    ></b-form-datepicker>
                  </v-card>
                </div>

                <div class="float-right">
                  <b-button class="mt-2" variant="outline-danger" @click="hideModal"
                    >Cancel</b-button
                  >
                </div>
                <div class="float-right" style="margin-right: 10px">
                  <b-button class="mt-2" variant="outline-success" @click="newtask"
                    >Submit</b-button
                  >
                </div>
              </b-modal>
            </form>
          </div>
          <diV>
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
                <label for="ex3">ProjectID: {{ gi }} </label>
              </div>
              <div class="col-lg-12">
                <label for="ex3"
                  >ProjectTitle:<router-link
                    :to="{
                      name: 'Guide Project Details',
                      params: { id: gi },
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
                  <tr v-for="(ftr, index) in ftrs" v-bind:key="ftr.id">
                    <v-card>
                      <td>{{ ++index }}.{{ ftr.question_text }}</td>

                      <td>
                        <textarea
                          placeholder="YES/NO"
                          type=" text"
                          v-model="ftr.Answer"
                        ></textarea>
                      </td>
                    </v-card>
                    <br />
                  </tr>
                </table>
              </div>
              <label>Remarks:</label>
              <b-form-textarea
                id="textarea-small"
                v-model="remark"
                margin="2"
                size="sm"
              ></b-form-textarea>
              <div class="col-lg-12">
                <label>Name of Guide :{{ GuideName }}</label>
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
                <b-button style="margin-right: 10px" variant="danger" @click="hideModal5"
                  >Cancel</b-button
                >
              </div>
            </b-modal>
          </diV>

          <b-tabs pills content-class="" align="left">
            <b-tab title="Tasks" active>
              <b-card-text>
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
                          class="btn btn-success"
                          @click="deleteT(todo.Task_id)"
                          v-b-tooltip.hover.topleft="'Here You Can Delete the Task'"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-card-text></b-tab
            >
            <b-tab title="Submitted Tasks"
              ><b-card-text>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Task</th>
                      <th>StudentName</th>
                      <th>DueDate</th>
                      <th>Task Details</th>
                      <th>Challenges</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <v-card>
                      <b-modal ref="rejectmodal" centered hide-footer title="Add Details">
                        <div class="col-xs-6">
                          <label for="ex3">Reason:</label>
                          <b-form-textarea
                            name="des"
                            id="txt11"
                            size="sm"
                            v-model="Reason"
                            placeholder="What is Reason for Rejection"
                          >
                          </b-form-textarea>
                        </div>
                        <div>
                          <label for="example-datepicker">New Due Date</label>
                          <b-form-datepicker
                            id="example-datepicker"
                            v-model="newDueDate"
                            :min="mins"
                            :max="maxs"
                            class="mb-1"
                          ></b-form-datepicker>
                        </div>
                        <b-button
                          class="mt-2"
                          variant="outline-success"
                          block
                          @click="redoTask"
                          >Submit</b-button
                        >

                        <b-button
                          class="mt-3"
                          variant="outline-danger"
                          block
                          @click="HideRejectModal"
                          >Cancel</b-button
                        >
                      </b-modal>
                    </v-card>
                    <tr v-for="(request, index) in requests" v-bind:key="request.Task_id">
                      <td>{{ ++index }}</td>
                      <td>{{ request.Task_Name }}</td>
                      <td>{{ request.FullName }}</td>
                      <td>{{ request.Due_Date | formatDate }}</td>
                      <td>{{ request.Task_Details }}</td>
                      <td>{{ request.Challenges }}</td>

                      <td>
                        <button
                          class="btn btn-success"
                          @click="deleteTask(request.Task_id)"
                          v-b-tooltip.hover.topleft="'click here to approve the task'"
                        >
                          Approve
                        </button>

                        <button
                          class="btn btn-danger"
                          @click="ShowRejectedModal(request.Task_id)"
                          v-b-tooltip.hover.topleft="' click here to reject the task '"
                        >
                          Reject
                        </button>
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
                      <th colspan="2">Status</th>
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
            <b-tab title="Deleted Tasks"
              ><b-card-text>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Task</th>
                      <th>Due Date</th>
                      <th>Deleted Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <div>
                    <b-modal ref="my-modal11" hide-footer title="Task Name">
                      <div class="col-xs-6">
                        <div>
                          <label for="example-datepicker">Due Date</label>
                          <b-form-datepicker
                            id="example-datepicker"
                            v-model="Duedate"
                            :min="mins"
                            :max="maxs"
                            class="mb-1"
                          ></b-form-datepicker>
                        </div>
                        <b-button
                          class="mt-2"
                          variant="outline-success"
                          block
                          @click="readdTask"
                          >Submit</b-button
                        >
                        <b-button
                          class="mt-3"
                          variant="outline-danger"
                          block
                          @click="hideModal11"
                          >Cancel</b-button
                        >
                      </div>
                    </b-modal>
                  </div>

                  <tbody>
                    <tr v-for="(Delete, index) in deletes" v-bind:key="Delete.Task_id">
                      <td>{{ ++index }}</td>
                      <td>{{ Delete.Task_Name }}</td>
                      <td>{{ Delete.Due_Date | formatDate }}</td>
                      <td>{{ Delete.Deleted_Date | formatDate }}</td>
                      <td>{{ Delete.Status }}</td>
                      <td>
                        <button
                          class="btn btn-success"
                          @click="showModal11(Delete.Task_id)"
                          v-b-tooltip.hover.topleft="
                            'Click here to retrieve the deleted task'
                          "
                        >
                          Retrive
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-card-text></b-tab
            >
          </b-tabs>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import moment from "moment";

import Page2 from "./page2";

export default {
  name: "App",
  components: {
    Page2,
  },
 
  data() {
    return {
      selected: "TASK ",
      valueDate: "",
      mins: "",
      maxs: "",
      selected2: null,
      taskname: "",
      todos: [],
      doings: [],
      dones: [],
      deletes: [],
      requests: [],
      def: "",
      imp: "",
      gi: "",
      visible: false,
      Duedate: "",
      ftr1: [],
      ftrs: [],
      date1: "",
      date2: "",
      date12: "",
      dates: "",
      Ftrno: "",
      message: "NO Message",
      current_date: new Date(),
      ftrss: [],
      remark: "",
      fttr: [],
      clg: 2,
      Students: [],
      Suggestion: "",
      Reason: "",
      newDueDate: "",
      ids: "",
      person: "",
      grop: false,
      ftrmasterno: "",
      groupname: "",
      GuideName: "",
      std: [],
    };
  },
  watch: {
    "$route.params.id": {
      handler() {
        location.reload();
        this.gi = this.$route.params.id;
      },
    },
  },

  created() {
    this.gi = this.$route.params.id;
  },
  mounted() {
    this.getTasks();
    this.getSubmits();
    this.getDones();
    this.getDoings();
    this.getDeletes();
    this.getFTR();
    this.getstd();
    this.getperson();
    this.getGroupData();
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  methods: {
    makeShow() {
      this.show = !this.show;
    },
    onChange21(event) {
      this.selected2 = event.target.value;
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
    getGroupData() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/groups/${this.gi}`).then(
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
    getstd() {
      console.log(this.gi);
      let i = 0;
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/std/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          var stds = result.data;
          var std;
          for (i = 0; i < stds.length; i++) {
            this.Students[i] = stds[i][0];
          }
          while (Number(i) == Number(stds.length)) {
            this.std = this.Students;
            return;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getperson() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/person/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log("person");
          console.log(result.data);
          this.person = result.data;
          if (this.person.length > 1) {
            this.grop = true;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getFTR12(NO) {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/ftranswer/${NO}/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.ftrs = result.data;
          console.log("FTR");
          this.date12 = moment(this.dates).format("DD-MM-YYYY");
          this.message = `FTR ${this.Ftrno} is Enabled.Due Date of FTR is ${this.date12}.Please Aprove FTR  `;
          this.issubmitted(NO);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    issubmitted(NO) {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/ftrproject/${NO}/${this.gi}`).then(
        (result) => {
          console.log("submitted");
          console.log(result.data);
          var submited = result.data;
          if (submited.length > 0) {
            var date = moment(submited[0].Submit_Date).format("DD-MM-YYYY");
            if (!submited[0].Submit_Date) {
              console.log("first if");
              this.visible = false;
              this.message = `FTR ${this.Ftrno} is Enabled.Due Date of FTR is ${this.date12}.Please Ask Student to Fill FTR`;
            } else {
              if (submited[0].Approved_date) {
                console.log("first else if");
                this.visible = false;
                this.message = `FTR ${this.Ftrno} is Submitted on ${date}.`;
              } else {
                this.visible = true;
              }
            }
          } else {
            this.visible = false;
            this.message = `FTR ${this.Ftrno} is Enabled.Due Date of FTR is ${this.date12}.Please Ask Student to Fill FTR`;
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
                this.Ftrno = this.ftr1[i].ftr_number;
                this.ftrmasterno = this.ftr1[i].ftr_master_id;
                this.date1 = moment(this.dates).format("YYYYMMDD");
                this.date2 = moment(this.current_date).format("YYYYMMDD");
                if (Number(this.date1) >= Number(this.date2)) {
                  this.visible = true;
                  this.getFTR12(this.ftrmasterno);
                } else {
                  this.message = "NO Message";
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
      console.log(this.gi);
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/task/${this.gi}`).then(
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

      axios.put(`https://project-monitoring-backend.herokuapp.com/api/week/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.tos = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getDeletes() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/deletes/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.deletes = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getDoings() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/doing/${this.gi}`).then(
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
    getSubmits() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/submit/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          var reqs = result.data;
          this.requests = reqs[1];
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getDones() {
      axios.get(`https://project-monitoring-backend.herokuapp.com/api/done/${this.gi}`).then(
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
        .post(`https://project-monitoring-backend.herokuapp.com/api/task/${this.gi}`, {
          taskname: this.taskname,
          allotedTo: this.selected2,
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
        .post(`https://project-monitoring-backend.herokuapp.com/api/week/${this.gi}`, {
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
    ShowRejectedModal(id) {
      this.ids = id;
      this.$refs["rejectmodal"].show();
    },
    HideRejectModal() {
      this.Suggestion = "";
      this.Reason = "";
      this.newDueDate = "";
      this.$refs["rejectmodal"].hide();
    },

    showModal11(SN) {
      this.imp = SN;
      this.$refs["my-modal11"].show();
    },
    showModal5() {
      this.$refs["my-modal5"].show();
      this.getFTR();
    },

    hideModal11() {
      this.Duedate = "";
      this.$refs["my-modal11"].hide();
    },
    hideModal5() {
      this.fttr = [];
      this.remark = "";
      this.$refs["my-modal5"].hide();
    },
    hideModal() {
      (this.taskname = ""),
        (this.valueDate = ""),
        (this.selected2 = ""),
        this.$refs["my-modal"].hide();
    },
    deleteTask(SN) {
      axios
        .post("https://project-monitoring-backend.herokuapp.com/api/done", {
          SerialName: SN,
        })
        .then((res) => {
          this.getSubmits();
          this.getDones();
          this.hideModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("https://project-monitoring-backend.herokuapp.com/api/task_status", {
          SerialName: SN,
        })
        .then((res) => {
          this.getSubmits();
          this.getDones();
          this.hideModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    redoTask() {
      // this.status++
      axios
        .put("https://project-monitoring-backend.herokuapp.com/api/doing", {
          Reason: this.Reason,
          SerialName: this.ids,
          Due_date: this.newDueDate,
        })
        .then((res) => {
          this.getSubmits();
          this.getDoings();
          this.hideModal();
          this.HideRejectModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteT(SN) {
      axios
        .put("https://project-monitoring-backend.herokuapp.com/api/task", {
          SerialName: SN,
        })
        .then((res) => {
          this.getTasks();
          this.getDeletes();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    readdTask() {
      axios
        .post("https://project-monitoring-backend.herokuapp.com/api/deletes", {
          SerialName: this.imp,
          DueDate: this.Duedate,
        })
        .then((res) => {
          this.getDeletes();
          this.getTasks();
          this.hideModal11();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitFTR(ftrs) {
      axios
        .put(`https://project-monitoring-backend.herokuapp.com/api/ftranswer`, {
          groupid: this.gi,
          ftr: ftrs,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.groupftr();
      this.hideModal5();
    },
    groupftr() {
      axios
        .put(`https://project-monitoring-backend.herokuapp.com/api/ftrproject`, {
          groupid: this.gi,
          ftrmasterno: this.ftrmasterno,
          remark: this.remark,
          reviewid: this.currentUser.Person_Id,
        })
        .then((res) => {
          console.log(res);
          this.getFTR();
        })
        .catch((err) => {
          console.log(err);
        });
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

-----------------------
