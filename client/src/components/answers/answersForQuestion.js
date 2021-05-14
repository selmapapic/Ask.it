import React, { useEffect } from 'react'
import axios from 'axios'

const AnswersForQuestion = (props) => {

    useEffect(() => {
        axios.get("/api/question/answers", {params: { id: props.location.state.id }})
            .then(res => {
                console.log(res.data)
            });
        return () => {
            
        }
    }, [props.location.state.id])

    return (
        <div>
            {props.location.state.id}
        </div>
    )
}

export default AnswersForQuestion
