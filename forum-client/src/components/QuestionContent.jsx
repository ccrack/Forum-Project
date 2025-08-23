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

            {/* Answers section */}
            <div className="mt-4">
                <h5 className="mb-3">
                    {question.answers?.length || 0} Answers
                </h5>
                {question.answers && question.answers.length > 0 ? (
                    <ul className="list-group">
                        {question.answers.map((ans, i) => (
                            <li key={i} className="list-group-item">
                                <div className="d-flex justify-content-between">
                                    <span>{ans.body}</span>
                                    <small className="text-muted">
                                        username
                                    </small>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="alert alert-info">
                        No answers yet.
                    </div>
                )}
            </div>
        </div>
    );
}