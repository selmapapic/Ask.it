import React from 'react'

const PasswordEdit = () => {
    return (
        <form>
        <div className="form-row profileInfo">
            <div class="form-group col-md-8">
                <label for="oldPassword" className="labelProfile">Old password</label>
                <input type="email" class="form-control" id="oldPassword" aria-describedby="emailHelp" />
            </div>
            <div class="form-group col-md-8">
                <label for="surnameUser" className="labelProfile">New password</label>
                <input type="email" class="form-control" id="surnameUser" aria-describedby="emailHelp" />
            </div>
            <div class="form-group col-md-8">
                <label for="emailUser" className="labelProfile">Confirm new password</label>
                <input type="email" class="form-control" id="emailUser" aria-describedby="emailHelp" />
            </div> <br></br>

            <button type="submit" class="btn btn-primary col-3 btnSubmit">Submit</button>
            <br></br>
        </div>
    </form>
    )
}

export default PasswordEdit
