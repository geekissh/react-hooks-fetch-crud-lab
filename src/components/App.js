import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = (newQuestion) => {
    console.log("Adding new question:", newQuestion);
    setQuestions([...questions, newQuestion]);
    setPage("List"); 
  };

  const handleDeleteQuestion = (deletedId) => {
    setQuestions(questions.filter((q) => q.id !== deletedId));
  };

  const handleUpdateCorrectAnswer = (questionId, newCorrectIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, correctIndex: newCorrectIndex } : q
      )
    );
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
