import React, { useState, useEffect } from 'react';
import './myProfile.css';
import axios from "axios";
import { Row, Col,  Tab, Nav} from 'react-bootstrap'
import ProfileInfo from './profileInfo';
import PasswordEdit from './passwordEdit';


const MyProfile = (props) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [noQ, setNoQ] = useState(0)
    const [noLikes, setNoLikes] = useState(0)
    const [noDislikes, setNoDislikes] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
          const { data } = await axios.get("https://askit-go-server.herokuapp.com/api/user/one");
          setName(data.Name)
          setSurname(data.Surname)
          setEmail(data.Email)
        }
        fetchData();
        return () => {
          //
        }
      }, )

      useEffect(() => {
        const fetchData = async () => {
          const { data } = await axios.get("https://askit-go-server.herokuapp.com/api/user/one/info", { params: { id: props.id } })
          setNoQ(data.TotalQuestions)
          setNoLikes(data.TotalLikes)
          setNoDislikes(data.TotalDislikes)

        }
        fetchData();
        return () => {
          //
        }
      }, [])

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
                            <ProfileInfo id={props.id} name={name} surname={surname} email={email} totalQs={noQ} totalLikes={noLikes} totalDislikes={noDislikes}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <PasswordEdit id={props.id}/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default MyProfile