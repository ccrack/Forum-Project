import React from "react";

function QuestionItem({ question, onSelect }) {
    return (
        <div className="question">
            <div className="meta">
                <a href="#" onClick={() => onSelect(question)}>
                    {question.tittle}
                </a>
                {new Date(question.createdAt).toLocaleString()} &nbsp; by:{""}
                {question.author?.username || "Unknown"}
                &nbsp; {question.answers?.length || 0} Answers
            </div>
        </div>
    );
}
export default QuestionItem;