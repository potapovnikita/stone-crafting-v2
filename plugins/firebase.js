import firebase from 'firebase'

export const firebaseConfig = {
    apiKey: "AIzaSyBk9CPhGNW9UXbhw81OSPtqlAKbANOlkJU",
    authDomain: "stone-crafting.firebaseapp.com",
    databaseURL: "https://stone-crafting.firebaseio.com",
    projectId: "stone-crafting",
    storageBucket: "stone-crafting.appspot.com",
    messagingSenderId: "244412279777",
    appId: "1:244412279777:web:76480e4955929be2c380a0",
    measurementId: "G-YC0DH51T9T"
}

console.log('firebaseConfig', firebaseConfig)

if (!firebase.apps.length) {
    firebase.initializeApp({});
}
export const db = firebase.firestore()



