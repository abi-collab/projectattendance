<template>
  <div id="dashboard" style="background-color:white">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  
  <br>
    <b-jumbotron
      class="bg-light"
      :header="orgName"
      :lead="wardName" 
      align="center"
      style="text-transform: capitalize;"
    >
    </b-jumbotron>

<div>

   <div class="container">
        <LineChart :chart-data="datacollection"></LineChart> 
        <br>
      
        <div align="left">

            <b-button v-b-toggle.sidebar-1 variant="out-light" style="margin:5px"><b-icon icon="person-circle" aria-hidden="true"></b-icon> <small> {{userProfile.name}}</small></b-button>

    <!--------------------------- sidebar ----------------------------->


     <b-sidebar id="sidebar-1" shadow>
      <div class="px-3 py-2">
        <div class="userbox">
          <small>Name: </small>
          <h6 class="display-4">{{ userProfile.name }}</h6>
        </div>
        <div class="userbox">
          <small>Calling: </small>
          <h3 class="display-4">{{ userProfile.calling }}</h3>
        </div>
        <div class="userbox">
          <small>Stake: </small>
           <h3 class="display-4">{{ userProfile.stake }}</h3>
        </div>
        <div class="userbox">
           <small>ward: </small>
            <h3 class="display-4">{{ userProfile.ward }}</h3>
        </div>
        <div class="userbox">
            <small>Organization: </small>
             <h3 class="display-4">{{ userProfile.org }}</h3>
        </div>  
            
      </div>
    </b-sidebar>

     <!--------------------------- sidebar ----------------------------->

        <b-btn variant="out-light" style="margin:5px" @click="fillData()"><b-icon icon="bar-chart-fill" aria-hidden="true"></b-icon><small> Update Data</small></b-btn>
         
        </div>
   </div>
       <br>
       <br>
  <b-tabs content-class="mt-3" align="center">

    <!---------------------------------------------------------------- chart --------------------------------------------------------------------------->
    <b-tab title="xxxxxxxxxx">
      <template #title>
        <a><b-btn variant="outline"><b-icon icon="list-check" aria-hidden="true"></b-icon> <small>Attendance</small></b-btn></a>
      </template>
      

        <!---------------------------------------------------------------- list --------------------------------------------------------------------------->
        <br>
     <div class="container"> 

  <div class="row" style="text-align:left;">
      <caption style="margin-left:20px;">  
        <sup><b>Note</b> : Check the box if the person is present in the current
         meeting.
         <br>
         If the added person's info is misspelled, just delete it and add the person again with accurate information.
         </sup>
      </caption>
  </div>
  <br>
  <br>

    <br>
    <br>
    <!---------------------------------------------------------------- calendar --------------------------------------------------------------------------->
    <div align="left">
        <label for="example-datepicker"><small>Pick a Date for the Attendance</small></label>
        <b-form-datepicker 
        id="example-datepicker" 
        v-model="chartValue" 
        class="mb-2" 
        :min="minDate" 
        :max="maxDate" 
        :date-disabled-fn="dateDisabled" 
        locale="en" 
        size="lg"
        :date-format-options="{ month: 'short', day: '2-digit', weekday: 'short' , year: 'numeric'}"
        @context="onContext"

        

        >
        </b-form-datepicker>
    </div>
    <br>

    <div>
      <b-row style="text-align:center;">

            <table style="width:100%;">
              <thead> 
                <tr style="font-family:Helvetica;box-shadow:0px 1px 5px grey;height:50px;border-radius:25px;">

                  <th>Lastname</th>
                  <th>Firstname</th>
                  <th>Middlename</th>
                  <th><b-icon-check2-square></b-icon-check2-square></th>
                  <th>Delete</th>
                </tr>
              </thead>

              <br>
              <tbody>
                <tr v-for="(item,index) in getlistname" :key='item' class='rowInfo' style="height:40px;">

                    <td style="text-transform: capitalize;">{{item.lastname}}</td>
                    <td style="text-transform: capitalize;">{{item.firstname}}</td>
                    <td style="text-transform: capitalize;">{{item.mname}}</td>
                    

                    <td>
                      <b-form-checkbox
                        :id="item.lastname + item.firstname + item.mname"
                        v-model="checked"
                        :value="item.lastname + ', ' + item.firstname + ' ' + item.mname" 
                        :checked="isSelected" 
                        class = 'unchecked' 
                      >
                      </b-form-checkbox> 
                    </td>
                    <td class='text-center'>
                      <b-row>
                        <b-col>
                          <b-icon-trash v-b-tooltip.hover title="Delete this Person" @click="deletePerson(item,index)"></b-icon-trash>
                        </b-col>
                      </b-row>
                    </td>        
                </tr>
              </tbody>
            </table>
        </b-row>
      </div>

      <hr>

        <!----------------------------------------- start of add modal ----------------------------------------------->

    <div>
      <b-avatar
        id='addPersonAvatar' 
        v-b-modal.modal-center 
        v-b-tooltip.hover 
        variant="info" 
        title="click to add person"
        >
        <b-icon-person-plus></b-icon-person-plus>
      </b-avatar>
      <br>
      <br>
     
      <b-modal v-if="modalShow" id="modal-center" title="Add a Person" hide-footer centered>

            <b-form autocomplete="off">    
                <b-form-group><!------ add lastname -------->
                  <b-form-input
                    v-model="input.lname"
                    placeholder="lastname"
                    :maxlength="max" 
                    style="text-align:center"
                    >
                  </b-form-input>
                </b-form-group>

                <b-form-group><!------ add firstname -------->
                  <b-form-input
                    v-model="input.fname"
                    placeholder="firstname"
                    :maxlength="max"
                    style="text-align:center"
                    >
                  </b-form-input>
                </b-form-group>

                <b-form-group>
                    <b-form-input
                    v-model="input.mname"
                    placeholder="middlename"
                    :maxlength="max"
                    style="text-align:center"
                    >
                  </b-form-input>


                </b-form-group>
            </b-form>
            <b-btn class="addEditBtn" variant="success" @click="addperson()">save</b-btn><!-- @click.prevent-->
            <b-btn variant="warning" class="addEditBtn" @click="clear()">clear</b-btn>
      </b-modal>
    </div>

    <br>
              <!----------------------------------------- End of add/edit modal ----------------------------------------------->
    <div class="container">
      <b-row style="box-shadow:0px 0px 5px grey;border-radius:15px;background-color:whitesmoke">
        <b-col></b-col>
        <b-col cols="10" style="padding:50px">

          <h5 align="center"> Attendance Report : {{formatted}}</h5>
          <hr>
          <br>
              <ol align="left">
                <li v-for="chix in checked" :key="chix" style="font-family:Verdana ;text-transform: capitalize;">{{chix}}</li>
              </ol> 
              <br>
              <br>
              <br>
              <div align="center"> 
               <b-button id='btnsubmit' variant="outline-info" style="width:80%" @click="addDatesAndLogs()"><b-icon-cursor-fill></b-icon-cursor-fill> Submit Attendance Report</b-button>
              </div>
       
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
</div>
    </b-tab>


 


    <b-tab title="Logs" >
      <template #title>
        <a><b-btn  variant="outline"><b-icon icon="book" aria-hidden="true"></b-icon> <small>Logs</small></b-btn><!--log btn--></a>
      </template>
      <br>

        <b-row align="left">
          <b-col></b-col>
          <b-col cols="12" md="4" lg="4" sm="12">
              <ul class="logssRow">
                <li v-for="(log,index) in getlogs.slice().reverse()" :key="log" class="attendanceLogs" style="text-transform: capitalize">
                  <div id="dataLabelsModal">
                  
                    <small><b>{{chartDatesForLogs[index]}}</b></small> 

                    <!-- : Seconds - {{logsDate[index]}} -->
                  
                  </div>
                  
                  <ol class="list-group">
                    <li v-for="logies in log.present" :key="logies" class="list-group-item">
                      {{logies}}
                    </li>
                  </ol>
                </li>
              </ul>
          </b-col>
              <b-col></b-col>
        </b-row>
   

    </b-tab>
    <b-tab title="Attendee">
      <template #title>
        <a><b-btn variant="outline"><b-icon icon="check2" aria-hidden="true"></b-icon> <small>Attendee</small></b-btn><!--attendee--></a>
      </template>
      <br>
      <br>
        <b-row>
          <b-col></b-col>
          <b-col cols="12" md="4" lg="4" sm="12">
              <b-row align="center">
                      <b-col >
                       Names
                      </b-col>
                      <b-col>
                        <b-row align="center">
                          <b-col>
                            Attendance
                          </b-col>
                          <b-col>
                           ratio
                          </b-col>
                        </b-row>
                      </b-col>
                      
                    </b-row>
                  <hr>
                  
                    <b-row align="center">
                      <b-col>
                      <tr  v-for="sam in attendeesName" :key="sam" style="border-bottom: solid grey 1px;height:40px;">
                          <td style="text-transform: capitalize;">{{sam}}</td> 
                      </tr>
                      </b-col>

                      <b-col>
                        <b-row>
                          <b-col>
                          <tr  v-for="attendee in attendeesOccurance" :key="attendee" style="border-bottom: solid grey 1px;height:40px;">
                              <td style="text-transform: capitalize;"><h6>{{attendee}}<small> / {{mp.length}}</small></h6></td> 
                             
                          </tr>
                          </b-col>
                          <b-col>
                            <tr  v-for="attendee in attendeesOccurance" :key="attendee" style="border-bottom: solid grey 1px;height:40px;color:#0A9C67">
                               <td><h5 class="colors">{{(attendee/mp.length*100).toFixed(0)}} %</h5></td>  
                            </tr>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
          </b-col>
          <b-col></b-col>
        </b-row>
     
    </b-tab>

  </b-tabs>
