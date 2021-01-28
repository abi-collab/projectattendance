<template>
  <div>
    <!-- <b-row>
      <b-col></b-col>
      <b-col cols="10" md="6" sm="12" align="center">
        <br />
        <br />
        <h4>Create an account ang start organizing attendances</h4>
        <br />
        <br />

      

        <b-form>
          <b-input-group class="mb-2"
            >
            <b-input-group-prepend is-text>
              <b-icon icon="share"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="stake"
              type="text"
              placeholder="Stake"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2"
            >
            <b-input-group-prepend is-text>
              <b-icon icon="circle"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="ward"
              type="text"
              placeholder="Ward"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2"
            >
            <b-input-group-prepend is-text>
              <b-icon icon="diagram3"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="auxOrg"
              type="text"
              placeholder="Auxiliary Organization"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2"
            >
            <b-input-group-prepend is-text>
              <b-icon icon="person-circle"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="calling"
              type="text"
              placeholder="Calling"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2"
            >
            <b-input-group-prepend is-text>
              <b-icon icon="envelope"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="email"
              type="text"
              placeholder="Email"
              required
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2"
            >
            <b-input-group-prepend is-text>
              <b-icon icon="lock"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="password"
              type="text"
              placeholder="Password"
              required
            ></b-form-input>
          </b-input-group>

          <br />

          <b-btn id="signUp" variant="info" @click="signUp()">Submit</b-btn>
        </b-form>
      </b-col>
      <b-col></b-col>
    </b-row> -->



    <form @submit.prevent>
  <h1>Get Started</h1>
  <div>
    <label for="name">Name</label>
    <input id="name" v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" />
  </div>
  <div>
    <label for="title">Title</label>
    <input id="title" v-model.trim="signupForm.title" type="text" placeholder="Company" />
  </div>
  <div>
    <label for="email2">Email</label>
    <input id="email2" v-model.trim="signupForm.email" type="text" placeholder="you@email.com" />
  </div>
  <div>
    <label for="password2">Password</label>
    <input id="password2" v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" />
  </div>
  <button  class="button" @click="signup()">Sign Up</button>
  <div class="extras">
    <a @click="toggleForm()">Back to Log In</a>
  </div>
</form>


  </div>
</template>

<script>
//import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      // email: "",
      // password: "",
      // stake: "",
      // ward: "",
      // auxOrg: "",
      // calling: ""

        // add signup form to data() 
        signupForm: {
          name: '',
          title: '',
          email: '',
          password: ''
        }



    }
  },
  methods: {
  //   signUp() {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(this.email, this.password)
  //       .then(user => {
  //         // here you can use either the returned user object or
  //         //firebase.auth().currentUser. I will use the returned user object
  //         // if(user){
  //         //   user.updateProfile({
  //         //      stake: this.stake,
  //         //      ward: this.ward,
  //         //      auxOrg: this.auxOrg,
  //         //      calling: this.calling
  //         //   }).then(
  //         //     (s)=>console.log(s+"qwerty")
  //         //   )
  //         // }

  //         console.log(user);
  //       })
  //       .catch(function(error) {
  //         // Handle Errors here.
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         console.log(errorCode);
  //         console.log(errorMessage);

  //         // ...
  //       });
  //   }


        signup() {
        this.$store.dispatch('signup', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name,
          title: this.signupForm.title
        })
      }
   }
}
</script>

<style>
#signUp {
  width: 100%;
}
</style>
