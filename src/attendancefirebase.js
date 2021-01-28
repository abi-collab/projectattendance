import firebase from 'firebase/app'// i erase * as
import 'firebase/auth'
import 'firebase/firestore'




// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyD1gPzlqpPU1e6PCQvvMOOF1F0g3lj34x0",
  authDomain: "attendanceproject-9ea05.firebaseapp.com",
  databaseURL: "https://attendanceproject-9ea05.firebaseio.com",
  projectId: "attendanceproject-9ea05",
  storageBucket: "attendanceproject-9ea05.appspot.com",
  messagingSenderId: "265784003239",
  appId: "1:265784003239:web:64cb0fe1891d29c70d6982"
};


 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 // utils
const db = firebase.firestore()
export const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
export const postsCollection = db.collection('posts')
export const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')





// export utils/refs
export default{
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,





}