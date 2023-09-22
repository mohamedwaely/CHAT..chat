import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAb-0gdOho7ghHfZF5fDBF_KKqR078eks",
  authDomain: "chat-chat-16705.firebaseapp.com",
  projectId: "chat-chat-16705",
  storageBucket: "chat-chat-16705.appspot.com",
  messagingSenderId: "228955309566",
  appId: "1:228955309566:web:ca8b8db9fb078dff2cecaf",
  measurementId: "G-QS1EBQT7P2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

