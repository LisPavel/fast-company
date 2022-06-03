import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import api from "../../../api";
import { useParams } from "react-router-dom";
import Comment from "./comment";
import _ from "lodash";

const CommentsList = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments.fetchCommentsForUser(id).then((result) => {
            setComments(result);
        });
    }, []);

    const sortedComments = _.orderBy(comments, ["created_at"], "desc");

    const handleDelete = (commentId) => {
        console.log(commentId);
        api.comments.remove(commentId).then((removedCommentId) => {
            setComments((prevState) =>
                prevState.filter((comment) => comment._id !== removedCommentId)
            );
        });
    };

    return (
        <>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {sortedComments.map((comment) => (
                            <Comment
                                {...comment}
                                key={comment._id}
                                createdAt={comment.created_at}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentsList;
