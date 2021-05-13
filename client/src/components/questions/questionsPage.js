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

    const addLike = (e) => {
        e.preventDefault()
        const id = e.target.id
        axios.post("/api/question/like",
            {id},
            {
                headers:
                    { "Context-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => {
            const fetchData = async () => {
                const { data } = await axios.get("/api/question");
                setQuestions(data);
            }
            fetchData();
        })
    }

    const addDislike = (e) => {
        e.preventDefault()
        const id = e.target.id
        axios.post("/api/question/dislike",
            {id},
            {
                headers:
                    { "Context-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => {
            const fetchData = async () => {
                const { data } = await axios.get("/api/question");
                setQuestions(data);
            }
            fetchData();
        })
    }



    return (
        <div className="okvir">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <h3 className="qs">Questions</h3>
            <Accordion className="accordion">
                {
                    questions.map(q =>
                        <Card key={q.Id}>
                            <Accordion.Toggle as={Card.Header} eventKey={q.Id} >
                                <div className="d-flex w-100 justify-content-between">
                                    <p>{q.Title}</p>
                                    <small>{q.Date}</small>
                                </div>
                                <p>Description: &nbsp; {q.Text}</p>
                                <button onClick={addLike} className="likeBtn"><i className="fa fa-thumbs-up fa-like" id={q.Id} aria-hidden="true"></i></button> {q.Like}
                                &nbsp; &nbsp;
                                <button onClick={addDislike} className="dislikeBtn"> <i className="fa fa-thumbs-down fa-dislike" id={q.Id}></i> </button> {q.Dislike}
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
