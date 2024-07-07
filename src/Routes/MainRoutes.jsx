import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Signup from '../Pages/Signup';
import LoginPage from '../Pages/Login';
import { AuthContext } from '../store/FirebaseContext';
import { FirebaseContext } from '../store/FirebaseContext';
import { onAuthStateChanged } from 'firebase/auth';

function MainRoutes() {
  const { user, setUser } = useContext(AuthContext); // Destructure setUser from AuthContext
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  
  }, []);

  console.log(user, 'user in home page');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;
