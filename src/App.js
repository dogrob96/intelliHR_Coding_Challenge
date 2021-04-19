import './App.css';
import SignIn from './signin'
import { React, useState } from 'react';
import { BrowserRouter as Router,
  Switch,
  Route } from "react-router-dom";
import Dashboard from './Dashboard';
import Test from './Test'

function App() {

  const [user, setUser] = useState("");
  if(!user) {
    return <SignIn  setUser={setUser} />
  }

  if(user && user.name === "GLaDOS") {
    return <Dashboard token={"token"} />
  }
  if(user){
       return <Test user={user} />
  }
  return "";
}

export default App;
