import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import LoginSignUp from './Components/LoginSignUp/LoginSignup'
import BasicTabs from './Components/LoginSignUp/Tabs'

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
