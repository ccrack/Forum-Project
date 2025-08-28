import { React, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "../services/api";

export default function QuestionContent({ question }) {


    // Show answers progressively
    const pageSize = 5;

    const [body, setBody] = useState("");
    const [show, setShow] = useState(false);


    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const [visibleAnswers, setVisibleAnswers] = useState(
        question.answers?.slice(0, pageSize) || []
    );
    const [hasMore, setHasMore] = useState(
        question.answers?.length > pageSize
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await API.post(
                `/questions/answers/${question._id}/answers`,
                { body },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            // onSucess(res.data); // update answers in parent
            setBody("");
            handleClose();
        } catch (err) {
            console.error("Error creating answer:", err);
        }
    };


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

                        <small className="text-muted d-flex flex-column">

                            {question.createAt}

                        </small>
                    </div>

                    {/* Question description/content */}
                    <div className="d-flex flex-row">
                        <p className="card-text">{question.body}</p>
                        <div className="container mt-5">

                            {/* Modal */}
                            {show && (
                                <div className="modal show d-block" tabIndex="-1" role="dialog">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Answer the Question</h5>
                                                <button type="button" className="btn-close" onClick={handleClose}></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-3">
                                                        <label htmlFor="answer" className="form-label">Your Answer</label>
                                                        <textarea
                                                            id="answer"
                                                            className="form-control"
                                                            value={body}
                                                            onChange={(e) => setBody(e.target.value)}
                                                            rows="4"
                                                            required
                                                        ></textarea>
                                                    </div>
                                                    <button type="submit" className="btn btn-success">Submit Answer</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={handleOpen}>Answer Question</button>
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
                                            {ans.author.username}
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