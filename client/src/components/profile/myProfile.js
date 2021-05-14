import React, { useState } from 'react';
import './myProfile.css';
import axios from "axios";
import { Row, Col,  Tab, TabContainer, Nav} from 'react-bootstrap'
import ProfileInfo from './profileInfo';
import PasswordEdit from './passwordEdit';


const MyProfile = (name, surname, email, password) => {
    /*const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submit = (e) => {
        e.preventDefault()
        axios.post("/api/user/register",
            { name, surname, email, password },
            {
                headers:
                    { "Content-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => { })


    }*/

    return (

        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Password</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <ProfileInfo />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <PasswordEdit />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default MyProfile


/*<form>
            <p>Name</p>
            <input type="text"></input> <br></br>
            <p>Surname</p>
            <input type="text"></input> <br></br>
            <p>Email</p>
            <input type="email"></input> <br></br>
            <p>Password</p>
            <input type="password"></input> <br></br>
            <button type="submit">Submit</button>
        </form>*/