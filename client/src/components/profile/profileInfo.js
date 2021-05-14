import React from 'react'
import './profileInfo.css'

const ProfileInfo = (props) => {
    return (

        <form>
            <div className="form-row profileInfo">
                <h4>Hello, <b>Selma</b> :)</h4>
                <br></br>
                <p>You have asked <b>xxx</b> questions.</p>
                <p>Total like number: <b>123</b></p>
                <p>Total dislike number: <b>456</b></p>
                <hr class="solid"></hr>

                <div class="form-group col-md-8">
                    <label for="nameUser" className="labelProfile">Name</label>
                    <input type="email" class="form-control" id="nameUser" aria-describedby="emailHelp" value={props.name} />
                </div>
                <div class="form-group col-md-8">
                    <label for="surnameUser" className="labelProfile">Surname</label>
                    <input type="email" class="form-control" id="surnameUser" aria-describedby="emailHelp" value={props.surname} />
                </div>
                <div class="form-group col-md-8">
                    <label for="emailUser" className="labelProfile">Email address</label>
                    <input type="email" class="form-control" id="emailUser" aria-describedby="emailHelp" value={props.email} />
                </div> <br></br>

                <button type="submit" class="btn btn-primary col-3 btnSubmit">Submit</button>
                <br></br>
            </div>
        </form>

    )
}

export default ProfileInfo
