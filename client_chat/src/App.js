import './App.css';
import Socket from "./Components/socketIO.js";
import Login from "./Components/Login.js";
import React from "react";
// import { Router, Route, Switch } from "react-router";
import {BrowserRouter as Router, Route} from "react-router-dom"




const App = ()=> {

  return (
    <div>
      <Router>
        <Route path="/" exact component={Login}  />
        <Route path="/chat" exact component={Socket}  />
      </Router>
    </div>
  )
}

export default App;
