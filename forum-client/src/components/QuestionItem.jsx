import React from "react";
import QuestionContent from "./QuestionContent";


function QuestionItem({ question, onSelect }) {
 
    return (
        <div className="d-flex justify-content-between align-items-center border-bottom py-3" 
             onClick={() => onSelect(question)}   // 🔹 trigger parent callback
            style={{ cursor: "pointer" }}        // 🔹 change cursor to hand
        >
            {/* Left side: Title and username */}
            <div>
                <h6 className="mb-1"> <a href="#">{question.title}</a></h6>
                <small className="text-success">by : {question.author?.username || "Unknown"}</small>
            </div>

            {/* Right side: Answers & date */}
            <div className="text-end">
                <div>
                    <span bg="success" className="me-1">
                        {question.answers?.length || 0}
                    </span>
                    Answers
                </div>
                <small className="text-muted">{question.createAt}</small>
            </div>
        </div>

    );
}
export default QuestionItem;