<template>
  <div class="container" style="background-color:darkgreen">
    <!-- <b-row>
      <b-col></b-col>
      <b-col cols="10" md="6" sm="12" align="center">
        <br />
        <br />
        <h4>Login with your Attendance Account</h4>
        <br />
        <br />

     
        <b-form>
          <b-input-group class="mb-2"
            >
            <b-input-group-prepend is-text>
              <b-icon icon="envelope-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              placeholder="Email"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2"
            >
            <b-input-group-prepend is-text>
              <b-icon icon="unlock-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              type="text"
              placeholder="Password"
              required
            ></b-form-input>
          </b-input-group>
          <br />

          <b-btn id="login" variant="info">login</b-btn>
        </b-form>
      </b-col>
      <b-col></b-col>
    </b-row> -->
    <b-row>
      <b-col></b-col>
      <b-col cols="12" lg="6" md="8">

        <!-- <passwordReset v-if="showPasswordReset" @close="togglePasswordReset()"></passwordReset> -->

        <b-card header-tag="header" footer-tag="footer">

 
        <section>
          <div :class="{ 'signup-form': !showLoginForm }" class="col2">

            <!----------------------- login ------------------------------->
            <form v-if="showLoginForm" @submit.prevent>  
              <h1>Log In</h1>
             
              <br>

              <b-form-group
                align="left"
                label="Enter your email"
                label-for="emails"
               >
                <b-form-input id="emails" v-model.trim="loginForm.email" type="text" placeholder="you@gmail.com"></b-form-input>
              </b-form-group>
              

              <b-form-group
                align="left"
                label="Enter your Password"
                label-for="pass"
                >
                <b-form-input id="pass" v-model.trim="loginForm.password" type="password" placeholder="***********"></b-form-input>
              </b-form-group>
          
             
              <b-btn id="login" @click="login()">Log In</b-btn>
             

                                 <!---------------------- password reset ----------------------------->
              <div class="extras"> 
                <a v-b-modal.modal-1>Forgot Password</a> | 
                <a @click="toggleForm()">Create an Account</a>



                 <b-modal id="modal-1" centered hide-footer>

                    <h3>Reset Password</h3>
                    <div v-if="!showSuccess">
                      <p>Enter your email to reset your password</p>
                      <b-form @submit.prevent>
                        <b-form-input v-model.trim="email" type="email" placeholder="you@email.com" />
                      </b-form>
                      <b-btn style="margin-top:10px;width:100%;" @click="resetPassword()">Reset</b-btn> 
                    </div>

                    <p v-else>Success! Check your email for a reset link. It may take a couple of minutes to receive the request.</p>

                
                  <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>

                  <br>
                 
           
                </b-modal>
       
              </div>

               <!---------------------- password reset ----------------------------->
            </form>


            <!---------------------- sign up ----------------------------->

            <form v-else @submit.prevent>
              <h1>Sign Up!</h1>
              <small>Create an Account & Start Organizing Attendance</small>
              <br>
              <br>
              <br>

               <b-form-group label="Name" label-for="name" description="firstname, MI, lastname" align="left">
                <b-form-input id="name" v-model.trim="signupForm.name" type="text"></b-form-input>
              </b-form-group>

              <b-form-group label="Stake" label-for="stake" description="Name of stake where your ward belong. Example : Cavite, CDO East, Cadiz" align="left">
                <b-form-input id="stake" v-model.trim="signupForm.stake" type="text"></b-form-input>
              </b-form-group>

              <b-form-group label="Ward/Branch" label-for="ward" description="Example : Noveleta, General Trias 1st, Manolo Fortich Branch " align="left">
                <b-form-input id="ward" v-model.trim="signupForm.ward" type="text"></b-form-input>
              </b-form-group>

              <b-form-group label="Calling" label-for="calling" description="Example : Young Men Adviser, Primary 1st councilor, Young Women President" align="left">
                <b-form-input id="calling" v-model.trim="signupForm.calling" type="text"></b-form-input>
              </b-form-group>

              <b-form-group label="Organization" label-for="organization" description="Example : young men, young women, primary....." align="left">
                <b-form-input id="org" v-model.trim="signupForm.org" type="text" ></b-form-input>
              </b-form-group>

               <b-form-group label="Email" label-for="email2" description="Please Enter a valid Email Address to avoid delays. Example : you@email.com" align="left">
                <b-form-input id="email2" v-model.trim="signupForm.email" type="text"></b-form-input>
              </b-form-group>

              <b-form-group label="Password" label-for="password2" description="min of 6 characters" align="left">
                <b-form-input id="password2" v-model.trim="signupForm.password" type="password"></b-form-input>
              </b-form-group>


             

              
             
              <!-- <div>
                <label for="password2">Password</label>
                <input id="password2" v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" />
              </div> -->

              <b-btn style="width:100%" @click="signup()">Sign Up</b-btn>

              <div class="extras">
                <a @click="toggleForm()">Back to Log In</a>
              </div>
            </form>
           
          </div>
        </section>

        </b-card>

 

      </b-col>
      <b-col></b-col>
    </b-row>

   
 <b-btn @click="petsafunction()">click to see weekend date</b-btn><br>

 
    <p style="color:white">{{signupForm.petsa}}</p>


  </div>
</template>

<script>
// import firebase from 'firebase';
//  import passwordReset from './passwordReset';
 import { auth } from '../attendancefirebase'


export default {
   name: "Login",
  components: {
    // passwordReset
  },
  data() {
    return {
      // email: "",
      // password: ""
       loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: '',
        petsa:'',

        stake:'',
        ward:'',
        calling: '',
        org:''
      },
      showLoginForm: true,
      // showPasswordReset: false,

      //////////////////////// for password reset props
      email: '',
      showSuccess: false,
      errorMsg: '',
      value:''
    }
  },
  methods: {


    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    // togglePasswordReset() {
    //   this.showPasswordReset = !this.showPasswordReset
    // },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {

      this.petsafunction();

      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        petsa:this.signupForm.petsa,

        stake:this.signupForm.stake,
        ward:this.signupForm.ward,
        calling: this.signupForm.calling,
        org:this.signupForm.org

      })
    },

    async resetPassword() {
      // reset logic
      this.errorMsg = ''

        try {
            await auth.sendPasswordResetEmail(this.email)
            this.showSuccess = true
        } catch (err) {
            this.errorMsg = err.message
        }
    },

    petsafunction(){

      let endOfWeek = function(date){
        
        var lastday = date.getDate() - (date.getDay() - 1) + 6;
        return new Date(date.setDate(lastday));
      }

    let dt = new Date(); 

    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let x = endOfWeek(dt);
    let a = x.getDate();
    //let b = x.getMonth() + 1;
    let b = months[x.getMonth()];
    let c = x.getFullYear();

    let fixdate = b +" "+ a +", " + c;

    console.log(fixdate);
    this.signupForm.petsa = fixdate;

    },

  

 
  



  }
};
</script>

<style>
#login,
#signUp {
  width: 100%;
}
</style>
