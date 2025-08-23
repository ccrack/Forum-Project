import { React, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function QuestionContent({ question }) {


    // Show answers progressively
    const pageSize = 5;
    const [visibleAnswers, setVisibleAnswers] = useState(
        question.answers?.slice(0, pageSize) || []
    );
    const [hasMore, setHasMore] = useState(
        question.answers?.length > pageSize
    );

    // Load more answers
    const fetchMoreAnswers = () => {
        const next = visibleAnswers.length + pageSize;
        const newAnswers = question.answers.slice(0, next);

        setVisibleAnswers(newAnswers);
        setHasMore(newAnswers.length < question.answers.length);
    };


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
                    <InfiniteScroll
                        dataLength={visibleAnswers.length}
                        next={fetchMoreAnswers}
                        hasMore={hasMore}
                        loader={<p className="text-center">Loading more...</p>}
                        endMessage={
                            <p className="text-center text-muted">
                                You’ve reached the end 🚀
                            </p>
                        }
                    >
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
                    </InfiniteScroll>
                ) : (
                    <div className="alert alert-info">
                        No answers yet.
                    </div>
                )}
            </div>
        </div>
    );
}