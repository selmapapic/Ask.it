import React from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";


const Nav = () => {
    return (
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
                <Link className="nav-link" to={"/questions"}>Questions page</Link>
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
    )
}

export default Nav
