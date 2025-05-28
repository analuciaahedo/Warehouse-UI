import './App.css';
import { useState } from 'react';
import LoginSignUp from './Components/LoginSignUp/LoginSignup'
import BasicTabs from './Components/Tabs'
import Dashboard from './pages/Dashboard.jsx';
import PackagesNavBar from './Components/PackagesNavBar.jsx'
import DetailsPanel from './Components/DetailsPanel.jsx'
import {BrowserRouter as Router, Routes,Route,} from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {isLoggedIn ? (
        <BasicTabs isLoggedIn={isLoggedIn} />
      ) : (
        <LoginSignUp onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
      
    </div>
  );
}

export default App;
