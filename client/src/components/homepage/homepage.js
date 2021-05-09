import React, { useState, useEffect } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './homepage.css'
import axios from "axios";
//axios povezuje frontend sa apijem

// zadat rutu kao /api
const Homepage = (props) => {

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      const {data} = await axios.get("/api/question");
      setQuestions(data);
    }
    fetchData();
    return () => {
      //
    }
  }, [])

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      const {data} = await axios.get("/api/user");
      setUsers(data);
    }
    fetchData();
    return () => {
      //
    }
  }, [])

  return (
    <div className="parent">
      <div className="row">
        <div className="col-md">
          <h3>Newest questions</h3>
          <ul className="list-group">
            {questions.map(q => 
            <li key={q.Id} className="list-group-item">
              {q.Title}
            </li>
            )}
            
                
          </ul>
        </div>
        <div className="col-md">
          <div className="row">
            <div className="col-12">
              <h3>People with most answers</h3>
              <ul className="list-group">
                {users.map(u => 
                  <li key={u.Id} className="list-group-item">
                    {u.Name}
                  </li>
                  )}
                
              </ul>
            </div>
            <div className="col-12" className="likedQs">
              <h3>Most liked questions</h3>
              <ul className="list-group">
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
