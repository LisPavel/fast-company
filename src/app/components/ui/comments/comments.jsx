import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
// import { useComments } from "../../../hooks/useComments";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
} from "../../../store/comments";
import CommentsList from "./commentsList";
import NewCommentForm from "./newCommentForm";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { id: userId } = useParams();
    // const { comments, createComment, removeComment } = useComments();
    const dispatch = useDispatch();
    useEffect(() => dispatch(loadCommentsList(userId)), [userId]);
    const commentsLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleDelete = useCallback((commentId) => {
        console.log(commentId);
        // removeComment(commentId);
    }, []);

    const handleAddComment = useCallback((newComment) => {
        console.log(newComment);
        // createComment(newComment);
    }, []);

    return (
        <>
            <NewCommentForm onAddComment={handleAddComment} />
            {!commentsLoading ? (
                <CommentsList comments={comments} onDelete={handleDelete} />
            ) : (
                "Loading..."
            )}
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string,
};

export default Comments;
