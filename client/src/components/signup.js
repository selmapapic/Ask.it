import React from "react";

const signup = () => {
    return (
        <form>
            <h3>Register</h3>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Enter password" />
            </div>
            <div><br></br></div>
            <button type="submit" className="btn btn-secondary btn-block">Register</button>
            <p className="forgot-password text-right">
                Already registered? <a href="#">Log in</a>
            </p>
        </form>
    )
}

export default signup
