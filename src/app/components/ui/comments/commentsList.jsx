import React from "react";
// import PropTypes from "prop-types";
// import api from "../../../api";
// import { useParams } from "react-router-dom";
import _ from "lodash";
import PropTypes from "prop-types";

import Comment from "./comment";

const CommentsList = ({ comments, ...rest }) => {
    const sortedComments = _.orderBy(comments, ["created_at"], "desc");

    return (
        <>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {sortedComments.map((comment) => (
                            <Comment
                                {...rest}
                                {...comment}
                                key={comment._id}
                                createdAt={comment.created_at}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentsList;
