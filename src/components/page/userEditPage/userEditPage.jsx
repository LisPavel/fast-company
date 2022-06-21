import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import { useProfessions } from "../../../hooks/useProfessions";
import { useUsers } from "../../../hooks/useUsers";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";
// import _ from "lodash";

const UserEditPage = () => {
    const { id } = useParams();
    const { getUserById } = useUsers();

    const user = getUserById(id);

    const [data, setData] = useState({
        ...user,
        qualities: user.qualities.map((qid) => ({ value: qid, label: "" })),
    });
    const { professions, isLoading: professionsLoading } = useProfessions();
    const {
        qualities,
        isLoading: qualitiesLoading,
        getQuality,
    } = useQualities();
    const { updateUser } = useAuth();
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        !qualitiesLoading &&
            setData((ps) => ({
                ...ps,
                qualities: ps.qualities.map((q) => {
                    const quality = getQuality(q.value);
                    return { ...q, label: quality.name };
                }),
            }));
    }, [qualitiesLoading]);

    function toUiData({ name: label, _id: value }) {
        return { label, value };
    }

    const qualitiesOptions = qualities.map(toUiData);
    const professionOptions = professions.map(toUiData);

    const handleBackClick = () => {
        history.goBack();
    };

    const handleChange = (data) => {
        if (!data) return;
        setData((prevState) => ({
            ...prevState,
            [data.name]: data.value,
        }));
    };

    const validatorCfg = {
        name: {
            isRequired: { message: "User name is required" },
            min: {
                value: 3,
                message: "Name requires at list 3 symbols",
            },
        },
        email: {
            isRequired: { message: "Email is required" },
            isEmail: { message: "Not correct email" },
        },
        qualities: {
            min: {
                value: 1,
                message: "Required at list one quality",
            },
        },
    };

    const validate = () => {
        const errors = validator(data, validatorCfg);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => validate(), [data]);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map(({ value }) => value),
        };
        updateUser(newData);
    };

    const isLoading = () => {
        return professionsLoading || qualitiesLoading;
    };

    if (isLoading()) return <h3> Loading... </h3>;

    return (
        <form
            className="card border-top-0 border-bottom-0"
            onSubmit={handleSubmit}
        >
            <div className="card-header ps-0">
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-link"
                        onClick={handleBackClick}
                        type="button"
                    >
                        <i className="bi bi-chevron-left" />
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        disabled={!isValid}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className="card-body">
                <TextField
                    label="Name"
                    name="name"
                    value={data.name || ""}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={data.email || ""}
                    onChange={handleChange}
                    error={errors.email}
                />
                <SelectField
                    label="Profession"
                    defaultValue="Chose your prof"
                    error={errors.profession}
                    name="profession"
                    onChange={handleChange}
                    options={professionOptions}
                    value={data.profession}
                />
                <RadioField
                    name="sex"
                    error={errors.sex}
                    onChange={handleChange}
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                        { name: "Other", value: "other" },
                    ]}
                    value={data.sex}
                    label="Select gender"
                />
                <MultiSelectField
                    name="qualities"
                    options={qualitiesOptions}
                    onChange={handleChange}
                    value={data.qualities}
                    label="Qualities"
                    defaultValue={data.qualities}
                    error={errors.qualities}
                />
            </div>
        </form>
    );
};

export default UserEditPage;
