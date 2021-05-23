import React, { useState } from 'react';
import '../../App.css';
import './login.css';
import axios from "axios";
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";



const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [checkPw, setCheckPw] = useState(true)


    const submit = (e) => {
        e.preventDefault()
        axios.defaults.withCredentials = true
        axios.post("/api/user/login",
            { email, password },
            { withCredentials: true },
            {
                headers:
                {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin" : "*"
                }
            }
        ).then((res) => {
            if (res.data === "Incorrect password!") {
                setCheckPw(false)
            }
            else if (res.data === "No user found") {
                alert("No account found. Please register first!")
                setEmail('')
                setPassword('')
            }
            else {
                setCheckPw(true)
                setRedirect(true)
                props.setName(res.data.Name)
            }
        })

    }

    if (redirect) {
        return <Redirect to="/my-questions" />
    }

    return (
        <div className="outer">
            <div className="inner">
                <form onSubmit={submit}>
                    <h3>Log In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" required onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" pattern=".{5,}" placeholder="Enter password" required onChange={e => setPassword(e.target.value)} />
                        {checkPw ? <div></div> : <div style={{ color: "red" }}>Incorrect password!</div>}
                    </div>

                    <div><br></br></div>
                    <button type="submit" className="btn btn-secondary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        <Link className="nav-link" to={"/sign-up"}>No account? <b>Register</b></Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login