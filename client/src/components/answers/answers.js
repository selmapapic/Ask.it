import React, { useState, useEffect } from 'react';
import axios from "axios";

const Answers = (props) => {

    const [answers, setAnswers] = useState([]);

    useEffect(() => {

        axios.get("/api/answers/few", {params: {id: props.id}})
            .then(res => {
                setAnswers(res.data);
            });
        return () => {
            //
        }
    }, [])
    
    return (
        <div>
            {
                answers.map(a =>
                    <a href="#!" key={a.Id} className="list-group-item list-group-item-action flex-column align-items-start">
                        <p className="mb-2">{a.Text}</p>
                        <div className="d-flex w-100 justify-content-between">
                            <small><b>Answered by:</b> {a.User.Name} {a.User.Surname}</small>
                            <small>{a.Date}</small>
                        </div>
                    </a>

                )
            }

        </div>
    )
}

export default Answers
