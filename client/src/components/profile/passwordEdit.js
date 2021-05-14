import React from 'react'

const PasswordEdit = () => {
    return (
        <form>
        <div className="form-row profileInfo">
            <div className="form-group col-md-8">
                <label htmlFor="oldPassword" className="labelProfile">Old password</label>
                <input type="email" className="form-control" id="oldPassword" aria-describedby="emailHelp" />
            </div>
            <div className="form-group col-md-8">
                <label htmlFor="surnameUser" className="labelProfile">New password</label>
                <input type="email" className="form-control" id="surnameUser" aria-describedby="emailHelp" />
            </div>
            <div className="form-group col-md-8">
                <label htmlFor="emailUser" className="labelProfile">Confirm new password</label>
                <input type="email" className="form-control" id="emailUser" aria-describedby="emailHelp" />
            </div> <br></br>

            <button type="submit" className="btn btn-primary col-3 btnSubmit">Submit</button>
            <br></br>
        </div>
    </form>
    )
}

export default PasswordEdit
