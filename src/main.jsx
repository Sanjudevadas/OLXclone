import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FirebaseContext } from './store/FirebaseContext.jsx'
import Context from './store/FirebaseContext.jsx'
import { db } from './firebase/Config.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
 
    <FirebaseContext.Provider value={db}>
    <Context>
    <App />
    </Context>
   
    </FirebaseContext.Provider>
   

)
