import { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA43wCWYLWMOUGUC4znm-IhivAQ-JAeRnA",
  authDomain: "scheduler-5940a.firebaseapp.com",
  databaseURL: "https://scheduler-5940a-default-rtdb.firebaseio.com",
  projectId: "scheduler-5940a",
  storageBucket: "scheduler-5940a.appspot.com",
  messagingSenderId: "237048483960",
  appId: "1:237048483960:web:e9f42ef6b40e5138e79d8d",
  measurementId: "G-9S8W1C09BE"
};

  
  // Initialize Firebase

  const firebase = initializeApp(firebaseConfig);

  const database = getDatabase(firebase);


  export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

