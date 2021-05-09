import React from "react";

const Question = ({ questionToRender }) => {return (
    <ul>
      {questionToRender.map((question, index) => (
        <li key={index}>
          <strong>{question.Id}</strong>
          &nbsp;{question.Title}
        </li>
      ))}
    </ul>
  );
};
export default Question;