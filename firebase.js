import { initializeApp } from 'firebase/app';

function storeHighScore(userId, score) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId);
  set(reference, {
    highscore: score,
  });
}

const firebaseConfig = {
  apiKey: "AIzaSyBmF0K885UwXSFjYutTcKEq7gHTb1l8Zw8",
  authDomain: "smartfarm-8f5f5.firebaseapp.com",
  databaseURL: "https://smartfarm-8f5f5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartfarm-8f5f5",
  storageBucket: "smartfarm-8f5f5.appspot.com",
  messagingSenderId: "55631674967",
  appId: "1:55631674967:web:630022fa9fd1cfabc9ed12",
  measurementId: "G-HMJP9JWH7M"
};
  

const myApp = initializeApp(firebaseConfig);

export default myApp;