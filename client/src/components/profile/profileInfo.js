import React, { useState, useEffect } from 'react'
import './profileInfo.css'
import axios from "axios";

const ProfileInfo = (props) => {
    const [ name, setName ] = useState(props.name)
    const [ surname, setSurname ] = useState(props.surname)
    const [ email, setEmail ] = useState(props.email)

    useEffect(() => {
        setName(props.name)
        setSurname(props.surname)
        setEmail(props.email)
    }, [props.name, props.surname, props.email])

    const onSubmit = (e) => {
        const id = props.id
        e.preventDefault()
        axios.put("/api/user/update",
            { id, name, surname, email },
            {
                headers:
                    { "Content-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => { })
    }

    return (
        <form onSubmit={onSubmit}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="form-row profileInfo" >
                <h4>Hello, <b>{props.name}</b> &#128522;</h4>
                <br></br>
                <p>You have asked <b>{props.totalQs}</b> questions.</p>
                <p>Total like number: <b>{props.totalLikes}</b></p>
                <p>Total dislike number: <b>{props.totalDislikes}</b></p>
                <hr className="solid"></hr>

                <div className="form-group col-md-8">
                    <label htmlFor="nameUser" className="labelProfile">Name</label>
                    <input type="text" className="form-control" id="nameUser" aria-describedby="emailHelp" defaultValue={props.name} onChange={e => setName(e.target.value)} required/>
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="surnameUser" className="labelProfile">Surname</label>
                    <input type="text" className="form-control" id="surnameUser" aria-describedby="emailHelp" defaultValue={props.surname} onChange={e => setSurname(e.target.value)} required/>
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="emailUser" className="labelProfile">Email address</label>
                    <input type="email" className="form-control" id="emailUser" aria-describedby="emailHelp" defaultValue={props.email} onChange={e => setEmail(e.target.value)} required/>
                </div> <br></br>

                <button type="submit" className="btn btn-success col-4 btnSubmit">Save changes</button>
                <br></br>
            </div>
        </form>

    )
}

export default ProfileInfo
