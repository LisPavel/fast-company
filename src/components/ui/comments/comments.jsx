import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import CommentsList from "./commentsList";
import NewCommentForm from "./newCommentForm";

const Comments = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.comments.fetchCommentsForUser(id).then((result) => {
            setComments(result);
        });
        api.users.fetchAll().then((users) => setUsers(users));
    }, []);

    const handleDelete = useCallback(
        (commentId) => {
            api.comments.remove(commentId).then((removedCommentId) => {
                setComments((prevState) =>
                    prevState.filter(
                        (comment) => comment._id !== removedCommentId
                    )
                );
            });
        },
        [setComments]
    );

    const handleSubmit = useCallback(
        (newComment) => {
            setComments((prevState) => [...prevState, newComment]);
        },
        [setComments]
    );

    return (
        <>
            <NewCommentForm users={users} onAddComment={handleSubmit} />
            <CommentsList comments={comments} onDelete={handleDelete} />
        </>
    );
};

export default Comments;
