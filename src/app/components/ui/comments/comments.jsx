import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment,
} from "../../../store/comments";
import CommentsList from "./commentsList";
import NewCommentForm from "./newCommentForm";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../../store/users";
import { nanoid } from "nanoid";

const Comments = () => {
    const { id: userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();
    useEffect(() => dispatch(loadCommentsList(userId)), [userId]);
    const commentsLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleDelete = useCallback((commentId) => {
        dispatch(removeComment(commentId));
    }, []);

    const handleAddComment = useCallback((newCommentData) => {
        const newComment = {
            ...newCommentData,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid(),
        };
        dispatch(createComment(newComment));
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
