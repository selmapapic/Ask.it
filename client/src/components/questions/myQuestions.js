import React, { useState, useEffect } from 'react';
//import '../../App.css';
import './myQuestions.css';
import axios from "axios";
import AddQuestion from "./addQuestion"
import Button from './button';

const MyQuestions = () => {

    const [questions, setQuestions] = useState([]);
    const [showForm, setShowForm] = useState(false);

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

    const addQuestion = (question) => {
        console.log(question);
        axios.post("/api/question",
            { question },
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
            console.log(res);
        })
    }


    return (
        <div className="bodyMain">
            <h3>My Questions</h3>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="list-group-my">
                {
                    questions.map(q =>
                        <a href="#!" key={q.Id} className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-2 h5">{q.Title}</h5>
                                <small>{q.Date}</small>
                            </div>
                            <p className="mb-2">{q.Text}</p>
                            <p><i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                {q.Like} &nbsp; &nbsp;  <i className="fa fa-thumbs-down"></i> {q.Dislike}</p>
                        </a>
                    )
                }

            </div>
            <div className="align-self-center mx-auto">
                <Button
                    color={showForm ? 'red' : 'green'}
                    text={showForm ? 'Close form' : 'Add new question'}
                    icon={showForm ? 'fa fa-times' : 'fa fa-plus'}
                    onClick={() => setShowForm(!showForm)}
                />
                {showForm && <AddQuestion onAdd={addQuestion} />}
            </div>
        </div>
    )
}

export default MyQuestions