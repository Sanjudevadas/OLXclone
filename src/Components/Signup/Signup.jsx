import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, db } from '../../firebase/Config'; // Ensure db is imported
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Logo from '../../../assets/images/olx-logo.svg';
import './Signup.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      /*await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        phone
      });*/

      console.log("Account Created and User Data Saved");

      // Redirect to login page
      navigate('/login');
    } catch (err) {
      console.error("Error creating account or saving user data:", err);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            required
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            id="phone"
            name="phone"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
