// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC_CeOPz3f8YfTabxyytwtREOLHf16z1ag',
  authDomain: 'inzynierka-92bd6.firebaseapp.com',
  projectId: 'inzynierka-92bd6',
  storageBucket: 'inzynierka-92bd6.appspot.com',
  messagingSenderId: '309411074975',
  appId: '1:309411074975:web:56156b6c0676a7b56ee3aa',
  measurementId: 'G-P0W0WZX9EG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
