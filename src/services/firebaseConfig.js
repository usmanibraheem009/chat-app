// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNHho4x6ot_0Y5mKG2XuHCT55fYB7jIH4",
  authDomain: "react-chat-app-2cf7d.firebaseapp.com",
  projectId: "react-chat-app-2cf7d",
  storageBucket: "react-chat-app-2cf7d.firebasestorage.app",
  messagingSenderId: "801423090274",
  appId: "1:801423090274:web:c1dcaabb47b9518b94273b"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const database = getDatabase(app);
export const db = getFirestore(app);

export default app;