import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/Config'; // Ensure db is imported
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Logo from '../../../assets/images/olx-logo.svg';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate hook for navigation

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore if needed
            /*
            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
                phone
            });
            */

            //alert('Logged In');
            navigate('/'); // Redirect to home page
        } catch (err) {
            alert(err.message);
            console.error(err.message);
        }
    };

    return (
        <div>
            <div className="loginParentDiv">
                <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        className="input"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        className="input"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <br />
                    <button type="submit">Login</button>
                </form>
                <a href="/signup">Signup</a>
            </div>
        </div>
    );
}

export default Login;
