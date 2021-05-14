import React, { useState, useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";


import Login from "./components/login/login";
import SignUp from "./components/signup/signup"
import Homepage from "./components/homepage/homepage"
import MyQuestions from "./components/questions/myQuestions"
import QuestionsPage from './components/questions/questionsPage';
import Nav from "./components/nav/nav"
import MyProfile from "./components/profile/myProfile"

function App() {
  const [name, setName] = useState('')
  const [userId, setUserId] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/user/one");
      setName(data.Name)
      setUserId(data.Id)
    }
    fetchData();
    return () => {
      //
    }
  }, [])

  return (<Router>
    <div className="App">
      <Nav name={name} setName={setName}/>

      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/log-in" component={() => <Login setName={setName}/>} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/homepage" component={Homepage} />
          <Route path="/my-questions" component={() => <MyQuestions name={name} id={userId}/>} />
          <Route path="/questions" component={QuestionsPage} />
          <Route path="/my-profile" component={() => <MyProfile name={name} id={userId}/>} />
        </Switch>
      </div>
    </div>
  </Router>

  );
}

export default App;
