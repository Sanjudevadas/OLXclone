import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Signup from '../Pages/Signup';
import LoginPage from '../Pages/Login';
import { AuthContext } from '../store/FirebaseContext';
import { FirebaseContext } from '../store/FirebaseContext';
import { onAuthStateChanged } from 'firebase/auth';
import CreatePage from '../Pages/Create';
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
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;
