import React, { useState, useEffect } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './homepage.css'
import axios from "axios";
//axios povezuje frontend sa apijem

// zadat rutu kao /api
const Homepage = (props) => {

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

  const [usersMostAnswers, setUsersMostAnswers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/user/mostAnswers");
      setUsersMostAnswers(data);
    }
    fetchData();
    return () => {
      //
    }
  }, [])

  const [mostLikedQs, setMostLikedQs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/mostLiked");
      setMostLikedQs(data);
    }
    fetchData();
    return () => {
      //
    }
  }, [])

 /* const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/user");
      setUsers(data);
    }
    fetchData();
    return () => {
      //
    }
  }, [])*/

  return (
    <div className="parent">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <div className="row">
        <div className="col-md">
          <h3>Newest questions</h3>
          <ul className="list-group">
            {questions.map(q =>
              <li key={q.Id} className="list-group-item">
                {q.Title} <br></br>
                {q.Date}
              </li>
            )}


          </ul>
        </div>
        <div className="col-md">
          <div className="row">
            <div className="col-12">
              <h3>People with most answers</h3>
              <ul className="list-group">
                {usersMostAnswers.map(u =>
                  <li key={u.Id} className="list-group-item">
                    {u.Name} &nbsp; {u.Surname}
                  </li>
                )}

              </ul>
            </div>
            <div className="col-12" className="likedQs">
              <h3>Most liked questions</h3>
              <ul className="list-group">
                {mostLikedQs.map(u =>
                  <li key={u.Id} className="list-group-item">
                    {u.Title} <i className="fa fa-thumbs-up"></i>&nbsp;
                    {u.Like}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
