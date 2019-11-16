import firebase from 'firebase';
import admin from './admin';

const firebaseAppAuth = admin.firebase.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default { providers, firebaseAppAuth };
