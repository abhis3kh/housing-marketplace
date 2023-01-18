// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// importing fireStorage for storage
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCtl2PqTIiHztkqmBdwcEN6MQqJxH5sca0',
  authDomain: 'housing-marketplace-app-007.firebaseapp.com',
  projectId: 'housing-marketplace-app-007',
  storageBucket: 'housing-marketplace-app-007.appspot.com',
  messagingSenderId: '99507719149',
  appId: '1:99507719149:web:d4386859e18cd8c8a3f5e4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
