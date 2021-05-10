import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import "./questionsPage.css"
import axios from "axios";
import Answers from '../answers/answers';



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
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <h3 className="qs">Questions</h3>
            <Accordion className="accordion">
                {
                    questions.map(q =>
                        <Card >
                            <Accordion.Toggle as={Card.Header} eventKey={q.Id} >
                                <div className="d-flex w-100 justify-content-between">
                                    <p>{q.Title}</p>
                                    <small>{q.Date}</small>
                                </div>
                                <p>Description: &nbsp; {q.Text}</p>
                                <p><i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                    {q.Like} &nbsp; &nbsp;  <i className="fa fa-thumbs-down"></i> {q.Dislike}</p>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={q.Id}>
                                <Card.Body>
                                    <Answers />
                                    <button className="btn btn-primary">View all</button>
                                </Card.Body>
                            </Accordion.Collapse>

                        </Card>

                    )
                }
            </Accordion>
        </div>
    )
}

export default QuestionsPage
