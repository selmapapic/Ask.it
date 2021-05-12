import React from 'react'
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";


const Nav = (props) => {
    const logout = () => {
        axios.post("/api/user/logout",
            { withCredentials: true },
            {
                headers:
                    { "Context-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => {
        })

        props.setName('')
    }

    let menu;

    if (props.name === '' || props.name === undefined) {
        menu = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/homepage"}>Home</Link>
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
        )
    }

    else {
        menu = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/homepage"}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/questions"}>Questions page</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/my-questions"}>My Questions</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/log-in"} onClick={logout}>Logout</Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <ScrollUpButton AnimationDuration={100} />
                <Link className="navbar-brand" to={"/homepage"}>Ask.it</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    {menu}
                </div>
            </div>
        </nav>
    )
}

export default Nav
