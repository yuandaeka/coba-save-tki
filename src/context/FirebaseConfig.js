import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDryRDjkindfpSsQCWDGJt6KrJZHI1MBXQ",
  authDomain: "save-tki.firebaseapp.com",
  projectId: "save-tki",
  storageBucket: "save-tki.firebasestorage.app",
  messagingSenderId: "746801795271",
  appId: "1:746801795271:web:a3c12773cccbb4e9b3eee2",
  measurementId: "G-FHDQTY9E20"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
