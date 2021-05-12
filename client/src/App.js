import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login/login";
import SignUp from "./components/signup/signup"
import Homepage from "./components/homepage/homepage"
import MyQuestions from "./components/questions/myQuestions"
import QuestionsPage from './components/questions/questionsPage';
import Nav from "./components/nav/nav"

function App() {
  const isLoginSignup = window.location.pathname;
  console.log(isLoginSignup);
  return (<Router>
    <div className="App">
      <Nav />

      <div>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/log-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/homepage" component={Homepage} />
            <Route path="/my-questions" component={MyQuestions} />
            <Route path="/questions" component={QuestionsPage} />
          </Switch>
        </div>
      </div>
  </Router>
    
  );
}

export default App;
