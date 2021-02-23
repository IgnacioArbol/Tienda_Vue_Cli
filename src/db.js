import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';

import {firebaseConfig} from './privado.js'

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();

  

  export default {
    auth: firebase.auth(),
    google() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(function(result){
        console.log(result);
        
        
      })
      .catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode,errorMessage, email,credential);
      })
    },
    twitter() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(function(result){
        console.log(result);
        
        
      })
      .catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode,errorMessage, email,credential);
      })
    },
    facebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(function(result){
        console.log(result);
        
        
      })
      .catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode,errorMessage, email,credential);
      })
    },
    logout(){
      firebase.auth().signOut()
      .then()
      .catch(function(error){
        console.log(error)
      })
    }
    
  }