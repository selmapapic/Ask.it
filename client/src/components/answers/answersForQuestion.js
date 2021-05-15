import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './answersForQuestion.css'
import swal from 'sweetalert'
import Button from '../questions/button'
import AddAnswer from '../answers/addAnswer';
import Swal from 'sweetalert2'


const AnswersForQuestion = (props) => {
    const [answers, setAnswers] = useState([])
    const [qTitle, setQTitle] = useState('')
    const [qText, setQText] = useState('')
    const [qDate, setQDate] = useState('')
    const [qLike, setQLike] = useState(0)
    const [qDislike, setQDislike] = useState(0)
    const [noAnswers, setNoAnswers] = useState(0)
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        console.log(props)
        axios.get("https://askit-go-server.herokuapp.com/api/question/answers", { params: { id: props.location.state.id } })
            .then(res => {
                setAnswers(res.data)

                if (answers.length === 0 && res.data.length !== 0) {
                    setQTitle(res.data[0].Question.Title)
                    setQText(res.data[0].Question.Text)
                    setQDate(res.data[0].Question.Date)
                    setQLike(res.data[0].Question.Like)
                    setQDislike(res.data[0].Question.Dislike)
                    setNoAnswers(res.data.length)
                }
                else if (answers.length !== 0) {
                    setQTitle(answers[0].Question.Title)
                    setQText(answers[0].Question.Text)
                    setQDate(answers[0].Question.Date)
                    setQLike(answers[0].Question.Like)
                    setQDislike(answers[0].Question.Dislike)
                    setNoAnswers(answers.length)
                }

                if (props.location.state.fromQsPage === true) {
                    setQTitle(props.location.state.qForId.Title)
                    setQText(props.location.state.qForId.Text)
                    setQDate(props.location.state.qForId.Date)
                    setQLike(props.location.state.qForId.Like)
                    setQDislike(props.location.state.qForId.Dislike)
                }

            });
        return () => {

        }
    }, )

    const addLike = (e) => {
        e.preventDefault()
        const id = e.target.id
        console.log(id)
        axios.post("https://askit-go-server.herokuapp.com/api/answer/like",
            { id },
            {
                headers:
                    { "Context-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => {
            const fetchData = async () => {
                const { data } = await axios.get("https://askit-go-server.herokuapp.com/api/question/answers", { params: { id: props.location.state.id } });
                setAnswers(data);
            }
            fetchData();
        })
    }

    const addDislike = (e) => {
        e.preventDefault()
        const id = e.target.id
        console.log(id)

        axios.post("https://askit-go-server.herokuapp.com/api/answer/dislike",
            { id },
            {
                headers:
                    { "Context-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => {
            const fetchData = async () => {
                const { data } = await axios.get("https://askit-go-server.herokuapp.com/api/question/answers", { params: { id: props.location.state.id } });
                setAnswers(data);
            }
            fetchData();
        })
    }

    const showButtons = (id) => {
        if (id === props.location.state.loggedUser) return true
        return false
    }

    const deleteAnswer = (e) => {
        e.preventDefault()
        const id = e.target.id
        console.log(id)

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
                axios.delete("https://askit-go-server.herokuapp.com/api/answer",
                    {
                        data: {
                            id
                        },
                        headers:
                            { "Context-Type": "application/x-www-form-urlencoded" }
                    }
                ).then((res) => {
                    axios.get("https://askit-go-server.herokuapp.com/api/question/answers", { params: { id: props.location.state.id } })
                    .then(res => {
                        setAnswers(res.data)
                    })      
                });
                Swal.fire('Saved!', 'Answer deleted!', 'success')

            } else {
                swal("Cancelled", "Your answer is not deleted!", "error");
            }
        })
    }

    const editAnswer = (text, id) => {
        console.log(text, id)
        axios.put("https://askit-go-server.herokuapp.com/api/answer",
            { id, text },
            {
                headers:
                    { "Content-Type": "application/x-www-form-urlencoded" },
            }
        ).then((res) => { 
            axios.get("https://askit-go-server.herokuapp.com/api/question/answers", { params: { id: props.location.state.id } })
            .then(res => {
                setAnswers(res.data)
            });
            //Swal("Success!", "Your answer has been updated!", "success");

        })
    }

    return (
        <div>
            <div className="qDiv">
                <p className="qTitle"><b>Question title:</b> {qTitle}</p>
                <p><b>Question text:</b> {qText}</p>
                <p><b>Posted on:</b> {qDate}</p>
                <p><b>Likes:</b> {qLike}</p>
                <p><b>Dislikes:</b> {qDislike}</p>
                <p><b>Number of answers:</b> {noAnswers}</p>
            </div>

            <div className="list-group-my">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <br></br>
                <br></br>
                <h5 className="naslovh5"><b>Answers:</b></h5>
                {
                    answers.map(a =>
                        <div key={a.Id} className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <p className="mb-2">{a.Text}</p>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                                <p className="mb-2"><b>Posted by:</b> {a.User.Name} {a.User.Surname}</p>
                                <small>{a.Date}</small>
                            </div>
                            <div className="alignLeft">
                                <button onClick={addLike} className="likeBtn"><i className="fa fa-thumbs-up fa-like" id={a.Id} aria-hidden="true"></i></button> {a.Like}
                                <button onClick={addDislike} className="dislikeBtn"> <i className="fa fa-thumbs-down fa-dislike" id={a.Id}></i> </button> {a.Dislike}
                            </div>
                            <div className="alignRight">
                                {showButtons(a.User.Id) ?
                                    <Button
                                        icon={'fa fa-pencil'}
                                        color={'transparent'}
                                        onClick={() => setShowForm(!showForm)}
                                    /> :
                                    <div></div>}

                                {showButtons(a.User.Id) ?
                                    <Button
                                        icon={'fa fa-trash'} 
                                        color={'transparent'}
                                        onClick={deleteAnswer}
                                        id={a.Id}
                                    /> :
                                    <div></div>}

                                <div style={{ textAlign: "left" }}>
                                    {showForm && <AddAnswer id={a.Id} editText={a.Text} onAdd={ editAnswer }/>}
                                </div>

                            </div>

                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default AnswersForQuestion
