<template>
  <div id="app">
    <div>
      <Page2></Page2>
    </div>
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
            name: 'Guide Project Details',
            params: { id: item.Group_id },
          }"
          >{{ item.Group_Name }}</router-link
        ></b-dropdown-item>
    </b-dropdown>
    <div id="box">
      <div class="row">
        <div class="col-9">
          <b-card>
            <h2 style="text-align: center">PROJECT DETAILS</h2>
            <hr />
            <b-row>
              <b-col sm="3">
                <label><h5>Academic Year</h5></label>
              </b-col>
              <b-col sm="9">
                <label><h5>2020-2021</h5></label>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="3">
                <label><h5>Project Id:</h5></label>
              </b-col>
              <b-col sm="9">
                <label
                  ><h5>{{ todos[0].Group_Name }}</h5></label
                >
              </b-col>
            </b-row>

            <b-row m-1>
              <b-col sm="3">
                <label><h5>Project Title:</h5></label>
              </b-col>
              <b-col sm="9">
                <label
                  ><h5>{{ todos[0].Group_title }}</h5></label
                >
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="3">
                <label><h5>Project Type:</h5></label>
              </b-col>
              <b-col sm="9">
                <label
                  ><h5>{{ todos[0].type }}</h5></label
                >
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="3">
                <label><h5>Project Guide:</h5></label>
              </b-col>
              <b-col sm="9">
                <label
                  ><h5>{{ todos[0].FullName }}</h5></label
                >
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="3">
                <label><h5>Department</h5></label>
              </b-col>
              <b-col sm="9">
                <label
                  ><h5>{{ todos[0].Department_Name }}</h5></label
                >
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="3">
                <label><h5>College:</h5></label>
              </b-col>
              <b-col sm="9">
                <label
                  ><h5>{{ todos[0].clg }}</h5></label
                >
              </b-col>
            </b-row>

            <div class="row">
              <div class="col-12">
                <b-row>
                  <b-col sm="3">
                    <label><h5>Project Duration:</h5></label>
                  </b-col>
                  <b-col sm="9">
                    <label
                      ><h5>{{ total }} Weeks</h5></label
                    >
                  </b-col>
                </b-row>
                <div class="col-12">
                  <b-list-group horizontal="md" v-show="false" >
                    <b-list-group-item
                      >Planning Phase<br />
                      <hr />
                      {{ todos[0].initial_Time }}Weeks</b-list-group-item
                    >
                    <b-list-group-item
                      >Design Phase<br />
                      <hr />
                      {{ todos[0].Design_Time }} Weeks</b-list-group-item
                    >
                    <b-list-group-item
                      >Devlopment Phase<br />
                      <hr />
                      {{ todos[0].Devlopment_Time }} Weeks</b-list-group-item
                    >
                    <b-list-group-item
                      >Testing Phase<br />
                      <hr />
                      {{ todos[0].Testing_Time }} Weeks
                    </b-list-group-item>
                    <b-list-group-item
                      >Deployment Phase<br />
                      <hr />
                      {{ todos[0].Deployment_Time }} Week</b-list-group-item
                    >
                  </b-list-group>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <h5>Domains</h5>
                <div class="col-12">
                  <b-list-group horizontal="md">
                    <b-list-group-item
                      >Domain 1<br />
                      <hr />
                      {{ todos[0].dom2 }}</b-list-group-item
                    >
                    <b-list-group-item
                      >Domain 2<br />
                      <hr />
                      {{ todos[0].dom3 }}</b-list-group-item
                    >
                    <b-list-group-item
                      >Domain 3<br />
                      <hr />
                      {{ todos[0].dom4 }}</b-list-group-item
                    >
                  </b-list-group>
                </div>
              </div>
            </div>

            <b-row>
              <b-col sm="2">
                <label><h5>Ojectives:</h5></label>
              </b-col>
              <b-col sm="10">
                <ol>
                  <label
                    ><h6>
                      {{ todos[0].Objective }}
                    </h6></label
                  >
                </ol>
              </b-col>
            </b-row>
          </b-card>
          <div>
            <h4 class="text-align:center">Tasks done per week</h4>
          </div>

          <v-card>
            <div class="row"></div>
            <div class="col-1"></div>
            <div class="col-10">
              <svg id="svg1" width="900" height="500"></svg>
            </div>
          </v-card>
        </div>
        <div class="col-3">
          <b-card bg-variant="" class="text-center">
            <div class="row">
              <div class="col-12">
                <h4>Project Guide</h4>
                <b-list-group style="max-width: 300px">
                  <b-list-group-item class="d-flex align-items-center">
                    <b-avatar class="mr-3"></b-avatar>
                    <span class="mr-auto"
                      ><h5>{{ todos[0].FullName }}</h5>
                      <span>{{ todos[0].Mobile }}</span>
                      <br />
                      <span>{{ todos[0].email }}</span>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h4>Industrial Guide</h4>
                <b-list-group style="max-width: 300px">
                  <b-list-group-item class="d-flex align-items-center">
                    <b-avatar class="mr-3"></b-avatar>
                    <span class="mr-auto"
                      ><h5>{{ todos[0].guide2 }}</h5>
                      <span>{{ todos[0].guide2Mobile }}</span>
                      <br />
                      <span>{{ todos[0].guide2email }}</span>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>
          </b-card>
          <br />
          <b-card bg-variant="" class="text-center">
            <div class="row">
              <div class="col-12">
                <h4>Students</h4>
                <b-list-group style="max-width: 300px">
                  <b-list-group-item
                    v-for="(item, index) in stds"
                    v-bind:key="index"
                    class="d-flex align-items-center"
                  >
                    <b-avatar class="mr-3"></b-avatar>
                    <span
                      ><h5>{{ item.FullName }}</h5>
                      <span>{{ item.Mobile }}</span>
                      <br />
                      <span>{{ item.email }}</span>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>
          </b-card>
        </div>

        <div class="col-12">
          <div class="col-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as d3 from "d3";
