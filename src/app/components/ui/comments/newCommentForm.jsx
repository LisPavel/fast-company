import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";

const NewCommentForm = ({ onAddComment }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const validatorCfg = {
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
        validate(data);
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    const handleChange = useCallback(
        (data) => {
            if (!data) return;
            setData((prevState) => ({
                ...prevState,
                [data.name]: data.value,
            }));
        },
        [setData]
    );

    const handleSubmit = useCallback(
        (data) => {
            const isValid = validate(data);
            if (!isValid) return;
            onAddComment(data);
            setData({});
        },
        [setData]
    );

    return (
        <div className="card mb-2">
            <div className="card-body">
                <form
                    onSubmit={(ev) => {
                        ev.preventDefault();
                        handleSubmit(data);
                    }}
                >
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <TextAreaField
                            label="Сообщение"
                            name="content"
                            value={data.content || ""}
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
    onAddComment: PropTypes.func.isRequired,
};

export default NewCommentForm;
