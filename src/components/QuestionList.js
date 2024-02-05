import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectAnswer }) {
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={onDeleteQuestion}
            onUpdateCorrectAnswer={onUpdateCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
