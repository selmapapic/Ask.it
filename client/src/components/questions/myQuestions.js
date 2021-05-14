import React, { useState, useEffect } from 'react';
//import '../../App.css';
import './myQuestions.css';
import axios from "axios";
import AddQuestion from "./addQuestion"
import Button from './button';

const MyQuestions = (props) => {
    const [userId, setUserId] = useState(props.id)
    const [questions, setQuestions] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get("/api/user/one")
            .then(res => {
                console.log(res.data.Id)
                setUserId(res.data.Id)
            });

        if (userId !== 0 || userId !== undefined) {
            axios.get("/api/user/questions", { params: { id: userId } })
                .then(res => {
                    setQuestions(res.data);

                });
        }
        return () => {
            //
        }
    }, [])

    //da se jednom refresha da bi se cookie obnovio
    if(!window.location.hash) {
		window.location = window.location + '#loaded';
		window.location.reload();
	}

    const addQuestion = (question) => {
        const id = props.id
        axios.post("/api/question",
            { question, id },
            {
                headers:
                    { "Context-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => {
            const fetchData = async () => {
                const { data } = await axios.get("/api/user/questions", { params: { id: props.id } });
                setQuestions(data);
            }
            fetchData();
            console.log(res);
        })
    }

    const deleteQuestion = (e) => {
        e.preventDefault()
        const id = e.target.id
        axios.delete("/api/question",
            {
                data: {
                    id
                },
                headers:
                    { "Context-Type": "application/x-www-form-urlencoded" }
            }
        ).then((res) => {
            const fetchData = async () => {
                const { data } = await axios.get("/api/user/questions", { params: { id: props.id } });
                setQuestions(data);
            }
            fetchData();
            console.log(res);
        })
    }


    return (
        <div className="bodyMain">
            <h3>My Questions</h3>
            <div>{props.name}</div>
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
                            <button onClick={deleteQuestion} id={q.Id}>Delete</button>
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
                <br></br>
                {showForm && <AddQuestion onAdd={addQuestion} />}
            </div>
        </div>
    )
}

export default MyQuestions