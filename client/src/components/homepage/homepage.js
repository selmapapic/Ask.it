import React, { useState, useEffect } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './homepage.css'
import axios from "axios";
//axios povezuje frontend sa apijem

// zadat rutu kao /api
const Homepage = (props) => {

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(20)

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

  const loadMore = (e) => {
    e.preventDefault()
    setIndex(index + 3)
  }

  return (
    <div className="parent">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <div className="row">
        <div className="col-md">
          <h3>Newest questions</h3>
          <ul className="list-group">
            {questions.slice(0, index).map(q =>
              <li key={q.Id} className="list-group-item">
                <b>{q.Title}</b> <br></br>
                <small>Posted by: {q.User.Name} {q.User.Surname}</small> <br></br>
                <small>Date: {q.Date}</small> <br></br>
              </li>
            )}
          </ul>
          <br></br>
          <button className="btn btn-secondary loadMore" onClick={loadMore}>Load More</button>
          <br></br>
        </div>
        <div className="col-md">
          <div className="row">
            <div className="col-12">
              <h3>People with most answers</h3>
              <ul className="list-group">
                {usersMostAnswers.map(u =>
                  <li key={u.Id} className="list-group-item">
                    <b>{u.Name} {u.Surname} </b><br></br>
                    Answers: {u.Answers}
                  </li>
                )}

              </ul>
            </div>
            <div className="col-12 likedQs" >
              <h3>Most liked questions</h3>
              <ul className="list-group">
                {mostLikedQs.map(u =>
                  <li key={u.Id} className="list-group-item">
                    <b>{u.Title}</b> <br></br>
                    <small><i className="fa fa-thumbs-up"></i>&nbsp; {u.Like}</small><br></br>
                    <small>Posted by: {u.User.Name} {u.User.Surname}</small> <br></br>
                    <small>Date: {u.Date}</small> <br></br>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  )
}

export default Homepage
