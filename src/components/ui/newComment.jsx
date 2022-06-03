import React, { useEffect, useState } from "react";
import API from "../../api";
import SelectField from "../common/form/selectField";
import TextAreaField from "../common/form/textAreaField";

const NewCommentForm = () => {
    const initialData = { user: "", content: "" };

    const [comment, setComment] = useState(initialData);

    const [usersOptions, setUsersOptions] = useState([]);

    useEffect(() => {
        API.users
            .fetchAll()
            .then((users) =>
                setUsersOptions(
                    users.map((user) => ({ value: user._id, label: user.name }))
                )
            );
    }, []);

    const handleChange = (data) => {
        if (!data) return;
        setComment((prevState) => ({ ...prevState, [data.name]: data.value }));
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <SelectField
                            options={usersOptions}
                            defaultValue="Выберите пользователя"
                            name="user"
                            label="User"
                            onChange={handleChange}
                            value={comment.user}
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
                </div>
            </div>
        </div>
    );
};

export default NewCommentForm;
