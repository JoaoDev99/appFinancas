import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDKoMUkJqdRVoC7Pbc2q3z3ou28binq3mc",
  authDomain: "appfinancas-43d31.firebaseapp.com",
  databaseURL: "https://appfinancas-43d31-default-rtdb.firebaseio.com",
  projectId: "appfinancas-43d31",
  storageBucket: "appfinancas-43d31.appspot.com",
  messagingSenderId: "682513676703",
  appId: "1:682513676703:web:d2330680452e56417825aa",
  measurementId: "G-61704ERZPP"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default firebaseConfig;