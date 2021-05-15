import React, { useState, useEffect } from 'react';
//import '../../App.css';
import './myQuestions.css';
import axios from "axios";
import AddQuestion from "./addQuestion"
import Button from './button';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert'
import Swal from 'sweetalert2'

const MyQuestions = (props) => {
    const [userId, setUserId] = useState(props.id)
    const [questions, setQuestions] = useState([]);
    const [dbQs, setDbQs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [qId, setQId] = useState(0)
    const [index, setIndex] = useState(20)


    useEffect(() => {
        axios.get("https://askit-go-server.herokuapp.com/api/user/one")
            .then(res => {
                console.log(res.data.Id)
                setUserId(res.data.Id)
            });
        console.log(userId)
        if (userId !== 0 || userId !== undefined) {
            axios.get("https://askit-go-server.herokuapp.com/api/user/questions", { params: { id: userId } })
                .then(res => {
                    setQuestions(res.data);
                    setDbQs(res.data);
                });
        }
        return () => {
            //
        }
    }, [userId])

    //da se jednom refresha da bi se cookie obnovio
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }

    const addQuestion = (question) => {
        const id = props.id
        axios.post("https://askit-go-server.herokuapp.com/api/question",
            { question, id },
            {
                headers:
                    { "Context-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => {
            const fetchData = async () => {
                const { data } = await axios.get("https://askit-go-server.herokuapp.com/api/user/questions", { params: { id: props.id } });
                setQuestions(data);
            }
            fetchData();
            console.log(res);
        })
    }

    const deleteQuestion = (e) => {
        e.preventDefault()
        const id = e.target.id
        const form = e.target.form; // storing the form
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: `Save`,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("https://askit-go-server.herokuapp.com/api/question",
                    {
                        data: {
                            id
                        },
                        headers:
                            { "Context-Type": "application/x-www-form-urlencoded" }
                    }
                ).then((res) => {
                    const fetchData = async () => {
                        const { data } = await axios.get("https://askit-go-server.herokuapp.com/api/user/questions", { params: { id: props.id } });
                        setQuestions(data);
                    }
                    fetchData();
                    console.log(res);
                })
                Swal.fire('Saved!', 'Question deleted!', 'success')

            } else {
                swal("Cancelled", "Your question is not deleted!", "error");
            }
        })

    }

    const setRedirectTo = (e) => {
        e.preventDefault()
        setQId(e.target.id)
        setRedirect(true)
    }

    if (redirect) {
        return <Redirect to={{
            pathname: "/answersQ",
            state: { id: qId }
        }} />
    }

    const loadMore = (e) => {
        e.preventDefault()
        setIndex(index + 3)
    }

    const sortBy = type => {
        console.log(type)
        if (type === "Date") {
            setQuestions(dbQs)
            return
        }
        else if (type === "Likes") {
            const sorted = [...questions].sort((a, b) => b.Like - a.Like);
            setQuestions(sorted)
            return
        }
        else {
            const sorted = [...questions].sort((a, b) => b.Dislike - a.Dislike);
            setQuestions(sorted)
            return
        }
    }

    return (
        <div className="bodyMain">
            <h3>My Questions</h3>
            
            <br></br>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="list-group-my">
                {
                    questions.slice(0, index).map(q =>
                        <div key={q.Id} className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-2 h5">{q.Title}</h5>
                                <small>{q.Date} <button onClick={deleteQuestion} id={q.Id} className="removeBtn"> <i className="fa fa-remove xBtn"></i></button>
                                </small>
                            </div>
                            <p className="mb-2">{q.Text}</p>
                            <div className="d-flex w-100 justify-content-between">
                                <p><i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                    {q.Like} &nbsp; &nbsp;  <i className="fa fa-thumbs-down"></i> {q.Dislike}</p>
                                <button className="viewMore" id={q.Id} onClick={setRedirectTo}>View answers</button>
                            </div>
                        </div>
                    )

                }
                <button className="btn btn-secondary loadMore" onClick={loadMore}>Load More</button>

            </div>
            <div className="align-self-center mx-auto">
            <div>
                <label>Sort by:</label>
                <select className="customSelect" onChange={(e) => sortBy(e.target.value)}>
                    <option value="Date">Date</option>
                    <option value="Likes">Likes</option>
                    <option value="Dislikes">Dislikes</option>
                </select>
            </div>
            <br></br>
                <Button
                    color={showForm ? '#ed2139' : '#42ba96'}
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