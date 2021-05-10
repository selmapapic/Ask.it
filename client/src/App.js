import './App.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login/login";
import SignUp from "./components/signup/signup"
import Homepage from "./components/homepage/homepage"
import MyQuestions from "./components/questions/myQuestions"

function App() {
  const isLoginSignup = window.location.pathname;
  console.log(isLoginSignup);
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
        <ScrollUpButton AnimationDuration={100}/>
          <Link className="navbar-brand" to={"/homepage"}>Ask.it</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/homepage"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/my-questions"}>My Questions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/log-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/log-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/homepage" component={Homepage} />
            <Route path="/my-questions" component={MyQuestions} />
          </Switch>
        </div>
      </div>
  </Router>
    
  );
}

export default App;
