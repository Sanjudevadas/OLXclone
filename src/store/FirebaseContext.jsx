// FirebaseContext.js

import React, { createContext, useState, useEffect } from 'react';
import { auth ,db} from '../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  // Provide auth and db contexts here
  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from onAuthStateChanged

  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const Context = ({ children }) => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default Context;
