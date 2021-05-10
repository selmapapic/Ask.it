import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import "./questionsPage.css"
import axios from "axios";



const QuestionsPage = () => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/question");
            setQuestions(data);
        }
        fetchData();
        return () => {
            //
        }
    }, [])

    return (
        <div className="okvir">
            <h3 className="qs">Questions</h3>
            <Accordion className="accordion">
                {
                    questions.map(q =>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={q.Id}>
                                {q.Title}
                                <br></br>
                                {q.Date}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={q.Id}>
                                <Card.Body>Hello! I'm the body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                }
            </Accordion>
        </div>
    )
}

export default QuestionsPage
