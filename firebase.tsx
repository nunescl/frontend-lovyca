import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as firebase from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'AIzaSyDg3WqSj_RFrnOTlYuhDb0WX3Hw85626wc',
  authDomain: 'lovyca-challenge.firebaseapp.com',
  databaseURL: 'https://lovyca-challenge-default-rtdb.firebaseio.com',
  projectId: 'lovyca-challenge',
  storageBucket: 'lovyca-challenge.appspot.com',
  messagingSenderId: '10168422194',
  appId: '1:10168422194:web:919c5829a5ed212a11d12b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// export const db = getFirestore(app);

export default firebase;
