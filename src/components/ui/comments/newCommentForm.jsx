import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import TextAreaField from "../../common/form/textAreaField";
import api from "../../../api";

const NewCommentForm = ({ users, onAddComment }) => {
    const initialData = { userId: "", content: "" };

    const [comment, setComment] = useState(initialData);

    const usersOptions = users.map((user) => ({
        value: user._id,
        label: user.name,
    }));

    const handleChange = useCallback(
        (data) => {
            if (!data) return;
            setComment((prevState) => ({
                ...prevState,
                [data.name]: data.value,
            }));
        },
        [setComment]
    );

    const handleSubmit = useCallback(
        (data) => {
            api.comments.add(data).then((newComment) => {
                onAddComment(newComment);
                setComment(initialData);
            });
        },
        [setComment]
    );

    return (
        <div className="card mb-2">
            <div className="card-body">
                <form
                    onSubmit={(ev) => {
                        ev.preventDefault();
                        handleSubmit(comment);
                    }}
                >
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <SelectField
                            options={usersOptions}
                            defaultValue="Выберите пользователя"
                            name="userId"
                            label="User"
                            onChange={handleChange}
                            value={comment.userId}
                        />
                    </div>
                    <div className="mb-4">
                        <TextAreaField
                            label="Сообщение"
                            name="content"
                            value={comment.content}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary">Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

NewCommentForm.propTypes = {
    users: PropTypes.array.isRequired,
    onAddComment: PropTypes.func.isRequired,
};

export default NewCommentForm;
