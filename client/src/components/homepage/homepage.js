import React, { useState, useEffect } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './homepage.css'
import axios from "axios";


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

  return (
    <div className="parent">
      <div class="row">
        <div class="col-md">
          <h3>Newest questions</h3>
          <ul class="list-group">
            {questions.map(q => 
            <li class="list-group-item">
              {q.Title}
            </li>
            )}
            
                
          </ul>
        </div>
        <div class="col-md">
          <div class="row">
            <div class="col-12">
              <h3>People with most answers</h3>
              <ul class="list-group">
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
            <div class="col-12" className="likedQs">
              <h3>Most liked questions</h3>
              <ul class="list-group">
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
