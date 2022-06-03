import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import TextAreaField from "../../common/form/textAreaField";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import { useParams } from "react-router-dom";

const NewCommentForm = ({ users, onAddComment }) => {
    const { id } = useParams();
    const initialData = { userId: "", content: "", pageId: id };

    const [comment, setComment] = useState(initialData);
    const [errors, setErrors] = useState({});

    const usersOptions = users.map((user) => ({
        value: user._id,
        label: user.name,
    }));

    const validatorCfg = {
        userId: { isRequired: { message: "User is required" } },
        content: {
            isRequired: { message: "Post is required" },
            min: { message: "Post required at list 5 symbols", value: 5 },
        },
    };

    const validate = useCallback(
        (data) => {
            const errors = validator(data, validatorCfg);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [setErrors]
    );

    useEffect(() => {
        validate(comment);
    }, [comment]);

    const isValid = Object.keys(errors).length === 0;

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
            const isValid = validate(data);
            if (!isValid) return;
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
                            error={errors.userId}
                        />
                    </div>
                    <div className="mb-4">
                        <TextAreaField
                            label="Сообщение"
                            name="content"
                            value={comment.content}
                            onChange={handleChange}
                            error={errors.content}
                            rows="3"
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" disabled={!isValid}>
                            Publish
                        </button>
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
