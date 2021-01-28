import Vue from "vue";
import Vuex from "vuex";

import  fb from '../attendancefirebase.js'
import router from '../router/index.js'

import firebase from 'firebase'







Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],


  },
  
  mutations: {

    setUserProfile(state, val) {
      state.userProfile = val 
    },
    setPosts(state, val) {
      state.posts = val
    }
    
  },
  actions: {

    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
    
      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        stake: form.stake,
        ward: form.ward,
        calling: form.calling,
        org: form.org,
        logs:[],
        chartdates:[form.petsa],
        listname:[],

      })
    
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },

    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
  
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      commit('setUserProfile', userProfile.data())
    
      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },

    async logout({ commit }) {

      
      await fb.auth.signOut()
      console.log("you just log out");
    
      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      router.push('/login')
    },

    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      // update user object
     await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })
    
      dispatch('fetchUserProfile', { uid: userId })
    },

    async addDates({ dispatch }, chartValue) {
      const userId = fb.auth.currentUser.uid

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

      // update user object
     await fb.usersCollection.doc(userId).update({ 
        //chartdates: fixdate
        chartdates: firebase.firestore.FieldValue.arrayUnion(chartValue)
       
      })
    
      dispatch('fetchUserProfile', { uid: userId })
    
    },

    async addperson({ dispatch }, form) {

      const user  = fb.auth.currentUser.uid

      await fb.usersCollection.doc(user).update({
        listname:firebase.firestore.FieldValue.arrayUnion({
  
          lastname:form.lastname,
          firstname:form.firstname,
          mname:form.middlename
       
      })
    })
       dispatch('fetchUserProfile',{ uid: user })
    },

    
   


    // async editperson({dispatch}, form){

    //   const user  = fb.auth.currentUser.uid

    //   await fb.usersCollection.doc(user).update({
    //     listname:firebase.firestore.FieldValue.update({
  
    //       lastname:form.lastname,
    //       firstname:form.firstname,
    //       age:form.age
       
    //   })
    // })
    //    dispatch('fetchUserProfile',{ uid: user })
      
    // }
    async log({dispatch}, present){
      
      
      // let endOfWeek = function(date){  
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



      const user  = fb.auth.currentUser.uid
              fb.usersCollection.doc(user).update({
                 logs: firebase.firestore.FieldValue.arrayUnion({present,date_Entered:new Date()})
                 
              
            })

            console.log(present)
            dispatch('fetchUserProfile',{ uid: user })
    },
    

    //////////////////////////////////////////////////////////try...
  //   async collect({dispatch}){

  //     const user  = fb.auth.currentUser.uid
  //     let g = this.state.userProfile.logs;
  //     let result = {}

  //      //convert to key value pairs
  //      for (var i = 0; i < g.length; i++) {
  //       result [g[i].present] = g[i].present;
  //     }
   
  //  //convert to display only the value, not the key or entries
  //     let cge = Object.values(result);
      
  //      for (var ii = 0; ii < cge.length; ii++) {
  //       this.state.userProfile.logs = cge[ii].length;

  //      }
  //      dispatch('fetchUserProfile',{ uid: user })
  //   }


  // async tangal({dispatch}){
   
  //   const user  = fb.auth.currentUser.uid

  //           fb.usersCollection.doc(user).update({
  //              logs: firebase.firestore.FieldValue.this.state.userProfile.logs.pop()
               
            
  //         })
  //         dispatch('fetchUserProfile',{ uid: user })
  // },
    
    
   },
  modules: {}
});


export default store;

// realtime firebase connection
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  // logic goes here
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)
})