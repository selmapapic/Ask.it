import React, { Component } from "react";
import '../../App.css';


const login = () => {
    return (
        <div className="inner">
            <form>
                <h3>Log In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Enter password" />
                </div>

                <div><br></br></div>
                <button type="submit" className="btn btn-secondary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </div>
    )
}

export default login