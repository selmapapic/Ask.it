import React, { useState } from 'react'
import './addQuestion.css';


const AddQuestion = ({onAdd}) => {
    const [ title, setTitle ] = useState('')
    const [ text, setText ] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        onAdd({ title, text })
        setTitle('')
        setText('')
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-parts">
                <label>Title</label>
                <br></br>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required/>
                <br></br>
                <label>Description</label>
                <br></br>
                <textarea rows="6" cols="24" value={text} onChange={e => setText(e.target.value)} required></textarea>
            </div>
            <br></br>
            <input type="submit" value="SaveQuestion" className="btn btn-primary"/>
        </form>
    )
}

export default AddQuestion
