import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export const fbauth = firebaseApp.auth();