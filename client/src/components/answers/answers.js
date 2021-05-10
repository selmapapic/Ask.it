import React, { useState, useEffect } from 'react';
import axios from "axios";

const Answers = () => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/answers/few");
            setQuestions(data);
        }
        fetchData();
        return () => {
            //
        }
    }, [])
    return (
        <div>
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
    )
}

export default Answers
