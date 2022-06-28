import React, { useCallback } from "react";
import { useComments } from "../../../hooks/useComments";
import CommentsList from "./commentsList";
import NewCommentForm from "./newCommentForm";

const Comments = () => {
    const { comments, createComment, removeComment } = useComments();

    const handleDelete = useCallback((commentId) => {
        removeComment(commentId);
    }, []);

    const handleAddComment = useCallback((newComment) => {
        createComment(newComment);
    }, []);

    return (
        <>
            <NewCommentForm onAddComment={handleAddComment} />
            <CommentsList comments={comments} onDelete={handleDelete} />
        </>
    );
};

export default Comments;
