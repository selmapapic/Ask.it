import React from 'react'
import './profileInfo.css'

const ProfileInfo = (props) => {
    return (

        <form>
            <div className="form-row profileInfo">
                <h4>Hello, <b>{props.name}</b> :)</h4>
                <br></br>
                <p>You have asked <b>{props.totalQs}</b> questions.</p>
                <p>Total like number: <b>{props.totalLikes}</b></p>
                <p>Total dislike number: <b>{props.totalDislikes}</b></p>
                <hr className="solid"></hr>

                <div className="form-group col-md-8">
                    <label htmlFor="nameUser" className="labelProfile">Name</label>
                    <input type="email" className="form-control" id="nameUser" aria-describedby="emailHelp" defaultValue={props.name} />
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="surnameUser" className="labelProfile">Surname</label>
                    <input type="email" className="form-control" id="surnameUser" aria-describedby="emailHelp" defaultValue={props.surname} />
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="emailUser" className="labelProfile">Email address</label>
                    <input type="email" className="form-control" id="emailUser" aria-describedby="emailHelp" defaultValue={props.email} />
                </div> <br></br>

                <button type="submit" className="btn btn-primary col-3 btnSubmit">Submit</button>
                <br></br>
            </div>
        </form>

    )
}

export default ProfileInfo
