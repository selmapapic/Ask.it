import React from 'react'
import './addQuestion.css';


const AddQuestion = () => {
    return (
        <form className="add-form">
            <div className="form-parts">
                <label>Title</label>
                <br></br>
                <input type="text" placeholder="Title" />
                <br></br>
                <label>Description</label>
                <br></br>
                <textarea rows="6" cols="24"></textarea>
            </div>
            <br></br>
            <input type="submit" value="SaveQuestion" className="btn btn-primary"/>
        </form>
    )
}

export default AddQuestion
