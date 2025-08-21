import React from "react";
import QuestionItem from "./QuestionItem";

 function QuestionList({ questions, onSelect }) {
  return (
    <div>
      {questions.map((q) => (
        <QuestionItem key={q._id} question={q} onSelect={onSelect} />
      ))}
    </div>
  );
}
export default QuestionList;