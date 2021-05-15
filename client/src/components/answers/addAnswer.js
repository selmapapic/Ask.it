import React, { useState } from 'react'

const AddAnswer = ({ onAdd, id, editText }) => {
    const [ text, setText ] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        onAdd(text, id)
        //setText('')
    }

    return (
        <form onSubmit={onSubmit}>
        <div className="form-parts">
            <label></label>
            <br></br>
            <textarea rows="6" cols="50"  onChange={e => setText(e.target.value)} placeholder="Add text" defaultValue={editText} required></textarea>
        </div>
        <input type="submit" value="Post" className="btn btn-success"/>
    </form>
    )
}

export default AddAnswer
