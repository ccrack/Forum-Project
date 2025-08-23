import { React, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionContent from "./QuestionContent";

function QuestionList({ questions, onSelect }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // If a question is selected, show only its content
  if (selectedQuestion) {
    return (
      <div className="mt-3">
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setSelectedQuestion(null)}
        >
        ← Back to Questions
        </button>
        <QuestionContent question={selectedQuestion} />
      </div>
    )
  }
  return (
    <div>
      {questions.map((q) => (
        <QuestionItem key={q._id} question={q} onSelect={setSelectedQuestion} />
      ))}
    </div>
  );
}
export default QuestionList;
 