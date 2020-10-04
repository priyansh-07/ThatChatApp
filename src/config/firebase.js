import firebase from 'firebase';
const firebaseConfig = {
	apiKey: "AIzaSyCdeyhljo2myz8K3-ElZUbFg8ChjCBb5PQ",
	authDomain: "fir-basics-e52e2.firebaseapp.com",
	databaseURL: "https://fir-basics-e52e2.firebaseio.com",
	projectId: "fir-basics-e52e2",
	storageBucket: "fir-basics-e52e2.appspot.com",
	messagingSenderId: "156591896236",
	appId: "1:156591896236:web:8848554b5c3bb2226ed109"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export const fbauth = firebaseApp.auth();