import Page2 from "./page2";
import axios from "axios";
export default {
  data: () => {
    return {
      gi: "",
      todos: [],
      total: "",
      gid: "",
      weeks: [],
      datas: [],
      cat: [],
      ind: false,
      stds: [],
      grop: false,
    };
  },
  mounted() {
    this.getPDs();
    this.getweek();
    this.getperson();
    this.loggedin();
  },
  components: {
    Page2,
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
  methods: {
    getPDs() {
      axios.get(`http://localhost:8080/api/pds/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.todos = result.data;
          this.total =
            this.todos[0].initial_Time +
            this.todos[0].Design_Time +
            this.todos[0].Devlopment_Time +
            this.todos[0].Testing_Time +
            this.todos[0].Deployment_Time;
          this.gid = this.todos[0].Group_Name;
          if (this.todos[0].Industry_guide) {
            this.ind = true;
          }
        },
        (error) => {
          console.error(error);
        }
      );
      let i = 0;
      axios.get(`http://localhost:8080/api/std/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          var std = result.data;
          var Students = [];
          for (i = 0; i < std.length; i++) {
            Students[i] = std[i][0];
          }
          while (Number(i) == Number(std.length)) {
            this.stds = Students;
            return;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getperson() {
      axios.get(`http://localhost:8080/api/person/${this.currentUser.Person_Id}`).then(
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
    getweek() {
      axios.get(`http://localhost:8080/api/week/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.weeks = result.data;
          let i = 0;
          this.weeks.forEach((element) => {
            this.datas[i] = element.name;
            this.cat[i] = element.value;
            i++;
          });
          this.getdata();
          //this.getdata1();
        },
        (error) => {
          console.error(error);
        }
      );
      return this.weeks;
    },
    getdata() {
      let marge = { top: 60, bottom: 60, left: 60, right: 60 };
      let svg1 = d3.select("#svg1");
      let width = svg1.attr("width");
      let height = svg1.attr("height");
      console.log(height);
      let g = svg1
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

      var dataset = [];
      for (let i = 0; i < this.cat.length; i++) {
        dataset[i] = this.cat[i];
      }
      console.log(dataset);
      let xScale = d3
        .scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, width - marge.left - marge.right]);
      let xAxis = d3.axisBottom(xScale);
      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([height - marge.top - marge.bottom, 0]);
      let yAxis = d3.axisLeft(yScale);

      g.append("g")
        .attr(
          "transform",
          "translate(" + 0 + "," + (height - marge.top - marge.bottom) + ")"
        )
        .call(xAxis);

      g.append("g").attr("transform", "translate(0, 0)").call(yAxis);
      let gs = g.selectAll(".rect").data(dataset).enter().append("g");
      let rectPadding = 20;
      gs.append("rect")
        .attr("x", function (d, i) {
          return xScale(i) + rectPadding / 2;
        })
        .attr("y", function () {
          let min = yScale.domain()[0];
          return yScale(min);
        })
        .attr("width", function () {
          return xScale.step() - rectPadding;
        })
        .attr("height", function () {
          return 0;
        })
        .attr("fill", "lightblue")
        .transition()
        .duration(2000)
        .delay(function (d, i) {
          return i * 400;
        })
        //.ease(d3.easeElasticInout)
        .attr("y", function (d) {
          return yScale(d);
        })
        .attr("height", function (d) {
          return height - marge.top - marge.bottom - yScale(d);
        });
      gs.append("text")
        .attr("x", function (d, i) {
          return xScale(i) + rectPadding / 2;
        })
        .attr("y", function () {
          // return yScale(d)
          let min = yScale.domain()[0];
          return yScale(min);
        })
        .attr("dx", function () {
          (xScale.step() - rectPadding) / 2; // eslint-disable-line
        })
        .attr("dy", 20)
        .text(function (d) {
          return d;
        })
        .transition()
        .duration(2000)
        .delay(function (d, i) {
          return i * 400;
        })
        .attr("y", function (d) {
          return yScale(d);
        });
    },
    /* getdata1() {
      var svg = d3.select("#svg2");
      var width = +svg.attr("width");
      var height = +svg.attr("height");
      var margin = { top: 20, left: 0, bottom: 30, right: 0 };
      var chartWidth = width - (margin.left + margin.right);
      var chartHeight = height - (margin.top + margin.bottom);
      this.chartLayer = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
      this.arc = d3
        .arc()
        .outerRadius(chartHeight / 2)
        .innerRadius(chartHeight / 4)
        .padAngle(0.03)
        .cornerRadius(8);
      this.pieG = this.chartLayer
        .append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight / 2})`);
      this.drawChart(this.weeks);
    },
    drawChart: function (data) {
      let color = d3.schemeCategory10();
      var arcs = d3
        .pie()
        .sort(null)
        .value(function (d) {
          return d.value;
        })(data);
      var block = this.pieG.selectAll(".arc").data(arcs);
      block.select("path").attr("d", this.arc);
      var newBlock = block.enter().append("g").classed("arc", true);
      newBlock
        .append("path")
        .attr("d", this.arc)
        .attr("id", function (d, i) {
          return "arc-" + i;
        })
        .attr("stroke", "gray")
        .attr("fill", function (d, i) {
          return color(i);
        });
      newBlock
        .append("text")
        .attr("dx", 10)
        .attr("dy", -5)
        .append("textPath")
        .attr("xlink:href", function (d, i) {
          return "#arc-" + i;
        })
        .text(function (d) {
          return d.data.name;
        });
    },*/

    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (this.currentUser.roles != "ROLE_GUIDE") {
        this.logOut();
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
<style scoped>
.underNav {
  margin-top: 50px;
}
#box1 {
  width: auto;
  padding: 10px;
  margin: auto;
  margin-top: 10px;
  text-align: center;
  height: auto;
}
.ft {
  background-color: lightgrey;
}
#app {
  padding-top: 3%;
  padding-left: 3%;
  padding-right: 3%;
}
</style>
>
