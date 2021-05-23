import React, { useState } from 'react';
import '../../App.css';
import '../login/login.css';
import axios from "axios";
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";


const Signup = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        axios.post("/api/user/register",
            { name, surname, email, password },
            {
                headers:
                    { "Content-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => { })

        setRedirect(true)

    }

    if (redirect) {
        return <Redirect to="/log-in" />
    }
    return (
        <div className="outer">
            <div className="inner">
                <form onSubmit={submit}>
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" onChange={e => setName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" onChange={e => setSurname(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Password *</label>
                        <input type="password" className="form-control" pattern=".{5,}" placeholder="Enter password" title="minimum 5 characters" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <small id="passwordHelpBlock" class="form-text text-muted" style={{ fontSize: "8pt" }}>* Your password must be minimum 5 characters long, and must not contain spaces or emoji.</small>
                    <div><br></br></div>
                    <button type="submit" className="btn btn-secondary btn-block">Register</button>
                    <p className="forgot-password text-right">
                        <Link className="nav-link" to={"/log-in"}>Already registered? <b>Log in</b></Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
