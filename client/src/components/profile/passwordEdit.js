import React, { useState } from 'react'
import axios from 'axios'

const PasswordEdit = (props) => {
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [checkPw, setCheckPw] = useState(true)


    const onSubmit = (e) => {
        e.preventDefault()
        console.log(newPass, confirmPass)
        if (newPass !== confirmPass) {
            alert("Passwords don't match!")
            setConfirmPass('')
        }


        const id = props.id
        e.preventDefault()
        axios.put("/api/user/update/password",
            { id, oldPass, newPass },
            {
                headers:
                    { "Content-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => {
            if (res.data === "Incorrect password!") {
                setCheckPw(false)
            }
            else {
                setCheckPw(true)
                setOldPass('')
                setNewPass('')
                setConfirmPass('')
            }
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-row profileInfo">
                <h5 style={{textAlign: "left"}} className="chngPass"><b>Change password</b></h5>
                <br></br>
                <div className="form-group col-md-8">
                    <label htmlFor="oldPassword" className="labelProfile">Old password</label>
                    <input type="password" className="form-control" id="oldPassword" pattern=".{5,}" title="minimum 5 characters" value={oldPass} onChange={e => setOldPass(e.target.value)} required />
                    {checkPw ? <p></p> : <p className="text-left" style={{ color: "red" }}>Incorrect password!</p>}
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="newPassword" className="labelProfile">New password</label>
                    <input type="password" className="form-control" id="newPassword" pattern="(?=.*[a-z]).{5,}" title="minimum 5 characters" value={newPass} onChange={e => setNewPass(e.target.value)} required />
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="confirmPassword" className="labelProfile">Confirm new password</label>
                    <input type="password" className="form-control" id="confirmPassword" pattern="(?=.*[a-z]).{5,}" title="minimum 5 characters" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} required />
                </div> <br></br>

                <button type="submit" className="btn btn-success col-3 btnSubmit">Submit</button>
                <br></br>
            </div>
        </form>
    )
}

export default PasswordEdit
