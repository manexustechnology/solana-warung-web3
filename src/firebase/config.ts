
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration for demo purposes
// Use your own config if implementing in production
const firebaseConfig = {
  apiKey: "AIzaSyBjxjdGbgNFJdAlsz-fhTcxhbDMaDE1OGo",
  authDomain: "lovable-pos-demo.firebaseapp.com",
  projectId: "lovable-pos-demo",
  storageBucket: "lovable-pos-demo.appspot.com",
  messagingSenderId: "246741038401",
  appId: "1:246741038401:web:d3b1e786f4a8cf57e67984"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
