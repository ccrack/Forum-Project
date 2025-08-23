import React from "react";

export default function QuestionContent({ question }) {

    return (
        <div className="container mt-4">
            {/* Question card */}
            <div className="card shadow-sm">
                <div className="card-body">
                    {/* Question title */}
                    <h4 className="card-title mb-3 text-primary">
                        {question.title}
                    </h4>

                    {/* Author & Date */}
                    <div className="d-flex justify-content-between mb-3">
                        <small className="text-muted">
                            Asked by <span className="text-success fw-semibold">
                                {question.author?.username || "Unknown"}
                            </span>
                        </small>
                        <small className="text-muted">
                            {question.createAt}
                        </small>
                    </div>

                    {/* Question description/content */}
                    <p className="card-text">{question.body}</p>
                </div>
            </div>
        </div>
    );
}