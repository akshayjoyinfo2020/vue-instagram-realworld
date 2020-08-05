import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
    apiKey: "AIzaSyCgwvkBl5LZdl4nmsZlHQOTxe8qsyYYTB0",
    authDomain: "vue-gram-aj.firebaseapp.com",
    databaseURL: "https://vue-gram-aj.firebaseio.com",
    projectId: "vue-gram-aj",
    storageBucket: "vue-gram-aj.appspot.com",
    messagingSenderId: "1075360961582",
    appId: "1:1075360961582:web:d5b9cc40628f97e48d7bbf",
    measurementId: "G-XQDWGFE22C"
  };
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}