</div>
    <!--------------------------- main content ----------------------------->

<div>



        <br>
        <br>
        <br>
        <br>
        <br>
    
 
</div>

<br>
<br>
<br>
<br>
<br>
<br>

<div class="bg-light" align="center">
  <br>
  <br>
  <b-row>
    <b-col></b-col>
    <b-col >
       <h6>About</h6>
            <p class="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i>   C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
    </b-col>
    <b-col>
      <h6>Quick Links</h6>
            <ul>
              <li><a href="http://scanfcode.com/about/">About Us</a></li>
              <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
            </ul>
    </b-col>
     <b-col></b-col>
  </b-row>
  <hr>
  <b-row>
     <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved by 
         <a href="#"><b-icon icon="code-slash"></b-icon> WengDevs.</a>.
            </p>
          </div>
  </b-row>
  <br>
  <br>
</div>
{{formatted}}
  </div>
</template>

<script>

//import chart from "../chart-data.js";
import { mapState } from 'vuex'
import moment from 'moment'
import LineChart from '../dataChart.js'

import  fb from '../attendancefirebase.js'
import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
   name: "Home",

  components: {
  //  chart,
    LineChart
    
  },
 
   filters: {
    formatDate(val) {
      if (!val) { return '-' }
      
      let date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength(val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    }
  },

  data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth() - 6)
      minDate.setDate(0)
      // 15th in two months
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 1)
      maxDate.setDate(0)


    return {
      datacollection:null,
      chartPetsa:[this.chartDates],
      getTao:[this.getPerson],

      //////////////////////////local vars
      
       items: [],
        input: {
          lname: '',
          fname: '',
          mname:'',
        },
        
        checked: [],
        unchecked: [],

        max: 36,
        maxAge: 2,

        savebtn: true,
        updatebtn: false,

        editMsg: false,
        addMsg: true,

        modalShow: true,//v-if use to open the same modal 
        modal2Show: true,//v-if use to open the same modal 

        isSelected: false,
        notSelected: true,

       
        logsChecked:[],

        variable:[],
        araw:[],

        x:null,


        axe:[],

        isLoggedIn:false,
        currentUsser:false,

        count:0,
        all:[],

        abc:[],

        sampless:[],


        random:'',
        mp:[],
        haha:null,
        attendeesOccurance:[],
        attendeesName:null,

        qwerty:[],

        realLogs:this.$store.state.userProfile.logs,
        mvp:[],
        chartValue:'',
        minDate: minDate,
        maxDate: maxDate,
        formatted: '',
        selected: '',
       


 

    

    }
  },
    computed: {
      ...mapState(['userProfile','posts']),

      wardName () {
      return this.$store.state.userProfile.ward + " Watch Tower"
      },
      orgName () {
      return this.$store.state.userProfile.org + " Organization"
      },
      chartDates(){
       return this.$store.state.userProfile.chartdates
      },
      chartDatesForLogs(){
       let a = this.$store.state.userProfile.chartdates
      return a.slice().reverse();
      },
      getlistname(){

       return this.$store.state.userProfile.listname
 
      },
       getlogs(){
       return this.$store.state.userProfile.logs
    
      },
       getChartDataValue(){
       return this.$store.state.userProfile.logs.map(function(s){
          return s.present.length;
      })
      },
      logsDate(){

          let xoxo = this.$store.state.userProfile.logs;
         let oxox = xoxo.slice().reverse();
       return oxox.map(function(s){
          return s.date_Entered.seconds;
      })

      
      }
       
    },
    mounted () {
      this.fillData()
    },
    methods:{
      onContext(ctx) {
        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted
        // The following will be an empty string until a valid date is entered
        this.selected = ctx.selectedYMD

        
      },
      
      dateDisabled(ymd, date) {
      const weekday = date.getDay();
      return weekday >= 1 //&& weekday <= 5
     
    },

       fillData () {

          let result = {}

 //convert to key value pairs
                for (var i = 0; i < this.getlogs.length; i++) {
                  result [this.getlogs[i].present] = this.getlogs[i].present;
                }
             
             //convert to display only the value, not the key or entries
                let cge = Object.values(result);
                this.mp = Object.values(result);

                //  let dog = this.mp;
                 let dog = this.mp;

                 for (var o = 0; o < dog.length; o++) {
                  this.qwerty.push(dog[o].length);

                 }

              // convert from array of array into one array
                let dili = cge.flat(1);

                this.haha = dili

                function foo(dili) {
                    var a = [],
                      b = [],
                      prev;
                    dili.sort();
                    for (var i = 0; i < dili.length; i++) {
                      if (dili[i] !== prev) {
                        a.push(dili[i]);
                        b.push(1);
                      } else {
                        b[b.length - 1]++;
                      }
                      prev = dili[i];
                    }
                    return [a, b];
                  }
                  var hihi = foo(dili);
                
                  this.attendeesName = hihi[0]
                  this.attendeesOccurance = hihi[1]

        
       // let dog = this.realLogs;
        let userLogs = this.$store.state.userProfile.logs
        for (var ii = 0; ii < userLogs; ii++) {
                  this.mvp.push(userLogs[ii].present.length);
                  

                 }

        this.datacollection = {
           labels:this.chartDates,
            datasets: [{   
                a:this.checked,
                borderColor:'lightblue',
                borderDashOffset:.1,
                pointBorderColor:'white',
                pointBackgroundColor:'skyblue',
                pointRadius: 5,
                pointHoverRadius: 10,
                label:'Attendance',
                events:onclick,
                data:this.getChartDataValue
              
              }], 
        }

       },
      
    addDates(){       
            this.$store.dispatch('addDates',this.formatted)
        
    },
     log(){
       this.$store.dispatch('log', this.checked,this.chartValue);
       this.checked = [];
    
    },
    


//////////////////////////////////////////////////////////////////////////////////////////////////////   sumbitting report


    addDatesAndLogs(){
     
      if(this.chartValue == ''){// dapat hindi empty ang petsa at
          Swal.fire({
              title:'Please Choose a Date',
              icon: 'warning',
              timer:2000,
              showCancelButton: false,
              showConfirmButton: false
            })
      }
      else if(this.chartDates.includes(this.formatted)){
          Swal.fire({
              title:' Please Choose Another Date ',
              text:'You Had Submitted your '+ this.formatted + ' Report',
              icon: 'error',
              //timer:2000,
              showCancelButton: false,
              showConfirmButton: true
            })
      }
      else{
       Swal.fire({
          title: 'Confirmation Prompt!',
          text: 'Please Confirm if you are sure with Attendance Report',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirm!',
          cancelButtonText: 'Go back'
        }).then((result) => {
          if (result.value) {

        if(this.chartValue != '' && this.checked.length != 0){//kung may binigay na petsa, okay lang na walang attendance
         this.addDates();
         this.log();
         this.chartValue = ''
          Swal.fire({
              title:'Report Submitted Successfully!',
              icon: 'success',
              timer:1000,
              showCancelButton: false,
              showConfirmButton: false
            })
       }
       else if(this.chartValue != '' && this.checked.length == 0){//may petsa at attendance
         this.addDates();
         this.log();
         this.chartValue = ''

         Swal.fire("This page will refresh to sync with database")
          .then(() => {
             location.reload();
          });
       }
              
          }else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title:'Report Cancelled',
              icon: 'error',
              timer:1000,
              showCancelButton: false,
              showConfirmButton: false
            })
          }
        })
      }
      

    },
  
     addperson() {

        Swal.fire({
          title: 'Person has been Added',
          icon: 'success',
          timer:1000,
          showCancelButton: false,
          showConfirmButton: false
        })

      this.$store.dispatch('addperson', {
        lastname: this.input.lname,
        firstname: this.input.fname,
        middlename: this.input.mname,
      })
      

      this.clear();
    
    },

    a(){
      console.log(this.getlistname.length)
      console.log(this.getlistname)
    },

    deletePerson(item,index){// this function is not pass to store

     Swal.fire({
          title: 'Are you sure?',
          text: 'You cannot retrieve person`s info once deleted',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {

                // delete person locally
                // this.getlistname.splice(id,1);// javascript way, it works!
                this.$delete(this.getlistname, index); // vue js way , it works!

                // delete person in db
                const user  = fb.auth.currentUser.uid
                fb.usersCollection.doc(user).update({
                  listname:firebase.firestore.FieldValue.arrayRemove(item,index) 
              })

            Swal.fire({
              title: 'Person Deleted!',
              text: 'This person has been deleted.',
              icon: 'success',
              timer:1000,
              showCancelButton: false,
              showConfirmButton: false 
            })

          }else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title:'Cancelled',
              text: 'Person`s info stays :)',
              icon: 'error',
              timer:1000,
              showCancelButton: false,
              showConfirmButton: false
            })
          }
        })

    },
    
    clear(){
      this.input.lname = ''
      this.input.fname = ''
      this.input.mname = ''
    },
    //  pet() {

    //   let endOfWeek = function(date){  
    //   var lastday = date.getDate() - (date.getDay() - 1) + 6;
    //   return new Date(date.setDate(lastday));
    //   }

    // let dt = new Date(); 

    // const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // let x = endOfWeek(dt);
    // let a = x.getDate();
    // //let b = x.getMonth() + 1;
    // let b = months[x.getMonth()];
    // let c = x.getFullYear();

    // let fixdate = b +" "+ a +", " + c;
    // let finalDate = fixdate.toString();
    // this.random = finalDate;
    
    // },
   
    firstDayOfWeek(){

      function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:0); // adjust when day is sunday:0
        return new Date(d.setDate(diff));
      }

      getMonday(new Date()); // Mon Nov 08 2010
      console.log(getMonday(new Date()));
    }

    }
   





}
</script>
<style scoped>
.rowInfo:hover{
  box-shadow: 0px 0px 2px grey;
  border-radius:10px;
  cursor:pointer;
}
ul li{
 list-style-type: none;
}
.attendanceLogs{
   border-radius:10px;
   margin:5px;
   padding:15px;
   box-shadow:0px 0px 7px grey;
   font-style:bold;
}
.addAnothePerson{
  margin:5px 0px 5px 0px;
}

</style>