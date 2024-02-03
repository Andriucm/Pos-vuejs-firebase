import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDbaqk1mRO2l9fBYxMblVnkUi5U_Vi8u7U",
  authDomain: "point-of-sale-vuejs.firebaseapp.com",
  projectId: "point-of-sale-vuejs",
  storageBucket: "point-of-sale-vuejs.appspot.com",
  messagingSenderId: "626052361717",
  appId: "1:626052361717:web:3c8fe0fd29ad89e46344bc"
};

export const firebaseApp = initializeApp(firebaseConfig)