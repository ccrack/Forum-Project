import React, { useState } from "react";
import API from "../services/api";

export default function NewQuestionForm({ user, category, onSuccess }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Ensure the title ends with a question mark
        const fixedBody = ensureQuestion(body);

        const token = localStorage.getItem('token');
        try {
            const res = await API.post("/questions/create", { title, body:fixedBody, category },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
            let message = onSuccess(res.data);
            console.log(message)
            setTitle("");
            setBody("");
        } catch (err) {
            console.error("Error creating question:", err.response);
        }
    };
    // function that verify if content is question
    const ensureQuestion = (content) => {
        content = content.trim(); // remove extra spaces
        if (content.endsWith("?")) {
            return content;
        } else {
            return content + "?";
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                className="form-control form-control-md mb-3"
                type="text"
                placeholder="Question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                className="form-control form-control-md"
                placeholder="Question details..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            <button className="btn btn-primary mt-3" type="submit">Submit</button>
        </form>
    );
}