import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedOption, setSelectedOption] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
               onDeleteQuestion(id);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handleUpdateCorrectAnswer = () => {
       fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: selectedOption }),
    })
      .then(() => {
       
        onUpdateCorrectAnswer(id, selectedOption);
      })
      .catch((error) => {
        console.error("Error updating correct answer:", error);
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {options}
        </select>
      </label>
      <button onClick={handleUpdateCorrectAnswer}>Update Correct Answer</button>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem