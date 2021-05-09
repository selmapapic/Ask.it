import React, { Component, useState, useEffect } from 'react';
//import '../../App.css';
import './myQuestions.css';
import axios from "axios";
import Question from "./question"

const perPage = 3;

const MyQuestions = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

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
        <div>
            <div className="list-group-my">
                {
                    questions.map(q =>
                        <a href="#!" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div key={q.Id} class="d-flex w-100 justify-content-between">
                                <h5 class="mb-2 h5">{q.Title}</h5>
                                <small>{q.Date}</small>
                            </div>
                            <p class="mb-2">{q.Text}</p>
                            <small>{q.Like}, {q.Dislike}</small>
                        </a>
                    )
                }

            </div>
            <h3>My Questions</h3>
            <ul className="list-group-my" id="questions">
                {questions.map(q =>
                    <li key={q.Id} className="list-group-item">
                        {q.Title}
                    </li>
                )}


            </ul>
        </div>
    )
}

export default MyQuestions






/*const questionsPerPage = 3;
let arrayForQuestions = [];


const MyQuestions = () => {

    const [questions, setQuestions] = useState([]);
    const [next, setNext] = useState(3);

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

    const loopWithSlice = (start, end) => {
        const slicedQuestions = questions.slice(start, end);
        arrayForQuestions = [...arrayForQuestions, ...slicedQuestions];
        setQuestions(arrayForQuestions);
      };

      useEffect(() => {
        loopWithSlice(0, questionsPerPage);
      }, []);

      const handleShowMoreQuestions = () => {
        loopWithSlice(next, next + questionsPerPage);
        setNext(next + questionsPerPage);
      };

    return (
        <div>
            <h3>Newest questions</h3>
            <Question questionToRender={questions} />
            <button onClick={handleShowMoreQuestions}> Load more</button>


        </div>
    )
}

export default MyQuestions*/
